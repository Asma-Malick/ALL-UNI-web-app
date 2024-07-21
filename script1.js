let monthlyBudget = 0;
let totalExpenses = 0;
let remainingBudget = 0;
let dailyExpenses = {};

// Function to set monthly budget
function setMonthlyBudget() {
    const budgetInput = document.getElementById('monthly-budget').value;
    monthlyBudget = parseFloat(budgetInput);
    if (isNaN(monthlyBudget) || monthlyBudget <= 0) {
        alert('Please enter a valid monthly budget.');
        return;
    }
    updateOverview();
    // Hide the input field and "Set Budget" button
    document.getElementById('budget-input').style.display = 'none';
    // Show the "Alter Budget" button
    document.getElementById('alter-budget').style.display = 'block';
}

// Function to alter budget
function alterBudget() {
    const newBudgetInput = prompt('Enter the new budget:');
    const newBudget = parseFloat(newBudgetInput);
    if (isNaN(newBudget) || newBudget <= 0) {
        alert('Please enter a valid budget.');
        return;
    }
    const difference = newBudget - monthlyBudget;
    monthlyBudget = newBudget;
    remainingBudget += difference;
    updateOverview();
}

// Function to add daily expense
function addDailyExpense() {
    const selectedDateInput = document.getElementById('expense-date');
    const selectedDate = selectedDateInput.value;
    const description = document.getElementById('expense-description').value;
    const amount = parseFloat(document.getElementById('expense-amount').value);

    if (!description || isNaN(amount)) {
        alert('Please enter valid values for description and amount.');
        return;
    }

    addExpense(selectedDate, description, amount);
    addDateToDailyExpenses(selectedDate);
}

// Function to add date to daily expenses if it doesn't exist
function addDateToDailyExpenses(date) {
    if (!dailyExpenses[date]) {
        dailyExpenses[date] = [];
        updateDailyExpenses();
    }
}

// Function to add expense
function addExpense(date, description, amount) {
    if (!dailyExpenses[date]) {
        dailyExpenses[date] = [];
    }
    dailyExpenses[date].push({ description, amount });
    totalExpenses += amount;
    remainingBudget = monthlyBudget - totalExpenses;
    updateOverview();
    updateDailyExpenses();
}

// Function to update overview section
function updateOverview() {
    const remainingBudgetElement = document.getElementById('remaining-budget');
    remainingBudgetElement.textContent = `Remaining Budget: $${remainingBudget.toFixed(2)}`;

    // Check if remaining budget is negative
    if (remainingBudget < 0) {
        remainingBudgetElement.style.color = 'red'; // Set text color to red
        alert('Your remaining budget is negative!'); // Display alert message
    } else {
        remainingBudgetElement.style.color = ''; // Reset text color
    }

    document.getElementById('total-expenses').textContent = `Total Expenses: $${totalExpenses.toFixed(2)}`;
}

// Function to update daily expenses section
function updateDailyExpenses() {
    const dailyExpensesContainer = document.getElementById('daily-expenses');
    dailyExpensesContainer.innerHTML = '';

    for (const date in dailyExpenses) {
        const expenses = dailyExpenses[date];
        const dailyExpensesDiv = document.createElement('div');
        dailyExpensesDiv.classList.add('daily-expense');
        dailyExpensesDiv.innerHTML = `<h3>${date}</h3>`;
        
        expenses.forEach((expense, index) => {
            const expenseItem = document.createElement('p');
            expenseItem.textContent = `${expense.description}: $${expense.amount.toFixed(2)}`;
            dailyExpensesDiv.appendChild(expenseItem);
            
            // Add delete icon
            const deleteIcon = document.createElement('span');
            deleteIcon.classList.add('delete-icon');
            deleteIcon.innerHTML = '&#10006;'; // X icon
            deleteIcon.style.cursor = 'pointer';
            deleteIcon.addEventListener('click', () => {
                undoExpense(date, index);
            });
            expenseItem.appendChild(deleteIcon);
        });

        dailyExpensesContainer.appendChild(dailyExpensesDiv);
    }
}

// Function to undo an expense
function undoExpense(date, index) {
    const expense = dailyExpenses[date].splice(index, 1)[0];
    totalExpenses -= expense.amount;
    remainingBudget = monthlyBudget - totalExpenses;
    updateOverview();
    updateDailyExpenses();
}
