import React, { useEffect, useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import _ from "lodash";
import Form from 'react-bootstrap/Form';
import { updateUserEmail, logout } from "./../../../services/userService.js"
import { UserContext } from './../../../context/UserContext.js';
import { useNavigate } from "react-router-dom"
import { deleteCollection } from "./../../../services/myCollectionService.js"
import { deleteCard } from '../../../services/cardService.js';
const ModalConfirmDelete = (props) => {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const { id, reload, show, onHide } = props;
    const handleCloseModalUser = () => {
        onHide()
    };

    const handleConfirmUpdate = async () => {
        if (id) {
            let response = null;
            if (props.action === "collection") {
                response = await deleteCollection(+id);
            }
            else {
                response = await deleteCard(+id);
            }
            if (response && +response.EC === 0 && response.EM) {
                toast.success(response.EM);
                // navigate(`/collections?email=${user.email}`);
                await reload();
                handleCloseModalUser();
            }
            else {
                toast.error(response.EM);
            }
            handleCloseModalUser();
        } else {
            toast.error("data of collection is incorrect !");
            handleCloseModalUser();
        }
    };
    return (
        <Modal
            {...props}
            size="lg"
            centered
            show={show}
            onHide={handleCloseModalUser}
            className='modal-updatePassword'
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Confirmed notification
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure to delete the collection ?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={handleCloseModalUser} >
                    No
                </Button>
                <Button variant="success" onClick={handleConfirmUpdate}>
                    Yes
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalConfirmDelete;

