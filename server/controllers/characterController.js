const characterService = require('../services/characterService');

const getCharacter = async (req, res, next) => {
	try {
		await characterService.checkDataFile();
		const characterData = await characterService.readData();

		const characterDataModified = {
			...characterData,
			classes: characterData.classes.map(progression => ({
				...progression,
				class: progression.class[0].toUpperCase() + progression.class.slice(1)
			}))
		};

		res.json(characterDataModified);
	} catch (error) {
		next(error);
	}
};

const levelUpCharacter = async (req, res, next) => {
	try {
		const selectedClass = req.body.selectedClass;

		if (!selectedClass) {
			return res.status(400).json({ message: 'Level up failed', error: 'Invalid input' });
		}

		const characterData = await characterService.readData();

		if (characterData.totalLevels >= 12) {
			return res
				.status(400)
				.json({ message: 'Level up failed', error: 'Level limit reached' });
		}

		characterData.totalLevels += 1;

		characterData.classes.push({
			level: characterData.totalLevels,
			class: selectedClass
		});

		await characterService.writeData(characterData);

		res.json({ message: 'Level up successful' });
	} catch (error) {
		next(error);
	}
};

const levelDownCharacter = async (req, res, next) => {
    try {
		const characterData = await characterService.readData();

		if (characterData.totalLevels <= 0) {
			return res
				.status(400)
				.json({ message: 'Level down failed', error: 'Level minimum reached' });
		}

		characterData.totalLevels -= 1;
		characterData.classes.pop();

		await characterService.writeData(characterData);

		res.json({ message: 'Level down successful' });
	} catch (error) {
		next(error);
	}
}

module.exports = {
	getCharacter,
    levelUpCharacter,
    levelDownCharacter
};
