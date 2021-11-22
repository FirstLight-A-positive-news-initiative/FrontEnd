import React from "react";
import { Button } from "@mui/material";

import Easy from "../../../../../assets/images/Sudoku_Easy.png";
import Medium from "../../../../../assets/images/Sudoku_Medium.png";
import Hard from "../../../../../assets/images/Sudoku_Hard.png";

import "./styles.css";

const DifficultySelectionModal = ({
  closeModal,
  handleNewGame,
  easyMaxEmptyCells,
  mediumMaxEmptyCells,
  hardMaxEmptyCells
}) => {

  return (
    <div className="DifficultySelectionModal">
      <div className="modal-container">
        <div className="modal-close-btn-container">
          <button onClick={closeModal}>X</button>
        </div>
        <div className="modal-title">
          <h1>Difficulty Mode</h1>
        </div>
        <div className="difficulty-modal-body">
          <div className="difficulty-selection-container">
            <div className="difficulty easy" onClick={() => handleNewGame(easyMaxEmptyCells)}>
              <div
                className="animation-container-difficulty"
              >
                <img className="SelectDifficulty__img" src={Easy} alt="hard" />
              </div>
              <p>Easy</p>
            </div>

            <div
              className="difficulty medium"
              onClick={() => handleNewGame(mediumMaxEmptyCells)}
            >
              <div
                className="animation-container-difficulty"
              >
                <img className="SelectDifficulty__img" src={Medium} alt="hard" />
              </div>
              <p>Medium</p>
            </div>

            <div className="difficulty hard" onClick={() => handleNewGame(hardMaxEmptyCells)}>
              <div
                className="animation-container-difficulty"
              >
                <img className="SelectDifficulty__img" src={Hard} alt="hard" />
              </div>
              <p>Hard</p>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <Button
            onClick={closeModal}
            className="Difficulty__btn"
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DifficultySelectionModal;