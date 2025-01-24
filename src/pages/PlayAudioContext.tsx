import React, { createContext, useContext, useRef, useEffect } from "react";

interface PlayAudioContextValue {
  bgmRef: React.MutableRefObject<HTMLAudioElement | null>;
}

const PlayAudioContext = createContext<PlayAudioContextValue | undefined>(undefined);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const bgmRef = useRef<HTMLAudioElement | null>(null);

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

  return (
    <PlayAudioContext.Provider value={{ bgmRef }}>
      {children}
    </PlayAudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(PlayAudioContext);
  if (!context) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
};
