import { deleteMeal } from "./delete-meal.js";
// import { editMeal } from "./edit-meal.js";
import { groupByDays } from "./group-by-days.js";

export function buildList() {
    const mealsListContainer = document.getElementById('meals-list-container');
    mealsListContainer.innerHTML = ''

    fetch('add-meal/')
    .then(response => response.json())
    .then(data => {
        const days = groupByDays(data);

        const isEmpty = Object.keys(days).every(key => {
          return Object.keys(days[key]).length === 0;
        });

        if (isEmpty) {
          const noMeals = `<div class="meal-content-row" style="color:white">You have no meals yet</div>`;

          const mealDayDiv = document.createElement('div');
          mealDayDiv.innerHTML = noMeals;
          mealsListContainer.appendChild(mealDayDiv);
        } else {
            for (const day in days) {
                if (Object.keys(days[day]).length !== 0) {
                    const mealDay = `<div class="meal-day">${day.charAt(0).toUpperCase() + day.slice(1)}</div>`;
                    const mealDayDiv = document.createElement('div');
                    mealDayDiv.innerHTML = mealDay;
                    mealsListContainer.appendChild(mealDayDiv);

                    let totalWeightDay = 0;
                    let totalProteinsDay = 0;
                    let totalCarbsDay = 0;
                    let totalFatsDay = 0;
                    let totalKcalDay = 0;
                    // Loop over each meal type for this day
                    for (const mealType in days[day]) {
                        const formattedMealType = mealType === 'second_breakfast' ? 'Second Breakfast' : mealType.charAt(0).toUpperCase() + mealType.slice(1);
                        const mealTypeHTML = `
                        <div class="content-row meal-content-row">
                          <label for="meal-row" style="padding-left:10px; color: orange; font-size: 1.5vh">${formattedMealType}</label>
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
                                  <div class="separator"></div>
                                  <div class="meal-nutrients meal-nutrients-flex"></div>
                              </div>

                              <div class="separator-horizontal"></div>

                              <div id="${day}-${mealType}"></div>

                              <div class="separator-horizontal"></div>

                              <div name="meal-row" class="meal-row">
                                  <div class="meal-product-name" style="text-align: center; color:orange"></div>
                                  <div class="separator"></div>
                                  <div class="meal-nutrients meal-nutrients-total" id="total-meal-weight-${day}-${mealType}"></div>
                                  <div class="separator"></div>
                                  <div class="meal-nutrients meal-nutrients-total" id="total-meal-proteins-${day}-${mealType}"></div>
                                  <div class="separator"></div>
                                  <div class="meal-nutrients meal-nutrients-total" id="total-meal-carbs-${day}-${mealType}"></div>
                                  <div class="separator"></div>
                                  <div class="meal-nutrients meal-nutrients-total" id="total-meal-fats-${day}-${mealType}"></div>
                                  <div class="separator"></div>
                                  <div class="meal-nutrients meal-nutrients-total" id="total-meal-kcal-${day}-${mealType}"></div>
                                  <div class="separator"></div>
                                  <div class="meal-nutrients meal-nutrients-flex"></div>
                              </div>
                          </div>
                          </div>
                        `;
                        const mealTypeDiv = document.createElement('div');
                        mealTypeDiv.innerHTML = mealTypeHTML;
                        mealsListContainer.appendChild(mealTypeDiv);

                        for (const meal of days[day][mealType]) {
                            const mealRowHTML = `
                            <div name="meal-row" class="meal-row" id="meal-${meal.id}">
                                <div class="meal-product-name">${meal.product_name}</div>
                                <div class="separator"></div>
                                <div class="meal-nutrients meal-weight-${day}-${mealType} weight">${meal.weight.toFixed(2)}</div>
                                <div class="separator"></div>
                                <div class="meal-nutrients meal-proteins-${day}-${mealType}">${meal.meal_proteins.toFixed(2)}</div>
                                <div class="separator"></div>
                                <div class="meal-nutrients meal-carbs-${day}-${mealType}">${meal.meal_carbs.toFixed(2)}</div>
                                <div class="separator"></div>
                                <div class="meal-nutrients meal-fats-${day}-${mealType}">${meal.meal_fats.toFixed(2)}</div>
                                <div class="separator"></div>
                                <div class="meal-nutrients meal-kcal-${day}-${mealType}">${meal.meal_kcal.toFixed(2)}</div>
                                <div class="separator"></div>
                                <div class="meal-nutrients meal-nutrients-flex">
                                    <div class="delete-btn" title="Delete meal">
                                        <i class="fa-solid fa-trash-alt"></i>
                                    </div>
                                </div>
                            </div>
                            `;

                            const mealRowsContainer = document.getElementById(`${day}-${mealType}`);
                            const mealRowDiv = document.createElement('div');
                            mealRowDiv.innerHTML = mealRowHTML;
                            mealRowsContainer.appendChild(mealRowDiv);
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
                        totalMealWeight.innerHTML = mealWeightSum.toFixed(2);
                        totalWeightDay += parseFloat(mealWeightSum.toFixed(2));

                        mealProteinsCells.forEach(cell => {
                          mealProteinsSum += parseFloat(cell.innerHTML);
                        })
                        totalMealProteins.innerHTML = mealProteinsSum.toFixed(2);
                        totalProteinsDay += parseFloat(mealProteinsSum.toFixed(2));

                        mealCarbsCells.forEach(cell => {
                          mealCarbsSum += parseFloat(cell.innerHTML);
                        })
                        totalMealCarbs.innerHTML = mealCarbsSum.toFixed(2);
                        totalCarbsDay += parseFloat(mealCarbsSum.toFixed(2));

                        mealFatsCells.forEach(cell => {
                          mealFatsSum += parseFloat(cell.innerHTML);
                        })
                        totalMealFats.innerHTML = mealFatsSum.toFixed(2);
                        totalFatsDay += parseFloat(mealFatsSum.toFixed(2));

                        mealKcalCells.forEach(cell => {
                          mealKcalSum += parseFloat(cell.innerHTML);
                        })
                          totalMealKcal.innerHTML = mealKcalSum.toFixed(2);  
                          totalKcalDay += parseFloat(mealKcalSum.toFixed(2));           
                    }
                    
                    const mealDayTotal = `<div class="content-row total-content-row">
                          <div class="total-row">
                          <div class="meal-product-name" style="text-align: center; color:orange">total on ${day}</div>
                          <div class="separator"></div>
                          <div class="meal-nutrients day-nutrients-total" id="total-${day}-weight">${totalWeightDay.toFixed(2)}</div>
                          <div class="separator"></div>
                          <div class="meal-nutrients day-nutrients-total" id="total-${day}-proteins">${totalProteinsDay.toFixed(2)}</div>
                          <div class="separator"></div>
                          <div class="meal-nutrients day-nutrients-total" id="total-${day}-carbs">${totalCarbsDay.toFixed(2)}</div>
                          <div class="separator"></div>
                          <div class="meal-nutrients day-nutrients-total" id="total-${day}-fats">${totalFatsDay.toFixed(2)}</div>
                          <div class="separator"></div>
                          <div class="meal-nutrients day-nutrients-total" id="total-${day}-kcal">${totalKcalDay.toFixed(2)}</div>
                          <div class="separator"></div>
                          <div class="meal-nutrients meal-nutrients-flex"></div>
                      </div>
                    </div>`;
                    
                    const mealDayTotalDiv = document.createElement('div');
                    mealDayTotalDiv.innerHTML = mealDayTotal;
                    mealsListContainer.appendChild(mealDayTotalDiv);
              } 
            }
        }
          const deleteButtons = document.getElementsByClassName('delete-btn')
          // const editButtons = document.getElementsByClassName('fa-pen')
          deleteMeal(deleteButtons);
          // editMeal(editButtons);
    })
}