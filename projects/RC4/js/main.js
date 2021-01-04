const textareaRC4 = document.querySelector('#text')
const textkeyRC4 = document.querySelector('#key')
const selectN = document.querySelector('#selectN')
const errorMessage = document.querySelector('#errorMessage')

const btnRC4 = document.querySelector('#rc4Activate')
const btnClear = document.querySelector('#clearAll')
const btnCopy = document.querySelector('#copuResult')

textareaRC4.oninput = setHeightTeaxatea

function setHeightTeaxatea() {
    if (textareaRC4.clientHeight < textareaRC4.scrollHeight) {
        textareaRC4.style.height = textareaRC4.scrollHeight + 1 + 'px'
    }
}

btnCopy.onclick = function () {
    textareaRC4.select()
    document.execCommand("copy")
}

btnClear.onclick = function resetRC4() {
    textkeyRC4.value = ''
    textareaRC4.value = ''
    errorMessage.textContent = ''
    selectN.value = '8'
}

btnRC4.onclick = function () {
    const text = textareaRC4.value
    const key = textkeyRC4.value

    if (text === '' || key === '') {
        errorMessage.textContent = 'Поля не заполнены!!!'
    } else {

        errorMessage.textContent = ''

        if (isNaN(+key)) {
            errorMessage.textContent = 'Ключ должен содержать только цифры'
        } else {
            const n = 2 ** +selectN.value
            const s = []
            const k = []
            const z = []

            for (let i = 0; i < n; i++) {
                s[i] = i
                k[i] = +key[i % key.length]
            }

            for (let i = 0, j = 0; i < n; i++) {
                j = (j + s[i] + k[i]) % n;
                let zamena = s[i];
                s[i] = s[j];
                s[j] = zamena;
            }

            for (let m = 0, i = 0, j = 0; m < text.length; m++) {
                i = (i + 1) % n
                j = (j + s[i]) % n
                let zamena = s[i]
                s[i] = s[j]
                s[j] = zamena
                let a = (s[i] + s[j]) % n
                z[m] = s[a]
            }

            textareaRC4.value = ''
            for (let i = 0; i < text.length; i++) {
                textareaRC4.value += String.fromCodePoint(text.codePointAt(i) ^ z[i])
            }
            setHeightTeaxatea()
        }
    }
}
