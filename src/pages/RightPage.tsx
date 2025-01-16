import React, { useState } from "react";
import CheckEv from "./HistoryPopUp.tsx"; // 팝업 컴포넌트 가져오기

const RightPage: React.FC = () => {
  const [activePopup, setActivePopup] = useState<string | null>(null);

  const openPopup = (id: string) => {
    setActivePopup(id); // 팝업 열기
    const audio = new Audio("/sounds/book.mp3");
      audio.play();
  };

  const closePopup = () => {
    setActivePopup(null); // 팝업 닫기
    const audio = new Audio("/sounds/book.mp3");
      audio.play();
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-start space-y-4 p-6">
      {/* Title */}
      <h1 className="text-3xl 2xl:text-4xl font-cursive font-bold">Suspect List</h1>

      {/* Suspects */}
      <div
        className="flex flex-wrap justify-center items-start
        gap-4 sm:gap-1 md:gap-1 lg:gap-2 xl:gap-4 2xl:gap-8 3xl:gap-16 4xl:gap-32"
      >
        {/* Suspect 1 */}
        <div
          className="flex flex-col items-center relative cursor-pointer"
          onClick={() => openPopup("suspect1")}
        >
          <img
            src="/images/Suspect1.png"
            alt="Suspect 1"
            className="w-24 h-24 object-cover shadow-lg
            sm:w-28 sm:h-28 md:w-28 md:h-28 lg:w-28 lg:h-28 xl:w-28 xl:h-28 2xl:w-32 2xl:h-32 3xl:w-36 3xl:h-36 4xl:w-40 4xl:h-40"
          />
            {/* WANTED 이미지 */}
            <img
            src="/images/WANTED.png"
            alt="WANTED"
            className="absolute top-[40%] left-1/2 object-contain transform -translate-x-1/2 -translate-y-1/2"
          />

          <p className="mt-2 text-center text-lg sm:text-xl md:text-2xl font-cursive font-semibold">
            화가 김민수
          </p>
        </div>

        {/* Suspect 2 */}
        <div
          className="flex flex-col items-center relative cursor-pointer"
          onClick={() => openPopup("suspect2")}
        >
          <img
            src="/images/Suspect2.png"
            alt="Suspect 2"
            className="w-24 h-24 object-cover shadow-lg
            sm:w-28 sm:h-28 md:w-28 md:h-28 lg:w-28 lg:h-28 xl:w-28 xl:h-28 2xl:w-32 2xl:h-32 3xl:w-36 3xl:h-36 4xl:w-40 4xl:h-40"
          />
          <p className="mt-2 text-center text-lg sm:text-xl md:text-2xl font-cursive font-semibold">
            경비인 이지원
          </p>
        </div>

        {/* Suspect 3 */}
        <div
          className="flex flex-col items-center relative cursor-pointer"
          onClick={() => openPopup("suspect3")}
        >
          <img
            src="/images/Suspect3.png"
            alt="Suspect 3"
            className="w-24 h-24 object-cover shadow-lg
            sm:w-28 sm:h-28 md:w-28 md:h-28 lg:w-28 lg:h-28 xl:w-28 xl:h-28 2xl:w-32 2xl:h-32 3xl:w-36 3xl:h-36 4xl:w-40 4xl:h-40"
          />
          <p className="mt-2 text-center text-lg sm:text-xl md:text-2xl font-cursive font-semibold">
            큐레이터 장현우
          </p>
        </div>
      </div>

      {/* Evidence List */}
      <h2 style={{ marginTop: "3rem", marginBottom: "-1rem" }} className="text-3xl 2xl:text-4xl font-cursive font-bold">Evidence List</h2>
      <div className="flex flex-wrap justify-center items-start gap-4 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12 2xl:gap-16 3xl:gap-20 4xl:gap-24">
        {/* Evidence 1 */}
        <div
          className="flex flex-col items-center cursor-pointer"
          onClick={() => openPopup("evidence1")}
        >
          <img
            src="/images/Evidence1.png"
            alt="Evidence 1"
            className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 object-cover"
          />
          <p className="mt-2 text-center text-sm sm:text-base md:text-lg font-cursive font-semibold">
            미술관 지하 주차장에서 발견된 장갑
          </p>
        </div>

        {/* Evidence 2 */}
        <div
          className="flex flex-col items-center cursor-pointer"
          onClick={() => openPopup("evidence2")}
        >
          <img
            src="/images/Evidence2.png"
            alt="Evidence 2"
            className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 object-cover"
          />
          <p className="mt-2 text-center text-sm sm:text-base md:text-lg font-cursive font-semibold">
            보안실 모니터링 시스템 로그
          </p>
        </div>
      </div>

      {/* Popup */}
      {activePopup && <CheckEv id={activePopup} type={activePopup.startsWith("suspect") ? "suspect" : "evidence"} onClose={closePopup} />}
    </div>
  );
};

export default RightPage;
