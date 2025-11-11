# API REST para implementar CRUD de tabela tarefas no MySQL (Backend) e Formulário para acessá-la (Frontend)
  
## 1. Pré-requisitos:
1. Ter o **node** instalado. Para fazer o download acesse https://nodejs.org/pt/download . Prefira o download de uma versão LTS.
2. Ter um banco **MySQL** instalado . Para fazer o download acesse https://dev.mysql.com/downloads/. Pode usar também o **MariaDB** que é instalado com o XAMPP, disponível em https://www.apachefriends.org/pt_br/index.html. 
  
Para executar este código siga os seguintes passos:  
## 2. Baixar o código e script para criar a base de dados
1. Abra um shell (cmd ou git bash ou PowerShell - este último pode ter restrições para executar o `npm`)
2. Clone o código deste repositório (pode ser dentro de qualquer pasta em seu computador na qual tenha permissão de escrita):
```
git clone https://github.com/FuryTrace/Projeto-J.git 
```
3. Mude para dentro da pasta criada `Projeto-J`:
```
cd Projeto-J
```
4. Nessa pasta digite o comando abaixo (vai instalar os pacotes listados nas dependências):
```
npm install
```
5. Crie uma cópia do arquivo `.env-modelo` com o nome `.env` (observe que o ponto `.` faz parte do nome do arquivo).  
6. Edite o conteúdo do arquivo `.env` para que fique com os valores adequados ao seu ambiente. 
```
# conexão com banco de dados
# Endereço do host (computador) onde o MySQL está rodando
DB_HOST=localhost
# porta que o MySQL está usando. Na Faculdade Senac pode ser 3307 - verifique na configuração de conexão do Workbench ou painel de controle do XAMPP
DB_PORT=3306
# usuário para acesso ao banco de dados
DB_USER=root
# senha do usuário para acesso ao banco de dados
DB_PASSWORD=sua_senha
# database ou schema (no MySQL são sinônimos)
DB_NAME=lista_tarefa
# porta utilizada pelo Express para subir um servidor web simples
PORT=3000
```


  
## 3. Criar a base de dados  

Podemos criar a base de dados de exemplo de duas formas (escolha apenas uma das maneiras):  
  
### A. Usando migrations do knex  
1. Crie o schema `lista_tarefa` (no MySQL database e schema são sinônimos).
   a. Acesse o **MySQL** ou **MariaDB**, e execute o comando:
   ```
   CREATE DATABASE IF NOT EXISTS lista_tarefa;
   ```
   Clique [aqui](docs/phpmyadmin-create-database.md) para ver como fazer no **PHPMyAdmin** ou clique [aqui](docs/workbench-create-database.md) para ver como fazer no **MySQL Workbench**.  
     
2. Depois, em um shell (terminal) digite:
```
npx knex migrate:latest --knexfile knexfile.js
```
irá criar a tabela `lista_tarefa`  


3. Depois, digite:
```
npx knex seed:run --knexfile knexfile.js
```
irá inserir 3 linhas de exemplo.  


### B. Importar o arquivo com a definição do schema lista_tarefa e tabela tarefas.
1. No MySQL, execute os comandos que estão no arquivo `database-lista_tarefa.sql` que está na pasta `banco-de-dados`. Nesse arquivo estão incluídos os comandos para criar o database `lista_tarefa`, a tabela `tarefas` e inserir quatro linhas de exemplo.  
   Clique [aqui](docs/phpmyadmin-usando-script.md) para ver como fazer no **PHPMyAdmin** ou clique [aqui](docs/workbench-usando-script.md) para ver como fazer no **MySQL Workbench**.    
   

Para ambos casos, caso deseje ver as linhas inseridas com os nomes em ordem alfabética, digite:  
```
select * from tarefas order by nome;
```  

## 4. Iniciando a aplicação
  
Para iniciar a aplicação digite:
```
npm run dev
```

Deve aparecer a mensagem: 
```
> api-crud@1.0.0 dev
> nodemon src/server.js

[nodemon] 3.1.10
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,cjs,json
[nodemon] starting `node src/server.js`
Servidor rodando na porta 3000
```
> nodemon serve para que a aplicação seja recarregada automaticamente caso algum arquivo seja editado e salvo. Caso contrário seria necessário parar a aplicação (CTRL-C) e iniciá-la novamente depois de salvar as alterações.

Para acessar o frontend da aplicação, abra o navegador e digite:
http://localhost:3000/

## Como ligar o servidor (passo a passo)

Se você tentou `npm run dev` e recebeu erro, normalmente é porque não existe um script `dev` definido em `package.json` neste projeto. As instruções abaixo mostram a forma que funcionou aqui e algumas opções para desenvolvimento com reload automático.

1) Abra o PowerShell na pasta do projeto:

```powershell
cd "c:\Users\William Cesar\Desktop\Senac\1. Materias\3 Linguagem de Programação para Web I\Projeto\Projeto-J"
```

2) Instale dependências (apenas a primeira vez):

```powershell
npm install
```

3) Crie o arquivo de variáveis de ambiente a partir do modelo e edite-o (obrigatório):

```powershell
copy .env-modelo .env
# abra o .env numa IDE ou com notepad e ajuste DB_HOST, DB_PORT, DB_USER, DB_PASSWORD e DB_NAME
```

Observação: remova espaços acidentais no final de valores (por exemplo em `DB_PASSWORD`) — espaços extras causam falha na conexão.

4) Crie o database (se ainda não existir). Exemplo usando o cliente MySQL (substitua usuário/senha se necessário):

```powershell
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS lista_tarefa;"
```

Ou crie pelo MySQL Workbench / phpMyAdmin se preferir interface gráfica.

5) Rode as migrations para criar as tabelas (opcional se você importar o .sql):

```powershell
npx knex migrate:latest --knexfile knexfile.js
```

6) Rode os seeds para popular com exemplos:

```powershell
npx knex seed:run --knexfile knexfile.js
```

7) Inicie o servidor (modo normal):

```powershell
npm start
```

Isso executa `node src/server.js` (script `start` já configurado no `package.json`). O servidor deve abrir em `http://localhost:3000` por padrão.

8) Iniciar em modo desenvolvimento com reload automático (opcional):

Se quiser recarregar automaticamente ao editar arquivos, instale `nodemon` como dependência de desenvolvimento e use `npx nodemon` ou adicione um script `dev`:

```powershell
npm install --save-dev nodemon
# iniciar com npx (sem alterar package.json):
npx nodemon src/server.js

# ou adicione no package.json um script "dev": "nodemon src/server.js" e então rodar:
npm run dev
```

9) Testes rápidos (opcional)

Existe um script de integração que sobe o servidor temporariamente numa porta livre, testa o fluxo CRUD e encerra:

```powershell
node scripts/integration-test.js
```

Se o comando acima falhar, verifique:
- O MySQL está rodando (verifique painel XAMPP / Serviços do Windows / Workbench).
- As variáveis em `.env` (host, porta, usuário, senha, database) estão corretas.
- A porta 3000 não está sendo usada por outro processo (no Windows: `netstat -ano | findstr :3000`).

Se você quiser que eu adicione um script `dev` diretamente ao `package.json` e instale `nodemon` automaticamente, posso fazer isso agora.

## Observações sobre o schema de `tarefas`

A tabela `tarefas` utilizada por esta aplicação contém os seguintes campos principais:

- `id` (PK)
- `nome` (texto) — obrigatório
- `descricao` (texto)
- `data_criacao` (date/datetime) — preenchido automaticamente ao criar a tarefa
- `data_conclusao` (date/datetime) — preenchido automaticamente quando `status` é `concluida`
- `status` (texto) — valores: `pendente`, `em andamento`, `concluida`

O frontend exige que o campo `nome` seja preenchido ao criar uma nova tarefa. Mudar o `status` para `concluida` registra a data de conclusão automaticamente.

Se o seu banco já possui uma tabela `tarefas` com outro esquema, revise os nomes e tipos das colunas antes de rodar as migrations/seeds inclusas.

