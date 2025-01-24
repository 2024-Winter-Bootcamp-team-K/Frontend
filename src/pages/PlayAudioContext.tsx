import React, { createContext, useContext, useRef, useEffect, useState } from "react";

interface PlayAudioContextValue {
  bgmRef: React.MutableRefObject<HTMLAudioElement | null>;
  toggleAudioPlay: () => void;
}

const PlayAudioContext = createContext<PlayAudioContextValue | undefined>(undefined);

export const PlayAudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const bgmRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!bgmRef.current) {
      bgmRef.current = new Audio("/sounds/PlayAudio.mp3");
      bgmRef.current.volume = 0.3;
      bgmRef.current.loop = true;
      bgmRef.current.play();
    }

    return () => {
      // Cleanup은 하지 않음, 다른 페이지에서도 유지되도록.
    };
  }, []);

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
    <PlayAudioContext.Provider value={{ bgmRef, toggleAudioPlay }}>
      {children}
    </PlayAudioContext.Provider>
  );
};

export const usePlayAudio = () => {
  const context = useContext(PlayAudioContext);
  if (!context) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
};
