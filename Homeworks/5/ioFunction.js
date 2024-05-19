const fs = require("node:fs");
async function ioFunction(inputFullFileName, outputFullFileName) {
    if (inputFullFileName === outputFullFileName)
        throw new Error("Имена файлов не должны быть равны");
    const readStream = fs.createReadStream(inputFullFileName, { encoding: "utf8" });
    const writeStream = fs.createWriteStream(outputFullFileName, { encodint: "utf8" });
    let buffer = "";
    const cache = new Map();
    function updateCache(cache, buffer) {
        if (buffer.length === 0)
            return;
        if (cache.has(buffer)) {
            cache.set(buffer, cache.get(buffer) + 1);
        }
        else {
            cache.set(buffer, 1);
        }
    }
    for await (const string of readStream) {
        for (const char of string) {
            if (char.match(/[A-Za-z0-9]/)) {
                buffer += char;
            }
            else if (char === "\n" || char === " ") {
                updateCache(cache, buffer);
                buffer = "";
            }
        }
        updateCache(cache, buffer);
        buffer = "";
    }
    writeStream.end(`[${Array.from(cache).map(([key, value]) => key).sort().map(x => parseInt(cache.get(x))).join(", ")}]`);
}
ioFunction("D:\\Data\\Education\\OTUS\\Homeworks\\5\\input.txt", "D:\\Data\\Education\\OTUS\\Homeworks\\5\\output.txt");