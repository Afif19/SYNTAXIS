<?php
require_once 'db.php';

try {
    // Data admin dari JavaScript
    $admins = [
        [
            'email' => 'admin1@gmail.com',
            'password' => 'password123',
            'hospitalId' => 1
        ],
        [
            'email' => 'admin2@gmail.com',
            'password' => 'password456',
            'hospitalId' => 2
        ],
        [
            'email' => 'admin3@gmail.com',
            'password' => 'password789',
            'hospitalId' => 3
        ]
    ];

    // Prepare statement untuk insert dengan nama kolom yang benar
    $stmt = $pdo->prepare("INSERT INTO admins (email, password, hospitalId) VALUES (?, ?, ?)");

    // Insert setiap admin
    foreach ($admins as $admin) {
        // Hash password sebelum disimpan
        $hashedPassword = password_hash($admin['password'], PASSWORD_DEFAULT);
        
        $stmt->execute([
            $admin['email'],
            $hashedPassword,
            $admin['hospitalId']
        ]);
    }

    echo "Admin data successfully inserted!";

} catch (PDOException $e) {
    die("Error inserting admin data: " . $e->getMessage());
}
?>
