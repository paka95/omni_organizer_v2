import { addProduct } from "./add-product.js";
import { populateProducts } from "./populate-products.js";
import { addMeal } from "./add-meal.js";
import { buildList } from "./build-list.js";
import { getCookie } from "./get-cookie.js";
import { showMessage } from "../../../../static/js/show-message.js";

const csrftoken = getCookie('csrftoken');

document.addEventListener("DOMContentLoaded", () => {
    // after template onload build the list of meals
    buildList();

    const addProductBtn = document.getElementById("product-add-btn");
    addProductBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const productName = document.getElementById('product-name').value
        const productType = document.getElementById('product-type').value
        const proteins = document.getElementById('proteins').value
        const carbs = document.getElementById('carbs').value
        const fats = document.getElementById('fats').value
        const kcal = document.getElementById('kcal').value

        // checking if the enter values are not empty and if they are not negative
        if (productName == "" || productType == "" || proteins == "" || carbs == "" || fats == "" || kcal == ""){
            showMessage("You can't leave an empty value", "error")
        } else {
            if (isNaN(proteins) || isNaN(carbs) || isNaN(fats) || isNaN(kcal)) {
                showMessage("Nutrients must be numbers", "error")
            } else if (proteins < 0 || carbs < 0 || fats < 0 || kcal < 0) {
                showMessage("Value can't be negative", "error")
            } else {
                addProduct();
                showMessage("Meal added", "success")
            }
        }
    })


    const mealType = document.getElementById("meal-product-type");
    mealType.addEventListener('change', (e) => {
        e.preventDefault();
        // while adding a new meal - populate the meal name select field after specifying its type
        populateProducts(mealType);
    })


    const addMealBtn = document.getElementById("meal-add-btn");
    addMealBtn.addEventListener('click', (e) => {
        e.preventDefault();

        const mealProductType = document.getElementById('meal-product-type').value
        const mealName = document.getElementById('meal-name').value
        const mealDay = document.getElementById('meal-day').value
        const mealType = document.getElementById('meal-type').value
        const mealWeight = document.getElementById('meal-weight').value

        // checking if the enter values are not empty and if they are not negative

        if (mealProductType == "" || mealName == "" || mealDay == "" || mealType == "" || mealWeight == ""){
            showMessage("You can't leave an empty value", "error")
        } else {
            if (isNaN(mealWeight)) {
                showMessage("Weight must be a number", "error")
            } else if (mealWeight < 0) {
                showMessage("Weight can't be negative", "error")
            } else {
                fetch('get-user-id/', {
                    method: 'GET',
                    headers: {
                        'X-CSRFToken': csrftoken,
                    },
                })
                .then(response => response.json())
                .then(data => {
                    const userId = data.user_id;
                    addMeal(userId);
                });
            }
        }
    })
});






