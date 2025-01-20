import React from "react";
import {useState} from "react";
import { useNavigate } from "react-router-dom";
import '../components/SignupBox.css';
import axios from "axios";

const SignupBox: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const {name, email, password, confirmPassword} = formData;

    if(!name.trim()) {
      setError("* 이름을 입력해주세요.");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("* 올바른 이메일 형식을 입력해주세요.");
      return false;
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if(!passwordRegex.test(password)) {
      setError("* 비밀번호는 8자 이상이며 영문과 숫자를 조합해야 합니다.");
      return false;
    }

    if(password !== confirmPassword) {
      setError("* 비밀번호가 일치하지 않습니다.");
      return false;
    }

    setError("");
    return true;
  };

  const handleSubmit = async () => {
    if(validateForm()) {
      try {
        const {name, email, password, confirmPassword} = formData;

        const response = await axios.post("https://ailibi.click/api/v1/auth", {
          name,
          email,
          password,
          password_check: confirmPassword,
        });

        if (response.status === 201) {
          setSuccess("회원가입이 성공적으로 완료되었습니다!");
          setError("");

          setTimeout(() => navigate("/loginbox"), 2000);
        }
      } catch (error: any) {
        if(axios.isAxiosError(error)) {
          if(error.response?.status === 400) {
            setError("입력값이 유효하지 않습니다. 다시 확인해주세요.");
          } else {
            setError("네트워크 오류가 발생했습니다.");
          }
        }
      }
    }
  };

  return (
    <div className="login-page">
      {/* 배경 */}
      <div className="background-image"></div>

      {/* 회원가입 박스 */}
      <div className="sign-box">
        <div className="sign-header">
          <img src="../../images/Logo.png" alt="Logo" className="sign-logo" />
          <div className="sign-title-contain">
            <h1 className="sign-minititle">AI.DETECTIVE</h1>
            <h1 className="sign-title">AILIBI</h1>
          </div>
          <p className="sign-subtitle">신입 탐정 등록</p>
          <img src="../../images/profile.png" alt="profile" className="sign-profile" />
        </div>
        <div className="sign-body"> 
          <div className="sign-group">
            <input 
              required
              type="text"
              name="name"
              className="sign-input"
              value={formData.name}
              onChange={handleInputChange}
            />
            <label className="sign-user-label">Detective Name</label>
          </div>
          <div className="sign-group">
            <input 
              required
              type="text"
              name="email"
              className="sign-input" 
              value={formData.email}
              onChange={handleInputChange}
            />
            <label className="sign-user-label">Detective E-mail</label>
          </div>
          <div className="sign-group">
            <input 
              required
              type="password" 
              name="password"
              className="sign-input" 
              value={formData.password}
              onChange={handleInputChange}
            />
            <label className="sign-user-label">Password</label>
          </div>
          <div className="sign-group">
            <input 
              required
              type="password"
              name="confirmPassword"
              className="sign-input" 
              value={formData.confirmPassword}
              onChange={handleInputChange}
            />
            <label className="sign-user-label">Password Check</label>
          </div>
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}
        </div>
        <div className="sign-footer">
          <button className="sign-button" 
        onClick={handleSubmit}
        >Registration</button>
        </div>
      </div>
    </div>
  );
};

export default SignupBox;
