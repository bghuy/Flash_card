import React from 'react';
import './NavHeader.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEarthAmerica, faSnowflake, faFeather, faGear } from '@fortawesome/free-solid-svg-icons'
import { faCcMastercard } from '@fortawesome/free-brands-svg-icons'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const NavHeader = () => {
    return (
        <Navbar expand="lg" className="bg-body-tertiary nav-header" bg="dark" data-bs-theme="dark">
            <Container fluid>
                <Navbar.Brand href="#home">
                    <FontAwesomeIcon icon={faFeather}></FontAwesomeIcon>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Nav.Link href="#home" className='nav-link'>Home</Nav.Link>
                        <Nav.Link href="#action2" className='nav-link'>Community</Nav.Link>
                        <Nav.Link href="#action3" className='nav-link'>Collections</Nav.Link>

                        {/* <Nav.Link href="#" disabled>
                            Link
                        </Nav.Link> */}
                    </Nav>

                    <Form className="d-flex">
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                        />
                        <Button variant="outline-success">Search</Button>
                    </Form>
                    <Nav>
                        <NavDropdown title={<FontAwesomeIcon icon={faGear} className='gear-icon' />} id="navbarScrollingDropdown" >
                            <NavDropdown.Item href="#action3">Profile</NavDropdown.Item>
                            <NavDropdown.Item href="#action4">
                                New account
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action5">
                                Logout
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}


export default NavHeader;