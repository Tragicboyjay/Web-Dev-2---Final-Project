import { ArrowForwardIcon } from "@chakra-ui/icons";
import {
  Box,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  Image,
  Container,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <>
      <Box as="main" className="main">
        {/* Hero Section */}
        <Box bg="teal.500" color="white" py={20} textAlign="center">
          <Container maxW="container.lg">
            <Heading as="h1" size="2xl" mb={4}>
              Welcome to Our Hospital
            </Heading>
            <Text fontSize="xl" mb={6}>
              Your health is our priority. Experience the best medical care.
            </Text>
            
            <Link to="/make-appointment">
              <Button rightIcon={<ArrowForwardIcon />} colorScheme='teal' variant='outline' size="lg">
              Book an Appointment
              </Button>
            </Link>
             
          </Container>
        </Box>

        {/* Services Section */}
        <Container maxW="container.lg" py={10}>
          <Heading as="h2" size="xl" textAlign="center" mb={10}>
            Our Services
          </Heading>
          <HStack spacing={10} wrap="wrap" justify="center">
            <ServiceCard
              title="General Checkup"
              description="Regular health checkups for all age groups."
              imageSrc="https://images.unsplash.com/photo-1581056771107-24ca5f033842?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8R2VuZXJhbCUyMENoZWNrdXAlMjBkb2N0b3J8ZW58MHx8MHx8fDA%3D"
            />
            <ServiceCard
              title="Pediatrics"
              description="Comprehensive care for your little ones."
              imageSrc="https://images.unsplash.com/photo-1632053002928-1919605ee6f7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVkaWF0cmljc3xlbnwwfHwwfHx8MA%3D%3D"
            />
            <ServiceCard
              title="Surgery"
              description="Expert dental services for a healthy smile."
              imageSrc="https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8R2VuZXJhbCUyMENoZWNrdXAlMjBkb2N0b3J8ZW58MHx8MHx8fDA%3D"
            />
          </HStack>
        </Container>

        {/* Testimonials Section */}
        <Box bg="gray.100" py={10}>
          <Container maxW="container.lg">
            <Heading as="h2" size="xl" textAlign="center" mb={10}>
              What Our Patients Say
            </Heading>
            <VStack spacing={8}>
              <Testimonial
                name="John Doe"
                feedback="The staff was very friendly and the service was excellent!"
              />
              <Testimonial
                name="Jane Smith"
                feedback="I received the best care at this clinic. Highly recommend it!"
              />
            </VStack>
          </Container>
        </Box>

        {/* Contact Section */}
        <Container maxW="container.lg" py={10}>
          <Heading as="h2" size="xl" textAlign="center" mb={10}>
            Contact Us
          </Heading>
          <VStack spacing={4} align="stretch">
            <Box>
              <Text fontSize="lg">Email: contact@clinic.com</Text>
            </Box>
            <Box>
              <Text fontSize="lg">Phone: +123 456 7890</Text>
            </Box>
            <Button colorScheme="teal" size="lg">
              Get in Touch
            </Button>
          </VStack>
        </Container>
      </Box>
    </>
  );
};

const ServiceCard: React.FC<{
  title: string;
  description: string;
  imageSrc: string;
}> = ({ title, description, imageSrc }) => (
  <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
    <Image src={imageSrc} alt={`${title} image`} />
    <Box p={6}>
      <Heading as="h3" size="md" mb={4}>
        {title}
      </Heading>
      <Text mb={4}>{description}</Text>
    </Box>
  </Box>
);

const Testimonial: React.FC<{ name: string; feedback: string }> = ({
  name,
  feedback,
}) => (
  <Box bg="white" p={6} shadow="md" borderRadius="md">
    <Text fontSize="lg" mb={4}>
      "{feedback}"
    </Text>
    <Text fontWeight="bold">- {name}</Text>
  </Box>
);

export default Home;
