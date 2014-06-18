<div id="topbar">
    <a href="./search_mysql.php">Base's Database</a>
    <a href="./search_tech.php">Tech Database</a>
</div>
<div id="body">
<?php
//variables
require_once('./mysql_config.php');

//connection
// Create connection
$con=mysqli_connect($mysql_host,$mysql_user,$mysql_password,$mysql_database);
// Check connection
if (mysqli_connect_errno())
  {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }

$result = mysqli_query($con,"SELECT * FROM scout_tech");
echo "<html><body><div class=\"datagrid\" ><table width=\"100%\">\n\n";
echo "<thead><tr><th>Name</th><th>Armour</th><th>Shield</th><th>Laser</th><th>Missile</th><th>Plasma</th><th>Ion</th><th>Photon</th><th>Disruptor</th><th>Date</th><th>BattleCalc</th><th>Scouted by</th></tr></thead>";
while($row = mysqli_fetch_array($result)){
	
		echo "<tr>";
		echo "<td>";
		//GET NAME
		$select_query = "SELECT * FROM scout_users WHERE id = '".$row['id']."'";
		$result2 = mysqli_query($con, $select_query)or die(mysqli_error($con));
		while($row2 = mysqli_fetch_array($result2)){
			echo "<a href='http://pegasus.astroempires.com/profile.aspx?player=".$row['id']."'>".$row2['name']."</a>";
		}
		mysqli_free_result($result2);
        
		//battle calc generator//
		//http://vig.vg/AE/aeBattleCalc.php?aT=&aS=&dT=Arm:1,Las:2,Mis:3,Pla:4,Sld:5,Ion:6,Pho:7,Dis:8&dS=
		$battlecalc = "http://vig.vg/AE/aeBattleCalc.php?aT=&aS=&dT=Arm:".$row['Armour'].",Las:".$row['Laser'].",Mis:".$row['Missile'].",Pla:".$row['Plasma'].",Sld:".$row['Shield'].",Ion:".$row['Ion'].",Pho:".$row['Photon'].",Dis:".$row['Disruptor']."&dS=";
		
		
        echo "</td>";
		echo "<td>".$row['Armour']."</td>";
		echo "<td>".$row['Shield']."</td>";
		echo "<td>".$row['Laser']."</td>";
		echo "<td>".$row['Missile']."</td>";
		echo "<td>".$row['Plasma']."</td>";
		echo "<td>".$row['Ion']."</td>";
		echo "<td>".$row['Photon']."</td>";
		echo "<td>".$row['Disruptor']."</td>";
		echo "<td>".$row['date']."</td>";
		echo "<td><a target='_blank' href='".$battlecalc."'>Open in Battlecalc</a></td>";
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
mysqli_free_result($result);
echo "\n</table></div></body></html>";
?>
</div>

<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
<script src="jquery.filtertable.js"></script>
<script type="text/javascript" src="jquery.tablesorter.js"></script> 
<style>
	html{background-color:#404040; }
    .datagrid table { border-collapse: collapse; text-align: left; width: 100%; } 
	.datagrid {font: normal 12px/150% Arial, Helvetica, sans-serif; background: #fff; overflow: hidden; border: 1px solid #006699; -webkit-border-radius: 3px; -moz-border-radius: 3px; border-radius: 3px; }
	.datagrid table td, .datagrid table th { padding: 3px 10px; }
	.datagrid table thead th {background:-webkit-gradient( linear, left top, left bottom, color-stop(0.05, #006699), color-stop(1, #00557F) );background:-moz-linear-gradient( center top, #006699 5%, #00557F 100% );filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#006699', endColorstr='#00557F');background-color:#006699; color:#FFFFFF; font-size: 15px; font-weight: bold; border-left: 1px solid #0070A8; } .datagrid table thead th:first-child { border: none; }.datagrid table tbody td { color: #00557F; border-left: 1px solid #E1EEF4;font-size: 12px;font-weight: normal; }.datagrid table tbody .alt td { background: #E1EEf4; color: #00557F; }.datagrid table tbody td:first-child { border-left: none; }.datagrid table tbody tr:last-child td { border-bottom: none; }.datagrid table tfoot td div { border-top: 1px solid #006699;background: #E1EEf4;} .datagrid table tfoot td { padding: 0; font-size: 12px } .datagrid table tfoot td div{ padding: 2px; }.datagrid table tfoot td ul { margin: 0; padding:0; list-style: none; text-align: right; }.datagrid table tfoot  li { display: inline; }.datagrid table tfoot li a { text-decoration: none; display: inline-block;  padding: 2px 8px; margin: 1px;color: #FFFFFF;border: 1px solid #006699;-webkit-border-radius: 3px; -moz-border-radius: 3px; border-radius: 3px; background:-webkit-gradient( linear, left top, left bottom, color-stop(0.05, #006699), color-stop(1, #00557F) );background:-moz-linear-gradient( center top, #006699 5%, #00557F 100% );filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#006699', endColorstr='#00557F');background-color:#006699; }.datagrid table tfoot ul.active, .datagrid table tfoot ul a:hover { text-decoration: none;border-color: #00557F; color: #FFFFFF; background: none; background-color:#006699;}div.dhtmlx_window_active, div.dhx_modal_cover_dv { position: fixed !important; }
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
	$("table").tablesorter(); 
	$('table').filterTable(); //if this code appears after your tables; otherwise, include it in your document.ready() code.
	$('tr').mouseenter(function(){
		prevcolor = $(this).css('background-color');
		$(this).css('background-color','#0099FF');
	}).mouseleave(function(){
		$(this).css('background-color',prevcolor);
	});
});
</script>


