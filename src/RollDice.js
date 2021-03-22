import React, { Component } from "react";
import Dice from "./Dice";
import "./RollDice.css";
//import "./styles.css";

class RollDice extends Component {
  static defaultProps = {
    faceColor: "#C9457D",
    numDice: 4,
    currentPlayer: "player1",
    players: [
      { player1: { total: 0, roundNum: 1 } },
      { player2: { total: 0, roundNum: 1 } },
    ],
  };
  constructor(props) {
    super(props);
    let diceValues = [];
    for (let i = 0; i < props.numDice; i++) {
      diceValues[i] = 6;
    }
    this.state = {
      totalValue: props.numDice,
      diceValues,
      numDice: 4,
      faceColor: "#C9457D",
      youWon: false,
      rolling: false,
      currentPlayer: "player1",
      player1: { total: 0, roundNum: 1 },
      player2: { total: 0, roundNum: 1 },
    };
    this.dice = [];
    this.rollCount = 0;
    this.getRandomNumber = this.getRandomNumber.bind(this);
    this.toggleClasses = this.toggleClasses.bind(this);
    this.rollDice = this.rollDice.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getRollResults = this.getRollResults.bind(this);
    this.handleNumDice = this.handleNumDice.bind(this);
    this.setCurrentPlayer = this.setCurrentPlayer(this);
  }

  getRollResults(diceValues) {
    let total = 0;
    const reducer = (accumulator, currentValue) => accumulator + currentValue;

    total = diceValues.reduce(reducer, 0);
    function allEqual(arr) {
      return new Set(arr).size === 1;
    }
    if (diceValues.length > 1 && allEqual(diceValues)) {
      setTimeout(() => {
        this.setState({ totalValue: total, diceValues, youWon: true });
      }, 1000);
      setTimeout(() => {
        this.setState({ youWon: false });
      }, 4000);

      return 0;
    }

    setTimeout(() => {
      this.setState({ totalValue: total, diceValues });
    }, 1000);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.numDice !== this.state.numDice) {
      //this.getRollResults(this.state.numDice);
    }
    console.log("Num Dice:", this.state.numDice);
  }
  handleNumDice(e) {
    let value = e.target.value;
    let range = [1, 2, 3, 4, 5, 6, 7];
    if (value in range)
      this.setState({
        numDice: value,
      });
  }
  handleChange(e) {
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
      value = !this.state[e.target.name];
    }
    this.setState({
      faceColor: value,
    });
    console.log(value, this.state.faceColor, e.target.value);
  }

  rollDice() {
    let diceValues = [];
    this.setState({ rolling: true });
    setTimeout(() => {
      this.setState({ rolling: false });
    }, 1000);
    const dice = [...document.querySelectorAll(".die-list")];
    dice.forEach((die) => {
      this.toggleClasses(die);
      die.dataset.roll = this.getRandomNumber(1, 6);

      diceValues.push(parseInt(die.dataset.roll));
    });

    this.getRollResults(diceValues);
  }

  setCurrentPlayer() {
    const currentPlayer = this.state.currentPlayer;
    if (currentPlayer === "player2" && this.state.player2.roundNum <= 10) {
      this.setState((st) => {
        return {
          player2: { roundNum: st.player2.roundNum + 1, total: st.totalValue },
        };
      });
    } else if (
      currentPlayer === "player1" &&
      this.state.player1.roundNum <= 10
    ) {
      this.setState((st) => {
        return {
          player1: {
            roundNum: st.player1.roundNum + 1,
            total: st.totalValue,
          },
        };
      });
    } else {
      this.setState((st) => {
        return {
          youWon: true,
        };
      });
    }
  }

  toggleClasses(die) {
    die.classList.toggle("odd-roll");
    die.classList.toggle("even-roll");
  }

  getRandomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  render() {
    let { state } = this;
    //let colorStyle = { height: "2.375rem" };
    let { props } = this;
    let dice = [];
    dice.splice(state.numDice, 100 - state.numDice);
    for (let i = 0; i < state.numDice; i++) {
      dice.push(
        <Dice
          {...props}
          color={state.faceColor}
          key={i}
          ref={(die) => (dice[i] = die)}
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
              value={this.state.faceColor}
              onChange={this.handleChange}
            />
          </fieldset>

          <fieldset style={{ padding: "5px" }}>
            <label>Total Sum:</label>

            <span style={{ fontWeight: "bold" }}>{this.state.totalValue}</span>
          </fieldset>
          <fieldset>
            <label htmlFor="numDice">Dice Number</label>
            <input
              style={{ padding: "5px", margin: "4px", width: "5em" }}
              type="number"
              name="numDice"
              id="numDice"
              className="form-control"
              value={state.numDice}
              onChange={this.handleNumDice}
              min="1"
              max="6"
            />
          </fieldset>
        </div>
        <div className="RollDice-container">{dice}</div>

        {this.state.youWon && (
          <h1>
            <span>"YOU</span>
            <span>WIN!"</span>
          </h1>
        )}
        <div className="RollDice">
          <button
            style={{ color: `${this.state.faceColor}` }}
            onClick={this.rollDice}
            disabled={this.state.rolling}
          >
            {this.state.rolling ? "Rolling 🎲 🎲 🎲" : "Roll The Dice 🎲"}
          </button>
        </div>
      </>
    );
  }
}

export default RollDice;
