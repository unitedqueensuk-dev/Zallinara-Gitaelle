// 1. Konfigurasi
const firebaseConfig = {
    databaseURL: "https://send-the-song-default-rtdb.firebaseio.com/"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.database().ref("songs");

let messageDatabase = [];

// 2. Ambil data dari Firebase secara Realtime
db.on("value", (snapshot) => {
    messageDatabase = [];
    snapshot.forEach((child) => {
        messageDatabase.push(child.val());
    });
});

// 3. Fungsi Kirim (Dipanggil oleh tombol)
function kirimPesan() {
    const to = document.getElementById('toName').value.trim();
    const mood = document.getElementById('songMood').value;
    const song = document.getElementById('spotifyUrl').value.trim();
    const text = document.getElementById('messageText').value.trim();

    if(!to || !song) { alert("Nama dan Link Spotify wajib diisi!"); return; }

    db.push({ to, mood, song, text }).then(() => {
        alert("Pesan Berhasil Terkirim! 🚀");
        document.getElementById('songForm').reset();
    });
}

// 4. Fungsi Cari (Live Search)
function searchMessages() {
    const query = document.getElementById('searchName').value.trim().toLowerCase();
    const area = document.getElementById('searchResultsArea');
    if(query === "") { area.innerHTML = ""; return; }

    const filtered = messageDatabase.filter(item => item.to.toLowerCase().includes(query));
    
    area.innerHTML = "";
    filtered.forEach(item => {
        area.innerHTML += `
            <div class="result-box">
                <p><strong>${item.to}</strong> (${item.mood})</p>
                <p>${item.text}</p>
                <a href="${item.song}" target="_blank">🎵 Buka Spotify</a>
            </div>
        `;
    });
}
