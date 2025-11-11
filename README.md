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
3. Mude para dentro da pasta criada `api-crud-js`:
```
cd api-crud-js
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

