/**
 * Script do frontend para interação com a API `/api/tarefas`.
 * Fornece funções para buscar, renderizar, criar, atualizar e excluir registros.
 */

// Busca lista de animais na API e renderiza a tabela
async function fetchAnimais() {
    try {
        const res = await fetch('/api/tarefas');
        if (!res.ok) throw new Error('Falha ao buscar animais');
        const rows = await res.json();
        renderTable(rows);
    } catch (err) {
        console.error(err);
    }
}

function renderTable(rows) {
    const table = document.getElementById('myTable');
    // Remove todas as linhas exceto o cabeçalho (id="0")
    while (table.rows.length > 1) table.deleteRow(1);

    rows.forEach((r, index) => {
        const row = table.insertRow(-1);
        row.dataset.id = r.id;
        row.insertCell(0).innerText = r.codigo_lacre ?? '';
        row.insertCell(1).innerText = r.nome_animal ?? '';
        row.insertCell(2).innerText = r.codigo_registro ?? '';
        row.insertCell(3).innerText = r.codigo_registro_pai ?? '';
        row.insertCell(4).innerText = r.codigo_registro_mae ?? '';
        row.insertCell(5).innerText = formatPesoDisplay(r.peso_inicial) ?? '';
        row.insertCell(6).innerText = formatDateToDDMMYYYY(r.data_nascimento) ?? '';

        const actionsCell = row.insertCell(7);
        // Botão Editar
        const editBtn = document.createElement('button');
        editBtn.innerText = 'Editar';
        editBtn.style.marginRight = '6px';
        editBtn.addEventListener('click', () => startEdit(r));
        actionsCell.appendChild(editBtn);

        // Botão Excluir
        const delBtn = document.createElement('button');
        delBtn.innerText = 'Excluir';
        delBtn.addEventListener('click', () => deleteRecord(r.id));
        actionsCell.appendChild(delBtn);
    });
}

function formatDateToDDMMYYYY(value) {
    if (!value) return '';
    // value pode ser string ISO, objeto Date ou YYYY-MM-DD
    let d;
    if (value instanceof Date) d = value;
    else d = new Date(value);
    if (Number.isNaN(d.getTime())) {
        // tentar analisar YYYY-MM-DD
        const parts = String(value).split('-');
        if (parts.length >= 3) return `${parts[2].slice(0,2)}/${parts[1]}/${parts[0]}`;
        return '';
    }
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
}

function formatPesoDisplay(value) {
    if (value === null || value === undefined || value === '') return '';
    const num = Number(value);
    if (Number.isNaN(num)) return String(value);
    // formata com duas casas e vírgula como separador decimal
    return num.toFixed(2).replace('.', ',');
}

// Máscara para o input de peso: permite apenas dígitos e uma vírgula, até 2 decimais
function applyPesoMask(e) {
    const input = e.target;
    let v = input.value;
    if (v === '') return;

    // substituir ponto por vírgula (usuário pode digitar '.')
    v = v.replace(/\./g, ',');

    // remover caracteres que não são dígito ou vírgula
    v = v.replace(/[^0-9,]/g, '');

    // permitir apenas a primeira vírgula
    const parts = v.split(',');
    if (parts.length > 1) {
        const intPart = parts.shift();
        let decPart = parts.join(''); // juntar possíveis vírgulas remanescentes
        decPart = decPart.slice(0, 2); // limitar a 2 casas
        v = intPart + ',' + decPart;
    } else {
        v = parts[0];
    }

    // remover zeros à esquerda (mas manter '0' quando vazio)
    v = v.replace(/^0+(?=\d)/, '');

    input.value = v;
}

async function handleSubmit(e) {
    e.preventDefault();

    const rawPeso = document.getElementById('peso_inicial').value;
    // aceita vírgula como separador decimal
    let pesoParsed = null;
    if (rawPeso !== undefined && String(rawPeso).trim() !== '') {
        const normalized = String(rawPeso).replace(',', '.').replace(/\s+/g, '');
        const f = parseFloat(normalized);
        pesoParsed = Number.isFinite(f) ? f : null;
    }

    const payload = {
        codigo_lacre: document.getElementById('codigo_lacre').value,
        nome_animal: document.getElementById('nome_animal').value,
        codigo_registro: document.getElementById('codigo_registro').value,
        codigo_registro_pai: document.getElementById('codigo_registro_pai').value,
        codigo_registro_mae: document.getElementById('codigo_registro_mae').value,
        peso_inicial: pesoParsed,
        data_nascimento: document.getElementById('data_nascimento').value
    };

    try {
        const form = document.querySelector('form');
        const editId = form.dataset.editId;

        let res;
        if (editId) {
            // atualizar
            res = await fetch(`/api/tarefas/${editId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
        } else {
            // criar
            res = await fetch('/api/tarefas', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
        }

        if (!res.ok) {
            const err = await res.json().catch(() => ({}));
            throw new Error(err.erro || 'Erro ao salvar');
        }

        // Limpar formulário e estado de edição
        clearForm();

        // Atualiza a tabela
        fetchAnimais();
    } catch (err) {
        console.error(err);
        alert('Erro: ' + err.message);
    }
}

function clearForm() {
    document.getElementById('codigo_lacre').value = '';
    document.getElementById('nome_animal').value = '';
    document.getElementById('codigo_registro').value = '';
    document.getElementById('codigo_registro_pai').value = '';
    document.getElementById('codigo_registro_mae').value = '';
    document.getElementById('peso_inicial').value = '';
    document.getElementById('data_nascimento').value = '';
    const form = document.querySelector('form');
    delete form.dataset.editId;
    document.getElementById('submit-btn').value = 'Enviar';
    document.getElementById('cancel-btn').style.display = 'none';
}

function startEdit(record) {
    // Preenche o formulário com os dados do registro e coloca em modo edição
    document.getElementById('codigo_lacre').value = record.codigo_lacre || '';
    document.getElementById('nome_animal').value = record.nome_animal || '';
    document.getElementById('codigo_registro').value = record.codigo_registro || '';
    document.getElementById('codigo_registro_pai').value = record.codigo_registro_pai || '';
    document.getElementById('codigo_registro_mae').value = record.codigo_registro_mae || '';
    document.getElementById('peso_inicial').value = record.peso_inicial !== null && record.peso_inicial !== undefined ? String(record.peso_inicial).replace('.', ',') : '';
    // tentar definir input de data a partir de ISO ou YYYY-MM-DD
    let dateVal = '';
    if (record.data_nascimento) {
        // converter para YYYY-MM-DD para input
        const d = new Date(record.data_nascimento);
        if (!Number.isNaN(d.getTime())) {
            const yyyy = d.getFullYear();
            const mm = String(d.getMonth() + 1).padStart(2, '0');
            const dd = String(d.getDate()).padStart(2, '0');
            dateVal = `${yyyy}-${mm}-${dd}`;
        } else {
            // se já estiver no formato YYYY-MM-DD
            dateVal = String(record.data_nascimento).slice(0, 10);
        }
    }
    document.getElementById('data_nascimento').value = dateVal;

    const form = document.querySelector('form');
    form.dataset.editId = record.id;
    document.getElementById('submit-btn').value = 'Atualizar';
    document.getElementById('cancel-btn').style.display = 'inline-block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

async function deleteRecord(id) {
    if (!confirm('Deseja realmente excluir este registro?')) return;
    try {
        const res = await fetch(`/api/tarefas/${id}`, { method: 'DELETE' });
        if (!res.ok) throw new Error('Erro ao excluir');
        fetchAnimais();
    } catch (err) {
        console.error(err);
        alert('Erro ao excluir: ' + err.message);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    form.addEventListener('submit', handleSubmit);
    const pesoInput = document.getElementById('peso_inicial');
    if (pesoInput) {
        pesoInput.addEventListener('input', applyPesoMask);
        // ao colar, também aplicar normalização
        pesoInput.addEventListener('paste', (ev) => {
            setTimeout(() => applyPesoMask({ target: pesoInput }), 0);
        });
    }

    const cancelBtn = document.getElementById('cancel-btn');
    if (cancelBtn) cancelBtn.addEventListener('click', clearForm);
    fetchAnimais();
});