import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const LoadingScenarioPage: React.FC = () => {
  const [text, setText] = useState('');
  const [progress, setProgress] = useState(0);
  const [isAudioEnabled, setIsAudioEnabled] = useState(false); // 오디오 활성화 상태
  const navigate = useNavigate();

  const fullText = `2024년 12월 30일 밤 11시 30분 경,
서울 현대미술관 3층 특별 전시실에서
반 고흐의 "해바라기" 복제화 작품이 도난 되는데,,,

현장을 조사하는 중입니다......`;

  const typingSoundRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const initAudio = async () => {
      try {
        typingSoundRef.current = new Audio('/sounds/typing.mp3');
        typingSoundRef.current.volume = 0.5; // 볼륨 설정

        // 오디오 초기화
        await typingSoundRef.current.play().then(() => {
          typingSoundRef.current?.pause(); // 재생 후 일시정지
          setIsAudioEnabled(true); // 오디오 활성화
        });
      } catch (error) {
        console.error('오디오 권한 요청 실패:', error);
        setIsAudioEnabled(false);
      }
    };

    initAudio(); // 오디오 초기화 및 권한 요청
  }, []);

  useEffect(() => {
    if (!isAudioEnabled) return; // 오디오가 활성화되지 않으면 실행하지 않음

    const typeInterval = setInterval(() => {
      setText((prev) => {
        if (prev.length < fullText.length) {
          // 소리 재생 관리
          if (typingSoundRef.current && (typingSoundRef.current.paused || typingSoundRef.current.ended)) {
            typingSoundRef.current.currentTime = 0;
            typingSoundRef.current
              .play()
              .catch((err) => console.error('타이핑 소리 재생 오류:', err));
          }
          return prev + fullText[prev.length];
        } else {
          clearInterval(typeInterval);

          // 타이핑 완료 시 소리 멈춤
          if (typingSoundRef.current) {
            typingSoundRef.current.pause();
          }
          return prev;
        }
      });
    }, 100); // 딜레이를 100ms로 조정

    return () => {
      clearInterval(typeInterval);
      if (typingSoundRef.current) {
        typingSoundRef.current.pause();
      }
    };
  }, [isAudioEnabled, fullText]);

  useEffect(() => {
    if (text.length === fullText.length) {
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev < 100) return prev + 1;
          clearInterval(progressInterval);
          return 100;
        });
      }, 50);
    }
  }, [text]);

  useEffect(() => {
    if (progress === 100) {
      const timeout = setTimeout(() => {
        navigate('/initchat'); // 초기 진술 페이지로 이동
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [progress, navigate]);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-[#181818] text-white">
      {/* 제목 */}
      <h1
        className="font-intelmono text-xl font-bold text-center mb-8"
        style={{ fontSize: '2rem' }}
      >
        기밀 사건 파일 #2024-12-30
      </h1>

      {/* 파란색 창 */}
      <div
        className="font-intelmono relative p-6 rounded-lg w-full max-w-4xl flex flex-col justify-center"
        style={{
          backgroundColor: '#1E305A',
          boxShadow: 'inset 0px 10px 30px rgba(24, 23, 32, 0.7), inset 0px -10px 30px rgba(0, 0, 0, 0.7)',
          width: '1000px',
          height: '400px',
        }}
      >
        {/* 타이핑 텍스트 */}
        <div className="absolute top-10 left-16 overflow-hidden h-[200px]">
          <p
            className="whitespace-pre-wrap text-sm leading-6 flex items-center"
            style={{ fontSize: '20px', lineHeight: '1.6', display: 'inline' }}
          >
            {text}
            <span
              className="w-[10px] h-[20px] bg-white inline-block animate-blink align-baseline ml-1"
              style={{
                visibility: text.length < fullText.length ? 'visible' : 'hidden',
              }}
            ></span>
          </p>
        </div>

        {/* 로딩 바 (고정된 위치) */}
        <div className="absolute bottom-10 left-0 w-full px-16">
          <div className="w-full bg-gray-700 rounded-full h-4">
            <div
              className="bg-white h-4 rounded-full transition-all duration-100"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p
            className="text-right mt-2 text-sm"
            style={{ fontSize: '20px' }}
          >
            데이터 분석 진행률: {progress}%
          </p>
        </div>
      </div>

      {/* 완료 메시지 */}
      {progress === 100 && (
        <p
          className="font-intelmono mt-8 text-center text-white text-lg font-semibold"
          style={{ fontSize: '20px' }}
        >
          현장 조사 데이터 분석이 완료되었습니다.
        </p>
      )}
    </div>
  );
};

export default LoadingScenarioPage;
