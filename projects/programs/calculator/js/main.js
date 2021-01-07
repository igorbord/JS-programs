const calc = document.querySelector('.calc')
const input = calc.querySelector('#input')
const numbers = calc.querySelectorAll('.number')
const acts = calc.querySelectorAll('.act')
const topBtns = calc.querySelectorAll('.top')

let strResult = ''
input.value = 0

let flagActivateAct = false
let flagActivateEquals = false

function getResult() {
    console.log(strResult)
    let result = String(eval(strResult))
    return result
}

function clearCalc() {
    strResult = ''
    input.value = 0
    resetActBtn()
}


function resetActBtn() {
    for (let act of acts) {
        act.classList.remove('active')
    }
}

for (let btnNum of numbers) {
    btnNum.onclick = function () {
        if (this.id === 'numberComma') {
            if (input.value === '0') {
                input.value = '0'
            }
        } else
            if (input.value === '0' || flagActivateAct || flagActivateEquals) {
                input.value = ''
                flagActivateAct = false
                flagActivateEquals = false
            }
        input.value += btnNum.textContent
    }
}

for (let topBtn of topBtns) {
    topBtn.onclick = function () {
        switch (topBtn.id) {
            case 'clear':
                clearCalc()
                break
            case 'plusMinus':
                input.value = +input.value * (-1)
                break
            case 'persent':
                const charAct = strResult.slice(-1)
                strResult = strResult.slice(0, strResult.length - 1)
                input.value = String(getResult() * input.value / 100).replace('.', ',')
                strResult += charAct
                break
        }
    }
}

for (let act of acts) {
    act.onclick = function () {
        if (act.id === 'actEquals') {

            resetActBtn()

            if (flagActivateEquals === false) {
                flagActivateEquals = true
                strResult += input.value.replace(',', '.')

                console.log(strResult)
                input.value = getResult().replace('.', ',')
                strResult = ''
            }

        } else {

            resetActBtn()
            act.classList.add('active')

            flagActivateAct = true
            flagActivateEquals = false
            strResult += input.value.replace(',', '.') + act.dataset.act
        }
    }
}