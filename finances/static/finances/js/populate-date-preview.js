// script for populating the date field in preview.html
const currentDate = new Date().toISOString().substr(0, 10);
document.getElementById("input-cell-date-sm-preview").value = currentDate;
