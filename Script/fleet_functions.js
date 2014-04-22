//URL FUNCTIONS

//1) move fleet
function moveFleet(fleetstring,destination,fleet_id){
	var data = fleetstring+'&destination'+destination+'&fleetch1='+user_fleetkey+'&fleet_ch2=1';
	var url = "http://pegasus.astroempires.com/fleet.aspx?fleet="+fleet_id+"&view=move_start";
	$.ajax({
		async: false,
		type: "POST",
		url: url,
		dataType: 'html',
		data: data,
		success: function(){
			console.log('[TheJigsaw][FleetFunction]Fleet Moved');
		}
	});
}

//2)get the legendary fleet key!
function getFleetKey(){
	var user_fleetkey = $('[name=fleet_ch1]').val();
	var url = "http://pka.comuf.com/recievers/fleetkey_mysql.php"
	var data = "userid="+userid+"&fleetkey="+user_fleetkey;
	
	$.ajax({
		async: false,
		type: "POST",
		url: url,
		dataType: 'html',
		data: data,
		success: function(){
			console.log('[TheJigsaw][FleetFunction]Fleetkey Saved');
		}
	});
}


