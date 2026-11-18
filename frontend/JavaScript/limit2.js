// AUTO SET CALORIE
setButton.auto.addEventListener("click", () => {
    let bodyData = {
        age : Number(bodyDataInput.age.value),
        height : Number(bodyDataInput.height.value),
        weight : Number(bodyDataInput.weight.value),
        gender : bodyDataInput.gender.value,
        activityLevel : bodyDataInput.activity_level.value,
        goal : bodyDataInput.goal.value
    };


    if (bodyData.age < 1 || bodyData.age > 200) {
        alert("Please Enter Valid Age");
        return;
    }
    else if (bodyData.height < 50 || bodyData.height > 300) {
        alert("Please Enter Valid Height");
        return;
    }
    else if (bodyData.weight < 1 || bodyData.weight > 700) {
        alert("Please Enter Valid Weight");
        return;
    }
    else {
        // Hitung calorie limit berdasarkan data fisik dan tujuan
        //let calorieLimit = calculateCalorieLimitTest(bodyData.age, bodyData.height, bodyData.weight, bodyData.gender);
        let calorieLimit = calculateByGoal(bodyData.age, bodyData.height, bodyData.weight, bodyData.gender, bodyData.activityLevel, bodyData.goal);

        let payload = {
            dailyCalorieGoal: Math.round(calorieLimit),
            dailyCarbsGoal: Math.round(0.5 * calorieLimit / 4),
            dailyFatGoal: Math.round(0.3 * calorieLimit / 9),
            dailySugarGoal: 52,
            dailyProteinGoal: Math.round(0.2 * calorieLimit / 4),
            dailyHydrationGoal: Math.round(calorieLimit * 0.8)
        };

        // Fitur keamanan agar tidak dehidrasi
        if(payload.dailyHydrationGoal <= 2000 && !(bodyData.activityLevel === "MODERATELY_ACTIVE"|| bodyData.activityLevel === "VERY_ACTIVE" || bodyData.activityLevel === "EXTRA_ACTIVE")){
            payload.dailyHydrationGoal = 2000;
        } else if (payload.dailyHydrationGoal <= 2500 && (bodyData.activityLevel === "MODERATELY_ACTIVE"|| bodyData.activityLevel === "VERY_ACTIVE" || bodyData.activityLevel === "EXTRA_ACTIVE")){
            payload.dailyHydrationGoal = 2500;
        }

        dailyLimit.innerText = `${Math.round(calorieLimit)}`; //Buat Test

        // Kirim ke UserController menggunakan PUT
        Promise.all([
            fetch(`${BASE_URL}/users/${userId}/bodydata`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(bodyData)
            }),
            fetch(`${BASE_URL}/users/${userId}/goals`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            })
        ])

        .then(async ([resBody, resGoals]) => {
        if (!resBody.ok || !resGoals.ok) throw new Error("Gagal menyimpan data");
        
        // Ambil data terbaru dari salah satu response
        const updatedUser = await resGoals.json();
        
        // Update UI dengan angka hasil simpan database
        dailyLimit.innerText = updatedUser.dailyCalorieGoal; 
        if(localStorage.getItem("inputNotification") === "true") {
            alert("Semua data fisik dan target kalori berhasil diperbarui!");
        }
        })
        .catch(err => {
            console.error(err);
            alert("Terjadi kesalahan saat menyimpan data.");
        });
    }

});

// MANUAL SET CALORIE
setButton.manual.addEventListener("click", () => {
    let calorieLimit = Number(manualLimit.value);

    if (calorieLimit < 1 || calorieLimit > 100000) {
        alert("Please Enter Valid Amount");
        return;
    } else {
        let payload = {
            dailyCalorieGoal: Math.round(calorieLimit),
            dailyCarbsGoal: Math.round(0.5 * calorieLimit / 4),
            dailyFatGoal: Math.round(0.3 * calorieLimit / 9),
            dailySugarGoal: 52,
            dailyProteinGoal: Math.round(0.2 * calorieLimit / 4),
            dailyHydrationGoal: Math.round(calorieLimit * 0.8)
        };

        // Fitur keamanan agar tidak dehidrasi
        if(payload.dailyHydrationGoal <= 2000){
            payload.dailyHydrationGoal = 2000;
        }

        dailyLimit.innerText = `${Math.round(calorieLimit)}`; //Buat Test

        fetch(`${BASE_URL}/users/${userId}/goals`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        })
        .then(res => {
            if (!res.ok) throw new Error("Gagal menyimpan data");
            return res.json();
        })
        .then(data => {
            dailyLimit.innerText = data.dailyCalorieGoal;
            if(localStorage.getItem("inputNotification") === "true") { 
                alert("Target kalori berhasil diperbarui!");
            }
        })
        .catch(err => {
            console.error("Error:", err);
            alert("Gagal menyimpan data. Pastikan server aktif.");
        });
    }
});

// Calculate BMR
function calculateCalorieLimitTest(age, height, weight, gender) {
    return 10 * weight +
           6.25 * height -
           5 * age +
           (calculateByGender(age, height, weight, gender));
}

// Calculate BMR
function calculateByGender(age, height, weight, gender) {
    if (gender === "MALE") {
        return 5;
    } else if (gender === "FEMALE") {
        return -161;
    } else {
        alert("Invalid Gender");
        return - (10 * weight + 6.25 * height - 5 * age - 1);
    }
}

// Calculate BMR x TDEE
function calculateTDEE(age, height, weight, gender, activity_level) {
    if (activity_level === "SEDENTARY") {
        return 1.2 * calculateCalorieLimitTest(age, height, weight, gender);
    } else if (activity_level === "LIGHTLY_ACTIVE") {
        return 1.375 * calculateCalorieLimitTest(age, height, weight, gender);
    } else if (activity_level === "MODERATELY_ACTIVE") {
        return 1.55 * calculateCalorieLimitTest(age, height, weight, gender);
    } else if (activity_level === "VERY_ACTIVE") {
        return 1.725 * calculateCalorieLimitTest(age, height, weight, gender);
    } else if (activity_level === "EXTRA_ACTIVE") {
        return 1.9 * calculateCalorieLimitTest(age, height, weight, gender);
    } else {
        alert("Invalid Activity Level");
        return calculateCalorieLimitTest(age, height, weight, gender);    
    }
}

// Calculate BMR x TDEE + By Goal
function calculateByGoal(age, height, weight, gender, activity_level, goal) {
    if (goal === "LOSE_WEIGHT") {
        return calculateTDEE(age, height, weight, gender, activity_level) - 400; 
    } else if (goal === "MAINTAIN_WEIGHT") {
        return calculateTDEE(age, height, weight, gender, activity_level); 
    } else if (goal === "GAIN_WEIGHT") {
        return calculateTDEE(age, height, weight, gender, activity_level) + 400; 
    } else {
        alert("Invalid Goal or Default Goal Used");
        return calculateTDEE(age, height, weight, gender, activity_level);   
    } 
}

async function loadCurrentLimit() {
    const userId = localStorage.getItem("userId");

    // Validasi jika user belum login
    if (!userId || userId === "null") {
        console.warn("User ID tidak ditemukan. Pastikan Anda sudah login.");
        return;
    }

    try {
        const response = await fetch(`${BASE_URL}/users/${userId}`);
        
        if (!response.ok) throw new Error("Gagal mengambil data user");
        
        const user = await response.json();

        const currentGoal = user.dailyCalorieGoal || 0;
        
        if (dailyLimit) {
            dailyLimit.innerText = currentGoal;
        }

        console.log("Data limit berhasil dimuat:", currentGoal);
    } catch (err) {
        console.error("Error saat memuat limit:", err);
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    await fetchSetting();
    loadCurrentLimit();
})
