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
          width: "800px", // 이미지 크기와 동일하게 설정
          height: "600px", // 이미지 크기와 동일하게 설정
        }}
        onClick={(e) => e.stopPropagation()} // 팝업 내용 클릭 시 이벤트 전파 막기
      >
        {/* 추리 노트 제목 */}
        <div className="absolute top-[30%] left-[15%] w-[70%] text-center">
          <h2
            className="text-3xl font-bold text-black"
            style={{
              fontFamily: "'THEFACESHOP_INKLIPQUID'", // 폰트 패밀리 설정
              fontSize: "40px", // 텍스트 색상 설정
            }}
          >
            추리 노트
          </h2>
        </div>

        {/* 텍스트 입력 영역 */}
        <textarea
          className="absolute top-[35%] left-[15%] w-[70%] h-[50%] bg-transparent text-black p-4 resize-none focus:outline-none font-bold"
          style={{
            fontFamily: "'THEFACESHOP_INKLIPQUID'", // 폰트 패밀리 설정
            fontSize: "25px", // 텍스트 색상 설정
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
        `}
      </style>
    </div>
  );
}

export default NotePage;
