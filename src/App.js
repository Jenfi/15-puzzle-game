import React, { useState } from 'react'
import './styling/game.css'

export const App = () => {
  const [won, setWon] = useState(false)
  const rowArray = [[1, 2, 3, 4, 5], [6, 7, 8, 9, 10], [11, 12, 13, 14, null]]
  const winningArray = [[1, 2, 3, 4, 5], [6, 7, 8, 9, 10], [11, 12, 13, 14, null]]

  // Compare rowArray with winningArray to see if the game is won ad update state won to true
  //DENNA FUNKAR INTE JUST NU!
  const isGameWon = () => {
    if (rowArray.length === winningArray.length) {
      return false
    }
    for (var i = 0; rowArray.length < i; i++) {
      if (rowArray[i] !== winningArray[i]) {
        return false
      }
    }
    // return true
    setWon(true)
  }
  isGameWon()


  // const [moveUp, setMoveUp] = useState(true)
  // const [moveLeft, setMoveLeft] = useState(true)
  // const [moveRight, setMoveRight] = useState(true)
  // const [moveLeft, setMoveLeft] = useState(true)

  // Returns randomized order of game-array
  const randomizer = (arr) => {
    //   let i, j, temp;
    //   for (i = arr.length - 1; i > 0; i--) {
    //     j = Math.floor(Math.random() * (i + 1));
    //     temp = arr[i];
    //     arr[i] = arr[j]
    //     arr[j] = temp;
    // }
    //   return arr;
  }

  // Handles state of bricks, with randomizer(game) as initial to return a random order of bricks from start
  const [bricks, setBricks] = useState(randomizer(rowArray)) // Uppdatera denna för att kunna köra en randomized?


  const canMove = (currentRowIndex, currentColumnIndex, brickValue, row) => {
    //Checking if brick can move up (if rowIndex != 0, or if brickValue above is not null. )
    if (currentRowIndex !== 0 && rowArray[currentRowIndex - 1][currentColumnIndex] === null) {
      console.log(`${brickValue} - this brick can move up`)

    } else {// Behövs ej,
      console.log(`${brickValue} - this brick cannot move up`)
    }

    //Checking if brick can move down (if rowIndex = number of elements in array, or if brickValue below is not null)
    if (currentRowIndex !== rowArray.length - 1 && rowArray[currentRowIndex + 1][currentColumnIndex] === null) {
      console.log(`${brickValue} - this brick can move down`)

    } else {// Behövs ej,
      console.log(`${brickValue} - this brick cannot move down`)
    }

    //Checking if brick can move to the right
    if (currentColumnIndex !== row.length - 1 && rowArray[currentRowIndex][currentColumnIndex + 1] === null) {
      console.log(`${brickValue} - this brick CAN move to the right`)

    } else { // Behövs ej,
      console.log(`${brickValue} - this brick cannot move to the right`)
    }

    //Checking if brick can move to the left
    if (currentColumnIndex !== 0 && rowArray[currentRowIndex][currentColumnIndex - 1] === null) {
      console.log(`${brickValue} - this brick CAN move to the left`)

    }
    else {// Behövs ej,
      console.log(`${brickValue} - this brick cannot move to the left`)
    }

    // return false;

    // a function that handles the move of the numbers --> move element inside an array
    // Splice, push??
    // Should be saved in the state of bricks? 

  }



  // const v = (currentRowIndex, currentColumnIndex, brickValue) => {
  //   if (canMove(currentRowIndex, currentColumnIndex, brickValue)) {

  //   }
  // }

  // Make an array that is there just to compare with, to see if won.

  return (
    <article className="main-container">
      {won && (
        <h1 className="winning-title">Bra jobbat, du klarade det!</h1>
      )}
      <div className="game-board">
        {rowArray.map((row, currentRowIndex) => (
          <div key={currentRowIndex} className="row">
            {row.map((brickValue, currentColumnIndex) => {
              return (
                <div
                  key={`${currentRowIndex}-${currentColumnIndex}`}
                  className={brickValue !== null
                    ? "game-brick"
                    : "null-brick"}
                  onClick={() => canMove(currentRowIndex, currentColumnIndex, brickValue, row)}
                >
                  {brickValue}
                </div>
              )
            })}
          </div>
        ))}
      </div>
      <button
        className="shuffle-button"
        type="button"
      // onClick={() => setBricks(randomizer(newGame))}
      >
        Slumpa
        </button>
    </article>
  )
}
