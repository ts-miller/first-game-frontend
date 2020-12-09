class Input {

    static keyDownHandler(e) {
        if (e.key == "ArrowRight") {
            rightPressed = true
        } else if (e.key == "ArrowLeft") {
            leftPressed = true
        }
    }
    
    static keyUpHandler(e) {
        if (e.key == "ArrowRight") {
            rightPressed = false
        } else if (e.key == "ArrowLeft") {
            leftPressed = false
        }
    }

    static getMousePos(canvas, event) {
        const rect = canvas.getBoundingClientRect()
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        }
    }
}