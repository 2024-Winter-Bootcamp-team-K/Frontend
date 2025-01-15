import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useAudio } from "./MainAudioContext";

const MainPage = () => {
  const navigate = useNavigate();
  const { bgmRef } = useAudio();
  const [isBlurred, setIsBlurred] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <Background className={isBlurred ? "blur" : ""}>
      <PlayButtonWrapper>
        <DropdownButton onClick={toggleDropdown}>플레이 기록</DropdownButton>
        {isDropdownOpen && (
          <DropdownMenu>
            <DropdownItem
              onClick={() => {
                playSound();
                handleNavigation("/history");
              }}
            >
              사건 일지 #001
            </DropdownItem>
          </DropdownMenu>
        )}
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
  background-image: url(/images/background2.jpg);
  background-size: cover;
  background-position: center;
  transition: filter 0.5s ease-in-out;

  &.blur {
    filter: blur(10px);
  }
`;

const PlayButtonWrapper = styled.div`
  position: absolute;
  top: 53%;
  left: 8%;
  transform: translateY(-50%);

  @media (max-width: 768px) {
    top: 35%;
    left: 5%;
  }

  @media (max-width: 480px) {
    top: 30%;
    left: 5%;
  }
`;

const DropdownButton = styled.button`
  background-color: rgba(58, 59, 59, 0.5);
  color: white;
  font-size: 1.25rem;
  font-weight: bold;
  padding: 0.75rem 1.5rem;
  border-radius: 9999px;
  border: none;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;

  &:active {
    transform: scale(0.95);
  }

  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 0.5rem 1rem;
  }

  @media (max-width: 480px) {
    font-size: 0.875rem;
    padding: 0.5rem 0.75rem;
  }
`;

const DropdownMenu = styled.div`
  background-color: rgba(58, 59, 59, 0.5);
  border: 1px solid rgba(58, 59, 59, 0.2);
  border-radius: 9999px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: flex items-center justify-center;
`;

const DropdownItem = styled.div`
  padding: 0.5rem 1rem;
  color: white;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: rgba(58, 59, 59, 0.1);
  }
`;

const ScenarioButtonWrapper = styled.div`
  position: absolute;
  top: 55%;
  left: 49%;
  transform: translate(-50%, -50%);

  @media (max-width: 768px) {
    top: 50%;
    left: 50%;
  }

  @media (max-width: 480px) {
    top: 55%;
    left: 50%;
  }
`;

const ScenarioButton = styled(DropdownButton)``;
