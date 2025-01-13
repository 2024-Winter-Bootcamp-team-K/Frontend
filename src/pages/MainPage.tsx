//MainPage
import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const navigate = useNavigate();
  const [isBlurred, setIsBlurred] = useState(false);

  const playSound = () => {
    const audio = new Audio("/sounds/book.mp3");
    audio.play();
  };

  

  const handleNavigation = (path: string) => {
    setIsBlurred(true); // Blur 효과 시작
    setTimeout(() => {
      navigate(path); // 페이지 이동
    }, 500); // Blur 효과 지속 시간
  };

  return (
    <Background className={isBlurred ? "blur" : ""}>
      <PlayButtonWrapper>
        <PlayButton
          onClick={() => {
            playSound();
            handleNavigation("/HistoryPage");
          }}
        >
          플레이 기록
        </PlayButton>
      </PlayButtonWrapper>

      <ScenarioButtonWrapper>
        <ScenarioButton
          onClick={() => {
            playSound();
            handleNavigation("/MakeScenarioPage");
          }}
        >
          시나리오 생성
        </ScenarioButton>
      </ScenarioButtonWrapper>
    </Background>
  );
};

export default MainPage;

// Styled Components
const Background = styled.div`
  position: fixed;
  inset: 0;
  background-image: url(/images/background.jpg);
  background-size: cover;
  background-position: center;
  transition: filter 0.5s ease-in-out;

  &.blur {
    filter: blur(10px);
  }
`;

const PlayButtonWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 7%;
  transform: translateY(-50%);
`;

const ScenarioButtonWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const PlayButton = styled.button`
  background-color: #0a122a; /* 기본 배경색 */
  color: white; /* 기본 텍스트 색상 */
  font-size: 1.25rem;
  font-weight: bold;
  padding: 0.75rem 1.5rem;
  border-radius: 9999px;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  /* 버튼의 hover 효과 */
  &:hover {
    color: #fff;
    background-color: #8b0000; /* 피에 물든 듯한 전체 배경색 */
    box-shadow: 0 8px 15px rgba(139, 0, 0, 0.5); /* 붉은 그림자 */
    animation: shake 0.5s ease-in-out infinite; /* 떨림 애니메이션 */
  }

  /* 위에서 아래로 색 채우기 */
  &::before {
    content: '';
    position: absolute;
    top: -100%;
    bottom: 0;
    left: 0;
    right: 0;
    background: #ff0000; /* 피 같은 붉은 색 */
    z-index: -1;
    opacity: 0;
    transition: all 0.5s ease-in-out;
  }

  &:hover::before {
    top: 0;
    opacity: 1;
  }

  /* 떨림 애니메이션 */
  @keyframes shake {
    0%, 100% {
      transform: translate(0, 0); /* 원래 위치 */
    }
    20% {
      transform: translate(-5px, 4px); /* 왼쪽 아래 */
    }
    40% {
      transform: translate(5px, -4px); /* 오른쪽 위 */
    }
    60% {
      transform: translate(-5px, -4px); /* 왼쪽 위 */
    }
    80% {
      transform: translate(5px, 4px); /* 오른쪽 아래 */
    }
  }
`;



const ScenarioButton = styled(PlayButton)``;
