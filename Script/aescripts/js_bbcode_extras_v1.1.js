var image_spacer = "";
var dir_smilies = "";

function bbode_colors_load()
{
	var output = "";

	// Need translation of color names
	output += "<a href='javascript:doAddTags(\"[color=black]\",\"[/color]\");countChars(\"body\");'><img src='"		+image_spacer +"' title='Black' style='background-color: black;'/></a>";
	output += "<a href='javascript:doAddTags(\"[color=silver]\",\"[/color]\");countChars(\"body\");'><img src='"	+image_spacer +"' title='Silver' style='background-color: silver;'/></a>";
	output += "<a href='javascript:doAddTags(\"[color=gray]\",\"[/color]\");countChars(\"body\");'><img src='"		+image_spacer +"' title='Gray' style='background-color: gray;'/></a>";
	output += "<a href='javascript:doAddTags(\"[color=white]\",\"[/color]\");countChars(\"body\");'><img src='"		+image_spacer +"' title='White' style='background-color: white;'/></a>";
	output += "<a href='javascript:doAddTags(\"[color=maroon]\",\"[/color]\");countChars(\"body\");'><img src='"	+image_spacer +"' title='Maroon' style='background-color: maroon;'/></a>";
	output += "<a href='javascript:doAddTags(\"[color=red]\",\"[/color]\");countChars(\"body\");'><img src='"		+image_spacer +"' title='Red' style='background-color: red;'/></a>";
	output += "<a href='javascript:doAddTags(\"[color=purple]\",\"[/color]\");countChars(\"body\");'><img src='"	+image_spacer +"' title='Purple' style='background-color: purple;'/></a>";
	output += "<a href='javascript:doAddTags(\"[color=fuchsia]\",\"[/color]\");countChars(\"body\");'><img src='"	+image_spacer +"' title='Fuchsia' style='background-color: fuchsia;'/></a>";
	output += "<a href='javascript:doAddTags(\"[color=green]\",\"[/color]\");countChars(\"body\");'><img src='"		+image_spacer +"' title='Green' style='background-color: green;'/></a>";
	output += "<a href='javascript:doAddTags(\"[color=lime]\",\"[/color]\");countChars(\"body\");'><img src='"		+image_spacer +"' title='Lime' style='background-color: lime;'/></a>";
	output += "<a href='javascript:doAddTags(\"[color=olive]\",\"[/color]\");countChars(\"body\");'><img src='"		+image_spacer +"' title='Olive' style='background-color: olive;'/></a>";
	output += "<a href='javascript:doAddTags(\"[color=yellow]\",\"[/color]\");countChars(\"body\");'><img src='"	+image_spacer +"' title='Yellow' style='background-color: yellow;'/></a>";
	output += "<a href='javascript:doAddTags(\"[color=navy]\",\"[/color]\");countChars(\"body\");'><img src='"		+image_spacer +"' title='Navy' style='background-color: navy;'/></a>";
	output += "<a href='javascript:doAddTags(\"[color=blue]\",\"[/color]\");countChars(\"body\");'><img src='"		+image_spacer +"' title='Blue' style='background-color: blue;'/></a>";
	output += "<a href='javascript:doAddTags(\"[color=teal]\",\"[/color]\");countChars(\"body\");'><img src='"		+image_spacer +"' title='Teal' style='background-color: teal;'/></a>";
	output += "<a href='javascript:doAddTags(\"[color=aqua]\",\"[/color]\");countChars(\"body\");'><img src='"		+image_spacer +"' title='Aqua' style='background-color: aqua;'/></a>";

	$("#bbcode-colors").html(output);
}

function bbode_smilies_load() {
	var output = "";

	output += smile( ":)"			, "icon_smile.gif"		);
	output += smile( ":D"			, "icon_biggrin.gif"	);
	output += smile( ":("			, "icon_sad.gif"		);
	output += smile( ";)"			, "icon_wink.gif"		);
	output += smile( ":p"			, "icon_razz.gif"		);
	output += smile( ":o"			, "icon_surprised.gif"	);
	output += smile( ":?"			, "icon_confused.gif"	);
	output += smile( "8-)"			, "icon_cool.gif"		);
	output += smile( ":x"			, "icon_mad.gif"		);

	output += smile( ":neutral:"	, "icon_neutral.gif"	);
	output += smile( ":shock:"		, "icon_eek.gif"		);
	output += smile( ":evil:"		, "icon_evil.gif"		);
	output += smile( ":twisted:"	, "icon_twisted.gif"	);

	output += smile( ":lol:"		, "icon_lol.gif"		);
	output += smile( ":cry:"		, "icon_cry.gif"		);
	output += smile( ":-oops-:"		, "icon_redface.gif"	);
	output += smile( ":roll:"		, "icon_rolleyes.gif"	);

	output += "<a id='more_smilies' href='' onclick='$(\"#bbcode-smilies2\").show(); $(\"#more_smilies\").hide(); return false;'>...</a>";

	output += "<div id='bbcode-smilies2' style='display: none;'>";

	output += smile( ":-!-:"		, "icon_exclaim.gif"	);
	output += smile( ":-?-:"		, "icon_question.gif"	);
	output += smile( ":idea:"		, "icon_idea.gif"		);
	output += smile( ":arrow:"		, "icon_arrow.gif"		);

	output += smile( ":neutral2:"	, "neutral.gif"			);
	output += smile( ":mrgreen:"	, "icon_mrgreen.gif"	);
	output += smile( ":biglaugh:"	, "biglaugh.gif"		);

	output += smile( ":boohoo:"		, "eusa_boohoo.gif"		);
	output += smile( ":clap:"		, "eusa_clap.gif"		);
	output += smile( ":dance:"		, "eusa_dance.gif"		);
	output += smile( ":eh:"			, "eusa_eh.gif"			);
	output += smile( ":naughty:"	, "eusa_naughty.gif"	);
	output += smile( ":-pray-:"		, "eusa_pray.gif"		);
	output += smile( ":shhh:"		, "eusa_shhh.gif"		);
	output += smile( ":shifty:"		, "eusa_shifty.gif"		);
	output += smile( ":silenced:"	, "eusa_silenced.gif"	);
	output += smile( ":snooty:"		, "eusa_snooty.gif"		);
	output += smile( ":think:"		, "eusa_think.gif"		);
	output += smile( ":wall:"		, "eusa_wall.gif"		);

	output += smile( "/facepalm"	, "facepalm.gif"		);

	output += smile( ":-paranoid-:"	, "paranoid.gif"		);
	output += smile( ":nonono:"		, "nonono2.gif"			);
	output += smile( ":bleh:"		, "smilie_bleh.gif"		);
	output += smile( ":whisle:"		, "209228.gif"			);
	output += smile( ":grumpy:"		, "grumpy.gif"			);
	output += smile( ":headshake:"	, "headshake.gif"		);
	output += smile( ":scared:"		, "emot-gonk.gif"		);
	output += smile( ":blabla:"		, "blabla.gif"			);
	output += smile( ":help:"		, "help.gif"			);
	output += smile( ":bumping:"	, "bumping_head.gif"	);
	output += smile( ":sleep:"		, "dormir2.gif"			);
	output += smile( ":firedevil:"	, "firedevil.gif"		);
	output += smile( ":banana:"		, "banana.gif"			);
	output += smile( ":-owned-:"	, "owned.gif"			);
	output += smile( ":cussing:"	, "cussing.gif"			);
	output += smile( ":lolol:"		, "lol.gif"				);

	output += "</div>";

	$("#bbcode-smilies").html(output);
}

function smile(bbcode, image) {
	return "<a href='javascript:doAddTags(\"" +bbcode +"\",\"\");countChars(\"body\");'><img src='" +dir_smilies +"/" +image +"' hspace='2' vspace='2' alt='" +bbcode +"'></a> ";
}