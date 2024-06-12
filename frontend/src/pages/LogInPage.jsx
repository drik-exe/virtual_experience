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

function LogInPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault(); // Предотвратить стандартную отправку формы

        const formData = { email, password };

        try {
            const response = await axios.post('https://127.0.0.1:8000/users/login', formData);
            console.log('User logged in:', response.data);
            setIsAuthenticated(true);
            navigate('/');  // Перенаправление на домашнюю страницу при успешном логине
        } catch (error) {
            console.error('Error logging user:', error.response.data);
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
                                <FormLabel>Почта</FormLabel>
                                <Input type="email" placeholder="Почта" value={email}
                                       onChange={(e) => setEmail(e.target.value)}/>
                            </FormControl>
                            <FormControl id="password" isRequired>
                                <FormLabel>Пароль</FormLabel>
                                <Input type="password" placeholder="Пароль" value={password}
                                       onChange={(e) => setPassword(e.target.value)}/>
                            </FormControl>
                                <Button colorScheme="yellow" size="lg" w="full" type="submit">
                                    Войти
                                </Button>
                            <Flex justify="center" mt={4}>
                                <Text fontSize="sm" color="gray.600">
                                    Все еще нет аккаунта? <Link as={DomLink} to="/signup" color="yellow.500">Зарегистрируйся!</Link>
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