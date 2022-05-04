import { Routes, Route } from "react-router-dom";
import Dashboard from './components/Dashboard/Dashboard';
import DetailedAnalysis from './components/DetailedAnalysis/DetailedAnalysis';

import './App.scss'


function App() {

  // const[notification, setNotification] = useState(localStorage.getItem("notifications"));

  // const resetNotification = () =>{
  //   setNotification(0);
  //   localStorage.setItem("notifications",0);
  // }

  return (
    <div className="layout">
      {/* <SideNav /> */}
      <Routes>
        <Route path="/" element={<Dashboard />}/>
        {/* <Route path="/analytics" element={<Analytics />}/>
        <Route path="/forcasting" element={<Forcasting />}/>
        <Route path="/notificationdashboard" element={<NotificationDashboard />}/> */}
        <Route path="/detailedanalysis" element={<DetailedAnalysis />}/>
      </Routes>
    </div>
  )
}

export default App
