//let treeObject = {
//    "name": 1,
//    "items": [{
//        "name": 2,
//        "items": [{ "name": 3 }, { "name": 4 }]
//    }, {
//        "name": 5,
//        "items": [{ "name": 6 }]
//    }]
//};
const fs = require("node:fs/promises");
const path = require("node:path");
async function tree(treeObject, depth = undefined) {
    async function _tree(fileSystemPath, depth, index) {
        let name = path.parse(fileSystemPath).base;
        let items = (await fs.stat(fileSystemPath)).isDirectory()
            ? (await fs.readdir(fileSystemPath, { withFileTypes: true, recursive: false }))
            : undefined;
        let simpleOffset = '│'; //179
        let simpleBranchOffset = '└'; //192
        let complexBranchOffset = '├'; //195
        let branchOffset = '─'; //196
        let line = "";
        let hasNoItems = items == undefined || items.length == 0;
        for (let i = 0; i < index; i++) {
            line += i == index - 1
                ? hasNoItems
                    ? simpleBranchOffset
                    : complexBranchOffset
                : simpleOffset
        }
        if (index != 0)
            line += branchOffset + branchOffset;
        line += name;
        console.log(line);
        if (depth === index)
            return;
        if (hasNoItems)
            return;
        for (let item of items) {
            await _tree(path.join(item.path, item.name), depth, index + 1);
        }
    }
    await _tree(treeObject, depth, 0);
};
//tree(treeObject);
tree("D:\\Data\\Education\\OTUS\\Homeworks\\3", 1);
