$(document).ready(function() {

	// Load Styleswticher
	$('head').append('<link rel="stylesheet" type="text/css" href="styleswitcher/styleswitcher.css">');
	$body.append('<div id="style-switcher-wrapper"></div>');
	$('#style-switcher-wrapper').load('styleswitcher/styleswitcher.html', function(){

		var $styleSwitcher = $('#style-switcher');

		var activeScheme = $('#theme').attr("href").substring(18); 
		activeScheme = activeScheme.substring(0,activeScheme.length-8); 
		activeScheme = activeScheme.split('/');
		var activeStyle = activeScheme[0];
		activeScheme = activeScheme[1].split('_');
		var activeColor = activeScheme[1];

		var $colorSwitcher = $('#color-switcher');

		$colorSwitcher.find('a').each(function() {
	        if($(this).data('color')==activeColor) $(this).addClass('active');
	    });

		var $typeSwitcher = $('#type-switcher');

		$typeSwitcher.find('a').each(function() {
	        if($(this).data('type')==activeStyle) $(this).addClass('active');
	    });

		$styleSwitcher.find('ul a').on('click', function(){
			$(this).parents('ul').find('a.active').removeClass('active');
			$(this).addClass('active');
			return false;
		});

		$colorSwitcher.find('a').on('click', function(){
			activeColor = $(this).data('color');
			setStyle(activeStyle,activeColor);
		});

		$typeSwitcher.find('a').on('click', function(){
			activeStyle = $(this).data('type');
			setStyle(activeStyle,activeColor);
		});

		function setStyle(type,color) {
			$('#theme').attr('href','assets/css/themes/'+type+'/theme_'+color+'.min.css');
		}

		// Toggle Click
		$('#style-switcher-toggle').on('click', function(e){
			$('#style-switcher-wrapper').toggleClass('show');
			e.stopPropagation();
		});

		$('#style-switcher .style-switcher-close').on('click', function(e){
			$('#style-switcher-wrapper').removeClass('show');
			e.stopPropagation();
		});

		$styleSwitcher.on('click', function(e){
			e.stopPropagation();
		});

	});

});

$(document).on('click', function (){
    $('#style-switcher-wrapper').removeClass('show');
});