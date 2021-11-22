import React from "react";

import { Button } from "@mui/material";

import "./styles.css";

const GameDetails = ({
  closeModal,
  movesTaken,
  hintsTaken,
  startTime,
  isPlayerWon,
  pressedSolve,
  gameMode,
  mediumMaxEmptyCells,
  hardMaxEmptyCells,
}) => {

  let gameModeName = "Easy";
  if (gameMode === mediumMaxEmptyCells) gameModeName = "Medium";
  else if (gameMode === hardMaxEmptyCells) gameModeName = "Hard";

  return (
    <div className="GameDetails">
      <div className="modal-container">
        <div className="modal-close-btn-container">
          <button onClick={closeModal}>X</button>
        </div>
        <div className="modal-title">
          <h1>Game Details</h1>
        </div>
        <div className="modal-body">
          <h1 className="Details__emote">
            <span role="img" aria-label="lovely">🤩</span>
          </h1>
          {isPlayerWon && <p>You Won !</p>}
          {!isPlayerWon && <p>Keep Playing you will surely complete it!</p>}
          <p>Game mode: {gameModeName}</p>
          <p>Moves Played: {movesTaken}</p>
          <p>Hints Taken: {hintsTaken}</p>
          <small>Started at: {startTime.split("GMT")[0]}</small>
        </div>
        <div className="modal-footer">
          <Button
            onClick={closeModal}
            text="Continue"
          />
        </div>
      </div>
    </div>
  );
};

export default GameDetails;