import React, { useEffect, useState } from "react";
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
} from "@chakra-ui/react";
import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';

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

const PatientDashboard: React.FC = () => {
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
        setFetchError("")
      const response = await fetch(`http://localhost:8080/appointment/patient/${patientId}`);
  
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
      }
  
      const data = await response.json();
      const allAppointments: Appointment[] = data.appointments;
  
      // Filter appointments for today and future
      const today = new Date().toISOString().split('T')[0];
      const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
      const filteredAppointments = allAppointments.filter(appointment => {
        if (appointment.date < today) return false;
        if (appointment.date === today && appointment.time <= currentTime) return false;
        return true;
      });
  
      // Sort appointments by date and time
      filteredAppointments.sort((a, b) => {
        if (a.date === b.date) {
          return a.time.localeCompare(b.time);
        }
        return a.date.localeCompare(b.date);
      });
  
      setAppointments(filteredAppointments);
    } catch (error) {
      const typedError = error as CustomError;
      setFetchError(typedError.message);
    }
  };
  

  useEffect(() => {
    if (user && user.userType !== "patient") {
      navigate("/");
    }
    fetchAppointments();
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
          {fetchError && <Text align="center" color="red.500">{fetchError}</Text>}
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
                  <Th>Reason</Th>
                </Tr>
              </Thead>
              <Tbody>
                {appointments.map((appointment) => (
                  <Tr key={appointment._id}>
                    <Td>{`${appointment.doctorId.firstName} ${appointment.doctorId.lastName}`}</Td>
                    <Td>{appointment.date}</Td>
                    <Td>{appointment.time}</Td>
                    <Td>{appointment.reason ?? 'N/A'}</Td>
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
