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
  RadioGroup
} from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import axios from "axios";
import dayjs from "dayjs";
import CustomRadioCard from "../components/CustomRadioCard"; 
import TimeSlotRadioCard from "../components/TimeSlotRadioCard"; 
import { getDoctors } from "../api/Doctor";
import { useAuth } from "../context/authContext";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
interface Doctor {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  practice: string;
  avatar: string;
  availability: {
    [date: string]: string[];
  };
}

const AppointmentBooking: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [availableHours, setAvailableHours] = useState<string[]>([]); 
  const [selectedTime, setSelectedTime] = useState<string | null>(null); 
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  const { user } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();
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
      setSelectedTime(null); 
    }
  }, [selectedDoctor, selectedDate]);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    setAvailableHours([]); 
    setSelectedTime(null); 
  };

  const handleDoctorSelect = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setSelectedDate(null); 
    setAvailableHours([]); 
    setSelectedTime(null); 
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const patientId = user?._id || user?.id;

    try {
      const response = await fetch("http://localhost:8080/appointment/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          time: selectedTime,
          startDate: selectedDate,
          doctorId: selectedDoctor?._id,
          patientId: patientId,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        toast({
          title: data.message,
          status: "error",
          duration: 3000,
          isClosable: true,
          position: 'top', 
          size: 'lg'
        });
        navigate("/");
      } else {
        toast({
          title: "appointment booked succesfully",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: 'top', 
          size: 'lg'
        });
        navigate("/");
      }
    } catch (error) {
      console.log(error);
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
