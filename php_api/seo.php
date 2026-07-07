<?php
require_once 'config.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        if (isset($_GET['page'])) {
            $stmt = $conn->prepare("SELECT * FROM seo_settings WHERE page = ?");
            $stmt->execute([$_GET['page']]);
            $seo = $stmt->fetch(PDO::FETCH_ASSOC);
            if ($seo) {
                echo json_encode($seo);
            } else {
                http_response_code(404);
                echo json_encode(["message" => "SEO não encontrado para esta página."]);
            }
        } else {
            $stmt = $conn->query("SELECT * FROM seo_settings ORDER BY id ASC");
            $seoList = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($seoList);
        }
        break;

    case 'POST':
    case 'PUT':
        $data = json_decode(file_get_contents("php://input"));
        
        if (!empty($data->page) && !empty($data->title)) {
            // Check if page exists to update or insert
            $stmt = $conn->prepare("SELECT id FROM seo_settings WHERE page = ?");
            $stmt->execute([$data->page]);
            $existing = $stmt->fetch();

            if ($existing) {
                $stmt = $conn->prepare("UPDATE seo_settings SET title = ?, description = ?, keywords = ? WHERE page = ?");
                if ($stmt->execute([$data->title, $data->description, $data->keywords, $data->page])) {
                    echo json_encode(["message" => "SEO atualizado com sucesso."]);
                } else {
                    http_response_code(500);
                    echo json_encode(["message" => "Erro ao atualizar SEO."]);
                }
            } else {
                $stmt = $conn->prepare("INSERT INTO seo_settings (page, title, description, keywords) VALUES (?, ?, ?, ?)");
                if ($stmt->execute([$data->page, $data->title, $data->description, $data->keywords])) {
                    echo json_encode(["message" => "SEO criado com sucesso."]);
                } else {
                    http_response_code(500);
                    echo json_encode(["message" => "Erro ao criar SEO."]);
                }
            }
        } else {
            http_response_code(400);
            echo json_encode(["message" => "Página e Título são obrigatórios."]);
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(["message" => "Método não permitido."]);
        break;
}
?>
