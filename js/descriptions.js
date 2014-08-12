/*

function getAll() {

//if (xx) {
  //  map.remove(xx);
    //}
    
//xx = po.geoJson()

//.url("getGeo-egloffstein.php?q=a.country%20!=%20%22sample%22").on("load", load4);

xx = po.geoJson().url("places.js").on("load", load4);

//map.add(po.geoJson().url("getData.php?q=select * from points where com_id=27").on("load", load4));

//map.add(xx);

}

getAll();

*/

function loadDescriptions(theData) {


	//console.log("loadDescriptions running with theData.length at " + theData.length);    
    //alert("loadDescriptions says theData.length is " + theData.length);
    
    
    //console.log(theData);
    //console.log(theData[0]);
      // old one based on geojson syntax
      // var count = d.features.length;
    var count = theData.length;
    if (!count) {
    	alert("giving up");
        return;
        
    }
    
    $(".viewer").html("<ol></ol>");
    
    // begin for loop
    for (var i = 0; i < count; i++) {
        //console.log(theData);
      // alert("loadDescriptions is looping through number " + i + " with selected at " + theData[i].attributes.selected);
      
      	opened = 0; // GM ADD, KIND OF A HACK BUT IT WORKS
        
        var theFeatures = theData[i];
        var title = theData[i].attributes.title;
        var description = theData[i].attributes.description;
        var location = theData[i].attributes.location;
        var url = theData[i].attributes.url;
        var category = theData[i].attributes.category;
        var selected = theData[i].attributes.selected; // not instantiated yet
        var id = theData[i].attributes.id;
        var countrystring = "";
        
        // send info to itemArray in root
        itemArray.push(theData[i].attributes.category);
        
        	 
		var prefZoomTemp = theData[i].attributes.prefZoom;
	
		if(prefZoomTemp == 0){
		 	prefZoomTemp = this.map.getZoom();
		 }
        
        
        // LEFT-SIDE VIEWER SPECIFIC //
        
        /*
        
        // EXPAND SELECTED AREA
        if (selected == 1) {
        	
            $(".viewer ol").append("<li class='area' id=\"" + id + "\"><strong><a href=\"javascript: moveTheMap(" + id + "," + prefZoomTemp + "); javascript: selectFeature('" + id + "');\">" +id + ". "  + title + "<img src='./images/gotobutton_12px.png' style='margin-left:3px; border-style:none;' alt=\"Click to view site in new window\"  /></a></strong><br /><span class='locations'> "+location+"</span><p class='com_dis'>"+description+"</p></li>");
            
          
           var height = $("#" + id).find(".com_dis").height();
         //  alert("height is " + height);
        	//alert($(this).height());
        	
        	$("#" + id).find(".com_dis").attr("origlength", height);
				if (height > 70) {
					$("#" + id).find(".com_dis").css("height", "70px");
				} // end if height > 70
			
        } // end if selected == 1
        
        */  // END LEFT SIDE VIEWER
        
        
        
        // ATTACH LISTENERS TO "ELEMENT" - MAP MARKERS 
        
        // ELEMENT APPEARS TO BE THE MARKERS IN POLYMAPS
        //alert("theFeatures.element is " + theFeatures.element);
        
		//theFeatures.element.setAttribute('onmouseover', 'showDetail("' + category + '","' + description + '","' + location + '","' + id + '","' + title + '");');
		
		//theFeatures.element.setAttribute('onmouseover','alert("hi")');
		
		//theFeatures.element.setAttribute('onmouseout', 'hideDetail();');
		
		//theFeatures.element.onmousemove = detailFollow;
		
		
		
		// UNHIGHLIGHT ALL UNSELECTED MAP MARKERS
		
		//if (selected == 0) {
			// in all other circumstances, set attribute to unfocus
			//theFeatures.element.setAttribute('class', 'unfocus');
		//} else {
			//theFeatures.element.setAttribute('class', 'focus');
		//} // end if selected == 0
		
		
		
		
		// ALL COM_ID OLS IN TEXT DESCRIPTION AREA ARE GIVEN .AREA CLASS
    
   		 //alert("adding mousenter function with this at " + this);
   		
   		// LEFT SIDE AREA INSTANTIATES LEFT SIDE ROLLOVER FUNCTION
   		/*
   		
		$(".area").mouseenter(function (e) {
	  
	  		expandText(this.id);
			
		}); // end of mouseenter function 
		
		*/
	
    } // end of for loop
	
	return true;
	
	
};// end of load descriptions



function expandText(id){

			//alert("expandText running with this at " + this);
			
			
	  		//alert("expandText firing with id at " + id);
			
			
			var lastId = opened;
			
			// if the current one is not opened,
			if (opened != id) {
				//make the current one opened
				opened = id;
				// find out the original length
				var newh = $("#" + id).find(".com_dis").attr("origlength");
				// tween the height change to the size of the previously selected element
				
				// shrink all unselected
				$(".com_dis").animate({
					"height": $(this).attr("origlength")
				});
				
				// disable hyperactive last collapse
				/*
				$("#" + lastId).find(".com_dis").animate({
						//"height": $(this).attr("origlength")
						"height": '70px'
					});
				*/	
			
				
				// grow selected
				$("#" + id).find(".com_dis").animate({
					//"height": newh + "px"
					"height": (Math.round(newh) * 1.2) + "px" 
				});
				
				$.viewer.ol.animate({
					"top": 1000
				});
				
				// save this as opened
				opened = id;
				lastId = id;
							//console.log("here");
							//map.remove(xx);
						   // xx = po.geoJson().url("getGeo-egloffstein.php?q=com_id = '" + id + "'").on("load", load5);
							//map.add(xx);
			}// end if(opened != id)
			
	
}



function showDetail(category, description, location, id, title) {
    
	alert("showDetail firing with id at " + id);
    
    if (opened != id) {
        opened = id;
        
        //if (country != "") {
        //    $('#tooltip').html('<strong><img src="images/flags/' + country + '.gif"/> ' + title + '</strong><br /><span class="locations">' + location + '</span>');
       // } else {
           // $('#tooltip').html('<strong>' + location + '</strong>');
        	 $('#tooltip').html('<strong>' + title + '<br /><span class="locations">' + location + '</span></strong>');
       // }
        $('#tooltip').show();
        $('.viewer').animate({
            
scrollTop: "+=" + ($("#" + id).position().top - 120)
        }, 'fast', function () {
            
            $("#" + id).effect("highlight", {}, 3000);
            
            var newh = $("#" + id).find(".com_dis").attr("origlength");
            
            $(".com_dis").animate({
                "height": $(this).attr("origlength")
            });
            $("#" + id).find(".com_dis").animate({
                //"height": (newh+10) + "px"
                "height": (Math.round(newh) * (1.1)) + "px"
            });
        });
    }
    
}


function detailFollow(e) {
	alert("detailFollow firing with e at " + e);
    $('#tooltip').css({
		top: (e.pageY) + "px",
		left: (e.pageX + 15) + "px"
    });
}



function hideDetail() {
    $('#tooltip').hide();
    
}