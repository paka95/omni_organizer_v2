import { buildList } from "./build-list.js";
import { submitExpense } from "./submit-expense.js";
import { showMessage } from "../../../../static/js/show-message.js";

document.addEventListener("DOMContentLoaded", () => {
    buildList();

    // if user changes the date in the datepicker, build a new list of expenses based on that date
    const specified_date = document.getElementById('input-cell-date-sm');
    specified_date.addEventListener('change', () => {
        buildList();
    })

    const expenseAddBtn = document.getElementById("expense-add-btn");
    expenseAddBtn.addEventListener("click", (e) => {
        // checking if the button is in 'Add' mode and not 'Edit'
        if (expenseAddBtn.innerHTML == 'Add'){
            e.preventDefault();

            // getting the values from the inputs in order to check if the provided data is valid
            const expenseForm = document.getElementById("expense-form")
            const expenseTitle = document.getElementById("expense-title").value
            const expenseAmount = document.getElementById("expense-amount").value
            const expenseTag = document.getElementById("expense-tag").value

            if (expenseTitle == "" || expenseAmount == "" || expenseTag == ""){
                showMessage("You can't leave an empty value", "error")
            } else {
                if (expenseAmount < 0 ) {
                    showMessage("Value can't be negative", "error")
                } else {
                    submitExpense();
                    showMessage("Expense added", "success")
                }
            }
        } 
    })
});