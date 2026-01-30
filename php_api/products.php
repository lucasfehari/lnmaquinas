<?php
// products.php
require_once 'config.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        // List all products
        $stmt = $conn->prepare("SELECT * FROM products ORDER BY id DESC");
        $stmt->execute();
        $products = $stmt->fetchAll();
        
        // Convert numbers and map to camelCase
        $response = [];
        foreach ($products as $p) {
             $item = $p;
             $item['inStock'] = (bool)$p['in_stock']; // Map to camelCase
             $item['imageUrl'] = $p['image_url'];     // Map to camelCase
             $item['price'] = (float)$p['price'];
             
             // Remove snake_case keys if desired, or keep them. 
             // Ideally we just return the camelCase to match TypeScript interfaces.
             unset($item['in_stock']);
             unset($item['image_url']);
             
             $response[] = $item;
        }
        
        echo json_encode($response);
        break;

    case 'POST':
        // Add new product
        $data = json_decode(file_get_contents("php://input"));

        if (!empty($data->name) && !empty($data->price)) {
            $query = "INSERT INTO products (name, category, price, description, image_url, in_stock) VALUES (:name, :category, :price, :description, :image_url, :in_stock)";
            $stmt = $conn->prepare($query);

            $stmt->bindParam(":name", $data->name);
            $stmt->bindParam(":category", $data->category);
            $stmt->bindParam(":price", $data->price);
            $description = $data->description ?? '';
            $stmt->bindParam(":description", $description);
            $stmt->bindParam(":image_url", $data->imageUrl);
            $inStock = $data->inStock ? 1 : 0;
            $stmt->bindParam(":in_stock", $inStock);

            if ($stmt->execute()) {
                http_response_code(201);
                echo json_encode(["message" => "Product created", "id" => $conn->lastInsertId()]);
            } else {
                http_response_code(503);
                echo json_encode(["message" => "Unable to create product."]);
            }
        } else {
            http_response_code(400);
            echo json_encode(["message" => "Incomplete data."]);
        }
        break;

    case 'PUT':
        // Update product
        $data = json_decode(file_get_contents("php://input"));
        $id = isset($_GET['id']) ? $_GET['id'] : die();

        $query = "UPDATE products SET name = :name, category = :category, price = :price, description = :description, image_url = :image_url, in_stock = :in_stock WHERE id = :id";
        $stmt = $conn->prepare($query);

        $stmt->bindParam(":name", $data->name);
        $stmt->bindParam(":category", $data->category);
        $stmt->bindParam(":price", $data->price);
        $description = $data->description ?? '';
        $stmt->bindParam(":description", $description);
        $stmt->bindParam(":image_url", $data->imageUrl);
        $inStock = $data->inStock ? 1 : 0;
        $stmt->bindParam(":in_stock", $inStock);
        $stmt->bindParam(":id", $id);

        if ($stmt->execute()) {
            echo json_encode(["message" => "Product updated."]);
        } else {
            http_response_code(503);
            echo json_encode(["message" => "Unable to update product."]);
        }
        break;

    case 'DELETE':
        // Delete product
        $id = isset($_GET['id']) ? $_GET['id'] : die();

        $query = "DELETE FROM products WHERE id = :id";
        $stmt = $conn->prepare($query);
        $stmt->bindParam(":id", $id);

        if ($stmt->execute()) {
            echo json_encode(["message" => "Product deleted."]);
        } else {
            http_response_code(503);
            echo json_encode(["message" => "Unable to delete product."]);
        }
        break;
}
?>
