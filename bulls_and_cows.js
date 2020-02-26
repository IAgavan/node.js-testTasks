const readlineSync = require('readline-sync');

console.log(`Hi! This is simple game of guessing correct number. 
Number includes 3 to 6 different digits(0-9).
You will get clues during the game.`);

let difficulty = readlineSync.question(`Let's go! Choose difficulty(3-6) `)
while (+difficulty < 3 || +difficulty > 6 || isNaN(+difficulty)) {
    difficulty = readlineSync.question(`choose difficulty(3-6) `)
}

const computerNum = createComputerNum(difficulty);

let attempts = +difficulty + 2;
let matchOnWrongPlace = '';
let matchOnRightPlace = '';

while (matchOnRightPlace.length < computerNum.length && attempts > 0) {
    const playerNum = readlineSync.question('guess number ');
    console.log(checkNums(computerNum, playerNum));

    function checkNums(num1, num2) {
        if (num1 == num2) {
            matchOnRightPlace = num2;
            return 'Congratulations!'
        }
        matchOnWrongPlace = '';
        matchOnRightPlace = '';
        for (let i = 0; i < num2.length; i++) {
            if (num1.includes(num2[i])) {
                if (num1.indexOf(num2[i]) == i) {
                    matchOnRightPlace += num2[i]
                } else { matchOnWrongPlace += num2[i] }
            }
        }
        attempts--;
        if (attempts == 0) {
            return `You lose. Number was ${computerNum}`;
        }
        return `
        matched on right place ${matchOnRightPlace.length}: (${matchOnRightPlace})
        matched on wrong place ${matchOnWrongPlace.length}: (${matchOnWrongPlace})
        attempts: ${attempts}
        `
    }
}


function createComputerNum(n) {
    let num = ''
    while (num.length < n) {
        const random = Math.floor(Math.random() * 10);
        if (!num.includes(random)) {
            num += random
        }
    }
    return num
}