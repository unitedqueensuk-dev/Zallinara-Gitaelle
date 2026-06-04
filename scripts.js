<script>
    function toggleMenu() {
        var navList = document.getElementById("nav-list");
        navList.classList.toggle("active");
    }
    // 1. Inisialisasi Firebase
const firebaseConfig = {
    // ... API Key kamu ...
};
firebase.initializeApp(firebaseConfig);
const db = firebase.database().ref('songs'); // Pastikan path-nya sama

// 2. Fungsi untuk mengambil dan menampilkan data (Realtime)
db.on("value", (snapshot) => {
    const list = document.getElementById('songList');
    list.innerHTML = "";
    snapshot.forEach((child) => {
        const s = child.val();
        list.innerHTML += `
            <div class="song-item" data-name="${s.to.toLowerCase()}">
                <strong>Tujuan: ${s.to}</strong><br>
                <a href="${s.link}" target="_blank">Dengarkan Lagu</a>
            </div>
        `;
    });
});

// 3. Fungsi untuk mengirim data (Contoh)
function kirimData() {
    // ... kode untuk .push() ke database ...
}
</script>
