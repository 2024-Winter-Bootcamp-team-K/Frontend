import React from "react";

const SuccessPage: React.FC = () =>{
  return (
    <div
    className="fixed inset-0 bg-cover bg-center bg-no-repeat"
    style={{
    backgroundImage: 'url(/images/SuccessPage.png)',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backgroundBlendMode: 'multiply',
    }}
    >

      <div className="absolute bottom-1/2 left-1/2 transform -translate-x-1/2 text-center">
        <p className="font-Binggrae font-bold drop-shadow-md"
        style={{
            fontSize: "80px",
            color: "#FFD700"
        }}
        >
          Congratulations
        </p>
      </div>
    </div>
  );
};

export default SuccessPage;