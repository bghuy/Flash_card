
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './../components/Login/Login.js'
import Register from './../components/Register/Register.js';
import Profile from '../components/Profile/Profile.js';
import PrivateRoutes from './PrivateRoutes.js';
import Collections from '../components/Collections/Collections.js';
import Cards from '../components/Cards/Card.js';
function AppRoutes() {
    return (
        <>
            <Routes>
                <Route path='/' element={<h1>hello</h1>} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/about" element={<h1>About</h1>} />
                <Route path="/profile" element={<PrivateRoutes><Profile /></PrivateRoutes>} />
                <Route path="/collections" element={<PrivateRoutes><Collections /></PrivateRoutes>} />
                <Route path="/flashcards" element={<PrivateRoutes><Cards /></PrivateRoutes>} />
                <Route path="*" element={<h1>404 not found</h1>} />
            </Routes>
        </>
    );
}

export default AppRoutes;


