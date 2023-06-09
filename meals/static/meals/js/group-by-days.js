export function groupByDays(meals) {
    const days = {
        monday: {},
        tuesday: {},
        wednesday: {},
        thursday: {},
        friday: {},
        saturday: {},
        sunday: {},
      };
    
      meals.forEach((meal) => {
        const { meal_day, meal_type } = meal;
    
        // if there is no meal of a given type in a given day, apply the empty array to that meal type
        if (!days[meal_day][meal_type]) {
          days[meal_day][meal_type] = [];
        }
    
        days[meal_day][meal_type].push(meal);
      });
    
      return days;
}