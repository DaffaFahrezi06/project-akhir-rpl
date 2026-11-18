addHydration.add.addEventListener("click", () => {

    let waterEntryData = {
        userId: localStorage.getItem("userId"), // Mengambil ID dari saat login
        foodName: 'Water',
        amount: Math.round(Number(addHydration.amount.value)),
        calorie: 0.0,
        carb: 0.0,
        fat: 0.0,
        sugar: 0.0,
        protein: 0.0,
        water: Math.round(Number(addHydration.amount.value))
    };

    console.log("Sending to Backend:", waterEntryData.water);

    // Database Operation
    fetch(`${BASE_URL}/food-entries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(waterEntryData)
    })
    .then(response => {
        if (!response.ok) throw new Error('Gagal simpan');
        return response.json();
    })
    .then(data => {
        if(localStorage.getItem("inputNotification") === "true") {
            alert(`Succesfully Inserted Water (${waterEntryData.water} ml)`);
        }

        //Variabel Lokal
        consumed.hydration += waterEntryData.water;

        //Menambahkan Water History Disamping sekilas (eksklusif Desktop)
        addRecentWater(waterEntryData.water);
    })

    console.log("Water total:", consumed.hydration);

    addHydration.popup.classList.remove("active");
});

addHydration.cancel.addEventListener("click", () => {
    addHydration.popup.classList.remove("active");
});

function togglePopup() {
    addHydration.popup.classList.toggle("active");
}
