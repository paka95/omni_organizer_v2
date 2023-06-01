import { buildList } from "./build-list.js"

export function submitExpense () {
    const expenseForm = document.getElementById("expense-form")
    const expenseTitle = document.getElementById("expense-title")
    const expenseAmount = document.getElementById("expense-amount")
    const expenseTag = document.getElementById("expense-tag")
    const expenseDate = document.getElementById("expense-date")

    const currentTime = new Date();
    const hour = currentTime.getHours();
    const minute = currentTime.getMinutes();
    const second = currentTime.getSeconds();

    const expenseDateTime = expenseDate.value + " " + hour + ":" + minute + ":" + second
    const expenseData = {
        'user': 1,
        'title': expenseTitle.value,
        'amount': expenseAmount.value,
        'tag': expenseTag.value,
        'date_created': expenseDateTime,
    };
    fetch('submit/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': document.getElementsByName('csrfmiddlewaretoken')[0].value,
        },
        body: JSON.stringify(expenseData),
    })
    .then(response => response.json())
    .then(data => {
        // here I needed to get the same date from the response back, 
        // because const expenseDate = document.getElementById("expense-date") did not work, it was empty in this .then block
        
        const date = new Date(data.date_created);
        const day = String(date.getUTCDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const formattedDate = `${year}-${month}-${day}`;
        console.log('formattedDate', formattedDate)
        buildList(formattedDate);
    })
    .catch(error => console.error(error));

    expenseForm.reset();
    const currentDate = new Date().toISOString().substr(0, 10);
    document.getElementById("expense-date").value = currentDate;
}