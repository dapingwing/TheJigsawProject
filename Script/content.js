$(document).ready(function(){
	
/////////////////////////////////
//variables
pathname = window.location.pathname;
scantargets = new Array();
detailtargets = new Array();
fleetlist = new Array();
userlist = new Array();
domain = "http://pka.comuf.com"
console.log(pathname);
check_count = 1;
check_count_rival = 0;
techlist = '';
levellist = '';
jigsaw_user_id = $('#account .btn_ctr div').text();
console.log('Welcome user '+jigsaw_user_id+' to the JigSaw');
////////////////////////////////
//GET VARS
var $_GET = {};

document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
    function decode(s) {
        return decodeURIComponent(s.split("+").join(" "));
    }

    $_GET[decode(arguments[1])] = decode(arguments[2]);
});
/*###########################################################################################################
										PAGE MODIFIERS
###########################################################################################################*/
/*###################################
#Name :			ScoutMainframe		#
#System :		PKA Jigsaw			#
#Part :			Initiate mapcheck	#
#Step :			1					#
#####################################*/
if(pathname == "/map.aspx"){
	console.log($_GET["loc"]);
	htmlcode = '<center>';
	htmlcode = htmlcode+ '<div id="pka-scout">';
	htmlcode = htmlcode+ 'Additional scans :';
	htmlcode = htmlcode+ '&nbsp; <input type="checkbox" id="check_detailscout" name="scouts" value="detailscout">Detailscout';
	htmlcode = htmlcode+ '&nbsp; <input type="checkbox" id="check_fleetscout" disabled name="scouts" value="fleetscout">Fleetscout';
	htmlcode = htmlcode+ ' &nbsp; <input type="checkbox" id="check_playerscout" disabled name="scouts" value="playerscout">Playerscout';
	htmlcode = htmlcode+ '<br><button id="scanregion">ScanRegion</button>';
	htmlcode = htmlcode+ '<p id="progress">Ready</p>';
	htmlcode = htmlcode+ '</div>';
	htmlcode = htmlcode+ '</center>';
	 
	$("#map-region_container").prepend(htmlcode);
	$('body').append('<div id="datawhore" style="display:none;"></div>');
}
/*###################################
#Name :			TechGrabber			#
#System :		PKA Jigsaw			#
#Part :			load techgrabber	#
#Step :			1					#
#####################################*/
if(pathname == "/board.aspx"){
	techgrab_load();
	htmlcode = '<center>';
	htmlcode = htmlcode+ '<div id="pka-scout">';
	htmlcode = htmlcode+ '<p id="progress">Ready</p>';
	htmlcode = htmlcode+ '</div>';
	htmlcode = htmlcode+ '</center>';
	$("#main-header").append(htmlcode);
	$('body').append('<div id="datawhore" style="display:none;"></div>');
}
if(pathname == "/messages.aspx"){
	techgrab_load();
	htmlcode = '<center>';
	htmlcode = htmlcode+ '<div id="pka-scout">';
	htmlcode = htmlcode+ '<p id="progress">Ready</p>';
	htmlcode = htmlcode+ '</div>';
	htmlcode = htmlcode+ '</center>';
	$("#main-header").append(htmlcode);
	$('body').append('<div id="datawhore" style="display:none;"></div>');
}
if(pathname == "/base.aspx"){
	$('.local-header-anchor').prepend('<input id="relaystart" type="button" value="BattleCalc"/>')
	$('body').append('<div id="datawhore" style="display:none;"></div>');
}
/*###################################
#Name :			Relay System		#
#System :		PKA Jigsaw			#
#Part :			Activate datagrab	#
#Step :			2					#
#####################################*/
$(document).on('click', '#relaystart', function() {
	activaterelay();
});

/*###################################
#Name :			ScoutMainframe		#
#System :		PKA Jigsaw			#
#Part :			Check parts			#
#Step :			2					#
#####################################*/
$(document).on('change', '#check_detailscout', function() {
	//#DEV#console.log($('#check_detailscout').prop('checked'));
        if($('#check_detailscout').prop('checked')) {
			$('#check_playerscout').prop("disabled", false);
			$('#check_fleetscout').prop("disabled", false);	
		}
		if($('#check_detailscout').prop('checked') == false) {
			$('#check_fleetscout').prop("disabled", true);
			$('#check_fleetscout').prop('checked', false);	
			$('#check_playerscout').prop("disabled", true);
			$('#check_playerscout').prop('checked', false);	
		}
});
//start scanner
$('#scanregion').click(function(){
	scantargets.lenght = 0;
	check_count_rival++;
	if($('#check_detailscout').prop('checked')) {
		check_count++;
	}
	if($('#check_fleetscout').prop('checked')) {
		check_count++;
	}
	if($('#check_playerscout').prop('checked')) {
		check_count++;
	}
	$("#map-region_content .box-content-center div div div").each(function(i){
			var id = $(this).find('a').attr('id');
			console.log(id);
			scantargets.push(id);
			$("#pka-scout #progress").text('['+check_count_rival+'/'+check_count+'] Loading Data');
		});
		invidscan();
});

//load indivdual scans in
function invidscan(){
	console.log(scantargets);
	lengthST = (scantargets.length)-1;
	console.log('lengthST: '+lengthST);
	i=0;
	loadworld(i,lengthST);
}

//load astro system
});
function loadworld(b,lengthST){
		linky = "http://pegasus.astroempires.com/map.aspx?loc="+scantargets[b]+" .map-system_ctr #map-system_content";
		//LOAD DATA
		$( "#datawhore" ).load( linky, function() {
  			$("#pka-scout #progress").text('['+check_count_rival+'/'+check_count+']Scanning ['+b+'/'+lengthST+'] Basescout | '+ scantargets[b]);
			console.log('[1/2]Scanning ['+b+'/'+lengthST+'] '+scantargets[b]);
		//START MAPPING	
			var listing = $("#datawhore #map-system_content > div").length;
			console.log(listing);
			setTimeout(function(){
				scouty(1,listing,b,lengthST);
			}, 1200);
		});
	}
	
//Scout astro system
function scouty(num,maxi,b,lengthST){
				var phrase = "#datawhore #map-system_content div:nth-child("+num+")"
				var target = $(phrase);
				var count = $(phrase + " > div").size()
				if(count >1){
					var title = target.find(".astro_icon").attr('id').replace('astro_icons_','');
					console.log('loc: '+title);
					var base = target.find("div:nth-child(2) a").attr('href');
					console.log('base: '+base);
					var owner = target.find(".description a").text();
					console.log('owner: '+owner);
					if (base.indexOf("base.aspx") >= 0){
						var ownerlevel = target.find(".description a").attr('title').replace('Player level ','').replace('astro_icons_','').replace(/\(.*?\)/, '');
						var ownerlink = target.find(".description a").attr('href');
						console.log('lvl: '+ownerlevel);
						console.log('link: '+ownerlink);
						detailtargets.push(base);
					}else{
						var ownerlevel = '0';
					}
					console.log('----NEXT ASTRO----');
					var data='loc='+title+'&base='+base+'&owner='+owner+'&level='+ownerlevel+'&link='+ownerlink+'&jid='+jigsaw_user_id;
					$.ajax({
						 async: false,
						 type: "POST",
						 url: domain+"/recievers/scout_map_mysql.php",
						 dataType: 'html',
						 data: data,
						 success: function(){
							 num++;
							 if(num<=maxi){
								scouty(num,maxi,b,lengthST);
							 }else{
								if(b < lengthST){
									b++;
									$("#datawhore").empty();
									loadworld(b,lengthST);	
								}else{
									if($('#check_detailscout').prop('checked')) {
										activatedetail();
										check_count_rival++;
									}else{
										$("#pka-scout #progress").text('['+check_count_rival+'/'+check_count+']Complete ['+b+'/'+lengthST+'] Basescout');
									}
								}
							}
						 },
						error: function(ts) { alert(ts.responseText) }
					});
					
					
				}else{
					var title = target.find("img").attr("title");
					console.log(target.find('a').attr("href"));
					console.log(title);
					console.log('----NEXT ASTRO----');
					num++;
					if(num<=maxi){
						scouty(num,maxi,b,lengthST);
					}else{
						if(b<=lengthST){
							b++;
							$("#datawhore").empty();
							loadworld(b,lengthST);
						}else{
							if($('#check_detailscout').prop('checked')) {
										activatedetail();
										check_count_rival++;
							}else{
								$("#pka-scout #progress").text('['+check_count_rival+'/'+check_count+']Complete ['+b+'/'+lengthST+'] Basescout');
							}
						}
					}
				};
				
			}
///////////////
//BASE LOADER//
///////////////
function loadbase(start,maxi){
	linky = "http://pegasus.astroempires.com/"+detailtargets[start]+" #background-content";
		//LOAD DATA
		$( "#datawhore" ).load( linky, function() {
		console.log('[1/2]Scanning ['+start+'/'+maxi+'] '+detailtargets[start]);
		$("#pka-scout #progress").text('['+check_count_rival+'/'+check_count+']Scanning ['+start+'/'+maxi+'] Detailscout | '+detailtargets[start]);
			setTimeout(function(){
				detailscout(start,maxi);
			}, 1200);
		});
}
function detailscout(start,maxi){
	jg = '';
	cc = '';
	defences = "";
	
	$("#datawhore").find('.box5_ctr table tr:nth-child(4) span').each(function(){
		defences = defences + "," + $(this).text();
	});
	
	eco = $('#datawhore .infoicon_credits').text();
	name = $("#datawhore").find('.box5_ctr table tr:nth-child(1) a').text();
	user_id_pre = $("#datawhore").find('.box5_ctr table tr:nth-child(1) a').attr('href');
	user_id = user_id_pre.replace("profile.aspx?player=","");
	
	$('#datawhore .box5_ctr table tr:nth-child(6)').each(function(){
		if($(this).find('td:nth-child(1)').text() == "Command Centers"){
			cc = $(this).find('td:nth-child(2)').text();
			console.log('cc ='+cc);
		}
		if($(this).find('td:nth-child(1)').text() == "Jump Gate"){
			jg = $(this).find('td:nth-child(2)').text();
			console.log('jg ='+jg);
		}
	});
	var found = jQuery.inArray(user_id, userlist);
		if (found >= 0) {
		} else {
			userlist.push(user_id);
		}
		
	defencefleet= "";
	defencefleet_link="";
	commander="";
	fleet = "";
	blinky = 'http://pegasus.astroempires.com/'+detailtargets[start];
	
	console.log("blinky : "+blinky);
	
	$(".box3_ctr table tr").each(function(){	
	
		if($(this).find("td:nth-child(2)").text() == name){
			
			fleet = $(this).find("td:nth-child(4)").attr('sorttable_customkey');
			defencefleet_link = $(this).find("td:nth-child(4) a").attr('href');
			fleetlist.push( $(this).find("td:nth-child(4) a").attr('href') );
			
			console.log('fleet= '+fleet);
			console.log('fleetlink= '+defencefleet_link);
		}else{
			if($(this).find("td:nth-child(4) a").attr('href') != "undefined"){
				fleetlist.push( $(this).find("td:nth-child(4) a").attr('href') );
			}
		}
	});
	commander = $(".sbox_ctr small").text();
	loc = $("#datawhore .infoicon_astro a").text();
	var data='loc='+loc+'&eco='+eco+'&name='+name+'&defence='+defences+'&fleet='+fleet+'&link='+defencefleet_link+"&blink="+blinky+'&jid='+jigsaw_user_id+'&jg='+jg+'&cc='+cc;
					$.ajax({
						 async: false,
						 type: "POST",
						 url: domain+"/recievers/scout_detail_mysql.php",
						 dataType: 'html',
						 data: data,
						 success: function(){
								if(start<maxi){
									start++;
									$("#datawhore").empty();
									loadbase(start,maxi);	
								}else{
									if($('#check_playerscout').prop('checked')) {
										activateplayer();
										check_count_rival++;
									}//else if($('#check_playerscout').prop('checked')) {
										//activatefleet();
										//check_count_rival++;
									//}
									console.log(fleetlist);
								}
						 	},
						error: function(ts) { alert(ts.responseText) }
					}).done(function(data){
						console.log(data);
					});
}

/*###################################
#Name :			Player Scout		#
#System :		Player scouter		#
#Part :			Activate Scouter	#
#Step :			1					#
#####################################*/
//start advanced scanner
function activatedetail(){
	console.log("####################################")
	console.log("#Name :		Detail Scout			#");
	console.log("#System :	Detail scouter			#");
	console.log("#State :	Loaded					#");
	console.log("####################################");
	console.log("Loading detail targets array :");
	console.log(detailtargets);
	d_count = (detailtargets.length)-1;
	console.log(d_count);
	loadbase(0,d_count);
};
////////////////////////////////////////////////


/*###################################
#Name :			Player Scout		#
#System :		Player scouter		#
#Part :			Activate Scouter	#
#Step :			1					#
#####################################*/
function activateplayer(){
	console.log("####################################")
	console.log("#Name :		Player Scout			#");
	console.log("#System :	Player scouter			#");
	console.log("#State :	Loaded					#");
	console.log("####################################");
	console.log("Loading player array :");
	console.log(userlist);
	ps_user_length = userlist.length-1;
	loadplayer(0,ps_user_length);
}

/*###################################
#Name :			Player Scout		#
#System :		Player scouter		#
#Part :			Load Player Page	#
#Step :			2					#
#####################################*/
function loadplayer(ps_counter, ps_user_length){
	ps_link = "http://pegasus.astroempires.com/profile.aspx?player="+userlist[ps_counter]+' #profile';
	$("#datawhore").empty();
	$( "#datawhore" ).load( ps_link, function() {
		$("#pka-scout #progress").text('['+check_count_rival+'/'+check_count+']Scanning['+ps_counter+'/'+ps_user_length+'] Playerscout | Id = '+userlist[ps_counter]);
		setTimeout(function(){
				getplayer_data(ps_counter, ps_user_length);
			}, 1200);
	});
}
/*###################################
#Name :			Player Scout		#
#System :		Player scouter		#
#Part :			Fetch data			#
#Step :			3					#
#####################################*/
function getplayer_data(ps_counter, ps_user_length){
	//Playerdata left fetcher
	ps_d_playerdata_html = $("#datawhore .profile_ctr #profile_specs").html();
	ps_d_playerdata_html_parts = ps_d_playerdata_html.split("<br>");
	
	//language fetcher
	ps_d_languagelist = '';
	$( "#datawhore #profile_bottom small span" ).each(function(ps_language_counter) {
		lang_name = $(this).attr('title');
		ps_d_languagelist = ps_d_languagelist+','+lang_name;
	});
	
	//all vars lined up
	ps_d_languagelist = ps_d_languagelist;
	if(ps_d_playerdata_html_parts[5].indexOf('<b>Economy:</b> ') != -1){
		ps_d_eco = ps_d_playerdata_html_parts[5].replace('<b>Economy:</b> ','');
		ps_d_level = ps_d_playerdata_html_parts[4].replace('<b>Level:</b> ','').replace(/ \(.*?\)/, "");
	}else if(ps_d_playerdata_html_parts[4].indexOf('<b>Economy:</b> ') != -1){
		ps_d_eco = ps_d_playerdata_html_parts[4].replace('<b>Economy:</b> ','');
		ps_d_level = ps_d_playerdata_html_parts[3].replace('<b>Level:</b> ','').replace(/ \(.*?\)/, "");
	}else if(ps_d_playerdata_html_parts[8].indexOf('<b>Economy:</b> ') != -1){
		ps_d_eco = ps_d_playerdata_html_parts[8].replace('<b>Economy:</b> ','');
		ps_d_level = ps_d_playerdata_html_parts[7].replace('<b>Level:</b> ','').replace(/ \(.*?\)/, "");
	}
	ps_d_name = $("#datawhore .profile_ctr .sbox_ctr span").text(); //get guild from here
	ps_d_id = userlist[ps_counter];
	ps_data = 'languagelist='+ps_d_languagelist+'&eco='+ps_d_eco+'&level='+ps_d_level+'&name='+ps_d_name+'&id='+ps_d_id+'&jid='+jigsaw_user_id;;
	
	//#DEV#console.log('[PlayerScout]Datastring:'+ps_data);
	$.ajax({
		async: false,
		type: "POST",
		url: domain+"/recievers/scout_users_mysql.php",
		dataType: 'html',
		data: ps_data,
		success: function(){
			if(ps_counter < ps_user_length){
				ps_counter++;
				loadplayer(ps_counter++, ps_user_length);
			}else{
				$("#pka-scout #progress").text('['+check_count_rival+'/'+check_count+']Scan Complete['+ps_counter+'/'+ps_user_length+'] Playerscout');
			}
		},
		error: function(ts) { alert(ts.responseText) }
	}).done(function(data){
		console.log('[PlayerScout][id='+ps_d_id+']Reply:'+data);
	});
}
/*###########################################################################################################
										TECH SYSTEM
###########################################################################################################*/
/*###################################
#Name :			TechGrabber			#
#System :		PKA Jigsaw			#
#Part :			Check tech levels	#
#Step :			2					#
#####################################*/
function techgrab_load(){
	if($('#board2').hasClass( 'btn-normal-active')){
		$("form .board-listing tr").each(function(i){
			if($(this).find('.battle-report_info')){
				that = $(this).find('.battle-report_info');
				county = $(this).index() + 1;
				$(that).prepend('<div id="pka-scout"><center><input type="button" id="techfetch" class="'+county+'" value="Get Tech"></center></div>');
			}
		});
	}else
	if($('#inbox.btn-normal-active')){
		$("form .board-listing tr").each(function(i){
			if($(this).find('.battle-report_info')){
				that = $(this).find('.battle-report_info');
				county = $(this).index() + 1;
				$(that).prepend('<div id="pka-scout"><center><input type="button" id="techfetch" class="'+county+'" value="Get Tech"></center></div>');
			}
		});
	}
}
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
		url: domain+"/recievers/relay_battlecalc.php",
		dataType: 'html',
		data: relay_data,
		success: function(){
			
		},
		error: function(ts) { alert(ts.responseText) }
	}).done(function(data){
		 window.open(data, '_blank');
	});
}