// @flow

const fs = require("fs");
const path = require("path");

function getFilelist(dir: string): string[] {
    let files: string[] = [];

    fs.readdirSync(dir, { withFileTypes: true }).forEach((d) => {
        if (d.name === ".directory") {
            return; // stupid .directory entry why does it exist??????? NODE WHYYYY
        }

        if (d.isDirectory()) {
            if (typeof d.name == "string") {
                files = files.concat(getFilelist(path.join(dir, d.name)));
            } else {
                console.log("filename was buffer not string");
            }
        } else {
            if (typeof d.name == "string") {
                files.push(path.resolve(dir, d.name));
            } else {
                console.log("filename was buffer not string");
            }
        }
    });

    return files;
}

module.exports = {
    getFilelist,
};
