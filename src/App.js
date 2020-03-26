import React, { useState } from 'react'
import './styling/game.css'

export const App = () => {
  const [won, setWon] = useState(false)
  const [rowArray, setRowArray] = useState([[1, 2, 3, 4, 5], [6, 7, 8, 9, 10], [11, 12, 13, null, 14]])
  const winningArray = [[1, 2, 3, 4, 5], [6, 7, 8, 9, 10], [11, 12, 13, 14, null]]

  // GLÖM EJ INTE FIREWORKS!!!
  // ANIMATION?

  // Compare rowArray with winningArray to see if the game is won
  const isGameWon = (currentRowIndex, currentColumnIndex) => {
    if (rowArray[currentRowIndex][currentColumnIndex] !== winningArray[currentRowIndex][currentColumnIndex]) {
      return false;
    } else {
      return true
    }
  }

  // Returns randomized order of game-array
  // const randomizer = (rowArray) => {
  //   let i, j, temp;
  //   for (i = rowArray.length - 1; i > 0; i--) {
  //     j = Math.floor(Math.random() * (i + 1));
  //     temp = rowArray[i];
  //     rowArray[i] = rowArray[j]
  //     rowArray[j] = temp;
  //   }
  //   return rowArray;
  // }

  // Handles state of bricks, with randomizer(game) as initial to return a random order of bricks from start
  // const [bricks, setBricks] = useState(randomizer(rowArray)) // Uppdatera denna för att kunna köra en randomized?


  const canMove = (currentRowIndex, currentColumnIndex, brickValue, row) => {

    //make a copy of rowArray to update state of rowArray with the copy
    let newRowArray = rowArray.slice(0);

    //Checking if brick can move up (if rowIndex != 0, or if brickValue above is not null. )
    if (currentRowIndex !== 0 && rowArray[currentRowIndex - 1][currentColumnIndex] === null) {
      newRowArray[currentRowIndex - 1][currentColumnIndex] = brickValue;
      newRowArray[currentRowIndex][currentColumnIndex] = null;
      setRowArray(newRowArray)
    } else if (currentRowIndex !== rowArray.length - 1 && rowArray[currentRowIndex + 1][currentColumnIndex] === null) {
      //Checking if brick can move down (if rowIndex = number of elements in array, or if brickValue below is not null)
      newRowArray[currentRowIndex + 1][currentColumnIndex] = brickValue;
      newRowArray[currentRowIndex][currentColumnIndex] = null;
      setRowArray(newRowArray)

    } else if (currentColumnIndex !== row.length - 1 && rowArray[currentRowIndex][currentColumnIndex + 1] === null) {
      //Checking if brick can move to the right
      newRowArray[currentRowIndex][currentColumnIndex + 1] = brickValue;
      newRowArray[currentRowIndex][currentColumnIndex] = null;
      setRowArray(newRowArray)
    } else if (currentColumnIndex !== 0 && rowArray[currentRowIndex][currentColumnIndex - 1] === null) {
      //Checking if brick can move to the left
      newRowArray[currentRowIndex][currentColumnIndex - 1] = brickValue;
      newRowArray[currentRowIndex][currentColumnIndex] = null;
      setRowArray(newRowArray)

    }
    setWon(isGameWon(currentRowIndex, currentColumnIndex));
  }

  return (
    <article className="main-container">

      <div className="game-board">
        {won && (
          <>
            {/* <div className="winning-overlay"></div> */}
            <h1 className="winning-title">Bra jobbat, du klarade det!</h1>
          </>
        )}
        {rowArray.map((row, currentRowIndex) => (
          <div key={currentRowIndex} className="row">
            {row.map((brickValue, currentColumnIndex) => {

              return (
                <div
                  key={`${currentRowIndex}-${currentColumnIndex}`}
                  className={brickValue !== null
                    ? "game-brick"
                    : "null-brick"}
                  onClick={() => canMove(currentRowIndex, currentColumnIndex, brickValue, row)}>
                  {brickValue}
                </div>)
            })}
          </div>
        ))}
      </div>
      <button
        className="shuffle-button"
        type="button"
      // onClick={() => setRowArray(randomizer)}
      >
        Slumpa
        </button>
    </article>
  )
}
