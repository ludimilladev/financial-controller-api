const API = 'http://localhost:8000/financial';

let transactions = [];

async function loadData() {

    const answer = await fetch(`${API}/transactions`);
    transactions = await answer.json();

    render();

}

function render(){
    const transactionList = document.getElementById('transaction-list');

    transactionList.innerHTML = ""

    let inflows = 0;
    let outflows = 0;

    transactions.forEach(t => {
        const li = document.createElement('li')
        li.classList.add(t.transaction_type);
        li.innerHTML = `
            <div class="transaction-list-li">
                <p>${t.description}</p>
                <p>R$ ${t.amount}</p>
                <div class="transaction-icons-container">

                
                    <button><i class="fa-solid fa-pen-to-square"></i></button>
                    
                    <button><i class="fa-solid fa-trash"></i></button>
                    
                
                </div>
                
            </div>
            
        

        `;
        transactionList.appendChild(li);

        if(t.transaction_type == "inflow") inflows += t.amount;

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
        id: Date.now(),
        description,
        amount,
        transaction_type:transactionType,
        category

    }

    await fetch(`${API}/transaction`,{

        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(transaction)

    });
    await loadData()

    clearForm();
    
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

loadData();
