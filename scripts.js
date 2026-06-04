<script>
    function toggleMenu() {
        var navList = document.getElementById("nav-list");
        navList.classList.toggle("active");

} 
    const firebaseConfig = {
    databaseURL: "https://PROJECT-KAMU-default-rtdb.firebaseio.com/"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.database().ref("songs");

function kirimPesan() {
    const data = {
        nama: document.getElementById('targetName').value,
        mood: document.getElementById('moodSelect').value,
        link: document.getElementById('spotifyLink').value,
        pesan: document.getElementById('message').value
    };

    if(!data.nama || !data.link) return alert("Isi semua data ya!");

    db.push(data).then(() => {
        alert("Pesan Terkirim!");
        document.getElementById('targetName').value = '';
        document.getElementById('spotifyLink').value = '';
        document.getElementById('message').value = '';
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
