import React, { useState } from "react";
import { Button } from "antd";
import { FaArrowCircleUp } from "react-icons/fa";
import COLOR from "../constants/colors";

const ScrollTopButton = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    // alert("abc");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
      /* you can also use 'auto' behaviour
         in place of 'smooth' */
    });
  };

  window.addEventListener("scroll", toggleVisible);

  return (
    <div
      style={{
        position: "fixed",
        width: "100%",
        left: "92%",
        bottom: 40,
        height: 20,
        fontSize: "3rem",
        cursor: "pointer",
        zIndex: 50,
        color: COLOR.green,
      }}
    >
      <FaArrowCircleUp
        onClick={() => scrollToTop()}
        style={{ display: visible ? "inline" : "block" }}
      />
    </div>
  );
};

export default ScrollTopButton;
