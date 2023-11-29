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

// GET http://localhost:3000/character
app.get('/character', async (req, res) => {
	try {
		await characterService.checkDataFile();
		const characterData = await characterService.readData();
		res.json(characterData);
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
			return res
				.status(400)
				.json({ message: 'Level up failed', error: 'Invalid input' });
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
