const Jimp = require("jimp");

async function removeWhiteBackground(inputFile, outputFile) {
    try {
        const image = await Jimp.read(inputFile);
        
        image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
            const r = this.bitmap.data[idx + 0];
            const g = this.bitmap.data[idx + 1];
            const b = this.bitmap.data[idx + 2];
            
            if (r > 235 && g > 235 && b > 235) {
                const brightness = (r + g + b) / 3;
                if (brightness > 250) {
                    this.bitmap.data[idx + 3] = 0; 
                } else {
                    this.bitmap.data[idx + 3] = Math.max(0, 255 - (brightness - 235) * 12);
                }
            }
        });
        
        await image.writeAsync(outputFile);
        console.log('Done:', outputFile);
    } catch (err) {
        console.error('Error:', err);
    }
}

const input = process.argv[2];
const output = process.argv[3];
if (input && output) {
    removeWhiteBackground(input, output);
}
