import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const FailPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // 페이지 로드 시 오디오 재생
    const failAudio = new Audio('/sounds/Stamp.mp3');
    failAudio.volume = 0.3; // 볼륨 설정
    failAudio.play().catch((error) => {
      console.error("오디오 재생 오류:", error);
    });
    // 페이지 로드가 끝나면 오디오 멈추기
    return () => {
      failAudio.pause(); // 오디오 일시정지
      failAudio.currentTime = 0; // 재생 위치 초기화
    };
  }, []); // 빈 배열로 한 번만 실행

  return (
    <div
      className="fixed inset-0 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: 'url(/images/FailPage.png)',
        height: "110vh",
      }}
    >
      {/* FAILURE 스탬프 */}
      <div className="absolute bottom-[55%] left-[75%] transform -translate-x-1/2 animate-stamp">
        <img
          src="/images/FAILURE.png"
          alt="FAILURE Stamp"
          className="rounded-lg"
          style={{
            width: "40vw", // 반응형 너비
            height: "auto", // 비율 유지
          }}
        />
      </div>

      {/* 다시 도전하기 버튼 */}
      <div className="absolute bottom-[45%] left-[75%] transform -translate-x-1/2 text-center">
        <button
          className="text-lg font-semibold border-2 border-red-500 bg-white bg-opacity-70 rounded-2xl shadow-md focus:outline-none"
          style={{
            fontSize: "2vw", // 반응형 폰트 크기
            width: "18vw", // 반응형 너비
            height: "3.5vw", // 반응형 높이
            color: "#FF0000",
          }}
          onClick={() => alert("다시 도전하기")}
        >
          다시 도전하기
        </button>
      </div>

      {/* 포기 하기 버튼 */}
      <div className="absolute bottom-[35%] left-[75%] transform -translate-x-1/2 text-center">
        <button
          className="text-lg font-semibold border-2 border-red-500 bg-white bg-opacity-70 rounded-2xl shadow-md focus:outline-none"
          style={{
            fontSize: "2vw", // 반응형 폰트 크기
            width: "18vw", // 반응형 너비
            height: "3.5vw", // 반응형 높이
            color: "#FF0000",
          }}
          onClick={() => navigate("/give-up")}
        >
          포기 하기
        </button>
      </div>

      {/* 하단 텍스트 */}
      <div className="absolute bottom-[15%] left-1/2 transform -translate-x-1/2 text-center">
        <p
          className="py-6 text-lg font-semibold text-black border-2 border-black bg-white bg-opacity-70 rounded-2xl shadow-md focus:outline-none"
          style={{
            fontSize: "2vw", // 반응형 폰트 크기
            width: "80vw", // 반응형 너비
            height: "auto", // 높이 자동 조정
          }}
        >
          "내가 추리에 실패하다니..."
        </p>
      </div>
    </div>
  );
};

export default FailPage;
