import { useEffect, useState } from 'react';
import './Register.scss'
import { useNavigate } from 'react-router-dom';
import axios from "./../../setup/axios.js";
import React from 'react';
import { toast } from 'react-toastify';
import { registerNewUser } from "./../../services/userService.js"
function Register(props) {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const defaultValidInputs = {
        isValidEmail: true,
        isValidPhone: true,
        isValidUsername: true,
        isValidPassword: true,
        isValidConfirmedPassword: true
    }
    const [objCheckInputs, setCheckInputs] = useState(defaultValidInputs);
    const handleRegister = async () => {
        navigate('/register');
    }
    const isValidInputs = () => {
        setCheckInputs(defaultValidInputs);
        if (email && phone && username && password && confirmPassword) {
            let emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            let phonePattern = /^\d{10}$/;
            if (!emailPattern.test(email)) {
                setCheckInputs({ ...defaultValidInputs, isValidEmail: false })
                toast.error("email is incorrect");
                return false
            }
            if (!phonePattern.test(phone)) {
                setCheckInputs({ ...defaultValidInputs, isValidPhone: false })
                toast.error("phone number must have at least 10 characters");
                return false
            }
            if (password !== confirmPassword) {
                setCheckInputs({ ...defaultValidInputs, isValidConfirmedPassword: false })
                toast.error("confirmed password is incorrect");
                return false
            }
            return true;
        }
        else {
            if (!email) {
                setCheckInputs({ ...defaultValidInputs, isValidEmail: false })
                toast.error("missing email");
                return false
            }
            if (!phone) {
                setCheckInputs({ ...defaultValidInputs, isValidPhone: false })
                toast.error("missing phone");
                return false
            }
            if (!username) {
                setCheckInputs({ ...defaultValidInputs, isValidUsername: false })
                toast.error("missing username");
                return false
            }
            if (!password) {
                setCheckInputs({ ...defaultValidInputs, isValidPassword: false })
                toast.error("missing password");
                return false
            }
            if (!confirmPassword) {
                setCheckInputs({ ...defaultValidInputs, isValidConfirmedPassword: false })
                toast.error("missing confirmed password");
                return false
            }
        }
    }
    const signUpUser = async (e) => {
        e.preventDefault();
        const checkValid = isValidInputs();
        if (checkValid) {
            let userData = { email, phone, username, password };
            userData.group = 4;
            const response = await registerNewUser(userData);
            const serverData = await response;
            if (+serverData.EC === 0 && serverData.EM) {
                toast.success(serverData.EM);
                navigate("/collections");
            }
            else {
                toast.error(serverData.EM)
            }
        }
        else {
            navigate("/register");
        }
    }
    useEffect(() => {
        // axios.get('http://localhost:8080/api/test-api').then(response => {
        //     console.log("check object>>>", response);
        // })
    }, [])
    return (

        <div className='register-container py-3'>
            <div className='container '>
                <div className='row'>
                    <div className='left col-sm-6 col-12  d-sm-flex flex-sm-column justify-content-center py-3 align-items-sm-center '>
                        <div className='text-start text-center text-sm-start'>
                            <div className='brand'>Register</div>
                            <div className='detail d-none d-sm-block'> Fast and easy.</div>
                        </div>
                    </div>
                    <div className='right col-sm-6 col-12 row  mx-auto'>
                        <form className='register-form d-flex flex-column gap-2 py-3 ' onSubmit={(e) => signUpUser(e)} >
                            <div className='form-group'>
                                <label>Email:</label>
                                <input
                                    type='email'
                                    placeholder='Email address '
                                    className={objCheckInputs.isValidEmail ? 'form-control' : 'form-control is-invalid'}
                                    value={email}
                                    onChange={(e) => { setEmail(e.target.value) }}
                                >
                                </input>
                            </div>

                            <div className='form-group'>
                                <label> Phone number:</label>
                                <input
                                    type='text'
                                    placeholder='Phone number '
                                    className={objCheckInputs.isValidPhone ? 'form-control' : 'form-control is-invalid'}
                                    value={phone}
                                    onChange={(e) => { setPhone(e.target.value) }}
                                >
                                </input>
                            </div>
                            <div className='form-group'>
                                <label> Username:</label>
                                <input
                                    type='text'
                                    placeholder='Username '
                                    className={objCheckInputs.isValidUsername ? 'form-control' : 'form-control is-invalid'}
                                    value={username}
                                    onChange={(e) => { setUsername(e.target.value) }}
                                >
                                </input>
                            </div>
                            <div className='form-group'>
                                <label>Password:</label>
                                <input
                                    type='password'
                                    placeholder='Password'
                                    className={objCheckInputs.isValidPassword ? 'form-control' : 'form-control is-invalid'}
                                    value={password}
                                    onChange={(e) => { setPassword(e.target.value) }}
                                >
                                </input>
                            </div>
                            <div className='form-group'>
                                <label>Re-enter Password:</label>
                                <input
                                    type='password'
                                    placeholder='Re-enter password'
                                    className={objCheckInputs.isValidConfirmedPassword ? 'form-control' : 'form-control is-invalid'}
                                    value={confirmPassword}
                                    onChange={(e) => { setConfirmPassword(e.target.value) }}
                                >
                                </input>
                            </div>

                            <button className='btn btn-primary' onClick={(e) => { signUpUser(e) }}>Register</button>
                            <span className='text-center'>
                                <a href='/adsdfasasfd' className='forgot-password'>Forgot your password ?</a>
                            </span>
                            <hr />
                            <div className='text-center'>
                                <button className='btn btn-success' onClick={() => { handleRegister() }}>
                                    Create new account
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Register;