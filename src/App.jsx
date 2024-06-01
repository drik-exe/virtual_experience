import {useState} from 'react';
import {
    ChakraProvider,
    Box,
    Flex,
    Text,
    Button,
    Avatar,
    IconButton,
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    Stack, Image, VStack, HStack
} from '@chakra-ui/react';
import {HamburgerIcon, ChevronDownIcon, ArrowForwardIcon} from '@chakra-ui/icons';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
function App() {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [placement, setPlacement] = useState('right');
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1
                }
            }
        ]
    };

    return (
        <ChakraProvider>
            <Box bg="white" px={4} boxShadow="md">
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
                        <Button variant="outline" colorScheme="yellow" rightIcon={<ChevronDownIcon/>}>
                            Explore
                        </Button>
                        <Text mx={4}>Blog</Text>
                        <Text mx={4}>For Employers</Text>
                        <Text mx={4}>For Educators</Text>
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

            <Box bg="#E6F0FA" p={8}>
                <Flex direction={{base: 'column', md: 'row'}} align="center" justify="space-between" maxW="1200px"
                      mx="auto">
                    <VStack align="start" spacing={4} maxW="600px">
                        <Text fontSize={{base: '3xl', md: '5xl'}} fontWeight="bold" color="#1A202C">
                            Build confidence.<br/> Get the job.
                        </Text>
                        <Text fontSize={{base: 'md', md: 'lg'}} color="#4A5568">
                            Explore careers and prepare for the job with hundreds of free job simulations designed by
                            the world's top employers.
                        </Text>
                        <Button colorScheme="blue" size="lg"
                                rightIcon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                stroke="currentColor" width="24" height="24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                                </svg>}>
                            Get Started
                        </Button>
                    </VStack>
                    <Image src="https://via.placeholder.com/400" alt="Illustration" boxSize="400px"
                           objectFit="contain"/>
                </Flex>
            </Box>
            <Box bg="black" py={8}>
                <Slider {...settings}>
                    <Box px={2}>
                        <Flex justifyContent="center" alignItems="center">
                            <Image src="https://via.placeholder.com/100x50?text=Walmart" alt="Walmart"/>
                        </Flex>
                    </Box>
                    <Box px={2}>
                        <Flex justifyContent="center" alignItems="center">
                            <Image src="https://via.placeholder.com/100x50?text=lululemon" alt="lululemon"/>
                        </Flex>
                    </Box>
                    <Box px={2}>
                        <Flex justifyContent="center" alignItems="center">
                            <Image src="https://via.placeholder.com/100x50?text=J.P.Morgan" alt="J.P.Morgan"/>
                        </Flex>
                    </Box>
                    <Box px={2}>
                        <Flex justifyContent="center" alignItems="center">
                            <Image src="https://via.placeholder.com/100x50?text=RedBull" alt="RedBull"/>
                        </Flex>
                    </Box>
                    <Box px={2}>
                        <Flex justifyContent="center" alignItems="center">
                            <Image src="https://via.placeholder.com/100x50?text=BCG" alt="BCG"/>
                        </Flex>
                    </Box>
                    <Box px={2}>
                        <Flex justifyContent="center" alignItems="center">
                            <Image src="https://via.placeholder.com/100x50?text=Bank+of+America" alt="Bank of America"/>
                        </Flex>
                    </Box>
                </Slider>
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


        </ChakraProvider>
    );
}

export default App;