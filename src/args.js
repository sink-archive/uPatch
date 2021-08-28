// @flow

const args: any = require("yargs")
    .scriptName("µPatch")
    .usage("$0 <cmd> [options]")
    .command(
        "gen [sourcedir] [destdir] [destoffset (optional)]",
        "generate a diff",
        (yargs) => {
            yargs.positional("sourcedir", {
                type: "string",
                desc: "the directory to use as the base",
            });

            yargs.positional("destdir", {
                type: "string",
                desc: "the directory to use to generate the diff",
            });

            yargs.positional("destoffset", {
                type: "string",
                default: "",
                desc: "where in the dest dir the source dir appears",
            });
        }
    )
    .command("apply [sourcedir] [diff]", "apply a diff", (yargs) => {
        yargs.positional("sourcedir", {
            type: "string",
            desc: "the directory to apply to",
        });

        yargs.positional("diff", {
            type: "string",
            desc: "the directory containing the diff",
        });
    })
    .help().argv;

const command: "gen" | "apply" | null = args._[0];
const sourceDir: string = args.sourcedir;
const destDir: string = args.destdir;
const destOffset: ?string = args["destoffset(optional)"];

module.exports = {
    args,
    command,
    sourceDir,
    destDir,
    destOffset
};
