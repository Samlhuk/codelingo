// src/components/Header.jsx
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import logo from "../assets/codeo-sqr.png";

const Header = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogoClick = () => {
    if (user) {
      navigate("/profile");
    } else {
      navigate("/");
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full h-16 backdrop-blur transition-colors duration-500 lg:z-50 lg:border-b lg:border-slate-900/10 dark:border-slate-50/[0.06] bg-white/95 supports-backdrop-blur:bg-white/60 dark:bg-transparent">
      <h1
        onClick={handleLogoClick}
        className="text-2xl font-bold text-sky-700 cursor-pointer w-48 text-center mx-auto py-4"
      >
        <img src={logo} alt="codeo" className="w-10 inline pr-2 -mt-2" />
        Codelingo
      </h1>
    </header>
  );
};

export default Header;
