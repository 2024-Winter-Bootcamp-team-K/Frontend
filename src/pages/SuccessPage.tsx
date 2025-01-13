import React, { useEffect }  from "react";
import { useNavigate } from "react-router-dom";

const SuccessPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
      // 페이지 로드 시 오디오 재생
      const SuccessAudio = new Audio('/sounds/Success4.mp3');
      SuccessAudio.volume = 0.3; // 볼륨 설정
      SuccessAudio.play().catch((error) => {
        console.error("오디오 재생 오류:", error);
      });
      // 페이지 로드가 끝나면 오디오 멈추기
      return () => {
        SuccessAudio.pause(); // 오디오 일시정지
        SuccessAudio.currentTime = 0; // 재생 위치 초기화
      };
    }, []); // 빈 배열로 한 번만 실행

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
            fontSize: "4vw", // 반응형 폰트 크기
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
