// script for populating the date field and datepicker in index.html
const currentDate = new Date().toISOString().substr(0, 10);
document.getElementById("expense-date").value = currentDate; // populating datepicker with today's date
document.getElementById("input-cell-date-sm").value = currentDate;
