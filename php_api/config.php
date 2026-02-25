<?php
// config.php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Database Credentials - CHANGE THESE TO MATCH YOUR CPANEL DATABASE
$host = "localhost";
$db_name = "jhona447_lnmaquinas";

$username = "lucasfehari";
$password = "Lucasandrade13+";

try {
    $conn = new PDO("mysql:host=" . $host . ";dbname=" . $db_name . ";charset=utf8", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $conn->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
}
catch (PDOException $exception) {
    // If we are developing locally without PHP, we typically won't see this unless we run a local PHP server.
    // For production, this will log connection errors.
    echo json_encode(["error" => "Connection error: " . $exception->getMessage()]);
    exit();
}
?>
