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
function LogInPage() {

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
                        <FormControl id="email" isRequired>
                            <FormLabel>Email</FormLabel>
                            <Input type="email" placeholder="Email"/>
                        </FormControl>
                        <FormControl id="password" isRequired>
                            <FormLabel>Password (Minimum 8 Characters)</FormLabel>
                            <Input type="password" placeholder="Password"/>
                        </FormControl>
                        <Button colorScheme="blue" size="lg" w="full">
                            Log In
                        </Button>
                        <Flex justify="center" mt={4}>
                            <Text fontSize="sm" color="gray.600">
                                Still don't have an account? <DomLink to="/signup"><Link color="blue.500">Sign Up</Link></DomLink>
                            </Text>
                        </Flex>
                    </VStack>
                </Box>
            </Flex>
        </ChakraProvider>
    );
}

export default LogInPage;