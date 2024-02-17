import React, { useState, useEffect, createContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
// import { getUserAccount } from '../components/services/userService';
const UserContext = createContext(null);

const UserProvider = ({ children }) => {
    const userDefault = {
        isLoading: true,
        isAuthenticated: false,
        token: "fake token",
        account: {}
    }
    const [user, setUser] = useState(userDefault);
    // useEffect(() => {

    //     async function getAccount() {
    //         try {
    //             let response = null;
    //             // response = await getUserAccount();
    //             const scope = await response.DT.scope;
    //             const email = await response.DT.email;
    //             const username = await response.DT.username;
    //             let data = {
    //                 isLoading: false,
    //                 isAuthenticated: true,
    //                 token: "fake token",
    //                 account: { scope, email, username }
    //             }
    //             if (response && +response.EC === 0) {
    //                 setUser(data)
    //             }
    //             else {
    //                 setUser({ ...userDefault, isLoading: false })
    //             }

    //         } catch (error) {
    //             console.error('Error fetching data:', error);
    //         }
    //     }
    //     if (window.location.pathname !== "/" && window.location.pathname !== "/login") {
    //         getAccount();
    //     } else {
    //         setUser({ ...user, isLoading: false })
    //     }

    // }, [])

    // useEffect(() => {
    //     console.log("check user", user);
    // }, [user]);

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
