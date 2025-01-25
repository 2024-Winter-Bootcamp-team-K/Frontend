import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../hooks/axiosInstance.ts";
import { useUser } from "../hooks/UserContext";
import { useAudio } from "./MainAudioContext";
import { faVolumeHigh,faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface ScenarioResponse {
  scenarios: Scenario[];
}

interface Scenario {
  id: number;
  name: string;
  image: string;
  level: number;
  type: string;
  is_success: boolean;
  created_at: string;
}

const historyService = {
  getHistories: (userId: number) =>
    axiosInstance.get<ScenarioResponse>("/histories", {
      params: { user_id: userId },
    }),
};

const MainPage: React.FC = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scenarios, setScenarios] = useState<Scenario[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const { userId, updateUserIdFromPath } = useUser();
  const { toggleAudioPlay } = useAudio();

  const playSound = () => {
    const audio = new Audio("/sounds/book.mp3");
    audio.play();
  };

  const handleExit = () => {
    navigate('/login'); 
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const handleKeyboardNavigation = useCallback((e: KeyboardEvent) => {
    if (!isModalOpen || scenarios.length === 0) return;

    const moveCards = (direction: 'right' | 'left') => {
      const totalCards = scenarios.length;
      
      if (direction === 'left') {
        setCurrentCardIndex((prevIndex) => 
          prevIndex === 0 ? totalCards - 1 : prevIndex - 1
        );
      } else {
        setCurrentCardIndex((prevIndex) => 
          (prevIndex + 1) % totalCards
        );
      }
    };

    switch (e.key) {
      case 'ArrowLeft':
        moveCards('left');
        break;
      case 'ArrowRight':
        moveCards('right');
        break;
    }
  }, [isModalOpen, scenarios.length]);

  const handleBackgroundClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;

    // 카드 외부 클릭 시 모달 닫기
    if (
      !target.closest(".bgm-toggle") && 
      !target.closest(".card-container") && 
      !target.closest(".button-wrapper")
    ) {
      setIsModalOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyboardNavigation);
    return () => {
      window.removeEventListener('keydown', handleKeyboardNavigation);
    };
  }, [handleKeyboardNavigation]);

  useEffect(() => {
    updateUserIdFromPath();
    const fetchHistories = async () => {
      try {
        setLoading(true);
        const response = await historyService.getHistories(userId);
        setScenarios(response.data.scenarios);
      } catch {
        setError("데이터를 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchHistories();
  }, [userId, updateUserIdFromPath]);

  if (isLoading) return null;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <Background
      onClick={handleBackgroundClick}
    >
      <ExitButton className="exit-button" onClick={handleExit}>
        <FontAwesomeIcon icon={faSignOutAlt} />
      </ExitButton>
      <PlayButtonWrapper className="button-wrapper">
        <PlayButton onClick={toggleModal}>플레이 기록</PlayButton>
      </PlayButtonWrapper>

      <ScenarioButtonWrapper className="button-wrapper">
        <ScenarioButton
          onClick={() => {
            playSound();
            handleNavigation("/MakeScenarioPage");
          }}
        >
          시나리오 생성
        </ScenarioButton>
      </ScenarioButtonWrapper>

      <button className="bgm-toggle" onClick={toggleAudioPlay}>
        <FontAwesomeIcon icon={faVolumeHigh}/>
        <style> {`
        .bgm-toggle {
          position: fixed;
          top: 1.5rem;
          right: 1.5rem;
          background: none;
          border: none;
          font-size: 2rem;
          cursor: pointer;
          color: #FFFFFF;
        }
        .bgm-toggle:hover {
          transform: scale(1.2) ;
        }
        `}
        </style>
      </button>

      {isModalOpen && (
        <CardContainer>
          {scenarios.map((scenario, index) => {
            const positionDiff = index - currentCardIndex;
            const absPositionDiff = Math.abs(positionDiff);
            
            let translateX = 0;
            let scale = 1;
            let zIndex = 0;
            let overlay = 0;
            
            if (positionDiff === 0) {
              translateX = 0;
              scale = 1.4;
              zIndex = 10; 
              overlay = 0; 
            } else if (positionDiff < 0) {
              translateX = -100 * absPositionDiff;
              zIndex = 5 - absPositionDiff;
              overlay = 0.5; 
            } else {
              translateX = 100 * absPositionDiff;
              zIndex = 5 - absPositionDiff;
              overlay = 0.5; 
            }

            return (
              <Card
                key={scenario.id}
                $translateX={translateX}
                $scale={scale}
                $zIndex={zIndex}
                $overlay={overlay}
                onClick={() => {
                  playSound();
                  handleNavigation(`/history/${scenario.id}`);
                }}
              >
                <CardOverlay $opacity={overlay} />
                <CardImage src={scenario.image} alt={scenario.name} />
                <CardTitle>{`사건 일지 #${String(scenario.id).padStart(3, "0")}`}</CardTitle>
                <CardDetail>
                  <ScenarioName>{scenario.name}</ScenarioName>
                  <br />
                  <PlayDate>
                    {'플레이 날짜 '}
                    {new Date(scenario.created_at).toLocaleString('ko-KR', {
                      month: '2-digit',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </PlayDate>
                </CardDetail>
              </Card>
            );
          })}
        </CardContainer>
      )}
    </Background>
  );
};

export default MainPage;

// Styled Components (modified)
const Background = styled.div`
  position: fixed;
  inset: 0;
  background-image: url(/images/background2.jpg);
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ExitButton = styled.button`
  position: fixed;
  top: 1.1rem;
  left: 1.6rem;
  background: none;
  border: none;
  font-size: 2.5rem;
  cursor: pointer;
  color: #FFFFFF;

  &hover {
    transform: scale(1.2);
  }
`;

const CommonButton = styled.button`
  background: linear-gradient(135deg, #3a3b3b 0%, #5c5e5e 100%);
  color: white;
  font-size: calc(0.8vh + 1.8vw);
  font-weight: bold;
  padding: 1rem 2rem;
  border-radius: 12px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-transform: uppercase;
  font-family: 'BinggraeII';
  letter-spacing: 1px;

  &:hover {
    transform: translateY(-3px);
    background: linear-gradient(135deg, #4c4d4d 0%, #6e7070 100%);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

const PlayButton = styled(CommonButton)`
   background: linear-gradient(135deg, #304342 0%, #40605e 100%); 

   &:hover {     
    background: linear-gradient(135deg, #40605e 0%, #304342 100%); 
  }
`;

const ScenarioButton = styled(CommonButton)`
  background: linear-gradient(135deg, #9b7b5a 0%, #b89474 100%);   
  
  &:hover {     
    background: linear-gradient(135deg, #b89474 0%, #9b7b5a 100%);   
  }
`;

const PlayButtonWrapper = styled.div`
  position: absolute;
  top: 53%;
  left: 3%;
  transform: translateY(-50%);
  width: auto;
  height: auto;
`;

const ScenarioButtonWrapper = styled.div`
  position: absolute;
  top: 53%;
  left: 49%;
  transform: translate(-50%, -50%);
  width: auto;
  height: auto;
`;

const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 80%;
  height: 100%;
`;

const Card = styled.div<{ $translateX: number; $scale: number; $zIndex: number; $overlay: number }>`
  flex: 0 0 auto;
  width: 36vh;
  height: 45vh;
  background-image: url(/images/papyrus.png);
  background-size: cover;
  background-position: center;
  border-radius: 1px;
  padding: 2.2vw;
  color: white;
  position: absolute;
  transition: transform 0.3s ease;
  transform: 
    translateX(${props => props.$translateX}%) 
    scale(${props => props.$scale});
  z-index: ${props => props.$zIndex};
  cursor: pointer;
`;

const CardOverlay = styled.div<{ $opacity: number }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, ${props => props.$opacity});
  z-index: 1;
`;

const CardImage = styled.img`
  width: 100%;
  height: 16vh;
  object-fit: cover;
  border-radius: 5px;
  position: relative;
  z-index: 2;
`;

const CardTitle = styled.h3`
  font-size: calc(1.2vh + 2vw);
  margin: 0.5vh 0;
  text-align: center;
  font-family: 'THEFACESHOP_INKLIPQUID';
  font-weight: bold;
  color: black;
  position: relative;
  z-index: 2;
`;

const CardDetail = styled.div`
  text-align: center;
  font-family: 'THEFACESHOP_INKLIPQUID';
  position: relative;
  z-index: 2;
  line-height: 1.0; 
`;

const ScenarioName = styled.p`
  font-size: calc(1.1vh + 1.6vw); 
  color: #000000;
  margin: 0.3vh 0;
`;

const PlayDate = styled.p`
  font-size: calc(0.8vh + 1vw); 
  color: #000000; 
  margin: 0.2vh 0;
`;