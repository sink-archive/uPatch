// @flow

const diff = require("fast-myers-diff");
const fs = require("fs");

type generatorContent = [number, number, string]
type fileDiffContent = generatorContent[]
type fileDiff = [string, string, ?fileDiffContent]

function diffStrings(source: string, dest: string): Generator<generatorContent, any, any> {
    return diff.calcPatch(source, dest);
}

const diffFiles = function (pairings: Map<string, string>): fileDiff[] {
    let patches: fileDiff[] = [];

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
            generatorContents = generatorContents ?? []
            generatorContents.push(next.value);
        }
        patches.push([sp, dp, generatorContents]);
    });

    return patches;
};

module.exports = {
    diffFiles,
};
