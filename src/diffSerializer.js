// @flow

const { FileDiff } = require("./filediffgenerator.js");

function serialize(
    diffs: FileDiff[],
    removed: string[],
    added: string[]
): Map<string, string> {
    let working: Map<string, string> = new Map();

    diffs.forEach((diff) => {
        let serializedDiff = diffToString(diff);
        working.set(diff.sourcePath, serializedDiff);
    });

    

    return working;
}

function diffToString(diff: FileDiff): string {
    let working = "";

    working += diff.sourcePath + "\n";
    working += diff.destPath + "\n";
    
    if (diff.diff) {
        diff.diff.forEach((d) => {
            working += JSON.stringify(d)
        });
    }

    return working;
}

function stringToDiff(diff: string): FileDiff {
    let split = diff.split("\n");
    let sourcePath = split[0]
    let destPath = split[1]
    let content: [number, number, string][] = []
    split.slice(2).forEach(l => {
        content.push(JSON.parse(l))
    })

    return new FileDiff(sourcePath, destPath, content);
}

module.exports = {
    serialize,
};
