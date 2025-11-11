const apiBase = '/tarefas';

function createElem(tag, text, cls) {
  const el = document.createElement(tag);
  if (text !== undefined) el.textContent = text;
  if (cls) el.className = cls;
  return el;
}

async function listar() {
  const res = await fetch(apiBase);
  const tarefas = await res.json();
  const ul = document.getElementById('lista');
  ul.innerHTML = '';
  tarefas.forEach(t => {
    const li = document.createElement('li');
    li.dataset.id = t.id;

    const info = createElem('div');
    const nome = createElem('strong', t.nome || '');
    const desc = createElem('div', t.descricao || '');
    const meta = createElem('small', `Criado: ${t.data_criacao || '-'} ${t.data_conclusao ? ' | Concluído: ' + t.data_conclusao : ''}`);

    info.appendChild(nome);
    info.appendChild(desc);
    info.appendChild(meta);

    const sel = document.createElement('select');
    ['pendente', 'em andamento', 'concluida'].forEach(s => {
      const o = document.createElement('option'); o.value = s; o.textContent = s; if (t.status === s) o.selected = true; sel.appendChild(o);
    });
    sel.addEventListener('change', async () => {
      await fetch(`${apiBase}/${t.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: sel.value })
      });
      listar();
    });

    const btnEditar = createElem('button', 'Editar');
    btnEditar.addEventListener('click', () => editar(t));

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

document.getElementById('form-adicionar').addEventListener('submit', async (e) => {
  e.preventDefault();
  const nomeEl = document.getElementById('nome');
  const descricaoEl = document.getElementById('descricao');
  const nome = nomeEl.value.trim();
  const descricao = descricaoEl.value.trim();
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

// Inicializa
listar();
