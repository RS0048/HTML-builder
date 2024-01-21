const fs = require('fs');
const path = require('path');
const createWrite = fs.createWriteStream(path.join(__dirname, '02-write-file.txt'));
const process = require('process');
process.stdout.write('Hello. Please, enter your text' + '\n' +  '\n');

process.stdin.on('data', data => {
    if (data.toString().trim() === 'exit') {
        endInput();
    }
    createWrite.write(data);
});

process.on('SIGINT', endInput);
function endInput() {
    process.stdout.write('\n' + 'The file is saved. Thank you');
    process.exit();
}