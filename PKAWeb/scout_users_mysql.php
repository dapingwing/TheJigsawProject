<?php
#####################################
#Name :			Player Scout		#
#System :		Player scouter		#
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
$eco =  		mysqli_real_escape_string($con, $_POST['eco']);
$name =  		mysqli_real_escape_string($con, $_POST['name']);
$level =  		mysqli_real_escape_string($con, $_POST['level']);
$languagelist = mysqli_real_escape_string($con, $_POST['languagelist']);
$id =  			mysqli_real_escape_string($con, $_POST['id']);
$jid =  			mysqli_real_escape_string($con, $_POST['jid']);

################### Players ##########################
//String editing
$guild = array();
preg_match_all("/\[.*?\]/", $name, $guild);
print_r($guild);
if(isset($guild[0])){
	$cleaned_name = preg_replace('['.$guild[0].']', '', $name);
}else{
	$cleaned_name = $name;
	$guild[0] = "Unguilded";
}
//Mysql search
$sql = "SELECT * FROM scout_users WHERE id='".$id."'";

if ($result=mysqli_query($con,$sql))
  {
  // Return the number of rows in result set
  $rowcount=mysqli_num_rows($result);
	if($rowcount >0){
		$updatesql = "UPDATE scout_users SET eco = '".$eco."', name = '".$cleaned_name."', level = '".$level."', guild = '".$guild[0]."', languagelist = '".$languagelist."', jid = '".$jid."' WHERE id = '".$id."'";
		mysqli_query($con, $updatesql)or die(mysqli_error($con));
	}else{
		mysqli_query($con,"INSERT INTO scout_users (id, eco, name, level, guild, languagelist, jid) VALUES ('".$id."', '".$eco."', '".$cleaned_name."', '".$level."', '".$guild[0]."', '".$languagelist."' , '".$jid."' )")or die(mysqli_error($con));
	}
  // Free result set
  mysqli_free_result($result);
  }
mysqli_close($con);
?>