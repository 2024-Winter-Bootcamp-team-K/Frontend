import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ResultLoadingPage: React.FC = () => {
  const navigate = useNavigate();
  const [fullMessage, setFullMessage] = useState<string>("");
  const [currentMessage, setCurrentMessage] = useState<string>("");

  useEffect(() => {
    // 2분의 1 확률로 메시지 선택
    const randomMessage = Math.random() < 0.5 ? "...Are You Serious?" : "You got it right!";
    setFullMessage(randomMessage);
  }, []);

  useEffect(() => {
    if (!fullMessage) return;

    let index = -1;
    const interval = setInterval(() => {
      setCurrentMessage((prev) => prev + fullMessage[index]);
      index++;

      // Clear interval when the message is fully displayed
      if (index >= fullMessage.length - 1) {
        clearInterval(interval);
      }
    }, 100); // Adjust the delay (in ms) between each character

    return () => clearInterval(interval);
  }, [fullMessage]);

  // 배경 클릭 핸들러
  useEffect(() => {
    // Navigate to result page after 5 seconds
    const timeout = setTimeout(() => {
      navigate("/result");
    }, 3000);

    return () => clearTimeout(timeout);
  }, [navigate]);

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
          {currentMessage}
        </p>
      </div>
    </div>
  );
};

export default ResultLoadingPage;
