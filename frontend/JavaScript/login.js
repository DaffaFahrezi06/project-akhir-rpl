const form = document.getElementById("loginForm");

form.addEventListener("submit", function (e) {
  e.preventDefault(); // Penting

  const email = document.getElementById("Email").value;
  const password = document.getElementById("Password").value;

  fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: email,
      password: password
    })
  })
    .then(res => {
      if (!res.ok) throw new Error("Login gagal");
      return res.json();
    })
    .then(user => {
    // Simpan seluruh objek user
    localStorage.setItem("user", JSON.stringify(user));
    
    // SIMPAN ID SECARA TERPISAH
    localStorage.setItem("userId", user.id); 
    
    console.log("Login Berhasil, ID User:", user.id);
    window.location.href = "home.html";
    })
    .catch(err => {
      alert("Email atau password salah");
      console.error(err);
    });
});
