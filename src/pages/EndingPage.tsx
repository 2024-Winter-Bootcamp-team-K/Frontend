import React, { useState, useEffect, useRef } from "react";
import "../components/EndingPage.css";

const EndingPage: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [animationSpeed, setAnimationSpeed] = useState(1);
  const animationFrameId = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);

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

  return (
    <div className="ending-page">
      <div className="scroll-container" ref={scrollContainerRef}>
        <div className="credits">
          <p className="title">CASE SOLVED</p>
          <p><br /></p>
          <p className="title2">Play Result</p>
          <p>플레이 시간: 1시간 40분</p>
          <p>조사한 증거: 2개</p>
          <p>조사한 용의자: 3명</p>
          <p>진행한 심문: 24회</p>
          <p><br /></p>
          <p className="title2">Techeer-2024-Winter-BootCamp-Team-K</p>
          <p>박근채 - Team Leader, CTO</p>
          <p>여상윤 - Backend, DevOps</p>
          <p>박수용 - Backend, DevOps</p>
          <p>이수연 - Frontend</p>
          <p>김승민 - Frontend</p>
          <p>박명남 - Frontend</p>
          <p><br /></p>
          <p className="title2">Thanks For</p>
          <p>Andrew Park</p>
          <p>Ryan</p>
          <p>Rena</p>
          <p>Mindy</p>
          <p>Justin</p>
          <p>Sean</p>
          <p>Kate</p>
        </div>
      </div>
    </div>
  );
};

export default EndingPage;
