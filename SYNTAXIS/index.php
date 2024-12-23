<?php
// Konfigurasi Database
$host = 'localhost';
$dbname = 'syntaxiss';
$username = 'root';
$password = '';

try {
    // Membuat koneksi PDO
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    
    // Set error mode ke exception
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Set karakter encoding
    $pdo->exec("set names utf8mb4");

} catch(PDOException $e) {
    // Jika koneksi gagal, tampilkan pesan error
    die("Connection failed: " . $e->getMessage());
}

// Start session
session_start();

// Fungsi untuk mengecek status login
function isLoggedIn() {
    return isset($_SESSION['user_id']);
}

// Ambil data user jika sudah login
$userData = null;
if (isLoggedIn()) {
    try {
        $stmt = $pdo->prepare("SELECT * FROM users WHERE id = ?");
        $stmt->execute([$_SESSION['user_id']]);
        $userData = $stmt->fetch(PDO::FETCH_ASSOC);
    } catch(PDOException $e) {
        error_log("Error fetching user data: " . $e->getMessage());
    }
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DIGIMED</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
        rel="stylesheet">
    <link rel="stylesheet" href="style.css">
    <link rel="icon" href="favicon.ico" type="image/x-icon">
</head>

<body>
    <header>
        <div class="container">
            <div class="logo">
                <img src="./img/profil_company1.png" class="logo-img" alt="Hospital Icon" width="70" height="70">
                <span style="font-family: 'poppins';">DIGIMED</span>
            </div>
            <nav>
                <ul class="nav" id="nav">
                    <?php if (isset($_SESSION['user_id'])): ?>
                        <li><a href="#" data-view="home">Beranda</a></li>
                        <li><a href="#" data-view="services">Layanan</a></li>
                        <li><a href="#" data-view="about">Tentang Kami</a></li>
                        <li><a href="#" data-view="contact">Kontak</a></li>
                        <li class="btn-navbar dropdown">
                            <img src="./img/default_user.svg" alt="Profile Picture" class="profile-pic" onclick="toggleDropdown()"/>
                            <div id="dropdownMenu" class="dropdown-menu">
                                <button class="dropdown-item" onclick="renderUserProfile()">Profil</button>
                                <button class="dropdown-item" onclick="logoutUser()">Logout</button>
                            </div>
                        </li>
                    <?php else: ?>
                        <li><a href="#" data-view="home">Beranda</a></li>
                        <li><a href="#" data-view="services">Layanan</a></li>
                        <li><a href="#" data-view="about">Tentang Kami</a></li>
                        <li><a href="#" data-view="contact">Kontak</a></li>
                        <li><a href="#" data-view="admin">Login</a></li>
                    <?php endif; ?>
                </ul>
            </nav>
        </div>
    </header>

    <main>
        <div  id="cont" class="container">
            <div id="app">
                <!-- Content will be dynamically inserted here -->
            </div>
        </div>
    </main>

    <footer>
        <div class="container">
            <p>&copy; 2024 RS Booking System. All rights reserved.</p>
            <div>
                <a href="#">Syarat & Ketentuan</a>
                <a href="#">Privasi</a>
            </div>
        </div>
    </footer>

    <!-- Tambahkan data PHP ke JavaScript -->
    <script>
        // Pass PHP session data to JavaScript
        const serverData = {
            isLoggedIn: <?php echo isLoggedIn() ? 'true' : 'false'; ?>,
            userData: <?php echo $userData ? json_encode($userData) : 'null'; ?>
        };

        // Update initial state with server data
        let initialState = JSON.parse(localStorage.getItem('state')) || {};
        initialState.isLoggedIn = serverData.isLoggedIn;
        initialState.userData = serverData.userData;
        localStorage.setItem('state', JSON.stringify(initialState));
    </script>
    <script src="script.js"></script>

    <!-- Tambahkan ini di bagian yang sesuai di index.php -->
    <div id="adminLoginContainer" style="display: none;">
        <div class="card">
            <h2>Admin Login</h2>
            <form id="adminLoginForm">
                <input type="email" id="adminEmailInput" placeholder="Email" required>
                <input type="password" id="adminPasswordInput" placeholder="Password" required>
                <button type="submit">Login</button>
            </form>
        </div>
    </div>
</body>

</html>