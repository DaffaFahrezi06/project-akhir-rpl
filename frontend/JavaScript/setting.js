// --- Account Setting Buttons ---
settingOption.account.changeUsername.addEventListener("click", () => {
    popup.question.changeUsername.style.display = "flex";
});

settingOption.account.changePassword.addEventListener("click", () => {
    popup.question.changePassword.style.display = "flex";
});

settingOption.account.deleteAccount.addEventListener("click", () => {
    popup.question.deleteAccount.style.display = "flex";
});

// Logout Button
settingOption.logout.desktop.addEventListener("click", () => {
    popup.question.logout.style.display = "flex";
});

settingOption.logout.mobile.addEventListener("click", () => {
    popup.question.logout.style.display = "flex";
});


// Confirm Button
confirmButton.logout.addEventListener("click", () => {
    popup.question.logout.style.display = "none";    
    localStorage.clear();
    window.location.href = 'login.html';
});

confirmButton.changeUsername.addEventListener("click", () => {
    popup.question.changeUsername.style.display = "none";
    popup.input.changeUsername.style.display = "flex";
});

confirmButton.changePassword.addEventListener("click", () => {
    popup.question.changePassword.style.display = "none";
    popup.input.changePassword.style.display = "flex";
});

confirmButton.deleteAccount.addEventListener("click", () => {
    fetch(`${BASE_URL}/users/${userId}`, {
        method: "DELETE", 
        headers: { 
            "Content-Type": "application/json" 
        }
    })
    .then(res => {
        if (res.ok) {
            alert("Akun berhasil dihapus");
            popup.question.deleteAccount.style.display = "none";  
            localStorage.clear(); 
            window.location.href = "../index.html"; 
        } else {
            alert("Gagal menghapus akun. Mungkin ada masalah server.");
        }
    })
    .catch(err => {
        console.error("Error:", err);
        alert("Terjadi kesalahan koneksi.");
    });
});


// Cancel Button
cancelButton.changeUsername.addEventListener("click", () => {
    popup.question.changeUsername.style.display = "none";
});

cancelButton.changePassword.addEventListener("click", () => {
    popup.question.changePassword.style.display = "none";
});

cancelButton.deleteAccount.addEventListener("click", () => {
    popup.question.deleteAccount.style.display = "none";
});

cancelButton.logout.addEventListener("click", () => {
    popup.question.logout.style.display = "none";
});

// Change Username
changeUserData.changeUsername.addEventListener("click", () => {
    const newUsername = popupTextInput.changeUsername.value.trim();

    if (newUsername.length < 3 || newUsername.length > 28) {
        alert("Username must be between 3 and 28 characters");
    } else {
        fetch(`${BASE_URL}/users/${userId}/username`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: newUsername })
        })
        .then(res => {
            if (!res.ok) throw new Error("Gagal memperbarui data");
            return res.json();
        })
        .then(data => {
            alert("Username changed!");
            document.querySelector("#Profile_Name").innerText = data.username;
            popup.input.changeUsername.style.display = "none";
        })
        .catch(err => {
            console.error("Error:", err);
            alert("Gagal memperbarui data. Pastikan server aktif.");
        });
    }
});

// Change Password
changeUserData.changePassword.addEventListener("click", () => {
    const newPassword = popupTextInput.changePassword.value.trim();

    if (newPassword.length < 8 || newPassword.length > 21) {
        alert("Password must be between 8 and 21 characters");
    } else {
        fetch(`${BASE_URL}/users/${userId}/password`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ password: newPassword })
        })
        .then(res => {
            if (!res.ok) throw new Error("Gagal memperbarui data");
            return res.json();
        })
        .then(data => {
            alert("Password changed!");
            popup.input.changePassword.style.display = "none";
        })
        .catch(err => {
            console.error("Error:", err);
            alert("Gagal memperbarui data. Pastikan server aktif.");
        });
    }
});

// Cancel Change User Data
cancelChangeUserData.changeUsername.addEventListener("click", () => {
    popup.input.changeUsername.style.display = "none";

});

cancelChangeUserData.changePassword.addEventListener("click", () => {
    popup.input.changePassword.style.display = "none";
});

// --- App Setting Buttons ---

// Input Notification Setting
settingOption.app.inputNotification.addEventListener("click", () => {
    let isCurrentlyOn = localStorage.getItem("inputNotification") === "true";
    let newValue = !isCurrentlyOn; 

    fetch(`${BASE_URL}/users/${userId}/setting1`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ inputNotification: newValue })
    })
    .then(res => {
        if (!res.ok) throw new Error("Gagal memperbarui data");
        return res.json();
    })
    .then(data => {
        localStorage.setItem("inputNotification", data.inputNotification);
        updateButtonVisuals("inputNotification", data.inputNotification); 
        alert(`setting Updated to: ${data.inputNotification ? "ON" : "OFF"}`);
    })
    .catch(err => {
        console.error("Error:", err);
        alert("Gagal memperbarui data. Pastikan server aktif.");
    });
});

// Reminder Notification Setting
settingOption.app.reminderNotification.addEventListener("click", () => {
    let isCurrentlyOn = localStorage.getItem("reminderNotification") === "true";
    let newValue = !isCurrentlyOn; 

    fetch(`${BASE_URL}/users/${userId}/setting2`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reminderNotification: newValue })
    })
    .then(res => {
        if (!res.ok) throw new Error("Gagal memperbarui data");
        return res.json();
    })
    .then(data => {
        localStorage.setItem("reminderNotification", data.reminderNotification);
        updateButtonVisuals("reminderNotification", data.reminderNotification); 
        alert(`Setting Updated to: ${data.reminderNotification ? "ON" : "OFF"}`);
    })
    .catch(err => {
        console.error("Error:", err);
        alert("Gagal memperbarui data. Pastikan server aktif.");
    });
});

// Dark Mode Setting
settingOption.app.darkMode.addEventListener("click", () => {
    let isCurrentlyOn = localStorage.getItem("darkMode") === "true";
    let newValue = !isCurrentlyOn; 

    fetch(`${BASE_URL}/users/${userId}/setting3`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ darkMode: newValue })
    })
    .then(res => {
        if (!res.ok) throw new Error("Gagal memperbarui data");
        return res.json();
    })
    .then(data => {
        localStorage.setItem("darkMode", data.darkMode);
        updateButtonVisuals("darkMode", data.darkMode); 
        alert(`Setting Updated to: ${data.darkMode ? "ON" : "OFF"}`);
    })
    .catch(err => {
        console.error("Error:", err);
        alert("Gagal memperbarui data. Pastikan server aktif.");
    });
});

// Fungsi bantuan untuk ubah warna/tampilan (Contoh)
function updateButtonVisuals(settingType, isActive) {
    const btn = settingOption.app[settingType];
    if (isActive) {
        btn.innerText = "Disable " + settingType.replace(/([A-Z])/g, ' $1').trim();
    } else {
        btn.innerText = "Enable " + settingType.replace(/([A-Z])/g, ' $1').trim();
    }
}

function loadButtonVisuals(settingType) {
    const btn = settingOption.app[settingType];
    if (localStorage.getItem(settingType) === "true") {
        btn.innerText = "Disable " + settingType.replace(/([A-Z])/g, ' $1').trim();
    } else {
        btn.innerText = "Enable " + settingType.replace(/([A-Z])/g, ' $1').trim();
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    await fetchSetting();
    loadButtonVisuals("inputNotification");
    loadButtonVisuals("reminderNotification");
    loadButtonVisuals("darkMode");
});