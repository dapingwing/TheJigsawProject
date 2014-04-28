//TheJigsaw Loading system
console.log('[TheJigsaw][CORE]Initiated');

//Blank out some variables
user_id ='';
current_location = '';


//////////////////////////////
//		AE MENU MOD			//
//////////////////////////////
topmenu = $('#top-header .box_row .box_ctr #top-header_menu .mns-anchor-special .mns_box .mns_row').html();
newmenu = '<div class="mn_item"><a class="btn-normal" id="jigsaw" href="#"><div class="btn_lft"></div><div class="btn_ctr"><div>Jigsaw</div></div><div class="btn_rht"></div></a></div><div class="mn_separator"><div></div></div>'+topmenu;
$('#top-header .box_row .box_ctr #top-header_menu .mns-anchor-special .mns_box .mns_row').html(newmenu);

//////////////////////////////////////
//		Jigsaw initiator			//
//////////////////////////////////////
$(document).on('click', '#jigsaw', function() {
	$('body').empty();
	$('head').append(' <script src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/jquery-ui.min.js"></script> ');
	$('head').append(' <script type="text/javascript" src="http://cdn.astroempires.com/javascript/js_move_v1.4.js"></script>');
	$('body').load(chrome.extension.getURL("Interfaces/core.html"));
	console.log('[TheJigsaw][CORE]System Built');
});
//Load the tactical Interface
$(document).on('click', '#tactical', function() {
	$('#tabs').show();
	$('#topbar').show()
	$('#tabs').tabs();
	$('#tactical').hide();
	$('#tabs-1 #right').load("http://pegasus.astroempires.com/base.aspx #background-inner");
	$('#urlwhore').val("http://pegasus.astroempires.com/base.aspx");
	//Start pieces system
	initatedPieces();
});



//////////////////////////////
//		PATCHING AE			//
//////////////////////////////
//Get all A clicks! 
//+ Patch for bb code
$(document).on("click", "#tabs-1 #right a", function(event){
	//stop link redirection
	event.preventDefault();

	
	//The massive capture 
	if( $(this).attr('id') != 'move_fleet_form' && $(this).attr('id') != 'link_fleet_move_here' ){
		
		$('#urlwhore').val($(this).attr('href'));
		$('#tabs-1  #right').load($(this).attr('href')+' #background-inner', function(){
			//CATCH 1 : If on the boards
			if($('#urlwhore').val().indexOf("board.aspx") >= 0){
				$('#body').focus( function() { 
					$('.new-post_tools').show();
					image_spacer = 'http://cdn.astroempires.com/images/spacer.gif';
					dir_smilies = 'http://cdn.astroempires.com/images/smilies';
					bbode_colors_load();
					bbode_smilies_load();
				});
			}
			//CATCH 2: If moving fleet
			if($('#urlwhore').val().indexOf("&view=move") >= 0){
				$('#tabs-1 #right td a').each(function(){
					var oldlink = $(this).attr('href');
					var newlink = oldlink.replace("javascript:", "")+'; return false;';
					$(this).attr('href','javascript:void(0)');
					$(this).attr('onclick',newlink);
				});
			}
			if($('#urlwhore').val().indexOf("map.aspx") >= 0){
				var vgo = new jsGraphics('map-galaxy_canvas');
				vgo.paint();
			}
			
		});
	}else if($(this).attr('id') == 'link_fleet_move_here' ){
	//PATCH 1: move fleet here function
		//Variables
		current_location = $('#urlwhore').val();
		if(current_location.indexOf("map.aspx?loc=") >= 0){
			current_location_fix = current_location.replace('base.aspx?base=','').replace('map.aspx?loc=','')
		}else{
			current_location_fix = $('[title=Location]').text()
		}
		user_id = $('#tabs-1 #account .btn_ctr div').text();
		
		//Run AE script
		load_fleet_move_to_destination("fleet.aspx?method=ajax&view=move_to_destination&version=1&player="+user_id+"&destination="+current_location_fix);
		$("#link_fleet_move_here").hide();
		console.log('[TheJigsaw][CORE]Change Caught');
	}
});

//patching posting
//+ Patch for bb code
$(document).on('click', '#tabs-1 [name=submit]', function(e) {
	var form = $(this).parents('form:first');
	var serialdata = form.serialize()+'&submit='+$(this).val();
	var action = form.attr('action');
	
	console.log('data='+serialdata);
	console.log('action='+action);
	$.post(action, serialdata, function( data ) {
  		$( "#tabs-1  #right" ).html( data );
	});
	e.preventDefault();
});
$(document).on('click', '#tabs-1 #move_fleet_form .input-button', function(e) {
	var form = $(this).parents('form:first');
	var serialdata = form.serialize()+'&submit='+$(this).val();
	var action = form.attr('action');
	
	console.log('data='+serialdata);
	console.log('action='+action);
	$.post(action, serialdata, function( data ) {
  		$( "#tabs-1  #right" ).html( data );
	});
	e.preventDefault();
})
//////////////////////////////
//		PIECES SYSTEM		//
//////////////////////////////
function initatedPieces(){
	//Plugins api code
	//If this is the first run load the basic plugins
	if(!localStorage["All_keys"]){
		console.log('[TheJigsaw][CORE]First Run : setting up system');
		localStorage["All_keys"] = "Experiment:Battlecalc:";
		localStorage["Activated"] = "Experiment:Battlecalc:";
	}else{
		console.log('[TheJigsaw][CORE]Database found : Welcome back');
	}
	//convert the list to an array (active plugins)
	var pieces_Active = localStorage["Activated"].split(":");
	//Load the plugins!
	for (i = 0, l = pieces_Active.length-1; i < l; i++) {
		$.getScript(chrome.extension.getURL("Pieces/"+pieces_Active[i]+"/piece.js"));
	}
	console.log('[TheJigsaw][CORE]All Pieces initiated');
}
//////////////////////////////
//		UPDATE SYSTEM		//
//////////////////////////////

setInterval(updateInfo,30000);
function updateInfo(){
	$('#status').load("http://pegasus.astroempires.com/base.aspx #main-header-infobox_content");
}
$('#advertising').hide();