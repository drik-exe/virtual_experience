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
                                    <FormLabel>Фамилия</FormLabel>
                                    <Input placeholder="Фамилия" value={firstName}
                                           onChange={(e) => setFirstName(e.target.value)}/>
                                </FormControl>
                                <FormControl id="last-name" isRequired>
                                    <FormLabel>Имя</FormLabel>
                                    <Input placeholder="Имя" value={lastName}
                                           onChange={(e) => setLastName(e.target.value)}/>
                                </FormControl>
                            </HStack>
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
                            <Text fontSize="sm" color="gray.600">
                                Подписываясь, вы соглашаетесь с нашими <Link color="yellow.500">условиями
                                использования</Link>, и
                                соглашаетесь,
                                что прочитал наше <Link color="yellow.500">соглашение о конфиденциальности</Link>.
                            </Text>
                            <DomLink to="/">
                                <Button colorScheme="yellow" size="lg" w="full" type="submit">
                                    Зарегестрироваться
                                </Button>
                            </DomLink>
                            <Flex justify="center" mt={4}>
                                <Text fontSize="sm" color="gray.600">
                                    Уже есть аккаунт? <Link as={DomLink} to="/login" color="yellow.500">Войдите</Link>
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