import React from 'react';
import {
  ChakraProvider,
  Box,
  Flex,
  HStack,
  Text,
  Link,
} from "@chakra-ui/react";
import {FaLinkedin, FaInstagram, FaTelegram, FaGithub} from 'react-icons/fa';

function Footer() {
  return (
    <ChakraProvider>
      <Box as="footer" py={4} mt="auto" w="full">
          <Flex direction="column" align="center">
            <Text mb={2}>&copy; 2024 VE, Inc. All rights reserved.</Text>
            <HStack spacing={4}>
              <Link href="https://t.me/drikexe" isExternal>
                <FaTelegram size="24" />
              </Link>
              <Link href="https://github.com/drik-exe" isExternal>
                <FaGithub size="24" />
              </Link>
              <Link href="http://linkedin.com/in/daniil-drik/" isExternal>
                <FaLinkedin size="24" />
              </Link>
              <Link href="https://www.instagram.com/drik.exe/" isExternal>
                <FaInstagram size="24" />
              </Link>
            </HStack>
          </Flex>
        </Box>
    </ChakraProvider>
  );
}

export default Footer;