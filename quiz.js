const fs = require('fs');
const readlineSync = require('readline-sync');

const folderContent = fs.readdirSync('questions', 'utf8')


const questionsSet = folderContent;

while (questionsSet.length > 5) {
    const random = Math.floor(Math.random() * questionsSet.length);
    questionsSet.splice(random, 1)
}

let numOfTrue = 0
questionsSet.forEach(item=>{
    const fileContent = fs.readFileSync(`questions/${item}`, 'utf8');
    const contentArray = fileContent.split('\r\n');
    const question = contentArray[0];
    const correctAnswer = contentArray[1];
    const answers = contentArray.slice(2)
    
    console.log(question);
    const index = readlineSync.keyInSelect(answers, 'Select answer ');
    
    console.log(index == correctAnswer-1);
    if(index == correctAnswer-1){
        numOfTrue++
    }
    }
)

console.log(`Finish! Correct anwers: ${numOfTrue}`)