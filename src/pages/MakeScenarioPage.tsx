//시나리오 생성
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { createScenario } from "../services/apiService"; // API 서비스 가져오기
import { useUser } from '../hooks/UserContext';

const MakeScenarioPage: React.FC = () => {
  const [animate, setAnimate] = useState(false);
  const [exitAnimate, setExitAnimate] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [difficulty, setDifficulty] = useState("");
  const [event_type, setEvent_type] = useState("");
  const [location, setLocation] = useState(""); 
  const [selectedDate, setSelectedDate] = useState("");
  const navigate = useNavigate();
  const { userId } = useUser();

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimate(true);
      setTimeout(() => setShowContent(true), 1500);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleBackgroundClick = () => {
    if (!exitAnimate) {
      setShowContent(false);
      setExitAnimate(true);
      const audio = new Audio("/sounds/book.mp3");
      audio.play();
      setTimeout(() => {
        navigate(`/MainPage/${userId}`);
      }, 1500);
    }
  };

  const handleStopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleDifficultySelect = (level: string) => {
    setDifficulty(level);
    const audio = new Audio("/sounds/pencil.mp3");
    audio.play();
  };

  const [hour, setHour] = useState<string>('');
  const [minute, setMinute] = useState<string>('');

  const validateDate = (year: number, month: number, day: number) => {
    if (year < 2000 || year > 2025) return false;
    if (month < 1 || month > 12) return false;
    
    let lastDay = 31;
    if ([4, 6, 9, 11].includes(month)) {
      lastDay = 30;
    } else if (month === 2) {

      const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
      lastDay = isLeapYear ? 29 : 28;
    }
    
    return day >= 1 && day <= lastDay;
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9\s]/g, '');
    const parts = value.split(' ');
    
    if (parts.length <= 3) {
      setSelectedDate(value);
    }
  };

  const handleHourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || (Number(value) >= 0 && Number(value) <= 23)) {
      setHour(value);
    }
  };

  const handleMinuteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || (Number(value) >= 0 && Number(value) <= 59)) {
      setMinute(value);
    }
  };


// API 호출 추가
  const handleScenarioButtonClick = async (e: React.MouseEvent) => {
    e.stopPropagation();

    const [yearStr, monthStr, dayStr] = selectedDate.split(' ');
    const year = parseInt(yearStr);
    const month = parseInt(monthStr);
    const day = parseInt(dayStr);

    if (!validateDate(year, month, day)) {
      alert('올바른 날짜를 입력해주세요.');
      return;
    }

    if (
      !location ||
      !selectedDate ||
      !event_type ||
      hour === '' ||
      minute === '' ||
      Number(hour) < 0 ||
      Number(hour) > 23 ||
      Number(minute) < 0 ||
      Number(minute) > 59
    ) {
      alert("모든 필드를 올바르게 입력해주세요.");
      return;
    }

    const scenarioData = {
      user_id: 1,
      year,
      month,
      day,
      hour: hour.padStart(2, "0"),
      minute: minute.padStart(2, "0"),
      location: location.trim(),
      event_type: event_type.trim(),
    };

    try {
    // 시나리오 ID 요청
      const response = await createScenario(scenarioData);
      const { scenario_id } = response;
      console.log("시나리오 ID 생성 성공:", scenario_id);

    // 로딩 페이지로 이동
      navigate(`/loading/${scenario_id}`);
    } catch (error) {
      console.error("시나리오 생성 실패:", error);
      alert("시나리오 생성에 실패했습니다. 다시 시도해주세요.");
    }
  };

  
  return (
    <Background
      onClick={handleBackgroundClick}
      className={animate ? "fade-in" : "fade-out"}
    >
      <PaperWrapper>
        <PaperImage
          src="/images/paper2.png"
          alt="Paper"
          className={`${animate ? "animate" : ""} ${exitAnimate ? "exit" : ""}`}
          onClick={handleStopPropagation}
        />
        <ContentWrapper
          className={showContent ? "visible" : "hidden"}
          onClick={handleStopPropagation}
        >
          <Title>시나리오 생성</Title>
          <Form>
            <FormContent>
              <Row>
                <Label>범행 장소</Label>
                <SelectWrapper>
                  <Dropdown
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                    isSelected={!!location}
                  >
                    <option value="" disabled>
                      범행 장소 선택
                    </option>
                    <option value="미술관">미술관</option>
                    <option value="은행">은행</option>
                    <option value="대학교">대학교</option>
                  </Dropdown>
                  <InputLine />
                </SelectWrapper>
              </Row>
                      <Row>
                        <Label>범행 날짜</Label>
                        <InputWrapper>
                          <DateInputContainer>
                            <Input
                              value={selectedDate}
                              onChange={handleDateChange}
                              maxLength={10}
                            />
                          </DateInputContainer>
                          <InputLine />
                        </InputWrapper>
                      </Row>
                      {/* 시간 입력 필드 추가 */}
                                <Row>
                                  <Label>시간 (시:분)</Label>
                                  <InputWrapper>
                                    <DateInputContainer>
                                      <Input
                                        type="number"
                                        placeholder="시 (0-23)"
                                        value={hour}
                                        onChange={handleHourChange}
                                        min="0"
                                        max="23"
                                      />
                                      <Input
                                        type="number"
                                        placeholder="분 (0-59)"
                                        value={minute}
                                        onChange={handleMinuteChange}
                                        min="0"
                                        max="59"
                                      />
                                    </DateInputContainer>
                                    <InputLine />
                                  </InputWrapper>
                                </Row>
                                <Row>
                          <Label>범행 종류</Label>
                          <SelectWrapper>
                            <Dropdown
                              value={event_type}
                              onChange={(e) => setEvent_type(e.target.value)}
                              onClick={(e) => e.stopPropagation()}
                              isSelected={!!event_type}
                            >
                              <option value="" disabled>
                                범행 종류 선택
                              </option>
                              <option value="살인사건">살인</option>
                              <option value="도난사건">도난</option>
                            </Dropdown>
                            <InputLine />
                          </SelectWrapper>
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
                    </DifficultyOption>
                  ))}
                </DifficultyWrapper>
              </DifficultyRow>
            </FormContent>
          </Form>
          <ButtonWrapper>
            <Button onClick={handleScenarioButtonClick}>
              <ButtonText>사건 진입</ButtonText>
            </Button>
          </ButtonWrapper>
        </ContentWrapper>
      </PaperWrapper>
    </Background>
  );
};

const Background = styled.div`
  position: fixed;
  inset: 0;
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
    url("/images/background.jpg");
  background-size: cover;
  background-position: center;
  cursor: pointer;
  overflow: hidden;
  transition: filter 0.5s ease-in-out;
  display: flex;
  justify-content: center;
  align-items: center;

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
  width: 37vw;
  highlight: auto;
  min-width: 300px;
  max-width: 800px;
  height: auto;
  transition: bottom 1.5s ease-out, transform 1s ease-out;

  &.animate {
    bottom: 50%;
    transform: translate(-50%, 50%);
  }

  &.exit {
    bottom: -150%; 
    transform: translate(-50%, 0);
  }
`;


const ContentWrapper = styled.div`
  font-family: 'THEFACESHOP_INKLIPQUID', sans-serif;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%; 
  max-width: calc(37vw - 5rem); 
  min-width: 260px;
  z-index: 2;
  padding: clamp(1rem, calc(2rem + 1vw), 12rem);
  opacity: 0;
  transition: opacity 1s ease-in-out;
  max-height: 80vh;
  overflow-y: auto;

  @media (min-width: 2200px) {
    padding: clamp(1rem, calc(8rem + 1vw), 12rem);
  }

  @media (max-width: 768px) {
    width: 90%;
    padding: 1rem;
  }

  &.visible {
    opacity: 1;
  }

  &.hidden {
    opacity: 0;
  }

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const Title = styled.h1`
  font-size: clamp(1rem, calc(1rem + 3vw), 9rem);
  font-weight: bold;
  color: black;
  text-align: center;
  margin-bottom: min(4vh, 2rem);
`;

const Form = styled.div`
  width: 100%;
  margin-bottom: 1.5vh;
`;

const FormContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1vw;
  width: 100%;
`;

const Label = styled.label`
  font-size: clamp(0.8rem, calc(0.7rem + 1.2vw), 8rem);
  font-weight: bold;
  color: rgba(0, 0, 0, 0.8);
  width: 30%;
  min-width: 100px;
  text-align: left;
`;

const InputWrapper = styled.div`
  position: relative;
  flex: 1;
`;

const DateInputContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  padding: clamp(0.4rem, 0.8vh, 0.8rem);
  border: none;
  background-color: transparent;
  color: black;
  font-size: clamp(0.8rem, calc(0.6rem + 1vw), 8rem);
  font-family: 'Handlee', cursive;
  
  &::placeholder {
    font-size: clamp(0.2rem, calc(0.2rem + 0.9vw), 3rem);
    color: rgba(0, 0, 0, 0.4);
    font-style: italic;
  }

  &:focus {
    outline: none;
  }
`;

const InputLine = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1px;
  background: linear-gradient(to right, transparent, rgba(0, 0, 0, 0.5), transparent);
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 1px;
    background: black;
    transition: width 0.3s ease, left 0.3s ease;
  }

  ${InputWrapper}:focus-within &::after {
    width: 100%;
    left: 0;
  }
`;

const SelectWrapper = styled(InputWrapper)``;

const Dropdown = styled.select<{ isSelected?: boolean }>`
  width: 100%;
  padding: clamp(0.4rem, 0.8vh, 0.8rem);
  border: none;
  background-color: transparent;
  font-size: clamp(0.8rem, calc(0.6rem + 1vw), 8rem);
  font-family: 'Handlee', cursive;
  cursor: pointer;
  transition: color 0.3s ease;
  color: ${({ isSelected }) => (isSelected ? "black" : "rgba(0, 0, 0, 0.5)")}; 

  &:focus {
    outline: none;
  }

  &:hover,
  &:focus {
    color: black; 
  }

  option {
    background-color: #9e805a; 
    color: black; 
  }
`;

const DifficultyRow = styled(Row)`
  margin-top: 2vh;
`;

const DifficultyLabel = styled(Label)`
  font-size: clamp(0.8rem, calc(0.9rem + 1.4vw), 8rem);
  font-weight: bold;
`;

const DifficultyWrapper = styled.div`
  display: flex;
  gap: 2vw;
  flex: 1;
`;

const DifficultyOption = styled.div<{ isSelected: boolean }>`
  font-size: clamp(1rem, calc(1.2rem + 1.7vw), 12rem);
  font-weight: bold;
  color: ${({ isSelected }) => (isSelected ? "red" : "black")};
  cursor: pointer;
  position: relative;
  padding: clamp(0.3rem, 0.5vh, 0.5rem) clamp(0.5rem, 1vw, 1rem);
  

  &:hover {
    color: red;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 3vh;
`;

const ButtonText = styled.span`
  font-size: clamp(1rem, calc(0.9rem + 1.7vw), 9rem);
  font-weight: bold;
  color: black;
  transition: all 0.3s ease;
`;

const Button = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 1vh 2vw;
  transition: all 0.3s ease;

  &:hover {
    ${ButtonText} {
      color: red;
      transform: scale(1.1);
      display: inline-block;
    }
  }
`;

export default MakeScenarioPage;