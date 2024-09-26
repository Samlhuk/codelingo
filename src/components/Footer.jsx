// src/components/Header.jsx
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

const Footer = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <footer className="sticky bottom-0 z-40 w-full h-12 border-t backdrop-blur transition-colors duration-500 lg:z-50 lg:border-b lg:border-slate-900/10 dark:border-slate-50/[0.06] bg-white/60 supports-backdrop-blur:bg-white/10 dark:bg-transparent">
      <span className="text-center mx-auto block pt-2">
        Codelingo is for demonstration purposes only
      </span>
    </footer>
  );
};

export default Footer;
