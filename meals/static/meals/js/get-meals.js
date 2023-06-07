import { addProduct } from "./add-product.js";
import { populateProducts } from "./populate-products.js";
import { addMeal } from "./add-meal.js";
import { buildList } from "./build-list.js";
import { getCookie } from "./get-cookie.js";
import { showError } from "./show-error.js";

const csrftoken = getCookie('csrftoken');

document.addEventListener("DOMContentLoaded", () => {
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
        const productForm = document.getElementById('product-form')

        if (productName == "" || productType == "" || proteins == "" || carbs == "" || fats == "" || kcal == ""){
            showError("You can't leave an empty value");
        } else {
            if (proteins < 0 || carbs < 0 || fats < 0 || kcal < 0) {
                showError("Value can't be negative");
            } else {
                addProduct();
            }
        }
    })


    const mealType = document.getElementById("meal-product-type");
    mealType.addEventListener('change', (e) => {
        e.preventDefault();
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
        const mealForm = document.getElementById('meal-form')

        if (mealProductType == "" || mealName == "" || mealDay == "" || mealType == "" || mealWeight == ""){
            showError("You can't leave an empty value");
        } else {
            if (mealWeight < 0) {
                showError("Weight can't be negative");
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






