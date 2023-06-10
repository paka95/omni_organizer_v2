import { buildList } from "./build-list.js"
import { getCookie } from "./get-cookie.js";
import { showMessage } from "../../../../static/js/show-message.js";
const csrftoken = getCookie('csrftoken');

export function submitExpense () {
    // if the data provided by the user is correct, take the values from the input fields and create an object with them
    const expenseForm = document.getElementById("expense-form")
    const expenseTitle = document.getElementById("expense-title").value
    const expenseAmount = document.getElementById("expense-amount").value
    const expenseTag = document.getElementById("expense-tag").value
    const expenseDate = document.getElementById("expense-date").value

    const currentTime = new Date();
    const hour = currentTime.getHours();
    const minute = currentTime.getMinutes();
    const second = currentTime.getSeconds();

    const expenseDateTime = expenseDate + " " + hour + ":" + minute + ":" + second

    // 'user': 1 is a magic number - endpoint requires this value to be sent in a request, it is then changed in the SubmitExpense view
    // to logged in and correct user
    // 1 is admin's ID
    // it is due to bad design
    const expenseData = {
        'user': 1,
        'title': expenseTitle,
        'amount': expenseAmount,
        'tag': expenseTag,
        'date_created': expenseDateTime,
    };
    fetch('submit/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken,
        },
        body: JSON.stringify(expenseData),
    })
    .then(() => {
        buildList(expenseDate);
        showMessage("Expense added", "success")
    })
    .catch(error => console.error(error));

    // after submitting the expense - reset the form and populate datepicker with previously specified date
    expenseForm.reset();
    document.getElementById("expense-date").value = expenseDate;
}