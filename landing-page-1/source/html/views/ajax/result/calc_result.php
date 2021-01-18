<?
$result = array(
	'status' => true,
	'message' => '',
	'errors'  => array()
);

$mailTo = 'romantsat@gmail.com';
$mailTheme = 'Расчет нужного кабеля';
$mailBody = '';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
	// поля
	$name = htmlspecialchars(trim($_POST['name']));
	$phone = htmlspecialchars(trim($_POST['phone']));
	$email = htmlspecialchars(trim($_POST['email']));
	$text = htmlspecialchars(trim($_POST['text']));
	$file = $_FILES['file'];
	// проверка обязательных полей
	if (strlen($name) < 3) {
		$result['status'] = false;
		$result['errors'][] = 'name';
	}
	if (strlen($phone) < 3) {
		$result['status'] = false;
		$result['errors'][] = 'phone';
	}
	if (strlen($email) < 3) {
		$result['status'] = false;
		$result['errors'][] = 'email';
	}
	if (strlen($text) < 3) {
		$result['status'] = false;
		$result['errors'][] = 'text';
	}
	if (!empty( $_FILES['file']['tmp_name'] ) && $_FILES['file']['error'] == 0 ) {
		$filepath = $_FILES['file']['tmp_name'];
		$filename = $_FILES['file']['name'];
	  } else {
		$filepath = '';
		$filename = '';
	  }
	// оправляем
	if ($result['status']) {
		$mailBody = 'Имя: ' . $name . "\r\n" .
			'Телефон: ' . $phone . "\r\n" .
			'E-mail: ' . $email . "\r\n" .
			'Сообщение: ' . $text;
		send_mail($mailTo,$mailBody, $email, $filepath,$filename);
		// mail($mailTo, $mailTheme, $mailBody);
		$result['message'] = 'Спасибо что написали нам, мы ответим в ближайшее время';
	}
	// ответ
	echo json_encode($result);
	die;
}


// Вспомогательная функция для отправки почтового сообщения с вложением
function send_mail($to, $body, $email, $filepath, $filename)
{
  $subject = 'Тестирование формы с прикреплением файла с сайта proverstka.com.ua';
  $boundary = "--".md5(uniqid(time())); // генерируем разделитель
  $headers = "From: ".$email."\r\n";   
  $headers .= "MIME-Version: 1.0\r\n";
  $headers .="Content-Type: multipart/mixed; boundary=\"".$boundary."\"\r\n";
  $multipart = "--".$boundary."\r\n";
  $multipart .= "Content-type: text/plain; charset=\"utf-8\"\r\n";
  $multipart .= "Content-Transfer-Encoding: quoted-printable\r\n\r\n";

  $body = $body."\r\n\r\n";
 
  $multipart .= $body;
 
  $file = '';
  if ( !empty( $filepath ) ) {
    $fp = fopen($filepath, "r");
    if ( $fp ) {
      $content = fread($fp, filesize($filepath));
      fclose($fp);
      $file .= "--".$boundary."\r\n";
      $file .= "Content-Type: application/octet-stream\r\n";
      $file .= "Content-Transfer-Encoding: base64\r\n";
      $file .= "Content-Disposition: attachment; filename=\"".$filename."\"\r\n\r\n";
      $file .= chunk_split(base64_encode($content))."\r\n";
    }
  }
  $multipart .= $file."--".$boundary."--\r\n";
  mail($to, $subject, $multipart, $headers);
}
