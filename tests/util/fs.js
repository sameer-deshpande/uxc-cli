import * as fs from 'fs-extra';

export function fileExists(path){
    return fs.existsSync(path);
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

export function expectFileNotToExist(fileName) {
    return new Promise((resolve, reject) => {
        fs.exists(fileName, (exist) => {
            if (exist) {
                reject(new Error(`File ${fileName} was expected not to exist but found...`));
            }
            else {
                resolve();
            }
        });
    });
}
export function expectFileToExist(fileName) {
    return new Promise((resolve, reject) => {
        fs.exists(fileName, (exist) => {
            if (exist) {
                resolve();
            }
            else {
                reject(new Error(`File ${fileName} was expected to exist but not found...`));
            }
        });
    });
}

