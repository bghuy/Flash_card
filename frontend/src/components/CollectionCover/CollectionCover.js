import React from 'react';
import "./CollectionCover.scss";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
function CollectionCover(props) {
    return (
        <Card style={{ width: '18rem', position: 'relative' }} className='card-cover' bg="dark" data-bs-theme="dark" key={props.keyName}>
            <Card.Img variant="top" src="https://flyingmag.sfo3.digitaloceanspaces.com/flyingma/wp-content/uploads/2022/06/23090933/AdobeStock_249454423-scaled.jpeg" />
            {/* <div className="three-dots-icon">...</div> */}
            {/* <FontAwesomeIcon className="three-dots-icon" icon={faEllipsisVertical}> */}
            <NavDropdown
                className="three-dots-icon"
                title={<FontAwesomeIcon icon={faEllipsisVertical} />}
                id="navbarScrollingDropdown"
                align={{ lg: 'end' }}
                bg="dark" data-bs-theme="dark"
            >
                <NavDropdown.Item >Edit</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item >
                    Delete
                </NavDropdown.Item>
            </NavDropdown>

            {/* </FontAwesomeIcon> */}
            <Card.Body>
                <Card.Title>{props.title}</Card.Title>
                <Card.Text>
                    {props.description}
                </Card.Text>
                <Button variant="outline-info">Go detail</Button>
            </Card.Body>
        </Card>
    );
}

export default CollectionCover;
