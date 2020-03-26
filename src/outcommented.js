import React, { useState } from 'react'
import './styling/game.css'

export const App = () => {
  const [won, setWon] = useState(false)

  //i
  const rowArray = [
    [1, 3], [2, null]
  ]

  // for (let i = 0; i < 2; i++) {
  //2 ska egentligen vara array length! Kolla upp det!
  // for (let j = 0; j < 2; j++) {
  // console.log(rowArray[i][j]) // Här får jag ut värdet av varje element
  // if (rowArray[i][j] === rowArray.lenght && rowArray[i][j] === null) {
  // console.log(`${rowArray[i][j]}Här är den tomma!`)
  // }
  // }
  // }


  // const [moveUp, setMoveUp] = useState(true)

  // for every element in boardGame, check the position
  //for every element in each row, check the position

  // const canIMoveUp = () => {
  //   boardGame.map(row => {
  //     if (row.indexOf(row) === 0) {
  //       console.log('Cannot move up!')
  //       // setMoveUp(false)
  //     } else if (row.indexOf(row) !== 0) {
  //       console.log('Can move up')
  //     }

  //   })
  // }


  /* 
  Position: 
  1) Kolla vilken rad: 
  2) K
  
  Kolla desa moves:
  Upp: Var i boardGame-arrayn är row-arrayn? Är det första elementet, dvs index 0?
  Ned: Var i boardGame-arrayn är row-arrayn? Är det sista elementet, dvs index = array.length - 1?
  Höger: Var i row-arrayn är bricken? Är det första elementet, dvs index 0? Eller är det sista elementet, dvs index = array.length - 1?
  Vänster: Var i row-arrayn är bricken? Är det första elementet, dvs index 0? Eller är det sista elementet, dvs index = array.length - 1?
  
  För varje element så måste jag gå igenom med en map och checka position i boardGame och i row
  
  const [moveUp, setMoveUp] ) useState(true)
  const [moveLeft, setMoveLeft] ) useState(true)
  const [moveRight, setMoveRight] ) useState(true)
  const [moveLeft, setMoveLeft] ) useState(true)
   
  Dvs 3:
  
  Den kan inte upp, eftersom row index är noll (if row index i boardGame !== 0 && value === null {moveUp}else {cannnot move up setMoveUp(false)})
  Den kan inte höger, eftersom index i row är array.length - 1 (If(index !== array.lenght - 1 && value === null{moveRight}else{cannot move right setMoveRight(false)}) element till höger !== array.length - 1 så move höger... )
  Vänster? If vänster === null... 
  Ned? If 
  
  const canIMoveUp = () => {
  boardGame.map(row, index => (
    if(row.index === 0 && value !== null){
      console.log(Do not move up!)
      setMoveUp(false)
    }else{
      moveUp
    }
  ))
  }
   
  */

  // const game = [
  //   { number: 1 }, //index 0
  //   { number: 2 }, //index 1
  //   { number: 3 }, //index 2
  //   { number: 4 }, //index 3
  //   { number: 5 }, //index 4
  //   { number: 6 }, //index 5
  //   { number: 7 }, //index 6
  //   { number: 8 }, //index 7
  //   { number: 9 }, //index 8
  //   { number: 10 }, //index 9
  //   { number: 11 }, //index 10
  //   { number: 12 }, //index 11
  //   { number: 13 }, //index 12
  //   { number: 14 }, //index 13
  //   { number: 0 }, //index 14
  // ]

  // const newGame = [
  //   { number: 1 }, //index 0
  //   { number: 2 }, //index 1
  //   { number: 3 }, //index 2
  //   { number: 4 }, //index 3
  //   { number: 5 }, //index 4
  //   { number: 6 }, //index 5
  //   { number: 7 }, //index 6
  //   { number: 8 }, //index 7
  //   { number: 9 }, //index 8
  //   { number: 10 }, //index 9
  //   { number: 11 }, //index 10
  //   { number: 12 }, //index 11
  //   { number: 13 }, //index 12
  //   { number: 14 }, //index 13
  //   { number: 0 }, //index 14
  // ]
  // Returns randomized order of game-array
  // const randomizer = (arr) => {
  //   let i, j, temp;
  //   for (i = arr.length - 1; i > 0; i--) {
  //     j = Math.floor(Math.random() * (i + 1));
  //     temp = arr[i];
  //     arr[i] = arr[j]
  //     arr[j] = temp;
  //   }
  //   return arr;
  // }


  // Handles state of bricks, with randomizer(game) as initial to return a random order of bricks from start
  // const [bricks, setBricks] = useState(randomizer(game))

  //Check if won and update state to true
  const handleWin = () => {
    // if (winningGame === newGame || winningGame === game) {
    //   setWon(true)
    // if game === winningResult setWon(true)
    // }
  }

  const handleMove = () => {
    // a function that handles the move of the numbers --> move element inside an array
    // Splice, push??
    // Should only be able if number = is next to brick. Many if-statements...?
    // Should be saved in the state of bricks? 

    // if (rowIndex === rowArray.length) {
    //   console.log('cannot move to the right')

    // } else if(rowIndex === 0) {
    //   console.log('cannot move up')
    // } else if(rowIndex[-1] !== null){
    // console.log('left is not empty')
    //} else if()
  }
  // Make an array that is there just to compare with, to see if won.

  // (if row index i boardGame !== 0 && value === null {moveUp}else {cannnot move up setMoveUp(false)}

  return (
    <article className="main-container">
      {won && (
        <h1 className="winning-title">Bra jobbat, du klarade det!</h1>
      )}
      <div className="game-board">
        {rowArray.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((brickValue, columnIndex) => (
              <div key={`${rowIndex}-${columnIndex}`} className={brickValue !== null ? "game-brick" : "null-brick"} onClick="">{brickValue}</div>
            ))}
          </div>
        ))}
      </div>
      <button
        className="shuffle-button">
        {/* type="button"
          // onClick={() => setBricks(randomizer(newGame))} */}
            Slumpa
        </button>
    </article>
  )
}
