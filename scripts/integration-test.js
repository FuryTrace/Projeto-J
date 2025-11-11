const { startServer } = require('../src/server');
const http = require('http');

function request(options, body) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          const parsed = data ? JSON.parse(data) : null;
          resolve({ status: res.statusCode, body: parsed });
        } catch (e) {
          resolve({ status: res.statusCode, body: data });
        }
      });
    });
    req.on('error', reject);
    if (body) {
      req.setHeader('Content-Type', 'application/json');
      req.write(JSON.stringify(body));
    }
    req.end();
  });
}

(async () => {
  const server = startServer(0); // porta 0 => sistema escolhe porta livre
  await new Promise((r) => server.once('listening', r));
  const port = server.address().port;
  const base = { hostname: '127.0.0.1', port, path: '/', method: 'GET' };

  console.log('Servidor de teste rodando na porta', port);

  // 1 - listar todas as tarefas (GET /tarefas)
  // espera array de objetos: { id, nome, descricao, data_criacao, data_conclusao, status }
  const list1 = await request({ hostname: '127.0.0.1', port, path: '/tarefas', method: 'GET' });
  console.log('\n[GET] /tarefas ->', list1.status, JSON.stringify(list1.body));

  // 2 - criar (POST /tarefas)
  // envia { nome: string, descricao?: string } e espera { id, mensagem }
  const create = await request({ hostname: '127.0.0.1', port, path: '/tarefas', method: 'POST' }, { nome: 'Teste', descricao: 'Tarefa de integração' });
  console.log('\n[POST] /tarefas ->', create.status, JSON.stringify(create.body));
  const id = create.body && create.body.id;

  // 3 - listar depois de criar
  const list2 = await request({ hostname: '127.0.0.1', port, path: '/tarefas', method: 'GET' });
  console.log('\n[GET] /tarefas (depois) ->', list2.status, JSON.stringify(list2.body));

  if (id) {
    // 4 - atualizar (PUT /tarefas/:id)
    // envia { status: 'concluida' } e espera mensagem de sucesso
  const upd = await request({ hostname: '127.0.0.1', port, path: `/tarefas/${id}`, method: 'PUT' }, { status: 'concluida' });
    console.log(`\n[PUT] /tarefas/${id} ->`, upd.status, JSON.stringify(upd.body));

    // 5 - obter
    const getOne = await request({ hostname: '127.0.0.1', port, path: `/tarefas/${id}`, method: 'GET' });
    console.log(`\n[GET] /tarefas/${id} ->`, getOne.status, JSON.stringify(getOne.body));

    // 6 - excluir
    const del = await request({ hostname: '127.0.0.1', port, path: `/tarefas/${id}`, method: 'DELETE' });
    console.log(`\n[DELETE] /tarefas/${id} ->`, del.status, JSON.stringify(del.body));
  } else {
    console.log('\nID não retornado no POST — não será feito PUT/DELETE');
  }

  // final list
  const listFinal = await request({ hostname: '127.0.0.1', port, path: '/tarefas', method: 'GET' });
  console.log('\n[GET] /tarefas (final) ->', listFinal.status, JSON.stringify(listFinal.body));

  server.close();
  process.exit(0);
})();
