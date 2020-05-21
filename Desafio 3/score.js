class Score{
    constructor (points){
        this.points = points;
    }

    // the score can be based on the max life if the asteroid
    asteroidDestructed (points) {
        this.points += points;
        document.getElementById("score").innerText = "Score: " + this.points;
    }
}