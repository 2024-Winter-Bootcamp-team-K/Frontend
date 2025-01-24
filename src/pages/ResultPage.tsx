import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import axiosInstance from  "../hooks/axiosInstance.ts";

interface HistoryResponse {
  scenarios: {
    id: number;
    name: string;
    location: string;
    type: string;
    datetime: string;
    description: string;
    image: string;
    level: number;
    note: string;
    is_success: boolean;
  };
  suspects: Array<{
    id: number;
    name: string;
    gender: boolean;
    age: number;
    job: string;
    description: string;
    is_theif: boolean;
    image: string;
    init_chat: string;
  }>;
  evidences: Array<{
    name: string;
    description: string;
    image: string;
  }>;
}
type Suspect = HistoryResponse['suspects'][0];

// API 서비스 함수
const historyService = {
  getHistory: (scenarioId: number) => 
      axiosInstance.get<HistoryResponse>('/histories', {
          params: { scenario_id: scenarioId }
      })
};

const ResultPage: React.FC = () => {
  const navigate = useNavigate();
  const [thief, setThief] = useState<Suspect | null>(null);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { scenarioId } = useParams<{ scenarioId: string }>();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true); 
        if (!scenarioId || isNaN(Number(scenarioId))) {
          setError("유효하지 않은 시나리오 ID입니다.");
          return;
        }
        
        const response = await historyService.getHistory(Number(scenarioId));
        const realThief = response.data.suspects.find(suspect => suspect.is_theif === true);
        
        if (!realThief) {
          setError("범인 데이터를 찾을 수 없습니다.");
          return;
        }

        setThief(realThief);

      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          const status = err.response?.status;
          setError(
            status === 500
              ? "서버에 에러가 발생하였습니다."
              : status === 502
              ? "서버로부터 잘못된 요청이 전송되었습니다."
              : "범인 데이터를 불러오는 데 실패했습니다."
          );
        } else {
            setError("예기치 못한 에러가 발생했습니다.");
        }
      } finally {
          setLoading(false); // 로딩 종료
      }
    };

    fetchHistory();
  }, [scenarioId]);

  useEffect(() => {
    const stampAudio = new Audio("/sounds/Stamp.mp3");
    stampAudio.volume = 0.5;
    stampAudio.play().catch((error) => console.error("오디오 재생 오류:", error));
    return () => {
      stampAudio.pause();
      stampAudio.currentTime = 0;
    };
  }, []);

  if (isLoading) {
    return (
      <div className="loading-container">
        <p>{/*정보를 불러오는 중...*/}</p>
      </div>
    );
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!history) {
    return <div className="error-message">데이터를 찾을 수 없습니다.</div>;
  }

  if (!thief) {
    return <div className="error-message">데이터를 찾을 수 없습니다.</div>;
  }


  return (
    <div
      className="fixed inset-0 bg-cover bg-center bg-no-repeat flex items-center justify-center"
      style={{
        backgroundImage: 'url("/images/GiveUpPage.png")',
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        backgroundBlendMode: "multiply",
      }}
      onClick={() => navigate(`/ending/${scenarioId}`)}
    >
      <div className="w-full h-full flex items-center justify-center">
        {/* Left Side - Wanted Poster Container */}
        <div className="relative" style={{ marginRight: "15vw" }}>
          {/* 용의자 사진 */}
          <div style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 1,
            width: "11.2vw",
          }}>
            <img
              src={thief.image}
              alt="Suspect"
              style={{
                width: "100%",
                height: "auto",
                objectFit: "contain",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
              }}
            />
          </div>

          {/* Wanted Poster Image */}
          <img
            src="/images/WantedSuspect.png"
            alt="Wanted Suspect"
            style={{
              width: "25vw",
              height: "auto",
              position: "relative",
              zIndex: 2,
            }}
          />

          {/* WANTED Stamp */}
          <img
            src="/images/WANTED.png"
            alt="WANTED Stamp"
            style={{
              position: "absolute",
              top: "0",
              left: "50%",
              transform: "translate(-50%, 100%)",
              width: "17vw",
              height: "auto",
              zIndex: 3,
            }}
          />

          {/* 범인 이름 */}
          <div
            className="absolute w-full text-center"
            style={{
              bottom: "-10%",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            <p
              className="font-Binggrae text-white font-bold drop-shadow-md"
              style={{
                fontSize: "2.5vw",
              }}
            >
              범인 {thief.name}
            </p>
          </div>
        </div>

        {/* Right Side - 범행 동기 내용 */}
        <div
          className="p-4 rounded-lg shadow-md text-white flex items-center justify-center"
          style={{
            width: "40vw",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            border: "1px solid white",
            borderRadius: "6px",
            minHeight: "40vh",
            padding: "2vw",
          }}
        >
          <div
            className="font-Binggrae text-white text-center flex flex-col gap-8 w-full"
            style={{
              fontSize: "1.7vw",
              lineHeight: "1.9",
              wordBreak: "keep-all",
              overflowWrap: "break-word",
            }}
          >
            <p>
              {/* 일단 임의로 넣어둠*/}
              {thief.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;