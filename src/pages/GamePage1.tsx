import React, { useState } from 'react';
import styled from 'styled-components';

const GamePage1: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [resultMessage, setResultMessage] = useState<string | null>(null);

  const checkAnswer = () => {
    if (inputValue === '5') {
      setResultMessage('정답입니다! 🎉');
    } else {
      setResultMessage('틀렸습니다. 다시 시도해보세요.');
    }
  };

  return (
    <GameContainer>
      <ImageContainer>
        <GameImage src="/images/minigame1.png" alt="틀린 그림 찾기" />
      </ImageContainer>

      {/* 결과 메시지 */}
      {resultMessage && <ResultMessage>{resultMessage}</ResultMessage>}

      {/* 입력 폼 */}
      <InputContainer>
        <label htmlFor="answer">틀린 곳은 몇 군데일까요?</label>
        <AnswerInput
          id="answer"
          type="text"
          placeholder="숫자를 입력하세요"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <CheckButton onClick={checkAnswer}>확인</CheckButton>
      </InputContainer>
    </GameContainer>
  );
};

export default GamePage1;

// Styled Components
const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: transparent;
`;

const ImageContainer = styled.div`
  width: 80%;
  margin-bottom: 20px;
`;

const GameImage = styled.img`
  width: 150%;
  max-width: none; /* 최대 너비 제한 제거 */
  height: auto;
  border-radius: 10px;
  object-fit: cover;

  position: relative;
  top: 15px;
  left: -116px;
`;




const ResultMessage = styled.p`
  font-size: 1.2rem;
  color: ${(props) => (props.children === '정답입니다! 🎉' ? 'green' : 'red')};
  font-weight: bold;
  margin-bottom: 10px; /* 입력칸과의 간격 */
`;


const AnswerInput = styled.input`
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 200px;
  color:black;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
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


