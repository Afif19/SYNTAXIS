<?php
session_start();
include 'db.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    try {
        // Pastikan user sudah login
        if (!isset($_SESSION['user_id'])) {
            throw new Exception('Silakan login terlebih dahulu');
        }

        // Validasi input
        $userId = $_SESSION['user_id'];
        $doctorId = filter_var($_POST['doctorId'], FILTER_SANITIZE_NUMBER_INT);
        $hospitalId = filter_var($_POST['hospitalId'], FILTER_SANITIZE_NUMBER_INT);
        $patientName = filter_var($_POST['patientName'], FILTER_SANITIZE_STRING);
        $nik = filter_var($_POST['nik'], FILTER_SANITIZE_STRING);
        $insuranceType = $_POST['insuranceType'];
        $bpjsNumber = $insuranceType === 'bpjs' ? filter_var($_POST['bpjsNumber'], FILTER_SANITIZE_STRING) : null;
        $bookingDate = $_POST['bookingDate'];
        $bookingCode = $_POST['bookingCode'];

        // Validasi keberadaan dokter
        $stmt = $pdo->prepare("SELECT id FROM doctors WHERE id = ?");
        $stmt->execute([$doctorId]);
        if ($stmt->rowCount() === 0) {
            throw new Exception('Dokter tidak ditemukan');
        }

        // Validasi keberadaan rumah sakit
        $stmt = $pdo->prepare("SELECT id FROM hospitals WHERE id = ?");
        $stmt->execute([$hospitalId]);
        if ($stmt->rowCount() === 0) {
            throw new Exception('Rumah sakit tidak ditemukan');
        }

        // Insert booking
        $stmt = $pdo->prepare("INSERT INTO bookings (userId, doctorId, hospitalId, patientName, nik, insuranceType, bpjsNumber, bookingDate, bookingCode) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
        
        if ($stmt->execute([$userId, $doctorId, $hospitalId, $patientName, $nik, $insuranceType, $bpjsNumber, $bookingDate, $bookingCode])) {
            echo json_encode([
                'status' => 'success',
                'message' => 'Booking berhasil',
                'bookingId' => $pdo->lastInsertId()
            ]);
        } else {
            throw new Exception('Gagal menyimpan booking');
        }

    } catch (Exception $e) {
        http_response_code(400);
        echo json_encode([
            'status' => 'error',
            'message' => $e->getMessage()
        ]);
    }
    exit;
}
?> 