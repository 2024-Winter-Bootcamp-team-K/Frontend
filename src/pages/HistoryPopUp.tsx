import React from "react";

interface CheckEvProps {
  id: string;
  type: "suspect" | "evidence";
  onClose: () => void;
}

const CheckEv: React.FC<CheckEvProps> = ({ id, type, onClose }) => {
  const suspectData: { [key: string]: any } = {
    suspect1: {
      name: "화가 김민수",
      details: {
        age: "42세",
        gender: "남성",
        job: "미술관 큐레이터",
        statement: "그날 밤 내내 사무실에서 다음 전시 준비를 하고 있었습니다.",
      },
      questions: [
        { q: "넌 어디서 뭘 했지?", a: "전 여기서 이걸 했습니다." },
        { q: "CCTV에는 너가 이때 미술관에 들어왔어. 맞아?", a: "맞습니다." },
        { q: "미술관에 들어와서 뭘 했지?", a: "앞서 말했듯, 사무실에서 다음 전시를 준비하고 있었습니다." },
      ],
      image: "/images/Suspect1.png",
    },
    suspect2: {
      name: "경비원 이지원",
      details: {
        age: "35세",
        gender: "여성",
        job: "미술관 경비원",
        statement: "전 항상 근무 중이었고, 순찰을 돌고 있었습니다.",
      },
      questions: [
        { q: "넌 어디서 뭘 했지?", a: "전 순찰 중이었습니다." },
        { q: "CCTV에는 네가 미술관 내를 돌아다닌 기록이 있어. 맞아?", a: "맞습니다." },
        { q: "그 시간에 수상한 건 없었어?", a: "특별히 수상한 점은 없었습니다." },
      ],
      image: "/images/Suspect2.png",
    },
    suspect3: {
      name: "큐레이터 장현우",
      details: {
        age: "29세",
        gender: "남성",
        job: "큐레이터",
        statement: "전 전시장 점검을 마치고 집으로 갔습니다.",
      },
      questions: [
        { q: "넌 어디서 뭘 했지?", a: "전 전시장 점검 중이었습니다." },
        { q: "CCTV에는 너가 전시실 주변을 서성인 기록이 있어. 맞아?", a: "네, 맞습니다." },
        { q: "전시실에서 뭘 했지?", a: "전 점검만 하고 아무것도 손대지 않았습니다." },
      ],
      image: "/images/Suspect3.png",
    },
  };

  const evidenceData: { [key: string]: any } = {
    evidence1: {
      name: "미술관 지하 주차장에서 발견된 장갑",
      description: "검은색 가죽 장갑. 복원 작업실에서 사용하는 것과 동일한 제품 내부에서 김민수의 ID카드 잔여 지문 발견",
      image: "/images/Evidence1.png",
    },
    evidence2: {
      name: "보안실 모니터링 시스템 로그",
      description: "잠온다.",
      image: "/images/Evidence2.png",
    },
  };

  const suspect = type === "suspect" ? suspectData[id] : null;
  const evidence = type === "evidence" ? evidenceData[id] : null;

  if (type === "suspect" && !suspect) return null;
  if (type === "evidence" && !evidence) return null;

  if (type === "suspect")
    return (
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        onClick={onClose}
      >
        {/* 팝업 컨테이너 */}
        <div
          className="p-6 shadow-lg max-w-lg w-full h-auto flex flex-col relative"
          onClick={(e) => e.stopPropagation()} // 팝업 내부 클릭 방지
          style={{
            backgroundImage: 'url("/images/CheckEv.png")',
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Suspect Content */}
          <div className="flex items-start">
            {/* 왼쪽: 이미지와 이름 */}
            <div className="flex flex-col items-center ml-8 mr-8">
              <img
                src={suspect.image}
                alt={suspect.name}
                className="w-36 h-36 object-cover mb-4"
              />
              <h2 className="text-center text-3xl font-cursive font-bold">{suspect.name}</h2>
            </div>
            {/* 오른쪽: Details */}
            <div className="flex flex-col text-xl">
              <p className="font-cursive font-semibold mb-2">age: {suspect.details.age}</p>
              <p className="font-cursive font-semibold mb-2">gender: {suspect.details.gender}</p>
              <p className="font-cursive font-semibold mb-2">job: {suspect.details.job}</p>
              <p
                className="font-cursive font-semibold mb-2 break-words whitespace-pre-wrap"
                style={{ wordBreak: "break-word", maxWidth: "250px" }}
              >
                init statement: <br /> {suspect.details.statement}
              </p>
            </div>
          </div>
          <hr className="my-4" />
          {/* Q&A Section */}
          <div
            className="border border-black rounded-md p-4 max-h-60 overflow-y-auto"
          >
            {suspect.questions.map((item: any, index: number) => (
              <p key={index} className="mb-4 font-cursive font-semibold text-xl">
                <strong>Q:</strong> {item.q} <br />
                <strong>A:</strong> {item.a}
              </p>
            ))}
          </div>
        </div>
      </div>
    );
    if (type === "evidence") {
      return (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={onClose}
        >
          {/* 팝업 컨테이너 */}
          <div
            className="p-6 shadow-lg max-w-lg w-full h-[500px] flex flex-col items-center relative"
            onClick={(e) => e.stopPropagation()} // 팝업 내부 클릭 방지
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
              style={{ margin: "0 auto" }} // 이미지 가운데 정렬
            />
            <h2 className="text-3xl font-cursive font-bold text-center mt-8 mb-8">{evidence.name}</h2>
            <p
              className="text-xl font-cursive mb-8 break-words whitespace-pre-wrap"
              style={{ wordBreak: "break-word", maxWidth: "300px" }}
            > {evidence.description}</p>
          </div>
        </div>
      );
    }
  
};

export default CheckEv;
