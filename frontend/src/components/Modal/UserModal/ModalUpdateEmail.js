import React, { useEffect, useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import _ from "lodash";
import Form from 'react-bootstrap/Form';
import { updateUserEmail, logout } from "./../../../services/userService.js"
import { UserContext } from './../../../context/UserContext.js';
import { useNavigate } from "react-router-dom"

const ModalUpdateEmail = (props) => {
    const navigate = useNavigate()
    const { user, getAccount, setUser, logoutContext } = useContext(UserContext);
    const defaultEmail = {
        newEmail: ''
    };
    const defaultValidInputs = {
        newEmail: true
    }

    const [updateEmail, setEmail] = useState(defaultEmail);
    const [validInputs, setValidInputs] = useState(defaultValidInputs);
    const handleCloseModalUser = () => {
        setEmail(defaultEmail)
        setValidInputs(defaultValidInputs);
        props.onHide();
    };
    const handleOnChangeInput = (value, name) => {
        let _data = { ...updateEmail };
        _data[name] = value;
        setEmail(_data);
        setValidInputs(prevState => ({ ...prevState, [name]: true }));
    };

    const checkValidateInputs = () => {
        const { newEmail } = updateEmail;
        if (!newEmail) {
            toast.error('Please enter new email');
            setValidInputs(prevState => ({ ...prevState, newEmail: false }));
            return false;
        }
        return true;
    };

    const handleConfirmUpdate = async () => {
        if (checkValidateInputs() && updateEmail.newEmail) {
            let data = {
                email: user.email,
                username: user.username,
                newEmail: updateEmail.newEmail
            }
            const responseUpdate = await updateUserEmail(data);
            if (responseUpdate && +responseUpdate.EC === 0 && responseUpdate.EM) {
                setValidInputs(defaultValidInputs);
                setEmail(defaultEmail)
                toast.success(responseUpdate.EM);
                const responseLogout = await logout();
                if (responseLogout && +responseLogout.EC === 0 && responseLogout.EM) {
                    logoutContext();
                    navigate("/login");
                }
                else {
                    toast.error(responseLogout.EM);
                }
            }
            else {
                toast.error(responseUpdate.EM);
                setEmail(defaultEmail)
                setValidInputs(defaultValidInputs);
            }
            handleCloseModalUser();
        } else {
            navigate("/profile");
        }
    };


    return (
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
                    Update new email
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>New email</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter new email"
                            onChange={(e) => handleOnChangeInput(e.target.value, "newEmail")}
                            isInvalid={!validInputs.newEmail}
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide new email.
                        </Form.Control.Feedback>
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
    );
}

export default ModalUpdateEmail;
