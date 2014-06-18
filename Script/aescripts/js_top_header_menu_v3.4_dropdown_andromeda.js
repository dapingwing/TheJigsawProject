var logout_id = "";
var layout = 2;
var is_round_server = false;
var server = "";
var rank = 0;

var label_updates	= "Updates";
var label_rules		= "Rules";
var label_help		= "Help";
var label_tables	= "Tables";
var label_portal	= "Portal";
var label_forum		= "Forum";
var label_wiki		= "Wiki";
var label_ranks		= "Ranks";
var label_rounds	= "Rounds";
var label_support	= "Support";
var label_extras	= "Extras";
var label_logout	= "Logout";
var label_community	= "Community";
var label_server	= "Server";

function replace_top_header_menu()
{
	var menu_output = "";

	menu_output += "<div class='mns-anchor-special'>";
	menu_output += "<div class='mns_box'>";
	menu_output += "<div class='mns_row row1'>";

	if (rank>0)
		menu_output += menu_item( label_ranks +' <span class="comment">(' +rank +')</span>',	'ranks.aspx', '');
	else
		menu_output += menu_item( label_ranks,	'ranks.aspx', '');
	if (is_round_server)
	{
	menu_output += menu_separator();
	menu_output += menu_item( label_rounds,	'rounds.aspx', '');
	}
	menu_output += menu_separator();
	menu_output += menu_item( label_updates,'updates.aspx', '');
	menu_output += menu_separator();
	menu_output += menu_item( label_rules,	'terms.aspx?view=rules', '');
	menu_output += menu_separator();
	menu_output += menu_item( label_help,	'help.aspx', '');
	menu_output += menu_separator();
	menu_output += menu_item( label_tables,	'tables.aspx', '');
	menu_output += menu_separator();
	menu_output += menu_item( label_extras,	'extras.aspx', '');
	menu_output += menu_separator();
	menu_output += menu_item( label_support,'contact.aspx' ,'');

	menu_output += top_header_dropdown_community()
	menu_output += top_header_dropdown_servers()

	menu_output += menu_item( label_logout,	'home.aspx?session=logout&id=' +logout_id, '');

	menu_output += "</div></div></div>";

	$("#top-header_menu").html(menu_output);
}

function menu_item(label, url, target)
{
	var output = "";

	output += "<div class='mn_item'>"
	output += menu_button(label, url, target)
	output += "</div>";

	return output
}

function menu_button(label, url, target)
{
	var output = "";
	var target_txt = "";

	if (target!="") target_txt = " target='" + target + "'";

	output += "<a class='btn-normal' href='" +url +"'" +target_txt +">";
	output += "<div class='btn_lft'></div>";
	output += "<div class='btn_ctr'><div>" +label +"</div></div>";
	output += "<div class='btn_rht'></div>";
	output += "</a>";

	return output
}

function menu_separator()
{
	return "<div class='mn_separator'><div></div></div>";
}

function top_header_dropdown_community()
{
	var output = "";

	output += "<div class='mn_item'>";
	output += "<div class='btn-html'>";

	output += "<div class='dropdown_lft'><div></div></div>";
	output += "<div class='dropdown_ctr'>";
 
		output += "<span id='community-dropdown'><a>" +label_community +" &#9660;</a>";

		output += "<div id='community-dropdown-list'>";
		output += "<a href='http://portal.astroempires.com' target='_blank'>"		+label_portal	+"</a>";
		output += "<a href='http://forum.astroempires.com' target='_blank'>"		+label_forum	+"</a>";
		output += "<a href='http://wiki.astroempires.com' target='_blank'>"			+label_wiki		+"</a>";
		output += "<a href='http://www.facebook.com/astroempires' target='_blank'>"	+"Facebook"		+"</a>";
		output += "</div>";

		output += "</span>";
 
	output += "<script>";
	output += "$('#community-dropdown').click(function (event) {";
	output += "$('#community-dropdown-list').toggle();";
	output += "event.stopPropagation();";
	output += "});";
	output += "$('body').click(function () {";
	output += "$('#community-dropdown-list').hide();";
	output += "});";
	output += "</script>";
 
	output += "</div>";
	output += "<div class='dropdown_rht'><div></div></div>";

	output += "</div>";
	output += "</div>";

	return output
}

function top_header_dropdown_servers()
{
	var output = "";

	output += "<div class='mn_item'>";
	output += "<div class='btn-html'>";

//	output += "<div class='dropdown_lft'><div></div></div>";
	output += "<div class='dropdown_ctr'>";
 
		output += "<span id='servers-dropdown'><a>" +label_server +" <b>" +server +"</b> &#9660;</a>";

		output += "<div id='servers-dropdown-list'>";
			output += server_link("andromeda.astroempires.com"	, "Andromeda")

			output += server_link("pegasus.astroempires.com"	, "Pegasus")
			output += server_link("omega.astroempires.com"		, "Omega")
			output += server_link("nova.astroempires.com"		, "Nova")
			output += server_link("mira.astroempires.com"		, "Mira")
			output += server_link("lyra.astroempires.com"		, "Lyra")
			output += server_link("kappa.astroempires.com"		, "Kappa")
			output += server_link("juno.astroempires.com"		, "Juno")
			output += server_link("ixion.astroempires.com"		, "Ixion")
			output += server_link("helion.astroempires.com"		, "Helion")
			output += server_link("gamma.astroempires.com"		, "Gamma")
			output += server_link("fenix.astroempires.com"		, "Fenix")
			output += server_link("epsilon.astroempires.com"	, "Epsilon")
			output += server_link("delta.astroempires.com"		, "Delta")
			output += server_link("ceti.astroempires.com"		, "Ceti")
			output += server_link("beta.astroempires.com"		, "Beta")
			output += server_link("alpha.astroempires.com"		, "Alpha")

			output += server_link("ares.astroempires.com"		, "Ares")
		output += "</div>";

		output += "</span>";
 
	output += "<script>";
	output += "$('#servers-dropdown').click(function (event) {";
	output += "$('#servers-dropdown-list').toggle();";
	output += "event.stopPropagation();";
	output += "});";
	output += "$('body').click(function () {";
	output += "$('#servers-dropdown-list').hide();";
	output += "});";
	output += "</script>";
 
	output += "</div>";
	output += "<div class='dropdown_rht'><div></div></div>";

	output += "</div>";
	output += "</div>";

	return output
}

function server_link(address, name)
{
	var output = "";

	if (name=="Pegasus")	output = "- - - -<br />";
	if (name=="Ares")		output = "- - - -<br />";

	if (name==server)
		{
		output += name +"<br />";
		}
	else
		{
		output += "<a href='http://" +address+"/account.aspx'>" +name +"</a>";
		}

	return output
}
 
