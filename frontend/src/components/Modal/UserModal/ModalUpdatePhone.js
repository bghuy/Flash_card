import React, { useEffect, useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import _ from "lodash";
import Form from 'react-bootstrap/Form';
import { updateUserPhone, logout } from "./../../../services/userService.js"
import { UserContext } from './../../../context/UserContext.js';
import { useNavigate } from "react-router-dom"

const ModalUpdatePhone = (props) => {
    const navigate = useNavigate()
    const { user, getAccount, setUser, logoutContext } = useContext(UserContext);
    const defaultPhone = {
        newPhone: ''
    };
    const defaultValidInputs = {
        newPhone: true
    }

    const [updatePhone, setPhone] = useState(defaultPhone);
    const [validInputs, setValidInputs] = useState(defaultValidInputs);
    const handleCloseModalUser = () => {
        setPhone(defaultPhone)
        setValidInputs(defaultValidInputs);
        props.onHide();
    };
    const handleOnChangeInput = (value, name) => {
        let _data = { ...updatePhone };
        _data[name] = value;
        setPhone(_data);
        setValidInputs(prevState => ({ ...prevState, [name]: true }));
    };

    const checkValidateInputs = () => {
        const { newPhone } = updatePhone;
        if (!newPhone) {
            toast.error('Please enter new email');
            setValidInputs(prevState => ({ ...prevState, newPhone: false }));
            return false;
        }
        return true;
    };

    const handleConfirmUpdate = async () => {
        if (checkValidateInputs() && updatePhone.newPhone) {
            let data = {
                email: user.email,
                username: user.username,
                newPhone: updatePhone.newPhone
            }
            const responseUpdate = await updateUserPhone(data);
            if (responseUpdate && +responseUpdate.EC === 0 && responseUpdate.EM) {
                setPhone(defaultPhone)
                setValidInputs(defaultValidInputs);
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
                setPhone(defaultPhone)
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
                    Update new phone number
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>New phone number</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter new phone number"
                            onChange={(e) => handleOnChangeInput(e.target.value, "newPhone")}
                            isInvalid={!validInputs.newPhone}
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide new phone number.
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

export default ModalUpdatePhone;
