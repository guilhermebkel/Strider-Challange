const {join} = require('path');
const fs = require('fs');
const PNG = require('pngjs').PNG;

// Configures the Image Path
const imagePath = join(__dirname , './db/', `challenge_strider.png`);

// Red color code in RGB
const redColorDecimalCode = ['255', '0', '0'];

// Decodes the Image and works
// on the pixels got from it.
fs.createReadStream(imagePath)
    .pipe(new PNG())
    .on('parsed', function() {
        countRedPixels(this.data);
        findPatternOnRedPixels(this.data);
        keepOnlyRedPixels(this.data);
});

// Counts the amount of red pixels on image
const countRedPixels = (pixels) => {

    // Saves the amount of red pixels on image
    let redPixelsCounter = 0;

    // If it finds red color pixels based on
    // decimal red color code, it increments
    // the redPixelsCounter variable.
    for(let i=0; i<(pixels.length); i+=4){
        if(pixels[i] == redColorDecimalCode[0] && pixels[i+1] == redColorDecimalCode[1] && pixels[i+2] == redColorDecimalCode[2]){
            redPixelsCounter++;
        }
    }
    console.log('The amount of red pixels on the image is: ', redPixelsCounter);
}

// Turns all the not red pixels in white, and save a new image
const keepOnlyRedPixels = (pixels) => {

    // Black color code in RGB
    const blackColorDecimalCode = ['0', '0', '0'];

    // If the pixels don't belong to red 
    // color turns it into white color.
    for(let i=0; i<(pixels.length); i+=4){
        if(pixels[i] == redColorDecimalCode[0] && pixels[i+1] == redColorDecimalCode[1] && pixels[i+2] == redColorDecimalCode[2]){
            pixels[i] = redColorDecimalCode[0];
            pixels[i+1] = redColorDecimalCode[1];
            pixels[i+2] = redColorDecimalCode[2];
        }
        else{
            pixels[i] = blackColorDecimalCode[0];
            pixels[i+1] = blackColorDecimalCode[1];
            pixels[i+2] = blackColorDecimalCode[2];
        }
    }
    
    // Saves a new image focusing
    // only on red pixels.
    fs.createReadStream(imagePath)
        .pipe(new PNG())
        .on('parsed', function() {
            this.data = pixels;
            this.pack().pipe(fs.createWriteStream('./src/db/challenge_strider_redpixels.png'));
            console.log("\nImage with only red pixels was sucessfully saved!");
    });
}

const findPatternOnRedPixels = (pixels) => {

    let alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
                    'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    let newArray = [];

    for(let i=0; i<(pixels.length); i+=2){
        if(pixels[i] == redColorDecimalCode[0] && pixels[i+1] == redColorDecimalCode[1] && pixels[i+2] == redColorDecimalCode[2]){
            newArray.push("red");
        }
        else{
            newArray.push([pixels[i], pixels[i+1], pixels[i+2]]);
        }
    }
    
    for(let i=0; i<newArray.length; i++){
        if(newArray[i] == "red"){
            process.stdout.write(alphabet[i%alphabet.length]);
        }
    }
    
}