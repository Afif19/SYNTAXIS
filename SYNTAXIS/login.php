<?php
session_start();
include 'db.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    try {
        // Debug: Log request data
        error_log("Login attempt - Request data: " . print_r($_POST, true));

        // Ambil dan bersihkan input
        $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
        $password = $_POST['password'];

        // Validasi input
        if (empty($email) || empty($password)) {
            throw new Exception('Email dan password harus diisi');
        }

        // Validasi email
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            throw new Exception('Format email tidak valid');
        }

        // Debug: Log email yang dicari
        error_log("Searching for email: " . $email);

        // Cek kredensial
        $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
        $stmt->execute([$email]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        // Debug: Log hasil query
        error_log("Query result: " . print_r($user, true));

        if (!$user) {
            throw new Exception('Email tidak ditemukan');
        }

        if (!password_verify($password, $user['password'])) {
            throw new Exception('Password salah');
        }

        // Set session
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['email'] = $user['email'];

        // Debug: Log session
        error_log("Session set: " . print_r($_SESSION, true));

        echo json_encode([
            'status' => 'success',
            'message' => 'Login berhasil',
            'user' => [
                'id' => $user['id'],
                'email' => $user['email']
            ]
        ]);

    } catch (Exception $e) {
        error_log("Login error: " . $e->getMessage());
        http_response_code(400);
        echo json_encode([
            'status' => 'error',
            'message' => $e->getMessage()
        ]);
    }
    exit;
}
?>