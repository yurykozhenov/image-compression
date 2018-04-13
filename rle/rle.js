class RLE {
    static compress(input) {
        return input.match(/(.)\1*/g)
            .map(substring => `${substring.length}${substring[0]}`)
            .join('');
    }

    static decompress(input) {
        return input.match(/(\d)+./g)
            .map(substring => substring[substring.length - 1].repeat(Number(substring.slice(0, substring.length - 1))))
            .join('');
    }
}

const data = 'wwwwwwwdddddddaaaaaabbbbbbbbbbbbbbbbbbqweaaaa';
console.log(data)

const compressed = RLE.compress(data);
console.log(compressed);

const decompressed = RLE.decompress(compressed);
console.log(decompressed);
