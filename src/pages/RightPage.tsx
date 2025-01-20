import React, { useState } from "react";
import { useParams } from "react-router-dom";
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

interface ChatMessage {
  role: 'user' | 'assistant';
  message: string;
  timestamp: string;
}

interface ChatHistory {
  messages: ChatMessage[];
}

interface RightPageProps {
  suspects: Suspect[];
  evidences: Evidence[];
}

const RightPage: React.FC<RightPageProps> = ({ suspects, evidences }) => {
  const { scenarioId } = useParams<{ scenarioId: string }>();
  const [activePopup, setActivePopup] = useState<string | null>(null);
  const [chatHistory, setChatHistory] = useState<ChatHistory | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getChatHistory = async (suspectId: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get<ChatHistory>('/chat-histories', {
        params: {
          scenario_id: scenarioId,
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
    <div className="w-full h-full flex flex-col items-center justify-start space-y-4 p-6">
      <h1 className="text-3xl 2xl:text-4xl font-cursive font-bold">Suspect List</h1>

      <div className="flex flex-wrap justify-center items-start gap-4 sm:gap-1 md:gap-1 lg:gap-2 xl:gap-4 2xl:gap-8 3xl:gap-16 4xl:gap-32">
        {suspects.map((suspect) => (
          <div
            key={suspect.id}
            className="flex flex-col items-center relative cursor-pointer"
            onClick={() => openPopup(`suspect${suspect.id}`)}
          >
            <img
              src={suspect.image}
              alt={`Suspect ${suspect.id}`}
              className="w-24 h-24 object-cover shadow-lg sm:w-28 sm:h-28 md:w-28 md:h-28 lg:w-28 lg:h-28 xl:w-28 xl:h-28 2xl:w-32 2xl:h-32 3xl:w-36 3xl:h-36 4xl:w-40 4xl:h-40"
            />
            {suspect.is_theif && (
              <img
                src="/images/WANTED.png"
                alt="WANTED"
                className="absolute top-[40%] left-1/2 object-contain transform -translate-x-1/2 -translate-y-1/2"
              />
            )}
            <p className="mt-2 text-center text-lg sm:text-xl md:text-2xl font-cursive font-semibold">
              {`${suspect.job} ${suspect.name}`}
            </p>
          </div>
        ))}
      </div>

      <h2 style={{ marginTop: "3rem", marginBottom: "-1rem" }} className="text-3xl 2xl:text-4xl font-cursive font-bold">
        Evidence List
      </h2>
      <div className="flex flex-wrap justify-center items-start gap-4 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12 2xl:gap-16 3xl:gap-20 4xl:gap-24">
        {evidences.map((evidence, index) => (
          <div
            key={index}
            className="flex flex-col items-center cursor-pointer"
            onClick={() => openPopup(`evidence${index + 1}`)}
          >
            <img
              src={evidence.image}
              alt={`Evidence ${index + 1}`}
              className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 object-cover"
            />
            <p className="mt-2 text-center text-sm sm:text-base md:text-lg font-cursive font-semibold">
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