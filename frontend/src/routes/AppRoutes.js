
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './../components/Login/Login.js'
import Register from './../components/Register/Register.js';
import Profile from '../components/Profile/Profile.js';
import PrivateRoutes from './PrivateRoutes.js';
import Collections from '../components/Collections/Collections.js';

function AppRoutes() {
    return (
        <>
            <Routes>
                <Route path='/' element={<h1>hello</h1>} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/community" element={<h1>Community</h1>} />
                <Route path="/about" element={<h1>About</h1>} />
                <Route path="/profile" element={<PrivateRoutes><Profile /></PrivateRoutes>} />
                <Route path="/collections" element={<PrivateRoutes><Collections /></PrivateRoutes>} />
                <Route path="*" element={<h1>404 not found</h1>} />
            </Routes>
        </>
    );
}

export default AppRoutes;


