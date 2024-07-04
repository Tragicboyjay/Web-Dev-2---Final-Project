import React from "react";
import { Box, Flex, Radio, Text, Image } from "@chakra-ui/react";
import { useRadio, UseRadioProps } from "@chakra-ui/react";

interface CustomRadioCardProps extends UseRadioProps {
  doctor: {
    _id: string;
    firstName: string;
    lastName: string;
    practice: string;
    avatar: string;
  };
}

const CustomRadioCard: React.FC<CustomRadioCardProps> = ({
  doctor,
  ...props
}) => {
  const { getInputProps, getCheckboxProps } = useRadio(props);
  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label">
      <input {...input} />
      <Flex
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        _checked={{
          bg: "teal.600",
          color: "white",
          borderColor: "teal.600",
        }}
        _focus={{
          boxShadow: "outline",
        }}
        px={5}
        py={3}
        alignItems="center"
      >
       
        <Box>
          <Text fontSize="lg" fontWeight="bold">
            {doctor.firstName} {doctor.lastName}
          </Text>
          <Text fontSize="sm" color="gray.600">
            {doctor.practice}
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default CustomRadioCard;
