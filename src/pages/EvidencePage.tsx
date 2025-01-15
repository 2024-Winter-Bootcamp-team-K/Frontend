import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Evidence {
    id: number;
    image: string;
    description: string;
    detailTitle: string;
    detailedDescription: string;
}

const EvidencePage: React.FC = () => {
    const navigate = useNavigate();
    const [selectedEvidence, setSelectedEvidence] = useState<Evidence | null>(null);
    const [showItems, setShowItems] = useState<number[]>([]);
    const handleBackCheck = () => {navigate("/play")};
    // const handleFolderCheck = () => {};

   /* const handleIconClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      setPopupImage("/images/Note2.png");
      setPopupText("추리 내용을 입력하세요...");
      setIsNotePopup(true);
      setShowPopup(true);
    }; */
  
    
    const handleFolderCheck = (e: React.MouseEvent) => {
        e.stopPropagation();
        const audio = new Audio("/sounds/book.mp3");
        audio.play();
        setTimeout(() => {
          navigate("/note");
        }, 500);
      };
  
  
    const evidenceData = [
        {
            id: 1,
            image: "/images/Evidence1.png",
            description: "바닥에 떨어져 있던 장갑 한 쪽",
            detailTitle: "미술관 지하 주차장에서 발견된 장갑",
            detailedDescription: "검은색 가죽 장갑, 복원 작업실에서사용하는 것과 동일한 제품, 내부에서 김민수의 ID카드 잔여 지문 발견"
        },
        {
            id: 2,
            image: "/images/Evidence2.png",
            description: "사건 당시 작동하던 CCTV",
            detailTitle: "박물관 CCTV 기록",
            detailedDescription: "23:15-23:45 사이 3층 카메라 신호 일시적 중단 - 담당자: 이지원 (보안팀장)"
        }
    ];

    useEffect(() => {
        const showItemsWithDelay = () => {
            evidenceData.forEach((_, index) => {
                setTimeout(() => {
                    setShowItems((prev) => [...prev, index]);
                }, index * 800);
            }, 1000);
        };

        showItemsWithDelay();
    }); 

    function handleBackButtonClick() {
        handleBackCheck();
    }

    return (
        <div className="evidence-page-container">
            <div className="content-wrapper">
                {/* 돌아가기 버튼 */}
                <div className="back-button-container">
                    <button className="back-button" onClick={handleBackButtonClick}>
                        <img src="/images/back.svg" alt="Back Icon" className="back-icon" />
                    </button>
                </div>

                {/* 제목 */}
                <h1 className="page-title">[증거 목록]</h1>

                {/* 증거 컨테이너 */}
                <div className="evidence-container">
                    {evidenceData.map((evidence, index) => (
                        <div key={evidence.id} className={`evidence-item ${showItems.includes(index) ? 'show' : ''}`}>
                            <div className="evidence-wrapper">
                                <div className="evidence-content">
                                    <div className="evidence-paper">
                                        <img src={evidence.image} alt={`Evidence ${evidence.id}`} className="evidence-image" />
                                    </div>
                                    <div className="evidence-details">
                                        <p className="evidence-description">{evidence.description}</p>
                                        <button className="investigate-button" onClick={() => setSelectedEvidence(evidence)}>
                                            조사하기
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

            {/* 팝업 */}
            {selectedEvidence && (
                <div className="popup-overlay" onClick={() => setSelectedEvidence(null)}>
                    <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                        <img src={selectedEvidence.image} alt={`Evidence ${selectedEvidence.id} Detail`} className="popup-image" />
                        <p className="popup-description-title">{selectedEvidence.detailTitle}</p>
                        <p className="popup-description">{selectedEvidence.detailedDescription}</p>
                    </div>
                </div>
            )}

            <style>{`
                .evidence-page-container {
                    background-image: url("/images/Evidence_back.png");
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
                    padding: 3vw;
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

                .evidence-container {
                    display: flex;
                    justify-content: center;
                    gap: 8vw; 
                    padding: 0 4vw;
                    flex-wrap: wrap;
                    width: 100%;
                    height: calc(100vh - 20vh);
                    align-items: center;
                }

                .evidence-item {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    width: 38vw;
                    min-width: 280px;
                    height: 100%;
                    max-height: 70vh;
                    opacity: 0;
                    transform: translateY(50px);
                    transition: opacity 0.5s ease, transform 0.5s ease;
                }

                .evidence-item.show {
                    opacity: 1;
                    transform: translateY(0);
                }

                .evidence-wrapper {
                    height: 100%;
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                }

                .evidence-content {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    width: 100%;
                    height: 100%;
                }

                .evidence-paper {
                    width: 100%;
                    height: 90%; 
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background-image: url("/images/papyrus.png");
                    background-size: contain;
                    background-repeat: no-repeat;
                    background-position: center;
                }

                .evidence-image {
                    width: 50%;
                    height: 50%;
                    object-fit: contain;
                }

                .evidence-details {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    width: 100%;
                    height: 30%;
                    justify-content: center;
                }

                .evidence-description {
                    color: white;
                    text-align: center;
                    margin: 1vh 0; 
                    font-size: 1.5vw;
                    font-family: 'BinggraeII';
                    width: 100%;
                    word-wrap: break-word;
                }

                .investigate-button {
                    background-color: transparent;
                    color: #ff0000;
                    border: none;
                    padding: 1vh 2vw;
                    border-radius: 10px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    font-size: 2vw;
                    font-family: 'BinggraeII';
                }

                .investigate-button:hover {
                    background-color: rgba(0, 0, 0, 0.2);
                    transform: translateY(-4px) scale(1.1);
                }

                .popup-overlay {
                    position: fixed;
                    inset: 0;
                    background-color: rgba(0, 0, 0, 0.5);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 1000;
                }

                .popup-content {
                    width: min(80vw, 800px);
                    height: 80vh;
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 4vw;
                    background-image: url("/images/papyrus.png");
                    background-size: contain;
                    background-repeat: no-repeat;
                    background-position: center;
                }

                .popup-image {
                    width: 50%;
                    height: auto;
                    object-fit: contain;
                    margin-bottom: 2vh;
                }

                .popup-description-title {
                    color: black;
                    text-align: center;
                    font-size: clamp(30px, 2vw, 50px);
                    text-shadow: 0.6px 0.6px 0.6px rgba(0, 0, 0, 0.5);
                    font-family: 'THEFACESHOP_INKLIPQUID';
                    margin-bottom: 2vh;
                }

                .popup-description {
                    color: black;
                    text-align: center;

                    word-break: keep-all; 
                    padding: 0 4vw;
                    font-size: clamp(20px, 1.8vw, 30px);
                    font-family: 'THEFACESHOP_INKLIPQUID';
                    line-height: 1.5;
                    overflow: hidden; 
                    text-overflow: ellipsis;
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
                    .evidence-container {
                        flex-direction: column;
                        align-items: center;
                        gap: 4vh;
                        padding: 2vh 0;
                        height: auto;
                    }

                    .evidence-item {
                        width: 60vw;
                        height: 60vh;
                    }

                    .evidence-paper {
                        height: 60%;
                    }

                    .evidence-details {
                        height: 40%;
                    }
                }

                @media (max-width: 480px) {
                    .back-icon {
                        width: 8vw;
                        height: 8vw;
                    }

                    .evidence-item {
                        width: 80vw;
                        height: 50vh;
                    }
                }
            `}</style>
        </div>
    );
};

export default EvidencePage;