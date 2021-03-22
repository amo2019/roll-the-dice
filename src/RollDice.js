import React, { Component } from "react";
import Dice from "./Dice";
import "./RollDice.css";

class RollDice extends Component {
  static defaultProps = {
    faceColor: "#C9457D",
    numDice: 4,
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
    };
    this.dice = [];
    this.rollCount = 0;
    this.getRandomNumber = this.getRandomNumber.bind(this);

    this.rollDice = this.rollDice.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getRollResults = this.getRollResults.bind(this);
    this.handleNumDice = this.handleNumDice.bind(this);
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
        <div className="RollDice-container">{dice}</div>

        <div className="RollDice">
          <button>Roll The Dice 🎲</button>
        </div>
      </>
    );
  }
}

export default RollDice;
