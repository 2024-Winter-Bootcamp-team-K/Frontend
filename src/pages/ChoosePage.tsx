import React from 'react';

const ChoosePage = () => {
  return (
    <div
      className="fixed inset-0 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: 'url(/images/ChoosePage.png)',
      }}
    >
      {/* 텍스트 */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-center">
        <p className="text-white text-4xl font-bold drop-shadow-md">
          진실은 언제나 하나!
        </p>
        <p className="text-white text-4xl font-bold drop-shadow-md mt-4">
          범인은 당신이야!
        </p>
      </div>
    </div>
  );
};

export default ChoosePage;
