// src/pages/NotePage.tsx
import React from "react";
import { useNavigate } from "react-router-dom";

function NotePage() {
  const navigate = useNavigate();

  const closePopup = () => {
    navigate(-1); // 이전 페이지로 이동
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={closePopup} // 배경 클릭 시 팝업 닫기
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
            scrollbar-color:rgb(139, 64, 29) transparent; /* 스크롤바와 트랙 색상 (트랙 투명) */
          }

          textarea::-webkit-scrollbar {
            width: 8px; /* 스크롤바 너비 */
          }

          textarea::-webkit-scrollbar-track {
            background: transparent; /* 스크롤바 트랙 배경 투명 */
          }

          textarea::-webkit-scrollbar-thumb {
            background-color:rgb(139, 64, 29); /* 스크롤바 색상 (더 진한 갈색) */
            border-radius: 4px; /* 스크롤바 모서리 둥글게 */
          }

          textarea::-webkit-scrollbar-thumb:hover {
            background-color: rgb(139, 64, 29); /* 호버 시 색상 (짙은 갈색) */
          }

        `}
      </style>
    </div>
  );
}

export default NotePage;
