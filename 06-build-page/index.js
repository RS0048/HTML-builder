const fs = require('fs');
const path = require('path');


//create folder 

const createFolders = () => {
    return new Promise((resolve, reject) => {
        fs.mkdir(path.join(__dirname, 'project-dist'), () => {
            return;
        });
        fs.mkdir(path.join(__dirname, 'project-dist', 'assets'), () => {
            return;
        });
        resolve();
        console.log('create folders');
    })
}







const readFile = (path) => {
    return new Promise((resolve, reject) => {
        fs.readFile(path, (err, data) => {
            if (err) {
                reject(err);
            }
            resolve(data);
            console.log('read');
        })
    })
}

const writeFile = (path, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(path, data, (err) => {
            if (err) {
                reject(err);
            }
            console.log('write')
            resolve();
        })
    })
}

const deleteFile = (path) => {
    return new Promise((resolve, reject) => {
        fs.unlink(path, (err) => {

            console.log('delete')
            resolve();
        })
    })
}

const appendFile = (path, data) => {
    return new Promise((resolve, reject) => {
        fs.appendFile(path, data, (err) => {
            if (err) {
                reject(err);
            }
            console.log('append')
            resolve();
        })
    })
}

const readComponents = (pathTo) => {
    return new Promise((resolve, reject) => {
        fs.readdir(pathTo, { withFileTypes: true }, (err, files) => {
            if (err) {
                reject(err);
            }
            const arrayOfComponents = []
           Promise.all(
            files.map((element) => {
                return new Promise((resolve2, reject2) => {
                    if (err) {
                        reject2(err);
                    }

                    fs.readFile(path.join(__dirname, 'components', element.name), (err, data) => {
                            if (err) throw err;

                            const infoOfFile = path.parse(path.join(__dirname, 'components', element.name));

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


const replaceComponent = (textFromComponent) => {
    return new Promise ((resolve, reject) => {
        readFile(pathToIndex)
        .then ((data) => {
            let textTemplate = data.toString();
            textFromComponent.forEach((component) => {
                textTemplate = textTemplate.replace(('{{' + component.name + '}}'), component.html);
            })
            console.log('replace')
            resolve(textTemplate);
        })

    })
}


const deleteFolder = (pathTo) => {
    return new Promise((resolve, reject) => {
        fs.rm(pathTo, { recursive: true }, (err) => {
            resolve();
            console.log('delete folder')
        });
    });
}


const pathToTemplate = path.join(__dirname, 'template.html')
const pathToIndex = path.join(__dirname, 'project-dist', 'index.html')
const pathToComponents = path.join(__dirname, 'components')
const pathToProject = path.join(__dirname, 'project-dist')
const pathToStyles = path.join(__dirname, 'styles')
const pathToStyle = path.join(__dirname, 'project-dist', 'style.css')

deleteFolder(pathToProject)

.then(() => createFolders())
.then(() => readFile(pathToTemplate))
.then((data) => appendFile(pathToIndex, data))
.then(() => readComponents(pathToComponents))
.then((arrayOfComponents) => replaceComponent(arrayOfComponents))
.then((textTemplate) => writeFile(pathToIndex, textTemplate))
.then(() => readStyles(pathToStyles))
.then((arrayOfStyles) => appendStyles(pathToStyle, arrayOfStyles))
.then(() => copyAssets())



//create index.html with header, articles, footer
/*
 fs.readFile(path.join(__dirname, 'template.html'), 'utf8', (err, textTemplate) => {
    if (err) throw err;
    
    fs.readFile(path.join(__dirname, 'components', 'header.html'), 'utf8', (err2, textHeader) => {
        if (err2) throw err2;
        const tagHeader = textTemplate.replace('{{header}}', textHeader);

        fs.readFile(path.join(__dirname, 'components', 'articles.html'), 'utf8', (err3, textArticles) => {
            if (err3) throw err3;
            const tagArticles = tagHeader.replace('{{articles}}', textArticles);

            fs.readFile(path.join(__dirname, 'components', 'footer.html'), 'utf8', (err4, textFooter) => {
                if (err4) throw err4;
                const tagFooter = tagArticles.replace('{{footer}}', textFooter);

                fs.appendFile(path.join(__dirname, 'project-dist', 'index.html'), tagFooter, (err5) => {
                    if (err5) {
                        console.log(err5);
                    }
                });
            });
        });
    });
});
*/

// deleted old style.css
//fs.unlink(path.join(__dirname, 'project-dist', 'style.css'), (genError) => {
//
//});


// create new style.css and add all .css files
/*
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

                    fs.appendFile(path.join(__dirname, 'project-dist', 'style.css'), (data + '\n\n'), (err2) => {
                        if (err2) {
                            console.log(err2);
                        }
                    });
                });
            }
        }
    });

});
*/
/*
const readStyles = (pathTo) => {
    return new Promise((resolve, reject) => {
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
                            stylesInfo.html = data;
                            arrayOfStyles.push(stylesInfo);
                            resolve2();

                        });
                    });

                })
            )
            .then(() => resolve(arrayOfStyles)); 
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





/*

fs.readdir(path.join(__dirname, 'project-dist', 'assets'), { withFileTypes: true }, (err, files) => {
    if (err) {
      console.error('Error reading', err.message);
      return;
    }
    files.forEach((element) => {
        if (element.isDirectory()) {
            fs.readdir(path.join(__dirname, 'project-dist', 'assets', element.name), { withFileTypes: true }, (err, files) => {
                if (err) {
                    console.error('Error reading', err.message);
                    return;
                }
                files.forEach((file) => {
                    if (element.isFile()) {
                        fs.unlink(path.join(__dirname, 'project-dist', 'assets', element.name, file.name), (genError) => {
                            if (genError) {
                                console.log("Operation Failed: ", genError);
                            }
                        });
                    }
                })
            })
        }

        if (element.isFile()) {
            fs.unlink(path.join(__dirname, 'project-dist', 'assets', element.name), (genError) => {
                if (genError) {
                    console.log("Operation Failed: ", genError);
                }
            });
        }
    })
});

*/

// copy files assets

const copyAssets = () => {
    fs.readdir(path.join(__dirname, 'assets'), { withFileTypes: true }, (err, files) => {
        if (err) {
          console.error('Error reading', err.message);
          return;
        }
        console.log('copy')
        files.forEach((element) => {
            if (element.isDirectory()) {
                fs.mkdir(path.join(__dirname, 'project-dist', 'assets', element.name), () => {
                    return;
                });
    
                fs.readdir(path.join(__dirname, 'assets', element.name), { withFileTypes: true }, (err, files) => {
                    if (err) {
                        console.error('Error reading', err.message);
                        return;
                    }
                    files.forEach((file) => {
                        if (file.isFile()) {
                            fs.copyFile(path.join(__dirname, 'assets', element.name, file.name), path.join(__dirname, 'project-dist', 'assets', element.name, file.name), (genError) => {
                                if (genError) {
                                    console.log("Operation Failed: ", genError);
                                }
                            });
                        }
                    })
                })
            }
    
            if (element.isFile()) {
                fs.copyFile(path.join(__dirname, 'assets', element.name), path.join(__dirname, 'project-dist', 'assets', element.name), (genError) => {
                    if (genError) {
                        console.log("Operation Failed: ", genError);
                    }
                });
            }
        })
    });
    
}






