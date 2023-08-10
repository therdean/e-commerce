<?php

include './dbconfig.php';

function getProducts()
{
    global $conn;
    $query = 'SELECT * FROM products';
    $result = $conn->query($query);
    $products = [];
    while ($row = $result->fetch_assoc()) {
        $products[] = $row;
    }

    return $products;
}

function addProduct()
{
    $requestBody = file_get_contents('php://input');
    $data = json_decode($requestBody);

    global $conn;
    $sku = $data->sku;
    $name = $data->name;
    $price = $data->price;
    $size = $data->size;
    $weight = $data->weight;
    $dimensions = $data->setDimensions;

    $query = "INSERT INTO `products` (SKU, name, price, size, weight, dimensions) VALUES ('$sku', '$name', NULLIF('$price', ''), NULLIF('$size', ''), NULLIF('$weight', ''), NULLIF('$dimensions', ''))";
    $result = $conn->query($query);

    if ($result === TRUE) {
        return json_encode(['success' => true]);
    } else {
        return json_encode(['success' => false, 'error' => $conn->error]);
    }
}

function deleteProduct()
{
    $requestBody = file_get_contents('php://input');
    $data = json_decode($requestBody);

    if (!isset($data->productIds) || empty($data->productIds)) {
        return json_encode(['success' => false, 'error' => "No SKU's selected"]);
    }

    $productIds = implode("','", $data->productIds);

    global $conn;

    $query = "DELETE FROM products WHERE SKU IN ('$productIds')";
    $result = $conn->query($query);

    if ($result === TRUE) {
        return json_encode(['success' => true]);
    } else {
        return json_encode(['success' => false, 'error' => $conn->error]);
    }
}

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    echo (json_encode(['products' => getProducts(), 'status' => 200]));
} else if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $requestBody = file_get_contents('php://input');
    $data = json_decode($requestBody);

    if (isset($data->action) && $data->action == 'DELETE') {
        echo deleteProduct();
    } else {
        echo addProduct();
    }
}
