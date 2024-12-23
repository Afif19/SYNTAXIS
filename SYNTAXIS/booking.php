<?php
session_start();
include 'db.php';

// Pastikan pasien sudah login
if (!isset($_SESSION['patient_id'])) {
    echo "Silakan login terlebih dahulu.";
    exit;
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $name = filter_var($_POST['name'], FILTER_SANITIZE_STRING);
    $nik = filter_var($_POST['nik'], FILTER_SANITIZE_STRING);
    $insuranceType = $_POST['insuranceType'];
    $hospitalId = $_POST['hospitalId'];
    $doctor = filter_var($_POST['doctor'], FILTER_SANITIZE_STRING);
    $date = $_POST['date'];

    // Menyimpan data booking
    $stmt = $pdo->prepare("INSERT INTO bookings (name, nik, insuranceType, hospitalId, doctor, date) VALUES (?, ?, ?, ?, ?, ?)");
    if ($stmt->execute([$name, $nik, $insuranceType, $hospitalId, $doctor, $date])) {
        echo "Booking berhasil!";
    } else {
        echo "Terjadi kesalahan saat melakukan booking.";
    }
}
?>

<!-- Form untuk booking -->
<form method="POST" action="booking.php">
    <input type="text" name="name" placeholder="Nama Lengkap" required>
    <input type="text" name="nik" placeholder="NIK" required>
    <select name="insuranceType" required>
        <option value="umum">Umum</option>
        <option value="bpjs">BPJS</option>
    </select>
    <select name="hospitalId" required>
        <option value="">Pilih Rumah Sakit</option>
        <option value="1">RSUD Sleman</option>
        <option value="2">RS Puri Husada</option>
        <option value="3">RS JIH</option>
    </select>
    <input type="text" name="doctor" placeholder="Dokter" required>
    <input type="date" name="date" required>
    <button type="submit">Booking</button>
</form>
