const readlineSync = require('readline-sync');

// start specs
const monster = {
    maxHealth: 10,
    name: "Лютый",
    moves: [
        {
            "name": "Удар когтистой лапой",
            "physicalDmg": 3, // физический урон
            "magicDmg": 0,    // магический урон
            "physicArmorPercents": 20, // физическая броня
            "magicArmorPercents": 20,  // магическая броня
            "cooldown": 0     // ходов на восстановление
        },
        {
            "name": "Огненное дыхание",
            "physicalDmg": 0,
            "magicDmg": 4,
            "physicArmorPercents": 0,
            "magicArmorPercents": 0,
            "cooldown": 3
        },
        {
            "name": "Удар хвостом",
            "physicalDmg": 2,
            "magicDmg": 0,
            "physicArmorPercents": 50,
            "magicArmorPercents": 0,
            "cooldown": 2
        },
    ]
}


const player = {
    maxHealth: 10,
    name: "Евстафий",
    moves: [
        {
            "name": "Удар боевым кадилом",
            "physicalDmg": 2,
            "magicDmg": 0,
            "physicArmorPercents": 0,
            "magicArmorPercents": 50,
            "cooldown": 0
        },
        {
            "name": "Вертушка левой пяткой",
            "physicalDmg": 4,
            "magicDmg": 0,
            "physicArmorPercents": 0,
            "magicArmorPercents": 0,
            "cooldown": 4
        },
        {
            "name": "Каноничный фаербол",
            "physicalDmg": 0,
            "magicDmg": 5,
            "physicArmorPercents": 0,
            "magicArmorPercents": 0,
            "cooldown": 3
        },
        {
            "name": "Магический блок",
            "physicalDmg": 0,
            "magicDmg": 0,
            "physicArmorPercents": 100,
            "magicArmorPercents": 100,
            "cooldown": 4
        },
    ]
}

// set up
readlineSync.setDefaultOptions({ limit: ['8', '10', '12'] })
player.maxHealth = readlineSync.question('Choose hero maxHealth (8, 10, 12) ');

monster.currentHealth = monster.maxHealth;
player.currentHealth = player.maxHealth;

console.log('Monster scils: ', monster.moves)
console.log('Hero scils: ', player.moves)


// game loop
while (player.currentHealth > 0 && monster.currentHealth > 0) {
    changeCurrentCooldown(monster);
    changeCurrentCooldown(player);
    
    const monsterMove = makeMonsterMove();
    console.log(`Monster ${monster.name} hits: `, monsterMove);

    const playerMove = makePlayerMove();
    console.log(`Hero ${player.name} hits: `, playerMove);

    dealDamage(monsterMove, player, playerMove);
    dealDamage(playerMove, monster, monsterMove);

    console.log(`${player.name} health - ${player.currentHealth}hp`);
    console.log(`${monster.name} health - ${monster.currentHealth}hp`);

}

console.log(player.currentHealth <= 0 ? monster.currentHealth <= 0 ? 'Death take both!' : `${player.name} dead` : `Hurray! ${monster.name} dead`);


// actions
function dealDamage(char1Move, char2, char2Move) {
    const physicalDamage = char1Move.physicalDmg - char1Move.physicalDmg * char2Move.physicArmorPercents / 100;
    const magicDamage = char1Move.magicDmg - char1Move.magicDmg * char2Move.magicArmorPercents / 100;
    const totalDamage = physicalDamage + magicDamage;

    char2.currentHealth -= totalDamage;
}

function changeCurrentCooldown(character) {
    character.moves.forEach(element => {
        if (element.currentCooldown) {
            element.currentCooldown--;
            if (element.currentCooldown == 0) {
                delete element.currentCooldown;
            }
        }
    });
}


function makeMonsterMove() {
    const readyMovesArray = monster.moves.filter(item => !item.currentCooldown).map(item => item.name)
    const moveName = readyMovesArray[Math.floor(Math.random() * readyMovesArray.length)]
    const move = monster.moves.find(item => item.name == moveName)
    move.currentCooldown = move.cooldown
    return move
}

function makePlayerMove() {
    const readyMovesArray = player.moves.filter(item => !item.currentCooldown).map(item => item.name)
    const index = readlineSync.keyInSelect(readyMovesArray, 'Select hero action ');
    const move = player.moves.filter(item => !item.currentCooldown)[index];
    move.currentCooldown = move.cooldown
    return move
}
