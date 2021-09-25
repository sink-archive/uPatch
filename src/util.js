// @flow

function makeRelative(absolute: string, root: string): string {
    let rootCount = root.replace("\\", "/").split("/").length;
    let splitAbs = absolute.replace("\\", "/").split("/");
    let desired = splitAbs.slice(rootCount);
    return desired.join("/");
}

module.exports = {
    makeRelative,
};
