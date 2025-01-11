import React from 'react';

const InitChatPage: React.FC = () => {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-[#181818] text-white">
      {/* 제목 */}
      <h1
        className="font-intelmono text-xl font-bold text-center mb-8"
        style={{ fontSize: '30px' }}
      >
        기밀 사건 파일 #2024-12-30
      </h1>

      {/* 파란색 창 */}
      <div
        className="font-intelmono relative p-6 rounded-lg w-full max-w-4xl w-[800px] h-[400px] flex flex-col justify-center"
        style={{
          backgroundColor: '#1E305A',
          boxShadow: 'inset 0px 10px 30px rgba(24, 23, 32, 0.7), inset 0px -10px 30px rgba(0, 0, 0, 0.7)',
        }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {/* 인물 1 */}
          <div className="flex flex-col items-center h-48 relative">
            <p className="absolute top-[-50px] text-center text-sm w-32 sm:w-52">
              그날 밤 사무실에서 다음 전시 준비 중이었습니다.
            </p>
            <img
              src="/images/Suspect1.png"
              alt="화가 김민수"
              className="absolute bottom-8 w-28 h-24 sm:w-32 sm:h-32"
            />
            <p className="absolute bottom-[-10px] text-center text-lg font-bold">화가 김민수</p>
          </div>

          {/* 인물 2 */}
          <div className="flex flex-col items-center h-48 relative">
            <p className="absolute top-[-50px] text-center text-sm w-32 sm:w-52">
              순찰 일지에 따르면 사건 발생 시각에 1층에서 순찰 중이었습니다.
            </p>
            <img
              src="/images/Suspect2.png"
              alt="경비원 이지원"
              className="absolute bottom-8 w-28 h-24 sm:w-32 sm:h-32"
            />
            <p className="absolute bottom-[-10px] text-center text-lg font-bold">경비원 이지원</p>
          </div>

          {/* 인물 3 */}
          <div className="flex flex-col items-center h-48 relative">
            <p className="absolute top-[-50px] text-center text-sm w-32 sm:w-52">
              CCTV에 그날 밤 9시에 퇴근하는 모습이 찍혔습니다만...
            </p>
            <img
              src="/images/Suspect3.png"
              alt="큐레이터 장현우"
              className="absolute bottom-8 w-28 h-24 sm:w-32 sm:h-32"
            />
            <p className="absolute bottom-[-10px] text-center text-lg font-bold">큐레이터 장현우</p>
          </div>
        </div>
      </div>

      {/* 수사 시작하기 버튼 */}
      <button
        className="mt-8 px-8 py-3 text-white text-lg font-intelmono"
        style={{ fontSize: '25px' }}
      >
        수사 시작하기
      </button>
    </div>
  );
};

export default InitChatPage;