const fs = require('fs');

class FileHandler {
    writeToFile(destination, content) {
        fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
            err ? console.error(err) : console.info(`\nData written to ${destination}`)
        );
    }

    readThenAppend(content, file) {
        fs.readFile(file, 'utf8', (err, data) => {
            if (err) {
              console.error(err);
            } else {
              const parsedData = JSON.parse(data);
              parsedData.push(content);
              this.writeToFile(file, parsedData);
            }
          });
    }
}

module.exports = FileHandler;