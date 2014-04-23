function maxquant(id)	//Click on max link - Quant=Avail
{
    document.getElementById("quant" +id).value = Number(document.getElementById('avail' +id).getAttribute("js_value"));
	update(id);
}

function zero(id)	//Click on zero - Quant=0
{
    document.getElementById("quant" +id).value = '';
	update(id);
}

function fill_hangar(id)	//Click on max link - Quant=Avail
{
    document.getElementById("quant" +id).value = 0;
	update(id);

	if (document.getElementById("hangar" +id).getAttribute("js_value")>0)
    document.getElementById("quant" +id).value = Math.ceil(Number(document.getElementById("totalhangar").innerHTML)/(-document.getElementById("hangar" +id).getAttribute("js_value")));

	if (document.getElementById("hangar" +id).getAttribute("js_value")<0)
    document.getElementById("quant" +id).value = Math.floor(Number(document.getElementById("totalhangar").innerHTML)/(-document.getElementById("hangar" +id).getAttribute("js_value")));

	update(id);
}

function fastloc(destination)	//Click on fast location
{
    document.getElementById("destination").value = destination;
    calc_distance();
}

function update(id)		// Update item line & totals
{
	var avail=0;
	var hangar=0;
	var size=0;
	var distance=0;
	var quant=0;

	avail		= document.getElementById('avail' +id).getAttribute("js_value");
	hangar		= document.getElementById("hangar" +id).getAttribute("js_value");
	size		= document.getElementById("size" +id).getAttribute("js_value");
	distance	= document.getElementById("distance").innerHTML;

	if (Number(document.getElementById("quant" +id).value)>avail) document.getElementById("quant" +id).value=avail;
	if (Number(document.getElementById("quant" +id).value)<0)     document.getElementById("quant" +id).value=0;
	quant=document.getElementById("quant" +id).value;

    if (hangar)		document.getElementById("hangar" +id).innerHTML =  hangar*quant;
					document.getElementById("size" +id).innerHTML =    size*quant;

	if (document.getElementById("hangar" +id).innerHTML == '0') document.getElementById("hangar" +id).innerHTML = '';
	if (document.getElementById("size" +id).innerHTML   == '0') document.getElementById("size" +id).innerHTML = '';

    totals();
}

function totals()	// Update Totals
{
	var units="";
	var max_speed=0;
	var hangar=0;
	var size=0;
	var speed=0;

	units=document.getElementById("units").value;
	var a=new Array;
	a=units.split(",");

	max_speed=Number.MAX_VALUE;
	
	for (var i in a)
	{
		hangar+=	Number(document.getElementById("hangar" +a[i]).innerHTML);
		size+=		Number(document.getElementById("size"   +a[i]).innerHTML);
		
		if (document.getElementById("speed" +a[i]))
		{
			speed=Number(document.getElementById("speed" +a[i]).getAttribute("js_value"));
			if (speed>0)
				{
				if ( (document.getElementById("quant" +a[i]).value>0) && (speed<max_speed) ) max_speed=speed;
				}
		}
	}
	if (max_speed==Number.MAX_VALUE) { max_speed=""; }

	document.getElementById("totalhangar").innerHTML=hangar;
	document.getElementById("totalsize").innerHTML=size;
	document.getElementById("detect").innerHTML=tempo(detected(size));
	document.getElementById("maxspeed").innerHTML=max_speed;

	if (hangar<0)		document.getElementById("totalhangar").style.color="red"; 
	if (hangar>=0)		document.getElementById("totalhangar").style.color="white";

	calc_duration();
}

function detected(size)
{
	return Math.round(48*3600*((-200000/(size+200000))+1))
}

function calc_distance()	// Calc Distance Start-Target
{
	var start="";
	var distance=0;
	var s_gal0=""; var s_gal1=0; var s_gal2=0;
	var s_reg0=0; var s_reg1=0;
	var s_sys0=0; var s_sys1=0;
	var s_ast0=0; var s_ast1=0;
	var t_gal0=""; var t_gal1=0; var t_gal2=0;
	var t_reg0=0; var t_reg1=0;
	var t_sys0=0; var t_sys1=0;
	var t_ast0=0; var t_ast1=0;
	var s_sys_x=0; var s_sys_y=0;
	var t_sys_x=0; var t_sys_y=0;
	var var_gal=0; var var_sys=0; var var_ast0=0;  var var_ast1=0;

	start=document.getElementById("start").innerHTML;
	s_gal0=String(start.charAt(0));		s_gal1=Number(start.charAt(1));	s_gal2=Number(start.charAt(2));
	s_reg0=Number(start.charAt(4));		s_reg1=Number(start.charAt(5));
	s_sys0=Number(start.charAt(7));		s_sys1=Number(start.charAt(8));
	s_ast0=Number(start.charAt(10));	s_ast1=Number(start.charAt(11));

	t_gal0=String(document.getElementById("destination").value.charAt(0));	t_gal1=Number(document.getElementById("destination").value.charAt(1));	t_gal2=Number(document.getElementById("destination").value.charAt(2));
	t_reg0=Number(document.getElementById("destination").value.charAt(4));	t_reg1=Number(document.getElementById("destination").value.charAt(5));
	t_sys0=Number(document.getElementById("destination").value.charAt(7));	t_sys1=Number(document.getElementById("destination").value.charAt(8));
	t_ast0=Number(document.getElementById("destination").value.charAt(10));	t_ast1=Number(document.getElementById("destination").value.charAt(11));

	s_sys_x=s_reg1*10+s_sys1; s_sys_y=s_reg0*10+s_sys0;
	t_sys_x=t_reg1*10+t_sys1; t_sys_y=t_reg0*10+t_sys0;

	var_gal=Math.abs((s_gal1-t_gal1)*19+s_gal2-t_gal2);
	
	var_sys=Math.ceil(Math.sqrt(Math.pow(t_sys_x-s_sys_x,2)+Math.pow(t_sys_y-s_sys_y,2)));
	var_ast0=Math.abs(t_ast0-s_ast0);
	var_ast1=Math.abs(t_ast1-s_ast1);

	if (var_gal)
		{
		if (t_gal1==s_gal1) { distance=var_gal*200; }
		if (t_gal1>s_gal1) { distance=(9-s_gal2)*200+2000+t_gal2*200; }
		if (t_gal1<s_gal1) { distance=s_gal2*200+2000+(9-t_gal2)*200; }
		}
	else
	{	if (var_sys) { distance=var_sys; }
		else
		{	if (var_ast0) { distance=var_ast0/5; }
			else
			{ distance=0.1; }
		}
	}

	if (start==document.getElementById("destination").value) distance=0;

	document.getElementById("distance").innerHTML=distance;
	calc_duration();
	totals();
}

function calc_duration()	// Calc travel duration
{
	var distance=0;
	var speed=0;
	var logistics=0;
	var duration=0;

	distance	= Number(document.getElementById("distance").innerHTML);
	speed		= Number(document.getElementById("maxspeed").innerHTML);
	logistics	= Number(document.getElementById("logistics").getAttribute("js_value"));

	if ((distance>0) && (speed>0))
	{
		duration=Math.ceil((distance/speed)*3600);
		duration=Math.ceil(duration*(1-logistics*0.01))
		document.getElementById("duration").innerHTML=tempo(duration);
	}

	if ((distance==0) || (speed==0))
	{
		document.getElementById("duration").innerHTML="";
	}
}

function tempo(s)		// Write tempo string
{
	var t_h = document.getElementById("translation_h").innerHTML;
	var t_m = document.getElementById("translation_m").innerHTML;
	var t_s = document.getElementById("translation_s").innerHTML;

	var m=0;
	var h=0;

	if(s>59) m=Math.floor(s/60); s=s-m*60;
	if(m>59) h=Math.floor(m/60); m=m-h*60;
	if(s<10) s="0"+s;
	if(m<10) m="0"+m;

	if (h>0) return h+t_h +" " +m+t_m +" " +s+t_s;
	if (m>0) return             m+t_m +" " +s+t_s;
			 return                         s+t_s;
}