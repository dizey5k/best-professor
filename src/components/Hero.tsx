import React from "react";
import "./styles/Hero.scss";
import header from "/header.png";

interface HeroProps {
  onLogout?: () => void;
}

const Hero: React.FC<HeroProps> = ({ onLogout }) => {
  return (
    <div className="hero">
      <div className="headerHero">
        <img className="headerLogo" src={header} alt="Лого" />
        {onLogout && (
          <button className="logoutButton" onClick={onLogout}>
            Выйти
          </button>
        )}
      </div>
      <div className="left">
        <h1>Участвуйте в конкурсе и выберите лучших преподавателей</h1>
        <p>
          Студенты выбирают лучших преподавателей в 6 номинациях. Голосуйте на
          сайте: в каждой номинации можно отметить от 1 до 8 педагогов.
        </p>
      </div>
      <div className="right">
        <h1>Проголосуйте за любимого преподователя ниже</h1>
      </div>
    </div>
  );
};

export default Hero;
