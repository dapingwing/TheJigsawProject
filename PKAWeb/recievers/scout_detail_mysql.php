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
}else {
	echo "Connection to MySQL completed";

}

//get post info :
$loc =  mysqli_real_escape_string($con,$_POST['loc']);
list($galaxy, $region, $system, $planet) = split('[:]', $loc);
$eco =  mysqli_real_escape_string($con, $_POST['eco']);
$name =  mysqli_real_escape_string($con, $_POST['name']);
$defence =  mysqli_real_escape_string($con, $_POST['defence']);
$fleet =  mysqli_real_escape_string($con, $_POST['fleet']);
$link =  mysqli_real_escape_string($con, $_POST['link']);
$blink =  mysqli_real_escape_string($con, $_POST['blink']);
$jg =  mysqli_real_escape_string($con, $_POST['jg']);
$cc =  mysqli_real_escape_string($con, $_POST['cc']);
$jid =  mysqli_real_escape_string($con, $_POST['jid']);
################### BASES ##########################
//Mysql search
$sql = "SELECT * FROM scout_detail WHERE loc='".$loc."'";

if ($result=mysqli_query($con,$sql))
  {
  // Return the number of rows in result set
  $rowcount=mysqli_num_rows($result);
	if($rowcount >0){
		$updatesql = "UPDATE scout_detail SET eco = '".$eco."', fleet = '".$fleet."', link = '".$link."', name = '".$name."', defence = '".$defence."', galaxy = '".$galaxy."', region = '".$region."', blink = '".$blink."', jid = '".$jid."', jg = '".$jg."', cc = '".$cc."'  WHERE loc = '".$loc."'";
		mysqli_query($con, $updatesql)or die(mysqli_error($con));
	}else{
		mysqli_query($con,"INSERT INTO scout_detail (loc, blink, eco, fleet, link, name, defence, galaxy, region, jg, cc jid) VALUES ('".$loc."', '".$blink."', '".$eco."', '".$fleet."', '".$link."', '".$name."', '".$defence."', '".$galaxy."', '".$region."', '".$jg."', '".$cc."', '".$jid."' )")or die(mysqli_error($con));
	}
  // Free result set
  mysqli_free_result($result);
  }
mysqli_close($con);


?>