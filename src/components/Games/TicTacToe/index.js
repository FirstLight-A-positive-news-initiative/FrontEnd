import React, { useState } from "react";
import "./styles.css";

export default function TicTacToe() {
    const [board, setBoard] = useState([
        [null, null, null],
        [null, null, null],
        [null, null, null],
    ]);

    const [result, setResult] = useState(null);

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
                            value = Math.max(
                                value,
                                minimax(board, false, depth + 1)
                            );
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
                            value = Math.min(
                                value,
                                minimax(board, true, depth + 1)
                            );
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
            else setResult(-1);
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
                else setResult(-1);
            }
        }
    };

    const changeBoard = (row, column) => {
        let tempBoard = [...board];
        if (result !== null) {
            console.log(result);
            setResult(null);
            setBoard([
                [null, null, null],
                [null, null, null],
                [null, null, null],
            ]);
        } else if (tempBoard[row][column] === null) {
            tempBoard[row][column] = "X";
            setBoard(tempBoard);
            play(tempBoard);
        }
    };

    return (
        <div className="tictactoe">
            <h1 className="tictactoe__heading">Tic Tac Toe</h1>
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
