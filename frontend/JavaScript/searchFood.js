const searchInput = document.getElementById('FoodSearch');
const suggestionBox = document.getElementById('suggestion-box');
const amountInput = document.getElementById('AutoAmount');

let selectedFoodData = null;

// Variable untuk menyimpan makanan yang sedang dipilih user
let selectedFoodItem = null;

// Event Listener saat mengetik di kolom Search
searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    
    // Jika kosong, sembunyikan kotak saran & reset pilihan
    if (query.length === 0) {
        suggestionBox.style.display = 'none';
        selectedFoodData = null; 
        return;
    }

    // Filter array foodLibrary (pastikan array ini sudah ada di atas kodemu)
    const matches = foodLibrary.filter(food => 
        food.name.toLowerCase().includes(query)
    );

    // Tampilkan hasil
    renderSuggestions(matches);
});

// Fungsi untuk membuat HTML List Suggestion
function renderSuggestions(matches) {
    suggestionBox.innerHTML = ''; // Bersihkan list lama

    if (matches.length === 0) {
        suggestionBox.style.display = 'none';
        return;
    }

    matches.forEach(food => {
        const div = document.createElement('div');
        div.classList.add('suggestion-item'); // Pastikan ada CSS untuk class ini
        
        // Tampilkan Nama & Info singkat
        div.innerHTML = `
            <strong>${food.name}</strong><br>
            <small>Std: ${food.serving}g | ${food.calorie} kkal</small>
        `;

        // SAAT ITEM DIPILIH (DI-KLIK)
        div.addEventListener('click', () => {
            // 1. Isi kolom input dengan nama makanan
            searchInput.value = food.name;
            
            // 2. Simpan OBJEK makanan ke variabel global (biar bisa dipake tombol Add)
            selectedFoodData = food; 
            
            // 3. (Opsional) Isi otomatis amount atau kasih placeholder
            amountInput.placeholder = `Serving: ${food.serving}g`;
            amountInput.value = food.serving; // Auto isi amount sesuai serving size

            // 4. Sembunyikan list
            suggestionBox.style.display = 'none';
        });

        suggestionBox.appendChild(div);
    });

    suggestionBox.style.display = 'block';
}

// Tutup list jika klik di luar area
document.addEventListener('click', (e) => {
    if (!searchInput.contains(e.target) && !suggestionBox.contains(e.target)) {
        suggestionBox.style.display = 'none';
    }
});