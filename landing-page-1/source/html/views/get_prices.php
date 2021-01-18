<?
$products = include($_SERVER['DOCUMENT_ROOT'] . '/includes/products.php');
$result = array();
foreach ($products as $item) {
	$html = file_get_contents($item['link']);
	preg_match('/data-price-amount="(\d+)"/ms', $html, $price);
	$result[ $item['link'] ] = $price[1];
}
file_put_contents('prices.txt', json_encode($result));
echo "done";