<?php
session_start();

// Hapus semua session admin
unset($_SESSION['admin_id']);
unset($_SESSION['admin_email']);
unset($_SESSION['admin_hospital_id']);
unset($_SESSION['is_admin']);

echo json_encode([
    'status' => 'success',
    'message' => 'Logout berhasil'
]);
?> 