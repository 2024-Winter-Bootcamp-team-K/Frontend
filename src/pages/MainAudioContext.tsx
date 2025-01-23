import React, { createContext, useContext, useState, useEffect } from "react";

interface AudioContextType {
  isMuted: boolean;
  toggleMute: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC = ({ children }) => {
  const [isMuted, setIsMuted] = useState(false);

  // 배경음악 관리
  const bgm = new Audio("/sounds/mainbgm.mp3");

  useEffect(() => {
    bgm.loop = true; // 배경음악 반복 재생
    bgm.volume = isMuted ? 0 : 1; // 음소거 상태에 따라 볼륨 설정
    if (!isMuted) {
      bgm.play().catch((err) => console.error("Error playing bgm:", err));
    } else {
      bgm.pause();
    }

    return () => {
      bgm.pause(); // 컴포넌트 언마운트 시 음악 중지
    };
  }, [isMuted]);

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  return (
    <AudioContext.Provider value={{ isMuted, toggleMute }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
};
