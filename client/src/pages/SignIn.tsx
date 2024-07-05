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
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom';
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useAuth } from '../context/authContext'; 

type UserType = 'patient' | 'doctor' | '';

interface Credentials {
  email: string;
  password: string;
}

interface CustomError extends Error {
  message: string;
}

const SignIn: React.FC = () => {
  const [emailInput, setEmailInput] = useState<string>("");
  const [passwordInput, setPasswordInput] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const [userType, setUserType] = useState<UserType>("");

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
  },[]) 

  const handleSignIn = async (e: FormEvent) => {
    e.preventDefault();
  
    try {
      if (!userType) {
        throw new Error("Please choose user type.");
      }
  
      if (!emailInput || !passwordInput) {
        throw new Error("All fields must be filled in.");
      }
  
      const credentials: Credentials = {
        email: emailInput,
        password: passwordInput
      };
  
      const response = await fetch(`http://localhost:8080/auth/authenticate/${userType}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
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
  
      loginUser(data.user); // Call loginUser from context to save user data
      navigate("/");
  
    } catch (error) {
      const typedError = error as CustomError;
      setErrorMessage(typedError.message);
    }
  };
  

  return (
    <Box width="100%" p="2rem">
      <form onSubmit={handleSignIn} style={{ maxWidth: "400px", margin: "0 auto" }}>
        <Heading textAlign="center" mb="1rem">Sign In</Heading>
        <Text textAlign="center" mb="1rem" color="red">{errorMessage}</Text>

        <Select
          placeholder='Account Type'
          value={userType}
          onChange={(e: ChangeEvent<HTMLSelectElement>) => setUserType(e.target.value as UserType)}
          mb="1rem"
        >
          <option value='patient'>Patient</option>
          <option value='doctor'>Doctor</option>
        </Select>

        <FormControl isRequired>
          <FormLabel>Email</FormLabel>
          <Input type='email' mb="1rem" value={emailInput} placeholder='Email' onChange={(e: ChangeEvent<HTMLInputElement>) => setEmailInput(e.target.value)} />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Password</FormLabel>
          <Input type="password" mb="1rem" placeholder='Password' value={passwordInput} onChange={(e: ChangeEvent<HTMLInputElement>) => setPasswordInput(e.target.value)} />
        </FormControl>

        <Center>
          <Button background={"teal"} type="submit" mb="1rem">Sign In</Button>
        </Center>

        <Text textAlign="center">
          Don't have an account?{' '}
          <ChakraLink as={ReactRouterLink} to="/sign_up">Sign up!</ChakraLink>
        </Text>
      </form>
    </Box>
  );
};

export default SignIn;
