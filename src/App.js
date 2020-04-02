import React, { useState } from 'react'
import cloneDeep from 'lodash/cloneDeep'
import './styling/game.css'

// ) Här sätter jag upp en mer generaliserad spelplan, istället för att skriva hårt som i min inlämnad kod.
// Jag itererar x antal rader och x antal kolumner och genererar tiles.
const generateBoard = () => {
  const numberOfRows = 3
  const numberOfColumns = 5
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
  const newGame = cloneDeep(board)

  // Skrev om från for till forEach pga mer lättläsligt
  newGame.forEach((row, rowIndex) => {
    row.forEach((column, columnIndex) => {
      const rowIndex1 = Math.floor(Math.random() * (newGame.length))
      const columnIndex1 = Math.floor(Math.random() * (newGame.length))
      const temp = newGame[rowIndex][columnIndex]
      newGame[rowIndex][columnIndex] = newGame[rowIndex1][columnIndex1]
      newGame[rowIndex1][columnIndex1] = temp
    })
  })
  return newGame
}

// Jag flyttar upp och bryter ut även denna funktion eftersom den inte behövs i komponenten App och för att minska risken för buggar
// Compares board with winningArray to see if the game is won
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
  const [currentGame, setCurrentGame] = useState(shuffleArray(winningArray)) // Här gör jag initialvärdet av currentGame till en shufflead array. Detta kunde jag inte göra tidigare.

  // Check if the brick can move
  const canMove = (currentRowIndex, currentColumnIndex, brickValue, row) => {
    // Ändrat från slice till cloneDeep från lodash-bibliotek. Testade ... spread men den tycktes inte kopiera children utan bara referera till children.
    const newGame = cloneDeep(currentGame)

    // Checking if brick can move up
    if (currentRowIndex !== 0 && currentGame[currentRowIndex - 1][currentColumnIndex] === null) {
      newGame[currentRowIndex - 1][currentColumnIndex] = brickValue
      newGame[currentRowIndex][currentColumnIndex] = null
    } else if (currentRowIndex !== currentGame.length - 1 && currentGame[currentRowIndex + 1][currentColumnIndex] === null) {
      // Checking if brick can move down
      newGame[currentRowIndex + 1][currentColumnIndex] = brickValue
      newGame[currentRowIndex][currentColumnIndex] = null
    } else if (currentColumnIndex !== row.length - 1 && currentGame[currentRowIndex][currentColumnIndex + 1] === null) {
      // Checking if brick can move to the right
      newGame[currentRowIndex][currentColumnIndex + 1] = brickValue
      newGame[currentRowIndex][currentColumnIndex] = null
    } else if (currentColumnIndex !== 0 && currentGame[currentRowIndex][currentColumnIndex - 1] === null) {
      // Checking if brick can move to the left
      newGame[currentRowIndex][currentColumnIndex - 1] = brickValue
      newGame[currentRowIndex][currentColumnIndex] = null
    }
    // Flyttade ner setCurrentGame hit istället för att koden ska "run smooth"
    setCurrentGame(newGame)
    setWon(isGameWon(newGame))
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
