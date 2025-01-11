import "./CardBack.css"

const CardBack: React.FC = () => {
    return (
        <div className="back-box">
            <img src="/images/Logo.png" alt="Logo" className="logo" />
            <div className="title-box">
                <h1 className="minititle">AI.DETECTIVE</h1>
                <h1 className="title">AILIBI</h1>
            </div>
        </div>
    );
};

export default CardBack;