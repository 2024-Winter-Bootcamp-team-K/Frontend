import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import "../components/VideoPage.css";

const ChoosePage: React.FC = () => {
  const navigate = useNavigate();

    // 배경 클릭 핸들러
      useEffect(() => {
        // Navigate to result page after 5 seconds
        const timeout = setTimeout(() => {
          navigate("/resultLoading");
        }, 5000);
    
        return () => clearTimeout(timeout);
      }, [navigate]);

    return (
        <div className="video-container">
            <video className="video fade-out" autoPlay muted>
                <source src="./mp4/Test2.mp4" type="video/mp4" />
            </video>

            <audio autoPlay>
                <source src="./sounds/rain.mp3" type="audio/mp3" />
            </audio>

            <audio autoPlay>
                <source src="./sounds/foot.mp3" type="audio/mp3" />
            </audio>

        </div>
    );
};

export default ChoosePage;