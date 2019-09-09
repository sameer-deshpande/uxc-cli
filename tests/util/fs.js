import * as fs from 'fs-extra';

export function fileExists(path){
    return fs.existsSync(path);
}

export function cleanUpFiles(fileArray) {
    fileArray.forEach(fileName => {
        if(this.fileExists(fileName)){
            this.deleteFile(fileName);
        }
    });   
}

export function deleteFile(path) {
    return new Promise((resolve, reject) => {
        fs.unlink(path, (err) => {
            if (err) {
                reject(err);
            }
            else {
                resolve();
            }
        });
    });
}


