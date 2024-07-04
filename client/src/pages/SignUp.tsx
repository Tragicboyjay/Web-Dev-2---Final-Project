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
  import React, { useState, ChangeEvent, FormEvent } from "react";
  import { Link as ReactRouterLink, useNavigate } from 'react-router-dom';
  
  type UserType = 'patient' | 'doctor' | '';
  
  interface NewPatient {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
  }
  
  interface NewDoctor extends NewPatient {
    practice: string;
  }
  
  interface CustomError extends Error {
    message: string;
  }
  
  const SignUp: React.FC = () => {
    const [emailInput, setEmailInput] = useState<string>("");
    const [firstNameInput, setFirstNameInput] = useState<string>("");
    const [lastNameInput, setLastNameInput] = useState<string>("");
    const [practiceInput, setPracticeInput] = useState<string>("");
    const [passwordInput, setPasswordInput] = useState<string>("");
    const [userType, setUserType] = useState<UserType>("");
    const [errorMessage, setErrorMessage] = useState<string>("");
  
    const navigate = useNavigate();
  
    const handleSignUp = async (e: FormEvent) => {
      e.preventDefault();
  
      try {
        if (!userType) {
          throw new Error("Please choose user type.");
        }
  
        if (!emailInput || !firstNameInput || !lastNameInput || !passwordInput) {
          throw new Error("All fields must be filled in.");
        }
  
        const newPatient: NewPatient = {
          email: emailInput,
          firstName: firstNameInput,
          lastName: lastNameInput,
          password: passwordInput,
        };
  
        const newDoctor: NewDoctor = {
          email: emailInput,
          firstName: firstNameInput,
          lastName: lastNameInput,
          password: passwordInput,
          practice: practiceInput
        };
  
        const newUser = userType === "patient" ? newPatient : newDoctor;
  
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
            onChange={(e: ChangeEvent<HTMLSelectElement>) => setUserType(e.target.value as UserType)}
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
  