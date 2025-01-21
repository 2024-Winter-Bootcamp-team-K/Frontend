import React from "react";
import { useNavigate } from "react-router-dom";
import "../components/VideoPage.css";
import { useUser } from '../hooks/UserContext';

const VideoPage: React.FC = () => {
    const navigate = useNavigate();
    const { userId } = useUser();

    const handleVideoEnd = () => {
        navigate(`/MainPage/${userId}`);
    }

    return (
        <div className="video-container">
            <video 
            className="video fade-out" 
            autoPlay 
            muted
            onEnded={handleVideoEnd}
            >
                <source src="./mp4/Shot.mp4" type="video/mp4" />
            </video>

            <audio autoPlay>
                <source src="./sounds/rain.mp3" type="audio/mp3" />
            </audio>

            <audio autoPlay>
                <source src="./sounds/foot.mp3" type="audio/mp3" />
            </audio>

            <audio autoPlay>
                <source src="./sounds/door.mp3" type="audio/mp3" />
            </audio>
        </div>
    );
};

export default VideoPage;