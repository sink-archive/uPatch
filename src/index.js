// @flow

const args = require("./args.js");
const { getFilelist } = require("./filelists.js");
const path = require("path");
const { readFileSync } = require("fs");
const { diffFiles } = require("./filediffgenerator.js");
const { pickFilePairings } = require("./pairpicker.js");
const { serialize, writeDiff } = require("./diffSerializer.js");

function main() {
    switch (args.command) {
        case "gen":
            gen(
                args.sourceDir,
                args.destDir,
                args.destOffset,
                args.genOutputDir
            );
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

function gen(
    sourceDir: string,
    destDir: string,
    offsetDir: ?string,
    outputDir: string
) {
    let sourceFiles = getFilelist(sourceDir);
    let destFiles = getFilelist(destDir);

    let [pairings, unmatchedFiles, addedFiles] = pickFilePairings(
        sourceFiles,
        destFiles,
        offsetDir != null ? path.join(sourceDir, offsetDir) : null
    );

    let patches = diffFiles(pairings, sourceDir, destDir);

    let serialized = serialize(
        patches,
        unmatchedFiles,
        addedFiles,
        sourceDir,
        destDir
    );

    writeDiff(serialized, outputDir);
}

function apply(sourceDir: string, destDir: string) {}

main(); // why node this isnt python have a main function like a sensible lang
