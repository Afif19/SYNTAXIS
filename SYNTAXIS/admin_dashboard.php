<?php
session_start();
if (!isset($_SESSION['admin_id'])) {
    header('Location: index.php?page=admin');
    exit;
}
?>
<!DOCTYPE html>
<html>
<head>
    <title>Admin Dashboard</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div id="app">
        <!-- Dashboard akan di-render oleh JavaScript -->
    </div>
    <script src="script.js"></script>
    <script>
        // Render dashboard admin saat halaman dimuat
        document.addEventListener('DOMContentLoaded', function() {
            if (localStorage.getItem('adminLoggedIn') === 'true') {
                renderAdminDashboard();
            } else {
                window.location.href = 'index.php?page=admin';
            }
        });
    </script>
</body>
</html> 