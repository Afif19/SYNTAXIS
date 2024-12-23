<?php
session_start();
include 'db.php';

// Redirect jika belum login
if (!isset($_SESSION['user_id'])) {
    header('Location: check_auth.php');
    exit;
}
?>
<!DOCTYPE html>
<html>
<head>
    <title>Booking Form</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <div id="app">
            <div class="card">
                <h2>Booking Form</h2>
                <input type="text" id="patientName" placeholder="Nama Lengkap" required>
                <input type="text" id="patientNIK" placeholder="NIK" required>
                <select id="insuranceType">
                    <option value="umum">Umum</option>
                    <option value="bpjs">BPJS</option>
                </select>
                <div id="bpjsField" style="display: none;">
                    <input type="text" id="bpjsNumber" placeholder="Nomor BPJS">
                </div>
                <div id="bookingDetails">
                    <!-- Detail booking akan diisi oleh JavaScript -->
                </div>
                <button id="confirmBtn" disabled>Konfirmasi Booking</button>
                <button id="backBtn" class="back-btn">Kembali</button>
            </div>
        </div>
    </div>
    <script src="script.js"></script>
</body>
</html> 