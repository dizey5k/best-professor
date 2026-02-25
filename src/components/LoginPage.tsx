import React, { useState, useRef, useEffect } from "react";
import "./styles/LoginPage.scss";
import { sendVerificationCode, verifyCode } from "../mocks/codes";
import header from "/header.png";

interface LoginPageProps {
  onLoginSuccess: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState<"email" | "code">("email");
  const [code, setCode] = useState<string[]>(Array(6).fill(""));
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (step === "code") {
      inputRefs.current[0]?.focus();
    }
  }, [step]);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setError("");
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError("Введите email");
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      const exists = sendVerificationCode(email);
      if (exists) {
        setStep("code");
        setError("");
      } else {
        setError("Пользователь с таким email не найден");
      }
      setIsLoading(false);
    }, 500);
  };

  const handleCodeChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newCode = [...code];
    newCode[index] = value.slice(0, 1);
    setCode(newCode);
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fullCode = code.join("");
    if (fullCode.length !== 6) {
      setError("Введите 6-значный код");
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      const isValid = verifyCode(email, fullCode);
      if (isValid) {
        onLoginSuccess();
      } else {
        setError("Неверный код подтверждения");
        setCode(Array(6).fill(""));
        inputRefs.current[0]?.focus();
      }
      setIsLoading(false);
    }, 500);
  };

  const handleBackToEmail = () => {
    setStep("email");
    setCode(Array(6).fill(""));
    setError("");
  };

  const testData = [
    {
      email: "test@edu.spbstu.ru",
      password: "123456",
    },
    {
      email: "user@edu.spbstu.ru",
      password: "654321",
    },
    {
      email: "admin@edu.spbstu.ru",
      password: "111222",
    },
  ];

  return (
    <div className="loginPage">
      <div className="header">
        <img className="headerLogo" src={header} alt="Лого" />
      </div>
      <div className="overlay">
        <div className="text">
          <h1>Конкурс Лучший Преподаватель</h1>
        </div>
        <div className="loginContainer">
          <h1>Вход в систему</h1>
          {step === "email" ? (
            <form onSubmit={handleEmailSubmit} className="emailForm">
              <div className="formGroup">
                <label htmlFor="email">Электронная почта</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="example@edu.spbstu.ru"
                  disabled={isLoading}
                  autoFocus
                />
              </div>
              {error && <div className="errorMessage">{error}</div>}
              <button
                type="submit"
                disabled={isLoading}
                className="submitButton"
              >
                {isLoading ? "Отправка..." : "Получить код"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleCodeSubmit} className="codeForm">
              <p className="emailDisplay">Код отправлен на {email}</p>
              <div className="codeInputs">
                {code.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleCodeChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    ref={(el) => {
                      inputRefs.current[index] = el;
                    }}
                    disabled={isLoading}
                    className="codeDigit"
                    autoComplete="off"
                  />
                ))}
              </div>
              {error && <div className="errorMessage">{error}</div>}
              <div className="codeActions">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="submitButton"
                >
                  {isLoading ? "Проверка..." : "Подтвердить"}
                </button>
                <button
                  type="button"
                  onClick={handleBackToEmail}
                  disabled={isLoading}
                  className="backButton"
                >
                  Назад
                </button>
              </div>
            </form>
          )}
        </div>
        <div className="hint">
          <div className="head">Тестовые данные</div>
          {testData.map((data) => (
            <div className="data">
              <p>
                email: <span>{data.email}</span>
              </p>
              <p>
                code: <span>{data.password}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
