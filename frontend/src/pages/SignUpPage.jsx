import React, {useState} from 'react';
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

import {Link as DomLink, useNavigate} from "react-router-dom";
import axios from "axios";


axios.defaults.withCredentials = true;

function SignUpPage() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault(); // Предотвратить стандартную отправку формы

        const formData = {
            first_name: firstName,
            last_name: lastName,
            email: email,
            password: password,
        };

        try {
            const response = await axios.post('https://127.0.0.1:8000/users/register', formData);
            console.log('User registered:', response.data);
            setIsAuthenticated(true);
            navigate('/');  // Перенаправление на домашнюю страницу при успешном логине
        } catch (error) {
            console.error('Error registering user:', error.response.data);
        }
    };

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
                    <form onSubmit={handleSubmit}>
                        <VStack spacing={4} align="stretch">
                            <HStack spacing={4}>
                                <FormControl id="first-name" isRequired>
                                    <FormLabel>First Name</FormLabel>
                                    <Input placeholder="First Name" value={firstName}
                                           onChange={(e) => setFirstName(e.target.value)}/>
                                </FormControl>
                                <FormControl id="last-name" isRequired>
                                    <FormLabel>Last Name</FormLabel>
                                    <Input placeholder="Last Name" value={lastName}
                                           onChange={(e) => setLastName(e.target.value)}/>
                                </FormControl>
                            </HStack>
                            <FormControl id="email" isRequired>
                                <FormLabel>Email</FormLabel>
                                <Input type="email" placeholder="Email" value={email}
                                       onChange={(e) => setEmail(e.target.value)}/>
                            </FormControl>
                            <FormControl id="password" isRequired>
                                <FormLabel>Password (Minimum 8 Characters)</FormLabel>
                                <Input type="password" placeholder="Password" value={password}
                                       onChange={(e) => setPassword(e.target.value)}/>
                            </FormControl>
                            <Text fontSize="sm" color="gray.600">
                                By signing up you agree to our <Link color="blue.500">terms of use</Link>, and
                                acknowledge
                                you have read the <Link color="blue.500">privacy notice</Link>.
                            </Text>
                            <DomLink to="/">
                                <Button colorScheme="yellow" size="lg" w="full" type="submit">
                                    Sign Up
                                </Button>
                            </DomLink>
                            <Flex justify="center" mt={4}>
                                <Text fontSize="sm" color="gray.600">
                                    Already have an account? <Link as={DomLink} to="/login" color="blue.500">Log
                                    In</Link>
                                </Text>
                            </Flex>
                        </VStack>
                    </form>
                </Box>
            </Flex>
        </ChakraProvider>
    );
}

export default SignUpPage;