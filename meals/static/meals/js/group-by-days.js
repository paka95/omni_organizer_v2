export function groupByDays(meals) {
    // const days = {
    //     monday: [],
    //     tuesday: [],
    //     wednesday: [],
    //     thursday: [],
    //     friday: [],
    //     saturday: [],
    //     sunday: []
    // }
    // meals.forEach(meal => {
    //     console.log(meal.meal_day);
    //     switch (meal.meal_day) {
    //         case 'monday':
    //             days['monday'].push(meal);
    //           break;
    //         case 'tuesday':
    //             days['tuesday'].push(meal);
    //           break;
    //         case 'wednesday':
    //             days['wednesday'].push(meal);
    //           break;
    //         case 'thursday':
    //             days['thursday'].push(meal);
    //           break;
    //         case 'friday':
    //             days['friday'].push(meal);
    //           break;
    //         case 'saturday':
    //             days['saturday'].push(meal);
    //           break;
    //         case 'sunday':
    //             days['sunday'].push(meal);
    //           break;
    //       }
    // })
    // return days;

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