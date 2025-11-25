**Projeto: CadastroDeBoi (diretório: `Projeto-J`)**

**Visão rápida**
Instruções para configurar e executar o projeto localmente (Node + Express + Knex + MySQL).

**Pré-requisitos**
- Node.js (recomendo LTS)
- MySQL ou MariaDB

**1) Configurar variáveis de ambiente**
- Foi incluído um arquivo ` .env-modelo` no repositório. Crie uma cópia chamada `.env` e ajuste os valores conforme seu ambiente.
- Variáveis esperadas:
	- `DB_HOST` (ex.: `127.0.0.1`)
	- `DB_PORT` (ex.: `3306`)
	- `DB_USER` (ex.: `root`)
	- `DB_PASSWORD` (ex.: senha do MySQL)
	- `DB_NAME` (ex.: `boizinho`)
	- `PORT` (opcional, ex.: `3000`)

**2) Instalar dependências (PowerShell)**
```powershell
cd "Projeto-J"
npm install
```

**3) Criar banco de dados e tabelas**
- O script SQL está em `banco-de-dados/boizinho.sql`.
- Exemplo usando cliente MySQL (execute no PowerShell):
```powershell
mysql -u root -p < "banco-de-dados/boizinho.sql"
```
- Isso criará o schema `boizinho` e a tabela `animais` com alguns registros de exemplo.

**4) Rodar o servidor**
- Em desenvolvimento (recomendado):
```powershell
npm run dev
```

- Em produção:
```powershell
npm run start
```

**Observações importantes**
- O frontend está dentro da pasta `public` e o servidor serve os arquivos estáticos. A interface consome a API em `/api/tarefas`.

---

Feito por: William Cesar da Silva Rodrigues
