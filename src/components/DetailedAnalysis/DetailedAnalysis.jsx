import {useState, useMemo, useEffect} from 'react'
import PageHeader from '../PageHeader/PageHeader'
import {useLocation, useNavigate} from 'react-router-dom'
import FansTable from './Charts/FansTable'
import ImpactingParameters from './Charts/ImpactingParameters'
import ReadXlsx from '../../helpers/ReadXlsx';
import AnomalyTrend from './Charts/AnomalyTrend'
import ForcastTrend from './Charts/ForcastTrend'
import RULTrend from './Charts/RULTrend'

import './detailedanalysis.scss'



function useQuery() {
    const { search } = useLocation();
  
    return useMemo(() => new URLSearchParams(search), [search]);
  }

const DetailedAnalysis = () => {
    const [pageName, setPageName] = useState("Detailed analysis");
    const [pageSummary, setPageSummary] = useState("Analyze critical & warning equipments.");

    const [fanType, setFantype] = useState(useQuery().get("fanType"));
    const [fanTableData, setFanTableData] = useState();

    const [selectedMotorId, setSelectedMotorId] = useState(0);
    const [impactingParameters, setImpactingParameters] = useState();

    const [anomalyTrendParameter, setAnomalyTrendParameter] = useState("vibration");
    const [anomalyTrend, setAnomalyTrend] = useState();

    
    const [forcastedTrend, setForcastedTrend] = useState();

    const [rulTrend, setRULTrend] = useState();

    const navigate = useNavigate();

    const goToDashboard = () =>{
        navigate('/')
    }

    const [anomalyDataXl, setAnomalyDataXl] = useState([]);
    const [forcastedDataXl, setForcastedDataXl]= useState();
    const [rulDataXl, setRULDataXl]= useState();

    useEffect(()=>{
        Promise.all([
            new Promise((resolve,reject)=>{
                resolve(ReadXlsx(setAnomalyDataXl,0))
            }),
            new Promise((resolve,reject)=>{
                resolve(ReadXlsx(setForcastedDataXl,2))
            }),
            new Promise((resolve,reject)=>{
                resolve(ReadXlsx(setRULDataXl,1))
            })
        ])
        
    },[])

    useEffect(()=>{
        createTableData()
    },[fanType,anomalyDataXl])

    useEffect(()=>{
        createAllData();

    },[selectedMotorId,rulDataXl,forcastedDataXl,anomalyTrendParameter])

    const createTableData = () =>{
        const anomalyFlag = fanType == "critical" ? 2 : 1;
        const cMotors = anomalyDataXl?.filter(d => d.Timestamp.indexOf("2022-04-26") != -1 && d["Anomaly Flag"]===2);
        const cMotroIds = cMotors.map(d => d["Motor ID"]);
        const wData = anomalyDataXl?.filter(d => d.Timestamp.indexOf("2022-04-26") != -1 && d["Anomaly Flag"]===1 && cMotroIds.indexOf(d["Motor ID"]) == -1);
        const motorData = anomalyFlag == 2 ? cMotors : wData;
        const aggregatedData = []
        for(let i=0; i<motorData.length; i++){
            const index = aggregatedData.findIndex(x => x["motorId"] == motorData[i]["Motor ID"]);

            if(index==-1){
                aggregatedData.push(
                    {
                        plantId: motorData[i]["Plant ID"],
                        subPlantId:  motorData[i]["Sub Plant ID"],
                        motorId: motorData[i]["Motor ID"],
                        motorName: motorData[i]["Motor Short Desc"],
                        severity: 1
                    }
                );
            }
            else{
                aggregatedData[index].severity += 1;
            }
        }

        aggregatedData.sort((a,b) => b.severity - a.severity);

        setFanTableData([...aggregatedData]);

        setSelectedMotorId(aggregatedData[0]?.motorId);
    }

    const createAllData = () =>{
        
        const impactingParameterDetail = anomalyDataXl?.filter(d => d.Timestamp.indexOf("2022-04-26") != -1 && d["Motor ID"]==selectedMotorId);

        const impactingParameterData = [];

        for(let i=0; i<impactingParameterDetail.length; i++){
            const index = impactingParameterData.findIndex(x => x["parameter"] == impactingParameterDetail[i]["Motor Param"]);

            if(index == -1){
                impactingParameterData.push({
                    "parameter": impactingParameterDetail[i]["Motor Param"],
                    "critical": impactingParameterDetail[i]["Anomaly Flag"] == 2 ? 1: 0,
                    "warning":impactingParameterDetail[i]["Anomaly Flag"] == 1 ? 1: 0,
                    "normal": impactingParameterDetail[i]["Anomaly Flag"] == 0 ? 1: 0
                });
            }
            else{
                if(impactingParameterDetail[i]["Anomaly Flag"] == 2){
                    impactingParameterData[index].critical += 1;
                }
                else if(impactingParameterDetail[i]["Anomaly Flag"] == 1){
                    impactingParameterData[index].warning += 1;
                }
                else{
                    impactingParameterData[index].normal += 1;
                }
            }
        }
        impactingParameterData.sort((a, b)=> {
            if (a.critical === b.critical){
              return a.warning < b.warning ? 1 : -1
            } else {
              return a.critical < b.critical ? 1 : -1
            }
          });

        setImpactingParameters(impactingParameterData);

        const anomalyTrendDetails = impactingParameterDetail.filter(x => x["Motor Param"].toLowerCase()==anomalyTrendParameter);
        const anomalyTrendData = anomalyTrendDetails.map((x) => ({
            "parameter" : x["Motor Param"],
            "timestamp" : x["Timestamp"].split(" ")[1],
            "anomalies" : x["Param Act Value"],
            "type": x["Anomaly Flag"] == 0 ? "#8884d8" : (x["Anomaly Flag"] == 1 ? "#e2b512" : "#f53d3d")
        }));
        setAnomalyTrend([...anomalyTrendData]);

        const forcastDetails = forcastedDataXl?.filter(d => (d.Timestamp.indexOf("2022-04-26") != -1 || d.Timestamp.indexOf("2022-04-27") != -1) && d["Motor ID"]==selectedMotorId && d["Motor Param"].toLowerCase()===anomalyTrendParameter)
                                .filter(d => new Date(d.Timestamp) < new Date("2022-04-27 12:00"))
                                .map(x => ({
                                    "parameter" : x["Motor Param"],
                                    "timestamp" : x["Timestamp"],
                                    "actualValue" : x["Param Act Value"],
                                    "forcastedValue": x["Forecasted Value"]
                                }));

        setForcastedTrend(forcastDetails);

        const rulDetails = rulDataXl?.filter(d => d["Motor ID"]==selectedMotorId)
                                .map(x => ({
                                    "date":x["Timestamp"],
                                    "RUL": x["RUL Index"]
                                }));
        setRULTrend(rulDetails);
    }


    return (
        <div className='page-details'>
            <PageHeader pageName={pageName} pageSummary={pageSummary}/>
            <div className="issue-type-selection">
                <i className="fa-solid fa-circle-chevron-left" onClick={goToDashboard}></i>
                <div className="select-issue">
                    <label htmlFor="issue-type">Select issue type</label>
                    <div className="critical-issue" onClick={()=>setFantype("critical")}>Critical</div>
                    <div className="warning-issue" onClick={()=>setFantype("warning")}>Warning</div>
                </div>
            </div>
            <div className="impact">
                <div className="impacted-fans">
                    {
                        fanTableData && fanTableData.length>0 ?
                        <>
                            <div className="card-heading">
                                <h4>Impacted fans</h4>
                            </div>
                            <div className="table-detail tbl-responsive">
                                <FansTable fanTableData={fanTableData} type={fanType} setSelectedMotorId={setSelectedMotorId} />
                            </div>
                        </>
                        :
                        <></>
                    }
                </div>
                <div className="impacting-parameters">
                    {
                        impactingParameters && impactingParameters.length>0 ? 
                            <>
                                <div className="card-heading">
                                    <h4>Impacting parameters ({selectedMotorId})</h4>
                                </div>
                                <div className="card-chart">
                                    <ImpactingParameters data={impactingParameters} setAnomalyTrendParameter={setAnomalyTrendParameter} />
                                </div>
                            </>
                        : <></>
                    }
                    
                </div>
            </div>
            <div className="anomaly">
                <div className="useful-life">
                    {
                        rulTrend && rulTrend.length>0 ?
                        <>
                            <div className="card-heading">
                                <h4>Remaining useful life ({selectedMotorId})</h4>
                            </div>
                            <div className="card-chart">
                                <RULTrend data={rulTrend} />
                            </div>
                        </>
                        :
                        <></>
                    }
                </div>
                <div className="anomaly-trend">
                    {
                        anomalyTrend && anomalyTrend.length>0 ?
                        <>
                            <div className="card-heading">
                            <h4>Anomaly trend ({anomalyTrendParameter})</h4>
                            </div>
                            <div className="card-chart">
                                <AnomalyTrend data={anomalyTrend}/>
                            </div>
                        </>
                        :
                        <></>
                    }
                    
                </div>
                <div className="forcast-trend">
                    {
                        forcastedTrend ? 
                        <>
                            <div className="card-heading">
                                <h4>Forcasted trend ({anomalyTrendParameter})</h4>
                            </div>
                            <div className="card-chart">
                                <ForcastTrend data={forcastedTrend} />
                            </div>
                        </>
                        :
                        <></>
                    }
                </div>
            </div>
        </div>
    )
}

export default DetailedAnalysis