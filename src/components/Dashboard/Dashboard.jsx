import {useState, useEffect} from 'react'
import PageHeader from '../PageHeader/PageHeader'
import HealthSummary,{getHealtSummaryData} from './Charts/HealthSummary'
import AnomalyStatus,{getAnomaliStatusData} from './Charts/AnomalyStatus';
import { useNavigate } from 'react-router-dom';
import PersistentAnomaly, {getPersistentAnomalyData} from './Charts/PersistentAnomaly';
import ReadXlsx from '../../helpers/ReadXlsx';
import onlyUnique from '../../helpers/unique';

import './dashboard.scss'



const Dashboard = () => {
  const [pageName, setPageName] = useState("Dashboard");
  const [pageSummary, setPageSummary] = useState("Equipment health monitoring, analysis and forcasting app.");

  const [xlData, setXlData] = useState([]);

  const [totalMotors, setTotalMotors] = useState(0);
  const [normalMotors, setNormalMotors] = useState(0);
  const [warningMotors, setWarningMotors] = useState(0);
  const [criticalMotors, setCriticalMotors] = useState(0);

  const [anomalyStatus, setAnomalyStatus] = useState([]);
  const [healthSummary, setHealthSummary] = useState([]);
  const [persistentAnomaly, setPersistentAnomaly] = useState([]);

  useEffect(()=>{
    ReadXlsx(setXlData, 0);
  },[]);

  useEffect(async ()=>{
    const todaysData = xlData.filter(d => d.Timestamp.indexOf("2022-04-26") != -1);
    
    const motors = todaysData.map(d => d["Motor ID"]);
    const criticalMotors = todaysData.filter(d => d["Anomaly Flag"]===2).map(d => d["Motor ID"].trim());
    const warningMotors = todaysData.filter(d => d["Anomaly Flag"]===1 && criticalMotors.indexOf(d["Motor ID"].trim()) == -1).map(d => d["Motor ID"]);
    //const normalMotors = todaysData.filter(d => d["Anomaly Flag"]===0).map(d => d["Motor ID"]);
    const uniqueMotors = motors.filter(onlyUnique).length;
    const uniqueCMotors = criticalMotors.filter(onlyUnique).length;
    const uniqueWMotors = warningMotors.filter(onlyUnique).length;
    const uniqueNMotors = uniqueMotors - (uniqueCMotors + uniqueWMotors);

    setTotalMotors(uniqueMotors);
    setCriticalMotors(uniqueCMotors);
    setWarningMotors(uniqueWMotors);
    setNormalMotors(uniqueNMotors);
    
    const allChartsPromise = [
      new Promise((resolve, reject) => {
        resolve(getAnomaliStatusData(todaysData,warningMotors,criticalMotors));
      }),
      new Promise((resolve, reject) => {
        resolve(getHealtSummaryData(todaysData));
      }),
      new Promise((resolve, reject) => {
        resolve(getPersistentAnomalyData(xlData));
      })
    ];

    Promise.all(allChartsPromise)
      .then((values) => {
        setAnomalyStatus(values[0]);
        setHealthSummary(values[1]);
        setPersistentAnomaly(values[2]);
      });

  },[xlData])

  const navigate = useNavigate();

  const showDetails = (fanType) =>{
    navigate(`/detailedanalysis?fanType=${fanType}`);
  }

  return (
    <div className='page-details'>
      <PageHeader pageName={pageName} pageSummary={pageSummary}/>
    {
      xlData.length>0 ? 
      <>
        <div className="fans">
          <div className="fans-in-operation">
            <div className="card-heading">
              <i className="fa-solid fa-city text-primary"></i>
              <h4>Total motors in operation</h4>
            </div>
            <div className="card-detail">
              <h1 className='no-of-fans text-primary'>{totalMotors}</h1>
              <p className='text'>Motors</p>
            </div>
          </div>
          <div className="critial-fans" onClick={() => showDetails("critical")}>
            <div className="card-heading">
              <i className="fa-solid fa-city text-danger"></i>
              <h4>Critical motors</h4>
            </div>
            <div className="card-detail">
              <h1 className='no-of-fans text-danger'>{criticalMotors}</h1>
              <p className='text'>Motors</p>
            </div>
          </div>
          <div className="warning-fans" onClick={() => showDetails("warning")}>
            <div className="card-heading">
              <i className="fa-solid fa-city text-warning"></i>
              <h4>Warning motors</h4>
            </div>
            <div className="card-detail">
              <h1 className='no-of-fans text-warning'>{warningMotors}</h1>
              <p className='text'>Motors</p>
            </div>
          </div>
          <div className="normal-fans">
            <div className="card-heading">
              <i className="fa-solid fa-city text-success"></i>
              <h4>Normal motors</h4>
            </div>
            <div className="card-detail">
              <h1 className='no-of-fans text-success'>{normalMotors}</h1>
              <p className='text'>Motors</p>
            </div>
          </div>
        </div>
        <div className="fan-info">
          <div className="persistent-anomaly">
            <div className="card-heading">
              <h4>Persistent anomaly</h4>
            </div>
            <div className="card-chart">
              <PersistentAnomaly persistentAnomaly={persistentAnomaly} />
            </div>
          </div>
          <div className="anomaly-status">
            <div className="card-heading">
              <h4>Anomaly status</h4>
            </div>
            <div className="card-chart">
              <AnomalyStatus anomalyStatus={anomalyStatus} />
            </div>
          </div>
          <div className="health-summary">
            <div className="card-heading">
              <h4>Health summary</h4>
            </div>
            <div className="card-chart">
                <HealthSummary healthSummary={healthSummary} />
            </div>
          </div>
        </div>
      </>
      :
      <></>
    }
    </div>
  );
}

export default Dashboard