
import React, { useEffect, useState, useContext } from 'react';

import Login from './../components/Login/Login.js'
import Register from './../components/Register/Register.js';
import Profile from '../components/Profile/Profile.js';
// import User from '../components/manage-users/User.js';
// import PrivateRoutes from './PrivateRoutes.js';
import { Routes, Route } from 'react-router-dom';
function AppRoutes(props) {
    return (
        // <>
        //     <Switch>
        //         {/* <PrivateRoutes path={"/users"} component={User} /> */}

        //         <Route path="/" exact>
        //             {/* <Login /> */}
        //             <h1>Hello world</h1>
        //         </Route>
        //         <Route path="/login" exact>
        //             <Login />
        //         </Route>
        //         <Route path="/register" exact>
        //             {/* <Register /> */}
        //         </Route>
        //         <Route path="/collections" exact>
        //             <h1>Collections</h1>
        //         </Route>
        //         <Route path="/community" exact>
        //             <h1>Community</h1>
        //         </Route>
        //         <Route path="*" >
        //             <h1>404 not found</h1>
        //         </Route>
        //     </Switch>
        // </>
        <>
            <Routes>
                <Route path='/' element={<h1>hello</h1>} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/collections" element={<h1>Collections</h1>} />
                <Route path="/community" element={<h1>Community</h1>} />
                <Route path="/profile" element={<Profile />} />
                <Route path="*" element={<h1>404 not found</h1>} />
            </Routes>
        </>
    );
}

export default AppRoutes;