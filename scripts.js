const expenses = [];

// Function to add expense
function addExpense() {
    const amount = parseFloat(document.getElementById("amount").value);
    const category = document.getElementById("category").value;
    const date = document.getElementById("date").value;

    if (!amount || !date) {
        alert("Please fill in all fields.");
        return;
    }

    const expense = {
        amount,
        category,
        date
    };

    expenses.push(expense);
    displayExpenses();
    updateMonthlySummary();

    // Clear form fields
    document.getElementById("expense-form").reset();
}

// Function to display expenses
function displayExpenses(filteredExpenses = expenses) {
    const expenseList = document.getElementById("expense-list");
    expenseList.innerHTML = "";

    if (filteredExpenses.length === 0) {
        expenseList.innerHTML = "<p>No expenses found.</p>";
        return;
    }

    filteredExpenses.forEach((expense) => {
        const expenseItem = document.createElement("div");
        expenseItem.classList.add("expense-item");
        expenseItem.innerHTML = `
            <span>${expense.date} - ${expense.category}</span>
            <span>$${expense.amount.toFixed(2)}</span>
        `;
        expenseList.appendChild(expenseItem);
    });
}

// Function to update monthly expenditure summary
function updateMonthlySummary() {
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    document.getElementById("monthly-summary").innerHTML = `<p>Total: $${total.toFixed(2)}</p>`;
}

// Function to filter expenses by month and year
function filterExpenses() {
    const filterMonth = document.getElementById("filter-month").value;

    if (!filterMonth) {
        displayExpenses(expenses);
        updateMonthlySummary();
        return;
    }

    const [year, month] = filterMonth.split('-').map(Number);
    
    const filteredExpenses = expenses.filter(expense => {
        const expenseDate = new Date(expense.date);
        return expenseDate.getFullYear() === year && (expenseDate.getMonth() + 1) === month;
    });

    displayExpenses(filteredExpenses);

    const totalFiltered = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    document.getElementById("monthly-summary").innerHTML = `<p>Total: $${totalFiltered.toFixed(2)}</p>`;
}


