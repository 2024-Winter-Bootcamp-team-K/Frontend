import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ResultPage: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const stampAudio = new Audio("/sounds/Stamp.mp3");
    stampAudio.volume = 0.5;
    stampAudio.play().catch((error) => console.error("오디오 재생 오류:", error));
    return () => {
      stampAudio.pause();
      stampAudio.currentTime = 0;
    };
  }, []);

  return (
    <div
      className="fixed inset-0 bg-cover bg-center bg-no-repeat flex items-center justify-center"
      style={{
        backgroundImage: 'url("/images/GiveUpPage.png")',
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        backgroundBlendMode: "multiply",
      }}
      onClick={() => navigate("/ending")}
    >
      <div className="w-full h-full flex items-center justify-center">
        {/* Left Side - Wanted Poster Container */}
        <div className="relative" style={{ marginRight: "15vw" }}>
          {/* 용의자 사진 */}
          <div style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 1,
            width: "10.4vw",
          }}>
            <img
              src="/images/Suspect1.png"
              alt="Suspect"
              style={{
                width: "100%",
                height: "auto",
                objectFit: "contain",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
              }}
            />
          </div>

          {/* Wanted Poster Image */}
          <img
            src="/images/WantedSuspect.png"
            alt="Wanted Suspect"
            style={{
              width: "25vw",
              height: "auto",
              position: "relative",
              zIndex: 2,
            }}
          />

          {/* WANTED Stamp */}
          <img
            src="/images/WANTED.png"
            alt="WANTED Stamp"
            style={{
              position: "absolute",
              top: "0",
              left: "50%",
              transform: "translate(-50%, 80%)",
              width: "17vw",
              height: "auto",
              zIndex: 3,
            }}
          />

          {/* 범인 이름 */}
          <div
            className="absolute w-full text-center"
            style={{
              bottom: "-10%",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            <p
              className="font-Binggrae text-white font-bold drop-shadow-md"
              style={{
                fontSize: "2.5vw",
              }}
            >
              범인 김민수
            </p>
          </div>
        </div>

        {/* Right Side - 범행 동기 내용 */}
        <div
          className="p-4 rounded-lg shadow-md text-white flex items-center justify-center"
          style={{
            width: "40vw",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            border: "1px solid white",
            borderRadius: "6px",
            minHeight: "40vh",
            padding: "2vw",
          }}
        >
          <div
            className="font-Binggrae text-white text-center flex flex-col gap-8 w-full"
            style={{
              fontSize: "1.7vw",
              lineHeight: "1.9",
              wordBreak: "keep-all",
              overflowWrap: "break-word",
            }}
          >
            <p>범행 동기 : 지나친 소유욕</p>
            
            <p>너무 갖고 싶은 작품이었는데 가질 수 있는 방법이 없어 훔치기로 결정.</p>
            
            <p>00년 00월 00일 박물관에 잡입 후 지문이 남지 않도록 장갑을 착용한 채 미술품을 훔쳐 달아났지만 CCTV에 모습이 찍힘.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;