import React, { useEffect, useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import _ from "lodash";
import Form from 'react-bootstrap/Form';
import { editUsername, logout } from "./../../../services/userService.js"
import { UserContext } from './../../../context/UserContext.js';
import { useNavigate } from "react-router-dom"

const ModalEditUsername = (props) => {
    const navigate = useNavigate()
    const { user, getAccount, setUser, updateUserField } = useContext(UserContext);
    const defaultUsername = {
        newUsername: ''
    };
    const defaultValidInputs = {
        newUsername: true
    }

    const [updateUsername, setUsername] = useState(defaultUsername);
    const [validInputs, setValidInputs] = useState(defaultValidInputs);
    const handleCloseModalUser = () => {
        setUsername(defaultUsername)
        setValidInputs(defaultValidInputs);
        props.onHide();
    };
    const handleOnChangeInput = (value, name) => {
        let _data = { ...updateUsername };
        _data[name] = value;
        setUsername(_data);
        setValidInputs(prevState => ({ ...prevState, [name]: true }));
    };

    const checkValidateInputs = () => {
        const { newUsername } = updateUsername;
        if (!newUsername) {
            toast.error('Please enter new username');
            setValidInputs(prevState => ({ ...prevState, newUsername: false }));
            return false;
        }
        return true;
    };

    const handleConfirmUpdate = async () => {
        if (checkValidateInputs() && updateUsername.newUsername) {
            let data = {
                email: user.email,
                username: user.username,
                newUsername: updateUsername.newUsername
            }
            const responseUpdate = await editUsername(data);
            if (responseUpdate && +responseUpdate.EC === 0 && responseUpdate.EM) {
                toast.success(responseUpdate.EM);
                updateUserField("username", data.newUsername)
                // Cập nhật thông tin người dùng sau khi cập nhật username thành công
                await getAccount(); // hoặc cập nhật trực tiếp user ở đây
                setUsername(defaultUsername)
                setValidInputs(defaultValidInputs);
                handleCloseModalUser();
            }
            else {
                toast.error(responseUpdate.EM);
                setUsername(defaultUsername)
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
                    Update new username
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>New username</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter new username"
                            onChange={(e) => handleOnChangeInput(e.target.value, "newUsername")}
                            isInvalid={!validInputs.newUsername}
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide new username.
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

export default ModalEditUsername;
