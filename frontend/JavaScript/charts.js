function createChartDonut(chartElement, label, data, color1, color2, cutoutSize, borderWidth) {
    return new Chart(chartElement, {
        type: "doughnut",
        data: {
            labels: [label, "Remaining"],
            datasets: [{
                data,
                backgroundColor: [color1, color2],
                cutout: cutoutSize,
                borderWidth
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: false }
            }
        }
    });
}

function getRemaining(nutrient) {
    return Math.max(0, limit[nutrient] - consumed[nutrient]);
}

function updateChart(chart, nutrient) {
    chart.data.datasets[0].data = [
        consumed[nutrient],
        getRemaining(nutrient)
    ];
    chart.update();
}

function populatePercentage(element, nutrient) {
    let percent = (consumed[nutrient] / limit[nutrient]) * 100;
    element.innerText = `${percent.toFixed(1)}%`;
}

function populateChartInfo(elementMain, elementSub, nutrient) {
    elementMain.innerText = `${Math.round(consumed[nutrient])} g`;
    elementSub.innerText = `${Math.round(getRemaining(nutrient))} g`;
}
