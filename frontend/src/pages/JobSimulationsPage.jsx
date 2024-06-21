import React, {useEffect, useState} from 'react';
import {
    ChakraProvider,
    Box,
    Flex,
    Text,
    Button,
    Image,
    VStack,
    HStack,
    Select,
    Checkbox,
    SimpleGrid,
    Spinner,
    IconButton,
    useColorMode,
    useDisclosure
} from '@chakra-ui/react';
import {ChevronLeftIcon, ChevronRightIcon} from '@chakra-ui/icons';
import axios from 'axios';

const JobCard = ({job}) => (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={4}>
        {job.image_filename && (
            <Flex justify="center" align="center" mb={4}>
                <Image src={`/media/${job.image_filename}`} alt={`${job.company_name} logo`} maxW="300px"
                       maxH="200px"
                       objectFit="cover"/>
            </Flex>
        )}
        <Text fontWeight="bold" fontSize="xl">{job.company_name}</Text>
        <Text mt={2} fontSize="lg">{job.title}</Text>
        <Text mt={2} fontSize="sm" color="gray.500">{job.details}</Text>
        <Text mt={2} fontSize="sm" color="gray.500">{job.level}</Text>
        <Text mt={2} fontSize="sm" color="gray.500">{job.duration}</Text>
    </Box>
);

const Paginate = ({currentPage, totalPages, onPageChange}) => (
    <HStack spacing={4} mt={8} justify="center">
        <IconButton
            icon={<ChevronLeftIcon/>}
            onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
            disabled={currentPage === 1}
        />
        <Text>{`Page ${currentPage} of ${totalPages}`}</Text>
        <IconButton
            icon={<ChevronRightIcon/>}
            onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
            disabled={currentPage === totalPages}
        />
    </HStack>
);

const JobSimulationPage = () => {
    const [jobs, setJobs] = useState([]);
    const [specializations, setSpecializations] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const jobsPerPage = 8; // Количество карточек на странице

    useEffect(() => {
        // Fetch data
        const fetchData = async () => {
            try {
                const jobsResponse = await axios.get(`https://127.0.0.1:8000/jobs/job_by_specialization?specialization=${new URL(location.href).searchParams.get('specialization')}`);
                const specializationsResponse = await axios.get('https://127.0.0.1:8000/jobs/get_specializations');
                const companiesResponse = await axios.get('https://127.0.0.1:8000/jobs/get_partners');

                setJobs(jobsResponse.data);
                setSpecializations(specializationsResponse.data);
                setCompanies(companiesResponse.data);
                setIsLoading(true);
            } catch (error) {
                console.error('Error fetching data:', error);
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const indexOfLastJob = currentPage * jobsPerPage;
    const indexOfFirstJob = indexOfLastJob - jobsPerPage;
    const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

    return (

        <Box p={8}>
            <Text fontSize="3xl" fontWeight="bold" mb={4}>
                {new URL(location.href).searchParams.get('specialization') || 'Программа симуляции работы'}
            </Text>
            <Text fontSize="lg" mb={4}>
                Присоединяйтесь к числу ведущих студентов в разных областях.
            </Text>

            <Flex direction={{base: 'column', md: 'row'}} mb={4}>
                <Select placeholder="Специализация" mr={{base: 0, md: 4}} mb={{base: 2, md: 0}}
                        w={{base: '100%', md: 500}}>
                    {specializations.map((spec, index) => (
                        <option key={index} value={index}>{spec}</option>
                    ))}
                </Select>
                <Select placeholder="Компания" mr={{base: 0, md: 4}} mb={{base: 2, md: 0}} w={{base: '100%', md: 500}}>
                    {companies.map((company, index) => (
                        <option key={index} value={company.partner_id}>{company.name}</option>
                    ))}
                </Select>
                <Checkbox colorScheme='yellow' size='md' mr={{base: 0, md: 4}}
                          mb={{base: 2, md: 0}}>Бесплатные</Checkbox>
                <Button ml={2} colorScheme='yellow' size='md' mb={{base: 2, md: 0}}>Очистить</Button>
                <Button ml={2} colorScheme='yellow' size='md' mb={{base: 2, md: 0}}>Применить</Button>
            </Flex>

            {!isLoading ? (
                <Flex justify="center" align="center" height="200px">
                    <Spinner/>
                </Flex>
            ) : (
                <>
                    <SimpleGrid columns={{base: 1, md: 2, lg: 3, xl: 4}} spacing={8}>
                        {currentJobs.map((job, index) => (
                            <JobCard key={index} job={job}/>
                        ))}
                    </SimpleGrid>

                    <Paginate
                        currentPage={currentPage}
                        totalPages={Math.ceil(jobs.length / jobsPerPage)}
                        onPageChange={setCurrentPage}
                    />
                </>
            )}
        </Box>

    );
};

export default JobSimulationPage;