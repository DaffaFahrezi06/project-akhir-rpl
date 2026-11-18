// Create Chart
const chartNutrient = {
    calorie: createChartDonut(chart.calorie, "Calorie", [0, limit.calorie], appearance.color.calorie, appearance.color.remaining, appearance.cutout.big, 0),
    carb: createChartDonut(chart.carb, "Carb", [0, limit.carb], appearance.color.carb, appearance.color.remaining, appearance.cutout.small, 0),
    fat: createChartDonut(chart.fat, "Fat", [0, limit.fat], appearance.color.fat, appearance.color.remaining, appearance.cutout.small, 0),
    sugar: createChartDonut(chart.sugar, "Sugar", [0, limit.sugar], appearance.color.sugar, appearance.color.remaining, appearance.cutout.small, 0),
    protein: createChartDonut(chart.protein, "Protein", [0, limit.protein], appearance.color.protein, appearance.color.remaining, appearance.cutout.small, 0)
};

Object.keys(percentage).forEach(nutrient => {
    populatePercentage(percentage[nutrient], nutrient);
});


// Autocalculate Food Nutrients
addButton.auto.addEventListener("click", () => {
    let food = autoInput.food.value;
    let amount = Number(autoInput.amount.value);

    if (food == 0 || food.length < 3) {
        alert("Plese Enter Valid Food Name (Minimum 3 Characters)");
    } else if (amount <= 0 || amount > 1000) {
        alert("Plese Enter Valid Amount (1 - 1000gr)");
    } else {
        let calorie, carb, fat, sugar, protein;

        // SKENARIO 1: User memilih makanan dari Database (Autocomplete)
        if (selectedFoodData && selectedFoodData.name === food) {
            // Rumus: (Input User / Serving Size DB) * Nutrisi DB
            let ratio = amount / selectedFoodData.serving;

            calorie = Math.round(selectedFoodData.calorie * ratio);
            carb    = parseFloat((selectedFoodData.carb * ratio).toFixed(1));
            fat     = parseFloat((selectedFoodData.fat * ratio).toFixed(1));
            sugar   = parseFloat((selectedFoodData.sugar * ratio).toFixed(1));
            protein = parseFloat((selectedFoodData.protein * ratio).toFixed(1));
        
        } 
        // SKENARIO 2: User mengetik manual makanan yang tidak ada di DB (Custom)
        else {
            // Kita pakai logika PLACEHOLDER kamu sebagai fallback
            // Atau kamu bisa tolak (alert "Makanan tidak dikenali")
            let placeHolderValue = 10; // Asumsi ini per 100g? sesuaikan logikamu
            
            // Asumsi rumus placeholder kamu: (amount / 100) * 10
            calorie = Math.round((amount / 10) * placeHolderValue); 
            carb    = parseFloat(((amount / 100) * placeHolderValue).toFixed(1));
            fat     = parseFloat(((amount / 100) * placeHolderValue).toFixed(1));
            sugar   = parseFloat(((amount / 100) * placeHolderValue).toFixed(1));
            protein = parseFloat(((amount / 100) * placeHolderValue).toFixed(1));

            console.warn("Menggunakan Data Placeholder (Makanan tidak ditemukan di DB)");
        }

        //const strMessage = "Succesfully Inserted " + food + " (" + calorie + " Calories)\nCarb : " + carb + "gr\nFat : " + fat + "gr\nSugar : " + sugar + "gr\nProtein : " + protein + "gr";
        //alert(strMessage);

        let foodEntryData = {
            userId: localStorage.getItem("userId"), // Mengambil ID dari saat login
            foodName: food,
            amount: amount,
            calorie: Math.round(calorie),
            carb: parseFloat(carb.toFixed(1)),
            fat: parseFloat(fat.toFixed(1)),
            sugar: parseFloat(sugar.toFixed(1)),
            protein: parseFloat(protein.toFixed(1))
        };

        console.log("Sending to Backend:", foodEntryData);

        // Database Operation
        fetch(`${BASE_URL}/food-entries`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(foodEntryData)
        })
        .then(response => {
            if (!response.ok) throw new Error('Gagal simpan');
            return response.json();
        })
        .then(data => {
            // UPDATE UI HANYA JIKA DATABASE BERHASIL MENYIMPAN
            if(localStorage.getItem("inputNotification") === "true") {
                alert(`Succesfully Inserted ${food} (${foodEntryData.calorie} Calories)`);
            }

            //Variabel Lokal
            consumed.carb += carb;
            consumed.fat += fat;
            consumed.sugar += sugar;
            consumed.protein += protein;
            consumed.calorie += calorie;

            Object.keys(chartNutrient).forEach(nutrient => {
                updateChart(chartNutrient[nutrient], nutrient);
                populatePercentage(percentage[nutrient], nutrient);
            });

            //Menambahkan Food History Disamping sekilas (eksklusif Desktop)
            addRecentFood(food, amount, calorie, carb, fat, sugar, protein);
            //addRecentWater(500);
        })

        console.log({amount, calorie, carb, fat, sugar, protein});
        console.log("Consumed totals:", consumed);
    };
});


// Manually calculate Food Nutrients
addButton.manual.addEventListener("click", () => {
    let food = manualInput.food.value;
    let amount = Number(manualInput.amount.value);

    if (food == 0 || food.length < 3) {
        alert("Plese Enter Valid Food Name (Minimum 3 Characters)");
    } else if (amount <= 0 || amount > 1000) {
        alert("Plese Enter Valid Amount (1 - 1000gr)");
    } else if (Number(manualInput.carb.value) < 0 ||  Number(manualInput.carb.value) >= 100 ||
                Number(manualInput.fat.value) < 0 ||  Number(manualInput.fat.value) >= 100 ||
                Number(manualInput.sugar.value) < 0 ||  Number(manualInput.sugar.value) >= 100 ||
                Number(manualInput.protein.value) < 0 ||  Number(manualInput.protein.value) >= 100) {
        alert("Plese Enter Valid Nutrient Amount per 100gr (0 - 99gr)");
    } else if (Number(manualInput.calorie.value) < 0 ||  Number(manualInput.calorie.value) >= 1000){
        alert("Plese Enter Valid Calorie Amount per 100gr (0 - 999gr)");}
    else {
        let carb = (amount / 100) * Number(manualInput.carb.value);
        let fat = (amount / 100) * Number(manualInput.fat.value);
        let sugar = (amount / 100) * Number(manualInput.sugar.value);
        let protein = (amount / 100) * Number(manualInput.protein.value);
        let calorie = (amount / 100) * Number(manualInput.calorie.value);

        //const strMessage = "Succesfully Inserted " + food + " (" + calorie + " Calories)\nCarb : " + carb + "gr\nFat : " + fat + "gr\nSugar : " + sugar + "gr\nProtein : " + protein + "gr";
        //alert(strMessage);

        let foodEntryData = {
            userId: localStorage.getItem("userId"), // Mengambil ID dari saat login
            foodName: food,
            amount: amount,
            calorie: Math.round(calorie),
            carb: parseFloat(carb.toFixed(1)),
            fat: parseFloat(fat.toFixed(1)),
            sugar: parseFloat(sugar.toFixed(1)),
            protein: parseFloat(protein.toFixed(1))
        };

        console.log("Sending to Backend:", foodEntryData);

        // Database Operation
        fetch(`${BASE_URL}/food-entries`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(foodEntryData)
        })
        .then(response => {
            if (!response.ok) throw new Error('Gagal simpan');
            return response.json();
        })
        .then(data => {
            // UPDATE UI HANYA JIKA DATABASE BERHASIL MENYIMPAN
            if(localStorage.getItem("inputNotification") === "true") {
                alert(`Succesfully Inserted ${food} (${foodEntryData.calorie} Calories)`);
            }
            
            //Variabel Lokal
            consumed.carb += carb;
            consumed.fat += fat;
            consumed.sugar += sugar;
            consumed.protein += protein;
            consumed.calorie += calorie;

            Object.keys(chartNutrient).forEach(nutrient => {
                updateChart(chartNutrient[nutrient], nutrient);
                populatePercentage(percentage[nutrient], nutrient);
            });

            //Mebambahkan Food History Disamping sekilas (eksklusif Desktop)
            addRecentFood(food, amount, calorie, carb, fat, sugar, protein);
        })
        .catch(err => alert("Gagal menyambung ke server!"))
        console.log({amount, calorie, carb, fat, sugar, protein});
        console.log("Consumed totals:", consumed);
    };
});


// Food History for a single food
function addRecentFood(food, amount, calorie, carb, fat, sugar, protein) {
  const item = document.createElement("div");
  item.className = "history-item";

  const nameP = document.createElement("p");
  nameP.className = "name";
  nameP.textContent = food + " (" + amount + "gr)";

  const nutrientP = document.createElement("p");
  nutrientP.className = "nutrient";
  nutrientP.style.display = "flex";
  nutrientP.style.justifyContent = "space-between";

  nutrientP.innerHTML = `
    <span class="cal">🔥 ${Math.round(calorie)} cal</span>
    <span class="carb">🍚 ${Math.round(carb)} g</span>
    <span class="fat">🥑 ${Math.round(fat)} g</span>
    <span class="sugar">🍬 ${Math.round(sugar)} g</span>
    <span class="protein">🥩 ${Math.round(protein)} g</span>
  `;

  item.append(nameP, nutrientP);
  foodHistory.prepend(item);
}


// Food history for a single water drink
function addRecentWater(hydration) {
  const item = document.createElement("div");
  item.className = "history-item";

  const drinkP = document.createElement("p");
  drinkP.className = "drink-name";
  drinkP.textContent = "Water (" + hydration + "ml)";

  const hydrationP = document.createElement("p");
  hydrationP.className = "hydration";

  hydrationP.innerHTML = `
    💧 <span class="water">${Math.round(hydration)}</span> ml
  `;

  item.append(drinkP, hydrationP);
  foodHistory.prepend(item);
}


// Remind to eat
function remindEat() {
    if(hours === 7 || hours === 8) {
        eatReminder.innerHTML = 'Breakfast';
        ReminderContainer.style.backgroundColor = '#3B89FF';
    } else if(hours === 12 || hours === 13) {
        eatReminder.innerHTML = 'Lunch';
        ReminderContainer.style.backgroundColor = '#3B89FF';
    } else if(hours === 18 || hours === 19) {
        eatReminder.innerHTML = 'Dinner';
        ReminderContainer.style.backgroundColor = '#3B89FF';
    } else {
        eatReminder.innerHTML = '';
    };
};


// Eat Reminder Notification
function alertEat() {
    if((hours === 7 || hours === 8) && localStorage.getItem("reminderNotification") === "true") {
        alert('Time to Eat Breakfast!');
    } else if((hours === 12 || hours === 13) && localStorage.getItem("reminderNotification") === "true") {
        alert('Time to Eat Lunch!');
    } else if((hours === 18 || hours === 19 ) && localStorage.getItem("reminderNotification") === "true") {
        alert('Time to Eat Dinner!');
    } else;    
}


// Load consumption history on history list and chart
async function loadTodayConsumption() {
    if (!userId) return;

    try {
        let response = await fetch(`${BASE_URL}/food-entries/user/${userId}/today`);
        let entries = await response.json();

            // Reset total konsumsi lokal sebelum menghitung ulang
            consumed.calorie = 0;
            consumed.carb = 0;
            consumed.fat = 0;
            consumed.protein = 0;
            consumed.sugar = 0;

            entries.forEach(item => {
                if (item.foodName === 'Water' || item.foodName === 'water') {
                    consumed.hydration += item.water;

                    addRecentWater(item.water);
                } else {
                    consumed.calorie += item.calorie;
                    consumed.carb += item.carb;
                    consumed.fat += item.fat;
                    consumed.protein += item.protein;
                    consumed.sugar += item.sugar;

                    addRecentFood(item.foodName, item.amount, item.calorie, item.carb, item.fat, item.sugar, item.protein);
                }
            });     

        Object.keys(chartNutrient).forEach(nutrient => {
            updateChart(chartNutrient[nutrient], nutrient);
            populatePercentage(percentage[nutrient], nutrient);
        });

        hydrationInfo.consumed.innerHTML = consumed.hydration;
        hydrationInfo.goal.innerHTML = limit.hydration;

        console.log("Data hari ini berhasil dimuat:", consumed);

    } catch (err) {
        console.error("Gagal mengambil data harian:", err);
    }
}

// Jalankan fungsi
window.addEventListener("load", () => {
    
});

document.addEventListener("DOMContentLoaded", async () => {
    await fetchSetting();
    fetchLimit();
    loadTodayConsumption();
    remindEat();
    alertEat();
})