async function fetchLimit() {
    try {
        const res = await fetch(`${BASE_URL}/users/${userId}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) throw new Error("Gagal mengambil data");

        const data = await res.json();

        limit.calorie = data.dailyCalorieGoal; 
        limit.carb = data.dailyCarbsGoal;
        limit.fat = data.dailyFatGoal;
        limit.sugar = data.dailySugarGoal;
        limit.protein = data.dailyProteinGoal;
        limit.hydration = data.dailyHydrationGoal;

        console.log("Data limit berhasil diupdate:", limit);
        
        updateChart(chartNutrient.calorie, "calorie");
        updateChart(chartNutrient.carb, "carb"); 
        updateChart(chartNutrient.fat, "fat"); 
        updateChart(chartNutrient.sugar, "sugar"); 
        updateChart(chartNutrient.protein, "protein");  

    } catch (err) {
        console.error("Error:", err);
    }
}