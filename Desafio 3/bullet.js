const BULLET_SPEED = 1;

/**
* This is a class declaration
* This class is responsible for defining the bullets behavior.
* this class extends the MovableEntity class, which is responsible for defining physics behavior
* If you'd like to know more about class inheritance in javascript, see this link
* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes#Sub_classing_with_extends
*/
class Bullet extends MovableEntity {

	/**
	* @argument { HTMLDivElement } containerElement The DOM element that will contain the bullet
	* @argument { Map } mapInstance The map in which the bullet will spawn
	* @argument { Vector } direction The bullet's direction
	*/
	constructor (
		containerElement,
		mapInstance,
		direction,
		type
	) {
		var BULLET_SIZE = 10;
		const aux = direction;

		if (type == 'big'){
			var myDirection = new Vector(0, 0);
			BULLET_SIZE = 20;
			myDirection.x = event.clientX - (player.position.x + document.getElementById('arena-line').getBoundingClientRect().x + 250);
			myDirection.y = event.clientY - (player.position.y + document.getElementById('arena-line').getBoundingClientRect().y + 250); 
			super(containerElement, BULLET_SIZE, player.position, myDirection.normalize().scale(BULLET_SPEED), myDirection); 
		}

		// The `super` function will call the constructor of the parent class.
		// If you'd like to know more about class inheritance in javascript, see this link
		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes#Sub_classing_with_extends
		else{
			super(containerElement, BULLET_SIZE, player.position, direction.normalize().scale(BULLET_SPEED), direction);
		}

		this.mapInstance = mapInstance;

		// This is so the map can execute the player's physics (see the `frame` function
		// in the `map.js` file
		mapInstance.addEntity(this);

		this.type = type;
		this.damage = 1;

		// Assigns the bullet's image to it's element
		if (this.type == 'double') {
			this.rootElement.style.backgroundImage = "url('assets/red-bullet.svg')";
			this.rootElement.style.backgroundSize = this.size + 'px';
			this.damage = 2;
		}

		else if (this.type == 'big') {
			this.rootElement.style.backgroundImage = "url('assets/bullet.svg')";
			this.rootElement.style.backgroundSize = this.size + 'px';
			this.damage = 1;
		}

		else {
			this.rootElement.style.backgroundImage = "url('assets/bullet.svg')";
			this.rootElement.style.backgroundSize = this.size + 'px';
		}
	}

	// If the bullet collides with an asteroid, delete the bullet.
	collided (object) {
		if (object instanceof Asteroid) {
			this.mapInstance.removeEntity(this);
			this.delete();
		}
	}
}