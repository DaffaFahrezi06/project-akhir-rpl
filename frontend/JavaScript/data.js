/* Personal Data Initilization */
let bodyData = {
    age: 19,
    height: 163,
    weight: 60
}


/* Nutrient Consumption Data Initilization */
let consumed = {
    calorie: 0,
    carb: 0,
    fat: 0,
    sugar: 0,
    protein: 0,
    hydration: 0
}


/* LimitData Initilization */
let limit = {
    calorie: 9999,
    carb: 9999,
    fat: 9999,
    sugar: 9999,
    protein: 9999,
    hydration: 9999
}


/* Days, Date and Time */
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const daysLetter = ["M", "T", "W", "T", "F", "S", "S"];

const now = new Date();
const seconds = now.getSeconds();
const minutes = now.getMinutes();
const hours = now.getHours();    
const todayIndex = (now.getDay() + 6) % 7;
const weekIndex = getWeek(now);

function getWeek(date) {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const firstDayWeekday = (firstDay.getDay() + 6) % 7; // Monday = 0
    return Math.ceil((date.getDate() + firstDayWeekday) / 7);
}


/* User Settings */
async function fetchSetting() {
    try {
        const res = await fetch(`${BASE_URL}/users/${userId}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) throw new Error("Gagal mengambil data");

        const data = await res.json();

        localStorage.setItem("inputNotification", data.inputNotification);
        localStorage.setItem("reminderNotification", data.reminderNotification);
        localStorage.setItem("darkMode", data.darkMode);

        console.log("Data user setting berhasil diambil:", localStorage.getItem("inputNotification"), localStorage.getItem("reminderNotification"), localStorage.getItem("darkMode"));  

    } catch (err) {
        console.error("Error:", err);
    }
}


/* User Profile */
async function fetchProfile() {
    try {
        const res = await fetch(`${BASE_URL}/users/${userId}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) throw new Error("Gagal mengambil data");

        const data = await res.json();

        localStorage.setItem("username", data.username);
        localStorage.setItem("email", data.email);
        localStorage.setItem("age", data.age);
        localStorage.setItem("height", data.height);
        localStorage.setItem("weight", data.weight);
        localStorage.setItem("activityLevel", data.activityLevel);
        localStorage.setItem("goal", data.goal);

        console.log("Data user berhasil diambil:", localStorage.getItem("username"), localStorage.getItem("email"), localStorage.getItem("age"), localStorage.getItem("height"), localStorage.getItem("weight"), localStorage.getItem("activityLevel"), localStorage.getItem("goal"));  
    } catch (err) {
        console.error("Error:", err);
    }
}


/* Database Initialization */
const weeklyCalories = [0 ,0 ,0 ,0 ,0 ,0 ,0];
const monthlyCalories = [0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0];


/* Food Library
--- ID ---
1xxx = Biji-bijian (Serealia)
2xxx = Biji-bijian (Biji)
3xxx = Kacang-kacangan (Polong)
4xxx = Kacang-kacangan
5xxx = Umbi-umbian
6xxx = Daging
7xxx = Seafood
8xxx = Telur
9xxx = Buah-buahan
10xxx = Sayur-sayuran
11xxx = Jamur
12xxx = Susu dan Olahannya
13xxx = Lemak dan Minyak
14xxx = Gula, Sirup, & Konfeksioneri
15xxx = Roti-rotian
99xxxxxx = Makanan olahan 
*/
const foodLibrary = [
    // 1000 - 1999
    { id: 1001, name: 'Nasi Putih', serving: 100, calorie: 129, carb: 27.9, fat: 0.28, protein: 2.66, sugar: 0.05, water: 0},

    // 8000
    { id: 8001, name: 'Telur Rebus', serving: 100, calorie: 154, carb: 1.12, fat: 10.57, protein: 12.53, sugar: 1.12, water: 0},
    { id: 8002, name: 'Telur Ceplok / Mata Sapi', serving: 100, calorie: 201, carb: 0.88, fat: 15.31, protein: 13.63, sugar: 0.83, water: 0},
    { id: 8003, name: 'Telur Dadar', serving: 100, calorie: 153, carb: 0.69, fat: 12.02, protein: 10.62, sugar: 0.69, water: 0},

    // 99000000+
    { id: 99000001, name: 'Nasi Goreng', serving: 100, calorie: 168, carb: 21.06, fat: 6.23, protein: 6.3, sugar: 0.76, water: 0},
    { id: 99000002, name: 'Nasi Goreng Ayam', serving: 100, calorie: 166, carb: 21.12, fat: 6.04, protein: 6.29, sugar: 0.7, water: 0},
    { id: 99000003, name: 'Nasi Goreng Udang', serving: 100, calorie: 162, carb: 21.15, fat: 5.86, protein: 5.53, sugar: 0.76, water: 0},
    { id: 99000004, name: 'Nasi Goreng Cina', serving: 100, calorie: 151, carb: 18.95, fat: 5.61, protein: 5.67, sugar: 0.68, water: 0},

    { id: 99000101, name: 'Indomie Mi Goreng', serving: 80, calorie: 350, carb: 52, fat: 12, protein: 8, sugar: 6, water: 0},
    // --- Indomie Kuah (Standard) ---
    { id: 99000102, name: 'Indomie Ayam Bawang', serving: 69, calorie: 310, carb: 43, fat: 11, protein: 7, sugar: 3, water: 0},
    { id: 99000103, name: 'Indomie Rasa Soto Mie', serving: 70, calorie: 320, carb: 46, fat: 12, protein: 7, sugar: 3, water: 0 },
    { id: 99000104, name: 'Indomie Rasa Kari Ayam', serving: 72, calorie: 340, carb: 44, fat: 15, protein: 8, sugar: 3, water: 0 },
    { id: 99000105, name: 'Indomie Rasa Kaldu Ayam', serving: 65, calorie: 300, carb: 42, fat: 11, protein: 7, sugar: 3, water: 0 },
    { id: 99000106, name: 'Indomie Rasa Ayam Spesial', serving: 68, calorie: 300, carb: 40, fat: 12, protein: 7, sugar: 2, water: 0 },
    { id: 99000107, name: 'Indomie Soto Spesial (Ekstra Koya)', serving: 75, calorie: 350, carb: 46, fat: 15, protein: 7, sugar: 3, water: 0 },
    // --- Indomie Goreng (Varian Rasa) ---
    { id: 99000108, name: 'Indomie Mi Goreng Aceh', serving: 90, calorie: 430, carb: 62, fat: 16, protein: 9, sugar: 6, water: 0 },
    { id: 99000109, name: 'Indomie Mi Goreng Rendang', serving: 91, calorie: 430, carb: 60, fat: 17, protein: 9, sugar: 7, water: 0 },
    { id: 99000110, name: 'Indomie Mi Goreng Ayam Geprek (Hype Abis)', serving: 85, calorie: 410, carb: 54, fat: 18, protein: 8, sugar: 6, water: 0 },
    { id: 99000111, name: 'Indomie Mi Goreng Cabe Ijo', serving: 85, calorie: 390, carb: 54, fat: 16, protein: 8, sugar: 5, water: 0 },
    { id: 99000112, name: 'Indomie Mi Goreng Iga Penyet', serving: 80, calorie: 360, carb: 50, fat: 15, protein: 8, sugar: 6, water: 0 },
    { id: 99000113, name: 'Indomie Mi Goreng Sambal Rica-Rica', serving: 85, calorie: 400, carb: 54, fat: 17, protein: 8, sugar: 7, water: 0 },
    { id: 99000114, name: 'Indomie Mi Goreng Kriuk Pedas', serving: 90, calorie: 420, carb: 58, fat: 18, protein: 8, sugar: 8, water: 0 },
    { id: 99000115, name: 'Indomie Mie Nyemek Bangladesh', serving: 89, calorie: 410, carb: 57, fat: 16, protein: 9, sugar: 6, water: 0 },
    // --- Indomie Jumbo Series ---
    { id: 99000116, name: 'Indomie Mi Goreng Jumbo', serving: 129, calorie: 570, carb: 80, fat: 22, protein: 13, sugar: 10, water: 0 },
    { id: 99000117, name: 'Indomie Mi Goreng Rendang Jumbo', serving: 120, calorie: 560, carb: 76, fat: 24, protein: 11, sugar: 9, water: 0 },
    { id: 99000118, name: 'Indomie Mi Goreng Ayam Panggang Jumbo', serving: 127, calorie: 570, carb: 72, fat: 25, protein: 12, sugar: 13, water: 0 },
    // --- Kuliner Indonesia (Kuah Khas Daerah) ---
    { id: 99000119, name: 'Indomie Soto Banjar Limau Kuit', serving: 75, calorie: 340, carb: 47, fat: 14, protein: 7, sugar: 3, water: 0 },
    { id: 99000120, name: 'Indomie Soto Medan', serving: 70, calorie: 320, carb: 45, fat: 13, protein: 7, sugar: 3, water: 0 },
    { id: 99000121, name: 'Indomie Soto Padang', serving: 75, calorie: 330, carb: 46, fat: 13, protein: 7, sugar: 3, water: 0 },
    { id: 99000122, name: 'Indomie Soto Lamongan', serving: 80, calorie: 350, carb: 48, fat: 15, protein: 8, sugar: 3, water: 0 },
    { id: 99000123, name: 'Indomie Mi Coto Makassar', serving: 75, calorie: 340, carb: 47, fat: 14, protein: 8, sugar: 3, water: 0 },
    { id: 99000124, name: 'Indomie Mi Kocok Bandung', serving: 75, calorie: 340, carb: 49, fat: 13, protein: 8, sugar: 3, water: 0 },
    { id: 99000125, name: 'Indomie Empal Gentong', serving: 75, calorie: 340, carb: 48, fat: 14, protein: 7, sugar: 3, water: 0 },
    { id: 99000126, name: 'Indomie Mi Kuah Cakalang', serving: 75, calorie: 320, carb: 46, fat: 11, protein: 8, sugar: 3, water: 0 },
    { id: 99000127, name: 'Indomie Seblak Hot Jeletot', serving: 75, calorie: 340, carb: 47, fat: 14, protein: 7, sugar: 4, water: 0 },
    { id: 99000128, name: 'Indomie Rawon Pedas Mercon', serving: 75, calorie: 340, carb: 46, fat: 14, protein: 7, sugar: 3, water: 0 },
    // --- Varian Soto Koya & Pedas ---
    { id: 99000129, name: 'Indomie Soto Koya Pedas Dower', serving: 80, calorie: 360, carb: 50, fat: 14, protein: 8, sugar: 4, water: 0 },
    { id: 99000130, name: 'Indomie Soto Koya Gurih Nagih', serving: 80, calorie: 360, carb: 50, fat: 14, protein: 8, sugar: 4, water: 0 },
    // --- Premium Collection / Ramen / Keriting ---
    { id: 99000131, name: 'Indomie Ramen Tori Kara (Ayam Pedas)', serving: 86, calorie: 390, carb: 54, fat: 16, protein: 8, sugar: 5, water: 0 },
    { id: 99000132, name: 'Indomie Ramen Tori Miso', serving: 86, calorie: 380, carb: 55, fat: 14, protein: 9, sugar: 4, water: 0 },
    { id: 99000133, name: 'Indomie Ramen Shoyu (Ayam)', serving: 82, calorie: 350, carb: 50, fat: 13, protein: 8, sugar: 3, water: 0 },
    { id: 99000134, name: 'Indomie Premium Keriting Goreng Spesial', serving: 90, calorie: 410, carb: 56, fat: 17, protein: 8, sugar: 6, water: 0 },
    { id: 99000135, name: 'Indomie Premium Keriting Ayam Panggang', serving: 90, calorie: 410, carb: 56, fat: 17, protein: 9, sugar: 5, water: 0 },
    { id: 99000136, name: 'Indomie Korean Ramyeon Fiery Chikin', serving: 80, calorie: 370, carb: 52, fat: 14, protein: 8, sugar: 7, water: 0 },
    // --- Indomie Hype Abis & Rasa Kuliner Baru ---
    { id: 99000137, name: 'Indomie Mi Goreng Rasa Ayam Pop', serving: 85, unit: 'Bungkus', calorie: 400, carb: 57, fat: 16, protein: 8, sugar: 5, water: 0 },
    { id: 99000138, name: 'Indomie Mi Goreng Rasa Kebab Rendang', serving: 85, unit: 'Bungkus', calorie: 390, carb: 55, fat: 15, protein: 8, sugar: 6, water: 0 },
    { id: 99000139, name: 'Indomie Hype Abis Mieghetti Rasa Bolognese', serving: 85, unit: 'Bungkus', calorie: 390, carb: 57, fat: 14, protein: 9, sugar: 6, water: 0 },
    { id: 99000140, name: 'Indomie Mi Goreng Rasa Sambal Matah', serving: 85, unit: 'Bungkus', calorie: 390, carb: 51, fat: 17, protein: 8, sugar: 5, water: 0 },
    { id: 99000141, name: 'Indomie Mi Goreng Rasa Kebuli', serving: 85, unit: 'Bungkus', calorie: 410, carb: 56, fat: 17, protein: 8, sugar: 4, water: 0 },
    { id: 99000142, name: 'Indomie Mi Goreng Cakalang (Khas Sulut)', serving: 82, unit: 'Bungkus', calorie: 380, carb: 54, fat: 14, protein: 8, sugar: 4, water: 0 },
    // --- Indomie Premium & Salted Egg ---
    { id: 99000143, name: 'Indomie Premium Collection Salted Egg (Curly)', serving: 100, unit: 'Bungkus', calorie: 490, carb: 55, fat: 26, protein: 10, sugar: 5, water: 0 },
    // --- Indomie Real Meat Series (Kotak) ---
    { id: 99000144, name: 'Indomie Real Meat Telur Balado', serving: 100, unit: 'Kotak', calorie: 460, carb: 60, fat: 20, protein: 11, sugar: 5, water: 0 },
    { id: 99000145, name: 'Indomie Real Meat Empal Goreng', serving: 100, unit: 'Kotak', calorie: 480, carb: 58, fat: 22, protein: 12, sugar: 6, water: 0 },
    { id: 99000146, name: 'Indomie Real Meat Ayam Jamur', serving: 110, unit: 'Kotak', calorie: 430, carb: 60, fat: 16, protein: 12, sugar: 5, water: 0 },
    { id: 99000147, name: 'Indomie Real Meat Pepper Chicken', serving: 100, unit: 'Kotak', calorie: 450, carb: 58, fat: 20, protein: 10, sugar: 4, water: 0 }
];


/* Chart Appearance Settings */
const appearance = {
    type: "doughnut",
    color: {
        remaining: '#5B5B5B',
        calorie: '#3B89FF',
        carb: '#18E8C0',
        fat: '#F5B94E',
        sugar: '#9575FF',
        protein: '#F77C7C'
    },
    cutout: {
        big: '75%',
        small: '65%'
    },
    borderWidth: 0
};

const appearanceInsight = {
    type: "bar",
    color: {
        remaining: '#5B5B5B',
        calorie: '#3B89FF',
        carb: '#18E8C0',
        fat: '#F5B94E',
        sugar: '#9575FF',
        protein: '#F77C7C'
    },
    cutout: {
        big: '75%',
        small: '65%'
    },
    borderWidth: 0
};

