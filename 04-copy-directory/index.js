const fs = require('fs');
const path = require('path');



fs.mkdir(path.join(__dirname, 'files-copy'), () => {
    return;
});

fs.readdir(path.join(__dirname, 'files-copy'), { withFileTypes: true }, (err, files) => {
    if (err) {
      console.error('Error reading', err.message);
      return;
    }
    files.forEach((element) => {
        if (element.isFile()) {
            fs.unlink(path.join(__dirname, 'files-copy', element.name), (genError) => {
                if (genError) {
                  console.log("Operation Failed: ", genError);
                }
                });
        }
    });

});

fs.readdir(path.join(__dirname, 'files'), { withFileTypes: true }, (err, files) => {
    if (err) {
      console.error('Error reading', err.message);
      return;
    }
    files.forEach((element) => {
        if (element.isFile()) {
            fs.copyFile(path.join(__dirname, 'files', element.name), path.join(__dirname, 'files-copy', element.name), (genError) => {
                if (genError) {
                  console.log("Operation Failed: ", genError);
                }
                });
        }
    });

});

