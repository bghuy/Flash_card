import NavHeader from './../../components/Navigation/NavHeader';
import Container from 'react-bootstrap/esm/Container';
import Spinner from 'react-bootstrap/Spinner';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from "./../../context/UserContext.js"
import { RotatingLines } from 'react-loader-spinner'
import AppRoutes from './../../routes/AppRoutes.js';
function AppContent(props) {
    const [userIsLoadingChange, SetUserIsLoadingChange] = useState(false);
    const { user } = useContext(UserContext);
    useEffect(() => {
        SetUserIsLoadingChange(true);
    }, [user.isLoading]);
    return (
        <div className="App">

            <header className="App-header ">
                <NavHeader />
            </header>
            <main className='App-main'>

                {user && user.isLoading === true
                    ?
                    <div className='loading-container'>
                        <RotatingLines
                            visible={true}
                            height="96"
                            width="96"
                            color="grey"
                            strokeWidth="5"
                            animationDuration="0.75"
                            ariaLabel="rotating-lines-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                        />
                        <div>Loading data...</div>
                    </div>
                    :
                    <AppRoutes />
                }

            </main>
            <footer className='App-footer'>

            </footer>

        </div>
    );
}

export default AppContent;