import React, { useState } from 'react';
import "./CollectionCover.scss";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faHeart } from '@fortawesome/free-solid-svg-icons'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import ModalConfirmDelete from '../Modal/CollectionModal/ModalConfirmDelete';
import ModalAddPoster from '../Modal/CollectionModal/ModalAddPoster';
import ModalUpdateDetail from '../Modal/CollectionModal/ModalUpdateDetail';
import ModalCreateCollection from '../Modal/CollectionModal/ModalCreateCollection';
import { setFavorite } from '../../services/myCollectionService'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'
function CollectionCover(props) {
    const navigate = useNavigate()
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showAddPosterModal, setShowAddPosterModal] = useState(false);
    const [showUpdateDetail, setShowUpdateDetail] = useState(false);
    const [isFavorite, setIsFavorite] = useState(props.favorite)
    const { reload } = props
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
    const onHideModalUpdateDetail = () => {
        setShowUpdateDetail(false);
    }
    const showModalUpdateDetail = () => {
        setShowUpdateDetail(true);
    }

    const { fetchCollections } = props
    const reloadCollection = async () => {
        // props.reload();
        await fetchCollections()
    }
    const toggleFavorite = async () => {
        const newFavorite = !isFavorite;
        let data = {
            id: props.id,
            favorite: newFavorite
        }
        let response = await setFavorite(data);
        if (response && +response.EC === 0 && response.EM) {
            setIsFavorite(() => !isFavorite);
            await reload();
        }
        else {
            toast.error(response.EM);
        }

    }
    const viewFlashCards = (e) => {
        e.preventDefault();
        navigate(`/flashcards?cId=${props.id}&page=1&limit=8`)
    }
    return (
        <>
            <Card style={{ width: '18rem', position: 'relative' }} className='card-cover' bg="dark" data-bs-theme="dark" >
                <Card.Img variant="top" src={`http://localhost:8080/uploads/images/${props.imageName}`} style={{ maxHeight: "210.200px" }} />
                <div className="three-dots-icon d-flex align-items-center gap-2">
                    <FontAwesomeIcon
                        icon={faHeart}
                        className='favorite-icon'
                        style={{ color: props.favorite ? 'red' : 'gray' }}
                        is-favorite={props.favorite ? 'true' : 'false'}
                        onClick={() => { toggleFavorite() }}
                    />
                    <NavDropdown
                        title={<FontAwesomeIcon icon={faEllipsisVertical} />}
                        id="navbarScrollingDropdown"
                        align={{ lg: 'end' }}
                        bg="dark" data-bs-theme="dark"
                    >
                        <NavDropdown.Item onClick={() => showModalAddPoster()}>Update poster</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => showModalUpdateDetail()}>Edit detail</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={() => showModalConfirmDelete()}>
                            Delete
                        </NavDropdown.Item>
                    </NavDropdown>
                </div>


                {/* </FontAwesomeIcon> */}
                <Card.Body>
                    <Card.Title>{props.title}</Card.Title>
                    <Card.Text>
                        {props.description}
                    </Card.Text>
                    <Button variant="outline-info" onClick={(e) => { viewFlashCards(e) }} className='me-1'>See all flashcards</Button>
                    <Button variant="outline-warning" onClick={(e) => { viewFlashCards(e) }}>Practice</Button>
                </Card.Body>
            </Card>
            <ModalConfirmDelete
                show={showDeleteModal}
                onHide={onHideModalConfirmDelete}
                id={props.id}
                reload={reloadCollection}
                action="collection"
            />
            <ModalAddPoster
                show={showAddPosterModal}
                onHide={onHideModalAddPoster}
                collectionid={props.id}
                reload={reloadCollection}
            />
            <ModalUpdateDetail
                show={showUpdateDetail}
                onHide={onHideModalUpdateDetail}
                id={props.id}
                reload={reloadCollection}
                title={props.title}
                description={props.description}
                action="collection"
            />

        </>

    );
}

export default CollectionCover;
