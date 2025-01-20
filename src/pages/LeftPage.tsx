import React, { useState } from "react";
//import { useNavigate } from "react-router-dom";
import HistoryNote from "./HistoryNote.tsx";
interface Scenario {
    id: number;
    name: string;
    location: string;
    type: string;
    datetime: string;
    description: string;
    image: string;
    level: number;
    note: string;
    is_success: boolean;
  }
  
  interface LeftPageProps {
    scenarios: Scenario[];
  }

const LeftPage: React.FC<LeftPageProps> = ({ scenarios })   => {
    //const navigate = useNavigate();
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

  if (scenarios.length === 0) return null;
  const scenario = scenarios[0];

  return (
    <div className="w-full h-full bg-cover bg-center relative">
        {/* Case Image */}
        <div className="case-image flex items-center justify-center relative mt-10 sm:mt-16 md:mt-12 lg:mt-8">
            <img
                src={scenario.image}
                alt="Crime Scene"
                className="w-[60%] h-auto object-cover shadow-lg"
                />
            </div>
            {/* Success Image */}
            {scenario.is_success ? (
                <div className="Success absolute w-full h-full flex items-center justify-center sm:bottom-52 md:bottom-48 lg:bottom-44 2xl:bottom-48">
                <img
                    src="/images/Success.png"
                    alt="Success"
                    className="h-auto object-cover z-10 sm:w-[90%] md:w-[80%] lg:w-[65%]"
                />
                </div>
            ) : (
                <div className="FAILURE absolute w-full h-full flex items-center justify-center sm:bottom-52 md:bottom-48 lg:bottom-44">
                <img
                    src="/images/FAILURE.png"
                    alt="FAILURE"
                    className="h-auto object-cover z-10 sm:w-[90%] md:w-[80%] lg:w-[65%]"
                />
                </div>
            )}
        {/* 사건 정보 */}
        <div className="case-details lg:mt-8 2xl:mt-16 px-4 text-center">
            <h2 className="text-4xl font-cursive font-bold text-black">
            {/* 사건 제목 */}
                {scenario.name}
            </h2>
            <p className="text-xl font-cursive text-black">
                Level: {scenario.level === 1 ? 'Easy' : scenario.level === 2 ? 'Medium' : 'Hard'}
            </p>
            <p className="text-xl font-cursive text-black">
                Date: {scenario.datetime.replace(
                    /^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})$/,
                    "$1년 $2월 $3일 / $4시 $5분 $6초"
                )}
            </p>
            <p className="text-xl font-cursive text-black">
                Location: {scenario.location}
            </p>
            <p className="text-xl font-cursive text-black">
                Type: {scenario.type}
            </p>
            <p className="text-xl font-cursive text-black max-w-sm mx-auto">
                {scenario.description}
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
              {activePopup && <HistoryNote onClose={closePopup} note={scenario.note}/>}
    </div>
  );
};


export default LeftPage;
