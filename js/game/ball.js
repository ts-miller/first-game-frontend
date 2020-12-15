class Ball {
    constructor() {
        this.x = canvas.width/2
        this.y = canvas.height-hudHeight-paddleHeight-ballRadius
        this.vel = defBallVel
        this.dx = Math.cos(0.5/2*Math.PI)*this.vel
        this.dy = -(Math.sin(0.5/2*Math.PI)*this.vel)
        this.radius = ballRadius
    }

    get angle() {
        return ((this.x-paddleX)/paddleWidth-0.5)/2*Math.PI
    }

    set angle(newAngle) {
        this.angle = newAngle
    }
}