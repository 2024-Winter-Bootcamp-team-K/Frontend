import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import axiosInstance from  "../hooks/axiosInstance.ts";

interface SuspectResponse {
  is_theif: boolean;
}

// API 서비스 함수
const suspectService = {
  checkSuspect: (suspectId: number) =>
      axiosInstance.get<SuspectResponse>('/suspects/choose', {
          params: { suspect_id: suspectId }
      })
};

const ResultLoadingPage: React.FC = () => {
  const { suspectId } = useParams<{ suspectId: string }>();
  const navigate = useNavigate();
  const [fullMessage, setFullMessage] = useState<string>("");
  const [currentMessage, setCurrentMessage] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkSuspectResult = async () => {
      if (!suspectId) {
        setError("용의자 ID가 제공되지 않았습니다.");
        return;
      }
      
      try {
        setLoading(true);
        const response = await suspectService.checkSuspect(Number(suspectId));
                
        setFullMessage(
          response.data?.is_theif
            ? "You got it right!"
            : "...Are You Serious?"
        );

      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          const status = err.response?.status;
          setError(
            status === 400
              ? "잘못된 형식입니다."
              : "서버와의 통신에 문제가 발생했습니다."
          );
        } else {
            setError("예기치 못한 에러가 발생했습니다.");
        }
      } finally {
        setLoading(false);
      }
    };
    checkSuspectResult();
  }, [suspectId]);

  useEffect(() => {
    if (!fullMessage || fullMessage.trim() === "") return;
  
    let index = 0; 
    setCurrentMessage(""); 
  
    const typeMessage = () => {
      if (index < fullMessage.length) {
        setCurrentMessage(fullMessage.substring(0, index + 1));
        index++;
      }
    };

    const interval = setInterval(typeMessage, 100);
  
    return () => clearInterval(interval);
  }, [fullMessage]);

  // 배경 클릭 핸들러
  useEffect(() => {
    // Navigate to result page after 5 seconds
    if (!isLoading && !error) {
      const timeout = setTimeout(() => {
          //navigate("/result");
      }, 3000);
      
      return () => clearTimeout(timeout);
    }
  }, [isLoading, error, navigate]);

  return (
    <div
      className="fixed inset-0 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundColor: "#000000",
        backgroundBlendMode: "multiply",
      }}>
      <div className="absolute bottom-1/2 left-1/2 transform -translate-x-1/2 text-center px-4">
        <p
          className="font-Binggrae font-bold drop-shadow-md leading-tight"
          style={{
            fontSize: "4vw", // 반응형 폰트 크기
            color: "#FFFFFF",
          }}
        >
          {error ? "Something went wrong!" : currentMessage}
        </p>
      </div>
    </div>
  );
};

export default ResultLoadingPage;
