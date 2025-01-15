import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAudio } from "./MainAudioContext"; // AudioContext 사용

const LoadingScenarioPage: React.FC = () => {
  const [text, setText] = useState('');
  const [progress, setProgress] = useState(0);
  const [isAudioEnabled, setIsAudioEnabled] = useState(false); // 오디오 활성화 상태
  const [isTypingComplete, setIsTypingComplete] = useState(false); // 타이핑 완료 상태
  const navigate = useNavigate();
  const typingSoundRef = useRef<HTMLAudioElement | null>(null);
  const { bgmRef } = useAudio(); // AudioContext에서 bgmRef 가져오기

  useEffect(() => {
    // BGM 일시정지 또는 정지
    if (bgmRef.current) {
      bgmRef.current.pause(); // BGM을 일시정지
    }
  
    // Typing sound 초기화
    typingSoundRef.current = new Audio("/sounds/typing.mp3");
    typingSoundRef.current.volume = 0.5;
  
    return () => {
      if (bgmRef.current) {
        bgmRef.current.pause(); // 페이지를 벗어나도 미 실행
      }
    };
  }, [bgmRef]);
  

  const fullText = `2024년 12월 30일 밤 11시 30분 경,
서울 현대미술관 3층 특별 전시실에서
반 고흐의 "해바라기" 복제화 작품이 도난 되는데,,,

현장을 조사하는 중입니다......`;

  useEffect(() => {
    typingSoundRef.current = new Audio('/sounds/typing.mp3');
    typingSoundRef.current.volume = 0.5; // 볼륨 설정
  }, []);

  const handleAudioPermission = async () => {
    if (typingSoundRef.current) {
      try {
        await typingSoundRef.current.play();
        typingSoundRef.current.pause(); // 재생 후 일시정지
        setIsAudioEnabled(true); // 오디오 활성화
      } catch (error) {
        console.error('오디오 권한 요청 실패:', error);
      }
    }
  };

  useEffect(() => {
    if (!isAudioEnabled) return;

    const typeInterval = setInterval(() => {
      setText((prev) => {
        if (prev.length < fullText.length) {
          // 타이핑 소리 재생
          if (typingSoundRef.current && (typingSoundRef.current.paused || typingSoundRef.current.ended)) {
            typingSoundRef.current.currentTime = 0;
            typingSoundRef.current.play().catch((err) => console.error('타이핑 소리 재생 오류:', err));
          }
          return prev + fullText[prev.length];
        } else {
          clearInterval(typeInterval);
          if (typingSoundRef.current) {
            typingSoundRef.current.pause();
          }
          setIsTypingComplete(true); // 타이핑 완료 상태 설정
          return prev;
        }
      });
    }, 100);

    return () => clearInterval(typeInterval);
  }, [isAudioEnabled, fullText]);

  useEffect(() => {
    if (isTypingComplete) {
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev < 100) return prev + 1;
          clearInterval(progressInterval);
          return 100;
        });
      }, 50);
    }
  }, [isTypingComplete]);

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
        style={{ 
          fontSize: '3vw',
          marginBottom: '4vh',
         }}
        className="font-intelmono text-xl font-bold text-center mb-8"
      >
        기밀 사건 파일 #2024-12-30
      </h1>

      {/* 파란색 창 */}
      <div
        className="font-intelmono relative p-6 rounded-lg w-full max-w-4xl flex flex-col justify-center"
        style={{
          backgroundColor: '#1E305A',
          boxShadow: 'inset 0px 10px 30px rgba(24, 23, 32, 0.7), inset 0px -10px 30px rgba(0, 0, 0, 0.7)',
          width: '70vw',
          height: '52vh',
          padding: '6vh 3vw 6vh 3vw',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* 타이핑 텍스트 */}
        <div className="absolute top-10 left-16 overflow-hidden h-[200px]">
          <p
            className="whitespace-pre-wrap text-sm leading-6 flex items-center"
            style={{ fontSize: '1.3vw', 
                     lineHeight: '1.6', 
                     display: 'inline' }}
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

      {/* 오디오 활성화 버튼 */}
      {!isAudioEnabled && (
        <button
          className="font-intelmono font-semibold mt-8 text-center text-white animated-button glow-effect-inner"
          style={{
            marginTop: '4vh',
            padding: '0.5vh 1vw',
            fontSize: '1.7vw',
          }}
          onClick={handleAudioPermission}
        >
          사건 파일 작성 시작
        </button>
        

      )}

      {/* 진행 중 메시지 */}
      {isAudioEnabled && progress < 100 && (
        <p
          className="font-intelmono mt-8 text-center text-white text-lg font-semibold"
          style={{ fontSize: '20px' }}
        >
          <br></br>
        </p>
      )}

      {/* 완료 메시지 */}
      {progress === 100 && (
        <p
          className="font-intelmono mt-8 text-center text-white text-lg font-semibold"
          style={{ 
            marginTop: '4vh',
            fontSize: '2vw',
           }}
        >
          현장 조사 데이터 분석이 완료되었습니다.
        </p>
      )}

      <style>{`
      .animated-button {
        font-size: 20px;
        padding: 4px 10px;
        border-radius: 8px;
        position: relative;
        animation: pulse 2s infinite;
      }

      .animation-button:hover {
        background-color: rgba(255, 255, 255, 0.2);
      }

      @keyframes pulse {
        0% {
          transform: scale(1);
        }
        50% {
          transform: scale(1.13);
        }
        100% {
          transform: scale(1);
        }
      }
      `}</style>
    </div>
  );
};

export default LoadingScenarioPage;
