<?php
// banners.php
require_once 'config.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        // List all banners
        $stmt = $conn->prepare("SELECT * FROM banners ORDER BY order_index ASC, id DESC");
        $stmt->execute();
        $banners = $stmt->fetchAll();
        
        // Map snake_case DB to camelCase React Types
        $response = [];
        foreach ($banners as $b) {
             $item = [];
             $item['id'] = (int)$b['id'];
             $item['title'] = $b['title'];
             $item['subtitle'] = $b['subtitle'];
             $item['text'] = $b['text'];
             
             // Mappings
             $item['image'] = $b['image_url'];
             $item['cta'] = $b['cta_text'];
             $item['link'] = $b['link_url'];
             
             $response[] = $item;
        }
        
        echo json_encode($response);
        break;

    case 'POST':
        // Add new banner
        $data = json_decode(file_get_contents("php://input"));

        if (!empty($data->image)) {
            $query = "INSERT INTO banners (title, subtitle, text, cta_text, link_url, image_url) VALUES (:title, :subtitle, :text, :cta, :link, :image)";
            $stmt = $conn->prepare($query);

            $stmt->bindParam(":title", $data->title);
            $stmt->bindParam(":subtitle", $data->subtitle);
            $stmt->bindParam(":text", $data->text);
            $stmt->bindParam(":cta", $data->cta);
            $stmt->bindParam(":link", $data->link);
            $stmt->bindParam(":image", $data->image);

            if ($stmt->execute()) {
                http_response_code(201);
                echo json_encode(["message" => "Banner created", "id" => $conn->lastInsertId()]);
            } else {
                http_response_code(503);
                echo json_encode(["message" => "Unable to create banner."]);
            }
        } else {
            http_response_code(400);
            echo json_encode(["message" => "Image is required."]);
        }
        break;

    case 'PUT':
        // Update banner
        $data = json_decode(file_get_contents("php://input"));
        $id = isset($_GET['id']) ? $_GET['id'] : die();

        // Create dynamic update query based on fields provided
        $fields = [];
        $params = [':id' => $id];

        if (isset($data->title)) { $fields[] = "title = :title"; $params[':title'] = $data->title; }
        if (isset($data->subtitle)) { $fields[] = "subtitle = :subtitle"; $params[':subtitle'] = $data->subtitle; }
        if (isset($data->text)) { $fields[] = "text = :text"; $params[':text'] = $data->text; }
        if (isset($data->cta)) { $fields[] = "cta_text = :cta"; $params[':cta'] = $data->cta; }
        if (isset($data->link)) { $fields[] = "link_url = :link"; $params[':link'] = $data->link; }
        if (isset($data->image)) { $fields[] = "image_url = :image"; $params[':image'] = $data->image; }

        if (empty($fields)) {
            echo json_encode(["message" => "No fields to update."]);
            break;
        }

        $query = "UPDATE banners SET " . implode(", ", $fields) . " WHERE id = :id";
        $stmt = $conn->prepare($query);

        if ($stmt->execute($params)) {
            echo json_encode(["message" => "Banner updated."]);
        } else {
            http_response_code(503);
            echo json_encode(["message" => "Unable to update banner."]);
        }
        break;

    case 'DELETE':
        // Delete banner
        $id = isset($_GET['id']) ? $_GET['id'] : die();

        $query = "DELETE FROM banners WHERE id = :id";
        $stmt = $conn->prepare($query);
        $stmt->bindParam(":id", $id);

        if ($stmt->execute()) {
            echo json_encode(["message" => "Banner deleted."]);
        } else {
            http_response_code(503);
            echo json_encode(["message" => "Unable to delete banner."]);
        }
        break;
}
?>
