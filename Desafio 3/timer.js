class Timer {
    constructor(seconds, minutes){
        this.seconds = seconds;
        this.minutes = minutes;
        this.timerSeconds = 0;
    }

    timerIncrement() {
        this.seconds += 1;
        this.minutes += Math.floor(this.seconds/60);
        this.seconds = this.seconds % 60;
        this.timerSeconds = ("0" + this.seconds).slice(-2);
        document.getElementById("time").innerText = this.minutes + ":" + this.timerSeconds;

        setTimeout(this.timerIncrement.bind(this), 1000);
    }
}