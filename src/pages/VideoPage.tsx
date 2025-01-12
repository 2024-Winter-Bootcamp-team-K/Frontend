import React from "react";
import "../components/VideoPage.css";

const VideoPage: React.FC = () => {
    return (
        <div className="video-container">
            <video className="video fade-out" autoPlay muted>
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