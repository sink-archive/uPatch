// @flow

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

function pickFilePairings(
    source: string[],
    dest: string[]
): [Map<string, ?string>, string[]] {
    let pool = source;
    let matches: Map<string, ?string> = new Map();

    dest.forEach((path) => {
        if (pool.length == 0) {
            matches.set(path, null);
        } else {
            let bestPairing = findClosestFile(path, pool);
            matches.set(path, bestPairing);
            pool.splice(pool.indexOf(bestPairing), 1);
        }
    });

    return [matches, pool];
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
