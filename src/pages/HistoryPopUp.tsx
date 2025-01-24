import React from "react";

interface Suspect {
  id: number;
  name: string;
  gender: boolean;
  age: number;
  job: string;
  description: string;
  is_theif: boolean;
  image: string;
  init_chat: string;
}

interface Evidence {
  name: string;
  description: string;
  image: string;
}

interface ChatHistory {
  user_chat: Array<{ message: string[] }>;
  suspect_chat: Array<{ message: string[] }>;
}

interface CheckEvProps {
  id: string;
  type: "suspect" | "evidence";
  onClose: () => void;
  chatHistory: ChatHistory | null;
  isLoading: boolean;
  error: string | null;
  suspects: Suspect[];
  evidences: Evidence[];
}

const CheckEv: React.FC<CheckEvProps> = ({ 
  id, 
  type, 
  onClose, 
  chatHistory,
  isLoading,
  error,
  suspects,
  evidences
}) => {
  const getSuspect = (suspectId: string): Suspect | null => {
    const id = parseInt(suspectId.replace("suspect", ""));
    return suspects.find(s => s.id === id) || null;
  };

  const getEvidence = (evidenceId: string): Evidence | null => {
    const index = parseInt(evidenceId.replace("evidence", "")) - 1;
    return evidences[index] || null;
  };

  const suspect = type === "suspect" ? getSuspect(id) : null;
  const evidence = type === "evidence" ? getEvidence(id) : null;

  const renderChatHistory = () => {
    if (isLoading) return <p className="text-center text-gray-500">Loading...</p>;
    if (error) return <p className="text-center text-red-600">{error}</p>;
    if (!chatHistory?.user_chat || !chatHistory?.suspect_chat) {
      return <p className="text-center text-gray-500">No chat history available.</p>;
    }

    const userMessages = chatHistory.user_chat[0]?.message || [];
    const suspectMessages = chatHistory.suspect_chat[0]?.message || [];

    const allMessages = [];
    const maxLength = Math.max(userMessages.length, suspectMessages.length);
    
    for (let i = 0; i < maxLength; i++) {
      if (userMessages[i]) {
        allMessages.push({ type: 'Q', message: userMessages[i], key: `user-${i}` });
      }
      if (suspectMessages[i]) {
        allMessages.push({ type: 'A', message: suspectMessages[i], key: `suspect-${i}` });
      }
    }

    return (
      <div className="space-y-2 text-[1.2vw] font-cursive">
        {allMessages.map((msg) => (
          <div key={msg.key} className={`p-1 rounded-lg `}>
            <strong className="mr-2">{msg.type === 'Q' ? 'Q:' : 'A:'}</strong> 
            {msg.message}
          </div>
        ))}
      </div>
    );
  };
  
  if ((type === "suspect" && !suspect) || (type === "evidence" && !evidence)) {
    return <div className="text-center text-red-500">정보를 찾을 수 없습니다.</div>;
  }

  const PopupWrapper = ({ children }: { children: React.ReactNode }) => (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="relative max-w-[30vw] w-full max-h-[70vh] overflow-y-auto scrollbar-hide"
        style={{
          backgroundImage: 'url("/images/CheckEv.png")',
          backgroundSize: 'cover',  
          backgroundPosition: 'center',  
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );

  if (type === "suspect" && suspect) {
    return (
      <PopupWrapper>
        <div className="p-[2.2vh]">
          <div className="flex flex-col items-center mb-[1vh]">
            <img
              src={suspect.image}
              alt={suspect.name}
              className="w-[8vw] h-[8vw] object-cover rounded-full mb-[0.5vh] shadow-md"
            />
            <h2 className="text-[2.2vw] font-bold font-cursive">{`${suspect.job} ${suspect.name}`}</h2>
          </div>
          
          <div className="grid grid-cols-2 gap-[1.2vh] mb-[2vh] text-[1.6vw] font-cursive">
            <div><strong>Age:</strong> {suspect.age}세</div>
            <div><strong>Gender:</strong> {suspect.gender ? '여성' : '남자'}</div>
            <div><strong>Job:</strong> {suspect.job}</div>
          </div>

          <div className="mb-[2vh] bg-transparent">
            <h3 className="font-cursive font-bold text-[1.6vw] mb-[0.5vh]">Description</h3>
            <p className="text-[1.2vw] font-cursive" style={{ wordBreak: "keep-all" }}>{suspect.description}</p>
          </div>

          <div className="mb-[2vh] bg-transparent">
            <h3 className="font-cursive font-bold text-[1.6vw] mb-[0.5vh]">Initial Statement</h3>
            <p className="text-[1.2vw] font-cursive" style={{ wordBreak: "keep-all" }}>{suspect.init_chat}</p>
          </div>

          <div className="mb-[4vh] bg-transparent">
            <h3 className="font-cursive text-[1.6vw] font-bold mb-[0.5vh]">Chat History</h3>
            <div className="max-h-[46vh] overflow-y-auto scrollbar-hide">
              {renderChatHistory()}
            </div>
          </div>
        </div>
      </PopupWrapper>
    );
  }

  if (type === "evidence" && evidence) {
    return (
      <PopupWrapper>
        <div className="p-6 text-center font-cursive">
          <img
            src={evidence.image}
            alt={evidence.name}
            className="w-[12vw] h-[12vw] object-cover rounded-lg mx-auto mb-6 shadow-md"
          />
          <h2 className="text-[2.5vw] font-bold mb-4 font-cursive">{evidence.name}</h2>
          <p className="text-[1.2vw] font-cursive " style={{ wordBreak: "keep-all" }}>{evidence.description}</p>
        </div>
      </PopupWrapper>
    );
  }

  return null;
};

export default CheckEv;