import React, { useState } from 'react'
import './styling/game.css'

export const App = () => {
  const [won, setWon] = useState(false)
  const [rowArray, setRowArray] = useState([[1, 2, 3, 4, 5], [6, 7, 8, 9, 10], [11, 12, 13, null, 14]])
  const winningArray = [[1, 2, 3, 4, 5], [6, 7, 8, 9, 10], [11, 12, 13, 14, null]]

  // GLÖM EJ INTE FIREWORKS!!!
  // ANIMATION?

  // Compare rowArray with winningArray to see if the game is won
  // const isGameWon = (currentRowIndex, currentColumnIndex) => {
  //   if (rowArray[currentRowIndex][currentColumnIndex] !== winningArray[currentRowIndex][currentColumnIndex] && rowArray !== winningArray) {
  //     // if (rowArray[currentRowIndex] !== winningArray[currentRowIndex] && rowArray[currentColumnIndex] !== winningArray[currentColumnIndex]) {
  //     console.log('not won')
  //     console.log(rowArray)
  //     console.log(rowArray[currentRowIndex][currentColumnIndex])

  //     return false;
  //   } else if (rowArray === winningArray) {
  //     console.log('winning')
  //     console.log(rowArray[currentRowIndex][currentColumnIndex])

  //     console.log(rowArray)
  //     return true
  //   }
  // }

  // const isGameWon = (row) => {
  //   for (var i = 0; rowArray.length < i; i++) {
  //     for (var j = 0; row.length < j; j++) {
  //       if (rowArray[i][j] !== winningArray[i][j]) {
  //         return false
  //       }
  //     }
  //   }
  //   return true
  // }

  const isGameWon = () => {
    for (var i = 0; rowArray.length - 1 >= i; i++) {
      for (var e = 0; rowArray[i].length - 1 >= e; e++) {
        if (rowArray[i][e] !== winningArray[i][e]) {
          return false;
        }
      }
    }
    console.log('is winning')
    return true
  }

  // // Returns randomized order of game-array
  const shuffleArray = () => {
    //   let currentIndex = array.lenght, temporaryValue, randomIndex;
    for (var i = 0; i < rowArray.length; i++) {
      for (var j = 0; j < rowArray[i].length; j++) {
        var i1 = Math.floor(Math.random() * (rowArray.length))
        var j1 = Math.floor(Math.random() * (rowArray.length))

        var temp = rowArray[i][j]
        rowArray[i][j] = rowArray[i1][j1]
        rowArray[i1][j1] = temp
      }
    }
    return rowArray
  }

  // const shuffleRowArray = () => {
  //   let i, j, temp;
  //   for (let i = rowArray.length - 1; i > 0; i--) {
  //     j = Math.floor(Math.random() * (i + 1));
  //     temp = rowArray[i];
  //     rowArray[i] = rowArray[j]
  //     rowArray[j] = temp;
  //   }
  //   return rowArray;
  // }

  // console.log(shuffleRowArray(rowArray))

  // const shuffleRow = (row) => {
  //   let i, j, temp;
  //   for (i = row.length - 1; i > 0; i--) {
  //     j = Math.floor(Math.random() * (i + 1));
  //     temp = row[i];
  //     row[i] = row[j]
  //     row[j] = temp;
  //   }
  //   return row;
  // }
  // console.log(shuffleRow(row))

  // Handles state of bricks, with randomizer(game)
  // as initial to return a random order of bricks from start
  // const [bricks, setBricks] = useState(randomizer(rowArray))
  // Uppdatera denna för att kunna köra en randomized?

  const canMove = (currentRowIndex, currentColumnIndex, brickValue, row) => {
    // make a copy of rowArray to update state of rowArray with the copy
    let newRowArray = rowArray.slice(0);

    // Checking if brick can move up (if rowIndex != 0, or if brickValue above is not null. )
    if (currentRowIndex !== 0
      && rowArray[currentRowIndex - 1][currentColumnIndex] === null) {
      newRowArray[currentRowIndex - 1][currentColumnIndex] = brickValue;
      newRowArray[currentRowIndex][currentColumnIndex] = null;
      setRowArray(newRowArray)
    } else if (currentRowIndex !== rowArray.length - 1
      && rowArray[currentRowIndex + 1][currentColumnIndex] === null) {
      // Checking if brick can move down (rowIndex = number of elements in array, or if brickValue below is not null)
      newRowArray[currentRowIndex + 1][currentColumnIndex] = brickValue;
      newRowArray[currentRowIndex][currentColumnIndex] = null;
      setRowArray(newRowArray)
    } else if (currentColumnIndex !== row.length - 1
      && rowArray[currentRowIndex][currentColumnIndex + 1] === null) {
      // Checking if brick can move to the right
      newRowArray[currentRowIndex][currentColumnIndex + 1] = brickValue;
      newRowArray[currentRowIndex][currentColumnIndex] = null;
      setRowArray(newRowArray)
    } else if (currentColumnIndex !== 0
      && rowArray[currentRowIndex][currentColumnIndex - 1] === null) {
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
        // onClick={() => shuffleArray(rowArray)}>
        onClick={(i, j, temp) => console.log(shuffleArray(rowArray, i, j, temp))}>
        Slumpa
      </button>
    </article>
  )
}
