import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ChoosePage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
      // 페이지 로드 시 오디오 재생
      const ChooseAudio = new Audio('/sounds/Choose.mp3');
      ChooseAudio.volume = 0.3; // 볼륨 설정
      ChooseAudio.play().catch((error) => {
        console.error("오디오 재생 오류:", error);
      });
      // 페이지 로드가 끝나면 오디오 멈추기
      return () => {
        ChooseAudio.pause(); // 오디오 일시정지
        ChooseAudio.currentTime = 0; // 재생 위치 초기화
      };
    }, []); // 빈 배열로 한 번만 실행

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
