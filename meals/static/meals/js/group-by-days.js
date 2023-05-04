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
    
        if (!days[meal_day][meal_type]) {
          days[meal_day][meal_type] = [];
        }
    
        days[meal_day][meal_type].push(meal);
      });
    
      return days;
}