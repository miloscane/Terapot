var timeoutActive = false;
var timeOutTime   = 1000;
var siteWrap  = document.getElementById("site-wrap");
var scrollableElement = document.body; //document.getElementById('scrollableElement');
scrollableElement.addEventListener('wheel', checkScrollDirection);
scrollableElement.addEventListener('keydown', function(event){
  //up -> 38
  //donw ->v40
  if(event.keyCode==38){
    scrollToSection(-1);
  }else if(event.keyCode==40){
    scrollToSection(1);
  }
});

function getTouches(evt) {
  return evt.touches ||             // browser API
         evt.originalEvent.touches; // jQuery
}                                                     
                                                                         
function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];                                      
    xDown = firstTouch.clientX;                                      
    yDown = firstTouch.clientY;                                      
};                                                
                                                                         
function handleTouchMove(evt) {
    if ( ! xDown || ! yDown ) {
        return;
    }

    var xUp = evt.touches[0].clientX;                                    
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;
                                                                         
    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        if ( xDiff > 0 ) {
            /* right swipe */ 
           
        } else {
            /* left swipe */
        }                       
    } else {
        if ( yDiff > 0 ) {
            /* down swipe */ 
          scrollToSection(1);
        } else { 
            /* up swipe */
          scrollToSection(-1);
        }                                                                 
    }
    /* reset values */
    xDown = null;
    yDown = null;                                             
};

document.addEventListener('touchstart', handleTouchStart, false);        
document.addEventListener('touchmove', handleTouchMove, false);

var xDown = null;                                                        
var yDown = null;

function checkScrollDirection(event) {
  if (checkScrollDirectionIsUp(event)) {
    //console.log("Up");
    scrollToSection(-1);
  } else {
    //console.log("Down")
    scrollToSection(1);
  }
}

function checkScrollDirectionIsUp(event) {
  if (event.wheelDelta) {
    return event.wheelDelta > 0;
  }
  return event.deltaY < 0;
}

var sections  = document.getElementsByClassName("section");
var menuItems   = document.getElementById("menu").getElementsByClassName("item");
for(var i=0;i<sections.length;i++){
  sections[i].dataset.active = 0;
}
sections[0].dataset.active=1;

function scrollToSection(direction){
  if(!timeoutActive){
    var sectionIndex = -1
    for(var i=0;i<sections.length;i++){
      if(Number(sections[i].dataset.active) == 1){
        sectionIndex = i;
        break;
      }
    }
    if(sectionIndex<0){
      console.log("No active section found");
    }else{
      var nextSection = sectionIndex + direction;
      if(nextSection>sections.length-1){
        //Last section
        console.log("Last Section")
      }else if(nextSection<0){
        console.log("First Section");
        
      }else{
        siteWrap.style.top = "-" + eval(nextSection*100) + "vh";
        for(var i=0;i<sections.length;i++){
          sections[i].dataset.active = 0;
        }
        sections[nextSection].dataset.active = 1;
        var sectionName = sections[nextSection].dataset.name;
        for(var i=0;i<menuItems.length;i++){
          menuItems[i].classList.remove("itemActive");
          if(menuItems[i].dataset.name==sectionName){
            menuItems[i].classList.add("itemActive");
          }
        }
        window.location.href = "#sectionnum="+nextSection
        if(sections[nextSection].dataset.animationclassname){
          sections[nextSection].classList.add(sections[nextSection].dataset.animationclassname)
        }
        timeoutActive = true;
        setTimeout(function(){timeoutActive=false;},timeOutTime);
        if(nextSection==0){
          document.getElementById("menu").classList.remove("whiteMenu");
        }else{
          document.getElementById("menu").classList.add("whiteMenu");
        }
      }
    }
  }
}

function scrollDirectlyToSection(sectionNum){
  siteWrap.style.top = "-" + eval(sectionNum*100) + "vh";
  for(var i=0;i<sections.length;i++){
    sections[i].dataset.active = 0;
  }
  sections[sectionNum].dataset.active=1;
  var sectionName = sections[sectionNum].dataset.name;
  for(var i=0;i<menuItems.length;i++){
    menuItems[i].classList.remove("itemActive");
    if(menuItems[i].dataset.name==sectionName){
      menuItems[i].classList.add("itemActive");
    }
  }
  window.location.href = "#sectionnum="+sectionNum

  if(sections[sectionNum].dataset.animationclassname){
    sections[sectionNum].classList.add(sections[sectionNum].dataset.animationclassname)
  }
  if(sectionNum==0){
    document.getElementById("menu").classList.remove("whiteMenu");
  }else{
    document.getElementById("menu").classList.add("whiteMenu");
  }
}

function menuScrollToSection(elem){
  var sectionName = elem.dataset.name;
  var sectionNum  = -1;
  for(var i=0;i<sections.length;i++){
    if(sections[i].dataset.name == sectionName){
      sectionNum  = i;
      break;
    }
  }
  if(sectionNum>=0){
    scrollDirectlyToSection(sectionNum);
  }else{
    console.log("Couldn't figure where to scroll based on name")
  }
  
}

var urlArray  = window.location.href.split("#");
if(urlArray.length>1){
  var activeSection = Number(urlArray[1].split("sectionnum=")[1])
  if(!isNaN(activeSection)){
    scrollDirectlyToSection(activeSection)
  }
}

