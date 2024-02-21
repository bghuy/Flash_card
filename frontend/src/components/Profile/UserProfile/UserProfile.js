import React, { useEffect, useState, useContext } from 'react';
import { fetchUser } from './../../../services/userService.js'
import { toast } from "react-toastify"
import { UserContext } from "./../../../context/UserContext.js"
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import Button from "react-bootstrap/Button"
import ModalChangePassword from '../../Modal/UserModal/UpdatePassword.js';
import ModalEditUsername from '../../Modal/UserModal/EditUsername.js';
import "./UserProfile.scss"
function UserProfile(props) {
    const userDefault = {
        email: "",
        username: "",
        phone: ""
    }
    const [userInfo, setUserInfo] = useState({});
    const { user } = useContext(UserContext);
    const [showModalUpdatePW, setShowModalUpdatePW] = useState(false);
    const [showModalEditUN, setShowModalEditUN] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const getUser = async (email) => {
            let response = await fetchUser(email);
            if (response && +response.EC === 0 && response.EM && response.DT) {
                // toast.success(response.EM);
                setUserInfo(response.DT);
            }
            else {
                toast.error(response.EM);
                setUserInfo(userDefault)
            }
        }
        if (user.email) {
            getUser(user.email);
        }
        else {
            toast.error("unauthorized user please login");
            navigate('/login')
        }
    }, [])
    const handleEditPhone = () => {

    }
    const handleEditEmail = () => {

    }
    const handleChangePassword = () => {
        setShowModalUpdatePW(true);
    }
    const onHideModalUpdatePW = () => {
        setShowModalUpdatePW(false);
    }
    const handleEditUsername = () => {
        setShowModalEditUN(true);
    }
    const onHideModalEditUN = () => {
        setShowModalEditUN(false);
    }
    return (
        <>
            <div className='user-info-container'>
                <div className='detail-container d-flex justify-content-between align-items-center' id='username'>
                    <div className='left'>
                        <label className='me-3'>Username </label>
                        <span>{userInfo.username}</span>
                    </div>
                    <div className='right'>
                        <FontAwesomeIcon
                            icon={faPenToSquare}
                            className='edit-icon'
                            onClick={() => { handleEditUsername() }}

                        ></FontAwesomeIcon>
                    </div>

                </div>
                <hr />
                <div className='detail-container d-flex justify-content-between  align-items-center' id='email'>
                    <div className='left'>
                        <label className='me-3'>Email </label>
                        <span>{userInfo.email}</span>

                    </div>
                    <div className='right'>
                        <FontAwesomeIcon icon={faPenToSquare} className='edit-icon'></FontAwesomeIcon>
                    </div>

                </div>
                <hr />
                <div className='detail-container d-flex justify-content-between  align-items-center' id='phone'>
                    <div className='left'>
                        <label className='me-3'>Phone number</label>
                        <span>{userInfo.phone}</span>
                    </div>
                    <div className='right'>
                        <FontAwesomeIcon icon={faPenToSquare} className='edit-icon'></FontAwesomeIcon>
                    </div>

                </div>
                <hr />
                <div className='password d-flex align-items-center'>
                    <Button variant="outline-danger" onClick={() => { handleChangePassword() }} >Change password</Button>
                </div>
            </div>
            <ModalChangePassword
                show={showModalUpdatePW}
                onHide={onHideModalUpdatePW}
            />
            <ModalEditUsername
                show={showModalEditUN}
                onHide={onHideModalEditUN}
            />
        </>




    );
}

export default UserProfile;