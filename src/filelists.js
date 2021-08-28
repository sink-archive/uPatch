// @flow

const fs = require("fs");
const path = require("path");

// source: https://coderrocketfuel.com/article/recursively-list-all-the-files-in-a-directory-using-node-js
function recurse(dirPath: string, arrayOfFiles: string[]) {
    let files = fs.readdirSync(dirPath);

    arrayOfFiles = arrayOfFiles || [];

    files.forEach(function (file) {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            arrayOfFiles = recurse(dirPath + "/" + file, arrayOfFiles);
        } else {
            arrayOfFiles.push(path.join(__dirname, dirPath, "/", file));
        }
    });

    return arrayOfFiles;
}

module.exports = {
    getFilelist: function (dir: string): string[] {
        return recurse(dir, []);
    },
};
