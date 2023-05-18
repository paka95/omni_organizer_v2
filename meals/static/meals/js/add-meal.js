import { getCookie } from "./get-cookie.js";
import { buildList } from "./build-list.js";

export function addMeal() {
    const mealForm = document.getElementById('meal-form')
    const mealProductType = document.getElementById('meal-product-type')
    const mealName = document.getElementById('meal-name')
    const mealDay = document.getElementById('meal-day')
    const mealType = document.getElementById('meal-type')
    const mealWeight = document.getElementById('meal-weight')
    const csrftoken = getCookie('csrftoken');

    const mealObj = {
        'product': mealName.value,
        'meal_day': mealDay.value,
        'meal_type': mealType.value,
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
    .then(data => {
        console.log(data);
        mealForm.reset();
        buildList();
    })
}