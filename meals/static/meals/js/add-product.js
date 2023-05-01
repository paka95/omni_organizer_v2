import { getCookie } from "./get-cookie.js"

export function addProduct() {
    const productForm = document.getElementById('product-form')
    const productName = document.getElementById('product-name')
    const productType = document.getElementById('product-type')
    const proteins = document.getElementById('proteins')
    const carbs = document.getElementById('carbs')
    const fats = document.getElementById('fats')
    const kcal = document.getElementById('kcal')
    const csrftoken = getCookie('csrftoken');

    const productData = {
        'name': productName.value,
        'type': productType.value,
        'proteins': proteins.value,
        'carbs': carbs.value,
        'fats': fats.value,
        'kcal': kcal.value
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
    })
    .catch(error => console.error(error));


    productForm.reset();
    // console.log(product);
}