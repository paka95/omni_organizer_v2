import { getCookie } from "./get-cookie.js"
import { showMessage } from "../../../../static/js/show-message.js"

export function addProduct() {
    const productForm = document.getElementById('product-form')
    const productName = document.getElementById('product-name').value
    const productType = document.getElementById('product-type').value
    const proteins = document.getElementById('proteins').value
    const carbs = document.getElementById('carbs').value
    const fats = document.getElementById('fats').value
    const kcal = document.getElementById('kcal').value
    const csrftoken = getCookie('csrftoken');

    const productData = {
        'name': productName,
        'type': productType,
        'proteins': proteins,
        'carbs': carbs,
        'fats': fats,
        'kcal': kcal
    }

    fetch('add-product/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken,
        },
        body: JSON.stringify(productData),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        showMessage("Product added", "success")
    })
    .catch(error => console.error(error));
    productForm.reset();
}