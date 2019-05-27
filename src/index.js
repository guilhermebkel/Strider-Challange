const PNG = require('png-js');
const {join} = require('path');

// Configures the Image Path
const imagePath = join(__dirname , './db/', `challenge_strider.png`);

// Red color code in hexadecimal and decimal type
const redColorHexadecimalCode = '#FF0000';
const redColorDecimalCode = ['255', '0', '0'];

// Decodes the Image and gets 
// all the pixels code from it.
PNG.decode(imagePath, (pixels) => {

    // Saves the number of red pixels on Image
    let redPixelsCounter = 0;

    // If it finds red color pixels based on
    // decimal red color code, it increments
    // the redPixelsCounter variable.
    for(let i=0; i<(pixels.length-2); i++){
        if(pixels[i] == redColorDecimalCode[0] && pixels[i+1] == redColorDecimalCode[1] && pixels[i+2] == redColorDecimalCode[2]){
            redPixelsCounter++;
        }
    }

    console.log(redPixelsCounter);

});
