<?php
require_once 'config.php';

$json = '{"name":"Produto Teste","category":"Máquinas","price":0,"description":"","imageUrl":"http://placehold.it/100","inStock":true}';
$data = json_decode($json);

echo "Testing INSERT into products...\n";

if (!empty($data->name) && isset($data->price) && is_numeric($data->price)) {
    try {
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
            echo "SUCCESS: Product created, ID: " . $conn->lastInsertId() . "\n";
        }
        else {
            echo "FAILED execute()\n";
            var_dump($stmt->errorInfo());
        }
    }
    catch (PDOException $e) {
        echo "PDO EXCEPTION:\n";
        echo $e->getMessage() . "\n";
    }
}
else {
    echo "Condition failed. Data dump:\n";
    var_dump($data);
}
?>
