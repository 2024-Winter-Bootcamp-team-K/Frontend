import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NotePage from "./NotePage.tsx";
import axios from "axios";
import axiosInstance from  "../hooks/axiosInstance.ts";

interface EvidenceResponse {
    evidences: Evidence[];
}
interface Evidence {
    id: number;
    name: string;
    description: string;
    image: string;
}
interface DetailedEvidence {
    name: string;
    description: string;
    image: string;
}

// API 서비스 함수
const evidenceService = {
    getEvidences: (scenarioId: number) => 
        axiosInstance.get<EvidenceResponse>('/evidences', {
            params: { scenario_id: scenarioId }
        }),

    getEvidenceDetail: (evidenceId: number) =>
        axiosInstance.get<DetailedEvidence>(`/evidences/${evidenceId}`)
};

const EvidencePage: React.FC = () => {
    const { scenarioId } = useParams<{ scenarioId: string }>();
    const navigate = useNavigate();
    const [activePopup, setActivePopup] = useState<boolean>(false); // 상태를 boolean으로 관리
    const [selectedEvidence, setSelectedEvidence] = useState<Evidence | null>(null);
    const [detailedEvidence, setDetailedEvidence] = useState<DetailedEvidence | null>(null);
    const [showItems, setShowItems] = useState<number[]>([]);
    const [evidences, setEvidences] = useState<Evidence[]>([]);
    const [isLoading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    

    const handleBackCheck = () => {navigate(`/play/${scenarioId}`)};
    const handleFolderCheck = () => openPopup();

    const openPopup = () => {
        setActivePopup(true); // 팝업 열기
      };
    
      const closePopup = () => {
        setActivePopup(false); // 팝업 닫기
      };    

      const wrapText = (text: string, maxLength: number): string => {
        const regex = new RegExp(`.{1,${maxLength}}`, 'g');
        return text.match(regex)?.join('\n') ?? text;
    };

    /*
    const evidenceData = [
        {
            id: 1,
            image: "/images/Evidence1.png",
            name: "바닥에 떨어져 있던 장갑 한 쪽",
            description: "검은색 가죽 장갑, 복원 작업실에서사용하는 것과 동일한 제품, 내부에서 김민수의 ID카드 잔여 지문 발견"
        },
        {
            id: 2,
            image: "/images/Evidence2.png",
            name: "사건 당시 작동하던 CCTV",
            description: "23:15-23:45 사이 3층 카메라 신호 일시적 중단 - 담당자: 이지원 (보안팀장)"
        }
    ];
    */

    // 증거 목록 조회
    useEffect(() => {
        const fetchSuspects = async () => {
            try {
                setLoading(true); // 로딩 시작
                const response = await evidenceService.getEvidences(Number(scenarioId));
                setEvidences(response.data.evidences); 
            } catch (err: unknown) {
                if (axios.isAxiosError(err)) {
                    const status = err.response?.status;
                    setError(
                        status === 500
                            ? "서버에 에러가 발생하였습니다."
                            : status === 502
                            ? "서버로부터 잘못된 요청이 전송되었습니다."
                            : "증거 데이터를 불러오는 데 실패했습니다."
                    );
                } else {
                    setError("예기치 못한 에러가 발생했습니다.");
                }

            } finally {
                setLoading(false); // 로딩 종료
            }
        };

        fetchSuspects();
    }, [scenarioId]);

    // 선택됭 증거 상제 정보 조회
    useEffect(() => {
        const fetchEvidenceDetail = async () => {
            if (selectedEvidence) {
                try {
                    const response = await evidenceService.getEvidenceDetail(selectedEvidence.id);
                    setDetailedEvidence(response.data);
                } catch (err: unknown) {
                    if (axios.isAxiosError(err)) {
                        const status = err.response?.status;
                        setError(
                            status === 500
                                ? "서버에 에러가 발생하였습니다."
                                : status === 502
                                ? "서버로부터 잘못된 요청이 전송되었습니다."
                                : "증거 데이터를 불러오는 데 실패했습니다."
                        );
                    } else {
                        setError("예기치 못한 에러가 발생했습니다.");
                    }
                }
            }
        };

        fetchEvidenceDetail();
    }, [selectedEvidence]);



    useEffect(() => {
        const showItemsWithDelay = () => {
            evidences.forEach((_, index) => {
                setTimeout(() => {
                    setShowItems((prev) => [...prev, index]);
                }, index * 800);
            }, 1000);
        };

        if (evidences.length > 0) {
            showItemsWithDelay();
        }
    }, [evidences]); 

    if (isLoading) return (
        <div className="loading-container">
            <p>{/*정보를 불러오는 중...*/}</p>
        </div>
    );

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    if (!isLoading && evidences.length === 0) {
        return <p>증거 데이터가 없습니다.</p>;
    }

    return (
        <div className="evidence-page-container">
            <div className="content-wrapper">
                {/* 돌아가기 버튼 */}
                <div className="back-button-container">
                    <button className="back-button" onClick={handleBackCheck}>
                        <img src="/images/back.svg" alt="Back Icon" className="back-icon" />
                    </button>
                </div>

                {/* 제목 */}
                <h1 className="page-title">[증거 목록]</h1>

                {/* 증거 컨테이너 */}
                <div className="evidence-container">
                    {evidences.map((evidence, index) => (
                        <div key={evidence.id} className={`evidence-item ${showItems.includes(index) ? 'show' : ''}`}>
                            <div className="evidence-wrapper">
                                <div className="evidence-content">
                                    <div className="evidence-paper">
                                        <img src={evidence.image} alt={`Evidence ${evidence.id}`} className="evidence-image" />
                                    </div>
                                    {/* Place the evidence name below the image */}
                                    <p className="evidence-name">{evidence.name}</p>
                                    <div className="evidence-details">
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
            {selectedEvidence && detailedEvidence && (
    <div className="popup-overlay" onClick={() => setSelectedEvidence(null)}>
    <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <img src={detailedEvidence.image} alt={`Evidence Detail`} className="popup-image" />
        <p className="popup-description-title">{detailedEvidence.name}</p>
        <p className="popup-description">{wrapText(detailedEvidence.description, 20)}</p>
    </div>
</div>
            )}
              {activePopup && <NotePage onClose={closePopup} />}

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

                .evidence-paper {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                }

                .evidence-name {
                    margin-top: 0.5rem;
                    font-size: 1.2rem;
                    color: #fff; /* Adjust color as needed */
                    text-align: center;
                    font-family: 'BinggraeII'; /* Replace with your font */
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
                    padding: 1vh 0.7vw;
                    border-radius: 10px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    font-size: 1.5vw;
                    font-family: 'BinggraeII';
                }

                .investigate-button:hover {
                    transform: translateY(-4px) scale(1.1);
                    background: linear-gradient(
                        120deg,
                        transparent,
                        rgba(128, 128, 128, 1),
                        transparent
                      );
                      transition: 0.5s;
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
                    padding: 0 4vw;
                    font-size: clamp(20px, 1.8vw, 30px);
                    font-family: 'THEFACESHOP_INKLIPQUID';
                    line-height: 1.5;
                    word-wrap: break-word; /* 줄바꿈 */
                    overflow-wrap: break-word; /* 긴 단어를 강제로 줄바꿈 */
                    text-overflow: ellipsis; /* 필요시 생략 표시 (...) */
                    max-width: 90%; /* 팝업 컨테이너 크기에 맞춤 */
                    white-space: pre-wrap; /* 줄바꿈을 허용 */
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