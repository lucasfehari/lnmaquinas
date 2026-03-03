<?php
$json = '{"name":"Test","category":"Tecnologia","price":0,"imageUrl":"http://test.com/img.jpg","inStock":true}';
$data = json_decode($json);

echo "Payload price: ";
var_dump($data->price);
echo "isset: " . (isset($data->price) ? 'yes' : 'no') . "\n";
echo "is_numeric: " . (is_numeric($data->price) ? 'yes' : 'no') . "\n";
echo "empty(name): " . (empty($data->name) ? 'yes' : 'no') . "\n";

if (!empty($data->name) && isset($data->price) && is_numeric($data->price)) {
    echo "Condition PASSED\n";
}
else {
    echo "Condition FAILED\n";
}
?>
