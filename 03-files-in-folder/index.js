const fs = require('fs');
const path = require('path');

const outputInfoOfFiles = (file) => {
    fs.stat(file, (err, stats) => {
        if (err) {
            console.error ('Error get files', err.message);
            return;
        }
        const infoOfFile = path.parse(file);
        const nameOfFiles = infoOfFile.name;
        const extOfFiles = infoOfFile.ext;
        const sizeOfFile = (stats.size/1024).toFixed(3);
        console.log(`${nameOfFiles} - ${extOfFiles} - ${sizeOfFile}`, 'kb');
    })
}

fs.readdir(path.join(__dirname, 'secret-folder'), { withFileTypes: true }, (err, files) => {
    if (err) {
      console.error('Error reading', err.message);
      return;
    }
    files.forEach((element) => {
        if (element.isFile()) {
            const eachFile = path.join(__dirname, 'secret-folder', element.name);
            outputInfoOfFiles (eachFile);
        }
    });
});
