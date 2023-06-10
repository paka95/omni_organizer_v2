export function totalSummary() {
    const mealsListContainer = document.getElementById('meals-list-container');

    // getting all the elements of total cells as a HTML collection and then at the same time unpacking them,
    // allowing for forEach loop - you can't loop over HTML collection, unpacking makes it an array
    const aggregatedWeightTotals = [...document.getElementsByClassName('weight-totals')]
    const aggregatedProteinsTotals = [...document.getElementsByClassName('proteins-totals')]
    const aggregatedCarbsTotals = [...document.getElementsByClassName('carbs-totals')]
    const aggregatedFatsTotals = [...document.getElementsByClassName('fats-totals')]
    const aggregatedKcalTotals = [...document.getElementsByClassName('kcal-totals')]
    let summaryWeight = 0;
    let averageWeight = 0;
    let summaryProteins = 0;
    let averageProteins = 0;
    let summaryCarbs = 0;
    let averageCarbs = 0;
    let summaryFats = 0;
    let averageFats = 0;
    let summaryKcal = 0;
    let averageKcal = 0;


    // for each element in the array - take its cell with a value and retrieve the value
    // then sum them all up and calculate the average
    aggregatedWeightTotals.forEach(total => {
        summaryWeight += parseFloat(total.innerHTML);
        averageWeight += parseFloat(total.innerHTML);
    })
    averageWeight = averageWeight / aggregatedWeightTotals.length


    aggregatedProteinsTotals.forEach(total => {
        summaryProteins += parseFloat(total.innerHTML);
        averageProteins += parseFloat(total.innerHTML);
    })
    averageProteins = averageProteins / aggregatedProteinsTotals.length


    aggregatedCarbsTotals.forEach(total => {
        summaryCarbs += parseFloat(total.innerHTML);
        averageCarbs += parseFloat(total.innerHTML);
    })
    averageCarbs = averageCarbs / aggregatedCarbsTotals.length


    aggregatedFatsTotals.forEach(total => {
        summaryFats += parseFloat(total.innerHTML);
        averageFats += parseFloat(total.innerHTML);
    })
    averageFats = averageFats / aggregatedFatsTotals.length


    aggregatedKcalTotals.forEach(total => {
        summaryKcal += parseFloat(total.innerHTML);
        averageKcal += parseFloat(total.innerHTML);
    })
    averageKcal = averageKcal / aggregatedKcalTotals.length

    const average = 
    `<div class="content-row summary-average-row">
        <div class="total-row">
            <div class="meal-product-name" style="text-align: center; color:white">AVERAGE</div>
            <div class="separator"></div>
            <div class="meal-nutrients day-nutrients-total">${averageWeight.toFixed(2)}</div>
            <div class="separator"></div>
            <div class="meal-nutrients day-nutrients-total">${averageProteins.toFixed(2)}</div>
            <div class="separator"></div>
            <div class="meal-nutrients day-nutrients-total">${averageCarbs.toFixed(2)}</div>
            <div class="separator"></div>
            <div class="meal-nutrients day-nutrients-total">${averageFats.toFixed(2)}</div>
            <div class="separator"></div>
            <div class="meal-nutrients day-nutrients-total">${averageKcal.toFixed(2)}</div>
            <div class="separator"></div>
            <div class="meal-nutrients meal-nutrients-flex"></div>
        </div>
    </div>`;

    const summary = 
    `<div class="content-row summary-average-row">
        <div class="total-row">
            <div class="meal-product-name" style="text-align: center; color:white">SUMMARY</div>
            <div class="separator"></div>
            <div class="meal-nutrients day-nutrients-total">${summaryWeight.toFixed(2)}</div>
            <div class="separator"></div>
            <div class="meal-nutrients day-nutrients-total">${summaryProteins.toFixed(2)}</div>
            <div class="separator"></div>
            <div class="meal-nutrients day-nutrients-total">${summaryCarbs.toFixed(2)}</div>
            <div class="separator"></div>
            <div class="meal-nutrients day-nutrients-total">${summaryFats.toFixed(2)}</div>
            <div class="separator"></div>
            <div class="meal-nutrients day-nutrients-total">${summaryKcal.toFixed(2)}</div>
            <div class="separator"></div>
            <div class="meal-nutrients meal-nutrients-flex"></div>
        </div>
    </div>`;
    
    const averageDiv = document.createElement('div');
    const summaryDiv = document.createElement('div');
    averageDiv.innerHTML = average;
    summaryDiv.innerHTML = summary;
    mealsListContainer.appendChild(averageDiv);
    mealsListContainer.appendChild(summaryDiv);
}