import React from "react";
import { useNavigate } from "react-router-dom";

const ChoosePage: React.FC = () => {
  const navigate = useNavigate();

  // 성공 여부를 확인하는 함수 (백엔드 연동 시 주석 해제 및 로직 추가)
  const checkResult = () => {
    // 예시: 백엔드에서 결과를 가져오는 비동기 함수
    // fetch('/api/check-result')
    //   .then(response => response.json())
    //   .then(data => {
    //     if (data.result === true) {
    //       navigate("/success");
    //     } else {
    //       navigate("/fail");
    //     }
    //   });
    
    // 현재는 로컬 상태로 테스트
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
      <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 text-center">
        <p
          className="font-Binggrae text-stroke-black3 text-white font-bold drop-shadow-md"
          style={{ fontSize: "80px" }}
        >
          진실은 언제나 하나!
        </p>

        <p
          className="font-Binggrae text-stroke-black3 text-white font-bold drop-shadow-md"
          style={{ fontSize: "80px" }}
        >
          범인은 당신이야!
        </p>
      </div>
    </div>
  );
};

export default ChoosePage;
