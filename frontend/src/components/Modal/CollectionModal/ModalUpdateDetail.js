import React, { useEffect, useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import _ from "lodash";
import Form from 'react-bootstrap/Form';
import { UserContext } from './../../../context/UserContext.js';
import { useNavigate } from "react-router-dom"
import { updateCollectionDetail } from '../../../services/myCollectionService.js'
const ModalUpdateDetail = (props) => {
    const defaultCollectionDetail = {
        title: props.title,
        description: props.description
    };
    const defaultValidInputs = {
        title: true,
    }
    const navigate = useNavigate()
    const { user, logoutContext } = useContext(UserContext);
    const { reload } = props;


    const [collectionDetail, setCollectionDetail] = useState(defaultCollectionDetail);
    const [validInputs, setValidInputs] = useState({ ...defaultValidInputs });
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

    const checkValidateInputs = () => {
        let isValid = true;
        const { title, description } = collectionDetail;

        if (!title.trim()) {
            toast.error('Title can not be empty');
            setValidInputs(() => false);
            isValid = false;
        }
        return isValid;
    };
    const handleCloseModalUser = () => {
        setCollectionDetail(defaultCollectionDetail);
        setValidInputs({ ...defaultValidInputs });
        props.onHide();
    };
    const handleConfirmUpdate = async () => {
        const isValid = checkValidateInputs();
        if (isValid) {
            let data = {
                title: collectionDetail.title, description: collectionDetail.description, id: props.id, email: user.email
            }
            const responseUpdate = await updateCollectionDetail(data);
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
    };
    useEffect(() => {
        setCollectionDetail(() => defaultCollectionDetail)
    }, [props])

    return (
        <>
            <Modal
                {...props}
                size="lg"
                centered
                show={props.show}
                onHide={handleCloseModalUser}
                className='modal-updatePassword'
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Update collection detail
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicTitle">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter current password"
                                onChange={(e) => handleOnChangeInput(e.target.value, "title")}
                                value={collectionDetail.title}
                                isInvalid={!validInputs.title}
                            />
                            <Form.Control.Feedback type="invalid">
                                Title can not be empty
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter new password"
                                onChange={(e) => handleOnChangeInput(e.target.value, "description")}
                                value={collectionDetail.description}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleCloseModalUser} >
                        Cancel
                    </Button>
                    <Button variant="success" onClick={handleConfirmUpdate}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalUpdateDetail;
