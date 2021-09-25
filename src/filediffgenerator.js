// @flow

const diff = require("fast-myers-diff");
const fs = require("fs");
const { makeRelative } = require("./util.js");

type generatorContent = [number, number, string];
type fileDiffContent = generatorContent[];

class FileDiff {
    constructor(sp: string, dp: string, d: ?fileDiffContent) {
        this.sourcePath = sp;
        this.destPath = dp;
        this.diff = d;
    }

    sourcePath: string;
    destPath: string;
    diff: ?fileDiffContent;
}

function diffStrings(
    source: string,
    dest: string
): Generator<generatorContent, any, any> {
    return diff.calcPatch(source, dest);
}

const diffFiles = function (
    pairings: Map<string, string>,
    sroot: string,
    droot: string
): FileDiff[] {
    let patches: FileDiff[] = [];

    pairings.forEach((sp, dp) => {
        let source = fs.readFileSync(sp).toString();
        let dest = fs.readFileSync(dp).toString();

        let generator = diffStrings(source, dest);
        let generatorContents: ?fileDiffContent = null;
        while (true) {
            let next = generator.next();
            if (next.done) {
                break;
            }
            generatorContents = generatorContents ?? [];
            generatorContents.push(next.value);
        }

        let relSp = makeRelative(sp, sroot);
        let relDp = makeRelative(dp, droot);
        patches.push(new FileDiff(relSp, relDp, generatorContents));
    });

    return patches;
};

module.exports = {
    diffFiles,
    FileDiff,
};
