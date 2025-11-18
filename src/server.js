/**
 * Entry point do servidor Express para o projeto "CadastroDeBoi".
 * - Configura middlewares básicos (JSON, urlencoded)
 * - Monta rotas da API em `/api/tarefas`
 * - Serve o frontend estático em `/public`
 * - Expõe um health-check em `/health`
 *
 * Executar em desenvolvimento: `npm run dev` (nodemon)
 */
const path = require('path');
require('dotenv').config();
const express = require('express');

const app = express();

// Middlewares para parse do body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas da API (CRUD para a entidade 'animais')
const cadastroRouter = require('./routes/cadastro');
app.use('/api/tarefas', cadastroRouter);

// Servir arquivos estáticos (frontend simples dentro de /public)
app.use(express.static(path.join(__dirname, '..', 'public')));

// Endpoint simples para verificar se o servidor está vivo
app.get('/health', (req, res) => res.json({ status: 'ok' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Servidor iniciado na porta ${PORT}`);
});

// Exporta a instância do app para permitir testes ou uso externo
module.exports = app;
