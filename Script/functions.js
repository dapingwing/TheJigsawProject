//1) GET ALL $GET_[vars]!
//output : $_GET["test"]
function getVars(){
	var $_GET = {};
	
	document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
		function decode(s) {
			return decodeURIComponent(s.split("+").join(" "));
		}
	
		$_GET[decode(arguments[1])] = decode(arguments[2]);
	});
}

