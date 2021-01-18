<div class="products-list__item">
	<a class="products-item" href="<?=$item['link']?>">
		<span class="products-item__name"><?=$item['name']?></span>
		<span class="products-item__img">
			<img src="<?=$item['img']?>" alt="">
		</span>
		<span class="products-item__price">
			<?/*<span class="products-item__price--old">194,7 руб./м</span>*/?>
			<span class="products-item__price--new"><span><?=number_format($prices[ $item['link'] ], 0, '.', ' ')?></span> руб.</span>
		</span>
		<span class="products-item__footer">
			<span class="products-item__btn">Купить</span>
		</span>
	</a>
</div>