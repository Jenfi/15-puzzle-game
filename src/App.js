import React, { useState } from 'react'
import './styling/game.css'

export const App = () => {
  const [won, setWon] = useState(false)
  const [rowArray, setRowArray] = useState([[1, 2, 3, 4, 5], [6, 7, 8, 9, 10], [11, 12, 13, null, 14]])
  const winningArray = [[1, 2, 3, 4, 5], [6, 7, 8, 9, 10], [11, 12, 13, 14, null]]

  // Compare rowArray with winningArray to see if the game is won
  const isGameWon = () => {
    for (let i = 0; rowArray.length - 1 >= i; i++) {
      for (let e = 0; rowArray[i].length - 1 >= e; e++) {
        if (rowArray[i][e] !== winningArray[i][e]) {
          return false;
        }
      }
    }
    return true
  }

  const shuffleArray = () => {
    // Copy array and shuffle the copy to avoid rowArray being shuffled when not asked for
    const newRowArray = rowArray.slice(0);

    for (let i = 0; i < newRowArray.length; i++) {
      for (let j = 0; j < newRowArray[i].length; j++) {
        const i1 = Math.floor(Math.random() * (newRowArray.length))
        const j1 = Math.floor(Math.random() * (newRowArray.length))
        const temp = newRowArray[i][j]
        newRowArray[i][j] = newRowArray[i1][j1]
        newRowArray[i1][j1] = temp
      }
    }
    setRowArray(newRowArray);
  }

  // Check if the brick can move
  const canMove = (currentRowIndex, currentColumnIndex, brickValue, row) => {
    // make a copy of rowArray to update state of rowArray with the copy
    const newRowArray = rowArray.slice(0);

    // Checking if brick can move up (if rowIndex != 0, or if brickValue above is not null. )
    if (currentRowIndex !== 0 && rowArray[currentRowIndex - 1][currentColumnIndex] === null) {
      newRowArray[currentRowIndex - 1][currentColumnIndex] = brickValue;
      newRowArray[currentRowIndex][currentColumnIndex] = null;
      setRowArray(newRowArray)
    } else if (currentRowIndex !== rowArray.length - 1 && rowArray[currentRowIndex + 1][currentColumnIndex] === null) {
      // Checking if brick can move down (rowIndex = number of elements in array, or if brickValue below is not null)
      newRowArray[currentRowIndex + 1][currentColumnIndex] = brickValue;
      newRowArray[currentRowIndex][currentColumnIndex] = null;
      setRowArray(newRowArray)
    } else if (currentColumnIndex !== row.length - 1 && rowArray[currentRowIndex][currentColumnIndex + 1] === null) {
      // Checking if brick can move to the right
      newRowArray[currentRowIndex][currentColumnIndex + 1] = brickValue;
      newRowArray[currentRowIndex][currentColumnIndex] = null;
      setRowArray(newRowArray)
    } else if (currentColumnIndex !== 0 && rowArray[currentRowIndex][currentColumnIndex - 1] === null) {
      // Checking if brick can move to the left
      newRowArray[currentRowIndex][currentColumnIndex - 1] = brickValue;
      newRowArray[currentRowIndex][currentColumnIndex] = null;
      setRowArray(newRowArray)
    }
    setWon(isGameWon(currentRowIndex, currentColumnIndex));
  }

  return (
    <article className="main-container">
      <div className="winning-container">
        {won && (
          <h1 className="winning-title">Bra jobbat, du klarade det!</h1>
        )}
      </div>
      <div className="game-board">
        {rowArray.map((row, currentRowIndex) => (
          <div key={currentRowIndex} className="row">
            {row.map((brickValue, currentColumnIndex) => (
              <div
                key={`${currentRowIndex}-${currentColumnIndex}`}
                className={brickValue !== null
                  ? 'game-brick'
                  : 'null-brick'}
                role="button"
                onClick={() => canMove(currentRowIndex, currentColumnIndex, brickValue, row)}>
                {brickValue}
              </div>
            ))}
          </div>
        ))}
      </div>
      <button
        className="shuffle-button"
        type="button"
        onClick={() => shuffleArray()}>
        Slumpa
      </button>
    </article>
  )
}
