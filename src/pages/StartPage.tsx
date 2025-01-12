import React from "react";
import { useState } from 'react'; 
import ZoomBackground from './ZoomBackground';
import CenteredImage from './CenteredImage';
import '../components/StartPage.css'; 

const StartPage: React.FC = () => {
  const [isZooming, setIszooming] = useState(false);
  const [showImage, setShowImage] = useState(false);

  const handleClick = () => {
    setIszooming(true); 
    setTimeout(() => {
      setShowImage(true); 
    }, 1000); 
  };

  return (
    <div className="start-page" onClick={handleClick}>
    
      {!isZooming && (
        <div className="content">
          <img
            src="/images/InitPageText.png" 
            alt="start-text" 
            className="start-text"
          />
        </div>
      )}
      {isZooming && <ZoomBackground />} 
      {showImage && <CenteredImage />}
    </div>
  );
};

export default StartPage;
