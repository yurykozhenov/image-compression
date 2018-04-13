class LZW {
    static compress(input) {
        const dictionary = this._initCompressDictionary();
        const result = [];
        let w = input[0];

        input = Array.from(input);

        input.forEach((c, i) => {
            if (i === 0) return;

            const wc = w + c;

            if (dictionary.has(wc)) {
                w = wc;
            } else {
                result.push(dictionary.get(w));
                // Add wc to the dictionary.
                dictionary.set(wc, dictionary.size);
                w = c.toString();
            }
        });

        // Output the code for w.
        if (w !== null) {
            result.push(dictionary.get(w));
        }

        return result;
    }

    static decompress(input) {
        const dictionary = this._initDecompressDictionary();
        let w = String.fromCharCode(input[0]);
        let result = w;

        input.forEach((k, i) => {
            if (i === 0) return;

            let entry;

            if (dictionary.has(k)) {
                entry = dictionary.get(k);
            } else if (k === dictionary.size) {
                entry = w + w[0];
            } else {
                throw new Error();
            }

            result += entry;

            dictionary.set(dictionary.size, w + entry[0]);

            w = entry;
        });
        
        return result;
    }

    static _initCompressDictionary() {
        const dictionary = new Map();

        for (let i = 0; i < 256; i += 1) {
            dictionary.set(String.fromCharCode(i), i);
        }

        return dictionary;
    }

    static _initDecompressDictionary() {
        const dictionary = new Map();

        for (let i = 0; i < 256; i += 1) {
            dictionary.set(i, String.fromCharCode(i));
        }

        return dictionary;
    }
}

module.exports = LZW;
