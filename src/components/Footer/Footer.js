import React from "react";
import "./Footer.css";
import {FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="footer">
      <span className="footer_title">Built using PokeAPI, React and Material-UI</span>
      <div className="year">Ⓒ 2022 Pokemon. All Rights Reserved</div>
      <div className="footer_icon">
      <a href="https://github.com" target="_blank" rel="noreferrer"><FaGithub className="icon"/></a>
      </div>
    </div>
  );
};

export default Footer;
