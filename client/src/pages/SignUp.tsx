import {
  FormControl,
  Heading,
  FormLabel,
  Input,
  Center,
  Button,
  Text,
  Link as ChakraLink,
  Box,
  Select
} from "@chakra-ui/react";
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext'; 
import { Doctor, Patient, User } from '../types/types';

interface CustomError extends Error {
  message: string;
}

const SignUp: React.FC = () => {
  const [emailInput, setEmailInput] = useState<string>("");
  const [firstNameInput, setFirstNameInput] = useState<string>("");
  const [lastNameInput, setLastNameInput] = useState<string>("");
  const [practiceInput, setPracticeInput] = useState<string>("");
  const [passwordInput, setPasswordInput] = useState<string>("");
  const [userType, setUserType] = useState<'patient' | 'doctor' | ''>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const { loginUser, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      if (user.userType === "doctor") {
        navigate("/dashboard")
      } else {
        navigate("/")
      }
    }
  }, [user, navigate]);

  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault();

    try {
      if (!userType) {
        throw new Error("Please choose user type.");
      }

      if (!emailInput || !firstNameInput || !lastNameInput || !passwordInput) {
        throw new Error("All fields must be filled in.");
      }

      let newUser: User;
      if (userType === "doctor") {
        if (!practiceInput) {
          throw new Error("Practice field must be filled in for doctors.");
        }
        newUser = {
        
          firstName: firstNameInput,
          lastName: lastNameInput,
          email: emailInput,
          password: passwordInput,
          practice: practiceInput,
          userType: 'doctor'
        } as Doctor;
      } else {
        newUser = {
          firstName: firstNameInput,
          lastName: lastNameInput,
          email: emailInput,
          password: passwordInput,        
          userType: 'patient'
        } as Patient;
      }

      const response = await fetch(`http://localhost:8080/auth/create/${userType}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();

      if (!data.user) {
        setErrorMessage(data.message);
        return;
      }
      
      data.user.userType = userType; // Ensure userType is set
      loginUser(data.user);
      navigate("/");

    } catch (error) {
      const typedError = error as CustomError;
      setErrorMessage(typedError.message);
    }
  };

  return (
    <Box width="100%" p="2rem">
      <form onSubmit={handleSignUp} style={{ maxWidth: "400px", margin: "0 auto" }}>
        <Heading textAlign="center" mb="1rem">Sign Up</Heading>
        <Text textAlign="center" mb="1rem" color="red">{errorMessage}</Text>

        <Select
          placeholder='Account Type'
          value={userType}
          onChange={(e: ChangeEvent<HTMLSelectElement>) => setUserType(e.target.value as 'patient' | 'doctor')}
          mb="1rem"
        >
          <option value='patient'>New Patient</option>
          <option value='doctor'>New Doctor</option>
        </Select>

        <FormControl isRequired>
          <FormLabel>First Name</FormLabel>
          <Input type='text' mb="1rem" value={firstNameInput} placeholder='First Name' onChange={(e: ChangeEvent<HTMLInputElement>) => setFirstNameInput(e.target.value)} />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Last Name</FormLabel>
          <Input type='text' mb="1rem" value={lastNameInput} placeholder='Last Name' onChange={(e: ChangeEvent<HTMLInputElement>) => setLastNameInput(e.target.value)} />
        </FormControl>

        {userType === "doctor" &&
          <FormControl isRequired>
            <FormLabel>Practice</FormLabel>
            <Input type='text' mb="1rem" value={practiceInput} placeholder='Practice' onChange={(e: ChangeEvent<HTMLInputElement>) => setPracticeInput(e.target.value)} />
          </FormControl>
        }

        <FormControl isRequired>
          <FormLabel>Email</FormLabel>
          <Input type='email' mb="1rem" value={emailInput} placeholder='Email' onChange={(e: ChangeEvent<HTMLInputElement>) => setEmailInput(e.target.value)} />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Password</FormLabel>
          <Input type="password" mb="1rem" placeholder='Password' value={passwordInput} onChange={(e: ChangeEvent<HTMLInputElement>) => setPasswordInput(e.target.value)} />
        </FormControl>

        <Center>
          <Button background={"teal"} type="submit" mb="1rem">Sign Up</Button>
        </Center>

        <Text textAlign="center">
          Already have an account?{' '}
          <ChakraLink as={ReactRouterLink} to="/sign_in">Sign in!</ChakraLink>
        </Text>
      </form>
    </Box>
  );
};

export default SignUp;
