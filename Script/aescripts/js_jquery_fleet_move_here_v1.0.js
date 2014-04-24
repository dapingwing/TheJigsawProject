
$.ajaxSetup({timeout: 15000});

function load_fleet_move_to_destination(url) {
	start_fleet_move_to_destination();
	$.ajax( {
		cache: false ,
		url: url,
		success:	function(msg)	{ success_fleet_move_to_destination(msg) },
		error:		function()		{ error_fleet_move_to_destination() }
	});
}

//---------------------------------------------------------------

function start_fleet_move_to_destination() {
	$("#fleetLoaderTemplate").delay(1000).show(200);
}

function success_fleet_move_to_destination(msg) {
	if ( msg.match(/<ajax>/gi) )
		{
			msg.replace(/<ajax>/,'');
			msg.replace(/<\/ajax>/,'');
		}
	else
		{
		error_fleet_move_to_destination();
		return;
		}

	$("#move_to_destination_container").html(msg);
	$("#fleetLoaderTemplate").clearQueue().stop().hide();
}

function error_fleet_move_to_destination() {
	$("#fleetLoaderErrorTemplate").show();
	$("#fleetLoaderTemplate").clearQueue().stop().hide();
}