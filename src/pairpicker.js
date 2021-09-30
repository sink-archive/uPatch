// @flow

const path = require("path");

function findClosestFile(path: string, candidates: string[]): string {
    let splitPath = path.split("/");

    let splitCandidates: string[][] = [];
    candidates.forEach((candidate) => {
        splitCandidates.push(candidate.split("/"));
    });

    splitCandidates.sort((a, b) => {
        return (
            matchingPartsBackward(b, splitPath) -
            matchingPartsBackward(a, splitPath)
        );
    });

    return splitCandidates[0].join("/");
}

function isInDir(filePath: string, dir: string): boolean {
    let pathsplit = filePath.replace("\\", "/").split("/");
    let dirsplit = dir.replace("\\", "/").split("/");

    let contains = true;
    dirsplit.forEach((val, i) => {
        if (pathsplit[i] != val) {
            contains = false;
        }
    });

    return contains;
}

function pickFilePairings(
    source: string[],
    dest: string[],
    offsetDir: ?string
): [Map<string, string>, string[], string[]] {
    let matches: Map<string, string> = new Map();
    let pool =
        offsetDir != null
            ? source.filter((val) =>
                  isInDir(path.resolve(val), path.resolve(offsetDir))
              )
            : source;
    let added: string[] =
        offsetDir != null
            ? source.filter(
                  (val) => !isInDir(path.resolve(val), path.resolve(offsetDir))
              )
            : [];

    dest.forEach((path) => {
        if (pool.length == 0) {
            added.push(path);
        } else {
            let bestPairing = findClosestFile(path, pool);
            matches.set(path, bestPairing);
            pool.splice(pool.indexOf(bestPairing), 1);
        }
    });

    return [matches, pool, added];
}

function matchingPartsBackward<T>(a: T[], b: T[]): number {
    let aLastIndex = a.length - 1;
    let bLastIndex = b.length - 1;

    for (let i = 0; i < Math.min(a.length, b.length); i++) {
        let aIndex = aLastIndex - i;
        let bIndex = bLastIndex - i;
        if (a[aIndex] != b[bIndex]) {
            return i;
        }
    }

    return Math.min(a.length, b.length);
}

module.exports = {
    findClosestFile,
    pickFilePairings,
};
