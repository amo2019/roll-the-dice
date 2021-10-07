import React from "react";
import "./Dice.css";

export default function Dice(props) {
  console.log("reset:",props);
  return (
    <div className="dice">
      <ol className="die-list even-roll" data-roll="1" id="die-1">
        <li
          style={{ backgroundColor: `${props.color}` }}
          className="die-item"
          data-side="1"
        >
          <span className="dot"></span>
        </li>
        <li
          style={{ backgroundColor: `${props.color}` }}
          className="die-item"
          data-side="2"
        >
          <span className="dot"></span>
          <span className="dot"></span>
        </li>
        <li
          style={{ backgroundColor: `${props.color}` }}
          className="die-item"
          data-side="3"
        >
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </li>
        <li
          style={{ backgroundColor: `${props.color}` }}
          className="die-item"
          data-side="4"
        >
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </li>
        <li
          style={{ backgroundColor: `${props.color}` }}
          className="die-item"
          data-side="5"
        >
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </li>
        <li
          style={{ backgroundColor: `${props.color}` }}
          className="die-item"
          data-side="6"
        >
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </li>
      </ol>
    </div>
  );
}

// {props.reset ? "1" : "2"}  new feature