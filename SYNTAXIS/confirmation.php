<?php
session_start();
include 'db.php';

// Redirect jika belum login
if (!isset($_SESSION['user_id'])) {
    header('Location: auth.php');
    exit;
}
?>
<!DOCTYPE html>
<html>
<head>
    <title>Booking Confirmation</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <div id="app">
            <div class="card">
                <h2>Booking Confirmed</h2>
                <div id="confirmationDetails">
                    <!-- Detail konfirmasi akan diisi oleh JavaScript -->
                </div>
                <button id="newBookingBtn">Buat Booking Baru</button>
            </div>
        </div>
    </div>
    <script src="script.js"></script>
</body>
</html> 