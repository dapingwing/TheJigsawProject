//TheJigsaw Loading system
console.log('[TheJigsaw][CORE]Initiated');

//Modify the menu
topmenu = $('#top-header .box_row .box_ctr #top-header_menu .mns-anchor-special .mns_box .mns_row').html();
newmenu = '<div class="mn_item"><a class="btn-normal" id="jigsaw" href="#"><div class="btn_lft"></div><div class="btn_ctr"><div>Jigsaw</div></div><div class="btn_rht"></div></a></div><div class="mn_separator"><div></div></div>'+topmenu;
$('#top-header .box_row .box_ctr #top-header_menu .mns-anchor-special .mns_box .mns_row').html(newmenu);

//build the system!
$(document).on('click', '#jigsaw', function() {
	$('body').empty();
	$('head').append(' <script src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/jquery-ui.min.js"></script> ');
	$('head').append(' <script type="text/javascript" src="http://cdn.astroempires.com/javascript/js_move_v1.4.js"></script>');
	$('body').load(chrome.extension.getURL("Interfaces/core.html"), function() {});
	$.getScript('http://cdn.astroempires.com/javascript/js_bbcode_v1.2.js');
	$.getScript('<script type="text/javascript" src="http://cdn.astroempires.com/javascript/js_move_v1.4.js"></script>');
	
	
});
//Load the tactical Interface
$(document).on('click', '#tactical', function() {
	$('#tabs').show();
	$('#tabs').tabs();
	$('#tactical').hide();
	$('#tabs-1 #right').load("http://pegasus.astroempires.com/base.aspx #background-content");
	$('#urlwhore').val("http://pegasus.astroempires.com/base.aspx");
	initatedPieces();
});



//////////////////////////////
//		PATCHING AE			//
//////////////////////////////
//Get all A clicks! 
//+ Patch for bb code
$(document).on("click", "#tabs-1 #right a", function(event){
	if( $(this).attr('id') != 'move_fleet_form' ){
    event.preventDefault();
	$('#urlwhore').val($(this).attr('href'));
	$('#tabs-1  #right').load($(this).attr('href')+' #background-content', function(){
		if($('#urlwhore').val().indexOf("board.aspx") >= 0){
			$('#body').focus( function() { 
				$('.new-post_tools').show();
				image_spacer = 'http://cdn.astroempires.com/images/spacer.gif';
				dir_smilies = 'http://cdn.astroempires.com/images/smilies';
				bbode_colors_load();
				bbode_smilies_load();
			});
		}
		if($('#urlwhore').val().indexOf("&view=move") >= 0){
			$('#tabs-1 #right td a').each(function(){
				var oldlink = $(this).attr('href');
				var newlink = oldlink.replace("javascript:", "")+'; return false;';
				$(this).attr('href','javascript:void(0)');
				$(this).attr('onclick',newlink);
			});
		}
	});
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
}