import React, { useState } from "react";
import Dice from "./Dice";
import "./RollDice.css";

function RollDice() {
  const props = {
    faceColor: "#C9457D",
    numDice: 4,
    currentPlayer: "player1",
    players: [
      { player1: { total: 0, roundNum: 1 } },
      { player2: { total: 0, roundNum: 1 } },
    ],
  };

  let diceValues = [];
  for (let i = 0; i < props.numDice; i++) {
    diceValues[i] = 6;
  }
  const [dState, setdState] = useState({
    totalValue: props.numDice,
    diceValues,
    numDice: 4,
    faceColor: "#C9457D",
    youWon: false,
    rolling: false,
    currentPlayer: "player1",
    player1: { total: 0, roundNum: 1 },
    player2: { total: 0, roundNum: 1 },
  });

  const getRollResults = (diceValues) => {
    let total = 0;
    const reducer = (accumulator, currentValue) => accumulator + currentValue;

    total = diceValues.reduce(reducer, 0);
    function allEqual(arr) {
      return new Set(arr).size === 1;
    }
    if (diceValues.length > 1 && allEqual(diceValues)) {
      setTimeout(() => {
        setdState({ ...dState, totalValue: total, diceValues, youWon: true });
      }, 1000);
      setTimeout(() => {
        setdState({ ...dState, youWon: false });
      }, 4000);

      return 0;
    }

    setTimeout(() => {
      setdState({ ...dState, totalValue: total, diceValues });
    }, 1000);
  };

  const handleNumDice = (e) => {
    let value = e.target.value;
    let range = [1, 2, 3, 4, 5, 6, 7];
    if (value in range)
      setdState({
        ...dState,
        numDice: value,
      });
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
    setdState({
      ...dState,
      faceColor: value,
    });
    console.log(value, dState.faceColor, e.target.value);
  };

  const rollDice = () => {
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
        color={dState.faceColor}
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
            value={dState.faceColor}
            onChange={handleChange}
          />
        </fieldset>

        <fieldset style={{ padding: "5px" }}>
          <label>Total Sum:</label>

          <span style={{ fontWeight: "bold" }}>{dState.totalValue}</span>
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
          <span>"YOU</span>
          <span>WIN!"</span>
        </h1>
      )}
      <div className="RollDice">
        <button
          style={{ color: `${dState.faceColor}` }}
          onClick={rollDice}
          disabled={dState.rolling}
        >
          {dState.rolling ? "Rolling 🎲 🎲 🎲" : "Roll The Dice 🎲"}
        </button>
      </div>
    </>
  );
}

export default RollDice;
