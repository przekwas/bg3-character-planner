const express = require('express');
const characterRoutes = require('./routes/characterRoutes');
const logMiddleware = require('./middlewares/logMiddleware');
const errorHandlingMiddleware = require('./middlewares/errorHandlingMiddleware');

const app = express();

// middlewares
app.use(logMiddleware);
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// character routes
app.use(characterRoutes);

// error handling middleware
app.use(errorHandlingMiddleware);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
