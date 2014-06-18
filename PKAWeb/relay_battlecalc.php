<?php
//Relay system to battle calc
//Test string
//http://vig.vg/AE/aeBattleCalc.php?aT=&aS=&
//dT=Arm:1,Las:2,Mis:3,Pla:4,Sld:5,Ion:6,Pho:7,Dis:8
//&dS=FT:1,BO:2,HB:3,IB:4,CV:5,RC:6,DE:7,FR:8,IF:9,SS:10,OS:11,CR:12,CA:13,HC:14,BS:15,FC:16,DN:17,TI:18,LE:19,DS:20,BA:1,LT:2,MT:3,PT:4,IT:5,OT:6,DT:7,FS:8,PS:9,PR:10
//mysql
require_once('./mysql_config.php');

//connection
// Create connection
$con=mysqli_connect($mysql_host,$mysql_user,$mysql_password,$mysql_database);

// Check connection
if (mysqli_connect_errno())
{
	echo "Failed to connect to MySQL: " . mysqli_connect_error();
}else {
	echo "";

}
//Get variables 
$id =  			mysqli_real_escape_string($con, $_POST['id']);
$defencelist =  mysqli_real_escape_string($con, $_POST['defencelist']);
$fleetlist =  	mysqli_real_escape_string($con, $_POST['fleetlist']);
$fleetamount = 	mysqli_real_escape_string($con, $_POST['amountlist']);

$vig_arr = array('','FT:','BO:','HB:','IB:','CV:','RC:','DE:','FR:','IF:','SS:','OS:','CR:','CA:','HC:','BS:','FC:','DN:','TI:','LE:','DS:','BA:','LT:','MT:','PT:','IT:','OT:','DT:','FS:','PS:','PR:');

$defences_arr = split(',',$defencelist);
$fleet_arr = split(',',$fleetlist);
$amount_arr = split(',',$fleetamount);

$defences_counter = 1;
$fleet_counter = 1;
$amount_counter = 2;

$defence_max_a = (count($defences_arr)-1)/2;
$defence_max_b = (count($defences_arr)-1);
$fleet_max = count($fleet_arr)-1;

//base defences
while($defence_max_a >= $defences_counter){
		$defence_amount_count = $defences_counter+$defence_max_a;
		$listme =  $defences_arr[$defence_amount_count];
		list($number,$maxnum) = split(' / ',$listme);
		
			if($defences_arr[$defences_counter] == 'Barracks'){
				$add_string1 = $add_string1.$vig_arr['21'].$number;
			}
			if($defences_arr[$defences_counter] == 'Laser Turrets'){
				$add_string1 = $add_string1.$vig_arr['22'].$number;
			}
			if($defences_arr[$defences_counter] == 'Missile Turrets'){
				$add_string1 = $add_string1.$vig_arr['23'].$number;
			}
			if($defences_arr[$defences_counter] == 'Plasma Turrets'){
				$add_string1 = $add_string1.$vig_arr['24'].$number;
			}
			if($defences_arr[$defences_counter] == 'Ion Turrets'){
				$add_string1 = $add_string1.$vig_arr['25'].$number;
			}
			if($defences_arr[$defences_counter] == 'Photon Turrets'){
				$add_string1 = $add_string1.$vig_arr['26'].$number;
			}
			if($defences_arr[$defences_counter] == 'Disruptor Turrets'){
				$add_string1 = $add_string1.$vig_arr['27'].$number;
			}
			if($defences_arr[$defences_counter] == 'Deflection Shields'){
				$add_string1 = $add_string1.$vig_arr['28'].$number;
			}
			if($defences_arr[$defences_counter] == 'Planetary Shield'){
				$add_string1 = $add_string1.$vig_arr['29'].$number;
			}
			if($defences_arr[$defences_counter] == 'Planetary Ring'){
				$add_string1 = $add_string1.$vig_arr['30'].$number;
			}
			$defences_counter++;
			$add_string1 = $add_string1.',';
}

//fleet defending
while($fleet_max >= $fleet_counter){
	if($fleet_counter !=1){
		$add_string2 = $add_string2.','.$vig_arr[$fleet_arr[$fleet_counter]].$amount_arr[$amount_counter];
	}else{
		$add_string2 = $vig_arr[$fleet_arr[$fleet_counter]].$amount_arr[$amount_counter];
	}
	$amount_counter++;
	$fleet_counter++;
}
$result = mysqli_query($con,"SELECT * FROM scout_tech WHERE id='".$id."'");
while($row = mysqli_fetch_array($result)){
	$battlecalc = "&dT=Arm:".$row['Armour'].",Las:".$row['Laser'].",Mis:".$row['Missile'].",Pla:".$row['Plasma'].",Sld:".$row['Shield'].",Ion:".$row['Ion'].",Pho:".$row['Photon'].",Dis:".$row['Disruptor']."&dS=";
}

print 'http://vig.vg/AE/aeBattleCalc.php?aT=&aS='.$battlecalc.'&dS='.$add_string1.$add_string2;