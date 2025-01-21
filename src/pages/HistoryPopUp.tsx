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
  // suspect 데이터 찾기
  const getSuspect = (suspectId: string): Suspect | null => {
    const id = parseInt(suspectId.replace("suspect", ""));
    return suspects.find(s => s.id === id) || null;
  };

  // evidence 데이터 찾기
  const getEvidence = (evidenceId: string): Evidence | null => {
    const index = parseInt(evidenceId.replace("evidence", "")) - 1;
    return evidences[index] || null;
  };

  const suspect = type === "suspect" ? getSuspect(id) : null;
  const evidence = type === "evidence" ? getEvidence(id) : null;

  

  const renderChatHistory = () => {
    if (isLoading) {
      return <p className="text-center font-cursive text-xl">대화 내역을 불러오는 중...</p>;
    }

    if (error) {
      return <p className="text-center font-cursive text-xl text-red-600">{error}</p>;
    }

    if (!chatHistory?.user_chat || !chatHistory?.suspect_chat) {
      return <p className="text-center font-cursive text-xl">대화 내역이 없습니다.</p>;
    }

    return chatHistory.user_chat.map((userChat, chatIndex) => (
      <React.Fragment key={chatIndex}>
        {userChat.message.map((userMsg, msgIndex) => (
          <div key={`user-${chatIndex}-${msgIndex}`} className="mb-4 font-cursive font-semibold text-xl">
            <strong>Q:</strong> {userMsg}
          </div>
        ))}
        {chatHistory.suspect_chat[chatIndex]?.message.map((suspectMsg, msgIndex) => (
          <div key={`suspect-${chatIndex}-${msgIndex}`} className="mb-4 font-cursive font-semibold text-xl">
            <strong>A:</strong> {suspectMsg}
          </div>
        ))}
      </React.Fragment>
    ));
  };
  
  if (type === "suspect" && !suspect) {
    return <div>용의자 정보를 찾을 수 없습니다.</div>;
  }

  if (type === "evidence" && !evidence) {
    return <div>증거 정보를 찾을 수 없습니다.</div>;
  }

  if (type === "suspect" && suspect) {
    return (
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        onClick={onClose}
      >
        <div
          className="p-6 shadow-lg max-w-lg w-full h-auto flex flex-col relative"
          onClick={(e) => e.stopPropagation()}
          style={{
            backgroundImage: 'url("/images/CheckEv.png")',
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="flex items-start">
            <div className="flex flex-col items-center ml-8 mr-8">
              <img
                src={suspect.image}
                alt={suspect.name}
                className="w-36 h-36 object-cover mb-4"
              />
              <h2 className="text-center text-3xl font-cursive font-bold">{`${suspect.job} ${suspect.name}`}</h2>
            </div>
            <div className="flex flex-col text-xl">
              <p className="font-cursive font-semibold mb-2">age: {suspect.age}세</p>
              <p className="font-cursive font-semibold mb-2">gender: {suspect ? '남성' : '여성'}</p>
              <p className="font-cursive font-semibold mb-2">job: {suspect.job}</p>
              <p className="font-cursive font-semibold mb-2">description: {suspect.description}</p>
              <p
                className="font-cursive font-semibold mb-2 break-words whitespace-pre-wrap"
                style={{ wordBreak: "break-word", maxWidth: "250px" }}
              >
                init statement: <br /> {suspect.init_chat}
              </p>
            </div>
          </div>
          <hr className="my-4" />
          <div className="border border-black rounded-md p-4 max-h-60 overflow-y-auto">
            {renderChatHistory()}
          </div>
        </div>
      </div>
    );
  }

  if (type === "evidence" && evidence) {
    return (
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        onClick={onClose}
      >
        <div
          className="p-6 shadow-lg max-w-lg w-full h-[500px] flex flex-col items-center relative"
          onClick={(e) => e.stopPropagation()}
          style={{
            backgroundImage: 'url("/images/CheckEv.png")',
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <img
            src={evidence.image}
            alt={evidence.name}
            className="w-48 h-48 object-cover mb-16"
            style={{ margin: "0 auto" }}
          />
          <h2 className="text-3xl font-cursive font-bold text-center mt-8 mb-8">{evidence.name}</h2>
          <p
            className="text-xl font-cursive mb-8 break-words whitespace-pre-wrap"
            style={{ wordBreak: "break-word", maxWidth: "300px" }}
          >
            {evidence.description}
          </p>
        </div>
      </div>
    );
  }

  return null;
};

export default CheckEv;