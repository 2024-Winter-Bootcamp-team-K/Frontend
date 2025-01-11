import React from "react";
import "../components/EndingPage.css";

const EndingPage: React.FC = () => {
  return (
    <div className="ending-page">
      <div className="scroll-container">
        <div className="credits">
          <p className="title">CASE SOLVED</p> {/* 가장 큰 크기와 볼드 */}
          <p><br></br></p>
          <p className="subtitle">Play Result</p> {/* 소제목 스타일 */}
          <p>플레이 시간: 1시간 40분</p>
          <p>조사한 증거: 2개</p>
          <p>조사한 용의자: 3명</p>
          <p>진행한 심문: 24회</p>
          <p><br></br></p>
          <p className="subtitle">Techeer-2024-Winter-BootCamp-Team-K</p> {/* 소제목 스타일 */}
          <p>박근채 - Team Leader, CTO</p>
          <p>여상윤 - Backend, DevOps</p>
          <p>박수용 - Backend, DevOps</p>
          <p>이수연 - Frontend</p>
          <p>김승민 - Frontend</p>
          <p>박명남 - Frontend</p>
          <p><br></br></p>
          <p className="subtitle">Thanks For</p> {/* 소제목 스타일 */}
          <p>Andrew Park</p>
          <p>Ryan</p>
          <p>Rena</p>
          <p>Mindy</p>
          <p>Justin</p>
          <p>Sean</p>
          <p>Kate</p>
        </div>
      </div>
    </div>
  );
};

export default EndingPage;
