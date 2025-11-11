require('dotenv').config();
const express = require('express');
const path = require('path');

function createApp() {
	const app = express();
	// Servir arquivos estáticos da pasta public
	app.use(express.static(path.join(__dirname, '..', 'public')));
	app.use(express.json());

	const tarefasRoutes = require('./routes/tarefas');
	app.use('/tarefas', tarefasRoutes);

	app.get('/', (req, res) => {
		res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
	});

	return app;
}

function startServer(port = process.env.PORT || 3000) {
	const app = createApp();
	const server = app.listen(port, () => {
		console.log(`Servidor rodando na porta ${port}`);
	});
	return server;
}

// If run directly, start the server. Otherwise allow programmatic use in tests.
if (require.main === module) {
	startServer();
}

module.exports = { createApp, startServer };
