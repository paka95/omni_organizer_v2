import { deleteExpense } from "./delete-expense.js";
import { editExpense } from "./edit-expense.js";
import { getCookie } from "./get-cookie.js";

const csrftoken = getCookie('csrftoken');

export function buildList(submissionDate = null) {
    // submissionDate is a date from "expense-date" input field in index.html after submitting a new expense
    // it is by default populated by today's date in index.html template

    let specifiedDate;
    
    if (submissionDate) {
        // if function is called after adding an expense, the submissionDate will be sent as a parameter
        // it will then populate the datepicker with this date, rendering expenses only from a month of this added expense
        specifiedDate = submissionDate;
        document.getElementById("input-cell-date-sm").value = submissionDate;
    } else {
        // if function is called at template onload and not expense submission, the specifiedDate will equal to today's date
        // which is populated by a script in index.html 
        specifiedDate = document.getElementById("input-cell-date-sm").value;
    }

    // expensesList is a container, which will hold the table with all the expenses
    const expensesList = document.querySelector('.expenses-list-container');
    expensesList.innerHTML = ''

    const obj = {
        'specified_date': specifiedDate
    }
    // fetch calls the GetExpenses endpoint with the specifiedDate from the datepicker in order to get all the expenses based on this date
    // then it gets a response and populates the table with those expenses accordingly
    fetch('get-expenses/', {
        method: "POST",
        body: JSON.stringify(obj),
        headers: { 
            "Content-Type": "application/json",
            'X-CSRFToken': csrftoken,
         }
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        const totalRow = document.getElementById("total-row");
        let previewBtn = document.getElementById('preview-btn');

        // checking if there are no expenses at all in the response
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
        
        // capitalizing the first letter of the tag - based on the type of the expense
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

            // getting the date of the expense and parsing it to correct format, so that it looks nice in the table
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
            // parse the time accordingly to the language of the browser
            const formattedDate = dateObj.toLocaleString(navigator.language, options)

            // creating a row with the expense and populating the table with it
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
                    <div class="edit-btn" title="Edit expense">
                        <i class="fa-solid fa-pen"></i>
                    </div>
                    <div class="delete-btn" title="Delete expense">
                        <i class="fa-solid fa-trash-alt"></i>
                    </div>
                </div>`;
            const expenseDiv = document.createElement('div');
            expenseDiv.innerHTML = expenseHtml;
            expensesList.appendChild(expenseDiv);
      });
      
      // applying event listeners on every expense row, so that each one can be edited or deleted   
      const deleteButtons = document.getElementsByClassName('delete-btn')
      const editButtons = document.getElementsByClassName('edit-btn')
      deleteExpense(deleteButtons);
      editExpense(editButtons);
})
}