
const API = 'http://localhost:8000/financial';

let transactions = [];

async function loadData() {

    const answer = await fetch(`${API}/transactions`);
    transactions = await answer.json();

    render();

}

function createTransactionItem(t) {
    const li = document.createElement('li');
    li.classList.add(t.transaction_type);

    const row = document.createElement('div');
    row.className = 'transaction-list-li';

    // textContent: o conteúdo nunca é interpretado como HTML
    const description = document.createElement('p');
    description.textContent = t.description;

    const amount = document.createElement('p');
    amount.textContent = `R$ ${t.amount}`;

    const icons = document.createElement('div');
    icons.className = 'transaction-icons-container';

    const editButton = document.createElement('button');
    editButton.className = 'edit-transaction-btn';
    editButton.setAttribute('aria-label', 'Edit transaction');
    editButton.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';  // HTML fixo, sem dados do usuário
    editButton.addEventListener('click', () => openEditModal(t));

    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete-transaction-btn';
    deleteButton.setAttribute('aria-label', 'Delete transaction');
    deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
    deleteButton.addEventListener('click', () => openDeleteModal(t));

    icons.append(editButton, deleteButton);
    row.append(description, amount, icons);
    li.appendChild(row);

    return li;
}

function render() {
    const transactionList = document.getElementById('transaction-list');
    transactionList.innerHTML = "";   // aqui não tem problema, é uma string vazia fixa

    let inflows = 0;
    let outflows = 0;

    transactions.forEach(t => {
        transactionList.appendChild(createTransactionItem(t));

        if (t.transaction_type === "inflow") inflows += t.amount;
        else outflows += t.amount;
    });

    document.getElementById('inflows').innerText = "R$" + inflows;
    document.getElementById('outflows').innerText = "R$" + outflows;
    document.getElementById('balance').innerText = "R$" + (inflows - outflows);
}

async function createNewTransaction(){
    const description = document.getElementById('description-input').value;
    const amount = Number(document.getElementById('transaction-amount').value);

    const transactionType = document.getElementById('transaction-dropdown').dataset.value;

    const category = document.getElementById('transaction-category').value;

    if(!description || !amount || !transactionType){
        alert("Please,fill in all fields");
        return;
    }

    const transaction = {
    
        description,
        amount,
        transaction_type:transactionType,
        category

    }
    const response = await fetch(`${API}/transactions`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(transaction)
    });

    if (!response.ok) {
        showToast("Could not create the transaction.", "error");
        return;
    }

    await loadData();
    clearForm();
    showToast("Transaction added successfully");
    
}

function clearForm(){

    document.getElementById('description-input').value = "";
    document.getElementById('transaction-amount').value = "";
    document.getElementById('transaction-category').value = "";

    // dropdown reset

    const dropdown = document.getElementById('transaction-dropdown');

    dropdown.querySelector('summary').textContent = "Transaction type";
    dropdown.removeAttribute('data-value');
}


document.getElementById('transaction-btn').addEventListener("click", createNewTransaction);

async function updateTransaction() {
    const description = document.getElementById('edit-description').value;
    const amount = Number(document.getElementById('edit-amount').value);
    const transactionType = document.getElementById('edit-dropdown').dataset.value;
    const category = document.getElementById('edit-category').value;

    if (!description || !amount || !transactionType) {
        alert("Please, fill in all fields");
        return;
    }

    const updated = {
        description,
        amount,
        transaction_type: transactionType,
        category
    };

    try {
        const response = await fetch(`${API}/transactions/${editingTransactionId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updated)
        });

        if (!response.ok) throw new Error("Update failed");

        closeEditModal();
        await loadData();
        showToast("Transaction updated successfully");
    } catch (error) {
        console.error(error);
        showToast("Could not update the transaction.", "error");
    }
}

const deleteOverlay = document.getElementById('delete-overlay');
const deleteText = document.getElementById('delete-text');
const confirmDeleteBtn = document.getElementById('confirm-delete-btn');
const cancelDeleteBtn = document.getElementById('cancel-delete-btn');

let transactionToDeleteId = null;
let deleteLastFocused = null;
let toastTimer = null;

function openDeleteModal(transaction) {
    transactionToDeleteId = transaction._id;
    deleteLastFocused = document.activeElement;

    // textContent (e não innerHTML) evita injetar HTML vindo da descrição
    deleteText.textContent =
        `"${transaction.description}" (R$ ${transaction.amount}) will be permanently removed. This action cannot be undone.`;

    confirmDeleteBtn.disabled = false;
    deleteOverlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';

    // foco no Cancel: o botão seguro é o padrão
    setTimeout(() => cancelDeleteBtn.focus(), 50);
}

function closeDeleteModal() {
    deleteOverlay.classList.remove('is-open');
    document.body.style.overflow = '';
    transactionToDeleteId = null;

    if (deleteLastFocused) deleteLastFocused.focus();
}

async function confirmDelete() {
    if (!transactionToDeleteId) return;

    confirmDeleteBtn.disabled = true;   // evita clique duplo

    try {
        const response = await fetch(`${API}/transactions/${transactionToDeleteId}`, {
            method: 'DELETE'
        });

        if (!response.ok) throw new Error('Delete failed');

        closeDeleteModal();
        await loadData();
        showToast('Transaction deleted successfully');
    } catch (error) {
        console.error(error);
        confirmDeleteBtn.disabled = false;
        showToast('Could not delete the transaction.', 'error');
    }
}

function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const icon = type === 'success' ? 'fa-circle-check' : 'fa-circle-exclamation';

    toast.className = `toast ${type}`;
    toast.innerHTML = `<i class="fa-solid ${icon}"></i><span></span>`;
    toast.querySelector('span').textContent = message;

    clearTimeout(toastTimer);
    toast.classList.add('is-visible');
    toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 3000);
}

confirmDeleteBtn.addEventListener('click', confirmDelete);
cancelDeleteBtn.addEventListener('click', closeDeleteModal);

// fechar clicando no fundo escuro
deleteOverlay.addEventListener('click', (e) => {
    if (e.target === deleteOverlay) closeDeleteModal();
});

document.getElementById('save-edit-btn').addEventListener("click", updateTransaction);


loadData();
