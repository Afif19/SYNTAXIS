<?php
session_start();
include 'db.php';

header('Content-Type: application/json');

if (isset($_SESSION['user_id'])) {
    // Ambil data user
    $stmt = $pdo->prepare("SELECT id, email FROM users WHERE id = ?");
    $stmt->execute([$_SESSION['user_id']]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user) {
        echo json_encode([
            'status' => 'success',
            'isLoggedIn' => true,
            'user' => [
                'id' => $user['id'],
                'email' => $user['email']
            ]
        ]);
    } else {
        echo json_encode([
            'status' => 'error',
            'isLoggedIn' => false,
            'message' => 'User tidak ditemukan'
        ]);
    }
} else {
    echo json_encode([
        'status' => 'error',
        'isLoggedIn' => false,
        'message' => 'Tidak ada session aktif'
    ]);
}
?> 