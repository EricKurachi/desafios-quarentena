// This is the container of all movableEntities
const movableEntityContainer = document.getElementById('movable-entity-container');

// creates the single only map instance in the game.
// There should be only one map in the game, so it is a Singleton class.
// If you'd like to know more about the singleton pattern, see this link:
// https://en.wikipedia.org/wiki/Singleton_pattern
const map = new Map(movableEntityContainer);

// initializes timer
const timer = new Timer(0, 0);

// starts timer
timer.timerIncrement();

// starts score
const score = new Score(0);

// creates the single only player instance in the game.
const player = new Player(
	movableEntityContainer,
	map,
	gameOver,
);

// This is the game frame function. It is responsible for updating everything in the game.
function frame () {
	map.frame();

	// if the player is pressing one of the keys, call the turn function
	if (pressedKeys['w'] || pressedKeys['ArrowUp']) player.advance(0.2);
	if (pressedKeys['a'] || pressedKeys['ArrowLeft']) player.turn(-1);
	if (pressedKeys['s'] || pressedKeys['ArrowDown']) player.advance(-0.2);
	if (pressedKeys['d'] || pressedKeys['ArrowRight']) player.turn(1);
}

// This is a dictionary that will hold the keys that are being held down at the time.
// If you'd like to know more about dictionaries, see this link:
// https://pietschsoft.com/post/2015/09/05/javascript-basics-how-to-create-a-dictionary-with-keyvalue-pairs
const pressedKeys = {};

var bulletType = 'normal';

// This function will run every time the player presses a key
document.body.addEventListener('keydown', event => {
	// if that key is the spacebar, the player will shoot.
	if (event.key === ' ' && !pressedKeys[' ']) player.shoot(bulletType);

	if (event.key === '1' && !pressedKeys['1']) bulletType = 'normal';

	if (event.key === '2' && !pressedKeys['2']) bulletType = 'double';

	// add the pressed key to the pressedKey dictionary
	pressedKeys[event.key] = true;
});

// This function will run every time the player releases a key
document.body.addEventListener('keyup', event => {
	// removes the pressed key to the pressedKey dictionary
	delete pressedKeys[event.key];
});

document.body.addEventListener('mousedown', event => {
	if (event.button === 0 && !event.buttons['0']) player.shoot('big')
});

// Registers the frame function to run at every frame.
// if you'd like to know more about intervals, see this link
// https://javascript.info/settimeout-setinterval
// fixed performance by using Nested setTimeout instead of setInterval
const intervalHandler = setTimeout(function repeat(){
	frame();
	intervalHandler = setTimeout(repeat);
})



// This is the function that will end the game
function gameOver () {
	// This will unregister the frame function, so nothing else will be updated
	clearInterval(intervalHandler);
	alert('Você perdeu');
}