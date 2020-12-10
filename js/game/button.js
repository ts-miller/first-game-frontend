class Button {

    static start() {
        ctx.fillStyle = '#61aac2'
        ctx.fillRect(startBtn.x, startBtn.y, 100, 50)
        ctx.fillStyle = '#2a4c57'
        ctx.font = "20pt sans-serif"
        ctx.fillText("START", canvas.width/2-43, canvas.height/2+9)
        canvas.addEventListener('click', Event.startGame)
    }

    static restart() {
        ctx.fillStyle = '#61aac2'
        ctx.fillRect(startBtn.x, startBtn.y, 100, 50)
        ctx.fillStyle = '#2a4c57'
        ctx.font = "20pt sans-serif"
        ctx.fillText("RETRY", canvas.width/2-43, canvas.height/2+9)
        canvas.addEventListener('click', Event.resetGame)
    }

    static newLevel() {
        ctx.fillStyle = '#53e05a'
        ctx.fillRect(startBtn.x, startBtn.y, 100, 50)
        ctx.fillStyle = '#2a4c57'
        ctx.font = "20pt sans-serif"
        ctx.fillText("NEW", canvas.width/2-32, canvas.height/2+9)
        canvas.addEventListener('click', Event.triggerLevelEditor)
    }
    
    static nextLevel() {
        ctx.fillStyle = '#53e05a'
        ctx.fillRect(startBtn.x, startBtn.y, 100, 50)
        ctx.fillStyle = '#2a4c57'
        ctx.font = "20pt sans-serif"
        ctx.fillText("NEXT", canvas.width/2-43, canvas.height/2+9)
        canvas.addEventListener('click', Event.setupNextLevel)
    }

    static confirmNewLevel() {
        ctx.fillStyle = '#53e05a'
        ctx.fillRect(startBtn.x, startBtn.y, 100, 50)
        ctx.fillStyle = '#2a4c57'
        ctx.font = "16pt sans-serif"
        ctx.fillText("CONFIRM", canvas.width/2-43, canvas.height/2+9)
        canvas.addEventListener('click', Event.submitLevel)
    }

    static editorControls() {
            const clearBtn = document.createElement('button')
            const finishedBtn = document.createElement('button')
            const fillBtn = document.createElement('button')
            clearBtn.innerText = "CLEAR"
            finishedBtn.innerText = "SUBMIT"
            fillBtn.innerText = "FILL"

            const editorBtns = [clearBtn, finishedBtn, fillBtn]
            for(const btn of editorBtns) {
                btn.addEventListener('click', Event.controlsHandler)
            }
            const buttonBox = document.createElement('DIV')
            buttonBox.id = 'button-box'
            buttonBox.className = "center"
            buttonBox.appendChild(clearBtn)
            buttonBox.appendChild(fillBtn)
            buttonBox.appendChild(finishedBtn)
            gameContainer.appendChild(buttonBox)
    }
}