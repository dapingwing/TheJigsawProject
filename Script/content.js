//TheJigsaw Loading system
console.log('[TheJigsaw][CORE]Initiated');

//Modify the menu
topmenu = $('#top-header .box_row .box_ctr #top-header_menu .mns-anchor-special .mns_box .mns_row').html();
newmenu = '<div class="mn_item"><a class="btn-normal" id="jigsaw" href="#"><div class="btn_lft"></div><div class="btn_ctr"><div>Jigsaw</div></div><div class="btn_rht"></div></a></div><div class="mn_separator"><div></div></div>'+topmenu;
$('#top-header .box_row .box_ctr #top-header_menu .mns-anchor-special .mns_box .mns_row').html(newmenu);

//build the system!
$(document).on('click', '#jigsaw', function() {
	$('body').empty();
	//$('head').append(' <link href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/themes/start/jquery-ui.css" type="text/css" rel="Stylesheet" /> ');
	$('head').append(' <script src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/jquery-ui.min.js"></script> ');
	$('body').load(chrome.extension.getURL("Interfaces/core.html"), function() {
		
	});
	
	
});
$(document).on('click', '#tactical', function() {
	$('#tabs').show();
	$('#tabs').tabs();
	$('#tactical').hide();
	$('#tabs-1').load("http://pegasus.astroempires.com/base.aspx #background-content");
	$('#urlwhore').val("http://pegasus.astroempires.com/base.aspx");
});
$(document).on("click", "#tabs-1 a", function(event){
    event.preventDefault();
	$('#urlwhore').val($(this).attr('href')+' #background-content');
	$('#tabs-1').load($(this).attr('href'));
})