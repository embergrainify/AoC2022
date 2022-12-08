const fs = require('fs');

const readData = (fileName) => {
    let rawData = '';
    try {
        rawData = fs.readFileSync(fileName, 'utf8');
    } catch (err) {
        console.error(err);
    }
    return rawData;
}

const debugJsonToFile = (data) => {
    fs.appendFileSync("debug.txt", JSON.stringify(data), (err) => {
        if (err)
            console.log(err);
        else {
            console.log("File written successfully\n");
        }
    });
}

const debugToFile = (data) => {
    fs.appendFileSync("debug.txt", data, (err) => {
        if (err)
            console.log(err);
        else {
            console.log("File written successfully\n");
        }
    });
}

module.exports = { readData, debugJsonToFile, debugToFile };