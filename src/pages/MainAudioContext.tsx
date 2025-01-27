import React, { createContext, useContext, useRef, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

interface AudioContextValue {
  bgmRef: React.MutableRefObject<HTMLAudioElement | null>;
  toggleAudioPlay: () => void;
}

const AudioContext = createContext<AudioContextValue | undefined>(undefined);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const bgmRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const location = useLocation(); // 현재 URL 경로 확인

  useEffect(() => {
    if (!bgmRef.current) {
      bgmRef.current = new Audio("/sounds/mainbgm.mp3");
      bgmRef.current.volume = 0.3;
      bgmRef.current.loop = true;
      bgmRef.current.play();
    }

    // 현재 경로가 "/"일 때만 BGM을 정지
    if (location.pathname === "/" || location.pathname.startsWith("/loading")) {
      if (isPlaying && bgmRef.current) {
        bgmRef.current.pause();
        setIsPlaying(false);
      }
    } else {
      if (!isPlaying && bgmRef.current) {
        bgmRef.current.play().catch((error) => {
          console.error("BGM 재생 오류:", error);
        });
        setIsPlaying(true);
      }
    }
  }, [location.pathname, isPlaying]);

  const toggleAudioPlay = () => {
    if (bgmRef.current) {
      if (isPlaying) {
        bgmRef.current.pause();
      } else {
        bgmRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };


  return (
    <AudioContext.Provider value={{ bgmRef, toggleAudioPlay }}>
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
