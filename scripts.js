<script>
    function toggleMenu() {
        var navList = document.getElementById("nav-list");
        navList.classList.toggle("active");
    }
   // Konfigurasi Firebase
const firebaseConfig = { databaseURL: "https://PROJECT-ID-KAMU.firebaseio.com/" };
firebase.initializeApp(firebaseConfig);
const db = firebase.database().ref("songs");

// Mengambil data dari Firebase
db.on("value", (snapshot) => {
    const list = document.getElementById('songList');
    list.innerHTML = ""; // Bersihkan list
    
    snapshot.forEach((child) => {
        const s = child.val();
        // Buat kartu pesan
        const card = document.createElement('div');
        card.className = 'song-card';
        card.setAttribute('data-name', s.to.toLowerCase()); // Untuk search
        
        card.innerHTML = `
            <div class="header">To: <strong>${s.to}</strong></div>
            <div class="message">${s.msg}</div>
            <div class="footer">🎵 ${s.mood}</div>
        `;
        list.appendChild(card);
    });
});

// Fungsi Search
function filterSongs() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const cards = document.getElementsByClassName('song-card');
    
    for (let card of cards) {
        const name = card.getAttribute('data-name');
        if (name.includes(input)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    }
}
}
</script>
