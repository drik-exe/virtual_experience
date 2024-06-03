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
    MenuList, Stack,
    Text, useColorMode, useDisclosure
} from "@chakra-ui/react";
import {ChevronDownIcon, HamburgerIcon, MoonIcon, SunIcon} from "@chakra-ui/icons";
import {useState} from "react";

function Header(props) {
    const [isHovering, setIsHovering] = useState(false);
    // const {colorMode, toggleColorMode} = props;
    const {colorMode, toggleColorMode} = useColorMode();
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [placement, setPlacement] = useState('right');

    const MousePress = () => {
        setIsHovering(!isHovering);
    };


    return (
        <>

            <Box px={4} boxShadow="md">
                <Flex h={16} alignItems="center" justifyContent="space-between">
                    <Box>
                        <Flex alignItems="center">
                            <Box as="img" src="https://via.placeholder.com/50" alt="Logo" h={8}/>
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
                                Explore
                            </MenuButton>
                            <MenuList>
                                <MenuGroup title="Job Simulations">
                                    <MenuItem>Banking & Financial Services</MenuItem>
                                    <MenuItem>Software Engineering</MenuItem>
                                    <MenuItem>Law</MenuItem>
                                    <MenuItem>Consulting</MenuItem>
                                </MenuGroup>
                                <MenuDivider/>
                                <MenuGroup title="Career Paths">
                                    <MenuItem>Software Engineering</MenuItem>
                                    <MenuItem>Investment Banking</MenuItem>
                                </MenuGroup>
                            </MenuList>
                        </Menu>
                        <Text mx={4}>Blog</Text>
                        <Text mx={4}>For Employers</Text>
                        <Text mx={4}>For Educators</Text>
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
                        <Button display={{base: 'none', md: 'block'}} colorScheme="yellow" mr={4}>
                            Sign Up
                        </Button>
                        <Avatar display={{base: 'none', md: 'block'}} size="sm" name="User"
                                src="https://via.placeholder.com/40"/>
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
                    <DrawerHeader>Menu</DrawerHeader>
                    <DrawerBody>
                        <Stack spacing={4}>
                            <Button variant="outline" colorScheme="yellow" rightIcon={<ChevronDownIcon/>}>
                                Explore
                            </Button>
                            <Text>Blog</Text>
                            <Text>For Employers</Text>
                            <Text>For Educators</Text>
                            <Button colorScheme="yellow">Sign Up</Button>
                            <Avatar size="sm" name="User" src="https://via.placeholder.com/40"/>
                        </Stack>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
            {props.renderHeader(colorMode)}
        </>
    )
}

export default Header
