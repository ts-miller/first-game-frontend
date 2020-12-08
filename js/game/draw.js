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
        for(let r = 1; r < brickRows; r++) {
            for(let c = 1; r < brickColumns; c++) {
                const brickX = ((brickWidth*c)+5)
                const brickY = ((brickHeight*r)+5)
                ctx.beginPath()
                ctx.fillStyle = "#c29f3e"
                ctx.fillRect(brickX-3, brickY-3, brickWidth+6, brickHeight+6)
                ctx.fillStyle = "#ffeecf"
                ctx.fillRect(brickX, brickY, brickWidth, brickHeight)
                ctx.closePath()
                canvas.addEventListener('click', evt => {
                    const mousePos = Controls.getMousePos(canvas, evt)
                    if (isInside(mousePos, {x: brickX, y: brickY, width: brickWidth, height: brickHeight})) {
                        ctx.clearRect(0, 0, canvas.width, canvas.height)
                        ctx.fillStyle = '#ffffff'
                        ctx.fillRect(brickX, brickY, brickWidth, brickHeight)
                    
                        console.log("Toggled Brick")
                    }
                })
            }
        }
    }
}