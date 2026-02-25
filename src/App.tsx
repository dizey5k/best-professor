import React, { useState } from "react";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import "./index.css";
import CriteriaSection from "./components/CriteriaSection";
import { criteriaList } from "./mocks/criteria";
import LoginPage from "./components/LoginPage";

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <div className="App">
      {!isAuthenticated ? (
        <LoginPage onLoginSuccess={handleLoginSuccess} />
      ) : (
        <div>
          <Hero onLogout={handleLogout} />
          <main>
            {criteriaList.map((criteria, index) => (
              <CriteriaSection
                key={criteria.id}
                criteria={criteria}
                index={index + 1}
              />
            ))}
          </main>
          <Footer />
        </div>
      )}
    </div>
  );
};

export default App;
