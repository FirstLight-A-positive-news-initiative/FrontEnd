import React from 'react';
import "./styles.css";

export default function TicTacToe() {
    return (
        <div className="tictactoe">
            <h1 className="tictactoe__heading">Tic Tac Toe</h1>
            <div className="tictactoe__wrapper">
                <div className="tictactoe__wrapper-element"> O </div>
                <div className="tictactoe__wrapper-element"> X </div>
                <div className="tictactoe__wrapper-element"> X </div>
                <div className="tictactoe__wrapper-element"> X </div>
                <div className="tictactoe__wrapper-element"> X </div>
                <div className="tictactoe__wrapper-element"> X </div>
                <div className="tictactoe__wrapper-element"> X </div>
                <div className="tictactoe__wrapper-element"> X </div>
                <div className="tictactoe__wrapper-element"> X </div>
            </div>
        </div>
    );
};