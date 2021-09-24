// @flow

type generatorContent = [number, number, string];
type fileDiffContent = generatorContent[];
type fileDiff = [string, string, ?fileDiffContent];

function serialize(diffs: fileDiff[], removed: string[], added: string[]) {
    return null;
}


module.exports = {
    serialize
}