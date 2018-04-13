const fs = require('fs');
const util = require('util');
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);
const LZW = require('./lzw');

const inputFilename = process.argv[2];
const outputCompressedFilename = process.argv[3];
const outputDecompressedFilename = process.argv[4];

async function main() {
    const data = await readFileAsync(inputFilename, 'utf8');

    // Compress
    const compressedData = LZW.compress(data);
    await writeFileAsync(outputCompressedFilename, compressedData);

    // Decompress
    const compressedFile = await readFileAsync(outputCompressedFilename, 'utf8');
    const decompressedData = LZW.decompress(compressedFile.split(',').map(x => Number(x)));
    await writeFileAsync(outputDecompressedFilename, decompressedData);
}

main();
