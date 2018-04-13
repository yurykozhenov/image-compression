const ffmpeg = require('fluent-ffmpeg');

const inputFilename = process.argv[2];
const outputFilename = process.argv[3];

ffmpeg(inputFilename).save(outputFilename);
