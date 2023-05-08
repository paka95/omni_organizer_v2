import { groupByDays } from "./group-by-days.js";

export function buildList() {
    const mealsListContainer = document.getElementById('meals-list-container');
    mealsListContainer.innerHTML = ''

    fetch('add-meal/')
    .then(response => response.json())
    .then(data => {
        // const mealsListContainer = document.getElementById('meals-list-container');
        const days = groupByDays(data);
        // console.log("====days====");
        // console.log(days);
        // console.log("====days====");
        for (const day in days) {
            if (Object.keys(days[day]).length !== 0) {

            // console.log("day:", day);
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
                // console.log("test");
                // console.log("day", day);
                // console.log("mealType", mealType);
                // console.log("test");


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
                        <div class="meal-nutrients" id="total-meal-weight-${day}-${mealType}">Weight</div>
                        <div class="separator"></div>
                        <div class="meal-nutrients" id="total-meal-proteins-${day}-${mealType}">Proteins</div>
                        <div class="separator"></div>
                        <div class="meal-nutrients" id="total-meal-carbs-${day}-${mealType}">Carbs</div>
                        <div class="separator"></div>
                        <div class="meal-nutrients" id="total-meal-fats-${day}-${mealType}">Fats</div>
                        <div class="separator"></div>
                        <div class="meal-nutrients" id="total-meal-kcal-${day}-${mealType}">Kcal</div>
                    </div>
                </div>
                </div>
              `;
              const mealTypeDiv = document.createElement('div');
              mealTypeDiv.innerHTML = mealTypeHTML;
              mealsListContainer.appendChild(mealTypeDiv);


            //   console.log("posilek:", `  ${mealType}:`);



              for (const meal of days[day][mealType]) {
                const mealRowHTML = `
                <div name="meal-row" class="meal-row">
                    <div class="meal-product-name">${meal.product_name}</div>
                    <div class="separator"></div>
                    <div class="meal-nutrients meal-weight-${day}-${mealType}">${meal.weight.toFixed(2)}</div>
                    <div class="separator"></div>
                    <div class="meal-nutrients meal-proteins-${day}-${mealType}">${meal.meal_proteins.toFixed(2)}</div>
                    <div class="separator"></div>
                    <div class="meal-nutrients meal-carbs-${day}-${mealType}">${meal.meal_carbs.toFixed(2)}</div>
                    <div class="separator"></div>
                    <div class="meal-nutrients meal-fats-${day}-${mealType}">${meal.meal_fats.toFixed(2)}</div>
                    <div class="separator"></div>
                    <div class="meal-nutrients meal-kcal-${day}-${mealType}">${meal.meal_kcal.toFixed(2)}</div>
                </div>
                `;




                // console.log("test2");
                // console.log("day2", day);
                // console.log("mealType2", mealType);
                // console.log("test2");

                const mealRowsContainer = document.getElementById(`${day}-${mealType}`);
                const mealRowDiv = document.createElement('div');
                mealRowDiv.innerHTML = mealRowHTML;
                mealRowsContainer.appendChild(mealRowDiv);


                // console.log(`    ${meal.product_name}, ${meal.meal_kcal}`);
              }

              const mealWeightCells = document.querySelectorAll(`.meal-weight-${day}-${mealType}`);
              const totalMealWeight = document.getElementById(`total-meal-weight-${day}-${mealType}`);
              let mealWeightSum = 0

              const mealProteinsCells = document.querySelectorAll(`.meal-proteins-${day}-${mealType}`);
              const totalMealProteins = document.getElementById(`total-meal-proteins-${day}-${mealType}`);
              let mealProteinsSum = 0

              const mealCarbsCells = document.querySelectorAll(`.meal-carbs-${day}-${mealType}`);
              const totalMealCarbs = document.getElementById(`total-meal-carbs-${day}-${mealType}`);
              let mealCarbsSum = 0

              const mealFatsCells = document.querySelectorAll(`.meal-fats-${day}-${mealType}`);
              const totalMealFats = document.getElementById(`total-meal-fats-${day}-${mealType}`);
              let mealFatsSum = 0

              const mealKcalCells = document.querySelectorAll(`.meal-kcal-${day}-${mealType}`);
              const totalMealKcal = document.getElementById(`total-meal-kcal-${day}-${mealType}`);
              let mealKcalSum = 0

              mealWeightCells.forEach(cell => {
                mealWeightSum += parseFloat(cell.innerHTML);
              })
            //   if (Number.isInteger(mealWeightSum)) {
            //     totalMealWeight.innerHTML = mealWeightSum
            //   } else {
            //     totalMealWeight.innerHTML = mealWeightSum.toFixed(2);
            //   }
              totalMealWeight.innerHTML = mealWeightSum.toFixed(2);

              mealProteinsCells.forEach(cell => {
                mealProteinsSum += parseFloat(cell.innerHTML);
              })
              totalMealProteins.innerHTML = mealProteinsSum.toFixed(2);

              mealCarbsCells.forEach(cell => {
                mealCarbsSum += parseFloat(cell.innerHTML);
              })
              totalMealCarbs.innerHTML = mealCarbsSum.toFixed(2);

              mealFatsCells.forEach(cell => {
                mealFatsSum += parseFloat(cell.innerHTML);
              })
              totalMealFats.innerHTML = mealFatsSum.toFixed(2);

              mealKcalCells.forEach(cell => {
                mealKcalSum += parseFloat(cell.innerHTML);
              })
            //   if (Number.isInteger(mealKcalSum)) {
            //     totalMealKcal.innerHTML = mealKcalSum
            //   } else {
                totalMealKcal.innerHTML = mealKcalSum.toFixed(2);
            //   }
              



            //   console.log(mealWeightSum);


                // let fields = document.querySelectorAll('#your-id input');
                // let sum = 0;

                // fields.forEach(field => {
                // sum += parseFloat(field.value);
                // });

            }
          }

    })
}