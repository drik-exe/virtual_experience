import React from 'react';
import {
  ChakraProvider,
  Box,
  Flex,
  VStack,
  HStack,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Button,
  Select,
  Radio,
  RadioGroup,
  Stack,
  Text,
  Link,
} from "@chakra-ui/react";

function SignUpPage() {
  return (
    <ChakraProvider>
      <Flex minH="100vh" align="center" justify="center" bg="gray.50">
        <Box
          bg="white"
          p={8}
          rounded="lg"
          shadow="lg"
          maxW="lg"
          w="full"
        >
          <VStack spacing={4} align="stretch">
            <HStack spacing={4}>
              <FormControl id="first-name" isRequired>
                <FormLabel>First Name</FormLabel>
                <Input placeholder="First Name" />
              </FormControl>
              <FormControl id="last-name" isRequired>
                <FormLabel>Last Name</FormLabel>
                <Input placeholder="Last Name" />
              </FormControl>
            </HStack>
            <FormControl id="email" isRequired>
              <FormLabel>Email</FormLabel>
              <Input type="email" placeholder="Email" />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password (Minimum 8 Characters)</FormLabel>
              <Input type="password" placeholder="Password" />
            </FormControl>
            <FormControl as="fieldset" isRequired>
              <FormLabel as="legend">What best describes you currently?</FormLabel>
              <RadioGroup defaultValue="In High School">
                <Stack direction="row" spacing={4}>
                  <Radio value="In High School">In High School</Radio>
                  <Radio value="In University/College">In University/College</Radio>
                  <Radio value="In Career">In Career</Radio>
                </Stack>
              </RadioGroup>
            </FormControl>
            <FormControl id="how-did-you-hear">
              <FormLabel>How did you hear about us?</FormLabel>
              <Select placeholder="Select an option">
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </Select>
            </FormControl>
            <Text fontSize="sm" color="gray.600">
              By signing up you agree to our <Link color="blue.500">terms of use</Link>, and acknowledge you have read the <Link color="blue.500">privacy notice</Link>.
            </Text>
            <Button colorScheme="blue" size="lg" w="full">
              Register
            </Button>
            <Flex justify="center" mt={4}>
              <Text fontSize="sm" color="gray.600">
                Already have an account? <Link color="blue.500">Login</Link>
              </Text>
            </Flex>
          </VStack>
        </Box>
      </Flex>
    </ChakraProvider>
  );
}

export default SignUpPage;