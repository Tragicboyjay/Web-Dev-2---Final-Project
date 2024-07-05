import React, { useEffect } from "react";
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
  Avatar,
  VStack,
} from "@chakra-ui/react";
import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';

const appointments = [
  {
    id: 1,
    patientName: "John Doe",
    time: "10:00 AM",
    date: "2024-07-05",
    reason: "General Checkup",
    avatar: "..\assets\icon.png",
  },
  {
    id: 2,
    patientName: "Jane Smith",
    time: "11:00 AM",
    date: "2024-07-05",
    reason: "Consultation",
    avatar: "..\assets\icon.png",
  },
  // Add more appointments as needed
];



const DoctorDashboard: React.FC = () => {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if(user && user.userType != "doctor") navigate("/")
  
  },)

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
          <Table variant="simple">
            <TableCaption>Appointments for Today</TableCaption>
            <Thead>
              <Tr>
                <Th>Patient</Th>
                <Th>Date</Th>
                <Th>Time</Th>
                <Th>Reason</Th>
              </Tr>
            </Thead>
            <Tbody>
              {appointments.map((appointment) => (
                <Tr key={appointment.id}>
                  <Td>
                    <Flex align="center">
                      <Avatar src={appointment.avatar} mr={3} />
                      <VStack align="start">
                        <Text>{appointment.patientName}</Text>
                      </VStack>
                    </Flex>
                  </Td>
                  <Td>{appointment.date}</Td>
                  <Td>{appointment.time}</Td>
                  <Td>{appointment.reason}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Flex>
    </Container>
  );
};

export default DoctorDashboard;
