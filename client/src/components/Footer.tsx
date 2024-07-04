import {
    Box,
    Container,
    Stack,
    Text,
    IconButton,
    useColorModeValue,
  } from "@chakra-ui/react";
  import { FaTwitter, FaFacebook, FaInstagram } from "react-icons/fa";
  import { FC } from "react";
  
  const Footer: FC = () => {
    return (
      <Box
        bg={useColorModeValue("gray.100", "gray.900")}
        color={useColorModeValue("gray.700", "gray.200")}
        py={10}
      >
        <Container as={Stack} maxW="6xl" spacing={4}>
          <Stack direction={{ base: "column", md: "row" }} spacing={4} justify="space-between" align="center">
            <Text>© 2024 Unity Medical Center. All rights reserved</Text>
        
            <Stack direction={"row"} spacing={6}>
              <IconButton
                as="a"
                href="#"
                aria-label="Twitter"
                icon={<FaTwitter />}
                colorScheme="teal"
                variant="ghost"
              />
              <IconButton
                as="a"
                href="#"
                aria-label="Facebook"
                icon={<FaFacebook />}
                colorScheme="teal"
                variant="ghost"
              />
              <IconButton
                as="a"
                href="#"
                aria-label="Instagram"
                icon={<FaInstagram />}
                colorScheme="teal"
                variant="ghost"
              />
            </Stack>
          </Stack>
        </Container>
      </Box>
    );
  };
  
  export default Footer;
  