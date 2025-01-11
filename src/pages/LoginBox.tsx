import "./LoginBox.css";

const LoginBox: React.FC = () => {
  return (
    <div className="login-box">
      <div className="login-header">
        <img src="/images/Logo.png" alt="Logo" className="logo" />
        <div className="title-contain">
          <h1 className="minititle">AI.DETECTIVE</h1>
          <h1 className="title">AILIBI</h1>
        </div>
        <p className="subtitle">탐정 사무소 입장</p>
      </div>
      <img src="./images/profile.png" alt="Profile" className="profile"/>
      <div className="login-body">
        <input
          type="text"
          placeholder="Detective E-mail"
          className="login-input"
        />
        <input
          type="password"
          placeholder="Password"
          className="login-input"
        />
      </div>
      <div className="login-footer">
        <button className="login-button">Enter Office</button>
      </div>
    </div>
  );
};

export default LoginBox;