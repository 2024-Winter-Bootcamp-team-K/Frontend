import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HistoryNote from "./HistoryNote.tsx";


const LeftPage: React.FC = () => {
    const navigate = useNavigate();
    const [activePopup, setActivePopup] = useState<boolean>(false); // 상태를 boolean으로 관리
    const handleFolderCheck = () => openPopup();

  const openPopup = () => {
    setActivePopup(true); // 팝업 열기
    const audio = new Audio("/sounds/book.mp3");
      audio.play();
  };

  const closePopup = () => {
    setActivePopup(false); // 팝업 닫기
    const audio = new Audio("/sounds/book.mp3");
      audio.play();
  };    
  return (
    <div className="w-full h-full bg-cover bg-center relative">
        {/* Case Image */}
        <div
        className="case-image flex items-center justify-center relative
        mt-10 sm:mt-16 md:mt-12 lg:mt-8"
        >
            <img
            src="/images/Case_place.png"
            alt="Crime Scene"
            className="w-[60%] h-auto object-cover shadow-lg"
            />
        </div>
            {/* Success Image */}
            <div
            className="Success absolute w-full h-full flex items-center justify-center
            sm:bottom-52 md:bottom-48 lg:bottom-44 2xl:bottom-48"
            >
                <img
                src="/images/Success.png"
                alt="Success"
                className="h-auto object-cover z-10
                sm:w-[90%] md:w-[80%] lg:w-[65%]"
                />
            </div>
            {/* FAILURE Image */}
            {/*<div
            className="FAILURE absolute w-full h-full flex items-center justify-center
            sm:bottom-52 md:bottom-48 lg:bottom-44"
            >
                <img
                src="/images/FAILURE.png"
                alt="FAILURE"
                className="h-auto object-cover z-10
                sm:w-[90%] md:w-[80%] lg:w-[65%]"
                />
            </div>*/}
            {/* 사건 정보 */}
        <div className="case-details lg:mt-8 2xl:mt-16 px-4 text-center">
            <h2 className="text-4xl font-cursive font-bold text-black">
            미술관 도난 사건
            </h2>
            <p className="text-xl font-cursive text-black">
            Level: Easy / Attempts: 2
            </p>
            <p className="text-xl font-cursive text-black">
            Date: 2024.12.30 23:30
            </p>
            <p className="text-xl font-cursive text-black">
            Location: 미술관
            </p>
            <p className="text-xl font-cursive text-black">
            Type: 도난 사건
            </p>
            <p className="text-xl font-cursive text-black max-w-sm mx-auto">
            2024년 12월 30일 밤 11시 30분 경,
            서울 현대미술관 3층 특별 전시실에서 
            반 고흐의 ‘해바라기’ 복제화 작품이 도난되는데...
            </p>
        </div>
        <div className="folder-button-container">
          <button className="folder-button" onClick={handleFolderCheck}>
            <img src="/images/Folder.svg" alt="Folder Icon" className="folder-icon" />
          </button>
        </div>
            <style>{`
                .folder-button-container {
                    position: fixed;
                    bottom: 2vw;
                    right: 2vw;
                }

                .folder-button {
                    background: none;
                    border: none;
                    cursor: pointer;
                    outline: none;
                    transition: transform 0.3s ease;
                }

                .folder-icon {
                    width: 4vw;
                    height: 4vw;
                    min-width: 2.5rem;
                    min-height: 2.5rem;
                    max-width: 5rem;
                    max-height: 5rem;
                    transition: transform 0.3s ease;
                }

                .folder-button:hover .folder-icon {
                    transform: scale(1.2) rotate(15deg);
                }

                .folder-button:active {
                    transform: scale(0.9);
                }
        `}</style>
              {activePopup && <HistoryNote onClose={closePopup} />}
    </div>
  );
};


export default LeftPage;
