
**Projeto: CadastroDeBoi (diretório: `Projeto-J`)**

**Visão rápida**
Instruções para configurar e executar o projeto localmente (Node + Express + Knex + MySQL).

**Pré-requisitos**
- Node.js (recomendo LTS)
- MySQL ou MariaDB

**1) Ajustar variáveis de ambiente**
- Abra o arquivo `Projeto-J\.env` e verifique as variáveis: `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `PORT`.
- Remova espaços acidentais (ex.: espaço no final da senha).

**2) Instalar dependências (PowerShell)**
```powershell
cd Projeto-J
npm install
```

**3) Criar banco de dados e tabelas**
- O script SQL está em `Projeto-J\banco-de-dados\boizinho.sql`.
- Exemplo usando cliente MySQL (execute no PowerShell):
```powershell
mysql -u <usuario> -p < Projeto-J\banco-de-dados\boizinho.sql
```
- Isso criará o schema `boizinho` e a tabela `animais`.
- Ou use o MySQL Workbench ou outro cliente para rodar o script.

**4) Rodar o servidor**
- Em produção:
```powershell
npm run start
```
- Em desenvolvimento (com reinício automático):
# Projeto: CadastroDeBoi (Projeto-J) — Resumo

Breve: API Node (Express + Knex) com frontend estático para gerenciar a tabela `animais`.

Rápido (setup mínimo)
- Crie/copien `.env` e configure: `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `PORT`.
- Instale dependências:
```powershell
cd Projeto-J
npm install
```
- Crie o DB (script):
```powershell
mysql -u <usuario> -p < banco-de-dados\boizinho.sql
```
- Inicie o servidor:
```powershell
npm run dev    # desenvolvimento
npm run start  # produção
```

---

Feito por: William Cesar da Silva Rodrigues
