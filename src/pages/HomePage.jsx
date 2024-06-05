import {
    ChakraProvider,
    Box,
    Flex,
    Text,
    Button,
    Image, VStack,
} from '@chakra-ui/react';
import {ChevronLeftIcon, ChevronRightIcon} from '@chakra-ui/icons';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../App.css"
import Header from "../components/Header.jsx";
import {useState} from "react";

function HomePage(props) {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        nextArrow: <SampleNextArrow/>,
        prevArrow: <SamplePrevArrow/>,
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
    const cards = [
        {
            image: "https://via.placeholder.com/300x200?text=J.P.Morgan",
            title: "Investment Banking",
            company: "JPMorgan Chase",
            details: "Banking & Financial Services",
            duration: "3-4 hours",
            level: "Advanced"
        },
        {
            image: "https://via.placeholder.com/300x200?text=lululemon",
            title: "Omnichannel Marketing",
            company: "lululemon",
            details: "Marketing",
            duration: "6-7 hours",
            level: "Intermediate"
        },
        {
            image: "https://via.placeholder.com/300x200?text=PepsiCo",
            title: "Sales",
            company: "PepsiCo",
            details: "Sales",
            duration: "2-3 hours",
            level: "Introductory"
        },
        {
            image: "https://via.placeholder.com/300x200?text=accenture",
            title: "Data Analytics and Visualization",
            company: "Accenture North America",
            details: "Data",
            duration: "2-3 hours",
            level: "Intermediate"
        },
        {
            image: "https://via.placeholder.com/300x200?text=Red+Bull",
            title: "On-Premise Sales",
            company: "Red Bull",
            details: "Sales",
            duration: "1-2 hours",
            level: "Introductory"
        }
    ];
    const second_settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        nextArrow: <SimulationsNextArrow/>,
        prevArrow: <SimulationsPrevArrow/>,
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
    const bg = {light: '#E6F0FA', dark: "gray.700"};


    return (
        <ChakraProvider>


            <Box bg={bg[props.appColorMode]} p={8}>
                <Flex direction={{base: 'column', md: 'row'}} align="center" justify="space-between"
                      maxW="1200px"
                      mx="auto">
                    <VStack align="start" spacing={4} maxW="600px">
                        <Text fontSize={{base: '3xl', md: '5xl'}} fontWeight="bold">
                            Build confidence.<br/> Get the job.
                        </Text>
                        <Text fontSize={{base: 'md', md: 'lg'}}>
                            Explore careers and prepare for the job with hundreds of free job simulations
                            designed by
                            the world top employers.
                        </Text>
                        <Button colorScheme="blue" size="lg"
                                rightIcon={<svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                viewBox="0 0 24 24"
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

            <Box p={8}>
                <Text fontSize="2xl" fontWeight="bold" mb={4} textAlign="center">
                    Explore our free job simulations
                </Text>
                <Slider {...second_settings}>
                    {cards.map((card, index) => (
                        <Box key={index} p={2}>
                            <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
                                <Flex justifyContent="center" alignItems="center">
                                    <Image src={card.image} alt={card.title}/>
                                </Flex>
                                <Box p={4}>
                                    <Text fontWeight="bold" fontSize="lg">{card.company}</Text>
                                    <Text mt={2}>{card.title}</Text>
                                    <Text mt={2} fontSize="sm" color="gray.500">{card.details}</Text>
                                    <Text mt={2} fontSize="sm" color="gray.500">{card.duration}</Text>
                                    <Text mt={2} fontSize="sm" color="gray.500">{card.level}</Text>
                                </Box>
                            </Box>
                        </Box>
                    ))}
                </Slider>
            </Box>
        </ChakraProvider>
    );

    function SampleNextArrow(props) {
        const {className, style, onClick} = props;
        return (
            <div
                className={className}
                style={{...style, display: "block", right: "10px"}} // Настройка позиции кнопки
                onClick={onClick}
            />
        );
    }

    function SamplePrevArrow(props) {
        const {className, style, onClick} = props;
        return (
            <div
                className={className}
                style={{...style, display: "block", left: "10px", zIndex: 1}} // Настройка позиции кнопки
                onClick={onClick}
            />
        );
    }

    function SimulationsNextArrow(props) {
        const {style, onClick} = props;
        return (
            <div
                style={{
                    ...style,
                    display: "block",
                    position: "absolute",
                    right: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    zIndex: 2,
                    cursor: "pointer",

                }}
                onClick={onClick}
            ><ChevronRightIcon style={{fontSize: '36px'}}></ChevronRightIcon></div>
        );
    }

    function SimulationsPrevArrow(props) {
        const {style, onClick} = props;
        return (
            <div
                style={{
                    ...style,
                    display: "block",
                    position: "absolute",
                    left: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    zIndex: 2,
                    cursor: "pointer"
                }}
                onClick={onClick}
            ><ChevronLeftIcon style={{fontSize: '36px'}}></ChevronLeftIcon></div>
        );
    }

}

export default HomePage;