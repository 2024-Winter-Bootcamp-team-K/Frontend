import React, { useState } from "react";
import axiosInstance from "../hooks/axiosInstance";
import RightPagePopup from "./HistoryPopUp";

interface Suspect {
  id: number;
  name: string;
  gender: boolean;
  age: number;
  job: string;
  description: string;
  is_theif: boolean;
  image: string;
  init_chat: string;
}

interface Evidence {
  //id: number;
  name: string;
  description: string;
  image: string;
}

interface ChatHistory {
  user_chat: Array<{ message: string[] }>;
  suspect_chat: Array<{ message: string[] }>;
}

interface RightPageProps {
  suspects: Suspect[];
  evidences: Evidence[];
}

const RightPage: React.FC<RightPageProps> = ({ suspects, evidences }) => {
  const [activePopup, setActivePopup] = useState<string | null>(null);
  const [chatHistory, setChatHistory] = useState<ChatHistory | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getChatHistory = async (suspectId: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get<ChatHistory>('/histories', {
        params: {
          suspect_id: suspectId
        }
      });
      setChatHistory(response.data);
    } catch (error) {
      console.error("Failed to fetch chat history:", error);
      setError("Failed to load chat history");
    } finally {
      setIsLoading(false);
    }
  };

  const openPopup = async (id: string) => {
    setActivePopup(id);
    const audio = new Audio("/sounds/book.mp3");
    audio.play();
    
    if (id.startsWith("suspect")) {
      const suspectId = parseInt(id.replace("suspect", ""));
      await getChatHistory(suspectId);
    }
  };

  const closePopup = () => {
    setActivePopup(null);
    setChatHistory(null);
    const audio = new Audio("/sounds/book.mp3");
    audio.play();
  };

  return (
    <div className="w-full h-full bg-cover bg-center relative">
      <div className="case-details translate-x-[-1vw] translate-y-[3vh] text-center">
        <h1 className="text-[3vw] font-cursive font-bold ">Suspect List</h1>
      </div>
      <div className="flex flex-wrap justify-center translate-x-[-1vw] translate-y-[5vh] items-start gap-[2vw]">
        {suspects.map((suspect) => (
          <div
            key={suspect.id}
            className="flex flex-col items-center relative cursor-pointer"
            onClick={() => openPopup(`suspect${suspect.id}`)}
          >
            <img
              src={suspect.image}
              alt={`Suspect ${suspect.id}`}
              className="w-[8vw] h-auto object-cover shadow-lg"
            />
            {suspect.is_theif && (
              <div className="WANTED absolute flex translate-y-[2vh] items-center justify-center">
                <img
                  src="/images/WANTED.png"
                  alt="WANTED"
                  className="h-auto object-cover z-10 w-[100%] opacity-90"
                />
              </ div>
            )}
            <p className="mt-2 text-center text-[1.2vw] font-cursive font-semibold">
              {suspect.job}
              <br />
              {suspect.name}
            </p>
          </div>
        ))}
      </div>
      <div className="case-details translate-x-[-1vw] translate-y-[7vh] text-center">
        <h2 className="text-[3vw] font-cursive font-bold">
          Evidence List
        </h2>
      </div>
      <div className="flex flex-wrap justify-center translate-x-[-1vw] translate-y-[9vh] items-start gap-[2vw]">
        {evidences.map((evidence, index) => (
          <div
            key={index}
            className="flex flex-col items-center cursor-pointer"
            onClick={() => openPopup(`evidence${index + 1}`)}
          >
            <img
              src={evidence.image}
              alt={`Evidence ${index + 1}`}
              className="w-[8vw] h-auto object-cover shadow-lg"
            />
            <p className="mt-2 text-center text-[1.2vw] font-cursive font-semibold">
              {evidence.name}
            </p>
          </div>
        ))}
      </div>

      {activePopup && (
        <RightPagePopup
          id={activePopup}
          type={activePopup.startsWith("suspect") ? "suspect" : "evidence"}
          onClose={closePopup}
          chatHistory={chatHistory}
          isLoading={isLoading}
          error={error}
          suspects={suspects}
          evidences={evidences}
        />
      )}
    </div>
  );
};

export default RightPage;