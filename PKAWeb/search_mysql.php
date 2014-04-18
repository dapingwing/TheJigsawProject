<div id="topbar">
    <a href="./search_mysql.php">Base's Database</a>
    <a href="./search_tech.php">Tech Database</a>
</div>
<div id="body">
<?php
//variables
$mysql_host = "mysql5.000webhost.com";
$mysql_database = "a9901560_ae";
$mysql_user = "a9901560_ae";
$mysql_password = "kilbone229";

//connection
// Create connection
$con=mysqli_connect($mysql_host,$mysql_user,$mysql_password,$mysql_database);
// Check connection
if (mysqli_connect_errno())
  {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }

$result = mysqli_query($con,"SELECT * FROM scout_detail");
echo "<html><body><div class=\"datagrid\" ><input type=\"textbox\" id=\"input\" value=\"enter your level\"><table width=\"100%\">\n\n";
echo "<thead><tr><th>Base link</th><th>Location Link</th><th>Economy</th><th>Fleet link</th><th>Defences</th><th>Defence Amounts</th><th>Player</th><th>Date</th><th>Scouted by</th></tr></thead>";
while($row = mysqli_fetch_array($result)){
        echo "<tr>";
        echo "<td>".$row['blink']."</td>";
		echo "<td>".$row['loc']."</td>";
		echo "<td>".$row['eco']."</td>";
		echo "<td>".$row['link']."</td>";
		echo "<td>".$row['defence']."</td>";
		echo "<td></td>";
		echo "<td>".$row['name']."</td>";
		echo "<td>".$row['date']."</td>";
		echo "<td>";
		$select_query = "SELECT * FROM scout_users WHERE id = '".$row['jid']."'";
		$result2 = mysqli_query($con, $select_query)or die(mysqli_error($con));
		while($row2 = mysqli_fetch_array($result2)){
			echo "<a href='http://pegasus.astroempires.com/profile.aspx?player=".$row['jid']."'>".$row2['name']."</a>";
		}
		mysqli_free_result($result2);
		echo "</td>";
        echo "</tr>\n";
}
echo "\n</table></div></body></html>";
?>
</div>

<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
<script src="jquery.filtertable.js"></script>
<script type="text/javascript" src="jquery.tablesorter.js"></script> 
<style>
	html{background-color:#404040; }
    .datagrid table { border-collapse: collapse; text-align: left; width: 100%; } .datagrid {font: normal 12px/150% Arial, Helvetica, sans-serif; background: #fff; overflow: hidden; border: 1px solid #006699; -webkit-border-radius: 3px; -moz-border-radius: 3px; border-radius: 3px; }.datagrid table td, .datagrid table th { padding: 3px 10px; }.datagrid table thead th {background:-webkit-gradient( linear, left top, left bottom, color-stop(0.05, #006699), color-stop(1, #00557F) );background:-moz-linear-gradient( center top, #006699 5%, #00557F 100% );filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#006699', endColorstr='#00557F');background-color:#006699; color:#FFFFFF; font-size: 15px; font-weight: bold; border-left: 1px solid #0070A8; } .datagrid table thead th:first-child { border: none; }.datagrid table tbody td { color: #00557F; border-left: 1px solid #E1EEF4;font-size: 12px;font-weight: normal; }.datagrid table tbody .alt td { background: #E1EEf4; color: #00557F; }.datagrid table tbody td:first-child { border-left: none; }.datagrid table tbody tr:last-child td { border-bottom: none; }.datagrid table tfoot td div { border-top: 1px solid #006699;background: #E1EEf4;} .datagrid table tfoot td { padding: 0; font-size: 12px } .datagrid table tfoot td div{ padding: 2px; }.datagrid table tfoot td ul { margin: 0; padding:0; list-style: none; text-align: right; }.datagrid table tfoot  li { display: inline; }.datagrid table tfoot li a { text-decoration: none; display: inline-block;  padding: 2px 8px; margin: 1px;color: #FFFFFF;border: 1px solid #006699;-webkit-border-radius: 3px; -moz-border-radius: 3px; border-radius: 3px; background:-webkit-gradient( linear, left top, left bottom, color-stop(0.05, #006699), color-stop(1, #00557F) );background:-moz-linear-gradient( center top, #006699 5%, #00557F 100% );filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#006699', endColorstr='#00557F');background-color:#006699; }.datagrid table tfoot ul.active, .datagrid table tfoot ul a:hover { text-decoration: none;border-color: #00557F; color: #FFFFFF; background: none; background-color:#006699;}div.dhtmlx_window_active, div.dhx_modal_cover_dv { position: fixed !important; }
	
	th.headerSortUp { 
    	background-image: url(themes/blue/small_asc.gif); 
	} 
	th.headerSortDown { 
    background-image: url(themes/blue/small_desc.gif);  
} 
#topbar{
	height: 30px;
	width:100%;
	position:fixed;
	background:-webkit-gradient( linear, left top, left bottom, color-stop(0.05, #006699), color-stop(1, #00557F) );background:-moz-linear-gradient( center top, #006699 5%, #00557F 100% );filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#006699', endColorstr='#00557F');background-color:#006699; color:#FFFFFF; font-size: 15px; font-weight: bold;
}
#topbar a{
	font: normal 12px/150% Arial, Helvetica, sans-serif;
	float: left;
	display: block;
	padding: 4px;
	text-decoration: none;
	color: #FFF;
	text-transform: uppercase;
	margin-bottom: 5px;
	margin-right: 10px;
}
#topbar a:hover{
	background-color: #fff;
	color:#006;
}
body,html{
	margin:0px;
	padding:0px;
	width:100%;
	background-color:#fff;
}
.datagrid{
	padding-top:50px;
}
#body{
	padding:25px;
}
</style> <!-- or put the styling in your stylesheet -->
<script>
$(document).ready(function(){
    $('table tr').each(function(){
        text = $(this).find('td:nth-child(2)').text();
		if(text != "Location Link"){
			newtext = "<a  target=\"_blank\" href=\"http://pegasus.astroempires.com/map.aspx?loc="+text+"\">Open : "+text+"</a>";
			$(this).find('td:nth-child(2)').html(newtext);
		}
    });
	$('table tr').each(function(){
        text = $(this).find('td:nth-child(1)').text();
		if(text != "Base link"){
			newtext = "<a  target=\"_blank\" href=\""+text+"\">Open Base</a>";
			$(this).find('td:nth-child(1)').html(newtext);
		}
    });
	$('table tr').each(function(){
        text = $(this).find('td:nth-child(4)').text();
		if(text != "Fleet link"){
			newtext = "<a  target=\"_blank\" href=\"http://pegasus.astroempires.com/"+text+"\">Open Fleet</a>";
			$(this).find('td:nth-child(4)').html(newtext);
		}
    });
	$('table tr').each(function(){
        text = $(this).find('td:nth-child(5)').text();
		if(text != "Defences"){
			$(this).find('td:nth-child(5)').empty();
			var texty = text.split(',');
			var half = (texty.length-1)/2;
			l = half;
			for (var i = 1; i <= l; i++) {
				pretext = $(this).find('td:nth-child(5)').html();
				$(this).find('td:nth-child(5)').html(pretext+'<br>'+texty[i]);
			}
			
			l = half*2;
			console.log(l);
			for (var i = half+1; i <= l; i++) {
				pretext = $(this).find('td:nth-child(6)').html();
				$(this).find('td:nth-child(6)').html(pretext+'<br>'+texty[i]);
			}
		}
    });
$("table").tablesorter(); 
$('table').filterTable(); //if this code appears after your tables; otherwise, include it in your document.ready() code.
     $( "#input").on( "change", function(event, ui) {
        amount =  parseFloat($('#input').val());
        amount1 = amount-5;
        amount2 = amount+5;
        console.log(amount1+" , "+amount2)
      $("table tr").each(function(){
        var lvl = $(this).find('td:nth-child(4)').text();
        lvl = parseFloat(lvl.replace(/\(.*?\)/, ''));
        console.log(lvl);
        if((amount2 > lvl) && (amount1 < lvl)){
            $(this).show();
        }else{
            $(this).hide();
        }
      });
  });
 $('tr').mouseenter(function(){
	prevcolor = $(this).css('background-color');
	$(this).css('background-color','#0099FF');
}).mouseleave(function(){
	$(this).css('background-color',prevcolor);
});
});
</script>


