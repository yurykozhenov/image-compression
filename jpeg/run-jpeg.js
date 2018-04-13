const fs = require('fs');
const util = require('util');
const jimp = require('jimp');
const jpeg = require('jpeg-js');
const writeFileAsync = util.promisify(fs.writeFile);

const inputPath = process.argv[2];
const outputPath = process.argv[3];
const quality = process.argv[4];

function getPixel(image, x, y) {
    return jimp.intToRGBA(image.getPixelColor(x, y));
}

function setPixel(image, pixel, x, y) {
    return image.setPixelColor(jimp.rgbaToInt(pixel.r, pixel.g, pixel.b, pixel.a), x, y);
}

async function main() {
    const image = await jimp.read(inputPath);

    // for (let i = 0; i < image.bitmap.width; i++) {
    //     for (let j = 0; j < image.bitmap.width; j++) {
    //         const pixel = getPixel(image, i, j);

    //         const { r, g, b } = pixel;

    //         const y = 0.299 * r + 0.587 * g + 0.114 * b;
    //         const pb = -0.168736 * r - 0.331264 * g + 0.5 * b;
    //         const pr = 0.5 * r - 0.418688 * g - 0.081312 * b;

    //         pixel.r = y;
    //         pixel.g = y;
    //         pixel.b = y;

    //         setPixel(image, pixel, i, j);
    //     }
    // }

    const jpegImage = jpeg.encode(image.bitmap, quality);
    await writeFileAsync(outputPath, jpegImage.data);
}

main();
