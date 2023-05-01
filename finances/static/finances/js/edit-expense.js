import { buildList } from "./build-list.js";

export function editExpense (editButtons) {
    let btn = document.getElementById("expense-add-btn");
    let cancelBtn = document.getElementById("expense-cancel-btn");
    const expenseForm = document.getElementById("expense-form")
    for (let i = 0; i < editButtons.length; i++) {
        editButtons[i].addEventListener('click', () => {
            const id = editButtons[i].closest('.content-row').getAttribute('id');
            const expenseId = id.match(/\d+/)[0];

            btn.setAttribute('data-expense-to-update', `${expenseId}`);
            btn.innerHTML = "Edit";
            cancelBtn.classList.remove('btn-hidden');
            // getting data from clicked expense row
            const expense = document.querySelector(`#expense-${expenseId}`);
            const expenseTitle = expense.querySelector('.title-cell div').textContent;
            const expenseAmount = expense.querySelector('.amount-cell div').textContent;
            const expenseTag = expense.querySelector('.tag-cell div').textContent;
            let expenseDate = expense.querySelector('.date-cell div').textContent.slice(0,10);
            expenseDate = expenseDate.split('.').reverse().join('-');
            
            // getting inputs of the form and applying to their values corresponding data from clicked expense row
            const expenseTitleInput = document.getElementById("expense-title");
            const expenseAmountInput = document.getElementById("expense-amount");
            const expenseTagInput = document.getElementById("expense-tag");
            const expenseDateInput = document.getElementById("expense-date");
            expenseTitleInput.value = expenseTitle
            expenseAmountInput.value = expenseAmount
            expenseTagInput.value = expenseTag.toLowerCase()
            expenseDateInput.value = expenseDate
        })
    }


    btn.addEventListener("click", (e) => {
        e.preventDefault();
        const expenseTitleInput = document.getElementById("expense-title");
        const expenseAmountInput = document.getElementById("expense-amount");
        const expenseTagInput = document.getElementById("expense-tag");
        const expenseDateInput = document.getElementById("expense-date");
        cancelBtn.classList.add('btn-hidden');

        if (btn.innerHTML == 'Edit'){
            const currentTime = new Date();
            const hour = currentTime.getHours();
            const minute = currentTime.getMinutes();
            const second = currentTime.getSeconds();
        
            const expenseDateTime = expenseDateInput.value + " " + hour + ":" + minute + ":" + second
            //if the Edit button was clicked, take the values in input fields (given the data has been changed) and send them via patch request method to the endpoint
            const patchedExpenseTitle = expenseTitleInput.value
            const patchedExpenseAmount = expenseAmountInput.value
            const patchedExpenseTag = expenseTagInput.value
            const patchedExpenseDate = expenseDateTime

            const patchedExpense = {
                'title': patchedExpenseTitle,
                'amount': patchedExpenseAmount,
                'tag': patchedExpenseTag,
                'date_created': patchedExpenseDate
            }

            const id = btn.dataset.expenseToUpdate;

            fetch(`update/${id}/`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': document.getElementsByName('csrfmiddlewaretoken')[0].value,
                },
                body: JSON.stringify(patchedExpense)
            })
            .then(() => {
                buildList();
            })
            .catch(error => console.error(error));

            btn.innerHTML = "Add";
            expenseForm.reset();
            const currentDate = new Date().toISOString().substr(0, 10);
            document.getElementById("expense-date").value = currentDate;
        }
    })

    cancelBtn.addEventListener("click", (e) => {
        e.preventDefault();
        expenseForm.reset();
        const currentDate = new Date().toISOString().substr(0, 10);
        document.getElementById("expense-date").value = currentDate; // populating datepicker with today's date
        cancelBtn.classList.add('btn-hidden');
        btn.innerHTML = "Add";
        btn.removeAttribute('data-expense-to-update');
    })
}