$(function () {
	$('.input-group.date').datepicker({
		todayHighlight: true,
		autoclose: false,
		todayBtn: "linked",
	});

	$('.input-group.input-daterange').datepicker({
		todayHighlight: true,
		autoclose: false,
		todayBtn: "linked",
	});

	$('.input-daterange input').each(function() {
    	$(this).datepicker("clearDates");
	});
});
