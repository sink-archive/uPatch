// @flow

const { FileDiff } = require("./filediffgenerator.js");
const { makeRelative } = require("./util.js");
const fs = require("fs");

function serialize(
    diffs: FileDiff[],
    removed: string[],
    added: string[],
    sroot: string,
    droot: string
): Map<string, string> {
    let working: Map<string, string> = new Map();

    diffs.forEach((diff) => {
        let serializedDiff = diffToString(diff);
        working.set("diff/" + diff.sourcePath, serializedDiff);
    });

    added.forEach((newF) => {
        let rel = makeRelative(newF, droot);
        let content = fs.readFileSync(newF).toString();
        working.set("new/" + rel, content);
    });

    let removedList = removed.map((f) => makeRelative(f, sroot)).join("\n");
    working.set("rm", removedList);

    return working;
}

function diffToString(diff: FileDiff): string {
    return JSON.stringify(diff);
}

function stringToDiff(diff: string): FileDiff {
    /* let split = diff.split("\n");
    let sourcePath = split[0];
    let destPath = split[1];
    let content: [number, number, string][] = [];
    split.slice(2).forEach((l) => {
        content.push(JSON.parse(l));
    });

    return new FileDiff(sourcePath, destPath, content); */
    return JSON.parse(diff);
}

module.exports = {
    serialize,
};
