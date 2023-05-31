import React from "react";

import '../CSS/Footer.css'

function Footer() {
  return (
    <div className='footer-main'>
      <div className='footer-container'>
        <div className='footer-left'>© 2023 Petbnb • For Demonstration Purposes Only</div>
        <div className='footer-right'>
          <span className='social-link'><a href='https://github.com/jvstinejvng/airbnb_clone' target='blank'><i className='fa-brands fa-github'></i>&nbsp; Github</a></span>
          <span className='social-link'><a href='https://www.linkedin.com/in/jvstinejvng/' target='blank'><i className='fa-brands fa-linkedin'></i>&nbsp; LinkedIn</a></span>
          <span className='social-link'><a href='https://www.airbnb.com/' target='blank'><i className='fa-brands fa-airbnb'></i>&nbsp; Airbnb</a></span>
        </div>
      </div>
    </div>
  )
}

export default Footer
