const {join} = require('path');
const fs = require('fs');
const PNG = require('pngjs').PNG;

// Configures the Image Path
const imagePath = join(__dirname , './db/', `challenge_strider.png`);

// Red and white color code in RGB
const redColorDecimalCode = ['255', '0', '0'];
const whiteColorDecimalCode = ['255', '255', '255'];

// Decodes the Image and works
// on the pixels got from it
fs.createReadStream(imagePath)
    .pipe(new PNG())
    .on('parsed', function() {
        countRedPixels(this.data);
        keepOnlyRedPixels(this.data);
});

// Counts the amount of red pixels on image
const countRedPixels = (pixels) => {

    // Saves the number of red pixels on Image
    let redPixelsCounter = 0;

    // If it finds red color pixels based on
    // decimal red color code, it increments
    // the redPixelsCounter variable.
    // As a RGB color is composed of multiple values
    // we'll increment by 2.
    for(let i=0; i<(pixels.length); i+=2){
        if(pixels[i] == redColorDecimalCode[0] && pixels[i+1] == redColorDecimalCode[1] && pixels[i+2] == redColorDecimalCode[2]){
            redPixelsCounter++;
        }
    }

    console.log('The amount of red pixels on the image is: ', redPixelsCounter);

}

// Turns all the not red pixels in white, and save a new image
const keepOnlyRedPixels = (pixels) => {

    // If the pixels don't belong to red 
    // color turns it into white color.
    // As a RGB color is composed of multiple values
    // we'll increment by 2.
    for(let i=0; i<(pixels.length); i+=2){
        if(pixels[i] == redColorDecimalCode[0] && pixels[i+1] == redColorDecimalCode[1] && pixels[i+2] == redColorDecimalCode[2]){
            pixels[i] = redColorDecimalCode[0];
            pixels[i+1] = redColorDecimalCode[1];
            pixels[i+2] = redColorDecimalCode[2];
        }
        else{
            pixels[i] = whiteColorDecimalCode[0];
            pixels[i+1] = whiteColorDecimalCode[1];
            pixels[i+2] = whiteColorDecimalCode[2];
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