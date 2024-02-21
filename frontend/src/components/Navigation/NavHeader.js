import React, { useContext, useEffect, useState } from 'react';
import './NavHeader.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEarthAmerica, faSnowflake, faFeather, faGear, faL } from '@fortawesome/free-solid-svg-icons'
import { faCcMastercard } from '@fortawesome/free-brands-svg-icons'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, useLocation, Link, useNavigate } from 'react-router-dom';
import { logout } from "./../../services/userService.js"
import { toast } from 'react-toastify';
import { UserContext } from '../../context/UserContext.js';
const NavHeader = () => {
    const { user, logoutContext } = useContext(UserContext);

    const navigate = useNavigate()
    const handleLogout = async () => {
        logoutContext();
        const response = await logout();
        if (response && +response.EC === 0 && response.EM) {
            // setUserAuth(false);
            toast.success(response.EM);
            navigate("/login");
        }
        else {
            toast.error(response.EM);
        }

    }

    const navigateToProfile = () => {
        navigate("/profile")
    }
    const navigateToRegister = () => {
        navigate("/register")
    }
    const [userAuth, setUserAuth] = useState(false);
    useEffect(() => {
        // console.log("check user", user.isAuthenticated);
        // if (user.isAuthenticated) {
        //     setUserAuth(true);
        // }
        // else {
        //     setUserAuth(false);
        // }
    }, [user.isAuthenticated])
    return (
        <Navbar expand="lg" className="bg-body-tertiary nav-header" bg="dark" data-bs-theme="dark">
            <Container fluid>
                <Navbar.Brand to="#home">
                    <FontAwesomeIcon className='web-icon' icon={faFeather} onClick={() => { navigate("/") }}></FontAwesomeIcon>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <NavLink to="/" className="nav-link">Home</NavLink>
                        <NavLink to="/community" className="nav-link">Community</NavLink>
                        {user.isAuthenticated === true &&
                            <NavLink to="/collections" className="nav-link" >Collections</NavLink>
                        }
                        {user.isAuthenticated === false &&
                            <NavLink to="/login" className="nav-link"> Sign in</NavLink>
                        }
                        <NavLink to="/about" className="nav-link"> About</NavLink>
                    </Nav>
                    {window.location.pathname === "/community" &&
                        <Form className="d-flex" >
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                            />
                            <Button variant="outline-success">Search</Button>
                        </Form>}
                    {user.isAuthenticated &&
                        <Nav>
                            <NavDropdown title={<FontAwesomeIcon icon={faGear} className='gear-icon' />}
                                id="navbarScrollingDropdown"
                                align={{ lg: 'end' }} >
                                <NavDropdown.Item onClick={() => { navigateToProfile() }}>Profile</NavDropdown.Item>
                                <NavDropdown.Item onClick={() => { navigateToRegister() }}>
                                    New account
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={() => { handleLogout() }}>
                                    Logout
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    }
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}


export default NavHeader;