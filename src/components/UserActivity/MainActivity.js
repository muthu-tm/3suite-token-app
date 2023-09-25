import React from 'react'
import "./Activity.css"
import { useNavigate } from 'react-router-dom'

function MainActivity() {
    const navigate = useNavigate();

  return (
    <div className='activity-sec'>
      <div className='Heading'>Activity Page</div>

      <div  className='user-activity'>
        <div className='single-act-card'>
            <div className='sp-head'>Tokens Created</div>
            <div className="sp-desc">
            {" "}
           You can all view your minted token here by clicking on view activity below.
          </div>
          <div className="sp-cta" onClick={()=>navigate("/view-activity",{state:'Token Minting'})}>
            <div>View Activity</div></div>
        </div>
        <div className='single-act-card'>
            <div className='sp-head'>Multisender/Airdrop</div>
            <div className="sp-desc">
            {" "}
            You can all view your Airdrops or Multisender here by clicking on view activity below.

          </div>
          <div className="sp-cta" onClick={()=>navigate("/view-activity",{state:'Multisender'})} >
            <div>View Activity </div></div>
        </div>
      </div>
    </div>
  )
}

export default MainActivity
