import { buildList } from "./build-list.js";
import { submitExpense } from "./submit-expense.js";
import { showError } from "./show-error.js";

document.addEventListener("DOMContentLoaded", () => {
    buildList();

    const specified_date = document.getElementById('input-cell-date-sm');
    specified_date.addEventListener('change', () => {
        buildList();
    })

    const expenseAddBtn = document.getElementById("expense-add-btn");
    expenseAddBtn.addEventListener("click", (e) => {
        if (expenseAddBtn.innerHTML == 'Add'){
            e.preventDefault();
            const expenseForm = document.getElementById("expense-form")
            const expenseTitle = document.getElementById("expense-title").value
            const expenseAmount = document.getElementById("expense-amount").value
            const expenseTag = document.getElementById("expense-tag").value

            if (expenseTitle == "" || expenseAmount == "" || expenseTag == ""){
                showError("You can't leave an empty value");
            } else {
                if (expenseAmount < 0 ) {
                    showError("Value can't be negative");
                } else {
                    submitExpense();
                }
            }
        } 
    })
});