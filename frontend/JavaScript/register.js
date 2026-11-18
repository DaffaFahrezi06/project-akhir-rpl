const form = document.getElementById("registerForm");

form.addEventListener("submit", function (e) {
  e.preventDefault(); // penting!

  const username = document.getElementById("Username").value;
  const email = document.getElementById("Email").value;
  const password = document.getElementById("Password").value;

  fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username: username,
      email: email,
      password: password
    })
  })
    .then(res => {
      if (!res.ok) throw new Error("Register gagal");
      return res.json();
    })
    .then(() => {
      alert("Register berhasil, silakan login");
      window.location.href = "login.html";
    })
    .catch(err => {
      alert("Register gagal. Email mungkin sudah terdaftar.");
      console.error(err);
    });
});

