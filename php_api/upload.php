<?php
// upload.php
require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents("php://input"));

    if (json_last_error() !== JSON_ERROR_NONE) {
        http_response_code(400);
        echo json_encode(["message" => "Invalid JSON payload. Possibly too large (check post_max_size)."]);
        exit;
    }

    if (!empty($data->image) && !empty($data->name)) {
        $upload_dir = '../uploads/'; // Goes one level up to 'public_html/uploads' when inside 'api' folder

        if (!file_exists($upload_dir)) {
            if (!@mkdir($upload_dir, 0777, true)) {
                $error = error_get_last();
                http_response_code(500);
                echo json_encode(["message" => "Permission denied. Failed to create uploads directory. " . ($error ? $error['message'] : '')]);
                exit;
            }
        }

        // Expected base64 format: "data:image/png;base64,....."
        $image_parts = explode(";base64,", $data->image);
        if (count($image_parts) < 2) {
            http_response_code(400);
            echo json_encode(["message" => "Invalid image format. Expected base64."]);
            exit;
        }

        $image_type_aux = explode("image/", $image_parts[0]);
        $image_type = isset($image_type_aux[1]) ? $image_type_aux[1] : 'png'; // default to png if unknown
        $image_base64 = base64_decode($image_parts[1]);

        if ($image_base64 === false) {
            http_response_code(400);
            echo json_encode(["message" => "Base64 decode failed."]);
            exit;
        }

        // Generate unique filename
        $file_name = uniqid() . '-' . time() . '.' . $image_type;
        $file_path = $upload_dir . $file_name;

        $bytes = @file_put_contents($file_path, $image_base64);

        if ($bytes !== false) {
            // Return the public URL
            $protocol = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http";
            $domain = $_SERVER['HTTP_HOST'];

            // If the script is in /php_api/, then ../uploads/ is accessible at /uploads/
            // BUT if the domain is mapped to a subfolder, it needs to be relative to the domain root.
            // Let's use an absolute path construct but ideally you'd know your exact public URL structure.
            // Assuming domain.com/uploads/ works:
            $public_url = "$protocol://$domain/uploads/$file_name";

            echo json_encode(["url" => $public_url, "size" => $bytes]);
        }
        else {
            $error = error_get_last();
            http_response_code(500);
            echo json_encode(["message" => "Failed to save file_put_contents. " . ($error ? $error['message'] : 'Permission denied.')]);
        }
    }
    else {
        http_response_code(400);
        echo json_encode(["message" => "No image data or filename provided."]);
    }
}
?>
