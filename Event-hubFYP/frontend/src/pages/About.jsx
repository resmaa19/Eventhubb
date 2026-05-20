import React from 'react';
import eventhubLogo from '../assets/images/logo.png'
import aboutImage1 from '../assets/images/gallery07.gif';
import aboutImage2 from '../assets/images/gallery05.jpg';
import "../styles/about.css";

const AboutPage = () => {
  return (
    
      <div className="about-content">
        <div className="about-section">
          <img src={eventhubLogo} alt="EventHub Logo" className="eventhub-logo" />
          <p className="description">Small description about EventHub.</p>
        </div>
        <div className="about-container">
          <img src={aboutImage1} alt="About Image 1" className="about-image" />
        </div>
      
      <div className="about-image-container">
        <div className="about-section2">
          <img src={aboutImage2} alt="About Image 2" className="about-imagee" />
          <p className="description">Small description about the second image.</p>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
