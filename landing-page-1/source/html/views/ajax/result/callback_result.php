<?
$result = array(
	'status' => true,
	'message' => '',
	'errors'  => array()
);

$mailTo = 'test@test.ru';
$mailTheme = 'Заказ обратного звонка';
$mailBody = '';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
	// поля
	$name = htmlspecialchars(trim($_POST['name']));
	$phone = htmlspecialchars(trim($_POST['phone']));
	$time = htmlspecialchars(trim($_POST['time']));
	// проверка обязательных полей
	if (strlen($name) < 3) {
		$result['status'] = false;
		$result['errors'][] = 'name';
	}
	if (strlen($phone) < 3) {
		$result['status'] = false;
		$result['errors'][] = 'phone';
	}
	if (strlen($time) < 3) {
		$result['status'] = false;
		$result['errors'][] = 'time';
	}
	// оправляем
	if ($result['status']) {
		$mailBody = 'Имя: ' . $name . "\r\n" .
			'Телефон: ' . $phone . "\r\n" .
			'Время: ' . $time;
		mail($mailTo, $mailTheme, $mailBody);
		$result['message'] = 'Спасибо что написали нам, мы ответим в ближайшее время';
	}
	// ответ
	echo json_encode($result);
	die;
}
