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

import {Link as DomLink} from "react-router-dom";
import axios from "axios";

function SignUpPage() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault(); // Предотвратить стандартную отправку формы

        const formData = {
            first_name: firstName,
            last_name: lastName,
            email: email,
            password: password,
        };

        try {
            // Используем axios для отправки POST запроса
            const response = await axios.post('http://127.0.0.1:8000/users/register', formData);
            // Обработка успешного ответа
            console.log('User registered:', response.data);
            localStorage.setItem('accessToken', response.data.token);
            // Вы можете здесь добавить дополнительную логику,
            // например, перенаправление пользователя на страницу входа
        } catch (error) {
            // Обработка ошибок при отправке формы
            console.error('Error registering user:', error.response.data);
            // Показать сообщение об ошибке пользователю
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
                            <Button colorScheme="blue" size="lg" w="full" type="submit">
                                Sign Up
                            </Button>
                            <Flex justify="center" mt={4}>
                                <Text fontSize="sm" color="gray.600">
                                    Already have an account? <DomLink to="/login"><Link color="blue.500">Log
                                    In</Link></DomLink>
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