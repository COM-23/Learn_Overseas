const { Jimp } = require('jimp');

async function processImage() {
  try {
    const image = await Jimp.read('public/airplane.jpg');
    
    // Iterate over all pixels
    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
      const red   = this.bitmap.data[idx + 0];
      const green = this.bitmap.data[idx + 1];
      const blue  = this.bitmap.data[idx + 2];
      
      // If the pixel is very dark (close to black), make it fully transparent
      if (red < 15 && green < 15 && blue < 15) {
        this.bitmap.data[idx + 3] = 0; // alpha
      } else {
        // If it's somewhat dark (anti-aliasing halo), make it partially transparent 
        // to feather the edges nicely.
        if (red < 40 && green < 40 && blue < 40) {
          this.bitmap.data[idx + 3] = Math.max(0, (red - 15) * 10);
        }
      }
    });

    await image.write('public/airplane.png');
    console.log('Successfully generated transparent airplane.png');
  } catch (err) {
    console.error('Error processing image:', err);
  }
}

processImage();
