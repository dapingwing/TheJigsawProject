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
$name =  mysqli_real_escape_string($con, $_POST['owner']);
$link =  mysqli_real_escape_string($con, $_POST['base']);
$blink =  mysqli_real_escape_string($con, $_POST['link']);
$jid =  mysqli_real_escape_string($con, $_POST['jid']);
$level =  mysqli_real_escape_string($con, $_POST['level']);
################### BASES ##########################
//Mysql search
$sql = "SELECT * FROM scout_detail WHERE loc='".$loc."'";

if ($result=mysqli_query($con,$sql))
  {
  // Return the number of rows in result set
  $rowcount=mysqli_num_rows($result);
	if($rowcount >0){
		$updatesql = "UPDATE scout_detail SET  link = '".$link."', blink = '".$blink."', name = '".$name."', galaxy = '".$galaxy."', region = '".$region."', jid = '".$jid."', level = '".$level."'  WHERE loc = '".$loc."'";
		mysqli_query($con, $updatesql)or die(mysqli_error($con));
	}else{
		mysqli_query($con,"INSERT INTO scout_detail (loc, blink, link, name, galaxy, region, level, jid) VALUES ('".$loc."', '".$blink."', '".$link."', '".$name."', '".$galaxy."', '".$region."', '".$level."', '".$jid."' )")or die(mysqli_error($con));
	}
  // Free result set
  mysqli_free_result($result);
  }
mysqli_close($con);


?>