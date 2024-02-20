import React, { useContext } from 'react';
import "./Profile.scss"
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import UserProfile from './UserProfile/UserProfile';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { UserContext } from "./../../context/UserContext.js"

// Import tất cả các icon từ thư viện Font Awesome
import * as faIcons from '@fortawesome/free-solid-svg-icons'

function Profile(props) {
    const { user, logoutContext } = useContext(UserContext);

    // Kiểm tra xem user có tồn tại không và user.username có tồn tại không
    const firstLetter = user && user.username ? user.username[0].toUpperCase() : 'G';

    // Tạo tên của biến icon dựa trên chữ cái đầu tiên của user.username
    const iconVariableName = `fa${firstLetter}`;

    // Kiểm tra xem biến icon có tồn tại trong thư viện Font Awesome không
    // Nếu không, sử dụng biến mặc định là faA
    const icon = faIcons[iconVariableName] || faIcons.faA;

    return (
        <>
            <div className='user-short-info d-flex'>
                <div className='user-avatar d-flex justify-content-center align-items-center'>
                    <FontAwesomeIcon icon={icon} className='user-icon'></FontAwesomeIcon>
                </div>
                <div className='short-info d-flex flex-column px-3 justify-content-center'>
                    {/* Kiểm tra user và user.username trước khi sử dụng */}
                    <div className='user-username'>{user && user.username ? user.username : "guest"}</div>
                    <div className='user-email'>{user && user.email ? user.email : "guest@gmail.com"}</div>
                </div>
            </div>
            <Tabs
                defaultActiveKey="profile"
                id="uncontrolled-tab-example"
                className="mb-3"
                justify
            >
                <Tab eventKey="profile" title="Profile" >
                    <UserProfile />
                </Tab>
                <Tab eventKey="achievements" title="Achievements" >
                    Tab content for Profile
                </Tab>
                <Tab eventKey="contact" title="Contact" >
                    Tab content for Contact
                </Tab>
            </Tabs>
        </>
    );
}

export default Profile;


