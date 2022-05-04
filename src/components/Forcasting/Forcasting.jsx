import {useState} from 'react'
import PageHeader from '../PageHeader/PageHeader'

const Forcasting = () => {
  const [pageName, setPageName] = useState("Forcasting");
  const [pageSummary, setPageSummary] = useState("Predict health of equipments in future.");

  return (
    <div className='page-details'>
      <PageHeader pageName={pageName} pageSummary={pageSummary}/>
    </div>
  )
}

export default Forcasting