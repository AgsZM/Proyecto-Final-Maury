let transactions = [];

const conceptInput = document.getElementById('concept');
const amountInput = document.getElementById('amount');
const typeSelect = document.getElementById('type');
const addTransactionBtn = document.getElementById('add-transaction');
const transactionHistory = document.getElementById('transaction-history');
const totalIncome = document.getElementById('total-income');
const totalExpense = document.getElementById('total-expense');
const currentBalance = document.getElementById('current-balance');

addTransactionBtn.addEventListener('click', addTransaction);

function addTransaction() {
    const concept = conceptInput.value;
    const amount = parseFloat(amountInput.value);
    const type = typeSelect.value;

    if (concept && amount && !isNaN(amount)) {
        const transaction = {
            concept,
            amount,
            type,
            date: new Date().toLocaleDateString()
        };

        transactions.push(transaction);
        renderTransactions();
        updateSummary();
    }
}

function renderTransactions() {
    transactionHistory.innerHTML = '';

    transactions.forEach(transaction => {
        const transactionDiv = document.createElement('div');
        transactionDiv.classList.add('transaction');
        transactionDiv.textContent = `${transaction.date} - ${transaction.concept}: $${transaction.amount} (${transaction.type})`;
        transactionHistory.appendChild(transactionDiv);
    });
}

function updateSummary() {
    let income = 0;
    let expense = 0;

    transactions.forEach(transaction => {
        if (transaction.type === 'income') {
            income += transaction.amount;
        } else {
            expense += transaction.amount;
        }
    });

    const balance = income - expense;

    totalIncome.textContent = `$${income}`;
    totalExpense.textContent = `$${expense}`;
    currentBalance.textContent = `$${balance}`;

    updateChart(income, expense);
}

function updateChart(income, expense) {
    const ctx = document.getElementById('chart').getContext('2d');

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Ingresos', 'Gastos'],
            datasets: [{
                label: 'Finanzas',
                data: [income, expense],
                backgroundColor: ['#4CAF50', '#FF5252']
            }]
        }
    });
}
function getExchangeRates() {
    fetch('https://api.exchangerate-api.com/v4/latest/USD')
        .then(response => response.json())
        .then(data => {
            console.log("Tasas de cambio actuales:", data.rates);
        })
        .catch(error => console.error('Error al obtener tasas:', error));
}

getExchangeRates();
