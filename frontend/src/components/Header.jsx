import {
    Avatar,
    Box,
    Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay,
    Flex,
    IconButton,
    Menu,
    MenuButton,
    MenuDivider,
    MenuGroup,
    MenuItem,
    MenuList, Spacer, Stack,
    Text, useColorMode, useDisclosure
} from "@chakra-ui/react";
import {ChevronDownIcon, HamburgerIcon, MoonIcon, SunIcon} from "@chakra-ui/icons";
import {useEffect, useState} from "react";
import {createBrowserRouter, Link, Outlet} from "react-router-dom";
import Footer from "./Footer.jsx";
import axios from "axios";
import {SiNetflix} from "react-icons/si";

axios.defaults.withCredentials = true;

function Header() {
    const [isHovering, setIsHovering] = useState(false);
    // const {colorMode, toggleColorMode} = props;
    const {colorMode, toggleColorMode} = useColorMode();
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [placement, setPlacement] = useState('right');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userAvatar, setUserAvatar] = useState("src/media/user-none.png");
    const [specializations, setSpecialization] = useState([]);

    const MousePress = () => {
        setIsHovering(!isHovering);
    };

    const checkAuthStatus = async () => {
        const user = await axios.get('https://127.0.0.1:8000/users/me');
        setIsAuthenticated(!!user);
        console.log(user);
        if (user) {
            // Здесь можно установить ссылку на аватар пользователя, если у вас есть такая информация
            // Например: setUserAvatar('path-to-user-avatar.jpg');
        }
    };

    const handleLogout = async () => {
        try {
            await axios.post('https://127.0.0.1:8000/users/logout');
            setIsAuthenticated(false);
        } catch (error) {
            console.error("Ошибка при выходе:", error);
        }
    };
    const fetchSpeciallization = async () => {
        try {
            const response = await axios.get('https://127.0.0.1:8000/jobs/get_specializations');
            setSpecialization(response.data);
        } catch (error) {
            console.error("Ошибка при получении данных:", error);

        }
    };


    useEffect(() => {
        checkAuthStatus();
        fetchSpeciallization();
    }, []);

    return (
        <>

            <Box px={4} boxShadow="md">
                <Flex h={16} alignItems="center" justifyContent="space-between">
                    <Box>
                        <Flex alignItems="center">
                            <Box as="img" src="src/media/main-logo.png" alt="Logo" h={8}/>
                            <Text fontSize="2xl" fontWeight="bold" ml={2}>
                                VE
                            </Text>
                        </Flex>
                    </Box>

                    <Flex display={{base: 'none', md: 'flex'}} alignItems="center">
                        <Menu>
                            <MenuButton as={Button} variant="outline" colorScheme="yellow"
                                        rightIcon={<ChevronDownIcon
                                            transform={(isHovering) ? 'rotate(0deg)' : 'rotate(270deg)'}/>}
                                        onClick={MousePress}>
                                Изучить
                            </MenuButton>
                            <MenuList>
                                <MenuGroup title="Симуляции работы">
                                    {specializations.map((item, index) => (
                                        <MenuItem key={index} as={Link} to={`job-simulations?specialization=${item}`}>{item}</MenuItem>
                                    ))}
                                </MenuGroup>
                                {/*<MenuDivider/>*/}
                            </MenuList>
                        </Menu>
                        <Text mx={4}>Блог</Text>
                        <Text mx={4}>Для работодателей</Text>
                        <Text mx={4}>Для педагогов</Text>
                        <IconButton
                            ml={2}
                            icon={colorMode === 'dark' ? <SunIcon/> : <MoonIcon/>}
                            isRound="true"
                            size="md"
                            onClick={() => {
                                toggleColorMode(); // Переключаем тему
                                // window.location.reload(); // Перезагружаем страницу
                            }}
                            aria-label={`Switch to ${colorMode === 'dark' ? 'light' : 'dark'} mode`}
                        />
                    </Flex>

                    <Flex alignItems="center">
                        {!isAuthenticated ? (
                            <Link to="/signup">
                                <Button display={{base: 'none', md: 'block'}} colorScheme="yellow" mr={4}>
                                    Регистрация
                                </Button>
                            </Link>
                        ) : (
                            <Flex>
                                <Button display={{base: 'none', md: 'block'}} colorScheme="yellow" mr={4}
                                        onClick={handleLogout}>
                                    Выйти
                                </Button>
                                <Avatar
                                    display={{base: 'none', md: 'block'}}
                                    size="sm"
                                    name="User"
                                    borderRadius="0"
                                    src={userAvatar}
                                ></Avatar>
                            </Flex>
                        )}

                        <IconButton
                            display={{base: 'flex', md: 'none'}}
                            aria-label="Open Menu"
                            icon={<HamburgerIcon/>}
                            onClick={onOpen}
                        />
                    </Flex>
                </Flex>
            </Box>
            <Drawer placement={placement} onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay/>
                <DrawerContent>
                    <DrawerCloseButton/>
                    <DrawerHeader>Меню</DrawerHeader>
                    <DrawerBody>
                        <Stack spacing={4}>
                            <Menu>
                                <MenuButton as={Button} variant="outline" colorScheme="yellow"
                                            rightIcon={<ChevronDownIcon
                                                transform={(isHovering) ? 'rotate(0deg)' : 'rotate(270deg)'}/>}
                                            onClick={MousePress}>
                                    Изучить
                                </MenuButton>
                                <MenuList>
                                    <MenuGroup title="Симуляции работы">
                                        {specializations.map((item, index) => (
                                            <MenuItem key={index}>{item}</MenuItem>
                                        ))}
                                    </MenuGroup>
                                    {/*<MenuDivider/>*/}
                                </MenuList>
                            </Menu>
                            <Text>Блог</Text>
                            <Text>Для работодателей</Text>
                            <Text>Для преподавателей</Text>

                            {!isAuthenticated ? (
                                <Link to="signup"><Button colorScheme="yellow">Регистрация</Button></Link>
                            ) : (
                                <Flex>
                                    <Button display={{ md: 'block'}} colorScheme="yellow" mr={4}
                                            onClick={handleLogout}>
                                        Выйти
                                    </Button>
                                    <Avatar size="sm" name="User" borderRadius="0" src="src/media/user-none.png"/>
                                </Flex>
                            )}
                        </Stack>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
            {/*{*/}
            {/*    props.renderHeader(colorMode)*/}
            {/*}*/}

            <Outlet></Outlet>

            <Footer/>
        </>
    )
}

export default Header
