import React from "react";
import "./styles.css";
import { FaEraser } from "react-icons/fa";
import { Tooltip } from "@mui/material";

const CHOICES1 = [1, 2, 3, 4, 5];
const CHOICES2 = [6, 7, 8, 9];

const ChoiceBoard = ({ setClickValue, selected }) => {
  return (
    <div className="ChoiceBoard">
      <div className="choice-container choices-one">
        {CHOICES1.map((choice) => {
          let selectedClass = choice === selected ? "selected" : "";
          return (
            <div
              className={`choice ${selectedClass} noSelect `}
              key={`key-1-${choice}`}
              onClick={() => setClickValue(choice)}
            >
              <p className="choice-text">{choice}</p>
            </div>
          );
        })}
      </div>
      <div className="choice-container choices-two">
        {CHOICES2.map((choice) => {
          let selectedClass = choice === selected ? "selected" : "";
          return (
            <div
              className={`choice ${selectedClass} noSelect`}
              key={`key-2-${choice}`}
              onClick={() => setClickValue(choice)}
            >
              <p className="choice-text">{choice}</p>
            </div>
          );
        })}

        {/* Eraser class: value of zero */}
        <Tooltip title="Clear Cell">
          <div
            className={`choice 
                    ${selected === 0 ? "selected-eraser" : ""} 
                    noSelect`}
            key={`key-2-${0}`}
            onClick={() => setClickValue(0)}
          >

            <FaEraser />

          </div>
        </Tooltip>
      </div>
    </div>
  );
};

export default ChoiceBoard;