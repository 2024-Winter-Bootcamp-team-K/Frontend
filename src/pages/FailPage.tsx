const FailPage = () => {
    return (
        <div
            className="fixed flex-2 inset-0 bg-cover bg-center bg-no-repeat"
            style={{
            backgroundImage: 'url(/images/FailPage.png)',
            height: '105vh',
            }}
        >
        <div className="absolute bottom-52 right-[5%] transform -translate-x-1/2 text-center">
            <button
                className="w-44 px-6 text-lg font-semibold text-red-500 border-2 border-red-500 bg-white bg-opacity-70 rounded-lg shadow-md focus:outline-none"
                onClick={() => alert('다시 도전하기')}
            >
                다시 도전하기
            </button>
        </div>
        <div className="absolute bottom-36 right-[5%] transform -translate-x-1/2 text-center">
            <button
                className="w-44 px-10 text-lg font-semibold text-red-500 border-2 border-red-500 bg-white bg-opacity-70 rounded-lg shadow-md focus:outline-none"
                onClick={() => alert('포기 하기')}
            >
                포기 하기
            </button>
        </div>
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-center">
            <p
                className="px-10 py-1 text-lg font-semibold text-black border border-black bg-white bg-opacity-70 rounded-lg shadow-md focus:outline-none"
                style={{ width: '730px'}}
            >
                "내가 추리에 실패하다니..."
            </p>
        </div>
      </div>
    );
  };
  
  export default FailPage;
  