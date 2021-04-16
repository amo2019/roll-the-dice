import React, { useState, useContext } from "react";
import { ThemeContext } from "./contexts/ThemeContext";
import Dice from "./Dice";
import "./RollDice.css";

export default function RollDice() {
  const props = {
    faceColor: "#51B06E",
    numDice: 4,
    currentPlayer: "player1",
  };

  const { isDarkMode } = useContext(ThemeContext);
  let diceValues = [];
  for (let i = 0; i < props.numDice; i++) {
    diceValues[i] = 6;
  }

  const [player1, setPlayer1] = useState({
    numDice: 4,
    faceColor: "#51B06E",
    youWon: false,
    total: 0,
    roundNum: 0,
    totalRounds: 0,
  });

  const [player2, setPlayer2] = useState({
    numDice: 4,
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

  const getRollResults = (diceValues) => {
    let total = 0;
    const reducer = (accumulator, currentValue) => accumulator + currentValue;

    total = diceValues.reduce(reducer, 0);
    function allEqual(arr) {
      return new Set(arr).size === 1;
    }
    if ((player1.roundNum === 10) & (player2.roundNum === 10)) {
      player1.totalRounds > player2.totalRounds
        ? setPlayer1((st) => {
            return {
              ...st,
              youWon: true,
            };
          })
        : setPlayer2((st) => {
            return {
              ...st,
              youWon: true,
            };
          });
      setdState((st) => {
        return {
          ...st,
          youWon: true,
          winner: player1.totalRounds > player2.totalRounds ? 1 : 2,
        };
      });
      return 0;
    } else if (
      (!isDarkMode && player1.roundNum > 9) & (player2.roundNum < 9) ||
      (player1.roundNum < 9) & (isDarkMode && player2.roundNum > 9)
    ) {
      setdState({ ...dState, wait: true });
      return 0;
    } else if (diceValues.length > 1 && allEqual(diceValues)) {
      setTimeout(() => {
        setdState({
          ...dState,
          totalValue: total,
          diceValues,
          youWon: true,
          winner: !isDarkMode ? 1 : 2,
        });
      }, 1000);
      setTimeout(() => {
        setdState({ ...dState, youWon: false });
      }, 4000);
      return 0;
    }

    setTimeout(() => {
      setdState({
        ...dState,
        totalValue: total,
        diceValues,
      });
      isDarkMode
        ? setPlayer2((st) => {
            return {
              ...st,
              total: total,
              roundNum: player2.roundNum + 1,
              totalRounds: player2.totalRounds + total,
            };
          })
        : setPlayer1((st) => {
            return {
              ...st,
              total: total,
              roundNum: player1.roundNum + 1,
              totalRounds: player1.totalRounds + total,
            };
          });
    }, 1000);
    console.log("dState1:", player1, "dState2:", player2);
    //setCurrentPlayer(total, diceValues);
  };

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

    getRollResults(diceValues);
  };

  const resetTheGame = () => {
    setdState({
      totalValue: 0,
      diceValues: 0,
      numDice: 4,
      faceColor: "#51B06E",
      youWon: false,
      rolling: false,
      currentPlayer: !isDarkMode ? "player1" : "player2",
      winner: 0,
    });
    setPlayer1({
      numDice: 4,
      faceColor: "#51B06E",
      youWon: false,
      total: 0,
      roundNum: 0,
      totalRounds: 0,
    });

    setPlayer2({
      numDice: 4,
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

  //let { state } = this;
  //let colorStyle = { height: "2.375rem" };
  //let { props } = this;
  let dice = [];
  dice.splice(dState.numDice, 100 - dState.numDice);
  for (let i = 0; i < dState.numDice; i++) {
    dice.push(
      <Dice
        {...props}
        reset={resetTheGame}
        color={isDarkMode ? player2.faceColor : player1.faceColor}
        key={i}
        //ref={(die) => (dice[i] = die)}
      />
    );
  }
  return (
    <>
      <div className="container">
        <fieldset style={{ padding: "5px" }}>
          <label htmlFor="faceColor">Dice Color</label>
          <input
            type="color"
            name="faceColor"
            id="faceColor"
            className="form-control"
            value={isDarkMode ? player2.faceColor : player1.faceColor}
            onChange={handleChange}
          />
        </fieldset>

        <fieldset style={{ padding: "5px" }}>
          <label>Total:</label>
          <span style={{ fontWeight: "bold" }}>
            {isDarkMode ? player2.total : player1.total}
          </span>
          <label>Round Num:</label>
          <span style={{ fontWeight: "bold" }}>
            {isDarkMode ? player2.roundNum : player1.roundNum}
          </span>
          <label>Comulative Total:</label>
          <span style={{ fontWeight: "bold" }}>
            {isDarkMode ? player2.totalRounds : player1.totalRounds}
          </span>
        </fieldset>
        <fieldset>
          <label htmlFor="numDice">Dice Number</label>
          <input
            style={{ padding: "5px", margin: "4px", width: "5em" }}
            type="number"
            name="numDice"
            id="numDice"
            className="form-control"
            value={dState.numDice}
            onChange={handleNumDice}
            min="1"
            max="6"
          />
        </fieldset>
      </div>
      <div className="RollDice-container">{dice}</div>

      {dState.youWon && (
        <h1>
          <span>"{dState.winner === 1 ? "PLAYER1 " : "PLAYER2 "}</span>
          <span>WINS!"</span>
        </h1>
      )}
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
