// import { Outlet, useNavigate } from 'react-router-dom';
// import { useContext } from 'react';
// import { UserContext } from '../context/UserContext';

// function PrivateRoutes() {
//     const { user } = useContext(UserContext);
//     const navigate = useNavigate();

//     if (!user || user.isAuthenticated !== true) {
//         navigate('/login');
//         return null;
//     }

//     return <Outlet />;
// }

// export default PrivateRoutes;


import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

function PrivateRoutes({ children }) {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user || user.isAuthenticated !== true) {
            navigate('/login');
        }
    }, [user, navigate]);

    return user && user.isAuthenticated === true ? children : null;
}

export default PrivateRoutes;


