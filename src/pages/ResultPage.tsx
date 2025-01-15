import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ResultPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const stampAudio = new Audio("/sounds/Stamp.mp3");
    stampAudio.volume = 0.5; // 볼륨 설정
    stampAudio.play().catch((error) => console.error("오디오 재생 오류:", error));
    return () => {
      stampAudio.pause();
      stampAudio.currentTime = 0; // 재생 위치 초기화
    };
  }, []);
  return (
    <div
      className="fixed inset-0 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: 'url("/images/GiveUpPage.png")',
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        backgroundBlendMode: "multiply",
      }}
      onClick={() => navigate("/ending")}
    >
      {/* Wanted Poster */}
      <div
        className="absolute"
        style={{
          top: "50%",
          left: "27%",
          transform: "translate(-50%, -50%)",
        }}
      >
        {/* Wanted Poster Image */}
        <img
          src="/images/WantedSuspect.png"
          alt="Wanted Suspect"
          style={{
            width: "25vw", // 반응형 너비
            maxWidth: "400px",
            height: "auto",
          }}
        />
        {/* 범인 사진 */}
        <div
          style={{
            marginTop: "2vh",
          }}
        >
          <img
            src="/images/Suspect1.png"
            alt="Suspect"
            style={{
              position: "absolute",
              left: "30%",
              top: "32.3%",
              width: "10.4vw", // 반응형 너비
              height: "auto",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
            }}
          />
        </div>
        </div>

        {/* WANTED Stamp */}
        <div
            className="absolute"
            style={{
            top: "49%",
            left: "27.3%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <img
            src="/images/WANTED.png"
            alt="WANTED Stamp"
            style={{
              width: "17vw", // 반응형 너비
              height: "auto",
            }}
          />
        </div>

        {/* 범인 이름 */}
        <p
            className="absolute"
            style={{
            top: "85%",
            left: "26.8%",
            transform: "translate(-50%, -50%)",
          }}
          >
          <p
          className="font-Binggrae text-white font-bold drop-shadow-md text-center"
          style={{
            fontSize: "2.5vw",
          }}
        >
          범인 김민수
        </p>
        </p>
      
      {/* 범행 동기 내용 */}
      <div
        className="flex items-center justify-center fixed inset-0"
      >
        <div
          className="absolute p-4 rounded-lg shadow-md text-white"
          style={{
            left: "73%",
            top: "51%",
            transform: "translate(-50%, -50%)",
            width: "80vw", // 반응형 너비
            maxWidth: "460px",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            border: "1px solid white",
            borderRadius: "6px",
            textAlign: "center",
          }}
        >
          <p
            className="font-Binggrae text-white"
            style={{
              fontSize: "1.7vw", // 반응형 폰트 크기
              lineHeight: "1.9",
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
