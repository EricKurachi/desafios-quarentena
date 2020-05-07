const playerHpElement = document.getElementById('player-health');
const playerTotalHp = 15150*10;
let playerHp = 15150*10;

const opponentHpElement = document.getElementById('opponent-health');
const opponentTotalHp = 13097*10;
let opponentHp = 13097*10;

const turnText = document.getElementById('text');
let isTurnHappening = false;

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

function updatePlayerHp(newHP) {
  // Prevents the HP to go lower than 0
  playerHp = Math.max(newHP, 0);

  // If player health is equal 0 opponent wins
  if (playerHp === 0) {
    gameOver('Opponent');
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
    gameOver('Player');
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
  if (Math.random() * 100 < attack.accuracy){
    updatePlayerHp(playerHp - attack.power);
    return 1;
  }
  return 0;
}

function opponentAttackType(attack) {
  if (attack.type == 'divine'){
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
