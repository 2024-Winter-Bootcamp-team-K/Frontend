import React, { useState } from "react";
import styled from "styled-components";

const GamePage3: React.FC = () => {
  const [answer, setAnswer] = useState("");
  const [resultMessage, setResultMessage] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer(e.target.value);
  };

  const playAudio = (audioFile: string) => {
    const audio = new Audio(audioFile);
    audio.play();
  };

  const handleCheckAnswer = () => {
    if (answer === "20") {
      setResultMessage("정답입니다! 🎉");
      playAudio('/sounds/correct.mp3');
    } else {
      setResultMessage("오답입니다. 다시 시도해보세요.");
      playAudio('/sounds/poka.mp3');
    }
  };

  return (
    <Container>
      <Title>스도쿠 게임</Title>
      <GameImage src="/images/minigame3.png" alt="Sudoku Puzzle" />
      {resultMessage && <ResultMessage>{resultMessage}</ResultMessage>}
      <label htmlFor="answer">4개의 모서리의 합은?</label>
      <InputContainer>
        <AnswerInput
          type="number"
          value={answer}
          onChange={handleInputChange}
          placeholder="숫자를 입력하세요"
        />
        <CheckButton onClick={handleCheckAnswer}>확인</CheckButton>
      </InputContainer>
    </Container>
  );
};

export default GamePage3;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: transparent;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 20px;
  color: #333;
`;

const GameImage = styled.img`
  width: 80%;
  max-width: 500px;
  border-radius: 10px;
  margin-bottom: 20px;
`;



const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const AnswerInput = styled.input`
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: 10px;
  color:black;
`;

const CheckButton = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  position: relative; /* 또는 absolute */
  top: -55px; /* 위로 이동 */
  left: 160px; /* 오른쪽으로 이동 */

  &:hover {
    background-color: #45a049;
  }
`;

const ResultMessage = styled.div`
  margin-top: 20px;
  font-size: 1.2rem;
  font-weight: bold;
  color: ${(props) => (props.children === "정답입니다! 🎉" ? "green" : "red")};
`;
