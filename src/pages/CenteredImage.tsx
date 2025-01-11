import { useState, useEffect } from "react";
import "./CenteredImage.css";
import LoginBox from "../login/LoginBox";
import CardBack from "../start(2)/CardBack";

const CenteredImage: React.FC = () => {
  const [startZoom, setStartZoom] = useState(false);
  const [showImages, setShowImages] = useState(false);
  const [hideWallets, setHideWallets] = useState(false);
  const [flipCard, setFlipCard] = useState(false); // 카드 회전 상태

  useEffect(() => {
    const zoomTimer = setTimeout(() => {
      setStartZoom(true); // 줌인 애니메이션 시작
    }, 500);

    const imageTimer = setTimeout(() => {
      setShowImages(true); // 이미지 표시
    }, 1500);

    const hideTimer = setTimeout(() => {
      setHideWallets(true); // 지갑 내려가면서 사라짐
    }, 3500);

    return () => {
      clearTimeout(zoomTimer);
      clearTimeout(imageTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  const handleCardClick = () => {
    setFlipCard(true); // 카드 회전
  };

  return (
    <div className={`centered-image-container ${startZoom ? "zoom-in" : ""}`}>
      {/* 지갑 이미지 */}
      {showImages && (
        <img
          src="/images/wallet.png"
          alt="Wallet"
          className={`wallet-image ${hideWallets ? "move-down" : ""}`}
        />
      )}

      {/* ID 카드 */}
      {showImages && (
        <div
          className={`idcard-container ${flipCard ? "flip" : ""}`} // flip 클래스 추가
          onClick={handleCardClick} // 클릭 이벤트
        >
          {/* 카드 앞면: 로그인 박스 */}
          <div className="idcard-front">
          <CardBack />
          </div>

          {/* 카드 뒷면 */}
          <div className="idcard-back">
          <LoginBox />
          </div>
        </div>
      )}

      {/* 자른 지갑 이미지 */}
      {showImages && (
        <img
          src="/images/CuttingWallet.png"
          alt="Cutting Wallet"
          className={`cutting-wallet ${hideWallets ? "move-down" : ""}`}
        />
      )}
    </div>
  );
};

export default CenteredImage;
