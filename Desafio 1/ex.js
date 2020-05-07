const playerHpElement = document.getElementById('player-health');
const opponentHpElement = document.getElementById('opponent-health');

const turnText = document.getElementById('text');
let isTurnHappening = false;

const roundText = document.getElementById('round');
let playerScore = 0;
let opponentScore = 0;
let round = 1;

let paralyzeEffectTime = 0;

class Servant {
  constructor(totalHp, hp, attacks, paralyzeEffectTime, role) {
    this._totalHp = totalHp;
    this._hp = hp;
    this._attacks = attacks;
    this._paralyzeEffectTime = paralyzeEffectTime;
    this._role = role;
  }

  get totalHp () {
    return this._totalHp;
  }

  get hp () {
    return this._hp;
  }

  get attacks () {
    return this._attacks;
  }

  get paralyzeEffectTime () {
    return this._paralyzeEffectTime;
  }

  get role () {
    return this._role;
  }

  set hp (newHp) {
    this._hp = newHp;
  }

  set paralyzeEffectTime (newParalyzeEffectTime) {
    this._paralyzeEffectTime = newParalyzeEffectTime;
  }

  // Check if attacks misses
  willAttackMiss (accuracy) {
    return Math.floor(Math.random() * 100) > accuracy;
  }

  updateHp(newHP) {
    // Prevents the HP to go lower than 0
    this._hp = Math.max(newHP, 0);
  
    // If player health is equal 0 opponent wins
    if (this._hp === 0) {
      roundOver(this._role);
    }
  
    // Update the player hp bar
    const barWidth = (this._hp / this._totalHp) * 100;
    if (this._role == 'Player') {
      playerHpElement.style.width = barWidth + '%';
    }
    else{
    opponentHpElement.style.width = barWidth + '%';
    }
  }
}

const playerAttacks = {
  quick: {
    power: 11221*0.8,
    accuracy: 100,
    name: 'Quick',
    type: 'normal',
  },
  arts: {
    power: 11221,
    accuracy: 90,
    name: 'Arts',
    type: 'normal',
  },
  buster: {
    power: 11221*1.5,
    accuracy: 70,
    name: 'Buster',
    type: 'normal',
  },
  np: {
    power: 11221*2,
    accuracy: 100,
    name: 'Excalibur',
    type: 'dragon',
  }
}

const opponentAttacks = {
  quick: {
    power: 12280 * 0.8,
    accuracy: 100,
    name: 'Quick',
    type: 'normal',
  },
  arts: {
    power: 12280,
    accuracy: 90,
    name: 'Arts',
    type: 'normal',
  },
  buster: {
    power: 12280*1.5,
    accuracy: 70,
    name: 'Buster',
    type: 'normal',
  },
  np: {
    power: 12280*2,
    accuracy: 100,
    name: 'Enûma Eliš',
    type: 'divine',
  }
}

let artoria = new Servant(151500, 151500, playerAttacks, 0, 'Player');
let gilgamesh = new Servant(130970, 130970, opponentAttacks, 0, 'Opponent');

function gameOver (winner) {
  // Wait 1000 (Health loss animation)
  setTimeout(() => {
    // Update HTML text with the winner
    turnText.innerText = winner + ' is the winner!';
    // Open alert with the winner
    alert(winner + ' is the winner! Close this alert to play again');
    // Reload the game
    window.location.reload();
  }, 1000);
}

function roundOver(loser){
  paralyzeEffectTime = 0;
  round += 1;

  if (loser == 'Player'){
    opponentScore += 1;
  }

  if (loser == 'Opponent'){
    playerScore += 1;
  }

  if (round >= 2){
    if (playerScore >= 2){
      round -= 1;
      gameOver('Player');
    }
    if (opponentScore >= 2){
      round -= 1;
      gameOver('Opponent');
    }
  }

  artoria.updateHp(artoria.totalHp);
  gilgamesh.updateHp(gilgamesh.totalHp);

  roundText.innerText = "Round " + round;
  document.getElementById("artoriaImg").src = "assets/artoria" + round + ".webp";
  document.getElementById("gilgameshImg").src = "assets/gilgamesh" + round + ".webp";
}

function playerAttack(attack) {
  // 0: return false if attack misses
  // 1: otherwise update opponents health and return true
  if (gilgamesh.willAttackMiss(attack.accuracy)){
    return 0;
  }
  gilgamesh.updateHp(gilgamesh.hp - attack.power);
  if (attack.name == 'Excalibur'){
    paralyzeEffectTime = 2;
  }
    return 1;
}

function opponentAttack(attack) {
  // 0: return false if attack misses
  // 1: otherwise update player health and return true
  if (artoria.willAttackMiss(attack.accuracy) || paralyzeEffectTime != 0){
    return 0;
  }
  artoria.updateHp(artoria.hp - attack.power);
    return 1;
}

function opponentAttackType(attack) {
  if (attack.type == 'divine' && gilgamesh.paralyzeEffectTime == 0){
    artoria.updateHp(artoria.hp - attack.power);
    return 1;
  }
  return 0;
}

function chooseOpponentAttack () {
  // Put all opponents attacks in a array
  const possibleAttacks = Object.values(gilgamesh.attacks);

  // Randomly chooses one attack from the array
  return possibleAttacks[Math.floor(Math.random() * possibleAttacks.length)];
}

function turn(playerChosenAttack) {
  // Don't start another turn till the current one is not finished
  if (isTurnHappening) {
    return;
  }
  isTurnHappening = true;

  const didPlayerHit = playerAttack(playerChosenAttack);

  // Update HTML text with the used attack
  turnText.innerText = 'Player used ' + playerChosenAttack.name;

  // Update HTML text in case the attack misses
  if (!didPlayerHit) {
    turnText.innerText += ', but missed!';
  }

  // Wait 2000ms to execute opponent attack (Player attack animation time)
  setTimeout(() => {
    // Randomly chooses opponents attack
    const opponentChosenAttack = chooseOpponentAttack();

    const didOpponentHit = opponentAttack(opponentChosenAttack);

    const didOpponentCrit = opponentAttackType(opponentChosenAttack);

    // Update HTML text with the used attack
    turnText.innerText = 'Opponent used ' + opponentChosenAttack.name;

    // Update HTML text in case the attack misses
    if (!didOpponentHit) {
      turnText.innerText += ', but missed!';
    }

    if (didOpponentCrit) {
      turnText.innerText += ', its super effective!';
    }

    if (paralyzeEffectTime != 0){
      turnText.innerText = 'The opponent is paralyzed';
      paralyzeEffectTime -= 1;
    }

    // Wait 2000ms to end the turn (Opponent attack animation time)
    setTimeout(() => {
      // Update HTML text for the next turn
      turnText.innerText = 'Please choose one attack';
      isTurnHappening = false;
    }, 2000);
  }, 2000);
}

// Set buttons click interaction
document.getElementById('quick-button').addEventListener('click', function() {
  turn(artoria.attacks.quick);
});
document.getElementById('arts-button').addEventListener('click', function() {
  turn(artoria.attacks.arts);
});
document.getElementById('buster-button').addEventListener('click', function() {
  turn(artoria.attacks.buster);
});
document.getElementById('np-button').addEventListener('click', function() {
  turn(artoria.attacks.np);
});