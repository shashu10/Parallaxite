// Detailed view paging, and showing/hiding

var resizeTimer;
var scroll;

function close () {
	$("#detail").hide();
	$(".close").hide();
	$('body').css("position", "relative");


	$(window).scrollTop(scroll);
}

function show (title) {
	$(".entry").each(function () {
		$(this)
		.removeClass("visible")
		.addClass("hidden");

		if ($(this).attr("title") == title) {
			$(this)
			.addClass("visible")
			.removeClass("hidden");
		}
	});
	handleEdgeReached();
}

function handleEdgeReached() {
	var $entry = $(".entry.visible");
	var $nextBtn = $(".next");
	var $prevBtn = $(".prev");

	if ($entry.length) {

		// If next exists, enable the next button
		if ($entry.next(".entry").length) {
			$nextBtn
			.removeClass("disabled");
		} else {
			$nextBtn
			.addClass("disabled");
		}

		// If prev exists, enable the prev button
		if ($entry.prev(".entry").length) {
			$prevBtn
			.removeClass("disabled");
		} else {
			$prevBtn
			.addClass("disabled");
		}

	} else {

		// Noting exists, disable all buttons
		$nextBtn
		.addClass("disabled");
		$prevBtn
		.addClass("disabled");
	}
}

function next() {
	adjacent(function($visible) {
		return $visible.next(".entry");
	});
}
function prev() {
	adjacent(function($visible) {
		return $visible.prev(".entry");
	});
}
function adjacent(direction) {
	var $visible = $(".entry.visible");
	var $entry = direction($visible);

	if ($entry.length) {
		$visible
		.removeClass("visible")
		.addClass("hidden");

		$entry
		.addClass("visible")
		.removeClass("hidden");
	}
	handleEdgeReached();
}

$(function() {

	// Pagination in detailed view

	$(".next").click(function (e) {

		next();

		e.stopPropagation();
		e.preventDefault();
	});

	$(".prev").click(function (e) {

		prev();

		e.stopPropagation();
		e.preventDefault();
	});

	// -	-	-	-	-	-

	// Add some JavaScript to enable toggling the descriptions when an image is tapped on a touchscreen device

	// See if this is a touch device
	if ('ontouchstart' in window) {

		// Add the touch toggle to show text
		$('div.boxInner img').click(function() {
			$(this).closest('.boxInner').toggleClass('touchFocus');
		});
	}

	$(".boxInner").click(function (e) {

		scroll = $(window).scrollTop();

		$("#detail").show();
		$(".close").show();
		$('body').css("position", "fixed");
		var title = $(this).attr("title");
		show(title);

		// document.getElementById('detail').contentWindow.postMessage(title, '*');
	});

	$(".close").click(close);

	// Use arrows to navigate
	$(document).keyup(function(e) {
		if (e.keyCode == 27) { // escape
			close();
		} else if (e.keyCode == 37) { // left
			prev();
		} else if (e.keyCode == 39) { // right
			next();
		}
	});
});