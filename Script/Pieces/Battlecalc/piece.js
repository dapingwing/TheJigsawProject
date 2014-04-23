// BATTLECALC //
////////////////
// Show initialisation code
console.log('[TheJigsaw][PIECE][Battlecalc] Loaded');
//Listener + shower
$('#left #pka-tools').append('<li><a href="#" id="pi-battlecalc">BattleCalc</a></li>');
$(document).on('click', '#tabs-1 #left #pi-battlecalc', function(e) {
	e.preventDefault();
	console.log($('#urlwhore').val());
	if($('#urlwhore').val().indexOf("base.aspx") >= 0){
		activaterelay();
	}else{
		alert('Not on base page');
	}
});

/*###################################
#Name :			Relay System		#
#System :		PKA Jigsaw			#
#Part :			Show button +data	#
#Step :			1					#
#####################################*/
function activaterelay(){
	//user link --> tech
	r_userlink = $('#base_processing-capacities table tr:nth-child(1) a').attr('href');
	//get defences list
	r_defences = "";
	$('.box5_ctr table tr:nth-child(4) span').each(function(){
		r_defences = r_defences + "," + $(this).text();
	});
	//get fleet data
	$(".box3_ctr table tr").each(function(){
		if($(this).find("td:nth-child(2) a").attr('href') == r_userlink){
			r_fleetlink = $(this).find("td:nth-child(4) a").attr('href');
		}
	});
	r_fleetlink = r_fleetlink+' #fleet_overview';
	$( "#datawhore" ).load( r_fleetlink, function() {
		relay_part_2(r_defences,r_userlink);
	});
}
function relay_part_2(r_defences,r_userlink){
	r_fleettype = '';
	r_fleetamount = '';
	$('#datawhore tr').each(function(){
		r_fleet = $(this).find('td b').text();
			if(r_fleet == 'Fighters'){
				r_fleettype = r_fleettype+',1';
			}
			if(r_fleet == 'Bombers'){
				r_fleettype = r_fleettype+',2';
			}
			if(r_fleet == 'Heavy Bombers'){
				r_fleettype = r_fleettype+',3';
			}
			if(r_fleet == 'Ion Bombers'){
				r_fleettype = r_fleettype+',4';
			}
			if(r_fleet == 'Corvette'){
				r_fleettype = r_fleettype+',5';
			}
			if(r_fleet == 'Recycler'){
				r_fleettype = r_fleettype+',6';
			}
			if(r_fleet == 'Destroyer'){
				r_fleettype = r_fleettype+',7';
			}
			if(r_fleet == 'Frigate'){
				r_fleettype = r_fleettype+',8';
			}
			if(r_fleet == 'Ion Frigate'){
				r_fleettype = r_fleettype+',9';
			}
			if(r_fleet == 'Scout Ship'){
				r_fleettype = r_fleettype+',10';
			}
			if(r_fleet == 'Outpost Ship'){
				r_fleettype = r_fleettype+',11';
			}
			if(r_fleet == 'Cruiser'){
				r_fleettype = r_fleettype+',12';
			}
			if(r_fleet == 'Carrier'){
				r_fleettype = r_fleettype+',13';
			}
			if(r_fleet == 'Heavy Cruiser'){
				r_fleettype = r_fleettype+',14';
			}
			if(r_fleet == 'Battleship'){
				r_fleettype = r_fleettype+',15';
			}
			if(r_fleet == 'Fleet Carrier'){
				r_fleettype = r_fleettype+',16';
			}
			if(r_fleet == 'Dreadnought'){
				r_fleettype = r_fleettype+',17';
			}
			if(r_fleet == 'Titan'){
				r_fleettype = r_fleettype+',18';
			}
			if(r_fleet == 'Death Star'){
				r_fleettype = r_fleettype+',19';
			}
			r_fleetamount = r_fleetamount+','+$(this).find('td:nth-child(2)').text().replace(/\,/,'');
	});
	console.log('user ='+r_userlink);
	console.log('defences='+r_defences);
	console.log('fleet='+r_fleettype);
	console.log('amount='+r_fleetamount);
	r_userlink = r_userlink.replace("profile.aspx?player=","");
	relay_data = 'id='+r_userlink+'&defencelist='+r_defences+'&fleetlist='+r_fleettype+'&amountlist='+r_fleetamount;
	$.ajax({
		async: false,
		type: "POST",
		url: "http://pka.comuf.com/relay_battlecalc.php",
		dataType: 'html',
		data: relay_data,
		success: function(){
			
		},
		error: function(ts) { alert(ts.responseText) }
	}).done(function(data){
		 window.open(data, '_blank');
	});
}