// @flow

const diff = require("fast-myers-diff");
const fs = require("fs");

function findClosestFile(path: string, candidates: string[]): string {
    // TODO: write me
    return "";
}

function diffStrings(source: string, dest: string) {
    let patch = diff.calcPatch(source, dest);
    return patch;
}

const diffFiles = function (sourcePaths: string[], destPaths: string[]): ?[] {
    let patches = [];

    sourcePaths.forEach((sp, i) /* lmao dont do it like this */ => {
        if (i >= destPaths.length) {
            return; /* please stop breaking */
        }
        let source = fs.readFileSync(sp).toString();
        let dest = fs.readFileSync(destPaths[i]).toString();

        let generator = diffStrings(source, dest);
        let generatorContents = [];
        while (true) {
            let next = generator.next();
            if (next.done) {
                break;
            }
            generatorContents.push(next.value);
        }
        patches.push(generatorContents);
    });

    return patches;
};

module.exports = {
    diffFiles,
};
