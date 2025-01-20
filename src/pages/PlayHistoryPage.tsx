import React, { useState, useEffect } from "react";
import LeftPage from "./LeftPage";
import RightPage from "./RightPage";
import { useNavigate} from "react-router-dom";
import axios from "axios";
import axiosInstance from "../hooks/axiosInstance.ts";
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
    //id: number;
    name: string;
    description: string;
    image: string;
  }>;
}

// API 서비스 함수
const historyPageService = {
  getHistory: (scenarioId: number) =>
    axiosInstance.get<HistoryResponse>('/histories', {
        params: { scenario_id: scenarioId }
    })
};

const PlayHistoryPage: React.FC<{ scenarioId?: number }> = ({ scenarioId = 1 }) => {
  const navigate = useNavigate();
  const [history, setHistory] = useState<HistoryResponse[]>([]); 
  const [isLoading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  //const { scenarioId } = useParams<{ scenarioId: string }>();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        const response = await historyPageService.getHistory(scenarioId);

        setHistory([response.data]);
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          const status = err.response?.status;
          setError(
            status === 500
              ? "서버에 에러가 발생하였습니다."
              : status === 502
              ? "서버로부터 잘못된 요청이 전송되었습니다."
              : "시나리오 데이터를 불러오는 데 실패했습니다."
          );
        } else {
              setError("예기치 못한 에러가 발생했습니다.");
        }
      } finally {
          setLoading(false);
      }
    };

    fetchHistory();
  }, [scenarioId]);

  const handleBackgroundClick = () => {
    const audio = new Audio("/sounds/book.mp3");
    audio.play().catch(console.error);
    navigate("/MainPage");
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <p>시나리오 정보를 불러오는 중...</p>
      </div>
    );
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!history) {
    return <div className="error-message">데이터를 찾을 수 없습니다.</div>;
  }

  return (
    <div
      className="relative h-screen w-full bg-cover bg-center"
      style={{ backgroundImage: 'url("/images/background2.jpg")' }}
      onClick={handleBackgroundClick}
    >
      <div
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-md"
        onClick={(e) => e.stopPropagation()}
      />

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-[70%] h-auto">
          <img
            src="/images/PlayHistory.png"
            className="w-full h-auto"
            alt="Play History"
          />
        </div>
      </div>

      <div
        className="absolute top-[20%] left-[10%] w-[40%] h-[70%] sm:top-[10%] sm:left-[15%] sm:w-[38%] md:top-[12%] md:left-[18%] md:w-[35%] lg:top-[17%] lg:left-[15%] lg:w-[40%]"
        onClick={(e) => e.stopPropagation()}
      >
        <LeftPage scenarios={[history[0].scenarios]} />
      </div>

      <div
        className="absolute top-[20%] right-[10%] w-[40%] h-[70%] sm:top-[10%] sm:right-[15%] sm:w-[38%] md:top-[12%] md:right-[18%] md:w-[35%] lg:top-[17%] lg:right-[15%] lg:w-[40%]"
        onClick={(e) => e.stopPropagation()}
      >
        <RightPage suspects={history[0].suspects} evidences={history[0].evidences} />
      </div>
    </div>
  );
};

export default PlayHistoryPage;