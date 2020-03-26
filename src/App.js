import React, { useState } from 'react'
import './styling/game.css'

export const App = () => {
  const [won, setWon] = useState(false)
  // const rowArray = [[1, 2, 3, 4, 5], [6, 7, 8, 9, 10], [11, 12, 13, 14, null]]
  const rowArray = [[1, 3], [2, null], [4, 5]]


  // const [moveUp, setMoveUp] = useState(true)

  // for every element in boardGame, check the position
  //for every element in each row, check the position

  /* 
  Position: 
  För varje element så måste jag gå igenom med en map och checka position i boardGame och i row
  
  const [moveUp, setMoveUp] ) useState(true)
  const [moveLeft, setMoveLeft] ) useState(true)
  const [moveRight, setMoveRight] ) useState(true)
  const [moveLeft, setMoveLeft] ) useState(true)
     
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
*/


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


    //Flytta logiken nedifrån hit!
  }

  // Make an array that is there just to compare with, to see if won.

  return (
    <article className="main-container">
      {won && (
        <h1 className="winning-title">Bra jobbat, du klarade det!</h1>
      )}
      <div className="game-board">
        {rowArray.map((row, rowIndex) => (

          <div key={rowIndex} className="row">
            {row.map((brickValue, columnIndex) => {


              //Checking if brick can move up (if rowIndex = 0, or if brickValue above is not null. )
              if (rowIndex !== 0 && rowArray[rowIndex - 1][columnIndex] === null) {

                // if (rowIndex === 0) {
                console.log(`${brickValue} - this brick can move up`)

                // } else if (rowIndex !== 0 && row[rowIndex - 1] && brickValue !== null) {
                // console.log(`${brickValue} - this brick cannot move up`)
              } else {
                console.log(`${brickValue} - this brick cannot move up`)

              }

              //Checking if brick can move down (if rowIndex = number of elements in array, or if brickValue below is not null)
              if (rowIndex === rowArray.length - 1 || rowIndex !== rowArray.length - 1 && rowArray[rowIndex + 1] && columnIndex[columnIndex] && brickValue !== null) {

                // if (rowIndex === rowArray.length - 1) {
                // console.log(`${brickValue} - this brick cannot move down`)
                // console.log(`${brickValue} - columnIndex: ${columnIndex}`)
                // console.log(`${brickValue} - rowIndex: ${rowIndex}`)


                // } else if (rowIndex !== rowArray.length - 1 && rowArray[rowIndex + 1] && columnIndex[columnIndex] && brickValue !== null) {
                //   console.log(`${brickValue} - this brick cannot move down`)
              }
              else {
                // console.log(`${brickValue} - this brick can move down`)

              }

              //Checking if brick can move to the right
              if (columnIndex === row.length - 1) {
                // console.log(`${brickValue} - this brick cannot move to the right`)
              } else {
                // console.log(`${brickValue} - this brick can move to the right`)
              }

              //Checking if brick can move to the left
              if (columnIndex !== 0) {
                // console.log(`${brickValue} - this brick can move to the left`)
              } else {
                // console.log(`${brickValue} - this brick cannot move to the left`)
              }


              return (
                <div
                  key={`${rowIndex}-${columnIndex}`}
                  className={brickValue !== null
                    ? "game-brick"
                    : "null-brick"}
                  onClick={handleMove}>
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
