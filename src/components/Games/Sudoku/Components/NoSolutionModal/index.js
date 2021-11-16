import React from "react";
import { Button } from "@mui/material";

import "./styles.css";

const NoSolutionFoundModal = ({ closeModal }) => {
  return (
    <div className="NoSolutionFoundModal">
      <div className="modal-container">
        <div className="modal-close-btn-container">
          <button onClick={closeModal}>X</button>
        </div>
        <div className="modal-title">
          <h1>No Solution Found</h1>
          <h1 className="NoSolFound__emote">😔</h1>
        </div>
        <div className="modal-body">
          <p>
            The Current Grid Doesnot have any solution, please change some cell values.
          </p>
        </div>
        <div className="modal-footer">
          <Button
            onClick={closeModal}
            className="NoSolFound__btn"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NoSolutionFoundModal;