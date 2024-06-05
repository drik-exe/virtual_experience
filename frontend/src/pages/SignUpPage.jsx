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
    Button,
    Text,
    Link,
} from "@chakra-ui/react";

import {Link as DomLink} from "react-router-dom";

function SignUpPage() {

    return (
        <ChakraProvider>
            <Flex minH="100vh" align="center" justify="center">
                <Box
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
                                <Input placeholder="First Name"/>
                            </FormControl>
                            <FormControl id="last-name" isRequired>
                                <FormLabel>Last Name</FormLabel>
                                <Input placeholder="Last Name"/>
                            </FormControl>
                        </HStack>
                        <FormControl id="email" isRequired>
                            <FormLabel>Email</FormLabel>
                            <Input type="email" placeholder="Email"/>
                        </FormControl>
                        <FormControl id="password" isRequired>
                            <FormLabel>Password (Minimum 8 Characters)</FormLabel>
                            <Input type="password" placeholder="Password"/>
                        </FormControl>
                        <Text fontSize="sm" color="gray.600">
                            By signing up you agree to our <Link color="blue.500">terms of use</Link>, and acknowledge
                            you have read the <Link color="blue.500">privacy notice</Link>.
                        </Text>
                        <Button colorScheme="blue" size="lg" w="full">
                            Sign Up
                        </Button>
                        <Flex justify="center" mt={4}>
                            <Text fontSize="sm" color="gray.600">
                                Already have an account? <DomLink to="/login"><Link color="blue.500">Log In</Link></DomLink>
                            </Text>
                        </Flex>
                    </VStack>
                </Box>
            </Flex>
        </ChakraProvider>
    );
}

export default SignUpPage;