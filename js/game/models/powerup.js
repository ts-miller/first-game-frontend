// const allPowerUps = []

// class PowerUp {

//     constructor(brick) {
//         this.x = brick.x
//         this.y = brick.y
//         this.dy = 2 
//         this.height = 15
//         this.width = 40
//         this.type =  Math.floor(Math.random() * Math.floor(2))
//         this.status = 1
//         this.visible = true
//         allPowerUps.push(this)
//     }

//     static checkCollision() {
//         for (const powerUp of allPowerUps) {
//             if (powerUp.y + powerUp.dy + powerUp.height > canvas.height - paddleHeight - hudHeight - paddleFloat &&
//                 powerUp.y < canvas.height - hudHeight - paddleFloat && powerUp.status === 1) {
//                 if (powerUp.x < paddleX + paddleWidth && powerUp.x + powerUp.width > paddleX) {
//                     powerUp.activateSwitch()
//                 }
//             } else if (powerUp.y + powerUp.dy > canvas.height) {
//                 powerUp.status = 0
//             }
//         }
//     }

//     activateSwitch() {
//         this.status = 0
//         switch (this.type) {
//             case 0: // Wide Paddle

//                 break
//         }
//     }

//     static runBuffs() {
//         for (const powerUp of allPowerUps) {

//         }
//     }
// }