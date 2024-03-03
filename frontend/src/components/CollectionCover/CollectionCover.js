import React, { useState, useContext } from 'react';
import "./CollectionCover.scss";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faHeart } from '@fortawesome/free-solid-svg-icons'
import NavDropdown from 'react-bootstrap/NavDropdown';
import ModalConfirmDelete from '../Modal/CollectionModal/ModalConfirmDelete';
import ModalAddPoster from '../Modal/CollectionModal/ModalAddPoster';
import ModalUpdateDetail from '../Modal/CollectionModal/ModalUpdateDetail';
import { setFavorite } from '../../services/myCollectionService'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/UserContext';
import { fetchAll } from '../../services/cardService';
function CollectionCover(props) {
    const navigate = useNavigate()
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showAddPosterModal, setShowAddPosterModal] = useState(false);
    const [showUpdateDetail, setShowUpdateDetail] = useState(false);
    const [isFavorite, setIsFavorite] = useState(props.favorite)
    const { user } = useContext(UserContext);
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
            favorite: newFavorite,
            email: user.email
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
    const practiceCollection = async (e) => {
        e.preventDefault();
        let data = {
            id: props.id, email: user.email
        }
        const cards = await fetchAll(data);
        if (cards && cards.DT && cards.DT.length >= 4) {
            navigate(`/practice?collectionId=${props.id}`)
        }
        else {
            toast.error("collection must have at least 4 cards to practice please add more card")
        }

    }
    return (
        <>
            <Card style={{ width: '18rem', position: 'relative', boxSizing: "border-box" }} className='card-cover' bg="dark" data-bs-theme="dark"  >

                <div className="three-dots-icon d-flex align-items-center gap-2" >
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

                <Card.Img variant="top" src={`http://localhost:8080/uploads/images/${props.imageName}`} style={{ height: "50%" }} />
                {/* </FontAwesomeIcon> */}
                <Card.Body style={{ height: "40%", overflow: "hidden" }}>
                    <Card.Title>{props.title}</Card.Title>
                    <Card.Text >
                        {props.description}
                    </Card.Text>


                </Card.Body>
                <div className='feature-btn my-3' style={{ height: "10%" }}>
                    <Button variant="outline-info" onClick={(e) => { viewFlashCards(e) }} className='me-1'>See all flashcards</Button>
                    <Button variant="outline-warning" onClick={(e) => { practiceCollection(e) }}>Practice</Button>
                </div>
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
