// @flow

const crypto = require("crypto");
const fs = require("fs");

const findMatchingFiles = function (
    sourceFiles: string[],
    destFiles: string[],
    offset: ?string
): Map<string, string[]> {
    let matchingFiles: Map<string, string[]> = new Map();

    destFiles.forEach((df) => {
        let destHash = md5(df);
        sourceFiles.forEach((sf) => {
            let sourceHash = md5(sf);
            if (sourceHash == destHash) {
                let existingFiles = matchingFiles.get(df);
                if (!existingFiles) {
                    existingFiles = [];
                } // if there is not already an entry for this file, create a new one. doing so changes existingFiles from void | string[] to string[]

                matchingFiles.set(df, existingFiles.concat(sf));
            }
        });
    });

    return matchingFiles;
};

function md5(filepath: string) {
    let hash = crypto.createHash("md5");
    let fileBuffer = fs.readFileSync(filepath);
    return hash.update(fileBuffer).digest("base64");
}

module.exports = {
    findMatchingFiles,
};
