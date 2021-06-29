import React, { useState, useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import LandingPage from "./LandingPage"
import Dice from "../dice/Dice";
import getResults from "../helpers/getResults";
import "./RollDice.css";

export default function RollDice() {
  const props = {
    faceColor: "#51B06E",
    numDice: 2,
    currentPlayer: "player1",
  };

  const { isDarkMode } = useContext(ThemeContext);
  let diceValues = [];
  for (let i = 0; i < props.numDice; i++) {
    diceValues[i] = 6;
  }

  
  const [player1, setPlayer1] = useState({
    numDice: 2,
    faceColor: "#51B06E",
    youWon: false,
    total: 0,
    roundNum: 0,
    totalRounds: 0,
  });

  const [player2, setPlayer2] = useState({
    numDice: 2,
    faceColor: "#51B06E",
    youWon: false,
    total: 0,
    roundNum: 0,
    totalRounds: 0,
    wait: false,
  });

  const [dState, setdState] = useState({
    totalValue: props.numDice,
    diceValues,
    numDice: !isDarkMode ? player1.numDice : player2.numDice,
    faceColor: !isDarkMode ? player1.faceColor : player2.faceColor,
    youWon: false,
    rolling: false,
    currentPlayer: !isDarkMode ? "player1" : "player2",
    winner: 0,
  });

  const handleNumDice = (e) => {
    let value = e.target.value;
    let range = [1, 2, 3, 4, 5, 6, 7];
    if (value in range) {
      setdState({
        ...dState,
        numDice: value,
      });
      isDarkMode
        ? setPlayer2((st) => {
            return {
              ...st,
              numDice: value,
            };
          })
        : setPlayer1((st) => {
            return {
              ...st,
              numDice: value,
            };
          });
    }
  };

  const handleChange = (e) => {
    let value = e.target.value;
    if (e.target.type === "number") {
      value = parseInt(e.target.value, 10);
      if (value < e.target.min) {
        value = e.target.min;
      } else if (value > e.target.max) {
        value = e.target.max;
      }
    }
    if (e.target.type === "checkbox") {
      value = !dState[e.target.name];
    }
    isDarkMode
      ? setPlayer2({
          ...player2,
          faceColor: value,
        })
      : setPlayer1({
          ...player1,
          faceColor: value,
        });
    setdState({
      ...dState,
      faceColor: isDarkMode ? player2.faceColor : player1.faceColor,
    });
    console.log(value, dState.faceColor, e.target.value);
  };

  const rollDiceFunc = () => { 
    let diceValues = [];
    setdState({ ...dState, rolling: true });
    setTimeout(() => {
      setdState({ ...dState, rolling: false });
    }, 1000);
    const dice = [...document.querySelectorAll(".die-list")];
    
    dice.forEach((die) => {
      toggleClasses(die);
      die.dataset.roll = getRandomNumber(1, 6);

      diceValues.push(parseInt(die.dataset.roll));
    });

    getResults (diceValues, dState, setdState, setPlayer1, setPlayer2, isDarkMode, player1, player2);
  };

  const resetTheGame = () => {
    setdState({
      totalValue: 0,
      diceValues: 0,
      numDice: 2,
      faceColor: "#51B06E",
      youWon: false,
      rolling: false,
      currentPlayer: !isDarkMode ? "player1" : "player2",
      winner: 0,
    });
    setPlayer1({
      numDice: 2,
      faceColor: "#51B06E",
      youWon: false,
      total: 0,
      roundNum: 0,
      totalRounds: 0,
    });

    setPlayer2({
      numDice: 2,
      faceColor: "#51B06E",
      youWon: false,
      total: 0,
      roundNum: 0,
      totalRounds: 0,
      wait: false,
    });
  };

  const toggleClasses = (die) => {
    die.classList.toggle("odd-roll");
    die.classList.toggle("even-roll");
  };

  const getRandomNumber = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  
  let dice = [];
  dice.splice(dState.numDice, 100 - dState.numDice);
  for (let i = 0; i < dState.numDice; i++) {
    dice.push(
      <Dice
        {...props}
        reset={resetTheGame}
        color={isDarkMode ? player2.faceColor : player1.faceColor}
        key={i}

      />
    );
  }
  return (
    <>
      < LandingPage dState={dState} dice={dice} handleChange={handleChange} handleNumDice={handleNumDice} player1={player1} player2={player2} isDarkMode={isDarkMode}/>
      {dState.wait && (
        <h2 glow>
          Please wait for the other player till he finshs his rounds.
        </h2>
      )}
      <div className="RollDice-container">
        <button
          class="button"
          style={{
            color: `${isDarkMode ? player2.faceColor : player1.faceColor}`,
          }}
          onClick={rollDiceFunc}
          disabled={dState.rolling}
        >
          {dState.rolling ? "Rolling 🎲 🎲 🎲" : "Roll The Dice 🎲"}
        </button>

        <button
          class="button"
          type="button"
          onDoubleClick={resetTheGame}
          data-hover="DOUBLE CLICK TO RESET"
        >
          <span>RESET</span>
        </button>
      </div>
    </>
  );
}
