import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { updateScenario } from "../services/apiService";

interface NoteProps {
  onClose?: () => void; // onClose가 없어도 에러가 발생하지 않도록 옵셔널로 만듦
}

const NotePage: React.FC<NoteProps> = ({ onClose }) => {
  const [inputText, setInputText] = useState("");
  const [note, setNote] = useState("");
  const navigate = useNavigate();
  const { scenario_id } = useParams<{ scenario_id: string }>();

  

  const handleSubmit = async () => {
    if (!scenario_id) {
      alert("시나리오 ID가 없습니다.");
      return;
    }

    try {
      const response = await updateScenario(scenario_id, { note });
      console.log("시나리오 업데이트 성공:", response);
      alert("추리 노트가 성공적으로 저장되었습니다.");
      navigate("/someNextPage"); // 저장 후 이동할 페이지 경로
    } catch (error) {
      console.error("추리 노트 저장 실패:", error);
      alert("추리 노트 저장에 실패했습니다. 다시 시도해주세요.");
    }
  };

  // 엔터 키를 눌렀을 때 소리 재생
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      const audio = new Audio("/sounds/note.wav"); // Typing.mp3 파일 경로
      audio.play();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose} // 배경 클릭 시 팝업 닫기
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
  
        {/* 새로 추가된 영역: 텍스트 저장 */}
        <div
          className="absolute"
          style={{
            bottom: "10%",
            left: "10%",
            width: "80%",
            textAlign: "center",
          }}
        >
          <h1>추리 노트 작성하기</h1>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="추리 노트를 입력하세요."
            style={{
              width: "70%",
              height: "50px",
              marginBottom: "10px",
              resize: "none",
              padding: "10px",
            }}
          />
          <button
            onClick={handleSubmit}
            style={{
              padding: "10px 20px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            저장
          </button>
        </div>
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
  );}
  
  export default NotePage;