import React, { useState, useEffect, useCallback } from "react";
import { updateScenario } from "../services/apiService";
interface NoteProps {
  onClose: () => void;
}


const NotePage: React.FC<NoteProps> = ({ onClose }) => {
  const [note, setNote] = useState(""); // 노트 내용 상태
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scenario_id = localStorage.getItem('currentScenarioId');

  useEffect(() => {
    loadNote();
  }, [scenario_id]);

  const loadNote = () => {
    if (!scenario_id) {
      setError("시나리오 ID를 찾을 수 없습니다.");
      setIsLoading(false);
      return;
    }

    try {
      const storedNote = localStorage.getItem(`note_${scenario_id}`);
      setNote(storedNote || "");
    } catch (error) {
      setError("노트 로딩 중 오류가 발생했습니다.");
      console.error("노트 로딩 오류:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveNote = useCallback(async (newNote: string) => {
    if (!scenario_id || isSaving) return;

    setIsSaving(true);
    setError(null);

    try {
      // 로컬 스토리지 업데이트
      localStorage.setItem(`note_${scenario_id}`, newNote);

      // API 업데이트
      await updateScenario(scenario_id, newNote);
    } catch (error) {
      setError("노트 저장 중 오류가 발생했습니다.");
      console.error('노트 저장 실패:', error);
    } finally {
      setIsSaving(false);
    }
  }, [scenario_id, isSaving]);

  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newNote = e.target.value;
    setNote(newNote);
  };

  const handleClose = async () => {
    if (note !== localStorage.getItem(`note_${scenario_id}`)) {
      await saveNote(note);
    }
    onClose();
  };

  // 디바운스된 저장 로직
  useEffect(() => {
    const timer = setTimeout(() => {
      if (note !== localStorage.getItem(`note_${scenario_id}`)) {
        saveNote(note);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [note, scenario_id, saveNote]);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="text-white">로딩 중...</div>
      </div>
    );
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={handleClose}
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
        <div className="absolute top-[30%] left-[10%] w-[80%] text-center">
          <h2 className="text-3xl font-bold text-black font-[THEFACESHOP_INKLIPQUID]">
            추리 노트
          </h2>
        </div>

        <textarea
          className="absolute bg-transparent text-black p-4 resize-none focus:outline-none font-bold font-[THEFACESHOP_INKLIPQUID] text-xl"
          style={{
            top: "35%",
            left: "15%",
            width: "70%",
            height: "50%",
            overflow: "auto",
          }}
          placeholder="추리 내용을 입력하세요."
          value={note}
          onChange={handleNoteChange}
        />
        
        {isSaving && (
          <div className="absolute bottom-4 right-4 text-gray-600 text-sm">
            저장 중...
          </div>
        )}
      </div>
    </div>
  );
};

export default NotePage;