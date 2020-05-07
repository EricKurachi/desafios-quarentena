const playerHpElement = document.getElementById('player-health');
const playerTotalHp = 15150*10;
let playerHp = playerTotalHp;

const opponentHpElement = document.getElementById('opponent-health');
const opponentTotalHp = 13097*10;
let opponentHp = opponentTotalHp;

const turnText = document.getElementById('text');
let isTurnHappening = false;

let paralyzeEffectTime = 0;

const roundText = document.getElementById('round');
let score = 0;
let round = 1;

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

// Check if attacks misses
function willAttackMiss (accuracy) {
  return Math.floor(Math.random() * 100) > accuracy;
}

function roundOver(winner){
  paralyzeEffectTime = 0;
  
  if (winner == 'Opponent'){
    score -= 1;
    if (score == -2) {
      gameOver(winner);
    }
  }

  if (winner == 'Player'){
    score += 1;
    if (score == 2) {
      gameOver(winner);
    }
  }
  updatePlayerHp(playerTotalHp);
  updateOpponentHp(opponentTotalHp);

  round += 1;
  roundText.innerText = "Round " + round;
  document.getElementById("artoriaImg").src = "assets/artoria" + round + ".webp";
  document.getElementById("gilgameshImg").src = "assets/gilgamesh" + round + ".webp";
}

function updatePlayerHp(newHP) {
  // Prevents the HP to go lower than 0
  playerHp = Math.max(newHP, 0);

  // If player health is equal 0 opponent wins
  if (playerHp === 0) {
    roundOver('Opponent');
  }

  // Update the player hp bar
  const barWidth = (playerHp / playerTotalHp) * 100;
  playerHpElement.style.width = barWidth + '%';
}

function updateOpponentHp(newHP) {
  // Prevents the HP to go lower than 0
  opponentHp = Math.max(newHP, 0);

  // If oppont health is equal 0 player wins
  if (opponentHp === 0) {
    roundOver('Player');
  }

  // Update the opponents hp bar
  const barWidth = (opponentHp / opponentTotalHp) * 100;
  opponentHpElement.style.width = barWidth + '%';
}

// *************************************************************************************
// Here you need to implement the player attack function that receives the used attack
// return false if attack misses
// otherwise update opponents health and return true
// *************************************************************************************
function playerAttack(attack) {
  // 0: return false if attack misses
  // 1: otherwise update opponents health and return true
  if (Math.random() * 100 < attack.accuracy){
    updateOpponentHp(opponentHp - attack.power);
    if (attack.name == 'Excalibur'){
      paralyzeEffectTime = 2;
    }
    return 1;
  }
  return 0;
}

// *************************************************************************************
// Here you need to implement the opponent attack function that receives the used attack
// return false if attack misses
// otherwise update player health and return true
// *************************************************************************************

// opponent attack function that receives the used attack
function opponentAttack(attack) {
  // 0: return false if attack misses
  // 1: otherwise update player health and return true
  if (Math.random() * 100 < attack.accuracy && paralyzeEffectTime == 0){
    updatePlayerHp(playerHp - attack.power);
    return 1;
  }
  return 0;
}

function opponentAttackType(attack) {
  if (attack.type == 'divine' && paralyzeEffectTime == 0){
    updatePlayerHp(playerHp - attack.power);
    return 1;
  }
  return 0;
}

function chooseOpponentAttack () {
  // Put all opponents attacks in a array
  const possibleAttacks = Object.values(opponentAttacks);

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
  turn(playerAttacks.quick);
});
document.getElementById('arts-button').addEventListener('click', function() {
  turn(playerAttacks.arts);
});
document.getElementById('buster-button').addEventListener('click', function() {
  turn(playerAttacks.buster);
});
document.getElementById('np-button').addEventListener('click', function() {
  turn(playerAttacks.np);
});
