const {join} = require('path');
const fs = require('fs');
const PNG = require('pngjs').PNG;

const imagePath = join(__dirname , './db/', `challenge_strider.png`);
const redColorRGBA = ['255', '0', '0', '255'];

// Decodes the Image and works
// on the pixels got from it.
fs.createReadStream(imagePath)
    .pipe(new PNG())
    .on('parsed', function() {
        countRedPixels(this.data);
        keepOnlyRedPixels(this.data);
});

// Counts the amount of red pixels on image
const countRedPixels = (pixels) => {

    // Saves the amount of red pixels on image
    let redPixelsCounter = 0;

    // If it finds red color pixels based on
    // decimal red color code, it increments
    // the redPixelsCounter variable.
    for(let i=0; i<(pixels.length); i+=redColorRGBA.length){
        if(pixels[i] == redColorRGBA[0] && pixels[i+1] == redColorRGBA[1] && pixels[i+2] == redColorRGBA[2]){
            redPixelsCounter++;
        }
    }
    console.log('The amount of red pixels on the image is: ', redPixelsCounter);
}

// Turns all the not red pixels in black, and save a new image
const keepOnlyRedPixels = (pixels) => {

    const blackColorRGBA = ['0', '0', '0', '255'];

    // If the pixels don't belong to red 
    // color turns it into black color.
    for(let i=0; i<(pixels.length); i+=redColorRGBA.length){
        if(pixels[i] == redColorRGBA[0] && pixels[i+1] == redColorRGBA[1] && pixels[i+2] == redColorRGBA[2]){
            pixels[i] = redColorRGBA[0];
            pixels[i+1] = redColorRGBA[1];
            pixels[i+2] = redColorRGBA[2];
        }
        else{
            pixels[i] = blackColorRGBA[0];
            pixels[i+1] = blackColorRGBA[1];
            pixels[i+2] = blackColorRGBA[2];
        }
    }
    
    // Saves a new image focusing
    // only on red pixels.
    fs.createReadStream(imagePath)
        .pipe(new PNG())
        .on('parsed', function() {
            this.data = pixels;
            this.pack().pipe(fs.createWriteStream('./src/db/challenge_strider_redpixels.png'));
            console.log("Image with only red pixels was sucessfully saved!");
    });
}