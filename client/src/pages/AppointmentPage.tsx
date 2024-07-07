import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Heading,
  FormControl,
  FormLabel,
  Button,
  Fade,
  Grid,
  RadioGroup,
} from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import dayjs from "dayjs";
import CustomRadioCard from "../components/CustomRadioCard"; // Adjust the path based on your project structure
import TimeSlotRadioCard from "../components/TimeSlotRadioCard"; // Adjust the path based on your project structure
import { getDoctors } from "../api/Doctor";

interface Doctor {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  practice: string;
  avatar: string; // URL to avatar image
  availability: {
    [date: string]: string[]; // Map of date strings to arrays of times
  };
}

const AppointmentBooking: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [availableHours, setAvailableHours] = useState<string[]>([]); // State to hold available hours
  const [selectedTime, setSelectedTime] = useState<string | null>(null); // State to hold selected time slot

  const [doctors, setDoctors] = useState<Doctor[]>([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      const doctorData = await getDoctors();
      setDoctors(doctorData);
    };

    fetchDoctors();
  }, []);

  useEffect(() => {
    if (selectedDoctor && selectedDate) {
      const dateKey = dayjs(selectedDate).format("YYYY-MM-DD");
      const availability = selectedDoctor.availability[dateKey] || [];
      setAvailableHours(availability);
      setSelectedTime(null); // Reset selected time when date or doctor changes
    }
  }, [selectedDoctor, selectedDate]);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    setAvailableHours([]); // Reset available hours when date changes
    setSelectedTime(null); // Reset selected time
  };

  const handleDoctorSelect = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setSelectedDate(null); // Reset selected date when doctor changes
    setAvailableHours([]); // Reset available hours
    setSelectedTime(null); // Reset selected time
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (selectedDate && selectedDoctor && selectedTime) {
      try {
        await axios.post("http://localhost:8080/appointment/book", {
          
          startDate: selectedDate,
          doctorId: selectedDoctor._id,
        });
        alert("Appointment booked successfully!");
      } catch (error) {
        console.error("Error booking appointment", error);
        alert("Failed to book appointment.");
      }
    } else {
      alert("Please select a date, doctor, and time.");
    }
  };

  return (
    <Container maxW="container.md" py={8}>
      <Heading as="h1" mb={6} textAlign="center">
        Book an Appointment
      </Heading>
      <Box as="form" onSubmit={handleSubmit}>
        <FormControl mb={4}>
          <FormLabel htmlFor="doctor">Select Doctor</FormLabel>
          <RadioGroup defaultValue={selectedDoctor?.firstName}>
            <Grid templateColumns="repeat(3, 1fr)" gap={4}>
              {doctors.map((doctor) => (
                <CustomRadioCard
                  key={doctor._id}
                  doctor={doctor}
                  isChecked={selectedDoctor === doctor}
                  onChange={() => handleDoctorSelect(doctor)}
                />
              ))}
            </Grid>
          </RadioGroup>
        </FormControl>
        <FormControl mb={4}>
          <FormLabel htmlFor="date">Select Date</FormLabel>
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            minDate={new Date()}
            dateFormat="yyyy/MM/dd"
            className="chakra-input"
          />
        </FormControl>
        <Fade in={selectedDate !== null && selectedDoctor !== null}>
          <Box mt={4}>
            <Heading as="h3" size="md" mb={2}>
              Available Hours
            </Heading>
            <Grid templateColumns="repeat(3, 1fr)" gap={4}>
              {availableHours.map((time) => (
                <TimeSlotRadioCard
                  key={time}
                  time={time}
                  isChecked={time === selectedTime}
                  onChange={() => handleTimeSelect(time)}
                />
              ))}
            </Grid>
          </Box>
        </Fade>
        <Button type="submit" colorScheme="blue" mt={4} width="full">
          Book Appointment
        </Button>
      </Box>
    </Container>
  );
};

export default AppointmentBooking;
