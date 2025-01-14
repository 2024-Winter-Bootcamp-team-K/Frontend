import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const MakeScenarioPage = () => {
  const [animate, setAnimate] = useState(false); // 페이지 로드 애니메이션
  const [exitAnimate, setExitAnimate] = useState(false); // 배경 클릭 애니메이션
  const [showContent, setShowContent] = useState(false); // 텍스트 표시 여부
  const [difficulty, setDifficulty] = useState(""); // 난이도 상태
  const [crimeType, setCrimeType] = useState(""); // 범행 종류 상태
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimate(true); // Paper 애니메이션 시작
      setTimeout(() => setShowContent(true), 1500); // Paper 애니메이션 후 텍스트 표시
    }, 100); // 페이지 로드 시 애니메이션 시작 지연
    return () => clearTimeout(timer);
  }, []);

  const handleBackgroundClick = () => {
    if (!exitAnimate) {
      setShowContent(false); // 텍스트 숨김
      setExitAnimate(true); // Paper 내려가는 애니메이션 시작

      // Book 소리 재생
      const audio = new Audio("/sounds/book.mp3");
      audio.play();

      setTimeout(() => {
        navigate("/MainPage"); // 애니메이션 후 MainPage로 이동
      }, 1500); // 애니메이션 지속 시간과 동기화
    }
  };

  const handleStopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation(); // 이벤트 버블링 방지
  };

  const handleDifficultySelect = (level: string) => {
    setDifficulty(level); // 선택된 난이도 상태 업데이트

    // 펜슬 소리 재생
    const audio = new Audio("/sounds/pencil.mp3");
    audio.play();
  };

  const playFearSound = () => {
    const audio = new Audio("/sounds/fear.wav"); // fear.mp3 파일 경로
    audio.play();
  };

  const handleScenarioButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    playFearSound(); // 클릭 시 fear.mp3 재생
    setTimeout(() => {
      navigate("/loading"); // 다음 페이지로 이동
    }, 500); // 소리 재생 후 페이지 이동
  };

  return (
    <Background
      onClick={handleBackgroundClick} // 배경 클릭 시 이동
      className={animate ? "fade-in" : "fade-out"}
    >
      <PaperWrapper>
        <PaperImage
          src="/images/paper2.png"
          alt="Paper"
          className={`${animate ? "animate" : ""} ${exitAnimate ? "exit" : ""}`}
          onClick={handleStopPropagation} // Paper 클릭 시 이벤트 버블링 방지
        />
        <Content
          className={showContent ? "visible" : "hidden"}
          onClick={handleStopPropagation} // Content 클릭 시 이벤트 버블링 방지
        >
          <Title>시나리오 생성</Title>
          <Form>
            <Row>
              <Label>범행 장소</Label>
              <Input type="text" placeholder="장소를 입력하세요" />
            </Row>
            <Row>
              <Label>범행 날짜</Label>
              <Input type="text" placeholder="XXXX년 XX월 XX일 XX시경" />
            </Row>
            <Row>
              <Label>범행 종류</Label>
              {/* 드롭다운 수정 */}
              <Dropdown
                value={crimeType}
                onChange={(e) => setCrimeType(e.target.value)}
                onClick={(e) => e.stopPropagation()} // 이벤트 버블링 방지
              >
                <option value="" disabled>
                  살인사건 또는 도난사건 선택
                </option>
                <option value="살인사건">살인사건</option>
                <option value="도난사건">도난사건</option>
              </Dropdown>
            </Row>
            <DifficultyRow>
              <DifficultyLabel>난이도</DifficultyLabel>
              <DifficultyWrapper>
                {["상", "중", "하"].map((level) => (
                  <DifficultyOption
                    key={level}
                    isSelected={difficulty === level}
                    onClick={() => handleDifficultySelect(level)}
                  >
                    {level}
                    {difficulty === level && <Circle />}
                  </DifficultyOption>
                ))}
              </DifficultyWrapper>
            </DifficultyRow>
          </Form>
          <Button onClick={handleScenarioButtonClick}>사건 진입</Button>
        </Content>
      </PaperWrapper>
    </Background>
  );
};

export default MakeScenarioPage;

// Styled Components (생략 가능, 기존 코드를 그대로 유지)


const Background = styled.div`
  position: fixed;
  inset: 0;
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url("/images/background.jpg");
  background-size: cover;
  background-position: center;
  cursor: pointer;
  overflow: hidden;
  transition: filter 0.5s ease-in-out;

  &.fade-in {
    filter: blur(0);
  }

  &.fade-out {
    filter: blur(10px);
  }
`;

// Styled Components 


const PaperWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PaperImage = styled.img`
  position: absolute;
  bottom: -150%; /* 초기값 설정 */
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
  width: 35%; /* 이미지 너비 조정 */
  height: auto; /* 비율 유지 */
  transition: bottom 1.5s ease-out, transform 1s ease-out;

  &.animate {
    bottom: 7.5%; /* 페이지 로드 시 위로 올라오는 위치 */
    transform: translate(-50%, 0);
  }

  &.exit {
    bottom: -150%; /* 페이지 이동 시 아래로 내려가는 위치 */
    transform: translate(-50%, 0);
  }
`;


const Content = styled.div`
  position: absolute;
  top: 35%;
  left: 55%;
  transform: translate(-55%, -35%);
  width: 70%;
  z-index: 2;
  color: hsl(0, 100%, 40%);
  font-family: 'THEFACESHOP_INKLIPQUID', sans-serif;
  opacity: 0;
  transition: opacity 1s ease-in-out;
  text-align: center;

  &.visible {
    opacity: 1;
  }

  &.hidden {
    opacity: 0;
  }
`;

const Title = styled.h1`
  position: relative;
  margin-top: 55px; /* 타이틀을 50px 아래로 이동 */
  font-size: 4rem;
  font-weight: bold;
  color: black;
`;

const Form = styled.div`
  width: 100%;
  margin-bottom: 20px;
`;

const Row = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 80px;
  align-items: center;
`;

const Label = styled.label`
  flex: 1;
  font-weight: bold;
  font-size: 2rem;
  color: rgba(0, 0, 0, 0.8);
  margin-left: 75px; /* 왼쪽 여백 유지 */
  margin-bottom: -20px; /* 아래 여백 줄이기 */
  text-align: right;
`;

const Input = styled.input`
  flex: 2;
  padding: 7px;
  border: 1px solid rgba(0, 0, 0, 0.01);
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.02);
  color: black;
  font-size: 2rem;
  

  &::placeholder {
    color: rgba(0, 0, 0, 0.6);
    font-style: italic;
  }
`;

const Dropdown = styled.select`
  flex: 2;
  padding: 7px;
  border: 1px solid rgba(0, 0, 0, 0.01);
  border-radius: 4px;
  background-color: transparent;
  color: black;
  font-size: 2rem;
  cursor: pointer;
  
`;

const DifficultyRow = styled(Row)`
  margin-top: 50px;
  align-items: center;
`;

const DifficultyLabel = styled(Label)`
  margin-left: 300px;
  text-align: left;
`;

const DifficultyWrapper = styled.div`
  position: absolute;
  top: 75%;
  left: 49%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  
`;

const DifficultyOption = styled.div<{ isSelected: boolean }>`
  font-size: 3.3rem;
  font-weight: bold;
  color: ${({ isSelected }) => (isSelected ? "black" : "black")};
  margin: 0 15px;
  cursor: pointer;
  position: relative;

  &:hover {
    color: red;
  }
`;

const Circle = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 2rem;
  height: 2rem;
  border: 2px solid red;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
`;

const Button = styled.button`
  position: relative;
  padding: 10px 20px;
  background-color: transparent;
  color: black;
  border: none;
  border-radius: 9999px;
  font-size: 2rem;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;

  top: -90px; /* 위로 20px 이동 */

  &:active {
    transform: scale(2);
  }

  &:hover {
    opacity: 0.8;
  }
`;
