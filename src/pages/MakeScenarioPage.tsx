//시나리오 생성 
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const MakeScenarioPage = () => {
  const [animate, setAnimate] = useState(false); // 페이지 로드 애니메이션
  const [exitAnimate, setExitAnimate] = useState(false); // 배경 클릭 애니메이션
  const [showContent, setShowContent] = useState(false); // 텍스트 표시 여부
  const [difficulty, setDifficulty] = useState(""); // 난이도 상태
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
        <Content className={showContent ? "visible" : "hidden"} onClick={handleStopPropagation}>
          <Title>시나리오 생성</Title>
          <Form>
            <Row>
              <Label>범행 장소</Label>
              <Input type="text" placeholder="장소를 입력하세요" onClick={handleStopPropagation} />
            </Row>
            <Row>
              <Label>범행 날짜</Label>
              <Input type="text" placeholder="XXXX년 XX월 XX일 XX시경" onClick={handleStopPropagation} />
            </Row>
            <Row>
              <Label>범행 종류</Label>
              <Input type="text" placeholder="살인사건 또는 도난사건 " onClick={handleStopPropagation} />
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

// Styled Components

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
  bottom: -150%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
  width: 50%; /* 이미지 너비 조정 */
  height: auto; /* 비율 유지 */
  transition: bottom 1.5s ease-out, transform 1s ease-out;

  &.animate {
    bottom: -15%;
    transform: translate(-50%, 0);
    animation: shake 0.5s ease-in-out infinite; /* 떨림 효과 추가 */
  }

  &.exit {
    bottom: -150%;
    transform: translate(-50%, 0%);
  }

  @keyframes shake {
    0%, 100% {
      transform: translate(-50%, 0); /* 원래 위치 */
    }
    20% {
      transform: translate(-50%, -1px); /* 위로 약간 이동 */
    }
    40% {
      transform: translate(-50%, 1px); /* 아래로 약간 이동 */
    }
    60% {
      transform: translate(-50%, -1px); /* 위로 약간 이동 */
    }
    80% {
      transform: translate(-50%, 1px); /* 아래로 약간 이동 */
    }
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
  font-size: 4.5rem;
  font-weight: bold;
  margin-bottom: 10px;
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
  font-size: 2.5rem;
  color: rgba(0, 0, 0, 0.8);
  margin-right: 0px;
  text-align: right;
`;

const DifficultyRow = styled(Row)`
  margin-top: 50px;
  align-items: center;
`;

const DifficultyLabel = styled(Label)`
  margin-left: 260px;
  text-align: left;
`;

const Input = styled.input`
  flex: 2;
  padding: 7px;
  border: 1px solid rgba(0, 0, 0, 0.01);
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.02);
  color: black;
  font-size: 1.5rem;

  &::placeholder {
    color: rgba(0, 0, 0, 0.6);
    font-style: italic;
  }
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
  color: ${({ isSelected }) => (isSelected ? "red" : "black")};
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
  background-color: rgba(10, 18, 42, 0); /* 배경색을 반투명하게 설정 */
  color: white;
  border: none;
  border-radius: 9999px;
  font-size: 1.8rem;
  font-weight: bold;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.8);
  cursor: pointer;
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s ease-in-out;

  &:hover {
    transform: scale(1.5); /* 버튼 확대 */
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.9); /* 더 강한 그림자 */
    color: red; /* 텍스트 색상을 붉게 */
  }

  &:hover::after {
    animation: glitch_4011 0.3s steps(4, end) infinite; /* 글리치 효과 실행 속도 증가 */
  }

  &::after {
    --move1: inset(50% 50% 50% 50%);
    --move2: inset(31% 0 40% 0);
    --move3: inset(39% 0 15% 0);
    --move4: inset(45% 0 40% 0);
    --move5: inset(45% 0 6% 0);
    --move6: inset(14% 0 61% 0);
    clip-path: var(--move1);
    content: '사건 진입'; /* 글리치 텍스트 */
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    color: #ff0000; /* 피 같은 붉은 색 */
    background-color: transparent;
    animation: glitch_4011 0.9s steps(3, end) infinite; /* 기본 글리치 애니메이션 */
    text-shadow: 
      -6px -6px 5px #1df2f0, 
      6px 6px 5px #E94BE8, 
      10px -10px 15px rgba(0, 255, 255, 0.5), 
      -10px 10px 15px rgba(255, 0, 255, 0.5); /* 글리치 그림자 극대화 */
  }

  @keyframes glitch_4011 {
    0% {
      clip-path: var(--move1);
      transform: translate(3px, -8px); /* 움직임 더 크고 빠르게 */
    }
    10% {
      clip-path: var(--move2);
      transform: translate(-15px, 15px);
    }
    20% {
      clip-path: var(--move3);
      transform: translate(15px, -15px);
    }
    30% {
      clip-path: var(--move4);
      transform: translate(-15px, -15px);
    }
    40% {
      clip-path: var(--move5);
      transform: translate(15px, 15px);
    }
    50% {
      clip-path: var(--move6);
      transform: translate(-20px, 20px);
    }
    60% {
      clip-path: var(--move1);
      transform: translate(20px, -20px);
    }
    100% {
      clip-path: var(--move1);
      transform: translate(0);
    }
  }
`;
