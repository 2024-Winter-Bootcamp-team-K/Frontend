//넥스트트
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const NextPage = () => {
  const [animate, setAnimate] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [exitAnimate, setExitAnimate] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupImage, setPopupImage] = useState<string | null>(null); // 이미지 URL 또는 null
  const [popupText, setPopupText] = useState<string>(""); // 팝업 텍스트
  const [isNotePopup, setIsNotePopup] = useState<boolean>(false); // Note 팝업 여부
  const [noteContent, setNoteContent] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimate(true);
      setTimeout(() => setShowImage(true), 0);
    }, 0);
    return () => clearTimeout(timer);
  }, [popupText]);

  const handleBackgroundClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;

    if (e.currentTarget === e.target || target.classList.contains("Background")) {
      if (!showPopup && !exitAnimate) {
        setExitAnimate(true);
        const audio = new Audio("/sounds/book.mp3");
        audio.play();
        setTimeout(() => {
          navigate("/MainPage");
        }, 1500);
      }
    }
  };

  const handleStopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

 /* const handleIconClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPopupImage("/images/Note2.png");
    setPopupText("추리 내용을 입력하세요...");
    setIsNotePopup(true);
    setShowPopup(true);
  }; */

  
  const handleIconClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const audio = new Audio("/sounds/book.mp3");
    audio.play();
    setTimeout(() => {
      navigate("/note");
    }, 500);
  };

  const handleImageClick = (imageSrc: string, text: string, ...additionalTexts: string[]) => {
    setPopupImage(imageSrc);
    setPopupText([text, ...additionalTexts].join("\n"));
    setShowPopup(true);
    const audio = new Audio("/sounds/book.mp3");
    audio.play();
  };

  const handleClosePopup = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowPopup(false);
    const audio = new Audio("/sounds/book.mp3");
    audio.play();
  };

  const handlePrevPageClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // 이전 페이지로 이동하는 기능 추가
    const audio = new Audio("/sounds/book.mp3");
    audio.play();
    setTimeout(() => {
      navigate("/HistoryPage"); // 이전 페이지로 이동
    }, 500); // 책 넘기는 효과가 난 후 페이지 이동
  };


  const handleNextPageClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const audio = new Audio("/sounds/book.mp3");
    audio.play();
    setTimeout(() => {
      navigate("/NextPage2");
    }, 500);
  };

  return (
    <Background
      onClick={handleBackgroundClick}
      className={`${animate ? "fade-in" : "fade-out"} ${exitAnimate ? "exit" : ""} Background`}
    >
      {!showImage && <LoadingMessage>LOADING~</LoadingMessage>}
      {showImage && (
        <>
          <HistoryWrapper>
            <HistoryImage
              src="/images/PlayHistory.png"
              alt="PlayHistory"
              onClick={handleStopPropagation}
            />
            <ArrowButtonLeft onClick={handlePrevPageClick}>&lt;</ArrowButtonLeft>
            <ArrowButtonRight onClick={handleNextPageClick}>&gt;</ArrowButtonRight>
          </HistoryWrapper>
          <IconImage src="/images/Icon.png" alt="Icon" onClick={handleIconClick} />
          <Tips>
            Tips: 책 아래를 눌러서 메인 페이지로 돌아갈 수 있습니다
          </Tips>
          {showPopup && (
            <PopupWrapper onClick={handleClosePopup}>
              <Popup onClick={handleStopPropagation}>
                {isNotePopup && (
                  <>
                    <NoteHeader>추리노트</NoteHeader>
                    {popupImage && <PopupImage src={popupImage} alt="Note2 Image" />}
                    <NoteTextarea
                      value={noteContent}
                      onChange={(e) => setNoteContent(e.target.value)}
                      placeholder="추리 내용을 입력하세요..."
                    />
                  </>
                )}

                {!isNotePopup && popupImage && (
                  <>
                    <CheckEvImage src="/images/CheckEv.png" alt="CheckEv Image" />

                    {popupImage === "/images/Suspect1.png" && (
                      <ImageTextWrapper>
                        <Suspect1Image src="/images/Suspect1.png" alt="Suspect 1" />
                        <WANTEDImage2 src="/images/WANTED.png" alt="WANTED" />
                        <PopupContent>
                          <h2>화가 김민수</h2>
                          <p>name: 김민수</p>
                          <p>age: 42세</p>
                          <p>gender: 남성</p>
                          <p>job: 미술관 큐레이터</p>
                          <p>init statement: 그날 밤 사무실에서 전시 준비 중이었음.</p>
                        </PopupContent>

                        <QuestionAnswerWrapper>
                          <QuestionAnswerText>
                            <strong>Q:</strong> 넌 어디서 뭘 했지? <br />
                            <strong>A:</strong> 전 여기서 이걸 했습니다.
                          </QuestionAnswerText>
                          <QuestionAnswerText>
                            <strong>Q:</strong> CCTV에는 너가 이때 미술관에 들어왔어. 맞아? <br />
                            <strong>A:</strong> 맞습니다.
                          </QuestionAnswerText>
                          <QuestionAnswerText>
                            <strong>Q:</strong> 미술관에 들어와서 뭘 했지? <br />
                            <strong>A:</strong> 앞서 말했듯, 사무실에서 다음 전시를 준비하고 있었습니다.
                          </QuestionAnswerText>
                        </QuestionAnswerWrapper>
                      </ImageTextWrapper>
                    )}

                    {popupImage === "/images/Suspect2.png" && (
                      <ImageTextWrapper>
                        <Suspect2Image src="/images/Suspect2.png" alt="Suspect 2" />
                        <PopupContent>
                          <h2>경비원 이지원</h2>
                          <p>name: 이지원</p>
                          <p>age: 35세</p>
                          <p>gender: 여성</p>
                          <p>job: 미술관 경비원</p>
                          <p>init statement: 순찰 중 이상 상황은 없었다고 진술함.</p>
                        </PopupContent>

                        <QuestionAnswerWrapper2>
                          <QuestionAnswerText2>
                            <strong>Q:</strong> 넌 어디서 뭘 했지? <br />
                            <strong>A:</strong> 전 여기서 이걸 했습니다.
                          </QuestionAnswerText2>
                          <QuestionAnswerText2>
                            <strong>Q:</strong> CCTV에는 너가 이때 미술관에 들어왔어. 맞아? <br />
                            <strong>A:</strong> 맞습니다.
                          </QuestionAnswerText2>
                          <QuestionAnswerText2>
                            <strong>Q:</strong> 미술관에 들어와서 뭘 했지? <br />
                            <strong>A:</strong> 앞서 말했듯, 사무실에서 다음 전시를 준비하고 있었습니다.
                          </QuestionAnswerText2>
                        </QuestionAnswerWrapper2>
                      </ImageTextWrapper>
                    )}

                    {popupImage === "/images/Evidence1.png" && (
                      <ImageTextWrapper>
                        <Evidence1Image src="/images/Evidence1.png" alt="Evidence 1" />
                        <PopupContent2>
                          <h2>장갑</h2>
                          <p>미술관 지하 주차장에서 발견된 장갑.</p>
                          <p>검은색 가죽 장갑, 복원 작업실에서 사용하던 제품과 동일.</p>
                          <p>내부에서 김민수의 ID 카드 조각이 발견됨.</p>
                        </PopupContent2>
                      </ImageTextWrapper>
                    )}

                    {popupImage === "/images/Evidence2.png" && (
                      <ImageTextWrapper>
                        <Evidence2Image src="/images/Evidence2.png" alt="Evidence 2" />
                        <PopupContent2>
                          <h2>보안실 로그</h2>
                          <p>보안실 모니터링 로그.</p>
                          <p>남성 실루엣이 특정 시간대에 감지됨.</p>
                        </PopupContent2>
                      </ImageTextWrapper>
                    )}
                  </>
                )}
              </Popup>
            </PopupWrapper>
          )}

          <CasePlaceImage
            src="/images/Case_place.png"
            alt="Case Place"

          />
          <CasePlaceText>
            <TitleText>level: Easy / Attempts: 2</TitleText>
            <DetailText>
              <strong>Date:</strong> 2024.12.30 23:30<br />
              <strong>Location:</strong> 미술관<br />
              <strong>Type:</strong> 도난 사건
            </DetailText>
            <DescriptionText>
              2024년 12월 30일 밤 11시 30분 경,<br />
              서울 현대미술관 3층 특별 전시실에서 반 고흐의<br />
              ’해바라기’ 복제화 작품이 도난 되는데...
            </DescriptionText>
          </CasePlaceText>
          <LeftText>미술관 도난 사건</LeftText>
          <RightTextTop>Suspect List</RightTextTop>
          <SuspectImage1
            src="/images/Suspect1.png"
            alt="Suspect 1"
            onClick={() =>
              handleImageClick("/images/Suspect1.png", "화가 김민수 - 용의자", "현장에서 목격된 중요한 용의자.")
            }
          />
          <ImageText1>화가 김민수</ImageText1>
          <FailureImage src="/images/FAILURE.png" alt="Failure" />
          <SuccessImage src="/images/Success.png" alt="Success" />
          <WANTEDImage src="/images/WANTED.png" alt="WANTED" />
          <SuspectImage2
            src="/images/Suspect2.png"
            alt="Suspect 2"
            onClick={() =>
              handleImageClick("/images/Suspect2.png", "경비원 이지원 - 용의자", "CCTV에서 발견된 의심스러운 행동.")
            }
          />
          <ImageText2>경비원 이지원</ImageText2>
          <EvidenceImage1
            src="/images/Evidence1.png"
            alt="Evidence 1"
            onClick={() =>
              handleImageClick("/images/Evidence1.png", "현장에서 발견된 장갑", "용의자의 것으로 추정되는 장갑.")
            }
          />
          <ImageText3>현장에서 발견된 장갑</ImageText3>
          <EvidenceImage2
            src="/images/Evidence2.png"
            alt="Evidence 2"
            onClick={() =>
              handleImageClick("/images/Evidence2.png", "보안실 모니터링 시스템 로그", "남성으로 보이는 실루엣이", "몇 시 몇 분경에 찍혀있다.")
            }
          />
          <ImageText4>보안실 시스템 로그</ImageText4>
          <RightTextBottom>Evidence List</RightTextBottom>
        </>
      )}
    </Background>
  );
};

export default NextPage;

const QuestionAnswerWrapper = styled.div`
  position: absolute;
  top: 140%; /* 이미지 바로 아래에 위치 */
  left: -7%; /* 왼쪽으로 위치 조정 */
  font-family: 'THEFACESHOP_INKLIPQUID', sans-serif;
  font-size: 1.5rem;
  color: black;
  background-color: rgba(255, 255, 255, 0); /* 텍스트 배경 반투명 */
  padding: 15px;
  border-radius: 8px;
  width: 150%; 
  text-align: left;
  border: 2px solid black; /* 테두리 추가 (검은색, 두께 2px) */
  transform: translateX(-10%); /* 폭을 늘린 만큼 왼쪽으로 이동 */
`;

const QuestionAnswerText = styled.p`
  margin: 5px 0;
`;

const QuestionAnswerWrapper2 = styled.div`
  position: absolute;
  top: 133%; /* 이미지 바로 아래에 위치 */
  left: -23%; /* 오른쪽으로 위치 조정 (left로 설정) */
  font-family: 'THEFACESHOP_INKLIPQUID', sans-serif;
  font-size: 1.5rem;
  color: black;
  background-color: rgba(255, 255, 255, 0); /* 텍스트 배경 반투명 */
  padding: 15px;
  border-radius: 8px;
  width: 150%; /* 너비 설정 */
  text-align: left;
  border: 2px solid black; /* 테두리 추가 (검은색, 두께 2px) */
`;

const QuestionAnswerText2 = styled.p`
  margin: 5px 0;
`;

const ImageTextWrapper = styled.div`
  position: absolute;
  top: 10%; /* 이미지를 팝업 이미지 위에 겹치게 배치 */
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
`;

const PopupContent = styled.div`
  position: absolute; /* 상대 위치 기준 */
  top: 5%; /* 이미지 바로 아래에 텍스트 배치 (필요에 따라 값 조정) */
  left: 90%;
  width: 70%;
  transform: translateX(-50%); /* 가운데 정렬 */
  font-family: 'THEFACESHOP_INKLIPQUID', sans-serif;
  font-size: 1.2rem;
  line-height: 1.4;
  text-align: center;
  color: black;
  padding: 10px;
  margin-top: 10px;
  background-color: rgba(255, 255, 255, 0); /* 배경을 반투명하게 */
  border: none !important; /* 테두리 제거 */
  box-shadow: none !important; /* 그림자 제거 */
  outline: none !important; /* 외곽선 제거 */
`;


const PopupContent2 = styled.div`
  position: absolute; /* 상대 위치 기준 */
  top: 90%; /* 이미지 바로 아래에 텍스트 배치 (필요에 따라 값 조정) */
  left: 50%;
  width: 70%;
  transform: translateX(-50%); /* 가운데 정렬 */
  font-family: 'THEFACESHOP_INKLIPQUID', sans-serif;
  font-size: 1.2rem;
  line-height: 1.4;
  text-align: center;
  color: black;
  padding: 10px;
  margin-top: 10px;
  background-color: rgba(255, 255, 255, 0); /* 배경을 반투명하게 */
  border: none !important; /* 테두리 제거 */
  box-shadow: none !important; /* 그림자 제거 */
  outline: none !important; /* 외곽선 제거 */

  h2 {
    font-weight: 800; /* h2만 더 진하게 설정 */
    margin-bottom: 15px; /* h2와 p 사이 간격 추가 */
  }

  p {
  font-weight: 400;
    margin-top: 25px; /* p 위쪽에 간격 추가 */
  }
`;



const CheckEvImage = styled.img`
  width: 70%;
  height: auto;
  margin: 20px auto;
  display: block;
  border: 2px solid black;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
`;


const Suspect1Image = styled.img`
  float: left; /* 왼쪽으로 띄우기 */
  width: 50%;
  height: auto;
  margin: 10px 0;
  display: block;
  border-radius: 8px;
`;

const Suspect2Image = styled.img`
  float: left; /* 왼쪽으로 띄우기 */
  width: 50%;
  height: auto;
  margin: 10px 0;
  display: block;
  border-radius: 8px;
`;

const Evidence1Image = styled.img`
  width: 80%;
  height: auto;
  margin: 10px auto;
  display: block;
  border-radius: 8px;
`;

const Evidence2Image = styled.img`
  width: 80%;
  height: auto;
  margin: 10px auto;
  display: block;
  border-radius: 8px;
`;


const Background = styled.div`
  position: fixed;
  inset: 0; /* 화면 전체를 덮도록 설정 */
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
  &.exit {
    filter: blur(10px);
    opacity: 0;
    transition: filter 1.5s ease-in-out, opacity 1.5s ease-in-out;
  }
  height: 100%; /* 화면 전체 높이 */
  width: 100%; /* 화면 전체 너비 */
`;


const LoadingMessage = styled.div`
  font-size: 1.5rem;
  color: white;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const CasePlaceText = styled.div`
  position: absolute;
  top: 66%; /* 화면 중앙 */
  left: 34%;
  transform: translate(-50%, -50%);
  width: 90%; 
  font-family: 'THEFACESHOP_INKLIPQUID', sans-serif;
  color: black;
  background: transparent;
  text-align: center;
`;

const TitleText = styled.div`
  margin-top: -50px; /* 위로 올리기 */
  font-size: 1.3rem; /* 폰트 크기 줄임 */
  font-weight: 400;
`;

const DetailText = styled.div`
  margin-top: 15px; /* 위로 올리기 */
  font-size: 1rem; /* 폰트 크기 줄임 */
  margin-bottom: 15px;
  
  font-weight: 400;
`;

const DescriptionText = styled.div`
  font-size: 1.2rem; /* 설명 텍스트 폰트 크기 */
  line-height: 1.4; /* 줄 간격을 작게 */
  font-weight: 800;
  margin-bottom: -55px;
`;



const HistoryWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HistoryImage = styled.img`
  width: 70%;
  margin-top: 70px;
  height: auto;
  max-width: 1200px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
  cursor: default;
`;

const CasePlaceImage = styled.img`
  position: absolute;
  top: 17%;
  left: 22.5%;
  width: 330px;
  height: auto;
  z-index: 2;
  cursor: pointer;
`;

const SuspectImage1 = styled.img`
  position: absolute;
  top: 24%;
  right: 36%;
  width: 130px;
  height: auto;
  z-index: 3;
  cursor: pointer;
`;
const ImageText1 = styled.div`
  position: absolute;
  top: 44%;
  right: 37%;
  color: black;
  font-family: 'THEFACESHOP_INKLIPQUID', sans-serif;
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
`;

const SuspectImage2 = styled.img`
  position: absolute;
  top: 24%;
  right: 21%;
  width: 130px;
  height: auto;
  z-index: 3;
  cursor: pointer;
`;

const ImageText2 = styled.div`
  position: absolute;
  top: 44%;
  right: 23%;
  color: black;
  font-family: 'THEFACESHOP_INKLIPQUID', sans-serif;
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
`;

const EvidenceImage1 = styled.img`
  position: absolute;
  top: 56%;
  right: 35%;
  width: 160px;
  height: auto;
  z-index: 3;
  cursor: pointer;
`;

const ImageText3 = styled.div`
  position: absolute;
  top: 77%;
  right: 35%;
  color: black;
  font-family: 'THEFACESHOP_INKLIPQUID', sans-serif;
  font-size: 1.5rem;
  text-align: center;
`;

const EvidenceImage2 = styled.img`
  position: absolute;
  top: 56%;
  right: 20%;
  width: 160px;
  height: auto;
  z-index: 3;
  cursor: pointer;
`;

const ImageText4 = styled.div`
  position: absolute;
  top: 77%;
  right: 20%;
  color: black;
  font-family: 'THEFACESHOP_INKLIPQUID', sans-serif;
  font-size: 1.5rem;
  text-align: center;
`;

const FailureImage = styled.img`
  position: absolute;
  top: 15%;
  left: 20%;
  width: 400px;
  height: auto;
  z-index: 3;
  pointer-events: none;
  opacity: 0;
`;

const SuccessImage = styled.img`
  position: absolute;
  top: 2%;
  left: 20%;
  width: 410px;
  height: auto;
  z-index: 3;
  pointer-events: none;
  opacity: 1;
`;

const WANTEDImage = styled.img`
  position: absolute;
  top: 23%;
  right: 32%;
  width: 230px;
  height: auto;
  z-index: 3;
  pointer-events: none;
  opacity: 1;
`;

const WANTEDImage2 = styled.img`
  position: absolute;
  top: 8%;
  right: 37%;
  width: 250px;
  height: auto;
  z-index: 3;
  pointer-events: none;
  opacity: 1;
`;


const IconImage = styled.img`
  position: absolute;
  bottom: 115px;
  left: 670px;
  width: 28px;
  height: auto;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
  }
`;

const Tips = styled.div`
  position: absolute;
  top: 90%; /* 텍스트 위치 */
  left: 50%; /* 화면 중앙 */
  transform: translate(-50%, -50%); /* 중앙 정렬 */
  background-color: rgba(0, 0, 0, 0.7); /* 반투명 배경 */
  color: white; /* 텍스트 색상 */
  padding: 10px 20px; /* 내부 여백 */
  border-radius: 8px; /* 모서리 둥글게 */
  font-size: 1.2rem; /* 텍스트 크기 */
  font-weight: bold; /* 텍스트 굵게 */
  animation: float 3s infinite ease-in-out; /* 둥둥 떠다니는 애니메이션 */

  @keyframes float {
    0%, 100% {
      transform: translate(-50%, -50%) translateY(0); /* 원래 위치 */
    }
    50% {
      transform: translate(-50%, -50%) translateY(-10px); /* 위로 이동 */
    }
  }
`;


const PopupWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw; /* 화면 전체 너비 */
  height: 100vh; /* 화면 전체 높이 */
  background: rgba(0, 0, 0, 0.5); /* 배경 어둡게 */
  display: flex;
  justify-content: center;
  align-items: center; /* 중앙 정렬 */
  overflow: hidden; /* 크기 초과 시 숨김 */
  z-index: 9999;
`;


const Popup = styled.div`
  position: relative;
  width: 60%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;


const PopupImage = styled.img`
  width: 120%; /* 이미지 너비를 팝업 너비의 90%로 설정 */
  height: auto; /* 이미지 비율 유지 */
  max-height: 95%; /* 최대 높이 제한 */
  object-fit: contain; /* 비율 유지하며 화면에 맞춤 */
  margin: 0 auto; /* 가운데 정렬 */
  display: block; /* 블록 요소로 설정 */
`;


const NoteHeader = styled.div`
  margin-top: -40%;
  position: absolute;
  font-size: 3.5rem; /* 타이틀 크기 조정 */
  font-weight: bold;
  color: black;
  font-family: 'THEFACESHOP_INKLIPQUID', sans-serif;
  text-align: center;
  z-index: 1;
`;

const NoteTextarea = styled.textarea`
  position: absolute;
  top: 25%; /* 입력창 상단 위치 */
  left: 10%; /* 입력창 왼쪽 위치 */
  width: 80%; /* 입력창 너비 확대 */
  height: 50%; /* 입력창 높이 확대 */
  border: none;
  border-radius: 12px; /* 둥근 모서리 */
  padding: 15px; /* 내부 여백 */
  font-family: 'THEFACESHOP_INKLIPQUID', sans-serif;
  font-size: 2.5rem; /* 입력 텍스트 크기 확대 */
  resize: none;
  background: transparent; /* 배경 투명 */
  color: #000000;
  outline: none;

  &::placeholder {
    color: black;
    font-weight: bold;
    font-size: 2.5rem; /* placeholder 크기 확대 */
  }
`;

const ArrowButtonLeft = styled.button`
  position: absolute;
  top: 48%;
  left: 20%;
  transform: translateX(-100%);
  font-size: 3rem;
  background: none;
  border: none;
  color: black;
  cursor: pointer;
  z-index: 3;

  &:hover {
    color: red;
  }
`;

const ArrowButtonRight = styled.button`
  position: absolute;
  top: 48%;
  right: 20%;
  transform: translateX(100%);
  font-size: 3rem;
  background: none;
  border: none;
  color: black;
  cursor: pointer;
  z-index: 3;
  &:hover {
    color: red;
  }
`;

const LeftText = styled.div`
  position: absolute;
  top: 42%;
  left: 27%;
  font-family: 'THEFACESHOP_INKLIPQUID', sans-serif;
  font-size: 2.4rem;
  color: black;
  font-weight: bold;
`;

const RightTextTop = styled.div`
  position: absolute;
  top: 15%;
  right: 28%;
  font-family: 'THEFACESHOP_INKLIPQUID', sans-serif;
  font-size: 2.5rem;
  font-weight: 500;
`;

const RightTextBottom = styled.div`
  position: absolute;
  top: 50%;
  right: 28%;
  font-family: 'THEFACESHOP_INKLIPQUID', sans-serif;
  font-size: 2.5rem;
  font-weight: 500;
  `;
