<?php
include 'db.php';
//ambil data dari rumah sakit sesuai yang di tuju
// Ambil data rumah sakit
$stmt = $pdo->query("SELECT * FROM hospitals");
$hospitals = $stmt->fetchAll(PDO::FETCH_ASSOC);

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $name = $_POST['name'];
    $nik = $_POST['nik'];
    $insuranceType = $_POST['insuranceType'];
    $poli = $_POST['poli'];
    $doctor = $_POST['doctor'];
    $date = $_POST['date'];
    $hospitalId = $_POST['hospitalId'];

    $stmt = $pdo->prepare("INSERT INTO patients (name, nik, insuranceType, poli, doctor, date, hospitalId) VALUES (?, ?, ?, ?, ?, ?, ?)");
    $stmt->execute([$name, $nik, $insuranceType, $poli, $doctor, $date, $hospitalId]);

    echo "Patient added successfully!";
}
?>
