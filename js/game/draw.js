class Draw {
    static ball() {
        ctx.beginPath()
        ctx.arc(x, y, ballRadius, 0, Math.PI*2)
        ctx.fillStyle = "#2740cf"
        ctx.fill()
        ctx.closePath()
    }

    static bricks() {
        for(const brick of level.bricks) {
            if (brick.status) {
                ctx.beginPath()
                ctx.fillStyle = "#c29f3e"
                ctx.fillRect(brick.x-3, brick.y-3, brickWidth+6, brickHeight+6) // border
                ctx.fillStyle = "#fac637"
                ctx.fillRect(brick.x, brick.y, brickWidth, brickHeight)
                ctx.closePath()
            }
        }
    }

    static paddle() {
        ctx.beginPath()
        ctx.fillStyle = "#174157"
        ctx.fillRect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight)
        ctx.closePath()
    }

    static editorGrid() {
        canvas.removeEventListener('click', Event.startGame)
        newLevel = []
        let brickId = 0
        for(let r = 0; r < brickRows; r++) {
            for(let c = 0; c < brickColumns; c++) {
                const brickX = (brickWidth*c)+3
                const brickY = (brickHeight*r)+3
                ctx.beginPath()
                ctx.fillStyle = "#c29f3e"
                ctx.fillRect(brickX-3, brickY-3, brickWidth+6, brickHeight+6)
                ctx.fillStyle = "#f7ebdc"
                ctx.fillRect(brickX, brickY, brickWidth, brickHeight)
                ctx.closePath()
                let toggle = false
                const newBrick = {
                    id: brickId,
                    x: brickX,
                    y: brickY,
                    status: false
                }
                brickId++
                newLevel.push(newBrick)
                canvas.addEventListener('click', evt => {
                    const mousePos = Controls.getMousePos(canvas, evt)
                    if (isInside(mousePos, {x: brickX, y: brickY, width: brickWidth, height: brickHeight})) {
                        if (toggle) {
                            ctx.fillStyle = "#f7ebdc"
                            newBrick.status = false
                        } else {
                            ctx.fillStyle = "#fac637"
                            newBrick.status = true
                        }
                        ctx.fillRect(brickX, brickY, brickWidth-3, brickHeight-3)
                        toggle = !toggle
                        console.log("Toggled Brick")
                    }
                })
            }
        }
    }
}