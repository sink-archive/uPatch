// @flow

const { args }       = require('./args.js');
const { getFilelist } = require('./filelists.js')

function main(): void {
    if (args._[0] == "gen") {
        gen(args.sourcedir, args.destdir, args['destoffset(optional)']);
    }
    else if (args._[0] == "apply") {
        apply(args.sourcedir, args.destdir);
    }
}

function gen(sourceDir: string, destDir: string, offsetDir: string) {
    console.log(getFilelist(sourceDir));
    console.log(getFilelist(destDir));
}

function apply(sourceDir: string, destDir: string) {

}


main(); // why node this isnt python have a main function like a sensible lang