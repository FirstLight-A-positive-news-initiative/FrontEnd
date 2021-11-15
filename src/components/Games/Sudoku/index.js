import React, { useState } from "react";

import "./styles.css";
import { Button, Divider, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { DoubleArrow } from "@mui/icons-material";

import {
  Grid,
  ChoiceBoard,
  NoSolutionFoundModal,
  GameDetails,
  DifficultySelectionModal,
} from "./Components";

import {
  animateElement,
  arrayDeepCopy,
  checkTheBoard,
  checkIfPlayerWon,
  createSudokuGrid,
  solveSudoku,
  getHint
} from "./Utilities";

import useLocalStorage from "./Hooks/useLocalStorage";

const easyMaxEmptyCells = 30;
const mediumMaxEmptyCells = 40;
const hardMaxEmptyCells = 50;

const Sudoku = () => {
  const [grid, setGrid] = useLocalStorage("currentGrid", null);
  const [startingGrid, setStartingGrid] = useLocalStorage("startingGrid", null);
  const [clickValue, setClickValue] = useLocalStorage("clickValue", 1);

  // Game Score logic
  const [gameMode, setGameMode] = useLocalStorage(
    "gameMode",
    mediumMaxEmptyCells
  );
  const [movesTaken, setMovesTaken] = useLocalStorage("movesTaken", 0);
  const [hintsTaken, setHintsTaken] = useLocalStorage("hintsTaken", 0);
  const [isPlayerWon, setIsPlayerWon] = useLocalStorage("playerWon", false);
  const [pressedSolve, setPressedSolve] = useLocalStorage(
    "pressedSolve",
    false
  );

  const [startTime, setStartTime] = useLocalStorage("startTime", () =>
    Date().toLocaleString()
  );

  // Logic for modal
  const [showInformationModal, setShowInformationModal] = useState(false);
  const [showNoSolutionFoundModal, setShowNoSolutionFoundModal] =
    useState(false);
  const [showGameDetails, setShowGameDetails] = useState(false);
  const [showDifficultySelectionModal, setShowDifficultySelectionModal] =
    useState(false);

  const [ruledisplay, setRuledisplay] = useState("");

  const showRules = () => {
    if(ruledisplay === "") {
      setRuledisplay("-active");
    } else {
      setRuledisplay("");
    }
  }

  const handleSolve = () => {
    let solvedBoard = arrayDeepCopy(grid);
    let solvedStatus = solveSudoku(solvedBoard);
    if (solvedStatus === false) {
      setShowNoSolutionFoundModal((show) => !show);
      return;
    }

    let newHints = 0;
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (grid[i][j].value === 0) {
          newHints++;
          solvedBoard[i][j].isHinted = true;
          solvedBoard[i][j].isModifiable = false;
        }
      }
    }

    setHintsTaken((hints) => hints + newHints);
    setIsPlayerWon(true);
    setShowGameDetails(true);
    setPressedSolve(true);
    setGrid(solvedBoard);
  };

  const handleHint = () => {
    // Checking if player has won
    if (isPlayerWon) return;

    // Getting hint
    let hintResponse = getHint(grid);

    // Checking if the grid cannot be solved
    if (hintResponse.solvedStatus === false) {
      setShowNoSolutionFoundModal((show) => !show);
      return;
    }

    // setting the result board
    setGrid(hintResponse.board);

    // Adding hint count
    setHintsTaken((hints) => hints + 1);

    // Checking if the player has won
    let playerWon = checkIfPlayerWon(hintResponse.board);
    if (playerWon) {
      setIsPlayerWon(true);
      setShowGameDetails(true);
    }
  };

  const handleNewGame = (maxEmptyCellsCount) => {
    // Waiting for the function to return the grid
    let newSudokuGrid = createSudokuGrid(maxEmptyCellsCount);

    setStartingGrid(arrayDeepCopy(newSudokuGrid));
    setGrid(arrayDeepCopy(newSudokuGrid));

    // Setting the game mode with maxEmptyCellsCount
    setGameMode(maxEmptyCellsCount);

    // Reseting the values
    setMovesTaken(0);
    setHintsTaken(0);
    setIsPlayerWon(false);
    setPressedSolve(false);
    setStartTime(() => Date().toLocaleString());

    // Closing the difficulty modal and also setting the isLoading to false
    setShowDifficultySelectionModal((show) => !show);
  };

  const handleClearBoard = () => {
    setIsPlayerWon(false);
    setGrid(arrayDeepCopy(startingGrid));
  };

  const handleCellClick = (row, column, isModifiable) => {
    if (!isModifiable) {
      animateElement(".grid-table", "headShake");
      return;
    }

    // moves registered when the value is not 0
    if (clickValue !== 0) setMovesTaken((moves) => moves + 1);

    let newGrid = arrayDeepCopy(grid);
    newGrid[row][column].value = clickValue;

    // Marking the node valid or invalid depending on the grid
    checkTheBoard(newGrid);

    // Checking if the player has won
    let playerWon = checkIfPlayerWon(newGrid);
    if (playerWon) {
      setIsPlayerWon(true);
      setShowGameDetails(true);
    }

    // setting the value to the grid and also to the local storage
    setGrid(newGrid);
  };

  console.log("....");

  // If we donot have anything in the local storage
  if (grid == null && startingGrid == null) handleNewGame(gameMode);

  const rules = [
    "Every square has to contain a single number.",
    "Only the numbers from 1 through to 9 can be used.",
    "Each 3×3 box can only contain each number from 1 to 9 once.",
    "Each vertical column can only contain each number from 1 to 9 once.",
    "Each horizontal row can only contain each number from 1 to 9 once.",
    "Divider",
    "If you input a invalid number, the row or column will change color.",
    "The digits from 1 to 9 are given below. To fill in a digit in the Sudoku, click on that digit and then click on the Sudoku cell.",
    "The erase icon can be used to clear your input for a cell.",
    "Click on HINT to fill in a random empty cell.",
    "In case, you are unable to solve, the AI can help you. 😊"
  ];

  return (
    <div className="Game">
      <h1
        className="Sudoku__title"
      >
        Sudoku
      </h1>
      <Button onClick={showRules} className="Sudoku__rules-btn">
        How to Play
      </Button>
      <div className={`Sudoku__rules${ruledisplay}`}>
        <div className="Sudoku__rules-text">
          <h3>Rules</h3>
          <List>
            {rules.map((text) => (
              (text === "Divider") ? (
                <Divider />
              ) : (
                <ListItem className="Sudoku__rules-item" key="index">
                  <ListItemIcon className="Sudoku__rules-item-icon">
                    <DoubleArrow />
                  </ListItemIcon>
                  <ListItemText className="Sudoku__rules-item-text">
                    {text}
                  </ListItemText>
                </ListItem>
              )
            ))}
          </List>
        </div>
      </div>

      {showNoSolutionFoundModal && (
        <NoSolutionFoundModal
          closeModal={() => setShowNoSolutionFoundModal((show) => !show)}
        />
      )}

      {showDifficultySelectionModal && (
        <DifficultySelectionModal
          closeModal={() => setShowDifficultySelectionModal((show) => !show)}
          handleNewGame={handleNewGame}
          easyMaxEmptyCells={easyMaxEmptyCells}
          mediumMaxEmptyCells={mediumMaxEmptyCells}
          hardMaxEmptyCells={hardMaxEmptyCells}
        />
      )}

      {showGameDetails && (
        <GameDetails
          closeModal={() => setShowGameDetails((show) => !show)}
          movesTaken={movesTaken}
          hintsTaken={hintsTaken}
          startTime={startTime}
          isPlayerWon={isPlayerWon}
          pressedSolve={pressedSolve}
          gameMode={gameMode}
          mediumMaxEmptyCells={mediumMaxEmptyCells}
          hardMaxEmptyCells={hardMaxEmptyCells}
        />
      )}

      <Grid handleCellClick={handleCellClick} grid={grid} />
      <ChoiceBoard setClickValue={setClickValue} selected={clickValue} />
      <div className="action-container">
        <Button
          onClick={handleClearBoard}
          variant="outlined"
          className="Sudoku__action-button"
          id="Sudoku__action-button-clear"
        >
          Clear
        </Button>
        <Button
          onClick={handleSolve}
          variant="outlined"
          className="Sudoku__action-button"
          id="Sudoku__action-button-solve"
        >
          Solve using AI
        </Button>
        <Button
          onClick={handleHint}
          variant="outlined"
          className="Sudoku__action-button"
          id="Sudoku__action-button-hint"
        >
          Hint
        </Button>
        <Button
          onClick={() => setShowDifficultySelectionModal((show) => !show)}
          variant="outlined"
          className="Sudoku__action-button"
          id="Sudoku__action-button-newgame"
        >
          New Game
        </Button>
      </div>
    </div>
  );
};

export default Sudoku;