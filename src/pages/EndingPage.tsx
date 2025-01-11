import React, { useState, useEffect, useRef } from "react";
import "../components/EndingPage.css";

const EndingPage: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null); // 스크롤 컨테이너 참조
  const [progress, setProgress] = useState(0); // 진행 상태 (% 단위)
  const [animationSpeed, setAnimationSpeed] = useState(1); // 애니메이션 속도 상태
  const animationFrameId = useRef<number | null>(null); // 애니메이션 프레임 ID
  const lastTimeRef = useRef<number | null>(null); // 마지막 업데이트 시간

  // 애니메이션 루프
  const animate = (currentTime: number) => {
    if (!lastTimeRef.current) lastTimeRef.current = currentTime; // 첫 프레임 초기화
    const deltaTime = (currentTime - lastTimeRef.current) / 1000; // 초 단위 경과 시간
    lastTimeRef.current = currentTime;

    setProgress((prev) => {
      const newProgress = prev + deltaTime * animationSpeed * 5; // 속도 반영
      if (newProgress >= 70) {
        cancelAnimationFrame(animationFrameId.current!); // 완료 시 애니메이션 중단
        return 70; // 최대값 제한
      }
      return newProgress;
    });

    animationFrameId.current = requestAnimationFrame(animate); // 다음 프레임 요청
  };

  useEffect(() => {
    animationFrameId.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current); // 클린업
    };
  }, [animationSpeed]); // 속도 변경 시 다시 설정

  // Enter 키 이벤트 처리
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Enter") {
        setAnimationSpeed(2); // 속도를 2배로 설정
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.code === "Enter") {
        setAnimationSpeed(1); // 기본 속도로 복원
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  // 진행 상태에 따라 컨테이너 위치 업데이트
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
          <p className="subtitle">Play Result</p>
          <p>플레이 시간: 1시간 40분</p>
          <p>조사한 증거: 2개</p>
          <p>조사한 용의자: 3명</p>
          <p>진행한 심문: 24회</p>
          <p><br /></p>
          <p className="subtitle">Techeer-2024-Winter-BootCamp-Team-K</p>
          <p>박근채 - Team Leader, CTO</p>
          <p>여상윤 - Backend, DevOps</p>
          <p>박수용 - Backend, DevOps</p>
          <p>이수연 - Frontend</p>
          <p>김승민 - Frontend</p>
          <p>박명남 - Frontend</p>
          <p><br /></p>
          <p className="subtitle">Thanks For</p>
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
