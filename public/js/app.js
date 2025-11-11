// Client-side JS que consome a API REST em /tarefas
// Campos esperados no objeto tarefa retornado pela API:
// { id, nome, descricao, data_criacao, data_conclusao, status }
const apiBase = '/tarefas';

// Helper para criar elementos DOM
function createElem(tag, text, cls) {
  const el = document.createElement(tag);
  if (text !== undefined) el.textContent = text;
  if (cls) el.className = cls;
  return el;
}

// LISTAR: faz GET /tarefas
// Espera array de tarefas; cada tarefa deve conter os campos acima.
async function listar() {
  const res = await fetch(apiBase);
  const tarefas = await res.json();
  const ul = document.getElementById('lista');
  ul.innerHTML = '';
  tarefas.forEach(t => {
    const li = document.createElement('li');
    li.dataset.id = t.id;

    // Exibe nome, descrição e metadados (datas)
    const info = createElem('div');
    const nome = createElem('strong', t.nome || '');
    const desc = createElem('div', t.descricao || '');
    // data_criacao/data_conclusao vêm do banco (formatadas como ISO ou date)
    const meta = createElem('small', `Criado: ${t.data_criacao || '-'} ${t.data_conclusao ? ' | Concluído: ' + t.data_conclusao : ''}`);

    info.appendChild(nome);
    info.appendChild(desc);
    info.appendChild(meta);

    // Select para alterar o status -> faz PUT /tarefas/:id com { status }
    const sel = document.createElement('select');
    ['pendente', 'em andamento', 'concluida'].forEach(s => {
      const o = document.createElement('option'); o.value = s; o.textContent = s; if (t.status === s) o.selected = true; sel.appendChild(o);
    });
    sel.addEventListener('change', async () => {
      // Atualiza status da tarefa no backend
      await fetch(`${apiBase}/${t.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: sel.value })
      });
      listar();
    });

    // Botão editar -> abre prompts e envia PUT com nome/descricao
    const btnEditar = createElem('button', 'Editar');
    btnEditar.addEventListener('click', () => editar(t));

    // Botão excluir -> DELETE /tarefas/:id
    const btnExcluir = createElem('button', 'Excluir');
    btnExcluir.addEventListener('click', async () => {
      if (!confirm('Excluir esta tarefa?')) return;
      await fetch(`${apiBase}/${t.id}`, { method: 'DELETE' });
      listar();
    });

    li.appendChild(info);
    li.appendChild(sel);
    li.appendChild(btnEditar);
    li.appendChild(btnExcluir);
    ul.appendChild(li);
  });
}

// EDITAR: envia PUT com { nome, descricao }
function editar(tarefa) {
  const nome = prompt('Editar nome', tarefa.nome || '');
  if (nome === null) return;
  const descricao = prompt('Editar descrição', tarefa.descricao || '');
  if (descricao === null) return;
  fetch(`${apiBase}/${tarefa.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome, descricao })
  }).then(() => listar());
}

// FORMULÁRIO: cria nova tarefa via POST /tarefas
document.getElementById('form-adicionar').addEventListener('submit', async (e) => {
  e.preventDefault();
  const nomeEl = document.getElementById('nome');
  const descricaoEl = document.getElementById('descricao');
  const nome = nomeEl.value.trim();
  const descricao = descricaoEl.value.trim();
  // Backend exige 'nome' não-nulo
  if (!nome) return alert('Preencha o nome da tarefa (obrigatório)');
  await fetch(apiBase, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome: nome || undefined, descricao: descricao || undefined })
  });
  nomeEl.value = '';
  descricaoEl.value = '';
  listar();
});

// Inicializa a listagem ao carregar a página
listar();
