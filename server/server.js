const express = require('express');
const characterService = require('./characterService');

const app = express();

// middlewares
app.use((req, res, next) => {
	console.log(req.originalUrl);
	next();
});
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// GET http://localhost:3000/character
app.get('/character', async (req, res) => {
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
		res.status(500).json({ error: 'Oops my code sucks', message: error.message });
	}
});

// POST http://localhost:3000/levelup
// body urlencoded { selectedClass: string }
app.post('/levelup', async (req, res) => {
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
		res.status(500).json({ error: 'Oops my code sucks', message: error.message });
	}
});

// DELETE http://localhost:3000/leveldown
app.delete('/leveldown', async (req, res) => {
	try {
		const characterData = await characterService.readData();

		if (characterData.totalLevels <= 0) {
			return res
				.status(400)
				.json({ message: 'Level down failed', error: 'Level bottom reached' });
		}

		characterData.totalLevels -= 1;
		characterData.classes.pop();
		await characterService.writeData(characterData);

		res.json({ message: 'Level down successful' });
	} catch (error) {
		res.status(500).json({ error: 'Error while leveling down', message: error.message });
	}
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
