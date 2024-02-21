import React, { useEffect, useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import _ from "lodash";
import Form from 'react-bootstrap/Form';
import { updateUserPW, logout } from "./../../../services/userService.js"
import { UserContext } from './../../../context/UserContext.js';
import { useNavigate } from "react-router-dom"
const ModalChangePassword = (props) => {
    const navigate = useNavigate()
    const { user, logoutContext } = useContext(UserContext);
    const defaultPasswordData = {
        currentPassword: '',
        newPassword: '',
        confirmedNewPassword: ''
    };
    const defaultValidInputs = {
        currentPassword: true,
        newPassword: true,
        confirmedNewPassword: true
    }

    const [passwordData, setPasswordData] = useState(defaultPasswordData);
    const [validInputs, setValidInputs] = useState({ ...defaultValidInputs });
    const handleOnChangeInput = (value, name) => {
        try {
            let _data = { ...passwordData };
            _data[name] = value;
            setPasswordData(_data);

            setValidInputs(prevState => ({ ...prevState, [name]: true }));
        } catch (error) {
            console.log(error);
        }
    };

    const checkValidateInputs = () => {
        let isValid = true;
        const { currentPassword, newPassword, confirmedNewPassword } = passwordData;

        if (!currentPassword) {
            toast.error('Missing current password');
            setValidInputs(prevState => ({ ...prevState, currentPassword: false }));
            isValid = false;
        }

        if (!newPassword) {
            toast.error('Missing new password');
            setValidInputs(prevState => ({ ...prevState, newPassword: false }));
            isValid = false;
        }

        if (!confirmedNewPassword) {
            toast.error('Missing confirmed new password');
            setValidInputs(prevState => ({ ...prevState, confirmedNewPassword: false }));
            isValid = false;
        }

        if (newPassword !== confirmedNewPassword) {
            toast.error('New password and confirmed new password do not match');
            setValidInputs(prevState => ({
                ...prevState,
                newPassword: false,
                confirmedNewPassword: false
            }));
            isValid = false;
        }

        return isValid;
    };
    const handleCloseModalUser = () => {
        setPasswordData(defaultPasswordData);
        setValidInputs({ ...defaultValidInputs });
        props.onHide();
    };
    const handleConfirmUpdate = async () => {
        const isValid = checkValidateInputs();
        if (isValid) {
            let data = {
                ...passwordData, email: user.email
            }
            const responseUpdate = await updateUserPW(data);
            if (responseUpdate && +responseUpdate.EC === 0 && responseUpdate.EM) {
                setValidInputs(defaultValidInputs);
                setPasswordData(defaultPasswordData)

                toast.success(responseUpdate.EM);
                logoutContext();
                const responseLogout = await logout();
                if (responseLogout && +responseLogout.EC === 0 && responseLogout.EM) {
                    navigate("/login");
                }
                else {
                    toast.error(responseLogout.EM);
                }
            }
            else {
                toast.error(responseUpdate.EM);
                setPasswordData(defaultPasswordData)
                setValidInputs(defaultValidInputs);
            }
            handleCloseModalUser();
        } else {
            // toast.error("please fill all information needed");
            navigate("/profile");
        }
    };

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
                        Update new password
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Your password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter current password"
                                onChange={(e) => handleOnChangeInput(e.target.value, "currentPassword")}
                                isInvalid={!validInputs.currentPassword}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid current password.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>New password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter new password"
                                onChange={(e) => handleOnChangeInput(e.target.value, "newPassword")}
                                isInvalid={!validInputs.newPassword}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid new password.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Confirm new password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter new password again"
                                onChange={(e) => handleOnChangeInput(e.target.value, "confirmedNewPassword")}
                                isInvalid={!validInputs.confirmedNewPassword}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please confirm your new password.
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
        </>
    );
}

export default ModalChangePassword;
