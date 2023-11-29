const fs = require('fs');
const path = require('path');

const DATA_PATH = path.join(__dirname, './data/character.json');

const INITIAL_DATA = {
	totalLevels: 0,
	classes: []
};

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

function writeData(data) {
	return new Promise((resolve, reject) => {
		fs.writeFile(DATA_PATH, JSON.stringify(data, null, 2), err => {
			if (err) {
				reject(err);
				return;
			}

			resolve('Write file successful');
		});
	});
}

function checkDataFile() {
	return new Promise((resolve, reject) => {
		fs.access(DATA_PATH, fs.constants.F_OK, err => {
			if (err) {
				writeData(INITIAL_DATA)
					.then(() => resolve('Data file created'))
					.catch(reject);
			} else {
				fs.readFile(DATA_PATH, (readErr, data) => {
					if (readErr) {
						reject(readErr);
						return;
					}

					if (data.length === 0) {
						writeData(INITIAL_DATA)
							.then(() => resolve('Data file created'))
							.catch(reject);
					} else {
						resolve('Data file is valid');
					}
				});
			}
		});
	});
}

module.exports = {
	readData,
	writeData,
	checkDataFile
};
