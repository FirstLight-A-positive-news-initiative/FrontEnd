import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal"
import "./styles.css";

export default function TicTacToe() {
  const [board, setBoard] = useState([
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ]);

  const [result, setResult] = useState(null);
  const [difficulty, setDifficulty] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalHeading, setModalHeading] = useState("Better Luck next time!");
  const [modalDesc, setModalDesc] = useState("AI won this match!!");
  useEffect(() => {
      changeModal(result);
  })

  const isComplete = (board) => {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === null) return false;
      }
    }
    return true;
  };

  const evaluate = (board, depth) => {
    let score = 0;
    for (let i = 0; i < 3; i++) {
      if (board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
        if (board[i][0] === "X") score = 100 - depth;
        else if (board[i][0] === "O") score = -100 + depth;
      }
    }

    for (let j = 0; j < 3; j++) {
      if (board[0][j] === board[1][j] && board[1][j] === board[2][j]) {
        if (board[0][j] === "X") score = 100 - depth;
        else if (board[0][j] === "O") score = -100 + depth;
      }
    }

    if (board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
      if (board[0][0] === "X") score = 100 - depth;
      else if (board[0][0] === "O") score = -100 + depth;
    }

    if (board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
      if (board[0][2] === "X") score = 100 - depth;
      else if (board[0][2] === "O") score = -100 + depth;
    }

    return score;
  };

  const minimax = (board, isMaximizing, depth) => {
    const ev = evaluate(board, depth);

    if (ev === 0 && isComplete(board)) return 0;
    else if (ev > 0) return ev;
    else if (ev < 0) return ev;
    else {
      if (isMaximizing) {
        let value = -1000;
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            if (board[i][j] === null) {
              board[i][j] = "X";
              value = Math.max(value, minimax(board, false, depth + 1));
              board[i][j] = null;
            }
          }
        }
        return value;
      } else {
        let value = 1000;
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            if (board[i][j] === null) {
              board[i][j] = "O";
              value = Math.min(value, minimax(board, true, depth + 1));
              board[i][j] = null;
            }
          }
        }
        return value;
      }
    }
  };

  const play = (board) => {
    let ev = evaluate(board, 1);

    if (ev === 0 && isComplete(board)) {
      setResult(0);
    } else if (ev !== 0) {
      if (ev > 0) setResult(1);
      else if (ev < 0) setResult(-1);
    } else {
      let row = null;
      let column = null;
      let value = 1000;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (board[i][j] === null) {
            let val = value;
            board[i][j] = "O";
            value = Math.min(value, minimax(board, true, 1));
            board[i][j] = null;
            if (val > value) {
              row = i;
              column = j;
            }
          }
        }
      }

      board[row][column] = "O";
      setBoard(board);

      ev = evaluate(board, 1);

      if (ev === 0 && isComplete(board)) {
        setResult(0);
      } else if (ev !== 0) {
        if (ev > 0) setResult(1);
        else if (ev < 0) setResult(-1);
      }
    }
  };

  const playrand = (board) => {
    let ev = evaluate(board, 1);

    if (ev === 0 && isComplete(board)) {
      setResult(0);
    } else if (ev !== 0) {
      if (ev > 0) setResult(1);
      else if (ev < 0) setResult(-1);
    } else {
      let row = Math.floor(Math.random() * 3);
      let column = Math.floor(Math.random() * 3);
      while (board[row][column] !== null) {
        row = Math.floor(Math.random() * 3);
        column = Math.floor(Math.random() * 3);
      }
      board[row][column] = "O";
      setBoard(board);

      ev = evaluate(board, 1);

      if (ev === 0 && isComplete(board)) {
        setResult(0);
      } else if (ev !== 0) {
        if (ev > 0) setResult(1);
        else if (ev < 0) setResult(-1);
      }
    }
  };

  const changeModal = (result)=>{
    if(result==1){
        setModalHeading("Congratulations! 🎊🪅");
        setModalDesc("You won this match!!");
    } else if(result==0){
        setModalHeading("Tie! ♾️");
        setModalDesc("Looks like we reached Stalemate!!");
    } else if(result==-1) {
        setModalHeading("Better luck next time! 🤖");
        setModalDesc("AI won this match!!");
    }
    if(result!==null)
    setModalOpen(true);
  }

  const changeBoard = (row, column) => {
    let tempBoard = [...board];
    tempBoard[row][column] = "X";
    setBoard(tempBoard);
    difficulty ? play(tempBoard) : playrand(tempBoard);
    if(result!==null)
    changeBoard(row, column);
  };

  const closeModal = ()=>{
    setModalOpen(false);
    setResult(null);
    setBoard([
    [null, null, null],
    [null, null, null],
    [null, null, null],
    ]);
  }

  return (
    <div className="tictactoe">
      <h1 className="tictactoe__heading">Tic Tac Toe</h1>
      <Modal
        open={modalOpen}
        onClose={closeModal}
        aria-labelledby="tictactoe__modal-title"
        aria-describedby="tictactoe__modal-description"
      >
        <div className="tictactoe__modal">
            <div>
                <div id="tictactoe__modal-title" className="tictactoe__modal-heading">
                    {modalHeading}
                </div>
                <div id="tictactoe__modal-description" className="tictactoe__modal-desc">
                    {modalDesc}
                </div>
            </div>
        </div>
      </Modal>
      <div className="tictactoe__button">
        <button
          style={{ "--opacity": difficulty ? "0.6" : "0.9" }}
          onClick={() => {
            setDifficulty(0);
          }}
          className="tictactoe__button-btn"
        >
          Easy
        </button>
        <button
          style={{ opacity: difficulty ? "0.9" : "0.6" }}
          onClick={() => {
            setDifficulty(1);
          }}
          className="tictactoe__button-btn"
        >
          Hard
        </button>
      </div>
      <div className="tictactoe__wrapper">
        <button
          onClick={() => changeBoard(0, 0)}
          className="tictactoe__wrapper-element"
        >
          {" "}
          {board[0][0]}{" "}
        </button>
        <button
          onClick={() => changeBoard(0, 1)}
          className="tictactoe__wrapper-element"
        >
          {" "}
          {board[0][1]}{" "}
        </button>
        <button
          onClick={() => changeBoard(0, 2)}
          className="tictactoe__wrapper-element"
        >
          {" "}
          {board[0][2]}{" "}
        </button>
        <button
          onClick={() => changeBoard(1, 0)}
          className="tictactoe__wrapper-element"
        >
          {" "}
          {board[1][0]}{" "}
        </button>
        <button
          onClick={() => changeBoard(1, 1)}
          className="tictactoe__wrapper-element"
        >
          {" "}
          {board[1][1]}{" "}
        </button>
        <button
          onClick={() => changeBoard(1, 2)}
          className="tictactoe__wrapper-element"
        >
          {" "}
          {board[1][2]}{" "}
        </button>
        <button
          onClick={() => changeBoard(2, 0)}
          className="tictactoe__wrapper-element"
        >
          {" "}
          {board[2][0]}{" "}
        </button>
        <button
          onClick={() => changeBoard(2, 1)}
          className="tictactoe__wrapper-element"
        >
          {" "}
          {board[2][1]}{" "}
        </button>
        <button
          onClick={() => changeBoard(2, 2)}
          className="tictactoe__wrapper-element"
        >
          {" "}
          {board[2][2]}{" "}
        </button>
      </div>
    </div>
  );
}
