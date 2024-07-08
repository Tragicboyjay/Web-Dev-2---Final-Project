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
  VStack,
} from "@chakra-ui/react";
import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@chakra-ui/react";
interface CustomError extends Error {
  message: string;
}

interface Appointment {
  _id: string;
  patientId: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  date: string;
  time: string;
  reason?: string;
}

const DoctorDashboard: React.FC = () => {
  const [fetchError, setFetchError] = useState("");
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [todayAppointments, setTodayAppointments] = useState<Appointment[]>([]);
  const toast = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();

  const fetchAppointments = async () => {
    setFetchError("")
    
    const doctorId = user?._id || user?.id;

    try {
      const response = await fetch(`http://localhost:8080/appointment/doctor/${doctorId}`);

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
      }

      const data = await response.json();
      const allAppointments: Appointment[] = data.appointments;

      // Filter appointments for today
      const today = new Date().toISOString().split('T')[0];
      const todayAppointments = allAppointments.filter(appointment => appointment.date === today);

      setAppointments(allAppointments);
      setTodayAppointments(todayAppointments);
    } catch (error) {
      const typedError = error as CustomError;
      setFetchError(typedError.message);
    }
  };

  useEffect(() => {
    if (user && user.userType !== "doctor") {
      navigate("/");
    }
    fetchAppointments();
  }, [user]);


  return (
    <Container maxW="container.xl" py={8}>
      <Heading as="h1" mb={6} textAlign="center">
        Doctor Dashboard
      </Heading>
      <Flex direction="column" align="center" justify="center">
        <Box w="100%" bg="white" boxShadow="md" borderRadius="md" p={4}>
          <Heading as="h2" size="lg" mb={4}>
            My Appointments
          </Heading>
          {fetchError && <Text align="center" color="red.500">{fetchError}</Text>}
          {todayAppointments.length === 0 && (
            <Text align="center" color="gray.500" mb={4}>
              No appointments today.
            </Text>
          )}
          {todayAppointments.length > 0 && (
            <Table variant="simple">
              <TableCaption>Appointments for Today</TableCaption>
              <Thead>
                <Tr>
                  <Th>Patient</Th>
                  <Th>Date</Th>
                  <Th>Time</Th>
                  
                </Tr>
              </Thead>
              <Tbody>
                {todayAppointments.map((appointment) => (
                  <Tr key={appointment._id}>
                    <Td>
                      <Flex align="center">
                        <VStack align="start">
                          <Text>{`${appointment.patientId.firstName} ${appointment.patientId.lastName}`}</Text>
                        </VStack>
                      </Flex>
                    </Td>
                    <Td>{appointment.date}</Td>
                    <Td>{appointment.time}</Td>
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

export default DoctorDashboard;
