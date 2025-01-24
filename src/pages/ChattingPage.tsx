import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeHigh } from '@fortawesome/free-solid-svg-icons';
import NotePage from "./NotePage.tsx";
import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { fetchSuspect } from "../services/apiService";
import WebSocketService from "../mocks/webSocketService";
import fetchTTS from "./TTSService"; // default import
import { usePlayAudio } from "./PlayAudioContext";

const ChattingPage: React.FC = () => {
    const navigate = useNavigate();
    const [userInput, setUserInput] = useState("");
    const [displayText, setDisplayText] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [activePopup, setActivePopup] = useState<boolean>(false); // 상태를 boolean으로 관리
    const [suspectData, setSuspectData] = useState<any>(null); // 용의자 정보 상태
    const [chatHistory, setChatHistory] = useState<{ message: string; response: any }[]>([]); // 채팅 기록 상태
    const [suspectChat, setSuspectChat] = useState<string | null>(null); // suspect_chat 상태 추가
    const mediaRecorderRef = React.useRef<MediaRecorder | null>(null);
    const webSocketServiceRef = useRef<WebSocketService | null>(null);
    const { suspect_id } = useParams<{ suspect_id: string | undefined }>();
    const { toggleAudioPlay } = usePlayAudio();

    const scenarioId = localStorage.getItem("currentScenarioId");

    useEffect(() => {
        const savedChatHistory = localStorage.getItem("chatHistory");
        if(savedChatHistory) {
            setChatHistory(JSON.parse(savedChatHistory));
        }

        return () => {
            if(webSocketServiceRef.current) {
                webSocketServiceRef.current.disconnect();
            }
        };
    }, []);

    useEffect(() => {
        localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
    }, [chatHistory]);

    useEffect(() => {
        const loadSuspect = async () => {

        if (!suspect_id) return;
        try {
            const data = await fetchSuspect(suspect_id);
            setSuspectData(data);
        } catch (error) {
            console.error("용의자 정보를 가져오는 중 오류 발생:", error);
        }
        };
        loadSuspect();

        // WebSocket 연결 설정
        const webSocketService = WebSocketService.getInstance();
            webSocketService.connect(
                `wss://ailibi.click/ws/chat/${suspect_id}`,
                (data) => {
                    if (data?.suspect_chat) {
                        setSuspectChat(data.suspect_chat);
                        animateSuspectChat(data.suspect_chat);
                        
                    }
                }
            );
        
        webSocketServiceRef.current = webSocketService;

        return () => {
            webSocketService.disconnect(); // 컴포넌트 언마운트 시 연결 해제
        };
    }, [suspect_id]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const maxLength = 100;
        if(e.target.value.length > maxLength) {
            alert(`최대 100자까지만 입력 가능합니다.`);
            return;
        }
        setUserInput(e.target.value);
    };

    const handleBackCheck = () => {
        if (scenarioId) {
            navigate(`/suspect/${scenarioId}`);
        } else {
            navigate("/");
        }
    };

    const handleFolderCheck = () => openPopup();

    const openPopup = () => {
      setActivePopup(true); // 팝업 열기
    };
  
    const closePopup = () => {
      setActivePopup(false); // 팝업 닫기
    };    
    
    const animateSuspectChat = (chat: string) => {
        let currentText = "";
        let index = 0;
        setIsTyping(true);
        setDisplayText(""); // 애니메이션 초기화

        const typeNextCharacter = () => {
            if (index < chat.length) {
                currentText += chat[index];
                setDisplayText(currentText);
                index++;

                setTimeout(typeNextCharacter, getDelay(chat[index - 1]));
            } else {
                setIsTyping(false); // 애니메이션 종료
            }
        };

        typeNextCharacter();
    };

    const handleSendMessage = () => {
        if (!userInput.trim() || !webSocketServiceRef.current) {
            console.error("유효하지 않은 입력값 또는 WebSocket 연결 없음.");
            return;
        }

        webSocketServiceRef.current.sendMessage({ message: userInput.trim() });
        setChatHistory((prev) => [...prev, { message: userInput.trim(), response: "" }]); // 사용자의 메시지 추가
        setUserInput(""); // 입력값 초기화
    };

    const toggleRecording = async () => {
        if (isRecording) {
            stopRecording();
        } else {
            startRecording();
        }
    };

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mediaRecorder = new MediaRecorder(stream);

            mediaRecorderRef.current = mediaRecorder;
            setIsRecording(true);

            const audioChunks: BlobPart[] = [];
            mediaRecorder.ondataavailable = (event) => {
                audioChunks.push(event.data);
            };

            mediaRecorder.onstop = () => {
                const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
                sendAudioToAPI(audioBlob); // 녹음이 종료되면 API 호출
            };

            mediaRecorder.start();
        } catch (error) {
            console.error("녹음 시작 실패:", error);
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
        }
    };

    const sendAudioToAPI = async (audioBlob: Blob) => {
        // Blob 데이터를 base64로 변환하는 함수
        const blobToBase64 = (blob: Blob): Promise<string> => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => 
                    resolve(reader.result as string); // base64 문자열 반환
                reader.onerror = reject;
                reader.readAsDataURL(blob); // Blob을 base64로 변환
            });
        };
    
        try {
            // Blob 데이터를 base64로 변환
            const base64Audio = await blobToBase64(audioBlob);
    
            // base64 데이터에서 헤더(`data:audio/wav;base64,`) 제거
            const cleanBase64Audio = base64Audio.split(",")[1];
    
            // API 요청 본문 생성
            const requestBody = {
                audio: cleanBase64Audio,
            };
    
            // API 요청
            const response = await fetch("https://ailibi.click/api/v1/stt", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody),
            });
    
            if (response.ok) {
                const result = await response.json();
                if (result.text) {
                    setUserInput(result.text); // API에서 변환된 텍스트를 userInput에 설정
                }
            } else {
                console.error("STT API 호출 실패:", response.statusText);
            }
        } catch (error) {
            console.error("STT API 호출 중 오류 발생:", error);
        }
    };

    const getDelay = (char: string) => {
        if (['.', '!', '?'].includes(char)) {
            return 500;
        } else if ([',', ';'].includes(char)) {
            return 200;
        }
        return Math.random() * 50 + 50;  
    };

    const handlePlayTTS = async () => {
        if (!suspectChat) {
            console.error("No suspect chat available for TTS.");
            return;
        }
    
        try {
            const audioBase64 = await fetchTTS(suspectChat, "3"); // task_id는 3 (여성)로 설정
            const audio = new Audio(`data:audio/wav;base64,${audioBase64}`);
            audio.play(); // 오디오 재생
        } catch (error) {
            console.error("Error playing TTS audio:", error);
        }
    };

    return (
        <div className="chatting-page-container">
            <button className="back-button" onClick={handleBackCheck}>
                <img src="/images/back.svg" alt="Back Icon" className="back-icon" />
            </button>

            {suspectChat && (
            <div className="speech-bubble">
                <div className="bubble-content">
                    <FontAwesomeIcon icon={faVolumeHigh}
                    className="volume-icon" 
                    onClick={handlePlayTTS} />
                {displayText || suspectChat}</div>
            </div>
        )}

            <div className="paper">
                <div className="suspect-profile">
                    <div className="suspect-image-wrapper">
                        <div className="tape-section"></div>
                        <img 
                            src={`${suspectData?.image || "default.jpg"}`} 
                            alt="Suspect" 
                            className="suspect-image"
                        />
                        <div className="tape-section"></div>
                    </div>
                    <div className="suspect-info">
                        <div className="info-grid">
                            <p className="info-label">이름:</p>
                            <p className="info-value">{suspectData?.name || "알 수 없음"}</p>
                            
                            <p className="info-label">나이:</p>
                            <p className="info-value">{suspectData?.age || "알 수 없음"}세</p>
                            
                            <p className="info-label">성별:</p>
                            <p className="info-value">{suspectData?.gender ? "여성" : "남성"}</p>
                            
                            <p className="info-label">직업:</p>
                            <p className="info-value">{suspectData?.job || "알 수 없음"}</p>
                            
                            <p className="info-label">초기 진술:</p>
                            <p className="info-value statement-content">
                                "{suspectData?.init_chat || "초기 진술 없음"}"
                            </p>
                        </div>
                    </div>
                </div>
            </div>


            <div className="chat-section">
                <div className="chat-tip">TIP: 심문 내용을 추리 노트에 기록하세요.</div>
                <div className="chat-bar-container">
                    <div className="chat-input-wrapper">
                        <button 
                            className={`mic-button ${isRecording ? 'recording' : ''}`}
                            onClick={toggleRecording}
                        >
                            {isRecording ? (
                                <div className="recording-dots">
                                    <div className="dot dot1"></div>
                                    <div className="dot dot2"></div>
                                    <div className="dot dot3"></div>
                                </div>
                            ) : (
                                <img src="/images/Mic.svg" alt="Mic Icon" className="mic-icon" />
                            )}
                        </button>
                        <input
                            type="text"
                            value={userInput}
                            onChange={handleInputChange}
                            placeholder="너의 알리바이를 말해라"
                            className="chat-input"
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleSendMessage(); // 엔터 키를 누르면 handleSubmit 호출
                                }
                            }}
                        />
                    </div>
                    <button 
                        onClick={handleSendMessage}
                        className="submit-button"
                        disabled={isTyping}
                    >
                        <span>심문</span>
                    </button>
                </div>
            </div>

            <button className="folder-button" onClick={handleFolderCheck}>
                <img src="/images/Folder.svg" alt="Folder Icon" className="folder-icon" />
            </button>
            {activePopup && <NotePage onClose={closePopup} />}

            {/* BGM 토글 버튼 */}
            <button className="bgm-toggle" onClick={toggleAudioPlay}>
                <FontAwesomeIcon icon={faVolumeHigh}/>
            </button>

            <style>{`
                .bgm-toggle {
                    position: fixed;
                    top: 1.5rem;
                    right: 1.5rem;
                    background: none;
                    border: none;
                    font-size: 2rem;
                    cursor: pointer;
                    color: #FFFFFF;
                }
                .bgm-toggle:hover {
                    transform: scale(1.2) ;
                }
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
                    width: 90%;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                    padding: 1.5rem;
                    background: rgba(255, 255, 255, 0);
                }

                .suspect-image-wrapper {
                    width: 70%;
                    height: 47%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    position: relative;
                    top: -5%;
                }

                .tape-section {
                    position: absolute;
                    width: 105%;
                }

                .tape-section:first-of-type {
                    top: 2.7%;
                }

                .tape-section:first-of-type::before {
                    content: "";
                    width: 14vmin;
                    height: 4.2vmin;
                    position: absolute;
                    background-color: #E7E7E7;
                    opacity: 0.8;
                    border-right: 1px dotted #C7C0B9;
                    border-left: 1px dotted #C7C0B9;
                    box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.3);
                    transform: rotate(-45deg);
                    left: -4vmin;
                }

                .suspect-image-wrapper {
                    position: relative; /* 테이프와 이미지를 하나의 컨테이너로 묶음 */
                    width: 50%;
                    height: auto;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin: 0 auto;
                  }
                
                  .suspect-image {
                    width: 100%; /* 프로필 이미지가 부모 요소에 맞게 반응형으로 조정 */
                    height: auto; 
                    object-fit: contain;
                  }
                
                .info-grid {
                    display: grid;
                    grid-template-columns: auto 1fr;
                    gap: 0.2rem 0.5rem;
                    font-size: calc(0.8vw + 1vh);
                    margin-top: -2vh;
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
                    opacity: 1;
                    text-shadow: 0 0.3px 0.3px black;
                    animation: fadeInOut 2.5s ease-in-out infinite; 
                }

                @keyframes fadeInOut {
                    0%, 100% {
                        opacity: 0.7; 
                    }
                    50% {
                        opacity: 1; 
                    }
                }

                .chat-bar-container {
                    display: flex;
                    gap: 1.5rem;
                    width: 100%;
                    align-items: center;
                    height: 8vh;
                }

                .chat-input-wrapper {
                    position: relative;
                    flex-grow: 1;
                    display: flex;
                    align-items: center;
                    padding-left: 1rem;
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

                .submit-button:active {
                    transform: translateY(2px); 
                    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1); 
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

                .speech-bubble {
                    position: absolute;
                    top: 13vh;
                    right: 4vw;
                    left: 56vw;
                    background: #ffffff;
                    padding: 1.5rem;
                    min-width: 20vw;
                    max-width: fit-content;
                    transform-origin: left center;
                    box-shadow: 0 -4px #fff, 
                                0 -8px #000, 
                                4px 0 #fff, 
                                4px -4px #000, 
                                8px 0 #000, 
                                0 4px #fff, 
                                0 8px #000, 
                                -4px 0 #fff, 
                                -4px 4px #000, 
                                -8px 0 #000, 
                                -4px -4px #000, 
                                4px 4px #000;
                    image-rendering: pixelated;
                    -ms-interpolation-mode: nearest-neighbor;
                    image-rendering: crisp-edges;
                }

                .speech-bubble::before {
                    content: '';
                    position: absolute;
                    height: 4px;
                    width: 4px;
                    top: 90%;
                    transform: translateY(-50%);
                    left: -8px;
                    background: white;
                    box-shadow: 
                        -4px -4px #fff,
                        -4px 0 #fff,
                        -8px 0 #fff,
                        0 -8px #fff,
                        -4px 4px #000, 
                        -8px 4px #000, 
                        -12px 4px #000, 
                        -16px 4px #000,
                        -12px 0 #000, 
                        -8px -4px #000, 
                        -4px -8px #000,
                        0 -4px #fff;
                }

                .bubble-content {
                    font-family: 'Press_Start_2P', monospace;
                    font-weight: 800;
                    font-size: 1.2rem;
                    white-space: pre-wrap;
                    word-break: break-word;
                    line-height: 1.6;
                    text-shadow: 1px 1px 0px rgba(0,0,0,0.1);
                    image-rendering: pixelated;
                    -ms-interpolation-mode: nearest-neighbor;
                    image-rendering: crisp-edges;
                }

                .volume-icon {
                    margin-right: 8px;
                    color: #b0b0b0;
                    font-size: 1.2rem;
                    cursor: pointer;
                    filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));
                }

                .volume-icon:hover {
                    transform: scale(1.2) ;
                }

                @keyframes popIn {
                    0% {
                        transform: scaleX(0);
                    }
                    20% {
                        transform: scaleX(0.2);
                    }
                    40% {
                        transform: scaleX(0.4);
                    }
                    60% {
                        transform: scaleX(0.6);
                    }
                    80% {
                        transform: scaleX(0.8);
                    }
                    100% {
                        transform: scaleX(1);
                    }
                }


                .mic-button {
                    width: 6vh;
                    height: 6vh;
                    border: none;
                    background: transparent;
                    border-radius: 50%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    z-index: 2;
                }

                .mic-button:hover {
                    transform: scale(1.1);
                }

                .mic-icon {
                    width: 5.5vh;
                    height: 5.5vh;
                    filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));
                }

                .recording-dots {
                    display: flex;
                    gap: 0.4rem;
                }

                .dot {
                    width: 0.5rem;
                    height: 0.5rem;
                    background-color: white;
                    border-radius: 50%;
                    animation: blink 1.8s infinite;
                }

                .dot2 {
                    animation-delay: 0.6s;
                }

                .dot3 {
                    animation-delay: 1.2s;
                }

                @keyframes blink {
                    0%, 100% {
                        opacity: 0.3;
                    }
                    50% {
                        opacity: 1;
                    }
                }

                .recording {
                    background: #89A8B2;
                }

                @media (max-width: 800px) {
                    .paper {
                        width: 40vw;
                    }
                    
                    .info-grid {
                        font-size: calc(1.2vw + 0.2vh);
                    }

                    .speech-bubble {
                        left: 8vw;
                        max-width: 70vw;
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

                    .speech-bubble {
                        left: 5vw;
                        max-width: 85vw;
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