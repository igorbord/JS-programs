'use strict'

window.onload = (function () {
    const gameField = document.querySelector('#gameField')
    const actualScore = document.querySelector('#actualScore')
    const favoriteScore = document.querySelector('#favoriteScore')
    const selectLevel = document.querySelector('#selectLevel')
    const startMenu = document.querySelector('#startMenu')
    const endGame = document.querySelector('#endGame')
    const volume = document.querySelector('#volume')
    const sound = document.querySelector('#sound')

    let flagVolumeOn = true

    volume.onclick = function () {
        flagVolumeOn = !flagVolumeOn

        if (!flagVolumeOn) {
            volume.querySelector('#volumeOn').hidden = true;
            volume.querySelector('#volumeOff').hidden = false;
        } else {
            volume.querySelector('#volumeOn').hidden = false;
            volume.querySelector('#volumeOff').hidden = true;
        }
    }

    selectLevel.onclick = function (event) {

        startMenu.hidden = true
        let startPoint = 3

        setTimeout(function intervalStartGame() {

            if (startPoint >= 0) {
                endGame.hidden = false
                endGame.querySelector('.game__gameOver p').innerHTML = startPoint--

                let scale = 1
                let startPointAnimation = setInterval(() => {
                    endGame.querySelector('.game__gameOver p').style.transform = `scale(${scale})`
                    scale += 0.1
                }, 10);

                if (flagVolumeOn) sound.querySelector('#startPoint').play()


                setTimeout(() => {
                    clearInterval(startPointAnimation)
                }, 50);

                setTimeout(() => {
                    endGame.querySelector('.game__gameOver p').innerHTML = ''
                }, 600);

                intervalStartGameId = setTimeout(intervalStartGame, 800)
            } else {

                endGame.hidden = true

                setTimeout(() => {
                    let level
                    let bestScore
                    let point
                    switch (event.target.id) {
                        case 'easy': level = 400; bestScore = +localStorage.getItem('bestScoreEast') || 0; point = 5; break
                        case 'medium': level = 300; bestScore = +localStorage.getItem('bestScoreMedium') || 0; point = 6; break
                        case 'hard': level = 200; bestScore = +localStorage.getItem('bestScoreHard') || 0; point = 7; break
                        default: level = 400; bestScore = +localStorage.getItem('bestScoreEast') || 0; point = 5; break
                    }

                    let score = 0

                    favoriteScore.textContent = 'best ' + bestScore
                    actualScore.textContent = score

                    startMenu.hidden = true

                    const field = []//1 - shape, 2 - apple
                    for (let i = 0; i < 13 * 20; i++) {
                        field[i] = 0
                    }

                    buildField(gameField, field)

                    const shape = []
                    for (let i = 150, j = 0; i <= 210; i += 20, j++) {
                        shape[j] = i
                    }

                    for (let i = 0; i < shape.length; i++) {
                        field[shape[i]] = 1
                    }

                    buildApple(field)
                    drawField(field, shape)

                    let course = 'up'
                    let keyDown = false
                    addEventListener('keydown', function (event) {
                        if (keyDown) {
                            if (event.key === 'ArrowUp' && course !== 'down') course = 'up'
                            if (event.key === 'ArrowLeft' && course !== 'right') course = 'left'
                            if (event.key === 'ArrowRight' && course !== 'left') course = 'right'
                            if (event.key === 'ArrowDown' && course !== 'up') course = 'down'
                            keyDown = false
                        }
                    })

                    let intervalId = setInterval(() => {
                        keyDown = true
                        if (course === 'up') shape.unshift(shape[0] - 20)
                        if (course === 'left') shape.unshift(shape[0] - 1)
                        if (course === 'right') shape.unshift(shape[0] + 1)
                        if (course === 'down') shape.unshift(shape[0] + 20)

                        if (field[shape[0]] === 2) {

                            if (flagVolumeOn) sound.querySelector('#eatApple').play()

                            shape.push(shape[shape.length - 1])
                            score += point
                            actualScore.textContent = score
                            if (bestScore < score) {
                                bestScore = score
                                favoriteScore.textContent = 'best ' + bestScore
                            }
                            buildApple(field)
                        }

                        if (!field.includes(0)) {
                            clearInterval(intervalId)

                            if (flagVolumeOn) sound.querySelector('#win').play()

                            showEndGameMenu('You Win!', field)
                            switch (event.target.id) {
                                case 'easy': localStorage.setItem('bestScoreEast', bestScore); break
                                case 'medium': localStorage.setItem('bestScoreMedium', bestScore); break
                                case 'hard': localStorage.setItem('bestScoreHard', bestScore); break
                                default: localStorage.setItem('bestScoreEast', bestScore); break
                            }
                        } else if (checkTheGameOver(field, course, shape)) {
                            clearInterval(intervalId)

                            if (flagVolumeOn) sound.querySelector('#gameOver').play()

                            showEndGameMenu('<span>Game</span>Over!', field)//<span>Game</span>Over!

                            switch (event.target.id) {
                                case 'easy': localStorage.setItem('bestScoreEast', bestScore); break
                                case 'medium': localStorage.setItem('bestScoreMedium', bestScore); break
                                case 'hard': localStorage.setItem('bestScoreHard', bestScore); break
                                default: localStorage.setItem('bestScoreEast', bestScore); break
                            }
                        } else {
                            field[shape[shape.length - 1]] = 0
                            shape.pop()
                            drawField(field, shape)
                        }

                    }, level)
                }, 100)
            }
        }, 0);
    }
})()

function buildField(gameField, field) {
    let strbuildfield = ''

    strbuildfield += '<div class="field">'
    for (let j = 0; j < field.length; j++) {
        strbuildfield += '<div class="cell"></div>'
    }
    strbuildfield += '</div>'
    gameField.insertAdjacentHTML('afterbegin', strbuildfield)
}

function drawField(field, shape) {
    for (let i = 0; i < shape.length; i++) {
        field[shape[i]] = 1
    }

    for (let i = 0; i < field.length; i++) {
        if (field[i] === 1) {
            gameField.querySelectorAll('.cell')[i].classList.add('shake')
        } else if (field[i] === 2) {
            gameField.querySelectorAll('.cell')[i].classList.add('apple')
        } else {
            gameField.querySelectorAll('.cell')[i].classList.remove('shake')
            gameField.querySelectorAll('.cell')[i].classList.remove('apple')
        }
    }
}

function buildApple(field) {
    const emptyCellsfield = []

    for (let i = 0; i < field.length; i++) {
        if (field[i] === 0) {
            emptyCellsfield.push(i)
        }
    }

    if (emptyCellsfield.length !== 0) {
        let apple = 0
        apple = Math.floor(Math.random() * Math.floor(emptyCellsfield.length))
        field[emptyCellsfield[apple]] = 2
    }
}

function checkTheGameOver(field, course, shape) {
    return (
        field[shape[0]] === 1 ||
        (shape[0] + 1) % 20 === 0 && course === 'left' ||
        (shape[0]) % 20 === 0 && course === 'right' ||
        shape[0] < 0 ||
        shape[0] > field.length
    )
}

function checkTheWinGame(field) {
    return !field.includes(0)
}

function showEndGameMenu(text, field) {
    const endGame = document.querySelector('#endGame')
    endGame.hidden = false
    endGame.querySelector('.game__gameOver p').innerHTML = text

    let scale = 1
    let endGameAnimation = setInterval(() => {
        endGame.querySelector('.game__gameOver p').style.transform = `scale(${scale})`
        scale += 0.1
    }, 10);

    setTimeout(() => {
        clearInterval(endGameAnimation)
    }, 50);

    endGame.onclick = function () {
        gameField.querySelector('.field').innerHTML = ''
        endGame.hidden = true
        startMenu.hidden = false
        actualScore.textContent = ''
        favoriteScore.textContent = ''
    }
}
