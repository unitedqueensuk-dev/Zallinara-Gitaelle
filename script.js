// Konfigurasi
const firebaseConfig = {
    databaseURL: "https://send-the-song-default-rtdb.firebaseio.com/" 
};
firebase.initializeApp(firebaseConfig);
const db = firebase.database().ref("songs");

let messageDatabase = [];

// Ambil data
db.on("value", (snapshot) => {
    messageDatabase = [];
    snapshot.forEach((child) => {
        messageDatabase.push(child.val());
    });
});

// Fungsi Kirim
function kirimPesan() {
    const to = document.getElementById('toName').value;
    const mood = document.getElementById('songMood').value;
    const song = document.getElementById('spotifyUrl').value;
    const text = document.getElementById('messageText').value;

    if(!to || !song) { alert("Isi nama dan link!"); return; }

    db.push({ to, mood, song, text }).then(() => {
        alert("Berhasil terkirim!");
        document.getElementById('songForm').reset();
    });
}

// Fungsi Cari
function searchMessages() {
    const query = document.getElementById('searchName').value.toLowerCase();
    const area = document.getElementById('searchResultsArea');
    area.innerHTML = "";

    const filtered = messageDatabase.filter(item => item.to.toLowerCase().includes(query));
    
    filtered.forEach(item => {
        area.innerHTML += `
            <div class="result-box">
                <p><strong>${item.to}</strong> (${item.mood})</p>
                <p>${item.text}</p>
                <a href="${item.song}" target="_blank">Buka Lagu</a>
            </div>
        `;
    });
}
