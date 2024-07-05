import React, { useState } from 'react';
import { useAuth } from '../context/authContext';
import axios from 'axios';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
} from '@chakra-ui/react';

const UserProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [newEmail, setNewEmail] = useState('');
  const toast = useToast();

  const handleEmailChange = async () => {
    try {
      await axios.put('/email', { newEmail });
      toast({
        title: 'Email updated.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    
    } catch (error) {
      toast({
        title: 'Error updating email.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const cancelAppointment = async (appointmentId: string) => {
    try {
      await axios.delete(`/api/appointments/${appointmentId}`);
      toast({
        title: 'Appointment canceled successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
     
    
    } catch (error) {
      toast({
        title: 'Error canceling appointment.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <Box p={5}>
      <Box mb={4}>
        <FormControl id="email">
          <FormLabel>Email address</FormLabel>
          <Input
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />
          <Button mt={4} onClick={handleEmailChange}>
            Update Email
          </Button>
        </FormControl>
      </Box>
      <Box>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Date</Th>
              <Th>Time</Th>
              <Th>Doctor</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {user.appointments.map((appointment: any) => (
              <Tr key={appointment.id}>
                <Td>{appointment.date}</Td>
                <Td>{appointment.startTime}</Td>
                <Td>{appointment.doctor}</Td>
                <Td>
                  <Button
                    colorScheme="red"
                    size="sm"
                    onClick={() => cancelAppointment(appointment.id)}
                  >
                    Cancel
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default UserProfilePage;
