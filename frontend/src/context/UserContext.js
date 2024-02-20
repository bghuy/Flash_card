import React, { useState, useEffect, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserAccount } from './../services/userService.js';
const UserContext = createContext(null);

const UserProvider = ({ children }) => {
    const navigate = useNavigate();
    const userDefault = {
        isLoading: true,
        isAuthenticated: false,
        token: "fake token",
        email: '',
        username: ''

    }
    const [user, setUser] = useState(userDefault);
    useEffect(() => {
        // console.log("context trigger")

        async function getAccount() {
            try {
                let response = null;
                response = await getUserAccount();
                console.log("check response>>", response);
                const email = await response.DT.email;
                const username = await response.DT.username;
                const token = await response.DT.token;
                let data = {
                    isLoading: false,
                    isAuthenticated: true,
                    token: token,
                    email: email,
                    username: username
                }
                console.log(data);
                if (response && +response.EC === 0) {
                    setUser(data)
                }
                else {
                    setUser({ ...userDefault, isLoading: false })
                }

            } catch (error) {
                console.log('Error fetching data:', error)
                navigate('/login')
                setUser({ ...userDefault, isLoading: false })
            }
        }

        if (window.location.pathname !== "/" && window.location.pathname !== "/login" && window.location.pathname !== "/register" && window.location.pathname !== "/community") {
            getAccount();
        } else {
            setUser({ ...user, isLoading: false })
        }





    }, [])
    const loginContext = (userData) => {
        setUser({ ...userData, isLoading: false });
    };

    const logoutContext = () => {
        setUser({ ...userDefault, isLoading: false });
    };

    return (
        <UserContext.Provider value={{ user, loginContext, logoutContext }}>
            {children}
        </UserContext.Provider>
    );
}

export { UserContext, UserProvider };
