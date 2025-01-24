//메인 카드형
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../hooks/axiosInstance.ts";
import { useUser } from "../hooks/UserContext";
import { useAudio } from "./MainAudioContext";
import { faVolumeHigh } from '@fortawesome/free-solid-svg-icons';
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
}

// API 서비스 함수
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
  const [offsetX, setOffsetX] = useState(0); // 마우스 위치에 따른 이동
  const { userId } = useUser();
  const { toggleAudioPlay } = useAudio();

  const playSound = () => {
    const audio = new Audio("/sounds/book.mp3");
    audio.play();
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isModalOpen) return; // 모달이 열리지 않은 경우 무시

    const screenWidth = window.innerWidth;
    const mouseX = e.clientX;

    // 화면 중앙에서 움직임 제한
    const centerThreshold = screenWidth * 0.4; // 중앙 40% 영역
    const moveFactor = 0.9; // 이동 속도 감소
    const maxOffset = scenarios.length * 20 - 80; // 카드 개수에 따라 이동 제한

    if (mouseX < centerThreshold) {
      // 화면 왼쪽
      setOffsetX((prev) => Math.min(prev + moveFactor, maxOffset));
    } else if (mouseX > screenWidth - centerThreshold) {
      // 화면 오른쪽
      setOffsetX((prev) => Math.max(prev - moveFactor, -maxOffset));
    }
  };

  const handleBackgroundClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;

    // 카드 외부 클릭 시 모달 닫기
    if (!target.closest(".card-container") && !target.closest(".button-wrapper")) {
      setIsModalOpen(false);
    }
  };

  useEffect(() => {
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
  }, [userId]);

  if (isLoading)
    return (
      <div className="loading-container">
        <p>정보를 불러오는 중...</p>
      </div>
    );

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <Background
      onMouseMove={handleMouseMove}
      onClick={handleBackgroundClick}
    >
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

      {/* BGM 토글 버튼 */}
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
        <CardContainer className="card-container" offsetX={offsetX}>
          {scenarios.map((scenario) => (
            <Card
              key={scenario.id}
              onClick={() => {
                playSound();
                handleNavigation(`/history/${scenario.id}`);
              }}
            >
              <CardImage src={scenario.image} alt={scenario.name} />
              <CardTitle>{`사건 일지 #${String(scenario.id).padStart(3, "0")}`}</CardTitle>
             
              <CardDetail>{`타입: ${scenario.type}`}</CardDetail>
            </Card>
          ))}
        </CardContainer>
      )}
    </Background>
    
  );
};

export default MainPage;

// Styled Components
const Background = styled.div`
  position: fixed;
  inset: 0;
  background-image: url(/images/background2.jpg);
  background-size: cover;
  background-position: center;
`;

const PlayButtonWrapper = styled.div`
  position: absolute;
  top: 53%;
  left: 8%;
  transform: translateY(-50%);
`;

const PlayButton = styled.button`
  background-color: rgba(58, 59, 59, 0.5);
  color: white;
  font-size: 1.25rem;
  font-weight: bold;
  padding: 0.75rem 1.5rem;
  border-radius: 9999px;
  border: none;
  cursor: pointer;
`;

const ScenarioButtonWrapper = styled.div`
  position: absolute;
  top: 55%;
  left: 49%;
  transform: translate(-50%, -50%);
`;

const ScenarioButton = styled(PlayButton)``;

const CardContainer = styled.div<{ offsetX: number }>`
  display: flex;
  gap: 20px;
  transform: translateX(calc(${(props) => props.offsetX}% - 50%));
  transition: transform 0.1s ease-out; /* 부드러운 이동 */
  position: fixed;
  bottom: 20%;
  left: 50%;
  transform: translateX(calc(-50% + ${(props) => props.offsetX}%));
  width: 80%;
  background: rgba(255, 255, 255, 0); /* 투명 배경 */
  border-radius: 15px;
  padding: 20px;
`;

const Card = styled.div`
  flex: 0 0 auto;
  width: 200px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 20px;
  color: white;
  transition: transform 0.2s ease, background 0.2s ease;

  &:hover {
    transform: scale(1.1); /* Hover 시 확대 */
    background: rgba(255, 255, 255, 0.2);
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 100px;
  object-fit: cover;
  border-radius: 10px;
`;

const CardTitle = styled.h3`
  font-size: 1.2rem;
  margin: 10px 0;
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold; /* 제목의 굵기를 굵게 설정 */
  color: black;
`;

const CardDetail = styled.p`
  font-size: 0.9rem;
  color: #000000;
  font-size: 1.2rem;
  text-align: center;
`;
