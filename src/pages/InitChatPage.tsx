import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";

type ScenarioData = {
  suspects: {name: string; init_chat: string; image: string}[];
};

const InitChatPage: React.FC = () => {
  const navigate = useNavigate();

  const {scenario_id} = useParams<{scenario_id: string}>();
  const [visibleSuspect, setVisibleSuspect] = useState(0);
  const [scenarioData, setScenarioData] = useState<ScenarioData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchScenario = async () => {
      try {
        if (!scenario_id) {
          throw new Error("Senario ID is missing");
        }

        const response = await fetch(`https://ailibi.click/api/v1/scenarios/${scenario_id}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch scenario: ${response.statusText}`);
        } 

        const data: ScenarioData = await response.json();
        setScenarioData(data);
        setError(null);
      } catch (error) {
        console.error("Failed to load scenario data:", error);
        setError("시나리오 데이터를 로드하는 데 실패했습니다.");
      }
    };
    
    

    if (scenario_id) {
      fetchScenario();
    }
    const interval = setInterval(() => {
      setVisibleSuspect((prev) => (prev < 3 ? prev + 1 : prev));
    }, 2000);
    return () => clearInterval(interval);
  }, [scenario_id]);

  const suspects = scenarioData
    ? scenarioData.suspects.map(({name, init_chat, image}) => ({
      name,
      init_chat,
      image,
    }))
    : [];

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-[#181818] text-white font-intelmono">
      <h1
        style={{
          fontSize: '3vw',
          marginBottom: '4vh',
        }}
        className="font-intelmono font-bold text-center"
      >
      기밀 사건 파일 #{scenario_id}      
      </h1>
      
        {/* 에러 메시지 */}
      {error ? (
        <div className="bg-red-600 p-4 rounded-lg text-center">
          <p>{error}</p> {/* 에러 메시지 */}
        </div>
      ) : (
        <div
          style={{
            backgroundColor: "#1E305A",
            boxShadow:
              "inset 0px 10px 30px rgba(24, 23, 32, 0.7), inset 0px -10px 30px rgba(0, 0, 0, 0.7)",
            width: "70vw",
            height: "52vh",
            padding: "6vh 3vw 6vh 3vw",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          className="font-intelmono relative rounded-lg"
        >
          {/* 용의자 정보를 표시하는 컨테이너 */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              width: "100%",
              maxWidth: "1200px",
              gap: "4vw",
            }}
          >
            {suspects.map((suspect, index) => (
              <div
                key={index}
                style={{
                  flex: "0 1 auto",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "26%",
                }}
                className={`transition-opacity duration-1000 ${
                  visibleSuspect >= index ? "opacity-100" : "opacity-0"
                }`}
              >
                {/* 용의자의 초기 대화 */}
                <div
                  style={{
                    flex: "1",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "15vh",
                  }}
                >
                  <div className="bubble medium bottom">
                    <p
                      style={{
                        fontSize: "1.2vw",
                        wordBreak: "keep-all",
                        whiteSpace: "pre-line",
                      }}
                    >
                      {visibleSuspect >= index ? suspect.init_chat : ''}
                    </p>
                  </div>
                </div>
                {/* 용의자 이미지 및 이름 */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={suspect.image}
                    alt={suspect.name}
                    style={{
                      width: "10vw",
                      height: "10vw",
                      marginBottom: "3vh",
                    }}
                  />
                  <p style={{ fontSize: "1.5vw" }} className="text-center font-intelmono">
                    {suspect.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 수사 시작 버튼 */}
      <button
        className="text-white font-intelmono font-semibold animated-button"
        style={{
          marginTop: "4vh",
          padding: "0.5vh 1vw",
          fontSize: "1.7vw",
        }}
        onClick={() => navigate("/play")}
      >
        수사 시작하기
      </button>

      {/* 스타일 */}
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

        .animated-button {
          font-size: 20px;
          padding: 4px 10px;
          border-radius: 8px;
          position: relative;
          animation: pulse 2s infinite;
        }
  
        .animation-button:hover {
          background-color: rgba(255, 255, 255, 0.2);
        }
  
        @keyframes pulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.13);
          }
          100% {
            transform: scale(1);
          }
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