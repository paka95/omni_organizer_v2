export function populateProducts(mealType) {
    fetch(`get-products/?type=${mealType.value}`)
        .then(response => response.json())
        // .then(data => console.log(data));
        .then((data) => {
            const mealName = document.getElementById('meal-name');
            mealName.innerHTML = ''

            if (data.length > 0) {
            mealName.disabled = false;
            data.forEach(product => {
                const option = document.createElement('option');
                // console.log(product);
                option.value = product.id;
                option.text = product.name;
                mealName.add(option);
              });
            } else {
                mealName.disabled = true;
                const option = document.createElement('option');
                option.value = ''
                option.text = 'No products'
                mealName.add(option);
            }
        });
}