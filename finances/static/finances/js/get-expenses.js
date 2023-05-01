import { buildList } from "./build-list.js";
import { submitExpense } from "./submit-expense.js";

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
            submitExpense();
        } 
    })
});