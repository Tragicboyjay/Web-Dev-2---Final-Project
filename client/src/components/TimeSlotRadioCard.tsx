import React from "react";
import { Box, Flex, Radio, Text } from "@chakra-ui/react";
import { useRadio, UseRadioProps } from "@chakra-ui/react";

interface TimeSlotRadioCardProps extends UseRadioProps {
  time: string;
}

const TimeSlotRadioCard: React.FC<TimeSlotRadioCardProps> = ({
  time,
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
        <Text fontSize="lg">{time}</Text>
      </Flex>
    </Box>
  );
};

export default TimeSlotRadioCard;
