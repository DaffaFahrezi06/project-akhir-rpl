// Retrieve user profile and ID from local storage
const userId = localStorage.getItem("userId");

// Main Page DOM Elements
const chart = {
    carb: document.querySelector("#CarbChart"),
    fat: document.querySelector("#FatChart"),
    sugar: document.querySelector("#SugarChart"),
    protein: document.querySelector("#ProteinChart"),
    calorie: document.querySelector("#CalorieChart")
};

const percentage = {
    carb: document.querySelector("#Carb .percentage"),
    fat: document.querySelector("#Fat .percentage"),
    sugar: document.querySelector("#Sugar .percentage"),
    protein: document.querySelector("#Protein .percentage"),
    calorie: document.querySelector("#Calorie .percentage")
};

const manualInput = {
    food: document.querySelector("#FoodName"),
    amount: document.querySelector("#ManualAmount"),
    carb: document.querySelector("#CarbAmount"),
    fat: document.querySelector("#FatAmount"),
    sugar: document.querySelector("#SugarAmount"),
    protein: document.querySelector("#ProteinAmount"),
    calorie: document.querySelector("#CalorieAmount")
};

const autoInput = {
    food: document.querySelector("#FoodSearch"),
    amount: document.querySelector("#AutoAmount")
}

const addButton = {
    auto: document.querySelector("#AddFood .add"),
    manual: document.querySelector("#AddFoodManual .add")
};

const hydrationInfo = {
    consumed: document.querySelector("#Consumed_Water"),
    goal: document.querySelector("#Hydration_Goal")
}

const addHydration = {
    add: document.querySelector("#Hydration_Input .btn-confirm"),
    cancel: document.querySelector("#Hydration_Input .btn-cancel"),
    amount: document.querySelector("#Add_Water"),
    popup: document.querySelector("#Hydration_Input")
}

const foodHistory = document.querySelector("#FoodHistory .history-list");

const ReminderContainer = document.querySelector("#Reminder");
const eatReminder = document.querySelector("#Eat");


// Limit Page DOM Elements
const bodyDataInput = {
    age: document.querySelector("#input-age"),
    height: document.querySelector("#input-height"),
    weight: document.querySelector("#input-weight"),
    gender: document.querySelector("#input-gender"),
    activity_level: document.querySelector("#input-activity"),
    goal: document.querySelector("#input-goal")
}

const setButton = {
    auto: document.querySelector(".input-auto .btn-blue"),
    manual: document.querySelector(".input-manual .btn-blue")
}

const manualLimit = document.querySelector("#manual-input");

const dailyLimit = document.querySelector("#current-limit");


// Inside Chart Page DOM Elements
const chartBar = {
    daily: document.querySelector("#cal-today") ,
    weekly: document.querySelector("#cal-weekly"),
    weeklyChart: document.querySelector("#WeeklyChart"),
    historyList: document.querySelector(".app-container .history-list")
};


// Setting Page DOM Elements
const profileElements = {
    profilePicture: document.querySelector("#id-profile-pic"),
    userNameElement: document.querySelector("#Profile_Name"),
    emailElement: document.querySelector("#Profile_Email"),
    ageElement: document.querySelector("#Profile_Age"),
    heightElement: document.querySelector("#Profile_Height"),
    weightElement: document.querySelector("#Profile_Weight"),
    genderElement: document.querySelector("#Profile_Gender"),
    activityLevelElement: document.querySelector("#Profile_ActivityLevel"),
    goalElement: document.querySelector("#Profile_Goal")
}

const settingOption = {
    account : {
        changeUsername: document.querySelector("#Username_Setting"),
        changePassword: document.querySelector("#Password_Setting"),
        deleteAccount: document.querySelector("#Delete_Account_Setting")
    },
    app : {
        inputNotification: document.querySelector("#Disable_Notification_1"),
        reminderNotification: document.querySelector("#Disable_Notification_2"),
        darkMode: document.querySelector("#Setting_3")
    },
    logout: {
        desktop: document.querySelector(".btn-logout.desktopDisable"),
        mobile: document.querySelector(".btn-logout.mobileDisable")
    }
}

const popup = {
    question : {
        logout: document.querySelector("#Logout_Popup"),    
        changeUsername: document.querySelector("#Change_Username_Popup"),
        changePassword: document.querySelector("#Change_Password_Popup"),
        deleteAccount: document.querySelector("#Delete_Account_Popup")
    },
    input : {
        changeUsername: document.querySelector("#Username_Input"),
        changePassword: document.querySelector("#Password_Input")
    }
}

const confirmButton = {
    logout: document.querySelector("#Logout_Popup .btn-confirm"),
    changeUsername: document.querySelector("#Change_Username_Popup .btn-confirm"),
    changePassword: document.querySelector("#Change_Password_Popup .btn-confirm"),
    deleteAccount: document.querySelector("#Delete_Account_Popup .btn-confirm")
}

const cancelButton = {
    logout: document.querySelector("#Logout_Popup .btn-cancel"),
    changeUsername: document.querySelector("#Change_Username_Popup .btn-cancel"),
    changePassword: document.querySelector("#Change_Password_Popup .btn-cancel"),
    deleteAccount: document.querySelector("#Delete_Account_Popup .btn-cancel")
}

const popupTextInput = {
    changeUsername: document.querySelector("#Username_Input .popup-input"),
    changePassword: document.querySelector("#Password_Input .popup-input")
}

const changeUserData = {
    changeUsername: document.querySelector("#Username_Input .btn-confirm"),
    changePassword: document.querySelector("#Password_Input .btn-confirm")
}

const cancelChangeUserData = {
    changeUsername: document.querySelector("#Username_Input .btn-cancel"),
    changePassword: document.querySelector("#Password_Input .btn-cancel")
}


// Untuk Popup Account
const accountInfo = document.querySelector("#Account_Info");


// Untuk Settingan Darkmode
const mainPage = {

}

const limitPage = {

}

const insightPage = {

}

const settingPage = {

}


// Jalankan Fungsi
document.addEventListener("DOMContentLoaded", async () => {
    await fetchProfile();
    if (localStorage.getItem("user")) {
        try {

            const userNameElement = document.querySelector("#AppName .sub .username");
            
            if (userNameElement && localStorage.getItem("username")) {
                userNameElement.innerText = localStorage.getItem("username");
            }
        } catch (error) {
            console.error("Gagal membaca data user dari storage:", error);
        }
    }
});



