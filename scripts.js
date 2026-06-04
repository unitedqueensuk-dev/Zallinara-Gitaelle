<input type="text" id="targetName" placeholder="Nama Tujuan">
<select id="moodSelect">
    <option value="Joy 💛">Joy 💛</option>
    </select>
<input type="text" id="spotifyLink" placeholder="Link Spotify">
<textarea id="message" placeholder="Pesan kamu..."></textarea>
<button onclick="kirimPesan()">Kirim Pesan</button>

<div id="pesanList"></div> ```

### Langkah 2: Update `script.js` (Copy-Paste ini saja)
Ganti seluruh isi `script.js` kamu dengan kode ini. **Ingat: Ganti bagian URL-nya saja!**

```javascript
// 1. Firebase Config (Ganti link ini dengan punyamu!)
const firebaseConfig = {
    databaseURL: "https://send-the-song-default-rtdb.firebaseio.com/"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database().ref("songs");

// 2. Fungsi Kirim
function kirimPesan() {
    const data = {
        nama: document.getElementById('targetName').value,
        mood: document.getElementById('moodSelect').value,
        link: document.getElementById('spotifyLink').value,
        pesan: document.getElementById('message').value
    };

    if(!data.nama || !data.link) {
        alert("Isi nama dan link dulu ya!");
        return;
    }

    db.push(data).then(() => {
        alert("Pesan Terkirim!");
        // Bersihkan form
        document.getElementById('targetName').value = '';
        document.getElementById('spotifyLink').value = '';
        document.getElementById('message').value = '';
    });
}

// 3. Fungsi Ambil Data (Supaya muncul di semua device)
db.on("value", (snapshot) => {
    const list = document.getElementById('pesanList');
    list.innerHTML = ""; 
    snapshot.forEach((child) => {
        const s = child.val();
        list.innerHTML += `
            <div style="background:white; padding:10px; margin:10px; border-radius:5px;">
                <strong>Kepada: ${s.nama}</strong> (${s.mood})<br>
                <p>${s.pesan}</p>
                <a href="${s.link}" target="_blank">Dengarkan Lagu</a>
            </div>
        `;
    });
});
