// @flow

const args = require("./args.js");
const { getFilelist } = require("./filelists.js");
const { findMatchingFiles } = require("./filematcher.js");
const path = require("path");
const { readFileSync } = require("fs");
const { diffFiles } = require("./filediffgenerator.js");
const { pickFilePairings } = require("./pairpicker.js");

function main() {
    switch (args.command) {
        case "gen":
            gen(args.sourceDir, args.destDir, args.destOffset);
            break;

        case "apply":
            apply(args.sourceDir, args.destDir);
            break;

        case undefined:
            console.log("Please supply a command - see --help for more info");
            break;
    }
}

function applyOffsetIfNecessary(destDir: string, offsetDir: ?string) {
    return offsetDir ? path.join(destDir, offsetDir) : destDir;
}

function gen(sourceDir: string, destDir: string, offsetDir: ?string) {
    let sourceFiles = getFilelist(sourceDir);
    let destFiles = getFilelist(destDir);

    //let matchingFiles = findMatchingFiles(sourceFiles, destFiles, offsetDir);

    let [pairings, unMatchedSourceFiles] = pickFilePairings(
        sourceFiles,
        destFiles
    );
    console.log("FILE PAIRINGS:");
    console.log(pairings);
    console.log("UNMATCHED SOURCE FILES:");
    console.log(unMatchedSourceFiles);

    //let patches = diffFiles(sourceFiles, destFiles);
}

function apply(sourceDir: string, destDir: string) {}

main(); // why node this isnt python have a main function like a sensible lang
