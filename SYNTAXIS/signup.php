<?php
session_start();
include 'db.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    try {
        // Ambil dan bersihkan input
        $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
        $password = $_POST['password'];

        // Validasi email
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            throw new Exception('Email tidak valid');
        }

        // Cek apakah email sudah terdaftar
        $stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
        $stmt->execute([$email]);
        if ($stmt->rowCount() > 0) {
            throw new Exception('Email sudah terdaftar');
        }

        // Hash password
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

        // Insert user baru (tanpa username)
        $stmt = $pdo->prepare("INSERT INTO users (email, password) VALUES (?, ?)");
        if ($stmt->execute([$email, $hashedPassword])) {
            // Set session
            $_SESSION['user_id'] = $pdo->lastInsertId();
            $_SESSION['email'] = $email;

            echo json_encode([
                'status' => 'success',
                'message' => 'Pendaftaran berhasil',
                'user' => [
                    'id' => $_SESSION['user_id'],
                    'email' => $email
                ]
            ]);
        } else {
            throw new Exception('Gagal menyimpan data');
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