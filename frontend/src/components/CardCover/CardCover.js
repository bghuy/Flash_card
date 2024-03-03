import React, { useState } from 'react';
import "./CardCover.scss";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ModalConfirmDelete from '../Modal/CollectionModal/ModalConfirmDelete';
import ModalUpdateDetail from '../Modal/CollectionModal/ModalUpdateDetail';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'
function CardCover(props) {
    const navigate = useNavigate()
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showUpdateDetail, setShowUpdateDetail] = useState(false);
    const onHideModalConfirmDelete = () => {
        setShowDeleteModal(false);
    }
    const showModalConfirmDelete = () => {
        setShowDeleteModal(true);
    }
    const onHideModalUpdateDetail = () => {
        setShowUpdateDetail(false);
    }
    const showModalUpdateDetail = () => {
        setShowUpdateDetail(true);
    }

    const { fetchCardList } = props
    const reloadCardList = async () => {
        await fetchCardList()
    }
    return (
        <>
            <Card
                style={{ width: '16rem', position: 'relative' }}
                className='card-cover'
                bg="info"
                data-bs-theme="light"
                variant="flush">
                {/* </FontAwesomeIcon> */}
                <Card.Body>
                    <Card.Title >{props.title}</Card.Title>
                    <Card.Text>
                        {props.description}
                    </Card.Text>
                    <Button variant="warning" onClick={() => { showModalUpdateDetail() }} className='me-1'>Edit</Button>
                    <Button variant="danger" onClick={() => { showModalConfirmDelete() }}>Delete</Button>
                </Card.Body>
            </Card>
            <ModalConfirmDelete
                show={showDeleteModal}
                onHide={onHideModalConfirmDelete}
                id={props.id}
                action="card"
                reload={reloadCardList}
            />
            <ModalUpdateDetail
                show={showUpdateDetail}
                onHide={onHideModalUpdateDetail}
                id={props.id}
                reload={reloadCardList}
                title={props.title}
                description={props.description}
                action="card"
            />

        </>

    );
}

export default CardCover;
