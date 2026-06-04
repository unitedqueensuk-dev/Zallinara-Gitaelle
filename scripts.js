// 1. Konfigurasi
const firebaseConfig = {
    databaseURL: "https://send-the-song-default-rtdb.firebaseio.com/" // GANTI DENGAN PUNYAMU
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database().ref("songs");

// 2. Fungsi Kirim
function kirimPesan() {
    const nama = document.getElementById('targetName').value;
    const mood = document.getElementById('moodSelect').value;
    const link = document.getElementById('spotifyUrl').value;
    const pesan = document.getElementById('messageText').value;

    if(nama === "" || link === "") {
        alert("Nama dan Link Spotify harus diisi!");
        return;
    }

    db.push({
        nama: nama,
        mood: mood,
        link: link,
        pesan: pesan
    }).then(() => {
        alert("Berhasil dikirim!");
        // Reset form
        document.getElementById('songForm').reset();
    }).catch((error) => {
        alert("Gagal kirim: " + error.message);
    });
}

// 3. Fungsi Ambil Data (Otomatis muncul di layar)
db.on("value", (snapshot) => {
    const list = document.getElementById('searchResultsArea');
    if (!list) return;
    
    list.innerHTML = "";
    snapshot.forEach((child) => {
        const s = child.val();
        list.innerHTML += `
            <div class="result-box">
                <p><strong>${s.nama}</strong> (${s.mood})</p>
                <p>${s.pesan}</p>
                <a href="${s.link}" target="_blank">🎵 Buka Lagu</a>
            </div>
        `;
    });
});
