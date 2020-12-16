class Ball {
    constructor() {
        this.x = canvas.width/2
        this.y = canvas.height-hudHeight-paddleHeight-ballRadius
        this.vel = defBallVel
        this.dx = Math.cos(0.5/2*Math.PI)*this.vel
        this.dy = -(Math.sin(0.5/2*Math.PI)*this.vel)
        this.radius = ballRadius
    }

    setBrickBounceXY() {
        let ballAngle = Math.atan(-this.dy/this.dx)
        this.dx = Math.sin(ballAngle) * this.vel
        this.dy = -Math.cos(ballAngle) * this.vel
    }
}