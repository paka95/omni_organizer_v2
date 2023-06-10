import { getCookie } from "./get-cookie.js";
import { buildList } from "./build-list.js";
import { showMessage } from "../../../../static/js/show-message.js";

export function addMeal(userId) {
    const mealForm = document.getElementById('meal-form')
    const mealName = document.getElementById('meal-name').value
    const mealDay = document.getElementById('meal-day').value
    const mealType = document.getElementById('meal-type').value
    const mealWeight = document.getElementById('meal-weight').value
    const csrftoken = getCookie('csrftoken');

    const mealObj = {
        'user': userId,
        'product': mealName,
        'meal_day': mealDay,
        'meal_type': mealType,
        'weight': mealWeight
    }

    fetch('add-meal/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken,
        },
        body: JSON.stringify(mealObj),
    })
    .then(() => {
        mealForm.reset();
        buildList();
        showMessage("Meal added", "success")
    })
}