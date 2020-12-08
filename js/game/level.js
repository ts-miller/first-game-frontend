class Level {
    static all =[]

    constructor(name, userId, bricks) {
        this.name = name
        this.userId = userId
        this.bricks = bricks
        Level.all.push(this)
    }

    isLast() {
        return !!(this == Level.all[Level.all.length-1])
    }
}