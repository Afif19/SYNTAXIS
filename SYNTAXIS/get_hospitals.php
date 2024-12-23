<?php
include 'db.php';
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['action']) && $_GET['action'] === 'getHospitals') {
    $hospitals = $conn->query("SELECT * FROM hospitals");
    
    $hospitalList = [];
    while($hospital = $hospitals->fetch_assoc()) {
        $hospitalList[] = [
            'id' => $hospital['id'],
            'name' => $hospital['name']
        ];
    }
    
    echo json_encode(['status' => 'success', 'hospitals' => $hospitalList]);
    exit;
}
?>