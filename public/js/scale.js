var screenHeight 	=	100*vh-70;
for(var i=0;i<sections.length;i++){
	var scalingElem = sections[i].getElementsByClassName("contents")[0];
	if(scalingElem){
		var box = scalingElem.getBoundingClientRect();
		for(var j=0;j<100;j++){
			if(box.height*((100-j)/100)+20>screenHeight){
				scalingElem.style.transform = "scale("+eval(100-j)/100+")";
			}else{
				break;
			}
		}
	}
}