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
const defaultSearchValue = {
    value: '', isSearch: false
}
const pathShowSearchBar = ["/community", "/collections"]
const NavHeader = () => {
    const { user, logoutContext, updateSearchValue, searchValue } = useContext(UserContext);
    const [searchBarValue, setSearchBarValue] = useState(defaultSearchValue)
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
    const handleSearchCollections = (e) => {
        e.preventDefault();
        const trimmedSearchValue = searchBarValue.value.trim();
        if (trimmedSearchValue !== '') {
            const searchQuery = encodeURIComponent(trimmedSearchValue);
            navigate(`/collections?email=${user.email}&page=1&limit=3&search=${searchQuery}`);
            updateSearchValue({ value: trimmedSearchValue, isSearch: true });
        }
        setSearchBarValue(prevState => (defaultSearchValue))
    };

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
                            <NavLink to={`/collections?email=${user.email}&page=1&limit=3`} className="nav-link" >Collections</NavLink>
                        }
                        {user.isAuthenticated === false &&
                            <NavLink to="/login" className="nav-link"> Sign in</NavLink>
                        }
                        <NavLink to="/about" className="nav-link"> About</NavLink>
                    </Nav>
                    {pathShowSearchBar.includes(window.location.pathname) &&
                        <Form className="d-flex"  >
                            <Form.Control
                                type="search"
                                placeholder="Search for title"
                                className="me-2"
                                aria-label="Search"
                                value={searchBarValue.value}
                                onChange={(e) => { setSearchBarValue({ value: e.target.value, isSearch: false }) }}
                            />
                            <Button variant="outline-success" type='submit' onClick={(e) => handleSearchCollections(e)}>Search</Button>
                        </Form>
                    }
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