import { getCookie } from "./get-cookie.js"

export function addMeal() {
    const mealForm = document.getElementById('meal-form')
    const mealProductType = document.getElementById('meal-product-type')
    const mealName = document.getElementById('meal-name')
    const mealDay = document.getElementById('meal-day')
    const mealType = document.getElementById('meal-type')
    const mealWeight = document.getElementById('meal-weight')
    const csrftoken = getCookie('csrftoken');

    const mealObj = {
        // 'mealProductType': mealProductType.value,
        'product': [mealName.value],
        'day': mealDay.value,
        'type': mealType.value,
        'weight': mealWeight.value
    }

    fetch('add-meal/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken,
        },
        body: JSON.stringify(mealObj),
    })
    .then(response => response.json())
    .then(data => console.log(data))

    console.log('=====');
    console.log(mealObj);
    // console.log("adding meal");


}