<?php
// categories.php
require_once 'config.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        // List all categories
        $stmt = $conn->prepare("SELECT * FROM categories ORDER BY name ASC");
        $stmt->execute();
        $categories = $stmt->fetchAll();
        
        // Map to simpler structure
        $response = [];
        foreach ($categories as $c) {
             $item = [];
             $item['id'] = (int)$c['id'];
             $item['name'] = $c['name'];
             $item['slug'] = $c['slug'];
             $response[] = $item;
        }
        
        echo json_encode($response);
        break;

    case 'POST':
        // Add new category
        $data = json_decode(file_get_contents("php://input"));

        if (!empty($data->name)) {
            // Check duplicate
            $stmt = $conn->prepare("SELECT id FROM categories WHERE name = :name");
            $stmt->execute([':name' => $data->name]);
            if ($stmt->fetch()) {
                http_response_code(409);
                echo json_encode(["message" => "Categoria já existe."]);
                break;
            }

            // Generate slug if not provided
            $slug = strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $data->name)));
            
            $query = "INSERT INTO categories (name, slug) VALUES (:name, :slug)";
            $stmt = $conn->prepare($query);

            $stmt->bindParam(":name", $data->name);
            $stmt->bindParam(":slug", $slug);

            if ($stmt->execute()) {
                http_response_code(201);
                echo json_encode(["message" => "Category created", "id" => $conn->lastInsertId(), "slug" => $slug]);
            } else {
                http_response_code(503);
                echo json_encode(["message" => "Unable to create category."]);
            }
        } else {
            http_response_code(400);
            echo json_encode(["message" => "Name is required."]);
        }
        break;

    case 'DELETE':
        // Delete category
        $id = isset($_GET['id']) ? $_GET['id'] : die();

        // Prevent deleting if products are using it (Optional check, skipping for simplicity)

        $query = "DELETE FROM categories WHERE id = :id";
        $stmt = $conn->prepare($query);
        $stmt->bindParam(":id", $id);

        if ($stmt->execute()) {
            echo json_encode(["message" => "Category deleted."]);
        } else {
            http_response_code(503);
            echo json_encode(["message" => "Unable to delete category."]);
        }
        break;
}
?>
