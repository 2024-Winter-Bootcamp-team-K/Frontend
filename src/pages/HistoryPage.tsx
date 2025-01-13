//히스토리 페이지
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const HistoryPage = () => {
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
  }, []);

  const handleBackgroundClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
  
    // 클릭된 요소가 `Background`이거나 상위 요소일 경우 처리
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

  const handleIconClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowPopup(true);
    const audio = new Audio("/sounds/book.mp3");
    audio.play();
    setPopupImage("/images/Note2.png"); // 문자열 타입으로 설정
    setPopupText("추리 노트"); // 문자열 타입으로 설정
    setIsNotePopup(true); // boolean 타입으로 설정
  };
  
  

  const handleImageClick = (imageSrc: string, text: string, ...additionalTexts: string[]) => {
    setShowPopup(true);
    setPopupImage(imageSrc);
    const audio = new Audio("/sounds/book.mp3");
    audio.play();
    
    // 기본 텍스트와 추가 텍스트를 결합
    const fullText = [text, ...additionalTexts].join("\n");
    setPopupText(fullText);
    setIsNotePopup(false);
  };
  
  

  const handleClosePopup = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowPopup(false);
    const audio = new Audio("/sounds/book.mp3");
    audio.play();
  };

  const handleNextPageClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const audio = new Audio("/sounds/book.mp3");
    audio.play();
    setTimeout(() => {
      navigate("/NextPage");
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
            <ArrowButtonRight onClick={handleNextPageClick}>&gt;</ArrowButtonRight>
          </HistoryWrapper>
          <IconImage
            src="/images/Icon.png"
            alt="Icon"
            onClick={handleIconClick}
          />
           <Tips>
            Tips: 책 아래를 눌러서 메인 페이지로 돌아갈 수 있습니다
           </Tips>
          {showPopup && (
            <PopupWrapper onClick={handleClosePopup}>
              <Popup onClick={handleStopPropagation} className="Popup">
                {popupImage && <PopupImage src={popupImage} alt="Popup" />}
                <NoteHeader>{popupText.split("\n").map((line, index) => (
                  <p key={index}>{line}</p>
                ))}</NoteHeader>
                {isNotePopup ? (
                  <NoteTextarea
                    value={noteContent}
                    onChange={(e) => setNoteContent(e.target.value)}
                    placeholder="추리 내용을 입력하세요..."
                  />
                ) : (
                  <PopupContent>{popupText.split("\n").map((line, index) => (
                    <p key={index}>{line}</p>
                  ))}</PopupContent>
                )}
              </Popup>
            </PopupWrapper>
          )}
          <CasePlaceImage
            src="/images/Case_place.png"
            alt="Case Place"
            onClick={() =>
              handleImageClick("/images/papyrus.png",
                "미술관 내부 사건 장소", 
                "아주 비싸보이는 미술품들과", 
                "고대의유물들이있다",
                "도둑들이 탐나보이는게 아주 많다")
            }
          />
          <CasePlaceText>
            <strong>Date:</strong> 2024년 12월 30일 밤 11시 30분<br />
            <strong>Location:</strong> 서울 현대 미술관 3층 특별 전시실<br />
            <strong>Type:</strong> 도난 사건 <br />
            <strong>상세:</strong> 반 고흐의 '해바라기' 복제화 작품 도난
          </CasePlaceText>
          <LeftText>미술관 도난 사건</LeftText>
          <RightTextTop>Suspect List</RightTextTop>
          <SuspectImage1
            src="/images/Suspect1.png"
            alt="Suspect 1"
            onClick={() =>
              handleImageClick("/images/papyrus.png", "화가 김민수 - 용의자", "현장에서 목격된 중요한 용의자.")
            }
          />
          <ImageText1>화가 김민수</ImageText1>
          <FailureImage
            src="/images/FAILURE.png"
            alt="Failure"
          />
          <SuccessImage
            src="/images/Success.png"
            alt="Success"
          />
          <WANTEDImage
            src="/images/WANTED.png"
            alt="WANTED"
          />
          <SuspectImage2
            src="/images/Suspect2.png"
            alt="Suspect 2"
            onClick={() =>
              handleImageClick("/images/papyrus.png", "경비원 이지원 - 용의자", "CCTV에서 발견된 의심스러운 행동.")
            }
          />
          <ImageText2>경비원 이지원</ImageText2>
          <EvidenceImage1
            src="/images/Evidence1.png"
            alt="Evidence 1"
            onClick={() =>
              handleImageClick("/images/papyrus.png", "현장에서 발견된 장갑", "용의자의 것으로 추정되는 장갑.")
            }
          />
          <ImageText3>현장에서 발견된 장갑</ImageText3>
          <EvidenceImage2
            src="/images/Evidence2.png"
            alt="Evidence 2"
            onClick={() =>
              handleImageClick("/images/papyrus.png", "보안실 모니터링 시스템 로그", "남성으로 보이는 실루엣이","몇시 몇분경에 찍혀있다.")
            }
          />
          <ImageText4>보안실 시스템 로그</ImageText4>
          <RightTextBottom>Evidence List</RightTextBottom>
        </>
      )}
    </Background>
  );
};

export default HistoryPage;

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
  top: 53%;
  left: 20%;
  width: 28%;
  font-size: 1.7rem;
  color: black;
  background: rgba(0, 0, 0, 0);
  font-family: 'THEFACESHOP_INKLIPQUID', sans-serif;
  padding: 5px 10px;
  border-radius: 10px;
  line-height: 1.5;
  text-align: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.9);
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
  top: 15%;
  left: 20%;
  width: 400px;
  height: auto;
  z-index: 2;
  cursor: pointer;
`;

const SuspectImage1 = styled.img`
  position: absolute;
  top: 24%;
  right: 35%;
  width: 150px;
  height: auto;
  z-index: 3;
  cursor: pointer;
`;
const ImageText1 = styled.div`
  position: absolute;
  top: 46%;
  right: 37%;
  color: black;
  font-family: 'THEFACESHOP_INKLIPQUID', sans-serif;
  font-size: 1.5rem;
  text-align: center;
`;

const SuspectImage2 = styled.img`
  position: absolute;
  top: 24%;
  right: 22%;
  width: 150px;
  height: auto;
  z-index: 3;
  cursor: pointer;
`;

const ImageText2 = styled.div`
  position: absolute;
  top: 46%;
  right: 23%;
  color: black;
  font-family: 'THEFACESHOP_INKLIPQUID', sans-serif;
  font-size: 1.5rem;
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
  top: 0%;
  left: 20%;
  width: 450px;
  height: auto;
  z-index: 3;
  pointer-events: none;
  opacity: 1;
`;

const WANTEDImage = styled.img`
  position: absolute;
  top: 23%;
  right: 33%;
  width: 230px;
  height: auto;
  z-index: 3;
  pointer-events: none;
  opacity: 1;
`;

const IconImage = styled.img`
  position: absolute;
  bottom: 115px;
  left: 640px;
  width: 50px;
  height: 50px;
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
  top: 0; /* 클릭 감지 영역을 화면 전체로 확장 */
  left: 0;
  width: 100vw; /* 화면 전체 너비 */
  height: 100vh; /* 화면 전체 높이 */
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  border-radius: 10px; /* 선택 사항: 팝업에 모서리 둥글기를 추가 */
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
  width: 78%; /* 이미지 너비를 화면의 60%로 설정 */
  height: auto; /* 비율 유지 */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5); /* 기존 그림자 유지 */
  object-fit: contain; /* 이미지가 박스 안에 맞게 표시 */
  border-radius: 0px; /* 선택 사항: 이미지에 둥근 모서리 추가 */
  margin-top: 120px; /* 팝업을 아래로 내림 */
`;

const NoteHeader = styled.div`
  margin-top: -20%;
  position: absolute;
  font-size: 3rem;
  font-weight: bold;
  color: red;
  font-family: 'THEFACESHOP_INKLIPQUID', sans-serif;
  text-align: center;
  z-index: 1;
`;

const NoteTextarea = styled.textarea`
  position: absolute;
  top: 38%; /* 입력창의 상단 위치 (Note2 내부 조정) */
  left: 18%; /* 입력창의 왼쪽 위치 (Note2 내부 조정) */
  width: 60%; /* 입력창의 너비 (Note2 내부 조정) */
  height: 40%; /* 입력창의 높이 (Note2 내부 조정) */
  border: none; /* 테두리 제거 */
  border-radius: 8px;
  padding: 10px;
  font-family: 'THEFACESHOP_INKLIPQUID', sans-serif;
  font-size: 2rem;
  resize: none;
  background: transparent;
  color: #000000;
  outline: none;

    &::placeholder {
    color: black; /* placeholder 텍스트 색상 변경 */
    font-weight: bold; /* 글씨 굵기 조정 */
    font-size: 2rem; /* 글씨 크기 조정 */
  }
`;

const PopupContent = styled.div`
  margin-top: 20px;
  font-size: 1.5rem;
  color: #333;
  text-align: center;
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
  top: 44%;
  left: 27%;
  font-family: 'THEFACESHOP_INKLIPQUID', sans-serif;
  font-size: 3rem;
  color: red;
  font-weight: bold;
`;

const RightTextTop = styled.div`
  position: absolute;
  top: 15%;
  right: 28%;
  font-family: 'THEFACESHOP_INKLIPQUID', sans-serif;
  font-size: 2.5rem;
  font-weight: bold;
`;

const RightTextBottom = styled.div`
  position: absolute;
  top: 50%;
  right: 28%;
  font-family: 'THEFACESHOP_INKLIPQUID', sans-serif;
  font-size: 2.5rem;
  font-weight: bold;
  `;
