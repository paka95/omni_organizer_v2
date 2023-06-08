import { buildList } from "./build-list.js";
import { showError } from "./show-error.js";


export function editExpense (editButtons) {
    // editButtons are all HTML elements with the edit icon
    let btn = document.getElementById("expense-add-btn");
    let cancelBtn = document.getElementById("expense-cancel-btn");

    const expenseForm = document.getElementById("expense-form")
    for (let i = 0; i < editButtons.length; i++) {
        // apply event listener to each element
        editButtons[i].addEventListener('click', () => {
            // get the id of the closest parent element 
            const id = editButtons[i].closest('.content-row').getAttribute('id');

            // get only the number portion of it - the whole id looks like this - "expense-1" - 1 is an example value
            // it looks for one or more consecutive digits in the id string and gets the first element of it
            // since there is only id as a number, it will be the only element that matches
            const expenseId = id.match(/\d+/)[0];

            // setting the attribute of the button to the clicked/edited expense's id
            btn.setAttribute('data-expense-to-update', `${expenseId}`);

            // setting the value of the submit button to "Edit"
            btn.innerHTML = "Edit";

            // displaying the cancel button, so that user can click on it and call off the editing function
            cancelBtn.classList.remove('btn-hidden');

            // getting data from clicked expense row
            const expense = document.querySelector(`#expense-${expenseId}`);
            const expenseTitle = expense.querySelector('.title-cell div').textContent;
            const expenseAmount = expense.querySelector('.amount-cell div').textContent;
            const expenseTag = expense.querySelector('.tag-cell div').textContent;
            let expenseDate = expense.querySelector('.date-cell div').textContent.slice(0,10);
            expenseDate = expenseDate.split('.').reverse().join('-');
            
            // getting inputs of the form and applying to their values corresponding data from clicked expense row
            // i.e. populating the edit form with the values of the edited expense
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

        if (btn.innerHTML == 'Edit'){
            // checking if the submit button definitely is in "Edit" mode

            // checking if provided values for editing are valid
            if (expenseAmountInput.value == "" || expenseTitleInput.value == "") {
                showError("Amount can't be left empty")
            } else {
                if (expenseAmountInput.value < 0) {
                    showError("You can't change to negative amount")
                } else {
                        // if provided values for editing are correct, hide the cancel button and proceed
                        cancelBtn.classList.add('btn-hidden');
                        const currentTime = new Date();
                        const hour = currentTime.getHours();
                        const minute = currentTime.getMinutes();
                        const second = currentTime.getSeconds();
                    
                        const expenseDateTime = expenseDateInput.value + " " + hour + ":" + minute + ":" + second
                        // take the values in input fields (given the data has been changed) 
                        // and send them via patch request method to the endpoint
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

                        // getting the id of the expense to be updated from the submit button
                        // its dataset attribute was assigned above
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

                        // after successfully editing the expense, change the button's mode to "Add", reset the form
                        btn.innerHTML = "Add";
                        expenseForm.reset();
                        const currentDate = new Date().toISOString().substr(0, 10);
                        document.getElementById("expense-date").value = currentDate;
                        }
                    }
        }
    })

    // resetting the form, hiding "Cancel" button and restoring "Add" mode to the submit button
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