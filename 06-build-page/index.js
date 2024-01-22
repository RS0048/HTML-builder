const fs = require('fs');
const path = require('path');


//create folder project-dist
fs.mkdir(path.join(__dirname, 'project-dist'), () => {
    return;
});


// deleted old index.html
fs.unlink(path.join(__dirname, 'project-dist', 'index.html'), (genError) => {
    if (genError) {
      console.log('The file has not been created yet', genError);
    }
});

fs.readFile(path.join(__dirname, 'template.html'), 'utf8', (err, textTemplate) => {
    if (err) throw err;

    fs.appendFile(path.join(__dirname, 'project-dist', 'index.html'), textTemplate, (err) => {
        if (err) {
            console.log(err);
        }
    });
});








fs.readdir(path.join(__dirname, 'components'), { withFileTypes: true }, (err, files) => {
    if (err) {
      console.error('Error reading', err.message);
      return;
    }

    fs.readFile(path.join(__dirname, 'template.html'), 'utf8', (err, textTemplate) => {
        if (err) throw err;
        files.forEach((element) => {
            const infoOfFile = path.parse(path.join(__dirname, 'components', element.name));
            const nameOfFiles = infoOfFile.name;

            
             fs.readFile(path.join(__dirname, 'components', element.name), 'utf8', (err, textFromComponent) => {
                if (err) throw err;
                textTemplate = textTemplate.replace(('{{' + nameOfFiles + '}}'), textFromComponent);
                

                 fs.writeFile(path.join(__dirname, 'project-dist', 'index.html'), textTemplate, (err) => {
                    if (err) {
                        console.log(err);
                    }
                    
                })


            })
        })



    });

});



















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
fs.unlink(path.join(__dirname, 'project-dist', 'style.css'), (genError) => {
    if (genError) {
      console.log('The file has not been created yet', genError);
    }
});


// create new style.css and add all .css files
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


// create new folder - assets
fs.mkdir(path.join(__dirname, 'project-dist', 'assets'), () => {
    return;
});


// delete all files from folder assets
/*fs.readdir(path.join(__dirname, 'project-dist', 'assets'), { withFileTypes: true }, (err, files) => {
    if (err) {
      console.error('Error reading', err.message);
      return;
    }
    files.forEach((element) => {
        if (element.isFile()) {
            fs.unlink(path.join(__dirname, 'project-dist', 'assets', element.name), (genError) => {
                if (genError) {
                  console.log("Operation Failed: ", genError);
                }
            });
        }
    });
});*/


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



// copy files assets
fs.readdir(path.join(__dirname, 'assets'), { withFileTypes: true }, (err, files) => {
    if (err) {
      console.error('Error reading', err.message);
      return;
    }
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

