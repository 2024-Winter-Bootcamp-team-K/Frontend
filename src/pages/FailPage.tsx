import React from "react";
import { useNavigate } from "react-router-dom";

const FailPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div
      className="fixed inset-0 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: 'url(/images/FailPage.png)',
        height: "105vh",
      }}
    >
      <div className="absolute bottom-[51%] left-[74%] transform -translate-x-1/2 text-center animate-stamp">
        <img
          src="/images/FAILURE.png"
          alt="FAILURE Stamp"
          className="rounded-lg max-w-none"
          style={{ width: "500px", height: "300px" }}
        />
      </div>

      <div className="absolute bottom-[43%] left-[75%] transform -translate-x-1/2 text-center">
        <button
          className="text-lg font-semibold border-2 border-red-500 bg-white bg-opacity-70 rounded-2xl shadow-md focus:outline-none"
          style={{ fontSize: "30px", width: "280px", height: "50px", color: "#FF0000" }}
          onClick={() => alert("다시 도전하기")}
        >
          다시 도전하기
        </button>
      </div>

      <div className="absolute bottom-[33%] left-[75%] transform -translate-x-1/2 text-center">
        <button
          className="text-lg font-semibold text-red-500 border-2 border-red-500 bg-white bg-opacity-70 rounded-2xl shadow-md focus:outline-none"
          style={{ fontSize: "30px", width: "280px", height: "50px", color: "#FF0000"  }}
          onClick={() => navigate("/give-up")}
        >
          포기 하기
        </button>
      </div>

      <div className="absolute bottom-[11%] left-1/2 transform -translate-x-1/2 text-center">
        <p
          className="py-6 text-lg font-semibold text-black border-2 border-black bg-white bg-opacity-70 rounded-2xl shadow-md focus:outline-none"
          style={{ fontSize: "30px", width: "1200px", height: "80px" }}
        >
          "내가 추리에 실패하다니..."
        </p>
      </div>
    </div>
  );
};

export default FailPage;
