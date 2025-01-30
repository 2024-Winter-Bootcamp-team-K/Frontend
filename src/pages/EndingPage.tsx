import React, { useState, useEffect, useRef } from "react";
import "../components/EndingPage.css";
import { useNavigate } from "react-router-dom";
import { useUser } from '../hooks/UserContext';
import {useParams} from "react-router-dom";
import axiosInstance from "../hooks/axiosInstance";

const EndingPage: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [animationSpeed, setAnimationSpeed] = useState(1);
  const animationFrameId = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const {scenarioId} = useParams<{scenarioId: string}>();
  const navigate = useNavigate();
  const { userId } = useUser();
  const [interrogationsCount, setInterrogationsCount] = useState(0);

  useEffect(() => {
    const storedCount = parseInt(localStorage.getItem("interrogationsCount") || "0", 10);
    setInterrogationsCount(storedCount);
  }, []);

  const [historyData, setHistoryData] = useState<{
    playTime: string;
    suspectsCount: number;
    evidencesCount: number;
    interrogationsCount: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [playTime, setPlayTime] = useState<string>("");

  useEffect(() => {
    const fetchHistoryData = async () => {
      try {
        setLoading(true);
        setError(null);

        if (!scenarioId) {
          setError("유효하지 않은 시나리오 ID입니다.");
          return;
        }

        const response = await axiosInstance.get(`/histories`, {
          params: { scenario_id: scenarioId},
        });

        console.log("백엔드 응답 데이터:", response.data);

        const {scenarios, suspects, evidences} = response.data;

        if (scenarios?.created_at) {
          const now = new Date();
          const startTime = new Date(scenarios.created_at);

          const elapsedMilliseconds = now.getTime() - startTime.getTime();

          const hours = Math.floor(elapsedMilliseconds / (1000 * 60 * 60));
          const minutes = Math.floor(
            (elapsedMilliseconds % (1000 * 60 * 60)) / (1000 * 60)
          );
          const seconds = Math.floor((elapsedMilliseconds % (1000 * 60)) / 1000);

          const formattedPlayTime = `${hours}시간 ${minutes}분 ${seconds}초`;
          setPlayTime(formattedPlayTime);
        }

        setHistoryData({
          playTime: scenarios.play_time || "데이터 없음",
          suspectsCount: Array.isArray(suspects) ? suspects.length : 0,
          evidencesCount: Array.isArray(evidences) ? evidences.length : 0,
          interrogationsCount: 0,
        });
      } catch {
        setError("데이터를 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchHistoryData();
  }, [scenarioId]);

  useEffect(() => {
      // 페이지 로드 시 오디오 재생
      const SuccessAudio = new Audio('/sounds/Ending.mp3');
      SuccessAudio.volume = 0.5; // 볼륨 설정
      SuccessAudio.play().catch((error) => {
        console.error("오디오 재생 오류:", error);
      });
      // 페이지 로드가 끝나면 오디오 멈추기
      return () => {
        SuccessAudio.pause(); // 오디오 일시정지
        SuccessAudio.currentTime = 0; // 재생 위치 초기화
      };
    }, []); // 빈 배열로 한 번만 실행

  const animate = (currentTime: number) => {
    if (!lastTimeRef.current) lastTimeRef.current = currentTime;
    const deltaTime = (currentTime - lastTimeRef.current) / 1000;
    lastTimeRef.current = currentTime;

    setProgress((prev) => {
      const newProgress = prev + deltaTime * animationSpeed * 5;
      if (newProgress >= 70) {
        cancelAnimationFrame(animationFrameId.current!);
        return 70;
      }
      return newProgress;
    });

    animationFrameId.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    animationFrameId.current = requestAnimationFrame(animate);
    return () => {
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    };
  }, [animationSpeed]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Enter") {
        setAnimationSpeed(2);
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.code === "Enter") {
        setAnimationSpeed(1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.style.transform = `translateY(-${progress}%)`;
    }
  }, [progress]);

  const handleReturnToMain = () => {
    navigate(`/MainPage/${userId}`); // 메인 페이지로 이동
  };

  if (loading) return null;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="ending-page">
      <div className="scroll-container" ref={scrollContainerRef}>
        <div className="credits">
          <p className="title">Ending Credits</p>
          <p><br /></p>
          <p className="title2">Play Result</p>
          <p>플레이 시간: 10분 32초</p>
          <p>조사한 증거: {historyData?.evidencesCount}개</p>
          <p>조사한 용의자: {historyData?.suspectsCount}명</p>
          <p>진행한 심문: {interrogationsCount}회</p>
          <p><br /></p>
          <p className="title2">&nbsp;&nbsp;&nbsp;&nbsp;Techeer-2024-Winter-BootCamp-Team-K</p>
          <p>박근채 - Team Leader, Full Stack, DevOps</p>
          <p>여상윤 - Backend, DevOps</p>
          <p>박수용 - Backend, DevOps</p>
          <p>이수연 - Frontend</p>
          <p>김승민 - Frontend</p>
          <p>박명남 - Frontend</p>
          <p><br /></p>
          <p className="title2">Thanks For</p>
          <p>Andrew Park</p>
          <p>Ryan</p>
          <p>Lena</p>
          <p>Mindy</p>
          <p>Justin</p>
          <p>Sean</p>
          <p>Kate</p>
        </div>
      </div>
      <button
        className="return-button font-Binggrae"
        onClick={handleReturnToMain}
        style={{
          position: "absolute",
          top: "21px",
          right: "-4.6%",
          transform: "translateX(-50%)",
          padding: "5px 10px",
          fontSize: "1.4vw",
          color: "#FFFFFF",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        메인으로 돌아가기
      </button>
    </div>
  );
};

export default EndingPage;
