<?php
// upload.php
require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents("php://input"));
    
    if (!empty($data->image) && !empty($data->name)) {
        $upload_dir = '../uploads/'; // Goes one level up to 'public_html/uploads' when inside 'api' folder
        if (!file_exists($upload_dir)) {
            mkdir($upload_dir, 0777, true);
        }

        // Expected base64 format: "data:image/png;base64,....."
        $image_parts = explode(";base64,", $data->image);
        $image_type_aux = explode("image/", $image_parts[0]);
        $image_type = $image_type_aux[1];
        $image_base64 = base64_decode($image_parts[1]);
        
        // Generate unique filename
        $file_name = uniqid() . '.' . $image_type;
        $file_path = $upload_dir . $file_name;
        
        if (file_put_contents($file_path, $image_base64)) {
            // Return the public URL
            // Adjust this URL to match your actual domain
            $protocol = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http";
            $domain = $_SERVER['HTTP_HOST'];
            // This assumes api is at /api and uploads at /uploads
            $public_url = "$protocol://$domain/uploads/$file_name";
            
            echo json_encode(["url" => $public_url]);
        } else {
             http_response_code(500);
             echo json_encode(["message" => "Failed to save file."]);
        }
    } else {
        http_response_code(400);
        echo json_encode(["message" => "No image data."]);
    }
}
?>
