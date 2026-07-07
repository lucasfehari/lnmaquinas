<?php
require_once 'config.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        $stmt = $conn->query("SELECT * FROM partners ORDER BY order_index ASC, id DESC");
        $partners = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($partners);
        break;

    case 'POST':
        $data = json_decode(file_get_contents("php://input"));
        
        if (!empty($data->name) && !empty($data->image_url)) {
            $stmt = $conn->prepare("INSERT INTO partners (name, image_url, order_index) VALUES (?, ?, ?)");
            $order_index = isset($data->order_index) ? $data->order_index : 0;
            
            if ($stmt->execute([$data->name, $data->image_url, $order_index])) {
                $data->id = $conn->lastInsertId();
                http_response_code(201);
                echo json_encode($data);
            } else {
                http_response_code(500);
                echo json_encode(["message" => "Erro ao criar parceiro."]);
            }
        } else {
            http_response_code(400);
            echo json_encode(["message" => "Dados incompletos."]);
        }
        break;

    case 'DELETE':
        $id = isset($_GET['id']) ? intval($_GET['id']) : 0;
        
        if ($id > 0) {
            $stmt = $conn->prepare("DELETE FROM partners WHERE id = ?");
            if ($stmt->execute([$id])) {
                echo json_encode(["message" => "Parceiro deletado com sucesso."]);
            } else {
                http_response_code(500);
                echo json_encode(["message" => "Erro ao deletar parceiro."]);
            }
        } else {
            http_response_code(400);
            echo json_encode(["message" => "ID não fornecido."]);
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(["message" => "Método não permitido."]);
        break;
}
?>
