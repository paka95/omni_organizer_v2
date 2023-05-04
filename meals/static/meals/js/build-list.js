import { groupByDays } from "./group-by-days.js";

export function buildList() {
    fetch('add-meal/')
    .then(response => response.json())
    .then(data => {
        const mealsListContainer = document.getElementById('meals-list-container');
        const days = groupByDays(data);
        console.log("====days====");
        console.log(days);
        console.log("====days====");
        for (const day in days) {
            if (Object.keys(days[day]).length !== 0) {

            console.log("day:", day);
            const mealDay = `<div class="meal-day">${day}</div>`;

            const mealDayDiv = document.createElement('div');
            mealDayDiv.innerHTML = mealDay;
            mealsListContainer.appendChild(mealDayDiv);

            // console.log("===");
            // console.log(days[day]);
            // console.log("===");
            }


            // Loop over each meal type for this day
            for (const mealType in days[day]) {
                console.log("test");
                console.log("day", day);
                console.log("mealType", mealType);
                console.log("test");


              const mealTypeHTML = `
              <div class="content-row meal-content-row">
                <label for="meal-row" style="padding-left:10px; color: orange; font-size: 1.5vh">${mealType}</label>
                    <div name="meal-row" class="meal-row">
                        <div class="meal-product-name" style="text-align: center;">Name</div>
                        <div class="separator"></div>
                        <div class="meal-nutrients">Weight [g]</div>
                        <div class="separator"></div>
                        <div class="meal-nutrients">Proteins [g]</div>
                        <div class="separator"></div>
                        <div class="meal-nutrients">Carbs [g]</div>
                        <div class="separator"></div>
                        <div class="meal-nutrients">Fats [g]</div>
                        <div class="separator"></div>
                        <div class="meal-nutrients">Kcal</div>
                    </div>

                    <div class="separator-horizontal"></div>

                    <div id="${day}-${mealType}"></div>

                    <div class="separator-horizontal"></div>

                    <div name="meal-row" class="meal-row">
                        <div class="meal-product-name" style="text-align: center; color:orange">TOTAL</div>
                        <div class="separator"></div>
                        <div class="meal-nutrients">Weight</div>
                        <div class="separator"></div>
                        <div class="meal-nutrients">Proteins</div>
                        <div class="separator"></div>
                        <div class="meal-nutrients">Carbs</div>
                        <div class="separator"></div>
                        <div class="meal-nutrients">Fats</div>
                        <div class="separator"></div>
                        <div class="meal-nutrients">Kcal</div>
                    </div>
                </div>
                </div>
              `;
              const mealTypeDiv = document.createElement('div');
              mealTypeDiv.innerHTML = mealTypeHTML;
              mealsListContainer.appendChild(mealTypeDiv);


              console.log("posilek:", `  ${mealType}:`);



              for (const meal of days[day][mealType]) {
                const mealRowHTML = `
                <div name="meal-row" class="meal-row">
                    <div class="meal-product-name">${meal.product_name}</div>
                    <div class="separator"></div>
                    <div class="meal-nutrients">${meal.weight}</div>
                    <div class="separator"></div>
                    <div class="meal-nutrients">${meal.meal_proteins}</div>
                    <div class="separator"></div>
                    <div class="meal-nutrients">${meal.meal_carbs}</div>
                    <div class="separator"></div>
                    <div class="meal-nutrients">${meal.meal_fats}</div>
                    <div class="separator"></div>
                    <div class="meal-nutrients">${meal.meal_kcal}</div>
                </div>
                `;
                console.log("test2");
                console.log("day2", day);
                console.log("mealType2", mealType);
                console.log("test2");

                const mealRowsContainer = document.getElementById(`${day}-${mealType}`);
                const mealRowDiv = document.createElement('div');
                mealRowDiv.innerHTML = mealRowHTML;
                mealRowsContainer.appendChild(mealRowDiv);


                console.log(`    ${meal.product_name}, ${meal.meal_kcal}`);
              }
            }
          }

    })
}