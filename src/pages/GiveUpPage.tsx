import React from "react";

const GiveUpPage: React.FC = () => {
    return (
        <div className="fixed inset-0 bg-cover bg-center"
        style={{
            backgroundImage: 'url(/images/GiveUpPage.png)',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            backgroundBlendMode: 'multiply',
        }}
        >
            <div className="absolute left-[30%] transform -translate-x-1/2"
            style={{ top: '100px'}}
            >
                <img
                    src="/images/WantedSuspect.png"
                    alt="Wanted Suspect"
                    className="w-96 h-auto rounded-lg shadow-md"
                />
                <div className="absolute left-[51%] transform -translate-x-1/2"
                style={{ top: '170px'}}
                >
                    <img
                        src="/images/Suspect1.png"
                        alt="Wanted Suspect"
                        className="shadow-md"
                        style={{ width: '160px', height: '160px'}}
                    />
                </div>
                <div className="absolute bottom-[38%] left-[50%] transform -translate-x-1/2 text-center opacity-0 animate-stamp"
                style={{
                    animationDelay: '0.5s',
                    animationFillMode: 'forwards',
                }}
                >
                    <img
                        src="/images/WANTED.png"
                        alt="WANTED Stamp"
                        className="rounded-lg max-w-none"
                        style={{ width: '240px', height: '150px' }}
                    />
                </div>
            </div>
            <p className="absolute bottom-[17%] left-[25%] font-Binggrae text-white font-bold drop-shadow-md"
            style={{fontSize: "30px"}}
            >
                범인 김민수
            </p>

            <div
            className="flex items-center justify-center left-[50%] fixed inset-0"
            >
                <div
                    className="p-4 rounded-lg shadow-md text-white"
                    style={{
                    width: "500px",
                    height: "500px",
                    }}
                >
                    <p className="font-Binggrae text-white font-bold drop-shadow-md text-left leading-relaxed" 
                    style={{ fontSize: "30px" }}
                    >
                        범행 동기 : 지나친 소유욕
                        <br />
                        <br />
                        너무 갖고 싶은 작품이었는데  
                        가질 수 있는 방법이 없어  
                        훔치기로 결정.
                        <br />
                        <br />
                        00년 00월 00일 박물관에 잡입 후  
                        지문이 남지 않도록 장갑을 착용한 채  
                        미술품을 훔쳐 달아났지만 CCTV에 모습이 찍힘.
                    </p>
                </div>
            </div>
        </div>
    );
  };
  
  export default GiveUpPage;
  