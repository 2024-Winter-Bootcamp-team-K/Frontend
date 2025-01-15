import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NotePage from "./NotePage.tsx";

const SuspectPage: React.FC = () => {
    const navigate = useNavigate();
    const [activePopup, setActivePopup] = useState<boolean>(false); // 상태를 boolean으로 관리
    const [showItems, setShowItems] = useState<number[]>([]);
    const handleBackCheck = () => {navigate("/play")};
    const handleFolderCheck = () => openPopup();
    const handleInterrogate = () => {navigate("/chat")};
    const handleAccuse = () => {navigate("/choose")};
    
    const openPopup = () => {
        setActivePopup(true); // 팝업 열기
      };
    
      const closePopup = () => {
        setActivePopup(false); // 팝업 닫기
      };    

    const suspects = [
        { id: 1, name: "화가 김민수", image: "/images/Suspect1.png" },
        { id: 2, name: "경비인 이지원", image: "/images/Suspect2.png" },
        { id: 3, name: "큐레이터 장현우", image: "/images/Suspect3.png" },
    ];

    useEffect(() => {
        const showItemsWithDelay = () => {
            suspects.forEach((_, index) => {
                setTimeout(() => {
                    setShowItems((prev) => [...prev, index]);
                }, index * 800);
            }, 1000);
        };

        showItemsWithDelay();
    });

    return (
        <div className="suspect-page-container">
            <div className="content-wrapper">
                {/* 뒤로가기 버튼 */}
                <div className="back-button-container">
                    <button className="back-button" onClick={handleBackCheck}>
                        <img src="/images/back.svg" alt="Back Icon" className="back-icon" />
                    </button>
                </div>

                <h1 className="page-title">[용의자 목록]</h1>

                {/* 용의자 컨테이너 */}
                <div className="suspect-container">
                    {suspects.map((suspect, index) => (
                        <div key={suspect.id} className={`suspect-item ${showItems.includes(index) ? 'show' : ''}`}>
                            <div className="suspect-card">
                                <div className="suspect-background">
                                    <img src={suspect.image} alt={`Suspect ${suspect.id}`} className="suspect-image" />
                                    <div className="wanted-poster"></div>
                                </div>
                                <div className="suspect-details">
                                    <p className="suspect-name">{suspect.name}</p>
                                    <div className="button-container">
                                        <button className="action-button" onClick={() => handleInterrogate()}>
                                            심문하기
                                        </button>
                                        <button className="action-button" onClick={() => handleAccuse()}>
                                            범인 지목
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* 폴더 버튼 */}
                <div className="folder-button-container">
                    <button className="folder-button" onClick={handleFolderCheck}>
                        <img src="/images/Folder.svg" alt="Folder Icon" className="folder-icon" />
                    </button>
                </div>
            </div>
            {activePopup && <NotePage onClose={closePopup} />}

            <style>{`
                .suspect-page-container {
                    background-image: url("/images/Suspect_back.png");
                    background-size: cover;
                    background-position: center;
                    width: 100%;
                    height: 100vh;
                    position: relative;
                    overflow: hidden;
                }

                .back-button-container {
                    position: fixed;
                    top: 2vw;
                    left: 2vw;
                    z-index: 10;
                }

                .back-button {
                    background: none;
                    border: none;
                    cursor: pointer;
                    outline: none;
                    position: relative;
                }

                .back-icon {
                    width: 6vw;
                    height: 6vw;
                    min-width: 3.5rem;
                    min-height: 3.5rem;
                    max-width: 6rem;
                    max-height: 6rem;
                    transition: transform 0.3s ease;
                }

                .back-button:hover .back-icon {
                    transform: scale(1.2) rotate(-15deg);
                }

                .back-button:active {
                    transform: scale(0.9);
                }

                .content-wrapper {
                    padding: 5vw;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }

                .page-title {
                    font-size: 2.5vw;
                    font-family: 'BinggraeII';
                    color: white;
                    text-align: center;
                    margin-bottom: 4vh;
                }

                .suspect-container {
                    display: flex;
                    justify-content: center;
                    gap: 2vw;
                    padding: 0 2.2vw;
                    flex-wrap: wrap;
                    width: 100%;
                    height: calc(100vh - 20vh);
                    align-items: center;
                }

                .suspect-item {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    width: 20vw;
                    min-width: 200px;
                    height: 100%;
                    max-height: 70vh;
                    opacity: 0;
                    transform: translateY(50px);
                    transition: opacity 0.5s ease, transform 0.5s ease;
                }

                .suspect-item.show {
                    opacity: 1;
                    transform: translateY(0);
                }

                .suspect-card {
                    position: relative;
                    width: 100%;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }

                .suspect-background {
                    position: relative;
                    width: 100%;
                    height: 70%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .suspect-image {
                    position: absolute;
                    width: 50%;
                    height: 50%;
                    object-fit: contain;
                    z-index: 1;
                }

                .wanted-poster {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-image: url("/images/WantedSuspect.png");
                    background-size: contain;
                    background-repeat: no-repeat;
                    background-position: center;
                    z-index: 2;
                }

                .suspect-details {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    width: 100%;
                    padding-top: 0.1vh;
                }

                .suspect-name {
                    color: white;
                    text-align: center;
                    margin: 0.1vh 0;
                    font-size: 1.7vw;
                    font-family: 'BinggraeII';
                    width: 100%;
                    word-wrap: break-word;
                }

                .button-container {
                    display: flex;
                    gap: 2vw;
                    margin-top: 1vh;
                }

                .action-button {
                    background-color: transparent;
                    color: #ff0000;
                    border: none;
                    padding: 1vh 0.7vw;
                    border-radius: 10px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    font-size: 1.5vw;
                    font-family: 'BinggraeII';
                }

                .action-button:hover {
                    transform: translateY(-4px) scale(1.1);
                    background: linear-gradient(
                        120deg,
                        transparent,
                        rgba(128, 128, 128, 1),
                        transparent
                      );
                      transition: 0.5s;
                }

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

                @media (max-width: 800px) {
                    .suspect-container {
                        flex-direction: column;
                        align-items: center;
                        gap: 4vh;
                        padding: 2vh 0;
                        height: auto;
                    }

                    .suspect-item {
                        width: 60vw;
                        height: 60vh;
                    }

                    .suspect-background {
                        height: 60%;
                    }

                    .action-button {
                        font-size: 3vw;
                    }

                    .suspect-name {
                        font-size: 3vw;
                    }
                }

                @media (max-width: 480px) {
                    .back-icon {
                        width: 8vw;
                        height: 8vw;
                    }

                    .suspect-item {
                        width: 80vw;
                        height: 50vh;
                    }
                    
                    .action-button {
                        font-size: 4vw;
                    }
                }
            `}</style>
        </div>
    );
};

export default SuspectPage;