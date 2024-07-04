import {
  Box,
  Flex,
  Link,
  HStack,
  IconButton,
  useDisclosure,
  Stack,
  Image,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { Link as RouterLink } from "react-router-dom";
import { FC } from "react";
import logo from "../assets/logo.png";
const Links = ["Home", "Book an Appointment", "Login"];

const NavLink: FC<{ children: React.ReactNode }> = ({ children }) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: "gray.200",
    }}
    href={"#"}
  >
    {children}
  </Link>
);

const Navbar: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box bg="gray.100" px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"} w={"100vw"}>
            <Box>
              <Image
                src={logo}
                alt="Hospital Logo"
                objectFit="contain"
                maxW={"50px"}
              />
            </Box>

            <HStack
              as={"nav"}
              ms={"auto"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              <Link as={RouterLink} to="/">
                Home
              </Link>
              <Link as={RouterLink} to="/appointment">
                Make an Appointment
              </Link>
              <Link as={RouterLink} to="/dashboard">
                Dashboard
              </Link>
              <Link as={RouterLink} to="/login">
                Login
              </Link>
            </HStack>
          </HStack>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
};

export default Navbar;
