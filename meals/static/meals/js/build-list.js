import { groupByDays } from "./group-by-days.js";

export function buildList() {
    fetch('add-meal/')
    .then(response => response.json())
    .then(data => {
        const mealsListContainer = document.getElementById('meals-list-container');
        const days = groupByDays(data);
        console.log(days);
        for (const day in days) {
            console.log(day);
            // Loop over each meal type for this day
            for (const mealType in days[day]) {
              console.log(`  ${mealType}:`);
              for (const meal of days[day][mealType]) {
                console.log(`    ${meal.product_name}, ${meal.meal_kcal}`);
              }
            }
          }

    })
}