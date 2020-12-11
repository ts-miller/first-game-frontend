class Button {

    static start() {
        this.removeAllChildNodes(buttonBox)
        const btn = document.createElement("button")
        btn.innerText = "START NEW GAME"
        buttonBox.appendChild(btn)
        btn.addEventListener('click', Event.startGame)
    }

    static retry() {
        this.removeAllChildNodes(buttonBox)
        const btn = document.createElement("button")
        btn.innerText = "RETRY"
        buttonBox.appendChild(btn)
        btn.addEventListener('click', Event.retryLevel)
    }

    static newLevel() {
        this.removeAllChildNodes(buttonBox)
        const btn = document.createElement("button")
        btn.innerText = "CREATE NEW LEVEL"
        buttonBox.appendChild(btn)
        btn.addEventListener('click', Event.triggerLevelEditor)
    }
    
    static nextLevel() {
        this.removeAllChildNodes(buttonBox)
        const btn = document.createElement("button")
        btn.innerText = "NEXT LEVEL"
        buttonBox.appendChild(btn)
        btn.addEventListener('click', Event.setupNextLevel)
    }

    static confirmationButtons() {
        this.removeAllChildNodes(buttonBox)
        const confirmPrompt = document.createElement("span")
        confirmPrompt.innerText = "Would you like to submit this level?"
        const confirmYes = document.createElement("BUTTON")
        confirmYes.innerText = "YES"
        const confirmNo = document.createElement("BUTTON")
        confirmNo.innerText = "NO"
        buttonBox.appendChild(confirmPrompt)
        buttonBox.appendChild(confirmYes)
        buttonBox.appendChild(confirmNo)
        confirmYes.addEventListener('click', Event.controlsHandler)
        confirmNo.addEventListener('click', Event.controlsHandler)
    }

    static editorControls() {
            nameLabel.innerText = "LEVEL NAME: "
            clearBtn.innerText = "CLEAR"
            submitBtn.innerText = "SUBMIT"
            fillBtn.innerText = "FILL"

            const editorBtns = [clearBtn, submitBtn, fillBtn]
            for(const btn of editorBtns) {
                btn.addEventListener('click', Event.controlsHandler)
            }
            buttonBox.appendChild(clearBtn)
            buttonBox.appendChild(fillBtn)
            buttonBox.appendChild(nameLabel)
            buttonBox.appendChild(levelNameField)
            buttonBox.appendChild(submitBtn)
    }

    static removeAllChildNodes(parent) {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild)
        }
    }
}