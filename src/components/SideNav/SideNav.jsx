import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import './sidenav.scss';
import logo from '../../assets/img/logo_white.svg'

const SideNav = () => {

  const [notifications, setNotification] = useState(localStorage.getItem("notifications"));

  // useEffect(() => {
  //   setNotification(notification);
  // },[notification])

  const [navList, setNavList] = useState([
    {
      section: "MAIN NAVIGATION",
      navItems: [
        {
          name: "Dashboard",
          icon: "fa-solid fa-shapes",
          link: "/",
          isActive: true
        },
        // {
        //   name: "Analytics",
        //   icon: "fa-solid fa-chart-pie",
        //   link: "/analytics",
        //   isActive: false
        // },
        // {
        //   name: "Forcasting",
        //   icon: "fa-brands fa-uncharted",
        //   link: "/forcasting",
        //   isActive: false
        // }
      ]
    },
    {
      section: "NOTIFICATIONS",
      navItems:[
        {
          name: "Notification",
          icon: "fa-solid fa-bell",
          link: "/notificationdashboard",
          isActive: false,
          tags: notifications ? notifications : 0
        }
      ]
    },
    {
      section: "Settings",
      navItems:[
        {
          name: "Logout",
          icon: "fa-solid fa-right-from-bracket",
          link: "/",
          isActive: false
        }
      ]
    }
  ]);

  const handleNavItemClick = (name) =>{

    if(name.toLowerCase() == "notification"){
      setNotification((oldNotifications) => {
        setNavigation(0,name);
        return 0;
      });
    }
    else{
      setNavigation(null,name);
    }  
  }

  const setNavigation = (tags,name) =>{
    let newNavList = [];
    for(let i=0;i<navList.length;i++){
      newNavList.push({"section":navList[i].section, navItems:[]});
      for(let j=0;j<navList[i].navItems.length;j++){
        if(navList[i].navItems[j].name == name){
          newNavList[i].navItems.push({
            name: navList[i].navItems[j].name,
            icon:navList[i].navItems[j].icon,
            link:navList[i].navItems[j].link,
            isActive:true,
          });
        }
        else{
          newNavList[i].navItems.push({
            name: navList[i].navItems[j].name,
            icon:navList[i].navItems[j].icon,
            link:navList[i].navItems[j].link,
            isActive:false,
          });
        }

        if(tags != null && typeof(tags) != 'undefined'){
          newNavList[i].navItems[j].tags = tags;
        }
        else if(navList[i].navItems[j].tags && navList[i].navItems[j].tags>0){
          newNavList[i].navItems[j].tags = navList[i].navItems[j].tags;
        }
      }
    }

    setNavList([...newNavList]);
  }


  return (
    <div className="nav-bg bg-shadow">
        <div className="nav-section logo-section">
          <img src={logo} alt="convolve.ai" />
        </div>
        {
          navList.map((nav) => 
            <div key={nav.section} className="nav-section">
              <h4 className="nav-section-header">
                {nav.section}
              </h4>
              <div className="nav-content">
                {
                  nav.navItems.map((navItem) => 
                    <div key={navItem.name} className={navItem.isActive ? "nav-item active" : "nav-item"}>
                      <i className={navItem.icon}></i>
                      <Link to={navItem.link} onClick={() => handleNavItemClick(navItem.name)}>{navItem.name}</Link>
                      {navItem.tags && navItem.tags !=0 ? <span className="tag"><p>{navItem.tags}</p></span> : ""}
                    </div>
                  )
                }
              </div>
            </div>
          )
        }
    </div>
  )
}

export default SideNav