class Score{
    constructor (points){
        this.points = points;
    }

    asteroidDestructed (maxlife) {
        this.points += maxlife;
        document.getElementById("score").innerText = "Score: " + this.points;
    }
}