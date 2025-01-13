import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ResultPage: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    // 페이지 로드 시 오디오 재생
    const stampAudio = new Audio('/sounds/Stamp.mp3');
    stampAudio.volume = 0.5; // 볼륨 설정
    stampAudio.play().catch((error) => {
      console.error("오디오 재생 오류:", error);
    });
    // 페이지 로드가 끝나면 오디오 멈추기
    return () => {
      stampAudio.pause(); // 오디오 일시정지
      stampAudio.currentTime = 0; // 재생 위치 초기화
    };
  }, []); // 빈 배열을 의존성으로 설정하여 한 번만 실행

  return (
    <div
      className="fixed inset-0 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: 'url(/images/GiveUpPage.png)',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backgroundBlendMode: 'multiply',
      }}
      onClick={() => navigate("/ending")}
    >
      {/* Wanted Poster */}
      <div
        className="absolute left-[25%] transform -translate-x-1/2 top-[15%] flex flex-col items-center"
      >
        <img
          src="/images/WantedSuspect.png"
          alt="Wanted Suspect"
          className="w-[90%] max-w-[400px] h-auto shadow-md"
        />
        <div
          className="absolute left-1/2 transform -translate-x-1/2 top-[30%]"
        >
          <img
            src="/images/Suspect1.png"
            alt="Wanted Suspect"
            className="shadow-md"
            style={{
              width: "20vw", // 반응형 너비
              maxWidth: "160px", // 최대 너비
              height: "auto", // 비율 유지
              transform: "translateY(-10px)", // 살짝 위로 이동
            }}
          />
        </div>
        <div
          className="absolute bottom-[38%] left-1/2 transform -translate-x-1/2 text-center opacity-0 animate-stamp"
          style={{
            animationDelay: '0.5s',
            animationFillMode: 'forwards',
            transform: "translateY(-25px)", // 살짝 위로 이동
          }}
        >
          <img
            src="/images/WANTED.png"
            alt="WANTED Stamp"
            className="rounded-lg"
            style={{
              width: "25vw", // 반응형 너비
              maxWidth: "240px", // 최대 너비
              height: "auto", // 비율 유지
              transform: "translateY(-25px)", // 살짝 위로 이동
            }}
          />
        </div>

        {/* 범인 이름 */}
        <p
          className="mt-4 font-Binggrae text-white font-bold drop-shadow-md text-center"
          style={{
            fontSize: "2.5vw", // 반응형 폰트 크기
          }}
        >
          범인 김민수
        </p>
      </div>

      {/* 범행 동기 내용 */}
      <div
        className="flex items-center justify-center fixed inset-0"
      >
        <div
          className="absolute left-[60%] p-4 rounded-lg shadow-md text-white"
          style={{
            width: "90%", // 반응형 너비
            maxWidth: "500px", // 최대 너비
            height: "auto", // 높이 자동
          }}
        >
          <p
            className="font-Binggrae text-white font-bold drop-shadow-md text-left leading-relaxed"
            style={{
              fontSize: "2vw", // 반응형 폰트 크기
            }}
          >
            범행 동기 : 지나친 소유욕
            <br />
            <br />
            너무 갖고 싶은 작품이었는데  
            가질 수 있는 방법이 없어  
            훔치기로 결정.
            <br />
            <br />
            00년 00월 00일 박물관에 잡입 후  
            지문이 남지 않도록 장갑을 착용한 채  
            미술품을 훔쳐 달아났지만 CCTV에 모습이 찍힘.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
