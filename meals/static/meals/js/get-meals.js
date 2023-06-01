import { addProduct } from "./add-product.js";
import { populateProducts } from "./populate-products.js";
import { addMeal } from "./add-meal.js";
import { buildList } from "./build-list.js";
import { getCookie } from "./get-cookie.js";

const csrftoken = getCookie('csrftoken');

document.addEventListener("DOMContentLoaded", () => {
    buildList();



    const addProductBtn = document.getElementById("product-add-btn");
    addProductBtn.addEventListener('click', (e) => {
        e.preventDefault();
        addProduct();
    })


    const mealType = document.getElementById("meal-product-type");
    mealType.addEventListener('change', (e) => {
        e.preventDefault();
        populateProducts(mealType);
    })


    const addMealBtn = document.getElementById("meal-add-btn");
    addMealBtn.addEventListener('click', (e) => {
        e.preventDefault();
        // addMeal();
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
    })
});