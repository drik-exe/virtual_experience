import {
    ChakraProvider,
} from '@chakra-ui/react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./App.css"
import {Routes, Route, Link} from 'react-router-dom';
import HomePage from "./pages/HomePage.jsx";
import Header from "./components/Header.jsx";
import React, {useState} from "react";
import SignUpPage from "./pages/SignUpPage.jsx";
import LogInPage from "./pages/LogInPage.jsx";
import JobSimulationPage from "./pages/JobSimulationsPage.jsx";


function App() {

    // const [appColorMode, setAppColorMode] = useState('light');
    // const renderHeader = (colorMode) => {
    //     setAppColorMode(colorMode);
    // }

    return (
        <ChakraProvider>
            <Routes>
                <Route path="/" element={<Header ></Header>}>
                    <Route index element={<HomePage />}></Route>
                    {/*остальные адреса в этой вложенности можно без слеша*/}
                    <Route path="job-simulations" element={<JobSimulationPage />}></Route>
                </Route>
                <Route path="/signup" element={<SignUpPage/>}></Route>
                <Route path="/login" element={<LogInPage/>}></Route>
            </Routes>

        </ChakraProvider>
    );


}

export default App;