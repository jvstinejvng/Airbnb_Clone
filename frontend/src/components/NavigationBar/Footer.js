import React from "react";
import { Link } from "react-router-dom";

import '../CSS/Footer.css'

function Footer() {
  return (
    <div className="footer-main">
      <div className="footer-inner">
        <div className="footer-left">Petbnb</div>
        <div className="footer-right">
          <span className="social-link"><a href='' target='blank'><i className="fa-solid fa-globe"></i>&nbsp;</a></span>
          <span className="social-link"><a href='' target='blank'><i className="fa-brands fa-github"></i>&nbsp; Github</a></span>
          <span className="social-link"><a href='' target='blank'><i className="fa-brands fa-linkedin"></i>&nbsp; LinkedIn</a></span>
        </div>
      </div>
    </div>
  )
}

export default Footer
