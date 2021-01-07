const player1 = document.querySelector('#player1')
const player2 = document.querySelector('#player2')
const pointPlayer1 = document.querySelector('#player1Points')
const pointPlayer2 = document.querySelector('#player2Points')
const secondPlayerHuman = document.querySelector('#SecondPlayerHuman')
const secondPlayerComputer = document.querySelector('#SecondPlayerComputer')
const playingField = document.querySelector('#playingField')
const cells = document.querySelectorAll('.cell')
const message = document.querySelector('#message')

const player1Figure = 'cross'
const player2Figure = 'zero'

let valuePointPlayer1 = 0
let valuePointPlayer2 = 0

let player1vsPlayer2 = true
let move = 0

clearField()
setMovePlayer()

secondPlayerComputer.onclick = function () {
    player1vsPlayer2 = false
    player1.textContent = 'Player'
    player2.textContent = 'Computer'
    secondPlayerComputer.style.display = 'none'
    secondPlayerHuman.style.display = 'inline'
    player1.style.backgroundColor = 'rgba(0,0,0,.15)'
    player2.style.backgroundColor = 'transparent'
    clearField()
}

secondPlayerHuman.onclick = function () {
    player1vsPlayer2 = true
    player2.textContent = 'Player2'
    secondPlayerComputer.style.display = 'inline'
    secondPlayerHuman.style.display = 'none'
    clearField()
}

playingField.onclick = function (event) {
    event = event.path[1]

    if (!(event.classList.contains(player1Figure) || event.classList.contains(player2Figure)))
        if (move % 2 === 0) {
            event.classList.add(player1Figure)
            event.classList.remove('emptyCell')

            if (!checkEmptyCells()) {
                getTie()
                setTimeout(clearField, 2000)
            }
            if (player1vsPlayer2) {
                move++
            } else { // Ход компьютера
                if (checkEmptyCells()) {
                    while (true) {
                        const i = Math.floor(Math.random() * Math.floor(9))

                        if (!(cells[i].classList.contains(player1Figure) || cells[i].classList.contains(player2Figure))) {
                            cells[i].classList.add(player2Figure)
                            cells[i].classList.remove('emptyCell')
                            if (!checkEmptyCells()) {
                                getTie()
                                setTimeout(clearField, 2000)
                            }

                            break
                        }
                    }
                }
            }
        } else {
            event.classList.add(player2Figure)
            event.classList.remove('emptyCell')
            if (!checkEmptyCells()) {
                getTie()
                setTimeout(clearField, 2000)
            }
            move++
        }

    setMovePlayer()

    const winner = checkWinner()
    if (winner.player1 || winner.player2) {
        if (winner.player1) {
            valuePointPlayer1++
        }
        else {
            valuePointPlayer2++
        }
        getWinner(winner)
        setTimeout(clearField, 2000)
    }
}

function getTie() {
    message.style.display = 'flex'
    message.textContent = 'Tie'
}

function setMovePlayer() {
    if (move % 2 === 0) {
        player1.style.backgroundColor = 'rgba(0,0,0,.15)'
        player2.style.backgroundColor = 'transparent'
    } else {
        player2.style.backgroundColor = 'rgba(0,0,0,.15)'
        player1.style.backgroundColor = 'transparent'
    }
}

function clearField() {
    for (let cell of cells) {
        cell.classList.remove(player1Figure)
        cell.classList.remove(player2Figure)
        cell.classList.add('emptyCell')
    }

    valuePointPlayer1 = 0
    valuePointPlayer2 = 0
    message.style.display = 'none'
}

function checkEmptyCells() {
    let flagEmptyCell = false
    for (let i = 0; i < 9; i++) {
        if (!(cells[i].classList.contains(player1Figure) || cells[i].classList.contains(player2Figure))) {
            flagEmptyCell = true
            break
        }
    }
    return flagEmptyCell
}

function getWinner(winner) {
    pointPlayer1.textContent = valuePointPlayer1
    pointPlayer2.textContent = valuePointPlayer2

    message.style.display = 'flex'
    if (winner.player1)
        message.textContent = 'Player1 Win!'
    else if (player1vsPlayer2)
        message.textContent = 'Player2 Win!'
    else
        message.textContent = 'Computer Win!'
}

function checkWinner() {
    let flagPlayer1Winner = false
    let flagPlayer2Winner = false

    // Проверка Крестиков
    if (cells[0].classList.contains(player1Figure) && cells[1].classList.contains(player1Figure) && cells[2].classList.contains(player1Figure) ||
        cells[3].classList.contains(player1Figure) && cells[4].classList.contains(player1Figure) && cells[5].classList.contains(player1Figure) ||
        cells[6].classList.contains(player1Figure) && cells[7].classList.contains(player1Figure) && cells[8].classList.contains(player1Figure) ||
        cells[0].classList.contains(player1Figure) && cells[3].classList.contains(player1Figure) && cells[6].classList.contains(player1Figure) ||
        cells[1].classList.contains(player1Figure) && cells[4].classList.contains(player1Figure) && cells[7].classList.contains(player1Figure) ||
        cells[2].classList.contains(player1Figure) && cells[5].classList.contains(player1Figure) && cells[8].classList.contains(player1Figure) ||
        cells[0].classList.contains(player1Figure) && cells[4].classList.contains(player1Figure) && cells[8].classList.contains(player1Figure) ||
        cells[2].classList.contains(player1Figure) && cells[4].classList.contains(player1Figure) && cells[6].classList.contains(player1Figure)) {
        flagPlayer1Winner = true
    }

    //Проверка ноликов
    if (cells[0].classList.contains(player2Figure) && cells[1].classList.contains(player2Figure) && cells[2].classList.contains(player2Figure) ||
        cells[3].classList.contains(player2Figure) && cells[4].classList.contains(player2Figure) && cells[5].classList.contains(player2Figure) ||
        cells[6].classList.contains(player2Figure) && cells[7].classList.contains(player2Figure) && cells[8].classList.contains(player2Figure) ||
        cells[0].classList.contains(player2Figure) && cells[3].classList.contains(player2Figure) && cells[6].classList.contains(player2Figure) ||
        cells[1].classList.contains(player2Figure) && cells[4].classList.contains(player2Figure) && cells[7].classList.contains(player2Figure) ||
        cells[2].classList.contains(player2Figure) && cells[5].classList.contains(player2Figure) && cells[8].classList.contains(player2Figure) ||
        cells[0].classList.contains(player2Figure) && cells[4].classList.contains(player2Figure) && cells[8].classList.contains(player2Figure) ||
        cells[2].classList.contains(player2Figure) && cells[4].classList.contains(player2Figure) && cells[6].classList.contains(player2Figure)) {
        flagPlayer2Winner = true
    }

    return {
        player1: flagPlayer1Winner,
        player2: flagPlayer2Winner
    }
}


// const cells = document.querySelectorAll('.cell')
// const pointHuman = document.querySelector('#humanPoints')
// const pointComputer = document.querySelector('#computerPoints')

// const figures = ['cross', 'zero']
// // const humanFigure = figures[Math.round(Math.random())]
// const humanFigure = figures[0]
// const computerFigure = humanFigure === figures[0] ? figures[1] : figures[0]

// let valuePointHuman = 0
// let valuePointComputer = 0

// for (let cell of cells) {
//     cell.onclick = function () {

//         let flagEndGame = false
//         let flagFullCell = false
//         let flagEmptyCell = false

//         if (!(cell.classList.contains(humanFigure) || cell.classList.contains(computerFigure))) {

//             // Ход человека
//             cell.classList.add(humanFigure)
//             cell.classList.remove('emptyCell')

//             // Проверка заполненности поля
//             for (let i = 0; i < 9; i++) {
//                 if (!(cells[i].classList.contains(humanFigure) || cells[i].classList.contains(computerFigure))) {
//                     flagEmptyCell = true
//                 }
//             }

//             // Проверка победителя
//             let winner = checkWinner()
//             if (winner[0] || winner[1]) {
//                 getWinner(winner)
//                 flagEndGame = true
//             }

//             //Ход компьютера
//             if (!(winner[0] || winner[1]) && flagEmptyCell) {

//                 // Позиции компьютерных фигур
//                 const arrComputerFiguresPosition = []

//                 for (let i = 0; i < 9; i++) {
//                     if (cells[i].classList.contains(computerFigure)) {
//                         arrComputerFiguresPosition.push(i)
//                     }
//                 }

//                 // Первый ход рандомный
//                 // if (!arrComputerFiguresPosition.length) {
//                 while (flagEmptyCell) {
//                     const i = Math.floor(Math.random() * Math.floor(9))

//                     if (!(cells[i].classList.contains(humanFigure) || cells[i].classList.contains(computerFigure))) {
//                         cells[i].classList.add(computerFigure)
//                         cells[i].classList.remove('emptyCell')
//                         flagEmptyCell = false
//                     }
//                 }
//                 // }

//                 // // Проверка возможных ходов
//                 // const arrComputerVariableGo = [] //индексы ячеек на которых есть компьютерная фигура, с которой можно собрать комбинацию из трёх фигур

//                 // for (let computerFigurePosition of arrComputerFiguresPosition) {

//                 //     switch (computerFigurePosition) {
//                 //         case 0:
//                 //             if (!cells[computerFigurePosition + 1].classList.contains(humanFigure) &&
//                 //                 !cells[computerFigurePosition + 2].classList.contains(humanFigure) ||
//                 //                 !cells[computerFigurePosition + 4].classList.contains(humanFigure) &&
//                 //                 !cells[computerFigurePosition + 8].classList.contains(humanFigure) ||
//                 //                 !cells[computerFigurePosition + 3].classList.contains(humanFigure) &&
//                 //                 !cells[computerFigurePosition + 6].classList.contains(humanFigure)) {
//                 //                 arrComputerVariableGo.push(computerFigurePosition)
//                 //             }
//                 //             break
//                 //         case 1:
//                 //             if (!cells[computerFigurePosition - 1].classList.contains(humanFigure) &&
//                 //                 !cells[computerFigurePosition + 1].classList.contains(humanFigure) ||
//                 //                 !cells[computerFigurePosition + 3].classList.contains(humanFigure) &&
//                 //                 !cells[computerFigurePosition + 6].classList.contains(humanFigure)) {
//                 //                 arrComputerVariableGo.push(computerFigurePosition)
//                 //             }
//                 //             break
//                 //         case 2:
//                 //             if (!cells[computerFigurePosition - 1].classList.contains(humanFigure) &&
//                 //                 !cells[computerFigurePosition - 2].classList.contains(humanFigure) ||
//                 //                 !cells[computerFigurePosition + 3].classList.contains(humanFigure) &&
//                 //                 !cells[computerFigurePosition + 6].classList.contains(humanFigure) ||
//                 //                 !cells[computerFigurePosition + 2].classList.contains(humanFigure) &&
//                 //                 !cells[computerFigurePosition + 4].classList.contains(humanFigure)) {
//                 //                 arrComputerVariableGo.push(computerFigurePosition)
//                 //             }
//                 //             break
//                 //         case 3:
//                 //             if (!cells[computerFigurePosition - 3].classList.contains(humanFigure) &&
//                 //                 !cells[computerFigurePosition + 3].classList.contains(humanFigure) ||
//                 //                 !cells[computerFigurePosition + 1].classList.contains(humanFigure) &&
//                 //                 !cells[computerFigurePosition + 2].classList.contains(humanFigure)) {
//                 //                 arrComputerVariableGo.push(computerFigurePosition)
//                 //             }
//                 //             break
//                 //         case 4:
//                 //             if (!cells[computerFigurePosition - 3].classList.contains(humanFigure) &&
//                 //                 !cells[computerFigurePosition + 3].classList.contains(humanFigure) ||
//                 //                 !cells[computerFigurePosition - 1].classList.contains(humanFigure) &&
//                 //                 !cells[computerFigurePosition + 1].classList.contains(humanFigure) ||
//                 //                 !cells[computerFigurePosition - 4].classList.contains(humanFigure) &&
//                 //                 !cells[computerFigurePosition + 4].classList.contains(humanFigure) ||
//                 //                 !cells[computerFigurePosition - 2].classList.contains(humanFigure) &&
//                 //                 !cells[computerFigurePosition + 2].classList.contains(humanFigure)) {
//                 //                 arrComputerVariableGo.push(computerFigurePosition)
//                 //             }
//                 //             break
//                 //         case 5:
//                 //             if (!cells[computerFigurePosition - 3].classList.contains(humanFigure) &&
//                 //                 !cells[computerFigurePosition + 3].classList.contains(humanFigure) ||
//                 //                 !cells[computerFigurePosition - 1].classList.contains(humanFigure) &&
//                 //                 !cells[computerFigurePosition - 2].classList.contains(humanFigure)) {
//                 //                 arrComputerVariableGo.push(computerFigurePosition)
//                 //             }
//                 //             break
//                 //         case 6:
//                 //             if (!cells[computerFigurePosition - 3].classList.contains(humanFigure) &&
//                 //                 !cells[computerFigurePosition - 6].classList.contains(humanFigure) ||
//                 //                 !cells[computerFigurePosition - 2].classList.contains(humanFigure) &&
//                 //                 !cells[computerFigurePosition - 4].classList.contains(humanFigure) ||
//                 //                 !cells[computerFigurePosition + 1].classList.contains(humanFigure) &&
//                 //                 !cells[computerFigurePosition + 2].classList.contains(humanFigure)) {
//                 //                 arrComputerVariableGo.push(computerFigurePosition)
//                 //             }
//                 //             break
//                 //         case 7:
//                 //             if (!cells[computerFigurePosition - 1].classList.contains(humanFigure) &&
//                 //                 !cells[computerFigurePosition + 1].classList.contains(humanFigure) ||
//                 //                 !cells[computerFigurePosition - 3].classList.contains(humanFigure) &&
//                 //                 !cells[computerFigurePosition - 6].classList.contains(humanFigure)) {
//                 //                 arrComputerVariableGo.push(computerFigurePosition)
//                 //             }
//                 //             break
//                 //         case 8:
//                 //             if (!cells[computerFigurePosition - 3].classList.contains(humanFigure) &&
//                 //                 !cells[computerFigurePosition - 6].classList.contains(humanFigure) ||
//                 //                 !cells[computerFigurePosition - 1].classList.contains(humanFigure) &&
//                 //                 !cells[computerFigurePosition - 2].classList.contains(humanFigure) ||
//                 //                 !cells[computerFigurePosition - 4].classList.contains(humanFigure) &&
//                 //                 !cells[computerFigurePosition - 8].classList.contains(humanFigure)) {
//                 //                 arrComputerVariableGo.push(computerFigurePosition)
//                 //             }
//                 //             break
//                 //     }
//                 //     console.log(arrComputerVariableGo)
//                 // }


//             }

//             winner = checkWinner()

//             if ((winner[0] || winner[1]) && !flagEndGame) {
//                 getWinner(winner)
//                 flagEndGame = true
//             }

//             for (let i = 0; i < 9; i++) {
//                 if (!(cells[i].classList.contains(humanFigure) || cells[i].classList.contains(computerFigure))) {
//                     flagFullCell = true
//                 }
//             }
//             if (flagEndGame || !flagFullCell) {

//                 setTimeout(() => {
//                     for (let resetCell of cells) {
//                         resetCell.classList.remove(humanFigure)
//                         resetCell.classList.remove(computerFigure)
//                         resetCell.classList.add('emptyCell')
//                     }
//                 }, 1000)
//             }
//         }
//     }
// }

// function getWinner(winner) {

//     if (winner[0]) {
//         valuePointHuman++
//     } else {
//         valuePointComputer++
//     }

//     pointHuman.textContent = valuePointHuman
//     pointComputer.textContent = valuePointComputer
// }

// function checkWinner() {

//     let flagHumanWinner = false
//     let flagComputerWinner = false

//     // Проверка Крестиков
//     if (cells[0].classList.contains(humanFigure) && cells[1].classList.contains(humanFigure) && cells[2].classList.contains(humanFigure) ||
//         cells[3].classList.contains(humanFigure) && cells[4].classList.contains(humanFigure) && cells[5].classList.contains(humanFigure) ||
//         cells[6].classList.contains(humanFigure) && cells[7].classList.contains(humanFigure) && cells[8].classList.contains(humanFigure) ||
//         cells[0].classList.contains(humanFigure) && cells[3].classList.contains(humanFigure) && cells[6].classList.contains(humanFigure) ||
//         cells[1].classList.contains(humanFigure) && cells[4].classList.contains(humanFigure) && cells[7].classList.contains(humanFigure) ||
//         cells[2].classList.contains(humanFigure) && cells[5].classList.contains(humanFigure) && cells[8].classList.contains(humanFigure) ||
//         cells[0].classList.contains(humanFigure) && cells[4].classList.contains(humanFigure) && cells[8].classList.contains(humanFigure) ||
//         cells[2].classList.contains(humanFigure) && cells[4].classList.contains(humanFigure) && cells[6].classList.contains(humanFigure)) {
//         flagHumanWinner = true
//     }

//     //Проверка ноликов
//     if (cells[0].classList.contains(computerFigure) && cells[1].classList.contains(computerFigure) && cells[2].classList.contains(computerFigure) ||
//         cells[3].classList.contains(computerFigure) && cells[4].classList.contains(computerFigure) && cells[5].classList.contains(computerFigure) ||
//         cells[6].classList.contains(computerFigure) && cells[7].classList.contains(computerFigure) && cells[8].classList.contains(computerFigure) ||
//         cells[0].classList.contains(computerFigure) && cells[3].classList.contains(computerFigure) && cells[6].classList.contains(computerFigure) ||
//         cells[1].classList.contains(computerFigure) && cells[4].classList.contains(computerFigure) && cells[7].classList.contains(computerFigure) ||
//         cells[2].classList.contains(computerFigure) && cells[5].classList.contains(computerFigure) && cells[8].classList.contains(computerFigure) ||
//         cells[0].classList.contains(computerFigure) && cells[4].classList.contains(computerFigure) && cells[8].classList.contains(computerFigure) ||
//         cells[2].classList.contains(computerFigure) && cells[4].classList.contains(computerFigure) && cells[6].classList.contains(computerFigure)) {
//         flagComputerWinner = true
//     }

//     return [flagHumanWinner, flagComputerWinner]
// }