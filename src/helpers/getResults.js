  export default function getResults (diceValues, dState, setdState, setPlayer1, setPlayer2, isDarkMode, player1, player2) {
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