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

function LogInPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault(); // Предотвратить стандартную отправку формы

        const formData = {
            email: email,
            password: password,
        };

        try {
            // Используем axios для отправки POST запроса
            const response = await axios.post('http://127.0.0.1:8000/users/login', formData);
            // Обработка успешного ответа
            console.log('User logged in:', response.data);
            localStorage.setItem('accessToken', response.data.token);
            // Вы можете здесь добавить дополнительную логику,
            // например, перенаправление пользователя на страницу входа
        } catch (error) {
            // Обработка ошибок при отправке формы
            console.error('Error logging user:', error.response.data);
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
                            <Button colorScheme="yellow" size="lg" w="full" type="submit">
                                Log In
                            </Button>
                            <Flex justify="center" mt={4}>
                                <Text fontSize="sm" color="gray.600">
                                    Still don't have an account? <Link as={DomLink} to="/signup" color="blue.500">Sign
                                    Up</Link>
                                </Text>
                            </Flex>
                        </VStack>
                    </form>
                </Box>
            </Flex>
        </ChakraProvider>
    );
}

export default LogInPage;