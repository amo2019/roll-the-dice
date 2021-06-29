import React from "react";

export default function LandingPage(props) {
  console.log(props);
  const {dice, dState, handleChange, handleNumDice, player1, player2, isDarkMode} = props;
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
            min="2"
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
    </>
  )
}

