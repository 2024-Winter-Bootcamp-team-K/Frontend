import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const InitChatPage: React.FC = () => {
  const [visibleSuspect, setVisibleSuspect] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleSuspect((prev) => (prev < 3 ? prev + 1 : prev));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const suspects = [
    {
      name: '화가 김민수',
      imgSrc: '/images/Suspect1.png',
      text: '그날 밤 사무실에서 다음 전시 준비 중이었습니다.',
    },
    {
      name: '경비원 이지원',
      imgSrc: '/images/Suspect2.png',
      text: '순찰 일지에 따르면 사건 발생 시각에 1층에서 순찰 중이었습니다.',
    },
    {
      name: '큐레이터 장현우',
      imgSrc: '/images/Suspect3.png',
      text: 'CCTV에 그날 밤 9시에 퇴근하는 모습이 찍혔습니다만...',
    },
  ];

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-[#181818] text-white font-intelmono">
      <h1
        style={{
          fontSize: '3vw',
          marginBottom: '4vh',
        }}
        className="font-intelmono font-bold text-center"
      >
        기밀 사건 파일 #2024-12-30
      </h1>

      <div
        style={{
          backgroundColor: '#1E305A',
          boxShadow: 'inset 0px 10px 30px rgba(24, 23, 32, 0.7), inset 0px -10px 30px rgba(0, 0, 0, 0.7)',
          width: '70vw',
          height: '52vh',
          padding: '6vh 3vw 6vh 3vw',
          display: 'flex',
          alignItems: 'center', 
          justifyContent: 'center', 
        }}
        className="font-intelmono relative rounded-lg"
      >
        <div style={{ 
          display: 'flex',
          justifyContent: 'space-around',
          width: '100%', 
          maxWidth: '1200px', 
          gap: '4vw',
        }}>
          {suspects.map((suspect, index) => (
            <div
              key={index}
              style={{
                flex: '0 1 auto',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: '26%', 
              }}
              className={`transition-opacity duration-1000 ${
                visibleSuspect > index ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div
                style={{
                  flex: '1',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  minHeight: '15vh',
                }}
              >
                <div className="bubble medium bottom">
                  <p style={{ 
                    fontSize: '1.2vw',
                    wordBreak: 'keep-all',
                    whiteSpace: 'pre-line',
                  }}>
                    {visibleSuspect > index ? suspect.text : ''}
                  </p>
                </div>
              </div>
              <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <img
                  src={suspect.imgSrc}
                  alt={suspect.name}
                  style={{
                    width: '10vw',
                    height: '10vw',
                    marginBottom: '3vh',
                  }}
                />
                <p style={{ fontSize: '1.5vw' }} className="text-center font-intelmono">
                  {suspect.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        style={{
          marginTop: '4vh',
          padding: '1vh 2vw',
          fontSize: '2vw',
        }}
        className="text-white font-intelmono"
        onClick={() => navigate("/play")}
      >
        수사 시작하기
      </button>

      <style>{`
        .bubble {
          position: relative;
          display: inline-block;
          text-align: center;
          line-height: 1.3;
          background-color: white;
          color: black;
          padding: 1.2vh 1.2vw;
          box-shadow: 
            0 -4px white, 
            0 -8px black, 
            4px 0 white, 
            4px -4px black, 
            8px 0 black, 
            0 4px white, 
            0 8px black, 
            -4px 0 white, 
            -4px 4px black, 
            -8px 0 black, 
            -4px -4px black, 
            4px 4px black;
          box-sizing: border-box;
          width: 18vw;
          max-width: 380px;
          margin-bottom: 4vh;
          font-family: 'Inter Mono';
        }

        .bubble::after {
          content: '';
          display: block;
          position: absolute;
          box-sizing: border-box;
        }

        .bubble.bottom::after {
          height: 4px;
          width: 4px;
          bottom: -8px;
          left: 32px;
          box-shadow: 
            0 4px black, 
            0 8px black, 
            0 12px black, 
            0 16px black, 
            -4px 12px black, 
            -8px 8px black, 
            -12px 4px black, 
            -4px 4px white, 
            -8px 4px white, 
            -4px 8px white, 
            -4px 0 white, 
            -8px 0 white, 
            -12px 0 white;
        }

        @media (max-width: 768px) {
          .bubble {
            width: 50vw;
            margin-bottom: 3vh !important;
          }
          .bubble p {
            font-size: 2.5vw !important;
          }
          img {
            width: 20vw !important;
            height: 20vw !important;
          }
          h1 {
            font-size: 5vw !important;
          }
          button {
            font-size: 4vw !important;
          }
          p.text-center {
            font-size: 3vw !important;
          }
        }
      `}</style>
    </div>
  );
};

export default InitChatPage;