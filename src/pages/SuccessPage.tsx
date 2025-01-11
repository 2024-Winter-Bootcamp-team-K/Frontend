import React from "react";
import { useNavigate } from "react-router-dom";

const SuccessPage: React.FC = () => {
  const navigate = useNavigate();

  // 배경 클릭 핸들러
  const handleBackgroundClick = () => {
    navigate("/ending"); // "/ending" 경로로 이동
  };

  return (
    <div
      className="fixed inset-0 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: 'url(/images/SuccessPage.png)',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backgroundBlendMode: 'multiply',
      }}
      onClick={handleBackgroundClick} // 배경 클릭 이벤트 등록
    >
      <div className="absolute bottom-1/2 left-1/2 transform -translate-x-1/2 text-center px-4">
        <p
          className="font-Binggrae font-bold drop-shadow-md leading-tight"
          style={{
            fontSize: "6vw", // 반응형 폰트 크기
            color: "#FFD700",
          }}
        >
          Congratulations
        </p>
      </div>
    </div>
  );
};

export default SuccessPage;
