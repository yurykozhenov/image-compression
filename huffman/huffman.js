class BinaryHeap {
    constructor(scoreFunction) {
        this.content = [];
        this.scoreFunction = scoreFunction;
    }

    push(element) {
        // Add the new element to the end of the array.
        this.content.push(element);
        // Allow it to bubble up.
        this.bubbleUp(this.content.length - 1);
    }

    pop() {
        // Store the first element so we can return it later.
        const result = this.content[0];
        // Get the element at the end of the array.
        const end = this.content.pop();
        // If there are any elements left, put the end element at the
        // start, and let it sink down.
        if (this.content.length > 0) {
            this.content[0] = end;
            this.sinkDown(0);
        }
        return result;
    }

    remove(node) {
        const length = this.content.length;
        // To remove a value, we must search through the array to find
        // it.
        for (let i = 0; i < length; i++) {
            if (this.content[i] != node) continue;
            // When it is found, the process seen in 'pop' is repeated
            // to fill up the hole.
            const end = this.content.pop();
            // If the element we popped was the one we needed to remove,
            // we're done.
            if (i == length - 1) break;
            // Otherwise, we replace the removed element with the popped
            // one, and allow it to float up or sink down as appropriate.
            this.content[i] = end;
            this.bubbleUp(i);
            this.sinkDown(i);
            break;
        }
    }

    size() {
        return this.content.length;
    }

    bubbleUp(n) {
        // Fetch the element that has to be moved.
        const element = this.content[n], score = this.scoreFunction(element);
        // When at 0, an element can not go up any further.
        while (n > 0) {
            // Compute the parent element's index, and fetch it.
            const parentN = Math.floor((n + 1) / 2) - 1;
            const parent = this.content[parentN];
            // If the parent has a lesser score, things are in order and we
            // are done.
            if (score >= this.scoreFunction(parent))
                break;

            // Otherwise, swap the parent with the current element and
            // continue.
            this.content[parentN] = element;
            this.content[n] = parent;
            n = parentN;
        }
    }

    sinkDown(n) {
        // Look up the target element and its score.
        const length = this.content.length;
        const element = this.content[n];
        const elemScore = this.scoreFunction(element);

        while (true) {
            // Compute the indices of the child elements.
            const child2N = (n + 1) * 2, child1N = child2N - 1;
            // This is used to store the new position of the element,
            // if any.
            let swap = null;
            let child1Score;
            // If the first child exists (is inside the array)...
            if (child1N < length) {
                // Look it up and compute its score.
                const child1 = this.content[child1N];
                child1Score = this.scoreFunction(child1);
                // If the score is less than our element's, we need to swap.
                if (child1Score < elemScore)
                    swap = child1N;
            }
            // Do the same checks for the other child.
            if (child2N < length) {
                const child2 = this.content[child2N];
                const child2Score = this.scoreFunction(child2);
                if (child2Score < (swap == null ? elemScore : child1Score))
                    swap = child2N;
            }

            // No need to swap further, we are done.
            if (swap == null) break;

            // Otherwise, swap and continue.
            this.content[n] = this.content[swap];
            this.content[swap] = element;
            n = swap;
        }
    }
}

class HuffmanEncoding {
    constructor(str) {
        this.str = str;

        const countChars = {};
        for (let i = 0; i < str.length; i++) {
            if (str[i] in countChars) {
                countChars[str[i]]++;
            } else {
                countChars[str[i]] = 1;
            }
        }

        const pq = new BinaryHeap(x => x[0]);
        for (let ch in countChars) {
            pq.push([countChars[ch], ch]);
        }

        while (pq.size() > 1) {
            const pair1 = pq.pop();
            const pair2 = pq.pop();
            pq.push([pair1[0] + pair2[0], [pair1[1], pair2[1]]]);
        }

        const tree = pq.pop();
        this.encoding = {};
        this._generateEncoding(tree[1], "");

        this.encodedString = ""
        for (let i = 0; i < this.str.length; i++) {
            this.encodedString += this.encoding[str[i]];
        }
    }

    inspectEncoding() {
        for (let ch in this.encoding) {
            console.log(`'${ch}': ${this.encoding[ch]}`);
        }
    }

    decode(encoded) {
        const revEnc = {};
        for (let ch in this.encoding)
            revEnc[this.encoding[ch]] = ch;

        let decoded = "";
        let pos = 0;
        while (pos < encoded.length) {
            let key = ""
            while (!(key in revEnc)) {
                key += encoded[pos];
                pos++;
            }
            decoded += revEnc[key];
        }
        return decoded;
    }

    _generateEncoding(ary, prefix) {
        if (ary instanceof Array) {
            this._generateEncoding(ary[0], prefix + "0");
            this._generateEncoding(ary[1], prefix + "1");
        }
        else {
            this.encoding[ary] = prefix;
        }
    }
}

const data = "this is an example for huffman encoding";
console.log(data);

const huff = new HuffmanEncoding(data);
huff.inspectEncoding();

const encoded = huff.encodedString;
console.log(encoded);

const decoded = huff.decode(encoded);
console.log(decoded);

console.log(`Is decoded string same as original? ${(data === decoded)}`);
