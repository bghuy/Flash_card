import React, { useState } from 'react';
import "./CollectionCover.scss";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import ModalConfirmDelete from '../Modal/CollectionModal/ModalConfirmDelete';
import ModalAddPoster from '../Modal/CollectionModal/ModalAddPoster';
function CollectionCover(props) {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showAddPosterModal, setShowAddPosterModal] = useState(false);
    const onHideModalConfirmDelete = () => {
        setShowDeleteModal(false);
    }
    const showModalConfirmDelete = () => {
        setShowDeleteModal(true);
    }
    const onHideModalAddPoster = () => {
        setShowAddPosterModal(false);
    }
    const showModalAddPoster = () => {
        setShowAddPosterModal(true);
    }
    const { fetchCollections } = props
    const reloadCollection = async () => {
        // props.reload();
        await fetchCollections()
    }
    return (
        <>
            <Card style={{ width: '18rem', position: 'relative' }} className='card-cover' bg="dark" data-bs-theme="dark" key={props.keyName}>
                <Card.Img variant="top" src={`http://localhost:8080/uploads/images/${props.imageName}`} style={{ maxHeight: "210.200px" }} />
                <NavDropdown
                    className="three-dots-icon"
                    title={<FontAwesomeIcon icon={faEllipsisVertical} />}
                    id="navbarScrollingDropdown"
                    align={{ lg: 'end' }}
                    bg="dark" data-bs-theme="dark"
                >
                    <NavDropdown.Item onClick={() => showModalAddPoster()}>Update poster</NavDropdown.Item>
                    <NavDropdown.Item >Edit detail</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={() => showModalConfirmDelete()}>
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
            <ModalConfirmDelete
                show={showDeleteModal}
                onHide={onHideModalConfirmDelete}
                collectionid={props.id}
                reload={reloadCollection}
            />
            <ModalAddPoster
                show={showAddPosterModal}
                onHide={onHideModalAddPoster}
                collectionid={props.id}
                reload={reloadCollection}
            />
        </>

    );
}

export default CollectionCover;
