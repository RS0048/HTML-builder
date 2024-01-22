const fs = require('fs');
const path = require('path');

// deleted old bundle.css
fs.unlink(path.join(__dirname, 'project-dist', 'bundle.css'), (genError) => {
    if (genError) {
      console.log('The file has not been created yet', genError);
    }
});

// create new bundle.css and add all .css files
fs.readdir(path.join(__dirname, 'styles'), { withFileTypes: true }, (err, files) => {
    if (err) {
      console.error('Error reading', err.message);
      return;
    }
    
    files.forEach((element) => {
        if (element.isFile()) {
            const infoOfFile = path.parse(path.join(__dirname, 'styles', element.name));
            const extOfFile = infoOfFile.ext;
            if (extOfFile === '.css') {

                fs.readFile(path.join(__dirname, 'styles', element.name), 'utf8', (err, data) => {
                    if (err) throw err;

                    fs.appendFile(path.join(__dirname, 'project-dist', 'bundle.css'), (data + '\n\n'), (err2) => {
                        if (err2) {
                            console.log(err2);
                        }
                    });
                });
            }
        }
    });

});
