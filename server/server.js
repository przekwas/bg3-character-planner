const express = require('express');
const characterService = require('./characterService');

const app = express();

// middlewares
app.use((req, res, next) => {
	console.log(req.originalUrl);
	next();
});
app.use(express.static('public'));

// GET http://localhost:3000/character
app.get('/character', async (req, res) => {
	try {
		const characterData = await characterService.readData();
		res.json(characterData);
	} catch (error) {
		res.status(500).json({ error: 'Oops my code sucks', message: error.message });
	}
});

// POST http://localhost:3000/levelup
app.post('/levelup', (req, res) => {
	res.send('Level up');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
