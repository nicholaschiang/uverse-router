//the var myrules is used by the behavior.js file

var myrules = {
   'h2.shrinker' : function(element){  
      element.onclick = function(){  //Adding the onclick event for the h2 elements
         var div = Element.find(element, 'nextSibling'); //Here we look for the next node after the h2 tag
         if (div.style.display=="block"){  //If it's already visible, we hide it
            div.style.display="none";
         }
         else if (div.style.display=="none"){  //If it's not visible, we show it
            div.style.display="block";
         }        
         else {
            div.style.display="none";	//And if we don't have any idea, we hide it
         }
      }
   },
   
   'h4.shrinker' : function(element){  
      element.onclick = function(){  //Adding the onclick event for the sitemap h4 elements
        if (element.nextSibling.nextSibling)
         {
           var div = Element.find(element, 'nextSibling'); //Here we look for the next node after the h4 tag
           if (div.style.display=="block"){  //If it's already visible, we hide it
              div.style.display="none";
           }
           else if (div.style.display=="none"){  //If it's not visible, we show it
              div.style.display="block";
           }        
           else {
              div.style.display="none";	//And if we don't have any idea, we hide it
           }
         }
      }
   }
};

function init() {
  
  //Find all shrinker nodes and setup for hiding next sibling
  var div = document.getElementsByClassName("shrinker"); 
  for (var i=0; i<div.length; i++)
  {
    if (div[i].nextSibling)
      {
      if (div[i].nextSibling.childNodes[0])
        {
          div[i].innerHTML = div[i].innerHTML + "<img class='centerimg' alt='double arrow' src='/images/doublearrow.jpg'/>";
          //hide the following node by default
          div[i].nextSibling.style.display="none";
        }
    }
  }
  
  //Initialize the table alternate row coloring
  var table = document.getElementsByTagName("TABLE");
  for (var i=0; i<table.length; i++){
    if (table[i].className=="colortable"){
      var tr = table[i].getElementsByTagName("TR");
      for (var j=0; j<tr.length; j++){
        var tempClassName = tr[j].className;
        if (!tempClassName){
          tr[j].className = (j%2==0 ? "odd" : "even");
        }  
        else if (tempClassName = "skipcolor"){
            //If we don't want to color the row, skip the below operation.
          }
        else {
          tr[j].className = (j%2==0 ? tempClassName + " odd" : tempClassName + " even");
        }
      }
    }
    
  }

  
}

Behaviour.addLoadEvent(init); //Calling the initializing functions
Behaviour.register(myrules);  //Applying the rules

