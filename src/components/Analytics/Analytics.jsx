import {useState} from 'react'
import PageHeader from '../PageHeader/PageHeader'
import AnomalyStatus from '../Dashboard/Charts/AnomalyStatus';
import HealthSummary from '../Dashboard/Charts/HealthSummary'

import './analytics.scss'


const Analytics = () => {
  const [pageName, setPageName] = useState("Analytics");
  const [pageSummary, setPageSummary] = useState("Analyze your equipment in real time.");

  return (
    <div className='page-details'>
      <PageHeader pageName={pageName} pageSummary={pageSummary}/>
      {/* <div className="page-content">
        <div className="row anomaly-detection">
          <div className="summary bg-shadow"></div>
          <div className="real-time bg-shadow"></div>
        </div>
        <div className="row analytics">
          <div className="reporting">
            <div className="data-download bg-shadow"></div>
            <div className="data-upload bg-shadow"></div>
          </div>
          <div className="analytics-chart bg-shadow">

          </div>
        </div>
      </div> */}
      <div className="motors">
        <div className="motors-in-operation">
          <div className="card-heading">
            <i className="fa-solid fa-city text-primary"></i>
            <h4>Total motors in operation</h4>
          </div>
          <div className="card-detail">
            <h1 className='no-of-motors text-primary'>174</h1>
            <p className='text'>Motors</p>
          </div>
        </div>
        <div className="normal-motors">
          <div className="card-heading">
            <i className="fa-solid fa-city text-success"></i>
            <h4>Normal motors</h4>
          </div>
          <div className="card-detail">
            <h1 className='no-of-motors text-success'>107</h1>
            <p className='text'>Motors</p>
          </div>
        </div>
        <div className="warning-motors">
          <div className="card-heading">
            <i className="fa-solid fa-city text-warning"></i>
            <h4>Warning motors</h4>
          </div>
          <div className="card-detail">
            <h1 className='no-of-motors text-warning'>45</h1>
            <p className='text'>Motors</p>
          </div>
        </div>
        <div className="critial-motors">
          <div className="card-heading">
            <i className="fa-solid fa-city text-danger"></i>
            <h4>Critical motors</h4>
          </div>
          <div className="card-detail">
            <h1 className='no-of-motors text-danger'>22</h1>
            <p className='text'>Motors</p>
          </div>
        </div>
      </div>
      <div className="motor-info">
        <div className="motors-in-operation">
          <div className="card-heading">
            <h4>Anomaly status</h4>
          </div>
          <div className="card-chart">
            <AnomalyStatus />
          </div>
        </div>
        <div className="normal-motors">
          <div className="card-heading">
            <h4>Health summary</h4>
          </div>
          <div className="card-chart health-summary">
              <HealthSummary />
          </div>
        </div>
        <div className="critial-motors">
          <div className="card-heading">
            <h4>Requires immediate maintenance (sorted by top cycle)</h4>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Analytics