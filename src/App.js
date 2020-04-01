import React, { useState } from 'react'
import cloneDeep from 'lodash/cloneDeep'
import './styling/game.css'

// Här sätter jag upp en mer generaliserad spelplan, istället för att skriva hårt som i min inlämnad kod.
// Jag itererar x antal rader och x antal kolumner och genererar tiles.
const generateBoard = () => {
  const numberOfRows = 2
  const numberOfColumns = 2
  const board = []
  let tileNumber = 1

  for (let rowNumber = 1; rowNumber <= numberOfRows; rowNumber += 1) {
    const row = []
    for (let columnNumber = 1; columnNumber <= numberOfColumns; columnNumber += 1) {
      if (rowNumber === numberOfRows && columnNumber === numberOfColumns) {
        row.push(null)
      } else {
        row.push(tileNumber)
        tileNumber += 1
      }
    }
    board.push(row)
  }
  return board
}

// Eftersom initalvärdet av board som jag får ut från generateeBoard är en ordnad array så kan jag använda denna array för att definiera vinnande state.
const winningArray = generateBoard()

// Jag flyttar upp denna funktion eftersom den inte behövs i komponenten App och för att minska risken för buggar
const shuffleArray = (board) => {
  const newRowArray = cloneDeep(board)

  //Uppdatera i och j till mer läsliga namn och gör en forEach ist! 
  for (let i = 0; i < newRowArray.length; i += 1) {
    for (let j = 0; j < newRowArray[i].length; j += 1) {
      const i1 = Math.floor(Math.random() * (newRowArray.length))
      const j1 = Math.floor(Math.random() * (newRowArray.length))
      const temp = newRowArray[i][j]
      newRowArray[i][j] = newRowArray[i1][j1]
      newRowArray[i1][j1] = temp
    }
  }
  return newRowArray
}

// Jag flyttar upp och bryter ut även denna funktion eftersom den inte behövs i komponenten App och för att minska risken för buggar
// Compare rowArray with winningArray to see if the game is won
const isGameWon = (board) => {
  let isWon = true
  board.forEach((row, rowIndex) => {
    row.forEach((column, columnIndex) => {
      if (board[rowIndex][columnIndex] !== winningArray[rowIndex][columnIndex]) {
        isWon = false
      }
    })
  })
  return isWon
}

export const App = () => {
  const [won, setWon] = useState(false)
  // const [rowArray, setRowArray] = useState(shuffleArray(winningArray))
  const [currentGame, setCurrentGame] = useState(shuffleArray(winningArray))

  // Byt namn på ovan från rowArray till tex currentGame

  // Check if the brick can move
  const canMove = (currentRowIndex, currentColumnIndex, brickValue, row) => {
    // make a copy of rowArray to update state of rowArray with the copy
    const newRowArray = cloneDeep(currentGame)

    // Checking if brick can move up (if rowIndex != 0, or if brickValue above is not null. )
    if (currentRowIndex !== 0 && currentGame[currentRowIndex - 1][currentColumnIndex] === null) {
      newRowArray[currentRowIndex - 1][currentColumnIndex] = brickValue;
      newRowArray[currentRowIndex][currentColumnIndex] = null;
    } else if (currentRowIndex !== currentGame.length - 1 && currentGame[currentRowIndex + 1][currentColumnIndex] === null) {
      // Checking if brick can move down (rowIndex = number of elements in array, or if brickValue below is not null)
      newRowArray[currentRowIndex + 1][currentColumnIndex] = brickValue;
      newRowArray[currentRowIndex][currentColumnIndex] = null;
    } else if (currentColumnIndex !== row.length - 1 && currentGame[currentRowIndex][currentColumnIndex + 1] === null) {
      // Checking if brick can move to the right
      newRowArray[currentRowIndex][currentColumnIndex + 1] = brickValue;
      newRowArray[currentRowIndex][currentColumnIndex] = null;
    } else if (currentColumnIndex !== 0 && currentGame[currentRowIndex][currentColumnIndex - 1] === null) {
      // Checking if brick can move to the left
      newRowArray[currentRowIndex][currentColumnIndex - 1] = brickValue;
      newRowArray[currentRowIndex][currentColumnIndex] = null;
    }
    setCurrentGame(newRowArray)
    setWon(isGameWon(newRowArray))
  }

  return (
    <article className="main-container">
      <div className="winning-container">
        {won && (
          <h1 className="winning-title">Bra jobbat, du klarade det!</h1>
        )}
      </div>
      <div className="game-board">
        {currentGame.map((row, currentRowIndex) => (
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
        onClick={() => setCurrentGame(shuffleArray(currentGame))}>
        Slumpa
      </button>
    </article>
  )
}
