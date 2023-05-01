import { deleteExpense } from "./delete-expense.js";
import { editExpense } from "./edit-expense.js";

export function buildList(datnia = null) {
    let specifiedDate;
    if (datnia) {
        specifiedDate = datnia;
        document.getElementById("input-cell-date-sm").value = datnia;
    }else{
        specifiedDate = document.getElementById("input-cell-date-sm").value;
    }
    const expensesList = document.querySelector('.expenses-list-container');
    
    expensesList.innerHTML = ''
    const obj = {
        'specified_date': specifiedDate
    }
    fetch('get-expenses/', {
        method: "POST",
        body: JSON.stringify(obj),
        headers: { "Content-Type": "application/json" }
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        const totalRow = document.getElementById("total-row");
        let previewBtn = document.getElementById('preview-btn');
        if (data.expenses.length == 0){
            totalRow.innerHTML = `
            <div class="input-wrapper input-wrapper-sm total-cell">
                <div style="text-align: center; font-weight: bold; height: 20px; padding: 2px" id="total">You have no expenses this month</div>
            </div>`;
            previewBtn.style.display = "none";
        } else {
            totalRow.innerHTML = `
            <div class="input-wrapper input-wrapper-sm title-cell">
                <div style="text-align: center; font-weight: bold; height: 20px; padding: 2px" id="total">TOTAL</div>
            </div>
            <div class="separator"></div>
            <div class="input-wrapper input-wrapper-sm amount-cell">
                <div style="font-weight: bold; height: 20px; padding: 2px" id="total-amount">${data.total_amount}</div>
            </div>`;
            previewBtn.style.display = "block";
        }
        
        data.expenses.forEach(expense => {
            let tag;
            switch (expense.tag) {
                case 'food':
                    tag = `<div id="tag-food">${expense.tag.charAt(0).toUpperCase() + expense.tag.slice(1)}</div>`;
                  break;
                case 'transport':
                    tag = `<div id="tag-transport">${expense.tag.charAt(0).toUpperCase() + expense.tag.slice(1)}</div>`;
                  break;
                case 'bills':
                    tag = `<div id="tag-bills">${expense.tag.charAt(0).toUpperCase() + expense.tag.slice(1)}</div>`;
                  break;
                case 'fees':
                    tag = `<div id="tag-fees">${expense.tag.charAt(0).toUpperCase() + expense.tag.slice(1)}</div>`;
                  break;
                case 'misc':
                    tag = `<div id="tag-misc">${expense.tag.charAt(0).toUpperCase() + expense.tag.slice(1)}</div>`;
                  break;
                default:
                    tag = '';
              }
            const dateObj = new Date(expense.date_created);
            const options = { 
                day: '2-digit', 
                month: '2-digit', 
                year: 'numeric', 
                hour: '2-digit', 
                minute: '2-digit', 
                second: '2-digit', 
                timeZone: 'UTC' 
                };
            const formattedDate = dateObj.toLocaleString(navigator.language, options)
            const expenseHtml = `
                <div class="content-row content-row-sm" id="expense-${expense.id}">
                    <div class="input-wrapper input-wrapper-sm title-cell">
                        <div>${expense.title}</div>
                    </div>
                    <div class="separator"></div>
                    <div class="input-wrapper input-wrapper-sm amount-cell">
                        <div>${expense.amount}</div>
                    </div>
                    <div class="separator"></div>
                    <div class="input-wrapper input-wrapper-sm tag-cell">
                        <div>${tag}</div>
                    </div>
                    <div class="separator"></div>
                    <div class="input-wrapper input-wrapper-sm date-cell">
                        <div style="width: 200px">${formattedDate}</div>
                    </div>
                    <div class="edit-btn">
                        <i class="fa-solid fa-pen"></i>
                    </div>
                    <div class="delete-btn">
                        <i class="fa-solid fa-trash-alt"></i>
                    </div>
                </div>`;
            const expenseDiv = document.createElement('div');
            expenseDiv.innerHTML = expenseHtml;
            expensesList.appendChild(expenseDiv);
      });
      const deleteButtons = document.getElementsByClassName('delete-btn')
      const editButtons = document.getElementsByClassName('edit-btn')
      deleteExpense(deleteButtons);
      editExpense(editButtons);
})
}