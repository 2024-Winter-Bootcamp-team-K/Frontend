import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAudio } from "./MainAudioContext"; // AudioContext 사용
import { createEvidence, createSuspect } from "../services/apiService"; // API 서비스 가져오기

interface ScenarioData {
  user_id: '1'
  year: string,
  month: string,
  day: string,
  hour: string,
  minute: string,
  datetime: string,
  location: string;
  description: string;
  type: string;
}

const LoadingScenarioPage: React.FC = () => {
  const [scenarioData, setScenarioData] = useState<ScenarioData | null>(null); // 시나리오 데이터 상태
  const [text, setText] = useState('');
  const [progress, setProgress] = useState(0);
  const [isAudioEnabled, setIsAudioEnabled] = useState(false); // 오디오 활성화 상태
  const [isTypingComplete, setIsTypingComplete] = useState(false); // 타이핑 완료 상태
  const navigate = useNavigate();
  const typingSoundRef = useRef<HTMLAudioElement | null>(null);
  const { bgmRef } = useAudio(); // AudioContext에서 bgmRef 가져오기
  const { scenario_id } = useParams<{ scenario_id: string }>();
  const [fullText, setFullText] = useState<string>('');
  const [isAPILoading, setIsAPILoading] = useState(false); // API 로딩 상태
  const [progressMessage, setProgressMessage] = useState<string>(''); // 진행 중 메시지 상태

  useEffect(() => {
    const fetchScenario = async () => {
      try {
        const response = await fetch(`/api/v1/scenarios/${scenario_id}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch scenario: ${response.statusText}`);
        }
        const data = await response.json();
  
        console.log("받아온 시나리오 데이터:", data);

        if (data.scenarios && data.scenarios.length > 0) {
          // `scenarios` 배열에서 첫 번째 항목 가져오기
          const scenario = data.scenarios[0]; // 선언 후 사용
    
          // datetime을 분리하여 새로운 객체 생성
          const [date, time] = scenario.datetime.split(' '); // "2222-22-22"와 "12:32"로 분리
          const [year, month, day] = date.split('-'); // "2222", "22", "22"로 분리
          const [hour, minute] = time.split(':'); // "12", "32"로 분리
    
          // 필요한 데이터로 재구성
          const formattedScenario = {
            ...scenario,
            year,
            month,
            day,
            hour,
            minute,
          };
    
          setScenarioData(formattedScenario); // 상태 업데이트
        } else {
          console.error("No scenarios available in the response.");
        }
      } catch (error) {
        console.error("Failed to load scenario data:", error);
      }
    };
  
    if (scenario_id) {
      fetchScenario();
    }
  }, [scenario_id]);
  
  
  useEffect(() => {
    if (scenarioData) {
      console.log("Setting full text with scenarioData:", scenarioData);
      setFullText(`${scenarioData.year}년 ${scenarioData.month}월 ${scenarioData.day}일 ${scenarioData.hour}시 ${scenarioData.minute}분 경,
${scenarioData.location}에서 ${scenarioData.type} 사건이 발생하였는데,,,

사건을 불러오는 중 입니다...
`);
    }
  }, [scenarioData]);

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

  const handleAPICalls = async () => {
    if (!scenario_id) {
      console.error('Scenario ID가 없습니다.');
      return;
    }
  
    setIsAPILoading(true);
    try {
      setProgressMessage('시나리오를 불러오는 중...');
      await new Promise<void>((resolve) => setTimeout(resolve, 1000)); // 시나리오 불러오는 중 대기 (예제: 1초)

      const increaseProgress = (targetProgress: number, callback?: () => void, message?: string) => {
        setProgressMessage(message || ''); // 진행 중 메시지 업데이트
        const interval = setInterval(() => {
          setProgress((prevProgress) => {
            if (prevProgress < targetProgress) {
              return prevProgress + 1; // 1씩 증가
            } else {
              clearInterval(interval); // 목표치 도달 시 종료
              if (callback) callback(); // 콜백 호출
              return prevProgress;
            }
          });
        }, 500); // 진행 속도 조절 (ms 단위)
      };
  
      // Evidence 생성
      const evidenceResponse = await createEvidence(Number(scenario_id));
      if (evidenceResponse) {
        console.log("Evidence 생성 완료, Scenario ID:", scenario_id);
        await new Promise<void>((resolve) => increaseProgress(50, resolve, '증거 불러오는 중...'));
      } else {
        console.error("Evidence 생성 실패");
        return;
      }
  
      // Suspect 생성
      const suspectResponse = await createSuspect(Number(scenario_id));
      if (suspectResponse) {
        console.log("Suspect 생성 완료, Scenario ID:", scenario_id);
        await new Promise<void>((resolve) => increaseProgress(100, resolve, '용의자 불러오는 중...'));
      } else {
        console.error("Suspect 생성 실패");
        return;
      }
    } catch (error) {
      console.error('API 호출 중 오류 발생:', error);
    } finally {
      setProgressMessage('사건을 정리하는 중...');
      setIsAPILoading(false);
    }
  };
  

  useEffect(() => {
    if (!isAudioEnabled || !scenarioData) return;

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
    if (progress === 100) {
      const timeout = setTimeout(() => {
        navigate(`/initchat/${scenario_id}`); // 백틱을 사용하여 변수 삽입
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
        기밀 사건 파일 #{scenario_id}
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
          onClick={() => {
            handleAudioPermission();
            handleAPICalls(); // API 호출 추가
          }}
          
        >
          사건 파일 작성 시작
        </button>
        

      )}

      {/* 진행 중 메시지 */}
      {isAudioEnabled && progress < 100 && (
        <p
          className="font-intelmono mt-8 text-center text-white text-lg font-semibold"
          style={{ 
            marginTop: '4vh',
            fontSize: '1.7vw', 
          }}
        >
            {progressMessage}
        </p>
      )}

      {/* 완료 메시지 */}
      {progress === 100 && (
        <p
          className="font-intelmono mt-8 text-center text-white text-lg font-semibold"
          style={{ 
            marginTop: '4vh',
            fontSize: '1.7vw',
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
