import {
    ChakraProvider,
} from '@chakra-ui/react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./App.css"
import { Routes, Route, Link } from 'react-router-dom';
import HomePage from "./pages/HomePage.jsx";



function App() {

    return (
        <ChakraProvider>
            <Routes>
                <Route path="/" element={ <HomePage/>}></Route>
            </Routes>

        </ChakraProvider>
    );


}

export default App;