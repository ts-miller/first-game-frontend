class Sound {
    constructor(src, loop=false, ) {
        this.sound = document.createElement("audio")
        this.sound.src = src
        this.sound.setAttribute("preload", "auto")
        this.sound.setAttribute("controls", "none")
        this.sound.loop = loop
        this.sound.style.display = "none"
        document.body.appendChild(this.sound)
    }

    play() {
        this.sound.play()
    }

    stop() {
        this.sound.pause()
    }
}

const gameMusic = new Sound('/sounds/music/background1.mp3', true)
const paddleHitSound = new Sound('/sounds/sfx/paddle-hit.wav')
const brickHitSound = new Sound('/sounds/sfx/brick-hit.wav')
const wallHitSound = new Sound('/sounds/sfx/wall-hit.wav')
const deathSound = new Sound('/sounds/sfx/death.wav')
const gameOverSound = new Sound('/sounds/sfx/game-over.wav')
const levelStartSound = new Sound('/sounds/sfx/level-begin.wav')
const winLevelSound = new Sound('/sounds/sfx/win-level.wav')
