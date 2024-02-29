import React, { useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import Form from 'react-bootstrap/Form';
import { uploadCollectionPoster } from '../../../services/uploadService'
import { UserContext } from './../../../context/UserContext.js';
import { createCollection } from '../../../services/myCollectionService.js'
import { logout } from '../../../services/userService.js'
import { createCard } from '../../../services/cardService.js';
const ModalCreateCard = (props) => {
    const defaultCollectionDetail = {
        title: '',
        description: ''
    };
    const defaultValidInputs = {
        title: true,
        description: true
    }
    const { show, onHide, reload, cId } = props;
    const [collectionDetail, setCollectionDetail] = useState(defaultCollectionDetail);
    const [validInputs, setValidInputs] = useState({ ...defaultValidInputs });

    const { user, logoutContext } = useContext(UserContext);
    const handleCloseModalUser = () => {
        setValidInputs(defaultValidInputs);
        setCollectionDetail(defaultCollectionDetail);
        onHide();
    };
    const handleOnChangeInput = (value, name) => {
        try {
            let _data = { ...collectionDetail };
            _data[name] = value;
            setCollectionDetail(() => _data);
            setValidInputs(() => defaultValidInputs);
        } catch (error) {
            console.log(error);
        }
    };
    const checkValidateTitle = () => {
        let isValid = true;
        const { title, description } = collectionDetail;

        if (!title.trim()) {
            toast.error('Title can not be empty');
            setValidInputs((prevState) => ({ ...prevState, title: false }));
            isValid = false;
        }
        if (!description.trim()) {
            toast.error('Description can not be empty');
            setValidInputs((prevState) => ({ ...prevState, description: false }));
            isValid = false;
        }
        return isValid;
    };
    const handleConfirmCreateCard = async () => {
        try {
            const isValid = checkValidateTitle();
            if (isValid) {
                let data = {
                    title: collectionDetail.title, description: collectionDetail.description, collectionId: +cId
                }
                const responseUpdate = await createCard(data);
                if (responseUpdate && +responseUpdate.EC === 0 && responseUpdate.EM) {
                    setValidInputs(defaultValidInputs);
                    setCollectionDetail(defaultCollectionDetail)
                    toast.success(responseUpdate.EM);
                    await reload();
                    handleCloseModalUser();
                }
                else {
                    toast.error(responseUpdate.EM);
                    setCollectionDetail(defaultCollectionDetail)
                    setValidInputs(defaultValidInputs);
                }
            }
        } catch (error) {
            console.log(error);
            toast.error("something is wrong!")
            await logout();
            logoutContext()
        }
    }
    return (
        <Modal
            {...props}
            size="lg"
            centered
            show={show}
            onHide={handleCloseModalUser}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Create new card
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter title"
                        onChange={(e) => handleOnChangeInput(e.target.value, "title")}
                        value={collectionDetail.title}
                        isInvalid={!validInputs.title}
                    />
                    <Form.Control.Feedback type="invalid">
                        Title can not be empty
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter description"
                        onChange={(e) => handleOnChangeInput(e.target.value, "description")}
                        value={collectionDetail.description}
                        isInvalid={!validInputs.description}
                    />
                    <Form.Control.Feedback type="invalid">
                        Description can not be empty
                    </Form.Control.Feedback>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={() => { handleCloseModalUser() }} >
                    Cancel
                </Button>

                <Button variant="success" onClick={() => { handleConfirmCreateCard() }}>
                    Create
                </Button>

            </Modal.Footer>
        </Modal>
    );
}

export default ModalCreateCard;
