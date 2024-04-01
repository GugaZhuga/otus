let treeObject = {
    "name": 1,
    "items": [{
        "name": 2,
        "items": [{ "name": 3 }, { "name": 4 }]
    }, {
        "name": 5,
        "items": [{ "name": 6 }]
    }]
};
function tree(treeObject) {
    function _tree({ name, items }, index) {
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
        if (hasNoItems)
            return;
        for (let i = 0; i < items.length; i++) {
            _tree(items[i], index + 1);
        }
    }
    _tree(treeObject, 0);
}
tree(treeObject);
