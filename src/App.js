import React from 'react';
import './App.css';
import Die from './Die';
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

function App() {
  const [dice, setDice] = React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false)
    
  React.useEffect(() => {
  const allHeld = dice.every(die => die.isHeld)
  const firstValue = dice[0].value
  const allSameValue = dice.every(die => die.value === firstValue)
  if (allHeld && allSameValue)
  {
    setTenzies(true)
    console.log("You won")
  }  
  },[dice])

  function allNewDice() {
      const newDice = []
      for (let i = 0; i < 10; i++) {
          newDice.push(generateNewDie())
      }
      return newDice
  }

  function generateNewDie() {
    return {
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid()
    }
}
  
  function rollDice() {
    setDice(oldDice => oldDice.map(dice => {
        return dice.isHeld ? dice : generateNewDie()
      }))
    if (tenzies)
      {
        setDice(allNewDice())
        setTenzies(false)
      }
  }

  function holdDice(id) {
    setDice(old => old.map(die => {
      return die.id === id ? 
        {...die, isHeld: !die.isHeld} : 
        die
    }))
  }

  const diceElements = dice.map( x => <Die key={x.id} isHeld={x.isHeld} value={x.value} holdDice={() => holdDice(x.id)} />)

  return (
    <main>
      {tenzies && <Confetti width="1530px" height="720px" />}
      <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div  className='dice_container'>
        {diceElements}
      </div>
      <button className='roll-dice' onClick={rollDice}>{tenzies? "New Game" : "Roll"}</button>
    </main>
  );
}

export default App;
