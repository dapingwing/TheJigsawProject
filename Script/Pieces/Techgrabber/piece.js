/*###################################
#Name :			TechGrabber			#
#System :		PKA Jigsaw			#
#Part :			Check tech levels	#
#Step :			3					#
#####################################*/
$(document).on('click','#techfetch', function(){
	userlist = [];
	
	console.log('clicked');
	tg_child = parseFloat($(this).attr('class'));
	tg_selector = 'form .board-listing tr:nth-child('+tg_child+')';
	console.log(tg_selector);
	tg_table_selector = tg_selector + ' .battle-report_info tbody';
	tg_attacker_selector = tg_selector +' .battle-report_info tbody tr:nth-child(6) a';
	tg_defender_selector = tg_selector +' .battle-report_info tbody tr:nth-child(9) a';
	
	//CHECK FOR COMMAND CENTERS
	defend_multi = '0';
	tg_cc = 0;
	tg_cc_selector = tg_selector +' .battle-report_info tbody tr:nth-child(14) td:nth-child(2)';
	if( $( tg_cc_selector ).length ){
		tg_cc_pass = 1;
	}else{
		tg_cc_test = tg_selector +' .battle-report_info tbody tr:nth-child(8) td:nth-child(1)';
		tg_cc_pass = 0;
		if($(tg_cc_test).text() == 'Command Centers'){
			tg_cc_pass = 1;
			tg_defender_selector = tg_selector +' .battle-report_info tbody tr:nth-child(10) a';
			tg_cc_selector = tg_selector +' .battle-report_info tbody tr:nth-child(8) td:nth-child(2)';
		}
	}
	
	//IF COMMAND CENTER CHECK FOR COMMANDERS
	if( tg_cc_pass == 1 && $(tg_cc_selector).text() !=0){
		
		tg_commander_selector = tg_selector +' .battle-report_info tbody tr:nth-child(15) td:nth-child(2)';
		tg_cc = $(tg_cc_selector).text();
		console.log(tg_cc);
		tg_commander = $(tg_commander_selector).text().match(/\((.*)\)/);
		if( $( tg_commander_selector ).length ){
			if(tg_commander.indexOf('Defence ')){
				defend_multi = ( parseFloat(tg_commander[0].replace('Defence','')));
			}
		}
	}
	console.log('defend multiplier= '+defend_multi);
	
	//PLAYER INFO
	tg_attacker = $(tg_attacker_selector).attr('href').replace("profile.aspx?player=","");
	tg_defender = $(tg_defender_selector).attr('href').replace("profile.aspx?player=","");
	userlist.push(tg_attacker);
	userlist.push(tg_defender);
	console.log('attacker='+tg_attacker);
	console.log('defender='+tg_defender);
	
	data_attack = 'name='+tg_attacker;
	data_defend = 'name='+tg_defender;
	//Getting the actual data
/*##########ATTACKER#############*/
			shield_tech = 0;
			armour_tech = 0;
			calc_power = 0;
			techlist = '';
			levellist = '';
	tg_data_attack = tg_selector + ' .battle-report_attack tr';
	// Laser 2 Missiles	3 Plasma 4 Ion 5 Photon 6 Disruptor	7

	$(tg_data_attack).each(function(i){
		if(i>1){
			tg_attack_fleet = $(this).find('td:nth-child(1)').text();
			console.log('attackfleet ='+tg_attack_fleet);
			
			if(tg_attack_fleet == 'Fighters'){
				power = 2;
				armour = 2;
				shield =  0;
				techid = 2;	
			}
			if(tg_attack_fleet == 'Bombers'){
				power = 4;
				armour = 2;
				shield =  0;
				techid = 3;
			}
			if(tg_attack_fleet == 'Heavy Bombers'){
				power = 10;
				armour = 4;
				shield =  0;
				techid = 4;
			}
			if(tg_attack_fleet == 'Ion Bombers'){
				power = 12;
				armour = 4;
				shield =  1;
				techid = 5;
			}
			if(tg_attack_fleet == 'Corvette'){
				power = 4;
				armour = 4;
				shield =  0;
				techid = 2;
			}
			if(tg_attack_fleet == 'Recycler'){
				power = 2;
				armour = 2;
				shield =  0;
				techid = 2;
			}
			if(tg_attack_fleet == 'Destroyer'){
				power = 8;
				armour = 8;
				shield =  0;
				techid = 4;
			}
			if(tg_attack_fleet == 'Frigate'){
				power = 12;
				armour = 12;
				shield =  0;
				techid = 3;
			}
			if(tg_attack_fleet == 'Ion Frigate'){
				power = 14;
				armour = 12;
				shield =  1;
				techid = 5;
			}
			if(tg_attack_fleet == 'Scout Ship'){
				power = 1;
				armour = 2;
				shield =  0;
				techid = 2;
			}
			if(tg_attack_fleet == 'Outpost Ship'){
				power = 2;
				armour = 4;
				shield =  0;
				techid = 2;
			}
			if(tg_attack_fleet == 'Cruiser'){
				power = 24;
				armour = 24;
				shield =  2;
				techid = 4;
			}
			if(tg_attack_fleet == 'Carrier'){
				power = 12;
				armour = 24;
				shield =  2;
				techid = 3;
			}
			if(tg_attack_fleet == 'Heavy Cruiser'){
				power = 48;
				armour = 48;
				shield =  4;
				techid = 4;
			}
			if(tg_attack_fleet == 'Battleship'){
				power = 168;
				armour = 128;
				shield =  10;
				techid = 5;
			}
			if(tg_attack_fleet == 'Fleet Carrier'){
				power = 64;
				armour = 96;
				shield =  8;
				techid = 5;
			}
			if(tg_attack_fleet == 'Dreadnought'){
				power = 756;
				armour = 512;
				shield =  20;
				techid = 6;
			}
			if(tg_attack_fleet == 'Titan'){
				power = 3500;
				armour = 2048;
				shield =  30;
				techid = 7;
			}
			if(tg_attack_fleet == 'Death Star'){
				power = 26500;
				armour = 14000;
				shield =  60;
				techid = 7;
			}
			calc_power =  Math.round( ((parseFloat($(this).find('td:nth-child(4)').text())/power)-1)*20);
			armour_tech = Math.round( ((parseFloat($(this).find('td:nth-child(5)').text())/armour)-1)*20);
			shield_tech = Math.round( ((parseFloat($(this).find('td:nth-child(6)').text())/shield)-1)*20);
			techlist = techlist + ','+techid;
			levellist = levellist + ','+calc_power;
			
		}else{
			shield_tech = 0;
			armour_tech = 0;
		}
		if(isNaN(shield_tech)) {
			shield_tech = 0;
		}
		if(isNaN(armour_tech)) {
			armour_tech = 0;
		}
	});
	console.log('armour ='+armour_tech);
	console.log('shield ='+shield_tech);
	console.log('techlist ='+techlist);
	console.log('levellist ='+levellist);
	tech_data = 'id='+tg_attacker+'&armour='+armour_tech+'&shield='+shield_tech+'&levellist='+levellist+'&techlist='+techlist+'&jid='+jigsaw_user_id;;
	$.ajax({
		async: false,
		type: "POST",
		url: domain+"/recievers/scout_tech_mysql.php",
		dataType: 'html',
		data: tech_data,
		success: function(){
			
		},
		error: function(ts) { alert(ts.responseText) }
	}).done(function(data){
		console.log('[TechGrabber]Reply:'+data);
		tg_part2();
	});
});
function tg_part2(){
/*##########DEFENDER#############*/
			shield_tech = 0;
			armour_tech = 0;
			calc_power = 0;
			techlist = '';
			levellist = '';
	tg_data_attack = tg_selector + ' .battle-report_defense tr';
	// Laser 2 Missiles	3 Plasma 4 Ion 5 Photon 6 Disruptor	7

	$(tg_data_attack).each(function(i){
		if(i>1){
			tg_attack_fleet = $(this).find('td:nth-child(1)').text();
			console.log('attackfleet ='+tg_attack_fleet);
			
			if(tg_attack_fleet == 'Fighters'){
				power = 2;
				armour = 2;
				shield =  0;
				techid = 2;	
			}
			if(tg_attack_fleet == 'Bombers'){
				power = 4;
				armour = 2;
				shield =  0;
				techid = 3;
			}
			if(tg_attack_fleet == 'Heavy Bombers'){
				power = 10;
				armour = 4;
				shield =  0;
				techid = 4;
			}
			if(tg_attack_fleet == 'Ion Bombers'){
				power = 12;
				armour = 4;
				shield =  1;
				techid = 5;
			}
			if(tg_attack_fleet == 'Corvette'){
				power = 4;
				armour = 4;
				shield =  0;
				techid = 2;
			}
			if(tg_attack_fleet == 'Recycler'){
				power = 2;
				armour = 2;
				shield =  0;
				techid = 2;
			}
			if(tg_attack_fleet == 'Destroyer'){
				power = 8;
				armour = 8;
				shield =  0;
				techid = 4;
			}
			if(tg_attack_fleet == 'Frigate'){
				power = 12;
				armour = 12;
				shield =  0;
				techid = 3;
			}
			if(tg_attack_fleet == 'Ion Frigate'){
				power = 14;
				armour = 12;
				shield =  1;
				techid = 5;
			}
			if(tg_attack_fleet == 'Scout Ship'){
				power = 1;
				armour = 2;
				shield =  0;
				techid = 2;
			}
			if(tg_attack_fleet == 'Outpost Ship'){
				power = 2;
				armour = 4;
				shield =  0;
				techid = 2;
			}
			if(tg_attack_fleet == 'Cruiser'){
				power = 24;
				armour = 24;
				shield =  2;
				techid = 4;
			}
			if(tg_attack_fleet == 'Carrier'){
				power = 12;
				armour = 24;
				shield =  2;
				techid = 3;
			}
			if(tg_attack_fleet == 'Heavy Cruiser'){
				power = 48;
				armour = 48;
				shield =  4;
				techid = 4;
			}
			if(tg_attack_fleet == 'Battleship'){
				power = 168;
				armour = 128;
				shield =  10;
				techid = 5;
			}
			if(tg_attack_fleet == 'Fleet Carrier'){
				power = 64;
				armour = 96;
				shield =  8;
				techid = 5;
			}
			if(tg_attack_fleet == 'Dreadnought'){
				power = 756;
				armour = 512;
				shield =  20;
				techid = 6;
			}
			if(tg_attack_fleet == 'Titan'){
				power = 3500;
				armour = 2048;
				shield =  30;
				techid = 7;
			}
			if(tg_attack_fleet == 'Death Star'){
				power = 26500;
				armour = 14000;
				shield =  60;
				techid = 7;
			}
			if(tg_attack_fleet == 'Barracks'){
				power = 4;
				armour = 4;
				shield =  0;
				techid = 2;
				tg_cc = 0;
			}
			if(tg_attack_fleet == 'Laser Turrets'){
				power = 8;
				armour = 8;
				shield =  0;
				techid = 2;
				tg_cc = 0;
			}
			if(tg_attack_fleet == 'Missile Turrets'){
				power = 16;
				armour = 16;
				shield =  0;
				techid = 3;
				tg_cc = 0;
			}
			if(tg_attack_fleet == 'Plasma Turrets'){
				power = 24;
				armour = 24;
				shield =  0;
				techid = 4;
				tg_cc = 0;
			}
			if(tg_attack_fleet == 'Ion Turrets'){
				power = 32;
				armour = 32;
				shield =  2;
				techid = 5;
				tg_cc = 0;
			}
			if(tg_attack_fleet == 'Photon Turrets'){
				power = 64;
				armour = 64;
				shield =  6;
				techid = 6;
				tg_cc = 0;
			}
			if(tg_attack_fleet == 'Disruptor Turrets'){
				power = 256;
				armour = 256;
				shield =  8;
				techid = 7;
				tg_cc = 0;
			}
			if(tg_attack_fleet == 'Deflection Shields'){
				power = 2;
				armour = 512;
				shield =  16;
				techid = 5;
				tg_cc = 0;
			}
			if(tg_attack_fleet == 'Planetary Shield'){
				power = 4;
				armour = 2048;
				shield =  20;
				techid = 5;
				tg_cc = 0;
			}
			if(tg_attack_fleet == 'Planetary Ring'){
				power = 2048;
				armour = 1024;
				shield =  12;
				techid = 6;
				tg_cc = 0;
			}
			powerlevel = parseFloat($(this).find('td:nth-child(4)').text());
			tg_cc = parseFloat(tg_cc);
			if(tg_cc == 0){
				calc_power =  Math.round(( (parseFloat($(this).find('td:nth-child(4)').text())/power)-1)*20);
			}else{
				calc_power1 =  (( powerlevel*20 )/power).toFixed(2);
				calc_power2 = (calc_power1/(20+tg_cc)).toFixed(2);
				calc_power3 = (calc_power2 - 1).toFixed(2);
				calc_power = Math.round((calc_power3*20));
			}
			armour_tech = Math.round( ((parseFloat($(this).find('td:nth-child(5)').text())/armour)-1)*20);
			shield_tech = Math.round( ((parseFloat($(this).find('td:nth-child(6)').text())/shield)-1)*20);
			techlist = techlist + ','+techid;
			levellist = levellist + ','+calc_power;
			
		}else{
			shield_tech = 0;
			armour_tech = 0;
		}
		if(isNaN(shield_tech)) {
			shield_tech = 0;
		}
		if(isNaN(armour_tech)) {
			armour_tech = 0;
		}
	});
	console.log('armour ='+armour_tech);
	console.log('shield ='+shield_tech);
	console.log('techlist ='+techlist);
	console.log('levellist ='+levellist);
	tech_data = 'id='+tg_defender+'&armour='+armour_tech+'&shield='+shield_tech+'&levellist='+levellist+'&techlist='+techlist+'&jid='+jigsaw_user_id;;
	$.ajax({
		async: false,
		type: "POST",
		url: domain+"/recievers/scout_tech_mysql.php",
		dataType: 'html',
		data: tech_data,
		success: function(){
			
		},
		error: function(ts) { alert(ts.responseText) }
	}).done(function(data){
		console.log('[TechGrabber]Reply:'+data);
		check_count_rival= 1;
		check_count = 1;
		loadplayer(0, 1);
	});
}