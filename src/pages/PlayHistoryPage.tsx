import React, {useEffect} from "react";
import LeftPage from "./LeftPage";
import RightPage from "./RightPage";
import { useNavigate } from "react-router-dom";

const PlayHistoryPage: React.FC = () => {
  const navigate = useNavigate();

  const handleBackgroundClick = () => {
    const audio = new Audio("/sounds/book.mp3");
      audio.play();
    navigate("/MainPage");
  };
    
  return (
    <div
      className="relative h-screen w-full bg-cover bg-center"
      style={{ backgroundImage: 'url("/images/background2.jpg")' }}
      onClick={handleBackgroundClick} // 배경 클릭 핸들러 추가
    >
      {/* 배경 블러 */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-md"
        onClick={(e) => e.stopPropagation()} // 클릭 시 부모 이벤트 전파 방지
      ></div>

      {/* PlayHistory 이미지 */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-[70%] h-auto">
          <img
            src="/images/PlayHistory.png"
            className="w-full h-auto"
            alt="Play History"
          />
          <button>

          </button>
        </div>
      </div>

      {/* Left Page 배치 */}
      <div
        className="absolute top-[20%] left-[10%] w-[40%] h-[70%]
        sm:top-[10%] sm:left-[15%] sm:w-[38%]
        md:top-[12%] md:left-[18%] md:w-[35%]
        lg:top-[17%] lg:left-[15%] lg:w-[40%]"
        onClick={(e) => e.stopPropagation()} // 클릭 시 부모 이벤트 전파 방지
      >
        <LeftPage />
      </div>

      {/* Right Page 배치 */}
      <div
        className="absolute top-[20%] right-[10%] w-[40%] h-[70%]
        sm:top-[10%] sm:right-[15%] sm:w-[38%]
        md:top-[12%] md:right-[18%] md:w-[35%]
        lg:top-[17%] lg:right-[15%] lg:w-[40%]"
        onClick={(e) => e.stopPropagation()} // 클릭 시 부모 이벤트 전파 방지
      >
        <RightPage />
      </div>
    </div>
  );
};

export default PlayHistoryPage;
