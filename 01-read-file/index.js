const fs = require('fs');
const path = require('path');
const fullPath = fs.createReadStream(path.join(__dirname, 'text.txt'))
fullPath.on('data', function(chunk) {
    console.log(chunk.toString());
})
