<?php
#####################################
#Name :			Tech Grabber		#
#System :		Tech Grabber		#
#Part :			Save data			#
#Step :			4					#
#####################################
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
//Get variables 
$id =  		mysqli_real_escape_string($con, $_POST['id']);
$techlist =  		mysqli_real_escape_string($con, $_POST['techlist']);
$levellist =  		mysqli_real_escape_string($con, $_POST['levellist']);
$armour =  		mysqli_real_escape_string($con, $_POST['armour']);
$shield =  		mysqli_real_escape_string($con, $_POST['shield']);
$jid =  			mysqli_real_escape_string($con, $_POST['jid']);

$tech_query = '';
$i = 1;

$techarray = split(',',$techlist);
$levelarray = split(',',$levellist);

$tech_amount = count($techarray);
while($tech_amount > $i){
	if($techarray[$i]==2){
		$techname = 'Laser';
	}
	if($techarray[$i]==3){
		$techname = 'Missile';
	}
	if($techarray[$i]==4){
		$techname = 'Plasma';
	}
	if($techarray[$i]==5){
		$techname = 'Ion';
	}
	if($techarray[$i]==6){
		$techname = 'Photon';
	}
	if($techarray[$i]==7){
		$techname = 'Disruptor';
	}
	if (strpos($tech_query,$techname) == false) {
		if($i !== 1){
			$tech_query = $tech_query.',';
		}
    	$tech_query = $tech_query." ".$techname." = '".$levelarray[$i]."'";
	}
	$i++;
}
if($armour != 0){
$tech_query = $tech_query.",  Armour = '".$armour."'";
}
if($shield != 0){
$tech_query = $tech_query.", Shield = '".$shield."'";
}
$tech_query = $tech_query.", jid = '".$jid."' ";
//Mysql search
$sql = "SELECT * FROM scout_tech WHERE id='".$id."'";
if($armour != 0 && $shield != 0){
if ($result=mysqli_query($con,$sql))
  {
  // Return the number of rows in result set
  $rowcount=mysqli_num_rows($result);
	if($rowcount == 0){
		mysqli_query($con,"INSERT INTO scout_tech (id, Armour, Shield, Laser, Missile, Plasma, Ion, Photon, Disruptor) VALUES ('".$id."', '0', '0', '0', '0', '0', '0', '0', '0')")or die(mysqli_error($con));
	}
	$updatesql = "UPDATE scout_tech SET ".$tech_query." WHERE id = '".$id."'";
		mysqli_query($con, $updatesql)or die(mysqli_error($con));
  // Free result set
  mysqli_free_result($result);
  }
}
mysqli_close($con);
?>