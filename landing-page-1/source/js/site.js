var vw = window.innerWidth;
var vh = window.innerHeight;
var sw = screen.width;
var sh = screen.height;
var scroll = window.pageYOffset || document.documentElement.scrollTop;

jQuery(document).ready(function ($) {

	/* PARAMS */

	$(window).resize(function () {
		vw = window.innerWidth;
		vh = window.innerHeight;
		sw = screen.width;
		sh = screen.height;
	});

	$(document).scroll(function () {
		scroll = window.pageYOffset || document.documentElement.scrollTop;
	});

	initInput();

	/* ACTIONS */

	// плавный скролл и отключение пустых ссылок
	$('[href^="#"]').click(function (e) {
		e.preventDefault();
		if ($(this).attr('href').length > 1) {
			scroll2element($($(this).attr('href')), 1000, $('.header').outerHeight(false), false);
		}
	});

	// placeholders
	(function () {
		var placeholder = '';
		$(document).on('focusin', 'input, textarea', function () {
			placeholder = $(this).attr('placeholder');
			$(this).attr('placeholder', '');
		});
		$(document).on('focusout', 'input, textarea', function () {
			$(this).attr('placeholder', placeholder);
		});
	})();

	// main menu
	(function () {
		$('.header-menu__toggle').click(function (e) {
			e.preventDefault();
			$('.wrapper').toggleClass('is-menu-open');
		});
		$(document).scroll(function () {
			mainMenuFixed();
			mainMenuSelected();
		});
		function mainMenuFixed() {
			var $wrapper = $('.wrapper'),
				$headerPadding = $('.header-padding'),
				headerOffset = $('.top-panel').outerHeight(false);

			if (scroll > headerOffset) {
				$headerPadding.height(headerOffset);
				$wrapper.addClass('is-header-fixed');
			} else {
				$wrapper.removeClass('is-header-fixed');
			}
		}
		function mainMenuSelected() {
			var $sections = $('.menu-section');
			$sections.each(function (i, el) {
				var top = $(el).offset().top;
				var bottom = top + $(el).height();
				var scroll = $(window).scrollTop() + vh / 2;
				var id = $(el).attr('id');
				if (scroll > top && scroll < bottom) {
					$('a.is-selected').removeClass('is-selected');
					$('a[href="#' + id + '"]').addClass('is-selected');
				}
			});
		}
	})();

	// product tabs
	$('.products-tabs__tab').click(function (e) {
		e.preventDefault();
		var i = $(this).data('tab');
		var filepath = $(this).data('file');
		$('.calc__download a').attr("href",filepath);
		$('.products-tabs__tab, .products-tabs__content').removeClass('is-selected');
		$('[data-tab="' + i + '"]').addClass('is-selected');
	});

	// ajax forms
	$(document).on('submit', '[data-form-ajax]', function (e) {
		e.preventDefault();
		sendForm($(this));
	});

	// popup forms
	$('[data-popup-form]').click(function (e) {
		e.preventDefault();
		var form = $(this).data('popup-form');
		$.colorbox({
			href: '/ajax/form/' + form + '_form.html',
			className: 'form',
			maxWidth: '98%',
			maxHeight: '98%',
			transition: 'fade',
			opacity: false
		});
	})

	// colorbox close icon
	$(document).bind('cbox_complete', function () {
		initInput();
		$("#cboxClose").html('<svg><use xlink:href="#svg-close"></svg>');
	});

});

/* FUNCTIONS */

function sendForm($el) {
	var $form = $el,
		$btn = $form.find('button'),
		fd = new FormData($form[0]);

	if ($btn.hasClass('is-disabled')) return;

	$.ajax({
		url: $form.attr('action'),
		type: $form.attr('method'),
		data: fd,
		processData: false,
		contentType: false,
		dataType: 'json',
		// dataType: 'html',
		beforeSend: function () {
			hideErrorFields($form);
			showBtnLoaded($btn);
		},
		success: function (data) {
			// console.log('form success', data);
			setTimeout(function () {
				hideBtnLoaded($btn);
				initInput();

				if (data.errors) {
					showErrorFields($form, data.errors);
				}
				if (data.status) {
					$form[0].reset();
					showAlert(data.message);
				}
			}, 500);
		},
		error: function (data) {
			// console.log('form error:', data);
			setTimeout(function () {
				hideErrorFields($form);
				hideBtnLoaded($btn);
			}, 500);
		}
	});

	function showErrorFields($form, errors) {
		$.each(errors, function (i, val) {
			$el = $form.find("[name='" + val + "']");
			if ($el.length) $el.addClass('is-error');
		});
	}
	function hideErrorFields($form) {
		$form.find('.error').removeClass('is-error');
	}

	function showBtnLoaded($btn) {
		$btn.addClass('is-disabled');
	}
	function hideBtnLoaded($btn) {
		$btn.removeClass('is-disabled');
	}

}

function showAlert($msg) {
	$.colorbox({
		html: '<div class="message">' + $msg + '</div>',
		maxWidth: '98%',
		maxHeight: '98%',
		transition: 'fade',
		opacity: false
	});
}

function initInput() {
	$('[data-mask="phone"]').inputmask("+7-999-999-99-99");
}

function scroll2element($el, speed, offset, edges) {
	if (speed == undefined) speed = 'slow';
	if (offset == undefined) offset = 0;
	if (edges == undefined) edges = true;

	var scroll = $el.offset().top - offset,
		topEdge = window.pageYOffset,
		bottomEdge = window.pageYOffset + document.documentElement.clientHeight
	bNeedScroll = edges ? (scroll < topEdge || scroll > bottomEdge) : true;

	if (bNeedScroll) {
		$('html, body').animate({
			scrollTop: scroll + 'px'
		}, speed);
	}
}