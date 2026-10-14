let editingTransactionId = null;
let lastFocusedElement = null;
const modalOverlay = document.getElementById('modal-overlay');

function openEditModal(transaction) {
    editingTransactionId = transaction._id;
    lastFocusedElement = document.activeElement;

    document.getElementById('edit-description').value = transaction.description;
    document.getElementById('edit-amount').value = transaction.amount;
    document.getElementById('edit-category').value = transaction.category;

    const dropdown = document.getElementById('edit-dropdown');
    dropdown.dataset.value = transaction.transaction_type;
    dropdown.querySelector('summary').textContent = transaction.transaction_type;
    dropdown.open = false;

    modalOverlay.classList.add('is-open');
    document.body.style.overflow = 'hidden'; // trava o scroll da página

    // foco no primeiro campo (depois da transição começar)
    setTimeout(() => document.getElementById('edit-description').focus(), 50);
}


function closeEditModal() {
    modalOverlay.classList.remove('is-open');
    document.body.style.overflow = '';
    editingTransactionId = null;

    // devolve o foco para onde o usuário estava
    if (lastFocusedElement) lastFocusedElement.focus();
}

// fechar clicando no fundo escuro
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeEditModal();
});

document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;

    if (deleteOverlay.classList.contains('is-open')) closeDeleteModal();
    else if (modalOverlay.classList.contains('is-open')) closeEditModal();
});

const editDropdown = document.getElementById('edit-dropdown');

editDropdown.querySelectorAll('li').forEach(option => {
    option.addEventListener('click', () => {
        editDropdown.dataset.value = option.dataset.value;
        editDropdown.querySelector('summary').textContent = option.textContent;
        editDropdown.open = false;
    });
});


document.getElementById('close-modal').addEventListener("click", 

    closeEditModal
)