import React from "react";
import { useNavigate } from "react-router-dom";

const ChoosePage: React.FC = () => {
  const navigate = useNavigate();

  // 성공 여부를 확인하는 함수
  const checkResult = () => {
    const isSuccess = Math.random() > 0.5; // 랜덤 성공 여부
    if (isSuccess) {
      navigate("/success");
    } else {
      navigate("/fail");
    }
  };

  return (
    <div
      className="fixed inset-0 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: 'url(/images/ChoosePage.png)',
      }}
      onClick={checkResult} // 배경 클릭 시 결과 확인
    >
      <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 text-center px-4">
        <p
          className="font-Binggrae text-stroke-black3 text-white font-bold drop-shadow-md leading-snug"
          style={{ fontSize: "5vw" }} // 반응형 폰트 크기
        >
          진실은 언제나 하나!
        </p>

        <p
          className="font-Binggrae text-stroke-black3 text-white font-bold drop-shadow-md leading-snug"
          style={{ fontSize: "5vw" }} // 반응형 폰트 크기
        >
          범인은 당신이야!
        </p>
      </div>
    </div>
  );
};

export default ChoosePage;
