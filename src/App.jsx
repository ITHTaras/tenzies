import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
import Die from "./Die";
import "./App.css";
import { nanoid } from "nanoid";

function App() {
  const [dices, setDices] = useState(allNewDice());

  const [tenzies, setTenzies] = useState(false);

  useEffect(() => {
    const isAllHeld = dices.every((die) => die.isHeld);
    const firstDie = dices[0].value;
    const isAllSame = dices.every((die) => die.value === firstDie);

    if (isAllHeld && isAllSame && !tenzies) {
      setTenzies(true);
      console.log("Victory!");
      playSound();
    }
  }, [dices]);

  function defaultDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  function allNewDice() {
    const nums = [];

    for (let i = 0; i < 10; i++) {
      nums.push(defaultDie());
    }
    return nums;
  }

  function rollDices() {
    setDices((prevDice) =>
      prevDice.map((die) => {
        return die.isHeld ? die : defaultDie();
      })
    );
  }

  function holdDice(id) {
    setDices((prevDices) => {
      return prevDices.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      });
    });
  }

  const diceElements = dices.map((dice) => (
    <Die
      value={dice.value}
      key={dice.id}
      isHeld={dice.isHeld}
      holdDice={() => holdDice(dice.id)}
    />
  ));

  function playSound() {
    const audio = new Audio(
      "http://audio.marsupialgurgle.com/audio/partyhorngood.mp3"
    );
    audio.play();
  }

  function restart() {
    setDices(allNewDice());
    setTenzies(false);
  }

  return (
    <main>
      {tenzies && (
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      )}
      <div className="dice-container">{diceElements}</div>
      <button onClick={tenzies ? restart : rollDices}>
        {tenzies ? "New game🎉" : "Roll"}
      </button>
    </main>
  );
}

export default App;
