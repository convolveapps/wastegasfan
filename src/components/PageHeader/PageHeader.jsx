import { useNavigate } from "react-router-dom";
import { useState } from "react";

import './pageheader.scss'

const PageHeader = (props) => {

    const {pageName, pageSummary} = {...props};

    const [notificationBell, setNotificationBell] = useState(
        localStorage.getItem("notifications")
    )

    const showUserDetails = () =>{
        document.querySelector('.user-detail').classList.toggle("active");
    }

    return (
        <div className='header-container'>
            <div className='page-info'>
                <h2>{pageName}</h2>
                <p>{pageSummary}</p>
            </div>
            <div className='user-info'>
                <i 
                className={notificationBell>0 ? "fa-solid fa-bell notification-icon active" : "fa-solid fa-bell notification-icon"}
                title={notificationBell>0 ? `${notificationBell} new notifications` : "No new notifications"}
                >
                </i>
                <div className="user-container">
                    <div className="user-icon" onClick={showUserDetails}>
                        <i className="fa-solid fa-circle-user"></i>
                    </div>
                    <div className="user-detail">
                        <h4>
                            <i className="fa-solid fa-user"></i>
                            Guest user
                        </h4>
                        <p>
                            <i className="fa-solid fa-envelope"></i>
                            guestuser@dev.in
                        </p>
                        <p>
                            <i className="fa-solid fa-briefcase"></i>
                            Guest
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PageHeader