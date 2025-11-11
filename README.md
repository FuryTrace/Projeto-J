# Projeto: Lista de Tarefas (backend Node + frontend estático)

Resumo rápido
Este projeto fornece uma API REST (Node/Express/Knex/MySQL) para gerenciar uma tabela `tarefas` e um frontend simples em `public/` que consome a API.

Requisitos mínimos
- Node.js (recomendo LTS)
- MySQL ou MariaDB

Passos essenciais para rodar (PowerShell)
1) Abra o terminal na pasta do projeto:

```powershell
cd "c:\Users\William Cesar\Desktop\Senac\1. Materias\3 Linguagem de Programação para Web I\Projeto\Projeto-J"
```

2) Instale dependências:

```powershell
npm install
```

3) Crie o arquivo de ambiente e edite com suas credenciais:

```powershell
copy .env-modelo .env
# Edite .env (DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME)
```

4) Crie o database (se necessário):

```powershell
mysql -u <usuario> -p -e "CREATE DATABASE IF NOT EXISTS lista_tarefa;"
```

5) Rode migrations e seeds (cria tabelas e insere exemplos):

```powershell
npx knex migrate:latest --knexfile knexfile.js
npx knex seed:run --knexfile knexfile.js
```

6) Inicie o servidor:

```powershell
npm start
```

Abra no navegador: http://localhost:3000

Modo desenvolvimento (reload automático)
- Já existe um script `dev` no `package.json` usando `nodemon`. Para iniciar com reload automático:

```powershell
npm run dev
```

Teste rápido (opcional)
- Para executar um teste end-to-end automático:

```powershell
node scripts/integration-test.js
```

Notas rápidas / solução de problemas
- Verifique se o MySQL está rodando.
- Remova espaços extras em valores do `.env` (ex.: `DB_PASSWORD`).
- Se a porta 3000 estiver em uso, altere `PORT` no `.env`.

Schema principal usado pela aplicação
- `id` (PK)
- `nome` (texto) — obrigatório
- `descricao` (texto)
- `data_criacao` (date/datetime)
- `data_conclusao` (date/datetime)
- `status` (texto) — `pendente`, `em andamento`, `concluida`

Se quiser que eu simplifique ainda mais este README ou adicione instruções para deploy/GitHub, diga qual formato prefere.

