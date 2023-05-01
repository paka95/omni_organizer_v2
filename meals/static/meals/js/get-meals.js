import { addProduct } from "./add-product.js";
import { populateProducts } from "./populate-products.js";
import { addMeal } from "./add-meal.js";

document.addEventListener("DOMContentLoaded", () => {
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
        addMeal();
    })
});