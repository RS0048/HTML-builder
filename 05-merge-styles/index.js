const fs = require('fs');
const path = require('path');


const deleteFile = (path) => {
    return new Promise((resolve, reject) => {
        fs.unlink(path, (err) => {

            console.log('delete')
            resolve();
        })
    })
}


/*
const readStyles = (pathTo) => {
    return new Promise((resolve, reject) => {
        console.log(pathTo)
        fs.readdir(pathTo, { withFileTypes: true }, (err, files) => {
            if (err) {
                reject(err);
            }
            const arrayOfStyles = []
            Promise.all(
                files.map((element) => {
                   
                    return new Promise((resolve2, reject2) => {
                        if (err) {
                            reject2(err);
                        }
                                fs.readFile(path.join(__dirname, 'styles', element.name), (err, data) => {
                                    if (err) throw err;
                                    
                                    const infoOfFile = path.parse(path.join(__dirname, 'styles', element.name));
                                    
                                    const stylesInfo = {};
                                    stylesInfo.name = infoOfFile.name;
                                    stylesInfo.html = data.toString();
                                    arrayOfStyles.push(stylesInfo);
                                    resolve2();
                                    
                                });
                            
                        
                        
                    });
                })
            )
            console.log(arrayOfStyles)
            .then(() => resolve(arrayOfStyles)); 
        });
    })
}

*/

const readStyles = (pathTo) => {
    return new Promise((resolve, reject) => {
        fs.readdir(pathTo, { withFileTypes: true }, (err, files) => {
            if (err) {
                reject(err);
            }
            const arrayOfComponents = []
            const styleFiles = files.filter((file) => path.extname(file.name) === '.css' && file.isFile());
            Promise.all(
                styleFiles.map((element) => {
                return new Promise((resolve2, reject2) => {
                    if (err) {
                        reject2(err);
                    }

                    fs.readFile(path.join(__dirname, 'styles', element.name), (err, data) => {
                            if (err) throw err;

                            const infoOfFile = path.parse(path.join(__dirname, 'styles', element.name));

                            const componentInfo = {};
                            componentInfo.name = infoOfFile.name;
                            componentInfo.html = data;
                            arrayOfComponents.push(componentInfo);
                            resolve2();

                        });
                    });

                })
            )
            .then(() => resolve(arrayOfComponents)); 
        });
    })
}

const appendStyles = (path, ArrStyles) => {
    return new Promise((resolve, reject) => {
        ArrStyles.forEach((file) => {
            fs.appendFile(path, file.html, (err) => {
                if (err) {
                    reject(err);
                }
                console.log('append styles')
                resolve();
            })
        })
    })
}



const pathToStyles = path.join(__dirname, 'styles')
const pathToStyle = path.join(__dirname, 'project-dist', 'bundle.css')

deleteFile(pathToStyle)

.then(() => readStyles(pathToStyles))
.then((arrayOfStyles) => appendStyles(pathToStyle, arrayOfStyles))


