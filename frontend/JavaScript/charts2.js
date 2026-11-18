console.log(weekIndex + " - " + todayIndex + " - " + hours + ":" + minutes);

const baseColor = "#214c8d";      
const highlightColor = "#3B89FF";

const barColors = days.map((_, index) =>
    index === todayIndex ? highlightColor : baseColor
);

const otherColor = "#a3a3a3ff";
const todayColor = "#ffffffff";

const daysColor = days.map((_, index) =>
    index === todayIndex ? todayColor : otherColor
);

// Buat Chart Bar untuk Weekly Calorie Intake
function createChartBar(chartElement) {
    return new Chart(chartElement, {
        type: "bar",
        data: {
            labels: getDayLabels(), // empty labels
            datasets: [{
                data: weeklyCalories, // bar heights
                backgroundColor: barColors,
                borderRadius: 10,   // 👈 rounded bars
                borderSkipped: false
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: false },
                tooltip: { enabled: false }
            },
            scales: {
                x: {
                    grid: { display: false },
                    ticks: {
                    color: daysColor,   // day labels color
                    font: {
                        weight: "bold"
                        }
                    }
                },
                y: {
                    beginAtZero: true,
                    grid: { color: "#e0e0e06c" },
                    ticks: {
                        color: "#ffffffff",   // day labels color
                        font: {
                            weight: "bold"
                        }
                    }
                }
            }
        }
    });
}

function getDayLabels() {
    return window.innerWidth <= 576 ? daysLetter : days;
}

// Fetch today calorie consumption
async function loadTodayConsumptionCalorie() {
    let calorie = 0;

    if (!userId) return;
    try {
        let response = await fetch(`${BASE_URL}/food-entries/user/${userId}/today`);
        let entries = await response.json();

        entries.forEach(item => {
            calorie += item.calorie;
        });
        
        console.log("Data hari ini berhasil dimuat:", calorie);
        return calorie;

    } catch (err) {
        console.error("Gagal mengambil data harian:", err);
    }
}

// Fetch weekly calorie consumption
async function loadWeeklyConsumptionCalorie() {
    let calorie = 0;

    if (!userId) return;
    try {
        let response = await fetch(`${BASE_URL}/food-entries/user/${userId}/weekly`);
        let entries = await response.json();

        entries.forEach(item => {
            calorie += item.calorie;
        });
        
        console.log("Data minggu ini berhasil dimuat:", calorie);
        return calorie;

    } catch (err) {
        console.error("Gagal mengambil data harian:", err);
    }
}

async function getWeeklyChartData(userId) {
    weeklyCalories.fill(0);

    if (!userId) return weeklyCalories;
    try {
        const response = await fetch(`${BASE_URL}/food-entries/user/${userId}/weekly`);
        
        if (!response.ok) throw new Error("Failed to fetch weekly data");

        const entries = await response.json();

        entries.forEach(entry => {
            const date = new Date(entry.entryDate); 
            const dayOfWeek = date.getDay(); 
            const index = (dayOfWeek + 6) % 7;

            weeklyCalories[index] += Number(entry.calorie);
        });

        console.log("Global Chart Data Updated:", weeklyCalories);
        
        return weeklyCalories;

    } catch (error) {
        console.error("Error preparing chart data:", error);
        return weeklyCalories; 
    }
}

// Mengambil data kalori bulanan untuk calorie history
async function getMonthlyChartData(userId) {
    // Reset array menjadi 0 semua (Panjang array sesuai jumlah hari bulan ini)
    const daysInMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
    
    // Resize array jika perlu
    if (monthlyCalories.length !== daysInMonth) {
        monthlyCalories.length = daysInMonth; 
    }
    monthlyCalories.fill(0);

    if (!userId) return monthlyCalories;

    try {
        const response = await fetch(`${BASE_URL}/food-entries/user/${userId}/monthly`);
        
        if (!response.ok) throw new Error("Failed to fetch monthly data");
        
        const entries = await response.json(); 

        entries.forEach(item => {
            const date = new Date(item.entryDate); 
            const day = date.getDate(); 
            
            const index = day - 1; 

            monthlyCalories[index] += (Number(item.calorie) || 0);
        });

        console.log("Global Chart Data Updated:", monthlyCalories);
        
        return monthlyCalories;

    } catch (error) {
        console.error("Error preparing chart data:", error);
        return monthlyCalories; 
    }
}

// Update Calorie Info on Dashboard
async function updateCalorieInfo(element1, element2) {
    element1.innerText = `${await loadTodayConsumptionCalorie()}`;
    element2.innerText = `${await loadWeeklyConsumptionCalorie()}`;
}

// Membuat HTML item untuk calorie history per satu hari
function addHistoryItem(dateText, calories) {
    const item = document.createElement("div");
    item.className = "history-item";

    const dateP = document.createElement("p");
    dateP.id = "Date";

    const dateSpan = document.createElement("span");
    dateSpan.className = "date-text";
    dateSpan.textContent = dateText;

    dateP.appendChild(dateSpan);

    const calorieP = document.createElement("p");
    calorieP.id = "Calorie";

    const calSpan = document.createElement("span");
    calSpan.className = "cal-text";
    calSpan.innerHTML = `<span>${calories}</span> Cal`;

    calorieP.appendChild(calSpan);

    item.append(dateP, calorieP);

    chartBar.historyList.prepend(item);
}

// Menambahkan calorie history per satu hari ke history list
function generateHistoryByDate() {
    const todayDate = new Date().getDate();

    for (let i = 1; i <= todayDate; i++) {
        addHistoryItem(`Day ${i}`, monthlyCalories[i - 1]);
    }
}

function getFormattedDate() {
    const now = new Date();

    const days = [
        "Monday", "Tuesday", "Wednesday",
        "Thursday", "Friday", "Saturday", "Sunday"
    ];

    const dayName = days[now.getDay()];
    const dayNumber = now.getDate(); // 1–31

    return `${dayName} ${dayNumber}`;
}


// Jalankan fungsi
document.addEventListener("DOMContentLoaded", async () => {
        await fetchSetting();
        await updateCalorieInfo(chartBar.daily, chartBar.weekly, weeklyCalories);
        await getWeeklyChartData(userId)
        await getMonthlyChartData(userId)

        createChartBar(chartBar.weeklyChart);
        generateHistoryByDate();

        console.log("Chart created with data:", weeklyCalories);
});