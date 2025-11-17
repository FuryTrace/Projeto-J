// Client-side JS que consome a API REST em /tarefas
const apiBase = '/tarefas';

// Wrapper para fetch que padroniza header JSON e tratamento de erro.
// Uso: await apiFetch(path, { method: 'POST', body: { nome: 'x' } })
// Retorna o corpo JSON (quando houver) ou o Response quando não houver JSON.
async function apiFetch(path, options = {}) {
  const opts = Object.assign({}, options);
  // Se o body for um objeto, converte para JSON e seta header
  if (opts.body && typeof opts.body === 'object') {
    opts.body = JSON.stringify(opts.body);
    opts.headers = Object.assign({ 'Content-Type': 'application/json' }, opts.headers || {});
  }
  const res = await fetch(path, opts);
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    const err = new Error(`HTTP ${res.status} ${res.statusText}` + (text ? ` - ${text}` : ''));
    err.response = res;
    throw err;
  }
  const contentType = res.headers.get('content-type') || '';
  if (contentType.includes('application/json')) return res.json();
  return res;
}

// Helper centralizado para mostrar erros ao usuário e logar no console.
function showError(message, err) {
  console.error(err);
  alert(message);
}

// Helper para criar elementos DOM
function createElem(tag, text, cls) {
  const el = document.createElement(tag);
  if (text !== undefined) el.textContent = text;
  if (cls) el.className = cls;
  return el;
}

// formata ISO date para "DD/MM/AAAA" (remove a parte do horário)
// Recebe uma string ISO ou um objeto Date. Se o valor for inválido retorna '-' ou a string original.
function formatDateTime(iso) {
  if (!iso) return '-';
  const d = (iso instanceof Date) ? iso : new Date(iso);
  if (Number.isNaN(d.getTime())) return iso; // retorna original se não for uma data válida
  const pad = (n) => String(n).padStart(2, '0');
  const day = pad(d.getDate());
  const month = pad(d.getMonth() + 1);
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}

// LISTAR: faz GET /tarefas
async function listar() {
  try {
  const tarefas = await apiFetch(apiBase);
    const ul = document.getElementById('lista');
    ul.innerHTML = '';
    tarefas.forEach(t => {
      const li = document.createElement('li');
      li.dataset.id = t.id;

      // Exibe nome, descrição e metadados (datas)
    const info = createElem('div', null, 'info');
    const nome = createElem('strong', t.nome || '');
    const desc = createElem('div', t.descricao || '', 'descricao');
      // data_criacao/data_conclusao vêm do banco
      const criadoText = formatDateTime(t.data_criacao);
      const concluidoText = t.data_conclusao ? formatDateTime(t.data_conclusao) : null;

      // Renderiza a data de criação (apenas DD/MM/AAAA). Somente mostra data_conclusao quando status === 'concluida'.
      const meta = createElem('div', null, 'meta');
      const criadoDateEl = createElem('small', `Criado: ${criadoText}`, 'meta-date');
      meta.appendChild(criadoDateEl);

      if (t.status === 'concluida' && concluidoText) {
        const sep = createElem('small', ' | ', 'meta-sep');
        const concluidoEl = createElem('small', `Concluído: ${concluidoText}`, 'meta-concluded');
        meta.appendChild(sep);
        meta.appendChild(concluidoEl);
      }

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
        try {
          await apiFetch(`${apiBase}/${t.id}`, { method: 'PUT', body: { status: sel.value } });
          listar();
        } catch (err) {
          showError('Erro ao atualizar status da tarefa', err);
        }
      });

      // Botão editar -> abre prompts e envia PUT com nome/descricao
      const btnEditar = createElem('button', 'Editar');
      btnEditar.addEventListener('click', () => editar(t));

      // Botão excluir -> DELETE /tarefas/:id
      const btnExcluir = createElem('button', 'Excluir');
      btnExcluir.addEventListener('click', async () => {
        if (!confirm('Excluir esta tarefa?')) return;
        try {
          await apiFetch(`${apiBase}/${t.id}`, { method: 'DELETE' });
          listar();
        } catch (err) {
          showError('Erro ao excluir tarefa', err);
        }
      });

      // Agrupamos os controles de ação num container à direita
      const actions = createElem('div', null, 'actions');
      actions.appendChild(sel);
      actions.appendChild(btnEditar);
      actions.appendChild(btnExcluir);

      li.appendChild(info);
      li.appendChild(actions);
      ul.appendChild(li);
    });
  } catch (err) {
    showError('Erro ao carregar tarefas', err);
  }
}

// EDITAR: envia PUT com { nome, descricao }
function editar(tarefa) {
  const nome = prompt('Editar nome', tarefa.nome || '');
  if (nome === null) return;
  const descricao = prompt('Editar descrição', tarefa.descricao || '');
  if (descricao === null) return;
    (async () => {
      try {
        await apiFetch(`${apiBase}/${tarefa.id}`, { method: 'PUT', body: { nome, descricao } });
        listar();
      } catch (err) {
        showError('Erro ao editar tarefa', err);
      }
    })();
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
  try {
    await apiFetch(apiBase, { method: 'POST', body: { nome: nome || undefined, descricao: descricao || undefined } });
    nomeEl.value = '';
    descricaoEl.value = '';
    listar();
  } catch (err) {
    showError('Erro ao criar tarefa', err);
  }
});

// Inicializa a listagem ao carregar a página
listar();
