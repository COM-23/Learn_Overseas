import fs from 'fs';
import { createCanvas, loadImage } from 'canvas';

async function run() {
    const img = await loadImage('./public/particle_logo.png');
    const canvas = createCanvas(img.width, img.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    const data = ctx.getImageData(0, 0, img.width, img.height).data;
    const colors = new Set();
    for (let i = 0; i < data.length; i += 4) {
        if (data[i+3] > 0) {
            colors.add(`${data[i]},${data[i+1]},${data[i+2]}`);
        }
    }
    console.log(Array.from(colors).slice(0, 10));
}
run();
