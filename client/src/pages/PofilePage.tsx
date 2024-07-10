import React, { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";

import {
  Box,
  Flex,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Container,
  Text,
  Button,
} from "@chakra-ui/react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
// import axios from "axios";

const PatientDashboard: React.FC = () => {
  const toast = useToast();
  const [aUser, setUser] = useState<any>(null);

  interface CustomError extends Error {
    message: string;
  }

  interface Appointment {
    _id: string;
    doctorId: {
      _id: string;
      firstName: string;
      lastName: string;
    };
    date: string;
    time: string;
    reason?: string;
  }

  const cancelAppointment = async (appointmentId: string) => {
    try {
      const response = await fetch(`http://localhost:8080/appointment/${appointmentId}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to cancel appointment');
      }
  
      const updatedAppointments = appointments.filter(
        (appt) => appt._id !== appointmentId
      );
      setAppointments(updatedAppointments); // Update local state
  
      // Optionally update user state if needed
      if (user) {
        const updatedUser = {
          ...user,
          appointments: updatedAppointments,
        };
        setUser(updatedUser); // Update user state
        localStorage.setItem("user", JSON.stringify(updatedUser)); // Update session storage
      }

      toast({
        title: "Appointment canceled successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: 'top',
        size: 'lg'
      });
  
    } catch (error) {
      const typedError = error as CustomError;
      toast({
        title: "Error canceling appointment.",
        description: typedError.message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: 'top',
        size: 'lg'
      });
    }
  };
  
  
  

  const [fetchError, setFetchError] = useState("");
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const { user } = useAuth();
  const navigate = useNavigate();

  const fetchAppointments = async () => {
    const patientId = user?._id || user?.id;

    if (!patientId) {
      setFetchError("Patient ID is not available.");
      return;
    }

    try {
      setFetchError("");
      const response = await fetch(
        `http://localhost:8080/appointment/patient/${patientId}`
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
      }

      const data = await response.json();
      const allAppointments: Appointment[] = data.appointments;
     

      // Sort appointments by date and time
      allAppointments.sort((a, b) => {
        if (a.date === b.date) {
          return a.time.localeCompare(b.time);
        }
        return a.date.localeCompare(b.date);
      });
      

      setAppointments(allAppointments);
    } catch (error) {
      const typedError = error as CustomError;
      setFetchError(typedError.message);
    }
  };

  useEffect(() => {
    if (user && user.userType !== "patient") {
      navigate("/");
    }
    else if (user && user.userType === "patient") {
      
        fetchAppointments();
    } 
  }, [user]);

  return (
    <Container maxW="container.xl" py={8}>
      <Heading as="h1" mb={6} textAlign="center">
        Patient Dashboard
      </Heading>
      <Flex direction="column" align="center" justify="center">
        <Box w="100%" bg="white" boxShadow="md" borderRadius="md" p={4}>
          <Heading as="h2" size="lg" mb={4}>
            My Appointments
          </Heading>
          {fetchError && (
            <Text align="center" color="red.500">
              {fetchError}
            </Text>
          )}
          {appointments.length === 0 && (
            <Text align="center" color="gray.500" mb={4}>
              No appointments scheduled.
            </Text>
          )}
          {appointments.length > 0 && (
            <Table variant="simple">
              <TableCaption>Appointments</TableCaption>
              <Thead>
                <Tr>
                  <Th>Doctor</Th>
                  <Th>Date</Th>
                  <Th>Time</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {appointments.map((appointment) => (
                  <Tr key={appointment._id}>
                    <Td>{`${appointment.doctorId.firstName} ${appointment.doctorId.lastName}`}</Td>
                    <Td>{appointment.date}</Td>
                    <Td>{appointment.time}</Td>
                    <Td>
                      <Button
                        colorScheme="red"
                        size="sm"
                        onClick={() => cancelAppointment(appointment._id)}
                      >
                        Cancel
                      </Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          )}
        </Box>
      </Flex>
    </Container>
  );
};

export default PatientDashboard;
