import React, { useState, useEffect, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserAccount } from './../services/userService.js';
const UserContext = createContext(null);
const userDefault = {
    isLoading: true,
    isAuthenticated: false,
    token: "fake token",
    email: '',
    username: ''

}
const searchValueDefault = {
    value: '',
    isSearch: false
}

const UserProvider = ({ children }) => {
    // const navigate = useNavigate();
    const [user, setUser] = useState(userDefault);
    const [searchValue, setSearch] = useState(searchValueDefault);
    async function getAccount() {
        try {
            let response = null;
            response = await getUserAccount();
            console.log(response);
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
            if (response && +response.EC === 0) {
                // setUser(data)
                setUser(prevState => ({ ...prevState, ...data }))
            }
            else {
                // setUser({ ...userDefault, isLoading: false })
                setUser(prevState => ({ ...prevState, ...userDefault, isLoading: false }))
            }

        } catch (error) {
            console.log('Error fetching data:', error)
            // navigate('/login')
            // setUser({ ...userDefault, isLoading: false })
            setUser(prevState => ({ ...prevState, ...userDefault, isLoading: false }))
        }
    }

    useEffect(() => {
        // console.log("context trigger")


        if (window.location.pathname !== "/login" && window.location.pathname !== "/register") {
            getAccount();
        } else {
            // setUser({ ...user, isLoading: false })
            setUser(prevState => ({ ...prevState, isLoading: false }))
        }
    }, [])


    const loginContext = (userData) => {
        // setUser({ ...userData, isLoading: false });
        setUser(prevState => ({ ...prevState, ...userData, isLoading: false }))
    };

    const logoutContext = () => {
        // setUser({ ...userDefault, isLoading: false });
        setUser(prevState => ({ ...prevState, ...userDefault, isLoading: false }))
    };
    const updateUserField = (name, value) => {
        setUser(prevState => ({ ...prevState, [name]: value }))
    }
    const updateSearchValue = (data) => {
        setSearch(prevState => data);
    }


    return (
        <UserContext.Provider value={{ user, loginContext, logoutContext, getAccount, updateUserField, searchValue, updateSearchValue }}>
            {children}
        </UserContext.Provider>
    );
}

export { UserContext, UserProvider };
