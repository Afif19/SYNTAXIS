<?php
include 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $hospitalId = isset($_GET['hospitalId']) ? filter_var($_GET['hospitalId'], FILTER_SANITIZE_NUMBER_INT) : null;
    
    try {
        $query = "SELECT * FROM doctors";
        if ($hospitalId) {
            $query .= " WHERE hospitalId = ?";
            $stmt = $pdo->prepare($query);
            $stmt->execute([$hospitalId]);
        } else {
            $stmt = $pdo->query($query);
        }
        
        $doctors = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode(['status' => 'success', 'doctors' => $doctors]);
    } catch (PDOException $e) {
        echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
    }
    exit;
}
?>