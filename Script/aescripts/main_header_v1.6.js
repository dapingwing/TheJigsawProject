/*var logout_id = "";
var layout = 2;
var is_round_server = false;
var server = "";
var rank = 0;
*/
var label_mh_bases = "Bases", label_mh_map = "Map", label_mh_fleets = "Fleets", label_mh_cmdrs = "Cmdrs", label_mh_commanders = "Commanders", label_mh_empire = "Empire";
var label_mh_account = "Account", label_mh_credits = "Credits", label_mh_messages = "Messages", label_mh_board = "Board", label_mh_guild = "Guild";
var label_mh_tutorial = "Tutorial", label_mh_notes = "Notes", label_mh_bookmarks = "Bookmarks", label_mh_notifications = "Notifications";

function insert_main_header(pmh_bactive, pmh_account, pmh_credits, pmh_messages, pmh_messages_s, pmh_board, pmh_board_s, pmh_tutorial_s, pmh_marquee) {
    var header_output = "";
    var tmp_status = 0; if (pmh_credits == "-") { tmp_status = 3; pmh_board_s = 3; }

    // =============== T O P
    header_output += "<div class='box_simple'><div class='box_row'>";
    
        // NAV
        header_output += "<div class='box_cell box_cell_main-header-nav'><div id='main-header-nav' class='box-simple box box-full'>";
            header_output += "<div class='box_row'><div class='box_lft'></div><div class='box_ctr'>";
                header_output += "<div id='main-header-nav_content' class='mns-anchor menu'><div class='mns-anchor-special'><div class='mns_box'><div class='mns_row row1'>";
                    header_output += "";
                    header_output += "";

                    header_output += mh_menu_item(label_mh_bases, 'base.aspx', 'bases', '', tmp_status);
                    header_output += mh_menu_separator();
                    header_output += mh_menu_item(label_mh_map, 'map.aspx', 'map', '', tmp_status);
                    header_output += mh_menu_separator();
                    header_output += mh_menu_item(label_mh_fleets, 'fleet.aspx', 'fleets', '', tmp_status);
                    header_output += mh_menu_separator();
                    header_output += mh_menu_item(label_mh_commanders, 'commander.aspx', 'commanders', label_mh_cmdrs, tmp_status);
                    header_output += mh_menu_separator();
                    header_output += mh_menu_item(label_mh_empire, 'empire.aspx', 'empire', '', tmp_status);

                    header_output += "";
                header_output += "</div></div></div></div>";
            header_output += "</div><div class='box_rht'></div></div>";
        header_output += "</div></div>";

        // LOGO
        header_output += "<div class='box_cell'><div  id='main-header-logo' class='box-simple box box-full'>";
            header_output += "<div class='box_row'><div class='box_lft'></div><div class='box_ctr'>";
                header_output += "<div id='main-header-logo_content'>&nbsp;</div>";
            header_output += "</div><div class='box_rht'></div></div>";
        header_output += "</div></div>";

        // USER AVATAR
        header_output += "<div class='box_cell' style='width: 80px;'><div id='main-header-avatar' class='box-simple box box-full'>";
            header_output += "<div class='box_row'><div class='box_lft'></div><div class='box_ctr'>";
                header_output += "<div id='main-header-avatar_content' class='mns-anchor menu'><div class='mns-anchor-special'><div class='mns_box'><div class='mns_row row1'>";
                //style='background: url(" + pmh_account + ") no-repeat;'
                //header_output += mh_menu_item(label_mh_account, 'account.aspx', 'account', '<img src="' + pmh_account + '" />');
                header_output += mh_menu_item(label_mh_account, 'account.aspx', 'account', pmh_account);
                header_output += "</div></div></div></div>";
            header_output += "</div><div class='box_rht'></div></div>";
        header_output += "</div></div>";

        // USER INFO
        header_output += "<div class='box_cell'><div id='main-header-infobox' class='box-simple box box-full'>";
            header_output += "<div class='box_row'><div class='box_lft'></div><div class='box_ctr'>";
                header_output += "<div id='main-header-infobox_content' class='mns-anchor menu'><div class='mns-anchor-special'><div class='mns_box'><div class='mns_row row1'>";
                header_output += mh_menu_item(label_mh_credits, 'credits.aspx', 'credits', pmh_credits, tmp_status);
                header_output += mh_menu_separator();
                header_output += mh_menu_item(label_mh_messages, 'messages.aspx', 'messages', pmh_messages, pmh_messages_s);
                header_output += mh_menu_separator();
                header_output += mh_menu_item(label_mh_board, 'board.aspx', 'board', pmh_board, pmh_board_s);
                header_output += mh_menu_separator();
                header_output += mh_menu_item(label_mh_guild, 'guild.aspx', 'guild', '', tmp_status);
                header_output += "</div></div></div></div>";
            header_output += "</div><div class='box_rht'></div></div>";
        header_output += "</div></div>";

    header_output += "</div></div>";


    // =============== B O T
    var tmp_btn_tutorial = "btn-normal";
        if (pmh_tutorial_s == 1) { tmp_btn_tutorial = "btn-special"; }
        if (pmh_tutorial_s == 2) { tmp_btn_tutorial = "btn-important"; }
        if (pmh_tutorial_s == 3) { tmp_btn_tutorial = "btn-disabled"; }

    header_output += "<div class='box_simple'><div class='box_row'>";
        // NEWS
        header_output += "<div class='box_cell'><div id='main-header-news' class='box-simple box box-full'>";
            header_output += "<div class='box_row'><div class='box_lft'></div><div class='box_ctr'>";
            header_output += "<div class='marquee2'><marquee loop='0' behavior='scroll' direction='left' scrollamount='1' left='1'>" + pmh_marquee + "</marquee></div>";
            //<div class='marquee2'><marquee loop='0' behavior='scroll' direction='left' scrollamount='1' left='1'>&nbsp;</marquee></div>
            header_output += "</div><div class='box_rht'></div></div>";
            header_output += "</div></div>";
            header_output += "<script type='text/javascript'>$(function () { $('div.marquee2 marquee').marquee('pointer').mouseover(function () { $(this).trigger('stop'); }).mouseout(function () { $(this).trigger('start'); }); });</script>";
        // MININAV
        var tmp_bar_width = "148px"; if (pmh_tutorial_s != 3) { tmp_bar_width = "189px"; } // mini-bar size change
        if (tmp_status == 3) { tmp_bar_width = "62px"; }
        header_output += "<div class='box_cell' style='width: " + tmp_bar_width + ";'><div id='main-header-mininav' class='box-simple box box-full'>";
            header_output += "<div class='box_row'><div class='box_lft'></div><div class='box_ctr'>";
                header_output += "<div class='main-header-mininav_container'>";
                if (tmp_status == 3) {
                    header_output += "<a id='none' class='btn-disabled'><div></div></a>";
                }else{
                    if (pmh_tutorial_s != 3) { header_output += "<a id='tutorial' title='" + label_mh_tutorial + "' class='" + tmp_btn_tutorial + "' href='tutorial.aspx'><div></div></a>"; }
                    header_output += "<a id='notes' title='" + label_mh_notes + "' class='btn-normal' href='notes.aspx'><div></div></a>";
                    header_output += "<a id='bookmarks' title='" + label_mh_bookmarks + "' class='btn-normal' href='bookmarks.aspx'><div></div></a>";
                    header_output += "<a id='notifications' title='" + label_mh_notifications + "' class='btn-normal' href='notifications.aspx'><div></div></a>";
                }
                header_output += "</div>";
            header_output += "</div><div class='box_rht'></div></div>";
        header_output += "</div></div>";
    header_output += "</div></div>";

    //header_output += "<div class='mns_row row1'>";
    /*
    if (rank > 0)
        header_output += mh_menu_item(label_ranks + ' <span class="comment">(' + rank + ')</span>', 'ranks.aspx', '');
    else
        header_output += mh_menu_item(label_ranks, 'ranks.aspx', '');
    if (is_round_server) {
        header_output += menu_separator();
        header_output += mh_menu_item(label_rounds, 'rounds.aspx', '');
    }*/



    //menu_output += top_header_dropdown_community()
    //menu_output += top_header_dropdown_servers()



    $("#main-header").html(header_output);

    if (pmh_bactive) {
        //$(params_mh_btns_active).hide();
        var tmp_btn1 = document.getElementById(pmh_bactive);
        //tmp_btn1.className = tmp_btn1.className + "-active";
        tmp_btn1.className = "btn-normal-active";
    }

    // header change
    var tmp_obj1 = document.getElementById("top-header_server-time");
    tmp_obj1.className = "top-header_server-time-bg";
}

function mh_menu_item(label, url, objid, params, btn_s) {
    var output = "";
    if (btn_s == 3) { url = ""; }
    output += "<div class='mn_item'>"
    output += mh_menu_button(label, url, objid, params, btn_s)
    output += "</div>";

    /*
	<div class='mn_item' style='width: 18%'>
	</div>
    */

    return output;
}

function mh_menu_button(label, url, objid, objparams, btn_s) {
    var output = "";
    var tmp_label = label; if (objparams != "") { tmp_label = objparams; }
    var tmp_btn = "btn-normal";
        if (btn_s == 1) { tmp_btn = "btn-special"; }
        if (btn_s == 2) { tmp_btn = "btn-important"; }
        if (btn_s == 3) { tmp_btn = "btn-disabled"; }

        var tmp_href = ""; if (url != "") { tmp_href = "href='" + url + "'"; }


        // avatar test
        //style = 'background: url(" + pmh_account + ") no-repeat;'
        if (objid == "account") {
            //tmp_label = "";
            output += "<div id='main-header-avatar_face' style='background-image: url(" + tmp_label + ");'>";
            output += "<a id='" + objid + "' title='" + label + "' class='" + tmp_btn + "' " + tmp_href + "></a>";
            output += "</div>";
        } else {
            output += "<a id='" + objid + "' title='" + label + "' class='" + tmp_btn + "' " + tmp_href + ">";
            output += "<div class='btn_lft'></div>";
            output += "<div class='btn_ctr'><div>" + tmp_label + "</div></div>";
            output += "<div class='btn_rht'></div>";
            output += "</a>";
        }

    return output
}

function mh_menu_separator() {
    return "<div class='mn_separator'><div></div></div>";

}
