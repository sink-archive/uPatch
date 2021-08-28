// @flow

const args = require("./args.js");
const { getFilelist } = require("./filelists.js");
const path = require("path");

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

function gen(sourceDir: string, destDir: string, offsetDir: ?string) {
    let sourceFiles = getFilelist(sourceDir);
    let destFiles = getFilelist(destDir);
    console.log(sourceFiles);
    console.log(getFilelist(applyOffsetIfNecessary(destDir, offsetDir)));
}

function applyOffsetIfNecessary(destDir: string, offsetDir: ?string) {
    return offsetDir ? path.join(destDir, offsetDir) : destDir;
}

function apply(sourceDir: string, destDir: string) {}

main(); // why node this isnt python have a main function like a sensible lang
