import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function NotePage() {
  const navigate = useNavigate();
  const [inputText, setInputText] = useState("");

  const closePopup = () => {
    navigate(-1); // 이전 페이지로 이동
  };

  // 엔터 키를 눌렀을 때 소리 재생
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      const audio = new Audio("/sounds/note.wav"); // Typing.mp3 파일 경로
      audio.play();
    }
  };

  // 텍스트 입력 값 업데이트
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={closePopup} // 배경 클릭 시 팝업 닫기
      style={{
        backgroundImage: "url('/images/hand.jpg')", // 업로드된 배경 이미지 경로
        backgroundSize: "cover",
        backgroundPosition: "center",
      }} 
    >
      <div
        className="relative bg-no-repeat bg-cover"
        style={{
          backgroundImage: "url('images/note.png')",
          bottom: "5vh",
          width: "100vw",
          maxWidth: "800px", // 최대 너비
          height: "100vh",
          maxHeight: "600px", // 최대 높이
        }}
        onClick={(e) => e.stopPropagation()} // 팝업 내용 클릭 시 이벤트 전파 막기
      >
        {/* 추리 노트 제목 */}
        <div
          className="absolute"
          style={{
            top: "30%",
            left: "10%",
            width: "80%",
            textAlign: "center",
          }}
        >
          <h2
            className="text-3xl font-bold text-black"
            style={{
              fontFamily: "'THEFACESHOP_INKLIPQUID'",
              fontSize: "2rem",
            }}
          >
            추리 노트
          </h2>
        </div>

        {/* 텍스트 입력 영역 */}
        <textarea
          className="absolute bg-transparent text-black p-4 resize-none focus:outline-none font-bold"
          style={{
            top: "35%", // 이미지 기준 상단에서 30%
            left: "15%", // 이미지 기준 좌측에서 10%
            width: "70%", // 전체 너비의 80%
            height: "50%", // 전체 높이의 50%
            fontFamily: "'THEFACESHOP_INKLIPQUID'",
            fontSize: "1.25rem",
            overflow: "auto", // 스크롤 활성화
          }}
          placeholder="추리 내용을 입력하세요."
          value={inputText} // 입력된 텍스트 값
          onChange={handleChange} // 텍스트 값 업데이트
          onKeyDown={handleKeyPress} // 엔터 키를 눌렀을 때
        ></textarea>
      </div>

      {/* 추가 CSS */}
      <style>
        {`
          textarea::placeholder {
            color: #666;
          }

          textarea {
            scrollbar-width: thin; /* Firefox */
            scrollbar-color: transparent transparent; /* 스크롤 버튼은 숨기고, 트랙은 투명하게 */
          }

          textarea::-webkit-scrollbar {
            width: 8px; /* 스크롤바 너비 */
            background-color: transparent; /* 배경을 투명하게 설정 */
          }

          textarea::-webkit-scrollbar-track {
            background: transparent; /* 트랙을 투명하게 설정 */
          }

          textarea::-webkit-scrollbar-thumb {
            display: none; /* 스크롤바 버튼(thumb) 숨기기 */
          }
        `}
      </style>
    </div>
  );
}

export default NotePage;
