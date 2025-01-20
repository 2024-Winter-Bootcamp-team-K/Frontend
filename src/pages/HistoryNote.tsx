import React from "react";

interface HistoryNoteProps {
  onClose: () => void; // 부모에서 닫기 동작을 제어할 수 있도록 prop으로 받음
  note: string;
}

const HistoryNote: React.FC<HistoryNoteProps> = ({ onClose, note }) => {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose} // 배경 클릭 시 팝업 닫기
    >
      <div
        className="relative bg-no-repeat bg-cover"
        style={{
          backgroundImage: "url('/images/note.png')",
          bottom: "5vh",
          width: "100vw",
          maxWidth: "800px",
          height: "100vh",
          maxHeight: "600px",
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
        <p className="absolute bg-transparent text-black p-4 resize-none focus:outline-none font-bold"
          style={{
            top: "35%", // 이미지 기준 상단에서 30%
            left: "15%", // 이미지 기준 좌측에서 10%
            width: "70%", // 전체 너비의 80%
            height: "50%", // 전체 높이의 50%
            fontFamily: "'THEFACESHOP_INKLIPQUID'",
            fontSize: "1.75rem",
            overflow: "auto", // 스크롤 활성화
          }}>
            {note}
        </p>
      </div>

      {/* 추가 CSS */}
      <style>
        {`
          p {
            scrollbar-width: thin; /* Firefox */
            scrollbar-color: transparent transparent; /* 스크롤 버튼은 숨기고, 트랙은 투명하게 */
          }

          p::-webkit-scrollbar {
            width: 8px; /* 스크롤바 너비 */
            background-color: transparent; /* 배경을 투명하게 설정 */
          }

          p::-webkit-scrollbar-track {
            background: transparent; /* 트랙을 투명하게 설정 */
          }

          p::-webkit-scrollbar-thumb {
            display: none; /* 스크롤바 버튼(thumb) 숨기기 */
          }
        `}
      </style>
    </div>
  );
};

export default HistoryNote;
