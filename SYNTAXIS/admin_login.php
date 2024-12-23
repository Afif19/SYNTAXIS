<?php
session_start();
require_once 'db.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['email'];
    $password = $_POST['password'];

    try {
        // Cari admin berdasarkan email
        $stmt = $pdo->prepare("SELECT * FROM admins WHERE email = ?");
        $stmt->execute([$email]);
        $admin = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($admin && password_verify($password, $admin['password'])) {
            // Login berhasil
            $_SESSION['admin_id'] = $admin['id'];
            $_SESSION['admin_email'] = $admin['email'];
            $_SESSION['admin_hospital_id'] = $admin['hospitalId'];

            echo json_encode([
                'status' => 'success',
                'message' => 'Login berhasil',
                'adminData' => [
                    'id' => $admin['id'],
                    'email' => $admin['email'],
                    'hospitalId' => $admin['hospitalId']
                ]
            ]);
        } else {
            // Login gagal
            http_response_code(401);
            echo json_encode([
                'status' => 'error',
                'message' => 'Email atau password salah'
            ]);
        }
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode([
            'status' => 'error',
            'message' => 'Terjadi kesalahan pada server'
        ]);
    }
}
?> 