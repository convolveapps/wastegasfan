import {useState, useEffect} from 'react'

const FansTable = ({fanTableData, setSelectedMotorId}) => {

    const [fanData, setFanData] = useState([]);

    useEffect(()=>{
        setFanData([...fanTableData]);
    },[fanTableData])

    return (
        <table className='tbl tbl-bordered tbl-hover'>
            <thead>
                <tr>
                    <th>Plant Id</th>
                    <th>Sub-plant Id</th>
                    <th>Fan Id</th>
                    <th>Fan name</th>
                    <th>Severity</th>
                </tr>
            </thead>
            <tbody>
                {
                    fanData.map(x => 
                        <tr key={x.motorId}>
                            <td>{x.plantId}</td>
                            <td>{x.subPlantId}</td>
                            <td className='text-danger pointer' onClick={()=>setSelectedMotorId(x.motorId)}>{x.motorId}</td>
                            <td>{x.motorName}</td>
                            <td>{x.severity}</td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    )
}

export default FansTable