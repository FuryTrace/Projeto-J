// Carrega variáveis de ambiente de .env
require('dotenv').config();
const express = require('express');
const path = require('path');

// Cria o app Express com middleware e rotas
function createApp() {
	const app = express();
	// Servir arquivos estáticos (frontend) da pasta public
	app.use(express.static(path.join(__dirname, '..', 'public')));

	// Middleware para parse JSON em requisições
	app.use(express.json());

	// Rotas API para /tarefas (src/routes/tarefas.js)
	// Essas rotas delegam a lógica para src/controllers/tarefasController.js
	const tarefasRoutes = require('./routes/tarefas');
	app.use('/tarefas', tarefasRoutes);

	// Rota raiz que envia o index.html

	return app;
}

// Inicia o servidor na porta informada em .env (PORT) ou 3000
function startServer(port = process.env.PORT || 3000) {
	const app = createApp();
	const server = app.listen(port, () => {
		console.log(`Servidor rodando na porta ${port}`);
	});
	return server;
}

// Se o arquivo for executado diretamente (node src/server.js), inicia o servidor.
if (require.main === module) {
	startServer();
}

module.exports = { createApp, startServer };
