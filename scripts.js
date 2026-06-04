// Ganti bagian ini dengan konfigurasi dari Firebase Console
const firebaseConfig = {
    databaseURL: "https://project-kamu.firebaseio.com/" 
};
firebase.initializeApp(firebaseConfig);
const db = firebase.database().ref("semua_pesan"); // 'semua_pesan' adalah nama papan pengumumanmu
// Ganti bagian pengiriman pesan
function kirimPesan() {
    const data = {
        nama: document.getElementById('targetName').value,
        // ... ambil data lainnya ...
    };

    // Kirim ke server (Papan Pengumuman)
    db.push(data).then(() => {
        alert("Pesan sudah dipajang di papan pengumuman!");
    });
}
// Database selalu memantau (listen)
db.on("value", (snapshot) => {
    const list = document.getElementById('pesanList');
    list.innerHTML = ""; // Bersihkan list
    
    // Ambil semua data yang ada di server
    snapshot.forEach((child) => {
        const s = child.val();
        list.innerHTML += `<div>Kepada: ${s.nama} - Pesan: ${s.pesan}</div>`;
    });
});

<script>

    function toggleMenu() {
        var navList = document.getElementById("nav-list");
        navList.classList.toggle("active");

} 
    const firebaseConfig = {
    databaseURL: "https://send-the-song-default-rtdb.firebaseio.com/"
};
// Jangan lupa pastikan kamu memanggil inisialisasi ini di bawahnya:
firebase.initializeApp(firebaseConfig);
const db = firebase.database().ref("songs"); // "songs" adalah nama folder di database kamu

function kirimPesan() {
    const data = {
        nama: document.getElementById('Nama yang Dituju').value,
        mood: document.getElementById('Pilih Mood Lagu').value,
        link: document.getElementById('Link Lagu dari Spotify').value,
        pesan: document.getElementById('Pesan Buat Seseorang').value
    };

    if(!data.nama || !data.link) return alert("Isi semua data ya!");

    db.push(data).then(() => {
        alert("Pesan Terkirim!");
        document.getElementById('Nama yang Dituju').value = '';
        document.getElementById('Link Lagu dari Spotify').value = '';
        document.getElementById('Pesan Buat Seseorang').value = '';
    });
}

db.on("value", (snapshot) => {
    const list = document.getElementById('pesanList');
    list.innerHTML = "";
    snapshot.forEach((child) => {
        const s = child.val();
        list.innerHTML += `
            <div class="pesan-card" data-nama="${s.nama.toLowerCase()}">
                <strong>Kepada: ${s.nama}</strong><br>
                <span>Mood: ${s.mood}</span>
                <p>${s.pesan}</p>
                <a href="${s.link}" target="_blank" style="color: yellow;">Dengarkan Lagu</a>
            </div>
        `;
    });
});

function filterPesan() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    document.querySelectorAll('.pesan-card').forEach(card => {
        card.style.display = card.getAttribute('data-nama').includes(query) ? "block" : "none";
    });
}
</script>
