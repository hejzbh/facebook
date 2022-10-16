import React from "react";

export const Button = ({
  title,
  color,
  type,
  bg,
  stretch,
  onClick,
  Icon,
  customStyle = {},
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      style={{
        borderRadius: "14px",
        fontFamily: "Roboto, sans-serif",
        border: 0,
        outline: 0,
        color: color,
        cursor: "pointer",
        background: bg,
        fontSize: "20px",
        padding: "1.2em",
        width: stretch ? "100%" : "fit-content",
        marginTop: "1em",
        boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
        ...customStyle,
      }}
    >
      {Icon && Icon}
      {title && title}
    </button>
  );
};
