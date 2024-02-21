import React, { useEffect, useState, useContext } from 'react';
import './Login.scss'
import { useNavigate } from 'react-router-dom';
import { login } from './../../services/userService';
import { toast } from 'react-toastify';
import { UserContext } from "./../../context/UserContext.js"
function Login(props) {
    let { loginContext } = useContext(UserContext);
    const [valueLogin, setValueLogin] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()
    const getRegisterPage = () => {
        navigate('/register')
    }
    const defaultValidInputs = {
        isValidValueLogin: true,
        isValidPassword: true,

    }
    const [objCheckInputs, setCheckInputs] = useState(defaultValidInputs);
    function isGmailOrPhoneNumber(input) {
        const gmailRegex = /^[a-zA-Z0-9._-]+@gmail\.com$/;
        const phoneRegex = /^[0-9]{10,}$/;
        if (gmailRegex.test(input)) {
            return true
        } else if (phoneRegex.test(input)) {
            return true
        } else {
            return false
        }
    }

    const isValidInput = () => {
        setCheckInputs(defaultValidInputs);
        if (!valueLogin) {
            toast.error("missing email or phone number")
            setCheckInputs({ ...defaultValidInputs, isValidValueLogin: false })
            return false;
        }
        if (!password) {
            toast.error("missing password")
            setCheckInputs({ ...defaultValidInputs, isValidPassword: false })
            return false;
        }
        if (!isGmailOrPhoneNumber(valueLogin)) {
            toast.error("not an email or phone number")
            setCheckInputs({ ...defaultValidInputs, isValidValueLogin: false })
            return false;
        }
        return true;
    }
    const submitLogin = async (e) => {
        e.preventDefault();
        const checkValid = isValidInput();
        if (checkValid) {
            const loginData = { valueLogin: valueLogin, password: password };
            const response = await login(loginData)
            const serverData = await response;
            if (serverData && +serverData.EC === 0 && serverData.EM) {
                toast.success(serverData.EM);
                const email = serverData.DT.email;
                const username = serverData.DT.username;
                const token = serverData.DT.token;

                let data = {
                    isAuthenticated: true,
                    token: token,
                    email: email,
                    username: username
                }
                // await new Promise(resolve => {
                localStorage.setItem('jwt', token);
                loginContext(data);
                // setTimeout(resolve, 0); // Đợi cho đến khi trạng thái cập nhật
                // });
                navigate('/collections')
                // window.location.reload(true);
                return;
            }
            else {
                toast.error(serverData.EM)
                navigate('/login')
                return;
            }
        }
        else {
            navigate('/login')
        }

    }

    return (

        <div className='login-container py-3'>
            <div className='container '>
                <div className='row'>
                    <div className='left col-sm-6 col-12  d-sm-flex flex-sm-column justify-content-center py-3 align-items-sm-center '>
                        <div className='text-start text-center text-sm-start'>
                            <div className='brand'>Feather</div>
                            <div className='detail d-none d-sm-block'> Our website helps you learn every thing</div>
                        </div>
                    </div>
                    <div className='right col-sm-6 col-12 row  mx-auto'>
                        <form className='login-form d-flex flex-column gap-2 py-3 ' >
                            <input
                                type='text'
                                className={objCheckInputs.isValidValueLogin ? 'form-control' : 'form-control is-invalid'}
                                placeholder='Email address or phone number'
                                value={valueLogin}
                                onChange={(e) => { setValueLogin(e.target.value) }}

                            >
                            </input>
                            <input
                                type='password'
                                className={objCheckInputs.isValidPassword ? 'form-control' : 'form-control is-invalid'}
                                placeholder='Password'
                                value={password}
                                onChange={(e) => { setPassword(e.target.value) }}
                            ></input>
                            <button className='btn btn-primary' onClick={(e) => { submitLogin(e) }}>Login</button>
                            <span className='text-center'>
                                <a href='/adsdfasasfd' className='forgot-password'>Forgot your password ?</a>
                            </span>
                            <hr />
                            <div className='text-center'>
                                <button className='btn btn-success' onClick={(e) => { getRegisterPage(e) }}>
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

export default Login;