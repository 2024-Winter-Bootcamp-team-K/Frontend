import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchScenario, updateScenario } from "../services/apiService";

interface NoteProps {
  onClose: () => void;
}

const NotePage: React.FC<NoteProps> = ({ onClose }) => {
  const [note, setNote] = useState(""); // 노트 내용 상태
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태
  const { scenario_id } = useParams<{ scenario_id: string }>(); // URL에서 시나리오 ID 가져오기


  // 팝업 닫기
  const handleBackgroundClick = () => {
    onClose(); // 팝업 닫기
  };

  // 초기 데이터 로드
  useEffect(() => {
    const loadInitialData = async () => {
      if (!scenario_id) {
        console.error("시나리오 ID가 없습니다.");
        setIsLoading(false);
        return;
      }

      // 로컬 스토리지에서 데이터 복원
      const storedNote = localStorage.getItem(`note_${scenario_id}`);
      if (storedNote) {
        console.log("로컬 스토리지에서 데이터 복원:", storedNote);
        setNote(storedNote);
        setIsLoading(false);
        return;
      }

      // API에서 기존 노트 데이터 가져오기
      try {
        console.log("fetchScenario 호출 시작:", scenario_id);
        const data = await fetchScenario(scenario_id);
        console.log("API 응답 데이터:", data);
        setNote(data.note || ""); // 서버에서 받은 기존 노트 내용 반영
      } catch (error) {
        console.error("시나리오 데이터 불러오기 실패:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialData();
  }, [scenario_id]);

  // 엔터 키를 누를 때만 저장
  const handleKeyPress = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      if (!scenario_id) {
        console.error("시나리오 ID가 없습니다.");
        return;
      }

      try {
        await updateScenario(scenario_id, { note }); // API 호출
        console.log("시나리오 업데이트 성공");

        // 로컬 스토리지에 저장
        localStorage.setItem(`note_${scenario_id}`, note);
      } catch (error) {
        console.error("추리 노트 저장 실패:", error);
      }
    }
  };

  // 로딩 중 상태 표시
  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <h2 className="text-2xl font-bold text-white">로딩 중...</h2>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={handleBackgroundClick}
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
        onClick={(e) => e.stopPropagation()}
      >
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

        <textarea
          className="absolute bg-transparent text-black p-4 resize-none focus:outline-none font-bold"
          style={{
            top: "35%",
            left: "15%",
            width: "70%",
            height: "50%",
            fontFamily: "'THEFACESHOP_INKLIPQUID'",
            fontSize: "1.25rem",
            overflow: "auto",
          }}
          placeholder="추리 내용을 입력하세요."
          value={note}
          onChange={(e) => setNote(e.target.value)} // 입력 상태만 업데이트
          onKeyDown={handleKeyPress} // 엔터를 누를 때만 서버 저장
        ></textarea>
      </div>
    </div>
  );
};

export default NotePage;
