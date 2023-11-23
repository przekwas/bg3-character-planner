const fs = require('fs');
const path = require('path');

const DATA_PATH = path.join(__dirname, './data/character.json');

function readData() {
	return new Promise((resolve, reject) => {
		fs.readFile(DATA_PATH, (err, data) => {
			if (err) {
				reject(err);
				return;
			}

			try {
				const parsed = JSON.parse(data);
				resolve(parsed);
			} catch (parseError) {
				reject(parseError);
			}
		});
	});
}

module.exports = {
    readData
}
