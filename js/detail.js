// Detailed view paging, and showing/hiding

var scroll;

function close () {
	$("#detail").hide();
	$('#container').show();
	$('html').removeClass("detail");
	$(location).attr("hash", "");
	$(window).scrollTop(scroll);
}

function show (title) {
	$("#detail").show();
	$('#container').hide();
	$('html').addClass("detail");

	$(".entry").each(function () {
		$(this)
		.removeClass("visible")
		.addClass("hidden");

		if ($(this).attr("data-title") == title) {
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
		var title = $(this).attr("data-title");
		$(location).attr("hash", "#" + title);
		show(title);
	});

	// Show detail on pageload if entered with url
	// http://shashank.bio/#highlighter
	var detail = $(location).attr("hash");
	if (detail.length > 0) {
		console.log($(location).attr("hash").substring(1));
		show($(location).attr("hash").substring(1));
	}

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