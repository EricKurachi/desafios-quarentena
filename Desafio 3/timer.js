var seconds = 0;
var minutes = 0;

function timerIncrement() {
    seconds += 1;
    minutes += Math.floor(seconds/60);
    seconds = seconds % 60;
    timerSeconds = ("0" + seconds).slice(-2);
    document.getElementById("time").innerText = minutes + ":" + timerSeconds;
}

setInterval(timerIncrement, 1000);