import {
    ChakraProvider,
    Box,
    Flex,
    Text,
    Button,
    Image, VStack, useColorModeValue,
} from '@chakra-ui/react';
import {ChevronLeftIcon, ChevronRightIcon} from '@chakra-ui/icons';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../App.css"
import {useEffect, useState} from "react";
import axios from "axios";


function HomePage() {
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
    const [cards, setCards] = useState([]);
    const [partnersImg, setPartnersImg] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://127.0.0.1:8000/jobs/get_free_jobs');
                setCards(response.data); // Предположим, что API возвращает объект с полем jobs, содержащим массив работ
            } catch (error) {
                console.error("Ошибка при получении данных:", error);

            }
        };
        const fetchPartnerImg = async () => {
            try {
                const response = await axios.get('https://127.0.0.1:8000/jobs/get_partners');
                setPartnersImg(response.data); // Предположим, что API возвращает объект с полем jobs, содержащим массив работ
            } catch (error) {
                console.error("Ошибка при получении данных:", error);

            }
        };
        fetchData();
        fetchPartnerImg();
    }, []);


    return (
        <>
            <Box bg={useColorModeValue('#E6F0FA', 'gray.700')} p={8}>
                <Flex direction={{base: 'column', md: 'row'}} align="center" justify="space-between"
                      maxW="1200px"
                      mx="auto">
                    <VStack align="start" spacing={4} maxW="600px">
                        <Text fontSize={{base: '3xl', md: '5xl'}} fontWeight="bold">
                            Укрепите уверенность.<br/>Получите работу.
                        </Text>
                        <Text fontSize={{base: 'md', md: 'lg'}}>
                            Изучите профессии и подготовьтесь к работе с помощью сотен бесплатных симуляторов работы,
                            разработанных ведущими работодателями мира.
                        </Text>
                        <Button colorScheme="yellow" size="lg"
                                rightIcon={<svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor" width="24" height="24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                                </svg>}>
                            Начать
                        </Button>
                    </VStack>
                    <Image src="src/media/main-logo.png" alt="Illustration" boxSize="400px"
                           objectFit="contain"/>
                </Flex>
            </Box>

            <Box bg="black" py={8}>
                <Slider {...settings}>
                    {partnersImg.map((partnersImg, index) => (
                        <Box key={index} px={2}>
                            <Flex justifyContent="center" alignItems="center">
                                <Image src={`/media/${partnersImg.image_filename}`} alt={`${partnersImg.name}`}
                                       maxW="100px"
                                       maxH="50px"
                                       objectFit="cover"/>
                            </Flex>
                        </Box>
                    ))}
                </Slider>
            </Box>

            <Box p={8}>
                <Text fontSize="2xl" fontWeight="bold" mb={4} textAlign="center">
                    Изучить наши бесплатные симуляции работы
                </Text>
                <Slider {...second_settings}>
                    {cards.map((card, index) => (
                        <Box key={index} p={2}>
                            <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
                                <Flex justifyContent="center" alignItems="center">
                                    <Image src={`/media/${card.image_filename}`} alt={card.title}
                                           maxW="300px"
                                           maxH="200px"
                                           objectFit="cover"/>
                                </Flex>
                                <Box p={4}>
                                    <Text fontWeight="bold" fontSize="lg">{card.company_name}</Text>
                                    <Text mt={2}>{card.title}</Text>
                                    <Text mt={2} fontSize="sm" color="gray.500">{card.details}</Text>
                                    <Text mt={2} fontSize="sm" color="gray.500">{card.duration}</Text>
                                    <Text mt={2} fontSize="sm"
                                          color="gray.500">{card.level} | {card.specialization}</Text>
                                </Box>
                            </Box>
                        </Box>
                    ))}
                </Slider>
            </Box>
        </>
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