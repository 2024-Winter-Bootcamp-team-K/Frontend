import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NotePage from "./NotePage.tsx";

type Scenario = {
  name: string;
  location: string;
  datetime: string;
  type: string;
  description: string;
  note: string;
};


const PlayPage: React.FC = () => {
  const navigate = useNavigate();
  const { scenario_id } = useParams<{ scenario_id: string }>();
  const [scenario, setScenario] = useState<Scenario | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activePopup, setActivePopup] = useState<boolean>(false); // 상태를 boolean으로 관리
  const handleSuspectCheck = () => {navigate(`/suspect/${scenario_id}`)};
  const handleEvidenceCheck = () => {navigate(`/evidence/${scenario_id}`)};
  const handleFolderCheck = () => openPopup();

  useEffect(() => {
    const fetchScenario = async () => {
      try {
        const response = await fetch(`https://ailibi.click/api/v1/scenarios/${scenario_id}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch scenario: ${response.statusText}`);
        }
        const data = await response.json();
        setScenario(data.scenarios[0]);
        setError(null);
      } catch (error) {
        console.error("Failed to load scenario data:", error);
        setError("시나리오 데이터를 로드하는 데 실패했습니다.");
      }
    };

    if (scenario_id) {
      fetchScenario();
      localStorage.setItem('currentScenarioId', scenario_id);
    }
  }, [scenario_id]);

  const openPopup = () => {
    setActivePopup(true); // 팝업 열기
  };

  const closePopup = () => {
    setActivePopup(false); // 팝업 닫기
  };    

  return (
    <div className="playpage-container">
      <div className="content-wrapper">
        {/* 사건 정보를 로드 중 또는 에러 발생 시 */}
        {error ? (
          <div className="error-message">
            <p>{error}</p>
          </div>
        ) : !scenario ? (
          <div className="loading-message">
            <p>{/*정보를 불러오는 중...*/}</p>
          </div>
        ) : (
          <>
            {/* 사건 정보 표시 */}
            <div className="paper bg-gradient-to-br from-amber-50 to-amber-100 border-0 transform transition-all rounded-lg animate-box">
              <img
                src="/images/papyrus.png"
                alt="Papyrus scroll"
                className="paper-image"
              />
              <div className="paper-content">
                <div className="case-details">
                  {/* 사건 이미지 */}
                  <div className="case-image">
                    <img
                      src="/images/Case_place.png"
                      alt="Crime Scene"
                      className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  {/* 사건 세부사항 */}
                  <div className="case-text">
                    <h2 className="case-title">{scenario.name}</h2>
                    <div className="case-info">
                      <p className="case-info-text">
                        Date: {scenario.datetime}
                        <br />
                        Location: {scenario.location}
                        <br />
                        <span className="case-type">Type: {scenario.type}</span>
                      </p>
                    </div>
                    <p className="case-description">{scenario.description}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 버튼 */}
            <div className="button-container">
              <div className="button-wrapper">
                <img
                  src="/images/playpage_img1.png"
                  alt="Suspect"
                  className="button-image hover-effect"
                />
                <button className="action-button" onClick={handleSuspectCheck}>
                  용의자 확인
                </button>
              </div>

              <div className="button-wrapper">
                <img
                  src="/images/playpage_img2.png"
                  alt="Evidence"
                  className="button-image"
                />
                <button className="action-button" onClick={handleEvidenceCheck}>
                  증거 확인
                </button>
              </div>
            </div>

            {/* 폴더 버튼 */}
            <div className="folder-button-container">
              <button className="folder-button" onClick={handleFolderCheck}>
                <img
                  src="/images/Folder.svg"
                  alt="Folder Icon"
                  className="folder-icon"
                />
              </button>
            </div>
          </>
        )}
      </div>

      {/* NotePage 팝업 */}
      {activePopup && <NotePage onClose={closePopup} />}
      <style>{`
        .playpage-container {
          background-image: url(/images/playpage_back.png);
          background-size: cover;
          background-position: center;
          width: 100%;
          height: 100vh;
        }

        .content-wrapper {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 100%;
          padding: 3vw;
        }

        .paper {
          position: relative;
          width: 45vw;
          height: auto;
          background-image: url(/images/papyrus.png);
          background-size: cover;
          animation: rollDown 2s ease-in-out forwards, boxAnimation 1s infinite alternate;
        }

        .paper-image {
          width: 100%;
          height: auto;
        }

        .paper-content {
          position: absolute;
          top: 12%;
          left: 10%;
          width: 80%;
          height: 76%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 1vw;
          box-sizing: border-box;
        }

        .case-details {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
          background-color: rgba(255, 255, 255, 0);
        }

        .case-image {
          width: 80%;
          height: 75%;
          position: relative;
          overflow: hidden;
          border-radius: 1rem;
          box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
        }

        .case-text {
          text-align: center;
          padding: 0.3vw;
          text-shadow: 0.5px 0.5px 0.5px rgba(0, 0, 0, 0.5);
          margin-top: 0.1vw;
          font-family: 'THEFACESHOP_INKLIPQUID';
        }

        .case-title {
          font-size: 3vw;
          margin-bottom: 1vw;
          font-weight: bold;
          color: black;
        }

        .case-info-text {
          font-size: 2vw;
          margin-bottom: 0.3vw;
          line-height: 1.2;
        }

        .case-type {
          margin-bottom: 2vw;
          display: block;
        }

        .case-description {
          margin-top: 0.5vw;
          font-size: 1.8vw;
          line-height: 1.2;
        }

        .button-container {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          width: 50%;
          height: 80%;
        }

        .button-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 15px;
          width: 100%;
        }

        .folder-button-container {
          position: fixed;
          bottom: 2vw; 
          right: 2vw; 
        }

        .folder-button {
          background: none;
          border: none;
          cursor: pointer;
          outline: none;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .folder-icon {
          width: 4vw; 
          height: 4vw; 
          min-width: 2.5rem; 
          min-height: 2.5rem; 
          max-width: 5rem; 
          max-height: 5rem; 
          transition: transform 0.3s ease;
        }

        .folder-button:hover .folder-icon {
          transform: scale(1.2) rotate(15deg);
        }

        .folder-button:active {
          transform: scale(0.9);
        }

        .button-image {
          width: 15vw;
          height: auto;
        }

        .action-button {
          width: 15vw;
          height: 4vw;
          background-color: #9D8D71;
          color: black;
          border: 0.1vw solid black;
          border-radius: 0.7vw;
          font-size: 2vw;
          font-family: 'BinggraeII';
          cursor: pointer;
          transition: background-color 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }

        .action-button img {
          width: 80%;
        }

        .action-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            120deg,
            transparent,
            rgba(255, 255, 255, 0.3),
            transparent
          );
          transition: 0.5s;
        }

        .action-button:hover {
          background-color: #AF8A4B;
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }

        .action-button:hover::before {
          left: 100%;
        }

        .action-button:active {
          transform: translateY(0);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        @keyframes boxAnimation {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-10px);
          }
        }

        @media (max-width: 800px) {
          .button-container {
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 50%;
            height: 50%;
            gap: 10vh;
          }

          .folder-button-container {
            bottom: 3vw;
            right: 3vw;
          }
          
          .folder-icon {
            width: 6vw;
            height: 6vw;
          }
        }

        @media (max-width: 480px) {
          .folder-button-container {
            bottom: 4vw;
            right: 4vw;
          }
          
          .folder-icon {
            width: 8vw;
            height: 8vw;
          }
        }
      `}</style>
    </div>
  );
};

export default PlayPage;