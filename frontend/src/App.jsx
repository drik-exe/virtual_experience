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


function App() {

    const [appColorMode, setAppColorMode] = useState('light');
    const renderHeader = (colorMode) => {
        setAppColorMode(colorMode);
    }

    return (
        <ChakraProvider>
            <Routes>
                <Route path="/" element={<Header renderHeader={renderHeader}></Header>}>
                    <Route index element={<HomePage appColorMode={appColorMode}/>}></Route>
                    {/*остальные адреса в этой вложенности можно без слеша*/}
                </Route>
                <Route path="/signup" element={<SignUpPage/>}></Route>
                <Route path="/login" element={<LogInPage/>}></Route>
            </Routes>

        </ChakraProvider>
    );


}

export default App;