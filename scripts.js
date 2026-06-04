<script>
    function toggleMenu() {
        var navList = document.getElementById("nav-list");
        navList.classList.toggle("active");

} 
    <!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Inside Out - Send the Song</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

    <div class="container">
        <h1>Send the Song</h1>

        <div class="input-card">
            <input type="text" id="targetName" placeholder="Nama yang dituju...">
            
            <div class="mood-selector">
                <p>Pilih Mood:</p>
                <select id="moodSelect">
                    <option value="Joy 💛">Joy 💛</option>
                    <option value="Sadness 💙">Sadness 💙</option>
                    <option value="Anger ❤️">Anger ❤️</option>
                    <option value="Envy 💚">Envy 💚</option>
                </select>
            </div>

            <input type="text" id="songLink" placeholder="Link Spotify (https://...)">
            <textarea id="message" placeholder="Tulis pesanmu..."></textarea>
            <button onclick="kirimData()">Kirim Lagu</button>
        </div>

        <hr>

        <div class="search-box">
            <input type="text" id="searchInput" placeholder="Cari pesan untuk seseorang..." onkeyup="filterSongs()">
        </div>

        <div id="songList" class="grid-container">
            </div>
    </div>

    <script src="https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.6.1/firebase-database-compat.js"></script>
    <script src="script.js"></script>
</body>
</html>
</script>
