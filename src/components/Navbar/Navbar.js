import React from 'react'
import "./navbar.css"
import LogoImage from "../../assets/Images/logoSuite2.png"

function Navbar() {
  return (
    <div className='nav-cont'>
      <img src={LogoImage} alt='' className='l-img' />
<button className='connect-cta'>Connect wallet</button>
    </div>
  )
}

export default Navbar
