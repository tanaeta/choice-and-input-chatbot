import React from "react";

const Options = ({ options, actionProvider }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {options.map((option, index) => (
        <button
          key={index}
          style={{
            margin: "5px",
            padding: "10px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={() => actionProvider.handleOptionClick(option.id)}
        >
          {option.text}
        </button>
      ))}
    </div>
  );
};

export default Options;
