# Projeto: Lista de Tarefas (backend Node + frontend estático)

Resumo rápido
Este projeto fornece uma API REST (Node/Express/Knex/MySQL) para gerenciar uma tabela `tarefas` e um frontend simples em `public/` que consome a API.

Requisitos mínimos
- Node.js (recomendo LTS)
- MySQL ou MariaDB

Passos essenciais para rodar (PowerShell)
1) Abra o terminal na pasta do projeto:

```powershell
cd Projeto-J
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

- No MySQL execute o script "database-lista_tarefa.sql"

5) Inicie o servidor:

```powershell
npm start
```
ou
```powershell
npm run dev
```

Abra no navegador: http://localhost:3000

Teste rápido
- Para executar um teste end-to-end automático:

```powershell
node scripts/integration-test.js
```

Notas rápidas / solução de problemas
- Verifique se o MySQL está rodando.
- Remova espaços extras em valores do `.env` (ex.: `DB_PASSWORD`).
- Se a porta 3000 estiver em uso, altere `PORT` no `.env`.

- Feito pelo aluno: William César da Silva Rodrigues