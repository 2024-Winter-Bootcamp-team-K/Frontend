import React, { useState } from "react";

const ChattingPage = () => {
    const [userInput, setUserInput] = useState("");

    const handleBackCheck = () => {};
    const handleFolderCheck = () => {};
    const handleSubmit = () => {
        if (userInput.trim()) {
            // Handle submit logic here
        }
    };

    return (
        <div className="chatting-page-container">
            <button className="back-button" onClick={handleBackCheck}>
                <img src="/images/back.svg" alt="Back Icon" className="back-icon" />
            </button>

            <div className="paper">
                <div className="suspect-profile">
                    <div className="suspect-image-wrapper">
                        <img 
                            src="/images/Suspect1.png" 
                            alt="Suspect" 
                            className="suspect-image"
                        />
                    </div>
                    <div className="suspect-info">
                        <div className="info-grid">
                            <p className="info-label">이름:</p>
                            <p className="info-value">김민수</p>
                            
                            <p className="info-label">나이:</p>
                            <p className="info-value">42세</p>
                            
                            <p className="info-label">성별:</p>
                            <p className="info-value">남성</p>
                            
                            <p className="info-label">직업:</p>
                            <p className="info-value">미술관 큐레이터</p>
                            
                            <p className="info-label">초기 진술:</p>
                            <p className="info-value statement-content">
                                "그날 밤 내내 사무실에서 다음 전시 준비를 하고 있었습니다."
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="chat-section">
                <div className="chat-tip">TIP: 심문 내용을 추리 노트에 기록하세요.</div>
                <div className="chat-bar-container">
                    <div className="chat-input-wrapper">
                        <input
                            type="text"
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            placeholder="너의 알리바이를 말해라"
                            className="chat-input"
                        />
                    </div>
                    <button 
                        onClick={handleSubmit}
                        className="submit-button"
                    >
                        <span>심문</span>
                    </button>
                </div>
            </div>

            <button className="folder-button" onClick={handleFolderCheck}>
                <img src="/images/Folder.svg" alt="Folder Icon" className="folder-icon" />
            </button>

            <style>{`
                .chatting-page-container {
                    background-image: url('/images/ChatPage_back.png');
                    background-size: cover;
                    background-position: center;
                    width: 100%;
                    height: 100vh;
                    position: relative;
                    overflow: hidden;
                    image-rendering: pixelated;
                    padding: 5vw;
                }

                .paper {
                    position: absolute;
                    left: 9vw;
                    top: 43%;
                    transform: translateY(-50%);
                    width: 30vw;
                    height: 70vh;
                    background-image: url('/images/Paper.png');
                    background-size: 100% 100%;
                    background-repeat: no-repeat;
                    background-position: center;
                    transition: transform 0.3s ease;
                    image-rendering: pixelated;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: 4% 3% 2% 1%;
                }

                .paper:hover {
                    transform: translateY(-50%) scale(1.02);
                }

                .suspect-profile {
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                    padding: 1.5rem;
                    background: rgba(255, 255, 255, 0);
                }

                .suspect-image-wrapper {
                    width: 100%;
                    height: 47%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                .suspect-image {
                    height: 90%;
                    width: auto;
                    max-width: 80%;
                    object-fit: contain;
                    image-rendering: pixelated;
                }

                .suspect-info {
                    flex-grow: 1;
                    display: flex;
                    flex-direction: column;
                    padding: 0 2rem;
                }
                
                .info-grid {
                    display: grid;
                    grid-template-columns: auto 1fr;
                    gap: 0.2rem 0.5rem;
                    font-size: calc(0.9vw + 1.1vh);
                }

                .info-label {
                    font-weight: bold;
                    font-family: 'THEFACESHOP_INKLIPQUID';
                    margin: 0;
                    white-space: nowrap;
                }

                .info-value {
                    margin: 0;
                    font-weight: bold;
                    font-family: 'THEFACESHOP_INKLIPQUID';
                }

                .statement-content {
                    font-style: italic;
                    line-height: 1.4;
                    word-break: keep-all;
                }

                .back-button {
                    position: fixed;
                    top: 2vw;
                    left: 2vw;
                    background: none;
                    border: none;
                    cursor: pointer;
                    z-index: 10;
                }

                .back-icon {
                    width: 6vw;
                    height: 6vw;
                    transition: transform 0.3s ease;
                }

                .back-button:hover .back-icon {
                    transform: scale(1.2) rotate(-15deg);
                }

                .chat-section {
                    position: fixed;
                    bottom: 8vh;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 70vw;
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                }

                .chat-tip {
                    color: white;
                    font-size: calc(0.8vw + 0.9vh);
                    text-align: center;
                    margin-bottom: 0.5rem;
                    font-family: 'Press_Start_2P';
                    font-weight: 400;
                    opacity: 0.8;
                    text-shadow: 0 0.3px 0.3px black;
                }

                .chat-bar-container {
                    display: flex;
                    gap: 1.5rem;
                    width: 100%;
                    align-items: center;
                    height: 8vh;
                }

                .chat-input-wrapper {
                    flex-grow: 1;
                    display: flex;
                    align-items: center;
                    background: #C0C8CD;
                    border-radius: 12px;
                    box-shadow: inset 0 4px 6px rgba(0, 0, 0, 0.2), inset 0 -2px 4px rgba(255, 255, 255, 0.1);
                    overflow: hidden;
                    transition: all 0.2s ease-in-out;
                    height: 100%;
                }

                .chat-input {
                    width: 100%;
                    padding: 0.75rem 1rem;
                    border: none;
                    outline: none;
                    font-family: 'BinggraeII';
                    font-size: 2rem;
                    background: transparent;
                    color: #222;
                    height: 100%;
                }

                .chat-input::placeholder {
                    color: #56606B; 
                }

                .submit-button {
                    padding: 0.75rem 1.5rem;
                    background: #89A8B2;
                    color: white;
                    border: none;
                    border-radius: 12px;
                    font-family: 'BinggraeII';
                    font-size: 2rem;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    white-space: nowrap;
                    height: 100%;
                }

                .submit-button:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
                }

                .folder-button {
                    position: fixed;
                    bottom: 2vw;
                    right: 2vw;
                    background: none;
                    border: none;
                    cursor: pointer;
                }

                .folder-icon {
                    width: 4vw;
                    height: 4vw;
                    transition: transform 0.3s ease;
                }

                .folder-button:hover .folder-icon {
                    transform: scale(1.2) rotate(15deg);
                }

                @media (max-width: 800px) {
                    .paper {
                        width: 40vw;
                    }
                    
                    .info-grid {
                        font-size: calc(1.2vw + 0.2vh);
                    }
                }

                @media (max-width: 480px) {
                    .paper {
                        width: 80vw;
                        left: 50%;
                        transform: translate(-50%, -50%);
                    }
                    
                    .suspect-profile {
                        padding: 1rem;
                    }
                    
                    .info-grid {
                        font-size: calc(2vw + 0.2vh);
                    }
                    
                    .chat-section {
                        width: 90vw;
                    }
                    
                    .chat-input {
                        font-size: 0.8rem;
                    }
                    
                    .submit-button {
                        padding: 0.75rem 1rem;
                        font-size: 0.75rem;
                    }
                    
                    .chat-tip {
                        font-size: 0.7rem;
                    }
                }
            `}</style>
        </div>
    );
};

export default ChattingPage;