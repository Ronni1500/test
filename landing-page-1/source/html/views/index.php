<? include($_SERVER['DOCUMENT_ROOT'] . '/includes/header.php') ?>

<section class="slider menu-section" id="section-slider">
	<div class="slider__container container">
		<div class="slider__content">
			<div class="slider__company">Группа компаний «Специальные системы и технологии»</div>
			<div class="slider__title">САМОРЕГУЛИРУЮЩИЙСЯ КАБЕЛЬ<br> со скидкой до 18%!</div>
			<div class="slider__text">Являясь центром национальной отраслевой экспертизы, мы хотим предложить Вам лучшее решение мирового уровня - саморегулирующиеся кабели собственного производства - по специальной цене в рамках акции "Весеннее потепление".</div>
			<div class="slider__footer">
				<div class="slider__callback">
					<button class="btn" data-popup-form="callback">Заказать обратный звонок</button>
				</div>
				<div class="slider__calc">
					<a class="get-calc" href="#section-calc">
						<i class="get-calc__icon"><svg><use xlink:href="#svg-down"></svg></i>
						<span class="get-calc__text">Получить бесплатный расчёт</span>
					</a>
				</div>
			</div>
		</div>
	</div>
</section>

<?
$products = include($_SERVER['DOCUMENT_ROOT'] . '/includes/products.php');
$prices = json_decode(file_get_contents('prices.txt'), true);
?>
<section class="products menu-section" id="section-products">
	<header class="products__heading">
		<div class="products__container container">
			<h2>Выберите нужный кабель</h2>
		</div>
	</header>
	<div class="products__body">
		<div class="products__container container">
			<div class="products-tabs">
				<div class="products-tabs__tabs">
					<div class="products-tabs__tab is-selected" data-tab="1" data-file="<?=$_SERVER['DOCUMENT_ROOT'].'/file/Form_Oprosnye_listy_truboprovod.pdf'?>">Для трубопроводов</div>
					<div class="products-tabs__tab" data-tab="2" data-file="<?=$_SERVER['DOCUMENT_ROOT'].'/file/Form_Oprosnye_listy_vodostok-krovlja.pdf'?>">Для кровли и водосточных систем</div>
					<div class="products-tabs__tab" data-tab="3" data-file="<?=$_SERVER['DOCUMENT_ROOT'].'/file/Form_Oprosnye_listy_reservoir.pdf'?>">Для резервуаров</div>
					<div class="products-tabs__tab" data-tab="4" data-file="<?=$_SERVER['DOCUMENT_ROOT'].'/file/Form_Oprosnye_listy_obogrev.pdf'?>">Для открытых площадок</div>
				</div>
				<div class="products-tabs__contents">
					<div class="products-tabs__content is-selected" data-tab="1">
						<div class="products-list">
							<?
							$tab1 = $products;
							shuffle($tab1);
							foreach ($tab1 as $item) {
								include($_SERVER['DOCUMENT_ROOT'] . '/includes/product_item.php');
							}
							?>
						</div>
					</div>
					<div class="products-tabs__content" data-tab="2">
						<div class="products-list">
							<?
							$tab2 = array();
							for ($i=0; $i < 12; $i++) { $tab2[] = $products[$i]; }
							for ($i=20; $i < 28; $i++) { $tab2[] = $products[$i]; }
							shuffle($tab2);
							foreach ($tab2 as $item) {
								include($_SERVER['DOCUMENT_ROOT'] . '/includes/product_item.php');
							}
							?>
						</div>
					</div>
					<div class="products-tabs__content" data-tab="3">
						<div class="products-list">
							<?
							$tab3 = array();
							for ($i=0; $i < 12; $i++) { $tab3[] = $products[$i]; }
							for ($i=20; $i < 28; $i++) { $tab3[] = $products[$i]; }
							shuffle($tab3);
							foreach ($tab3 as $item) {
								include($_SERVER['DOCUMENT_ROOT'] . '/includes/product_item.php');
							}
							?>
						</div>
					</div>
					<div class="products-tabs__content" data-tab="4">
						<div class="products-list">
							<?
							$tab4 = array();
							for ($i=12; $i < 20; $i++) { $tab4[] = $products[$i]; }
							shuffle($tab4);
							foreach ($tab4 as $item) {
								include($_SERVER['DOCUMENT_ROOT'] . '/includes/product_item.php');
							}
							?>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<section class="should menu-section" id="section-should">
	<div class="should__container container">
		<header class="should__heading">
			<h2>Чтобы подобрать подходящий кабель, необходимо учитывать:</h2>
		</header>
		<div class="should__list">
			<ul>
				<li>Параметры помещения или обогреваемого объекта</li>
				<li>Мощность тепловыделения кабеля</li>
				<li>Необходимую температуру нагрева</li>
			</ul>
			<ul>
				<li>Минимульную температуру монтажа</li>
				<li>Особенности электропитания объекта</li>
				<li>Степень защиты и температурный класс кабеля</li>
			</ul>
		</div>
		<div class="should__text">
			<p>Наши специалисты бесплатно рассчитают вам все нужные параметры и подберут подходящие варианты из ассортимента</p>
		</div>
	</div>
</section>

<section class="features menu-section" id="section-features">
	<div class="features__container container">
		<header class="features__heading">
			<h2>Особенности и преимущества наших нагревательных кабелей</h2>
		</header>
		<div class="features__items">
			<div class="features__item">
				<i class="features__icon"><svg><use xlink:href="#svg-features_1"></svg></i>
				<div class="features__title">Изготавливаем на заказ</div>
				<div class="features__text">любого цвета и под разное напряжение</div>
			</div>
			<div class="features__item">
				<i class="features__icon features__icon--orange"><svg><use xlink:href="#svg-features_2"></svg></i>
				<div class="features__title">Нарезка любой длины</div>
				<div class="features__text"> (от 30 см) без изменения характеристик, точно в соответствии с длиной нагреваемой зоны</div>
			</div>
			<div class="features__item">
				<i class="features__icon"><svg><use xlink:href="#svg-features_3"></svg></i>
				<div class="features__title">Автоматическое уменьшение или увеличение тепловыделения</div>
				<div class="features__text">на расстоянии 20 мм без регулирующей аппаратуры</div>
			</div>
			<div class="features__item">
				<i class="features__icon features__icon--orange"><svg><use xlink:href="#svg-features_4"></svg></i>
				<div class="features__title">Все кабели экранированы,</div>
				<div class="features__text">имеют механическую и электрическую защиту, обладают повышенной безопасностью, благодаря использованию оплетки и внешней оболочки</div>
			</div>
			<div class="features__item">
				<i class="features__icon features__icon--orange"><svg><use xlink:href="#svg-features_5"></svg></i>
				<div class="features__title">Не перегреваются и не перегорают</div>
				<div class="features__text">даже при самопересечении</div>
			</div>
			<div class="features__item">
				<i class="features__icon"><svg><use xlink:href="#svg-features_6"></svg></i>
				<div class="features__title">Можно отрезать,</div>
				<div class="features__text">наращивать и разветвлять при использовании</div>
			</div>
			<div class="features__item">
				<i class="features__icon features__icon--orange"><svg><use xlink:href="#svg-features_7"></svg></i>
				<div class="features__title">Могут поддерживать температуру продукта:</div>
				<div class="features__text">*низкотемпературные – 30С <br>*среднетемпературные – 80С<br>*высокотемпературные – 150С</div>
			</div>
			<div class="features__item">
				<i class="features__icon"><svg><use xlink:href="#svg-features_8"></svg></i>
				<div class="features__title">Стойкость к коррозии,</div>
				<div class="features__text">к агрессивным и химическим средам</div>
			</div>
		</div>
	</div>
</section>
<section class="features menu-section" id="section-features">
	<div class="features__container container">
		<header class="features__heading">
			<h2>Что получают наши клиенты</h2>
		</header>
		<div class="features__items">
			<div class="features__item">
				<i class="features__icon"><svg><use xlink:href="#svg-features_1"></svg></i>
				<div class="features__title">Бесплатная техническая консультация</div>
			</div>
			<div class="features__item">
				<i class="features__icon features__icon--orange"><svg><use xlink:href="#svg-features_2"></svg></i>
				<div class="features__title">Бесплатный подбор продукции по спецификации</div>
			</div>
			<div class="features__item">
				<i class="features__icon"><svg><use xlink:href="#svg-features_3"></svg></i>
				<div class="features__title">Бесплатный выделенный менеджер на проект</div>
			</div>
			<div class="features__item">
				<i class="features__icon features__icon--orange"><svg><use xlink:href="#svg-features_4"></svg></i>
				<div class="features__title">Бесплатное обучение для монтажных бригад</div>
			</div>
		</div>
	</div>
</section>
<section class="calc menu-section" id="section-calc">
	<div class="calc__container container">
		<header class="calc__heading">
			<h2>Получите расчёт нужного кабеля</h2>
		</header>
		<div class="calc__text">Вам потребуется заполнить все поля и нажать на кнопку “получить расчёт”</div>
		<form class="calc__form" method="post" enctype="multipart/form-data" action="/ajax/result/calc_result.php" data-form-ajax>
			<div class="calc__row">
				<div class="calc__field">
					<input type="text" name="name" placeholder="Имя">
				</div>
				<div class="calc__field">
					<input type="tel" name="phone" placeholder="Телефон" data-mask="phone">
				</div>
				<div class="calc__field">
					<input type="email" name="email" placeholder="Почта">
				</div>
			</div>
			<div class="calc__row">
				<div class="calc__field">
					<textarea name="text" rows="3" placeholder="Ваши пожелания"></textarea>
				</div>
			</div>
			<div class="calc__row">
				<div class="calc__field">
					<input type="file" name="file" value="">
				</div>
			</div>
			<div class="calc__row">
				<div class="calc__download">
					<a href="<?= $_SERVER['DOCUMENT_ROOT'].'/file/Form_Oprosnye_listy_truboprovod.pdf';?>">Скачать расчетный лист</a>
				</div>
				<div class="calc__footer">
					<button type="submit">Получить расчёт</button>
				</div>
			</div>
		</form>
	</div>
</section>

<? include($_SERVER['DOCUMENT_ROOT'] . '/includes/footer.php') ?>