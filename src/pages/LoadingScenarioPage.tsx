import React, { useState, useEffect } from 'react';

const LoadingScenarioPage: React.FC = () => {
  const [text, setText] = useState('');
  const [progress, setProgress] = useState(0);

  // 출력될 텍스트
  const fullText = `2024년 12월 30일 밤 11시 30분 경,
서울 현대미술관 3층 특별 전시실에서
반 고흐의 "해바라기" 복제화 작품이 도난 되는데,,,

현장을 조사하는 중입니다......`;

  // 타이핑 효과
  useEffect(() => {
    const typeInterval = setInterval(() => {
      if (text.length < fullText.length) {
        setText((prev) => prev + fullText[prev.length]);
      } else {
        clearInterval(typeInterval);
      }
    }, 100); // 딜레이를 100ms로 조정 (기존 50ms에서 변경)

    return () => clearInterval(typeInterval);
  }, [text, fullText]);

  // 로딩 바 진행 효과
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

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-[#181818] text-white">
      {/* 제목 (창 위에 떠 있는 상태) */}
      <h1
        className="font-intelmono absolute top-28 text-xl font-bold text-center"
        style={{ fontSize: '30px' }}
      >
        기밀 사건 파일 #2024-12-30
      </h1>

      {/* 파란색 창 */}
      <div
        className="font-intelmono relative p-6 rounded-lg"
        style={{
          width: '800px',
          height: '400px',
          backgroundColor: '#1E305A',
          boxShadow: 'inset 0px 10px 30px rgba(24, 23, 32, 0.7), inset 0px -10px 30px rgba(0, 0, 0, 0.7)', // Inner shadow 추가
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

      {/* 완료 메시지 (창 아래에 떠 있는 상태) */}
      {progress === 100 && (
        <p
          className="font-intelmono absolute bottom-28 text-center text-white text-lg font-semibold"
          style={{ fontSize: '20px' }}
        >
          현장 조사 데이터 분석이 완료되었습니다.
        </p>
      )}
    </div>
  );
};

export default LoadingScenarioPage;
