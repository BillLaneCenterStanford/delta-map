	var mapName = "delta";

	var colors = new Array("black","red","blue","yellow");
	
	var map;
	
	var gsat;
			
	//var mapBounds = new OpenLayers.Bounds( -115.684814304, 34.7053207445, -108.296682969, 37.1025134863);// generated for ives
	
	
	
	
	var mapBounds = new OpenLayers.Bounds( -122.031757479, 37.6179689739, -121.131388272, 38.7919592092);// generated for delta 1937-39 aerial photography
  
	var mapMinZoom = 7;
	var mapMaxZoom = 14;

	// provisional, needs to come from json
	var itemArray = new Array();
	var chapterArray = new Array();

	//var 
	currentItem = setCurrentItem(0);

	function getCurrentItem(){
		// temp // console.log("getCurrentItem says currentItem is now " + currentItem);
		var theCurrentItem = currentItem;
		return theCurrentItem;
	}
	
	function setCurrentItem(newItemNum){
		if(newItemNum <= itemArray.length){
			currentItem = newItemNum;
		} else {
			// do nothing for now
		}
		
		
		// temp // console.log("setCurrentItem says currentItem is now " + currentItem);
		return currentItem;
	}


	// avoid pink tiles
	OpenLayers.IMAGE_RELOAD_ATTEMPTS = 3;
	OpenLayers.Util.onImageLoadErrorColor = "transparent";

	//// INIT

	function init(){
		var options = {
			controls: [],
			
			
			//restrictedExtent: mapBounds,
			
			projection: new OpenLayers.Projection("EPSG:900913"),
			//displayProjection: new OpenLayers.Projection("EPSG:900913"),
			displayProjection: new OpenLayers.Projection("EPSG:4326"), // works
			units: "m",
			maxResolution: 156543.0339,
			
			panMethod: OpenLayers.Easing.Quad.easeInOut,  // slooooooow
			panDuration: 100,
			
			maxExtent: new OpenLayers.Bounds(-20037508, -20037508, 20037508, 20037508.34)
			
			
			};
		map = new OpenLayers.Map('map', options);
	
		// STOCK MAP LAYERS
	
		// create Google Mercator layers
		
		/*var gter = new OpenLayers.Layer.Google("Google Terrain",
			{type: G_PHYSICAL_MAP, isBaseLayer: false, sphericalMercator: true, numZoomLevels: 20, 	transitionEffect:'resize'});
		

		
		//  gter.transitionEffect='resize';
		
		
		var gterInset = new OpenLayers.Layer.Google("Google Terrain",
			{type: G_PHYSICAL_MAP, sphericalMercator: false, numZoomLevels: 20 });// projection needs to be false to work in inset	
	
		*/
		
		/* v2 */
		/*var gsat =  new OpenLayers.Layer.Google("Google Satellite",
			{type: G_SATELLITE_MAP, isBaseLayer: false, sphericalMercator: true, numZoomLevels: 20, 	transitionEffect:'resize'});*/
			
		// v3	
		// https://developers.google.com/maps/documentation/javascript/v2tov3
		// http://dev.openlayers.org/examples/google.html
		/*var gsat =  new OpenLayers.Layer.Google(
                "Google Satellite",
                {type: google.maps.MapTypeId.SATELLITE, sphericalMercator: true, numZoomLevels: 22}
            )	*/
			
			
		// subbing out google 190125
				
                
                //var gsat =  new OpenLayers.Layer.OSM("Google Satellite","//tile.stamen.com/toner/{z}/{x}/{y}.{ext}toner-background/{z}/{x}/{y}.{ext}");
            		
			 //var gsat = new OpenLayers.Layer.OSM( "Google Satellite");
			 //var gsat = new OpenLayers.Layer.OSM( "Google Satellite");
			/*var gsat = new OpenLayers.Layer.Bing({
				name: "Google Satellite",
				type: "Aerial",
				key: "my-api-key-here",
			});*/
			var gsat = new OpenLayers.Layer.WMTS({
    name: "Google Satellite",
    url: "http://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/WMTS/1.0.0/WMTSCapabilities.xml",
    layer: "World_Imagery",
    style: "default",
    matrixSet: "default028mm"//"GoogleMapsCompatible"
});
		// temp disable 160808
		/*var gsat =    new OpenLayers.Layer.Google(
                "Google Satellite",
                {type: google.maps.MapTypeId.SATELLITE, numZoomLevels: 22}
            );*/
		
		
		
		// removed 140812 because API shut down
		/*var yahoosat = new OpenLayers.Layer.Yahoo("Yahoo Satellite", {'type': YAHOO_MAP_SAT, 'sphericalMercator': true});
		
		yahoosat.description = "Yahoo satellite map";
		yahoosat.menu = false;
		*/
	
		/*
		// YaHOO
		 // create Yahoo layer
		/*var yahoo = new OpenLayers.Layer.Yahoo("Yahoo Street",
			{'sphericalMercator': true});
		var yahoosat = new OpenLayers.Layer.Yahoo("Yahoo Satellite",
			{'type': YAHOO_MAP_SAT, 'sphericalMercator': true});
		var yahoohyb = new OpenLayers.Layer.Yahoo("Yahoo Hybrid",
			{'type': YAHOO_MAP_HYB, 'sphericalMercator': true});
		*/
		
		
		// create OSM/OAM layer
/*		var osm = new OpenLayers.Layer.TMS( "OpenStreetMap",
			"//tile.openstreetmap.org/",
			{ type: 'png', getURL: osm_getTileURL, displayOutsideMaxExtent: true, 
			  attribution: '<a href="//www.openstreetmap.org/">OpenStreetMap</a>'} );
*/			  
			  
	
	
	
	
	
		// CUSTOM TILES ////////////////////
		
		/*
		
		// create TMS Overlay layer
		var beckwithTiles = new OpenLayers.Layer.TMS( "Beckwith", "",
			{   // url: '', serviceVersion: '.', layername: '.',
				type: 'png', getURL: overlay_getTileURL_Beckwith, alpha: true, 
				isBaseLayer: false
			});
		if (OpenLayers.Util.alphaHack() == false) { 
		beckwithTiles.setOpacity(1); }
		
		*/
		
		
		
		// create Aerial Photos tile layer
		//var 
		aerial1937Tiles = new OpenLayers.Layer.TMS( "1937-39 aerial photography", "",
			{   // url: '', serviceVersion: '.', layername: '.',
				type: 'png', getURL: overlay_getTileURL_aerials, alpha: true, 
				isBaseLayer: false, transitionEffect:'resize'
			});
		if (OpenLayers.Util.alphaHack() == false) {
			aerial1937Tiles.setOpacity(1.0); 
		}
		
		
		aerial1937Tiles.description = "Aerial photos, from the U.S. Department of Agriculture, Western Division Laboratory";
		aerial1937Tiles.label = "Map: 1937-39 aerial photography";
		aerial1937Tiles.menu = true;
		aerial1937Tiles.thumbnail = "layer_thumb_aerial.gif";
				
		// create Topo Maps tile layer
		//var 
		topos1910Tiles = new OpenLayers.Layer.TMS( "1909-18 USGS topographic maps", "",
			{   // url: '', serviceVersion: '.', layername: '.',
				type: 'png', getURL: overlay_getTileURL_topos, alpha: true, 
				isBaseLayer: false, transitionEffect:'resize'
			});
		if (OpenLayers.Util.alphaHack() == false) {
			topos1910Tiles.setOpacity(1.0); 
		}
		
		topos1910Tiles.description = "U.S. Geological Survey Topographic Quadrangles";
		topos1910Tiles.label = "Map: 1909-18 USGS topographic maps";
		topos1910Tiles.menu = true;
		topos1910Tiles.thumbnail = "layer_thumb_topos.gif";
		
		
		// temp disable 160808
		/*
		// Create Acetate tile layer
		acetate = new OpenLayers.Layer.OSM("Acetate","//acetate.geoiq.com/tiles/acetate-bg/${z}/${x}/${y}.png");
	
		
		// Create Acetate tile layer
		acetateLabels = new OpenLayers.Layer.OSM("Acetate Labels","//acetate.geoiq.com/tiles/acetate-labels/${z}/${x}/${y}.png");
		acetateLabels.description = "";
		acetateLabels.menu = false;
		
		
		// Create Acetate tile layer
		acetateTerrain = new OpenLayers.Layer.OSM("Acetate Terrain","//acetate.geoiq.com/tiles/terrain/${z}/${x}/${y}.png");
		
		acetateTerrain.description = "";
		acetateTerrain.menu = false;
		*/
		
		// Create Acetate tile layer
		//acetateTerrain = new OpenLayers.Layer.OSM("Acetate Terrain","//stamen-tiles-{s}a.ssl.fastly.net/toner-background/{z}/{x}/{y}.{ext}toner-background/{z}/{x}/{y}.{ext}");
		
		acetateTerrain = new OpenLayers.Layer.OSM("Acetate Terrain");
		
		acetateTerrain.description = "";
		acetateTerrain.menu = false;
		
							
		// create Early 1800s habitatss layer
		//var 
		habitHistTiles = new OpenLayers.Layer.TMS( "Early 1800s habitats", "",
			{   // url: '', serviceVersion: '.', layername: '.',
				type: 'png', getURL: overlay_getTileURL_habitHist, alpha: true, 
				// temp disable 160808
				//isBaseLayer: false, transitionEffect:'resize'
				isBaseLayer: false, transitionEffect:'resize' // fixed it 190125
				
			});
		if (OpenLayers.Util.alphaHack() == false) {
			habitHistTiles.setOpacity(0.8); 
		}
		
		habitHistTiles.description = "Historic Delta habitat types, produced by SFEI-ASC)"; 
		habitHistTiles.label = "Map: Early 1800s Delta habitats, produced by SFEI-ASC";
		habitHistTiles.menu = true;
		habitHistTiles.thumbnail = "layer_thumb_habitHist.gif";
		habitHistTiles.legend = [
			{title:"Water",color:"#004da8"},
			{title:"Tidal Wetland",color:"#a3e1cc"},
			{title:"Non-Tidal Freshwater Wetland",color:"#89cd66"},
			{title:"Willow Thicket",color:"#9db88e"},
			{title:"Riparian Forest",color:"#898944"},
			{title:"Seasonal Wetland",color:"#e3ffab"},
			{title:"Dune Scrub",color:"#cba966"},
			{title:"Grassland",color:"#ffff73"},
			{title:"Oak Woodland",color:"#e7dac5"}
		]	
							
		// create Early 2000s habitatss layer
		//var 
		habitContTiles = new OpenLayers.Layer.TMS( "Early 2000s habitats", "",
			{   // url: '', serviceVersion: '.', layername: '.',
				type: 'png', getURL: overlay_getTileURL_habitCont, alpha: true, 
				isBaseLayer: false, transitionEffect:'resize'
			});
		if (OpenLayers.Util.alphaHack() == false) {
			habitContTiles.setOpacity(0.8); 
		}
		habitContTiles.description = "Modern vegetation and land use, from the California Department of Fish and Game";
		habitContTiles.label = "Map: Modern vegetation and land use, from the California Department of Fish and Game";
		habitContTiles.menu = true;
		habitContTiles.thumbnail = "layer_thumb_habitCont.gif";
		habitContTiles.legend = [
			{title:"Agriculture",color:"#decf96"},
			{title:"Urban",color:"#9c9c9c"},
			{title:"Water",color:"#004da8"},
			{title:"Freshwater Wetland",color:"#a3e1cc"},
			{title:"Willow Thicket",color:"#9db88e"},
			{title:"Riparian Forest",color:"#898944"},
			{title:"Seasonal Wetland",color:"#e3ffab"},
			{title:"Dune Scrub",color:"#cba966"},
			{title:"Grassland",color:"#ffff73"},
			{title:"Oak Woodland",color:"#e7dac5"}
		]
		
	
		// END CUSTOM TILES ////////////////////
		
		
		
		// KML LAYERS
		/*
		
		// loading pois from a kml instead of geojson
		
		var kml_test = new OpenLayers.Layer.Vector('MyKML', {
			 //strategies: [new OpenLayers.Strategy.Fixed(),new OpenLayers.Strategy.Cluster()],
			 strategies: [new OpenLayers.Strategy.Fixed()],
			 //strategies: [new OpenLayers.Strategy.Cluster({distance:2})],
			 //strategies: [new OpenLayers.Strategy.Cluster()],
			 //strategies: [new OpenLayers.Strategy.Cluster(42)],
			 
			 eventListeners: {
				'loadend': shoutItOut
			 },
			 
			 protocol: new OpenLayers.Protocol.HTTP({
				 url: "kml/ivesandbeckwithspots.kml",
				 format: new OpenLayers.Format.KML({
				 
			externalProjection: new OpenLayers.Projection("EPSG:4326"),
			internalProjection: new OpenLayers.Projection("EPSG:900913"),
					 extractStyles: false, 
					 extractAttributes: true,
					 maxDepth: 2
				  })
				})
		 })*/
		 
		 
		 /*
		 //var 
		 riversVector = new OpenLayers.Layer.Vector('River Labels', {
		 
			 strategies: [new OpenLayers.Strategy.Fixed()],
			 
			 transitionEffect: 'resize',
			 
			 protocol: new OpenLayers.Protocol.HTTP({
				 url: "kml/sac_sanjoaquin_wlabels.kml",
				 format: new OpenLayers.Format.KML({
				 
			externalProjection: new OpenLayers.Projection("EPSG:4326"),
			internalProjection: new OpenLayers.Projection("EPSG:900913"),
					 extractStyles: true, 
					 extractAttributes: true,
					 maxDepth: 2
				  })
				})
		 })
		 
		 
			riversVector.setOpacity(1); 
		 */
		 
		 
		 
		 
		
		/*}*/
		
		
		// END KML LAYER
		
		
		// GEOJSON LAYER
		
		/**/
		
	
		
		// data format
		var geoJsonFormat = new OpenLayers.Format.GeoJSON({
			externalProjection: new OpenLayers.Projection("EPSG:4326"),// works
			internalProjection: new OpenLayers.Projection("EPSG:900913")// works
			//internalProjection: new OpenLayers.Projection("EPSG:4326")
			
		});
		
		// load protocol
		var geoJsonProtocol = new OpenLayers.Protocol.HTTP({
			//url: 'ex5_data.json',
			//url: 'places.js',
			//url: 'getGeo.php?q=a.category%20!=%20"sample"',
			url: './js/delta-points.json',
			format: geoJsonFormat
		});
		
		// display strategy
		//var geoJsonStrategy = [new OpenLayers.Strategy.Fixed(),new OpenLayers.Strategy.Cluster(10)];
		var geoJsonStrategy = [new OpenLayers.Strategy.Fixed()];
		
		// layer instatiation (as global variable)
		geoJsonLayer = new OpenLayers.Layer.Vector('Points of Interest',{
			
			protocol : geoJsonProtocol,
			strategies: geoJsonStrategy
		
		});
		
			
		geoJsonLayer.description = "Locations mentioned in this report";
		geoJsonLayer.label = "Locations mentioned in this report";
		geoJsonLayer.menu = true;
		geoJsonLayer.thumbnail = "layer_thumb_points.gif";
	
		// event registration
		//geoJsonLayer.events.register("loadstart", geoJsonLayer, function() {
				//this.logEvent("Load Start");
				//alert("loadstart");
		//});
		
		geoJsonLayer.events.register("loadend", geoJsonLayer, function() {
		// this only loads if you're using geoJsonLayer
		
				
				
				// temp // console.log("going to set center now");
				//this.map.setCenter(new OpenLayers.LonLat(-12635346.521894,4241337.8248975));
				//this.logEvent("Load Start");
				//alert("geoJsonLayer says loadend");
				var loadEm = loadDescriptions(geoJsonLayer.features);
				
				
			/*	for(var q=0; q<=geoJsonLayer.features.length;q++){
					//itemArray.push(q);
					itemArray[q] = geoJsonLayer.features[q].attributes.category.toString();
					//itemArray.push(geoJsonLayer.features[q].attributes.category);
					// temp // console.log("pushing item number " + q + " to itemArray");
				}*/
				
				
				
				initLightbox();
				//moveTheMap(1,6);
				createGlobalNav();
				createNav();
				
				createLayerNav();
				
			// temp disable 160808	
			//gsat.setOpacity(0.8); 		 // added for readability

						
				//selectFeature(1,6);
				
				
				
		});
		
		
	
		// END GEOJSON
		
		
		
		
		// BEGIN STYLE
		
		var geoJsonLayerStyle = new OpenLayers.Style({
			'fillColor': '#e00404',//'#ff1111',
			'fillColor': '#fff',//'#ff1111',
			'fillOpacity': 0.4,
			'strokeColor':'#000000',
			'strokeWidth': '1.5px',
			'strokeOpacity': 0.9,
			'fontColor': '#000',
			'fontSize': '12px' ,
			'fontWeight':'bold',
			'fontFamily': 'Bitter,serif' ,
			'fontOpacity': '1.0' ,
			'slabel': '${orderNum}',
			'slabel': '${id}',
			'label': 'i',
			'labelAlign': 'cm',
			'labelYOffset': '0',
			//'graphicName' : 'circle',
			'graphicTitle': 'this is tooltip text',
			//'pointRadius': '6px',
			'pointRadius': '9px',
			//'pointRadius': '${point_radius)',
			'cursor' : 'pointer'
				
			},	
			{
				context: {
					num_points:function(feature){
						return feature.attributes.count;
					},
					point_radius:function(){
						return 9 + feature.attributes.count;
					}
				}
			
			
		});
		
		
		
		var geoJsonLayerStyleSelected = new OpenLayers.Style({
			'fillColor': '#e00404',
			'fillColor': '#000',
			'fillOpacity': 0.5,
			'strokeColor':'#fff',
			'strokeWidth': '2.0px',
			'strokeOpacity': 0.7,
			'fontColor': '#fff',
			'fontSize': '18px' ,
			'fontFamily': 'Bitter,serif' ,
			'fontOpacity': '1.0' ,
			'pointRadius': '10px',
			'pointRadius': '13px',
			'slabel': '${orderNum}',
			'slabel': '${id}',
			'label': 'i',
			'labelAlign': 'cm',
			'labelYOffset': '0'
			
		});
		
		var geoJsonLayerStyleHidden = new OpenLayers.Style({
		
			'fillOpacity': 0.5,
			'strokeOpacity':0.5,
			'pointRadius':'1px'
		
		}); // IE Has a problem with this line
		
		// apply styles
		var geoJsonLayerStyleMap = new OpenLayers.StyleMap({
			'default': geoJsonLayerStyle,
			'select': geoJsonLayerStyleSelected
			
		});
		
		/*
		
		// couldnt make this work
		
		var visibility_values = {
			1: true,
			2: false
		}
		
		
		var visibility_lookup = { 
			'true': {	
					pointRadius:5,
					fillOpacity: 1,
					'strokeOpacity': 1,
					'fontOpacity': 1
				   },
					
			'false': {
					pointRadius:1,
					'fillOpacity': 1,
					'strokeOpacity': 1,
					'fontOpacity': 1
				   }
		}
		*/
		var symbolizer_lookup = { 
			'spage': {fillOpacity:0, strokeOpacity:0, fontOpacity: 0, pointRadius:5, strokeWidth:2, label:''}, 
			'page': {display:'none'}, 
			'region': {fillOpacity:0,strokeOpacity:0,fontOpacity:0.7,fontSize:'13px',fontFamily:'Mako,sans-serif',fontColor:'#fff',
			'label': '${location}',cursor:'pointer'},
			'feature': {}// whatever it was defined in the style
		}
		
		
		geoJsonLayerStyleMap.addUniqueValueRules('default','category', symbolizer_lookup);		
		
		
		
		geoJsonLayer.styleMap = geoJsonLayerStyleMap;
		
		// END STYLE
		
	
		
		
		
		
		// ADD LAYERS
		
	
	   // map.addLayers([gmap, gsat, ghyb, gter, veroad, veaer, vehyb,
		 //              yahoo, yahoosat, yahoohyb, osm, oam,
		 //              tmsoverlay]);
			   
		// map.addLayers([gter, aerial1937Tiles,topos1910Tiles, habitHistTiles, waterHistTiles, habitContTiles]);   
		 
		 
		// map.addLayers([acetate,acetateTerrain, yahoosat,yahoo, yahoohyb, osm, gter, acetateLabels, aerial1937Tiles,topos1910Tiles, habitContTiles, habitHistTiles]);   
		 // temp disable 160808
		  //map.addLayers([acetateTerrain, gsat, habitHistTiles,topos1910Tiles,aerial1937Tiles,  habitContTiles,geoJsonLayer, acetateLabels]);   
		  // testing acetate substitute 171207
		//map.addLayers([acetateTerrain,habitHistTiles,topos1910Tiles,aerial1937Tiles,  habitContTiles,geoJsonLayer]); 
		
		// testing acetate substitute 171207 and adding gsat back
		map.addLayers([gsat,habitHistTiles,topos1910Tiles,aerial1937Tiles,  habitContTiles,geoJsonLayer]); 
		//map.addLayers([gsat,acetateTerrain,habitHistTiles,topos1910Tiles,aerial1937Tiles,  habitContTiles,geoJsonLayer]); 
		
		
		 // just testing!
		if (OpenLayers.Util.alphaHack() == false) {
			//gter.setOpacity(0.75); 
			habitHistTiles.setOpacity(0.6);
			//yahoosat.setOpacity(0);
		}
		
		/*acetate.setIsBaseLayer(true);
		acetateLabels.setIsBaseLayer(false);*/
		//habitHistTiles.setIsBaseLayer(true);
		
		// temp disable 160808
		//yahoosat.setIsBaseLayer(false);
		//gsat.setIsBaseLayer(false);// this breaks it if bottom layer
		//gsat.setIsBaseLayer(true);
		 
		 // END ADD LAYERS



		 
		 // not sure why this is still around
		//geoJsonLayer.addFeatures(geoJsonFormat.read(feature_data));
		//geoJsonLayer.addFeatures(geoJsonFormat.read(geoJsonProtocol));
		
		
	 	// CONTROLS
	 	
		
	// generic mouse navigation object
	 var myNavigationControl = new OpenLayers.Control.Navigation({
	 		//zoomWheelEnabled: false
	 	}
	 );	
	 	
	map.addControl(myNavigationControl);
	myNavigationControl.activate();
	myNavigationControl.disableZoomWheel();
	 // temp // console.log("disabling zoom wheel");
	 	
	 	// touch control for mobile
	 /*	var myTouchControl =  new OpenLayers.Control.TouchNavigation({
               dragPanOptions: {
                   enableKinetic: true
              }
        });
            
       */     
	 	
	 	// stock layer switcher control
		var switcherControl = new OpenLayers.Control.LayerSwitcher();
		
		// temp disable 160808
		// stock inset map control
		/*var overviewControl = new OpenLayers.Control.OverviewMap({
			size: new OpenLayers.Size(150,150),
			//layers: OpenLayers.Layer('osm')//,layers: ['osm','aerial1937Tiles']
			layers: [acetateLabels],//,layers: ['osm','aerial1937Tiles'],
			options: {
				//projection: new OpenLayers.Projection("EPSG:900913"),
				//displayProjection: new OpenLayers.Projection("EPSG:900913"),
				//units: "m"
			},
			autoPan: true,
			minRatio: 3,
			maxRatio: 6
		})*/
		
		
		 // from gis.ibbeck.de/ginfo/apps/OLExamples/OL26/examples/select-feature-with-function.html   
		
		// SELECT FEATURE CONTROL 
		ctrlSelectFeatures = new OpenLayers.Control.SelectFeature(
		
				geoJsonLayer,
		
				{
					clickout: true, toggle: false,
					multiple: false, hover: false,
					toggleKey: "ctrlKey", // ctrl key removes from selection
					multipleKey: "shiftKey" // shift key adds to selection
				}
		
		)
		
		
		
		function zoomMapIn(){
			var currentZoom = map.getZoom();
			var newZoom = currentZoom + 1;
			if(newZoom <= mapMaxZoom){
				//alert("zoomMapIn says zooming to "+ newZoom);
				map.zoomTo(newZoom);
			} else {
				//alert("zoomMapIn says limit reached");
			}
		}
		
				
		function zoomMapOut(){
			var currentZoom = map.getZoom();
			var newZoom = currentZoom - 1;
			if(newZoom >= mapMinZoom){
				//alert("zoomMapOut says zooming to "+ newZoom);
				map.zoomTo(newZoom);
			} else {
				//alert("zoomMapOut says limit reached");
			}
		}
		
		
		
		var zoomUpButton = new OpenLayers.Control.Button({
			trigger: zoomMapIn,
			displayClass: 'olControlZoomUpButton'
		});
		var zoomDownButton = new OpenLayers.Control.Button({
			trigger: zoomMapOut,
			displayClass: 'olControlZoomDownButton'
		});
		
		zoomDownControlPanel = new OpenLayers.Control.Panel({});
		zoomDownControlPanel.addControls(zoomDownButton);
		
		map.addControl(zoomDownControlPanel);
		zoomDownControlPanel.moveTo(new OpenLayers.Pixel(905,104));
		
		zoomUpControlPanel = new OpenLayers.Control.Panel({});
		zoomUpControlPanel.addControls(zoomUpButton);
			
		map.addControl(zoomUpControlPanel);
		zoomUpControlPanel.moveTo(new OpenLayers.Pixel(905,70));
		
		
		var scaleLineControl = new OpenLayers.Control.ScaleLine({});
		map.addControl(scaleLineControl);
		scaleLineControl.moveTo(new OpenLayers.Pixel(850,540));	
	
		//map.addControl(myTouchControl);
		//myTouchControl.activate();
			
		map.addControl(ctrlSelectFeatures);
		  ctrlSelectFeatures.activate();
		
		
		// add controls
		
	//	map.addControl(switcherControl); // generic switcher from OL
		//switcherControl.maximizeControl();
	
		// stock pan zoom bar	
//		map.addControl(new OpenLayers.Control.PanZoomBar());
		
		// mouse position tracker
		//map.addControl(new OpenLayers.Control.MousePosition());
		
		// DElta Disabled to prevent scroll wheel action
		// mouse action controls (click, dbl click etc)
		//map.addControl(new OpenLayers.Control.MouseDefaults());

		// enable keyboard commands - direction arrows etc
		map.addControl(new OpenLayers.Control.KeyboardDefaults());
		
		// stock graticule
		//map.addControl(new OpenLayers.Control.Graticule());
		
		
		//map.addControl(overviewControl);
				
		//overviewControl.maximizeControl();
		//switcherControl.minimizeControl();
		
		// scale (text only... need to work on this)
	   //map.addControl(new OpenLayers.Control.Scale());
		
		
		
						
		// BEGIN SELECTION CONTROLS
		
		// adds listeners for map point clicks
		var JsonSelectionControl = new OpenLayers.Control.SelectFeature(geoJsonLayer);
		
		// add to map (does this need to happen later?)
		map.addControl(JsonSelectionControl);
		// activate control
		
		JsonSelectionControl.activate();
		
		// END SELECTION CONTROLS
		
		
		
		
		
		
		
		// BEGIN RESULT DISPLAY 
		
		function onSelectFeature(myEvent){
		
		  var id = myEvent.feature.attributes.id;
		  // temp // console.log("onSelectFeature firing with id at " + id);
		
			var textBlock = $("#" + id).find(".com_dis");
			//alert("onSelectFeature firing with textBlock at " + textBlock);
			
			//expandText(id);
			
			// EXPAND TEXT AND SCROLL TO CURRENT ENTRY
			/*
			// move scroller text to active text
			 $('.viewer').animate({
	
				scrollTop: "+=" + ($("#" + id).position().top - 120)
					}, 'fast', function () {
						
						$("#" + id).effect("highlight", {}, 3000);
						
						var newh = $("#" + id).find(".com_dis").attr("origlength");
						
						
						
						$(".com_dis").animate({
							"height": $(this).attr("origlength")
						});
						$("#" + id).find(".com_dis").animate({
							//"height": newh + "px"
							"height": (Math.round(newh) * 1.1) + "px" 
						});
				});
			
			*/
			// END EXPAND TEXT
			
			// UPDATE NAVIGATION
			
			//updateNav(id);
			
			// END UPDATE NAV
			
			
			feature = myEvent.feature;
			
			// POPUP
			
			/*
			popup = new OpenLayers.Popup.FramedCloud("featurePopup",
				feature.geometry.getBounds().getCenterLonLat(),
				new OpenLayers.Size(170,120),
				"<div class=popupContainer><div class=popup><div class=popupContent><p class=popupTitle><a href='javascript:showLightbox(" + id + ");'>" + feature.attributes.title + "</a></p><div class=popupImage><p><a href='javascript:showLightbox(" + id + ");'><img src=./images/thumbnail_145x100.jpg border=0 width=145 height=100 /></a></p><p class=popupPrompt>Click to Enlarge</p></div></div></div></div>",
				null, false, onPopupClose);
				feature.popup = popup;
				popup.feature = feature;
				map.addPopup(popup);
				*/
			

			// move popup maker to new function?

				
			if(geoJsonLayer.features[id].attributes.category == "feature"){
				
				
				/*popup = new OpenLayers.Popup("thePopup",
				
					new OpenLayers.LonLat(feature.geometry.x,feature.geometry.y),
					new OpenLayers.Size(110,30),
					"<p>" + feature.attributes.title + "</p>"
				
				);
				
				
					feature.popup = popup;
					popup.feature = feature;
					map.addPopup(popup);	
				*/
				
				
				// framed cloud
				
				popup = new OpenLayers.Popup.FramedCloud("featurePopup",				
					new OpenLayers.LonLat(feature.geometry.x,feature.geometry.y),
					new OpenLayers.Size(110,0),
					"<div class=popupContainer><div class=popup><div class=popupContent><a href='javascript:changeItem(" + id + ")'><img src='" + geoJsonLayer.features[id].attributes.thumbnailImage  + "' width='50' height='50' border='1' align='left' style='margin-right:8px;' /></a><p class=popupPrompt>" + feature.attributes.location + "</p><p class='popupTitle'><a href='javascript:changeItem(" + id + ");'>" + feature.attributes.title + "</a><br /></p></div></div></div>",
					null, false, onPopupClose);
					feature.popup = popup;
					popup.feature = feature;
					map.addPopup(popup);	
					
					
			// don't draw popup window on click for regions, just go to page		
			} else if(geoJsonLayer.features[id].attributes.category == "region"){
				changeItem(id);
			
			}
				
				
			
			// END POPUP
			
		} // end onSelectFeature
		
		
		function onPopupClose(evt) {
			 // 'this' is the popup.
			 selectControl.unselect(this.feature);
		}
		
		
		function onUnselectFeature(myEvent){
			// store a reference to the element
			//var infoDiv = document.getElementById("test");
			
			// clear out the div
			//infoDiv.innerHTML = 'onUnselectFeature is running';
			
			
			feature = myEvent.feature;
			if (feature.popup) {
				popup.feature = null;
				map.removePopup(feature.popup);
				feature.popup.destroy();
				feature.popup = null;
			}
			
			
		}
		
		
		
		selectControl = new OpenLayers.Control.SelectFeature(geoJsonLayer);
	   
	   geoJsonLayer.events.register('featureselected', this, onSelectFeature);
	   geoJsonLayer.events.register('featureunselected',this, onUnselectFeature); 
		
	// END RESULT DISPLAY 
		
		// GET MAP READY TO GO
		
		// still undefined at this point
			//map.setCenter(new OpenLayers.LonLat(map.geoJsonLayer.features[0].geometry.x,map.geoJsonLayer.features[0].geometry.y));
		
		// disabled May 9. 2012
		// much better! but still too far out
		map.zoomToExtent( mapBounds.transform(map.displayProjection, map.projection ) ); // works

		
		//map.setCenter(map.getCenterLonLat().transform(map.displayProjection, map.projection ));
		
		
		//map.setCenter(new OpenLayers.LonLat(-122.33575,38.21445).transform(map.displayProjection, map.projection ));
		
		
		// works, but json layer disappears
		//map.setCenter(new OpenLayers.LonLat(-13624163.13205,4604872.3437927))
		
		// doesn't work - no tile layers
		//map.setCenter(new OpenLayers.LonLat(-121.02968, 38.16631).transform(map.displayProjection, map.projection));
		
		
		// doesn't work - blank screen
		//map.setCenter(new OpenLayers.LonLat(-121.02968, 38.16631));
		
		
		// doesn't work - blank screen
		//map.setCenter(new OpenLayers.LonLat(-13624163.13205,4604872.3437927).transform(map.displayProjection, map.projection ));
		
		
		map.setCenter(new OpenLayers.LonLat(-13613587.541754,4609673.4950251))
		map.zoomTo(9);
		
		
		
		//changeItem(0); // doesn't work yet
		
		//soloLayer(0); // hides all layers
		
			habitContTiles.setVisibility(false);
			// temp disable 160808
			//acetateLabels.setOpacity(0.6);
			//acetateLabels.setVisibility(true);
			topos1910Tiles.setVisibility(false);		
			aerial1937Tiles.setVisibility(false); 
			geoJsonLayer.setVisibility(false);
		
			//updateMapInfo(0);
			
		//this.map.setCenter(new OpenLayers.LonLat(newLatLng));
		
		
		//alert(map.getProjection());
		
	}

	// END OF INIT ////////////////////////////////





<!-- OPEN STREET MAPS TILES-->
function osm_getTileURL(bounds) {
	var res = this.map.getResolution();
	var x = Math.round((bounds.left - this.maxExtent.left) / (res * this.tileSize.w));
	var y = Math.round((this.maxExtent.top - bounds.top) / (res * this.tileSize.h));
	var z = this.map.getZoom();
	var limit = Math.pow(2, z);

	if (y < 0 || y >= limit) {
		// temp disable 160808
		//return null;//"//www.maptiler.org/img/none.png";
		return "./images/none.png";
	} else {
		x = ((x % limit) + limit) % limit;	              
	   return this.url + z + "/" + x + "/" + y + "." + this.type;

	}
}



/* <!-- TILES FOR OVERLAY BECKWITH-->*/

/*
function overlay_getTileURL_Beckwith(bounds) {
	var res = this.map.getResolution();
	var x = Math.round((bounds.left - this.maxExtent.left) / (res * this.tileSize.w));
	var y = Math.round((bounds.bottom - this.tileOrigin.lat) / (res * this.tileSize.h));
	var z = this.map.getZoom();
	if (this.map.baseLayer.name == 'Virtual Earth Roads' || this.map.baseLayer.name == 'Virtual Earth Aerial' || this.map.baseLayer.name == 'Virtual Earth Hybrid') {
	   z = z + 1;
	}
	if (mapBounds.intersectsBounds( bounds ) && z >= mapMinZoom && z <= mapMaxZoom ) {
	   //// temp // console.log( this.url + z + "/" + x + "/" + y + "." + this.type);
	   return this.url + "./tiles/beckwith-111202/" +  z + "/" + x + "/" + y + "." + this.type;
	} else {
	   return "./images/none.png";
	}
}	*/	



/* <!-- TILES FOR AERIALS 1937-->*/


function overlay_getTileURL_aerials(bounds) {
	var res = this.map.getResolution();
	var x = Math.round((bounds.left - this.maxExtent.left) / (res * this.tileSize.w));
	var y = Math.round((bounds.bottom - this.tileOrigin.lat) / (res * this.tileSize.h));
	var z = this.map.getZoom();
	if (this.map.baseLayer.name == 'Virtual Earth Roads' || this.map.baseLayer.name == 'Virtual Earth Aerial' || this.map.baseLayer.name == 'Virtual Earth Hybrid') {
	   z = z + 1;
	}
	if (mapBounds.intersectsBounds( bounds ) && z >= mapMinZoom && z <= mapMaxZoom ) {
	   //// temp // console.log( this.url + z + "/" + x + "/" + y + "." + this.type);
	   return this.url + "../tiles/delta_aerial_1937_120525_3000dpi/" + z + "/" + x + "/" + y + "." + this.type;
	} else {
	  
		// temp disable 160808
		//return null;// return "./images/none.png";
		
		return "./images/none.png";
	}
}		 




/* <!-- TILES FOR TOPOS 1910-->*/

function overlay_getTileURL_topos(bounds) {
	var res = this.map.getResolution();
	var x = Math.round((bounds.left - this.maxExtent.left) / (res * this.tileSize.w));
	var y = Math.round((bounds.bottom - this.tileOrigin.lat) / (res * this.tileSize.h));
	var z = this.map.getZoom();
	if (this.map.baseLayer.name == 'Virtual Earth Roads' || this.map.baseLayer.name == 'Virtual Earth Aerial' || this.map.baseLayer.name == 'Virtual Earth Hybrid') {
	   z = z + 1;
	}
	if (mapBounds.intersectsBounds( bounds ) && z >= mapMinZoom && z <= mapMaxZoom ) {
	   //// temp // console.log( this.url + z + "/" + x + "/" + y + "." + this.type);
	   return this.url + "../tiles/delta_layers_topo_3000dpi_tiles_2/" + z + "/" + x + "/" + y + "." + this.type;
	} else {
	   
		// temp disable 160808
		//return null;//return "./images/none.png";
		return "./images/none.png";
	}
}		



/* <!-- TILES FOR HISTORICAL WATER-->*/

function overlay_getTileURL_waterHist(bounds) {
	var res = this.map.getResolution();
	var x = Math.round((bounds.left - this.maxExtent.left) / (res * this.tileSize.w));
	var y = Math.round((bounds.bottom - this.tileOrigin.lat) / (res * this.tileSize.h));
	var z = this.map.getZoom();
	if (this.map.baseLayer.name == 'Virtual Earth Roads' || this.map.baseLayer.name == 'Virtual Earth Aerial' || this.map.baseLayer.name == 'Virtual Earth Hybrid') {
	   z = z + 1;
	}
	if (mapBounds.intersectsBounds( bounds ) && z >= mapMinZoom && z <= mapMaxZoom ) {
	   //// temp // console.log( this.url + z + "/" + x + "/" + y + "." + this.type);
	   return this.url + "../tiles/delta_water_historical_tiles/" + z + "/" + x + "/" + y + "." + this.type;
	} else {
		// temp disable 160808
		//return null;//	   return "./images/none.png";
		
		return "./images/none.png";
	}
	
}


/* <!-- TILES FOR Early 1800s habitatsS-->*/

function overlay_getTileURL_habitHist(bounds) {
	var res = this.map.getResolution();
	var x = Math.round((bounds.left - this.maxExtent.left) / (res * this.tileSize.w));
	var y = Math.round((bounds.bottom - this.tileOrigin.lat) / (res * this.tileSize.h));
	var z = this.map.getZoom();
	if (this.map.baseLayer.name == 'Virtual Earth Roads' || this.map.baseLayer.name == 'Virtual Earth Aerial' || this.map.baseLayer.name == 'Virtual Earth Hybrid') {
	   z = z + 1;
	}
	if (mapBounds.intersectsBounds( bounds ) && z >= mapMinZoom && z <= mapMaxZoom ) {
	   //// temp // console.log( this.url + z + "/" + x + "/" + y + "." + this.type);
	   return this.url + "../tiles/historic_habitats_3000dpi_120513c/" + z + "/" + x + "/" + y + "." + this.type;
	} else {
		// temp disable 160808
		//return null;//return "./images/none.png";
		
		return "./images/none.png";
	}
}		 

	
/* <!-- TILES FOR Early 2000s habitatsS-->*/

function overlay_getTileURL_habitCont(bounds) {
	var res = this.map.getResolution();
	var x = Math.round((bounds.left - this.maxExtent.left) / (res * this.tileSize.w));
	var y = Math.round((bounds.bottom - this.tileOrigin.lat) / (res * this.tileSize.h));
	var z = this.map.getZoom();
	if (this.map.baseLayer.name == 'Virtual Earth Roads' || this.map.baseLayer.name == 'Virtual Earth Aerial' || this.map.baseLayer.name == 'Virtual Earth Hybrid') {
	   z = z + 1;
	}
	if (mapBounds.intersectsBounds( bounds ) && z >= mapMinZoom && z <= mapMaxZoom ) {
	   //// temp // console.log( this.url + z + "/" + x + "/" + y + "." + this.type);
	   return this.url + "../tiles/habitats_modern_3000dpi_120524/" + z + "/" + x + "/" + y + "." + this.type;
	} else {
		// temp disable 160808
		//return null;//return "./images/none.png";
		
		return "./images/none.png";
	}
	
}




  
	// EXTERNAL CONTROL
	
		function toggleLayer(layerNum){
			//console.log("toggleLayer running with layerNum at " + layerNum);
			//console.log("toggleLayer running with layerNum at " + layerNum);
			
			var layerNavDiv = document.getElementById("layer" + layerNum);
						
			if(map.layers[layerNum].getVisibility() == 1 || map.layers[layerNum].getVisibility() == true){
				hideLayer(layerNum);
				layerNavDiv.setAttribute("class","layerNavItem layerNavItemOff");
			} else {
				showLayer(layerNum);
				layerNavDiv.setAttribute("class","layerNavItem layerNavItemOn");
				
				
			
			}
			
			
			
		}
	
		
		function showLayer(layerNum){
		
			console.log("showLayer running with layerNum at " + layerNum);
			map.layers[layerNum].setVisibility(1);
			map.layers[layerNum].setOpacity(1);
			
			if(layerNum == 2 || layerNum == 5){
				showLegend(layerNum);
			}
		
		}
		
				
		function hideLayer(layerNum){
		
			console.log("hideLayer running with layerNum at " + layerNum);
			map.layers[layerNum].setVisibility(0);
		
		
			if(layerNum == 2 || layerNum == 5){
				hideLegend(layerNum);
			}
		
		}
		
		
		
		function soloLayer(itemNum){
		
			console.log("solo layer running with itemNum  at " + itemNum)
			
			
			
			
			
			// hide all layers
			for(var layerCounter = 0; layerCounter < map.layers.length; layerCounter++){
			
				console.log("solo layer says map.layers[" + layerCounter + "].name is " + map.layers[layerCounter].name)
			
			
				//if(map.layers[layerCounter].name != "Acetate Terrain"){
				// 190125 this fixed disappearing base layer problem
				if(map.layers[layerCounter].name != "Google Satellite" && map.layers[layerCounter].name != "Acetate Terrain"){
				
					
					/*if(map.layers[layerCounter].name == targetLayer){
						map.layers[layerCounter].setVisibility(1);
						// temp // console.log("soloLayer showing " + map.layers[layerCounter].toString());
					} else {*/
						map.layers[layerCounter].setVisibility(0);
						//// temp // console.log("soloLayer hiding " + map.layers[layerCounter]);
					//}
				}/**/
			} // end loop
			
			// show layers
			
			/**/
			for (var arrayCounter = 0; arrayCounter < geoJsonLayer.features[itemNum].attributes.layers.length; arrayCounter++){
				//// temp // console.log("looping through layers with layer name at " + geoJsonLayer.features[itemNum].attributes.layers[arrayCounter].name);
				
				var showLayerTemp = geoJsonLayer.features[itemNum].attributes.layers[arrayCounter].name;
				
				var showAlphaTemp = geoJsonLayer.features[itemNum].attributes.layers[arrayCounter].opacity;
				
				for(var showCounter=0; showCounter < map.layers.length; showCounter++){
					if(map.layers[showCounter].name == showLayerTemp){
						map.layers[showCounter].setVisibility(showAlphaTemp);
						//// temp // console.log("soloLayer showing " + map.layers[showCounter].toString());
					}
				}
				
			}
			
			
			
		}
	
	
	
	function moveTheMap(orderNum,zoomLevel){
	
		// alert("moveTheMap running with zoomLevel at " + zoomLevel);
		
		// temp // console.log("moveTheMap running with ordernum at " + orderNum + " and zoomLevel at " + zoomLevel);
		
		var map = document.getElementById("map");  
		
		if(zoomLevel == undefined){
			var zoomLevel = this.map.getZoom(); 
		}
		
		// was ordernum-1 in ives
		//var theNewLatLng = new OpenLayers.LonLat(this.geoJsonLayer.features[orderNum-1].geometry.x,this.geoJsonLayer.features[orderNum-1].geometry.y);
		
		//var theNewLatLng = new OpenLayers.LonLat();
		
		//// temp // console.log("moveTheMap says that viewCenter is " + geoJsonLayer.features[orderNum].attributes.viewCenter);
		
		/*
		if(geoJsonLayer.features[orderNum].attributes.category=="feature"){
			theNewLatLng = new OpenLayers.LonLat(geoJsonLayer.features[orderNum].attributes.viewCenter);
		} else*/ if(geoJsonLayer.features[orderNum].attributes.category!="geoff"){
			//var myNewLatLng = new OpenLayers.LonLat(geoJsonLayer.features[orderNum].attributes.viewCenter[0],geoJsonLayer.features[orderNum].attributes.viewCenter[1]).transform(map.displayProjection, map.projection);
			
			
			//this.map.setCenter(new OpenLayers.LonLat(geoJsonLayer.features[orderNum].attributes.viewCenter[0],geoJsonLayer.features[orderNum].attributes.viewCenter[1]).transform(new OpenLayers.Projection("EPSG:4326"), new OpenLayers.Projection("EPSG:900913")));
			
			
			
			this.map.panTo(new OpenLayers.LonLat(geoJsonLayer.features[orderNum].attributes.viewCenter[0],geoJsonLayer.features[orderNum].attributes.viewCenter[1]).transform(new OpenLayers.Projection("EPSG:4326"), new OpenLayers.Projection("EPSG:900913")));
			
			
			this.map.zoomTo(zoomLevel);
			//// temp // console.log("moving to " + myNewLatLng);
			//this.map.panTo(myNewLatLng);
			
			// highlight the dot if it's a 
			if(geoJsonLayer.features[orderNum].attributes.category == "feature"){
				highlightFeature(orderNum);
			}
			
			
			
		} else {
			var theNewLatLng = new OpenLayers.LonLat(this.geoJsonLayer.features[orderNum].geometry.x,this.geoJsonLayer.features[orderNum].geometry.y);
			
			
			// temp // console.log("moving to " + theNewLatLng);
			this.map.panTo(theNewLatLng);
			this.map.zoomTo(zoomLevel);
		}
		
		// change this to VISIBLE CENTER? ONLY IF PAGE?
		
		
		//this.map.panTo(theNewLatLng);
		//this.map.zoomTo(zoomLevel);
				
		// delta
		showLightbox(orderNum);
	
	}
	
	function toggleMapEra(targetEra){
		//alert("toggleMapEra firing with targetEra at " + targetEra);
		if(targetEra == "cont"){
			document.getElementById("mapToggleHist").checked = false;
			document.getElementById("mapToggleCont").checked = true;
			featuresToContemporary();
		} else {
			document.getElementById("mapToggleHist").checked = true;
			document.getElementById("mapToggleCont").checked = false;
			featuresToHistorical();
		}
	}	
	
		
		
			function changeImage(imageNum){
				var image1800Array = new Array(
				
				
					'delta_historical_120512_01_all.png',	
					'delta_historical_120512_01_all_off2.png',
					'delta_historical_120512_01_all_off2.png',
					'delta_historical_120512_01_water.png',
					'delta_historical_120512_01_wet.png',
					'delta_historical_120512_01_wil.png',
					'delta_historical_120512_01_rip.png',
					'delta_historical_120512_01_seas.png',
					'delta_historical_120512_01_sand.png',
					'delta_historical_120512_01_grass.png',
					'delta_historical_120512_01_sav.png'
				);
				
				
				var image2000Array = new Array(
					'delta_combined_120512_01_mod_all.png',	
					'delta_combined_120512_01_mod_ag.png',
					'delta_combined_120512_01_mod_urb.png',
					'delta_combined_120512_01_mod_wat.png',
					'delta_combined_120512_01_mod_wet.png',
					'delta_combined_120512_01_mod_wil.png',
					'delta_combined_120512_01_mod_rip.png',
					'delta_combined_120512_01_mod_seas.png',
					'delta_combined_120512_01_mod_dunes.png',
					'delta_combined_120512_01_mod_grass.png',
					'delta_combined_120512_01_mod_sav.png'
				);	
				
				var target1800 = document.getElementById('layers_1800');
				var target2000 = document.getElementById('layers_2000');
				
				target1800.src = 'images/layers/' + image1800Array[imageNum];
				target2000.src = 'images/layers/' + image2000Array[imageNum];
				
				
				for(var i=0;i<image2000Array.length;i++){
					
					var legendItemTemp = document.getElementById("legendItem" + i);
					if(i == imageNum){
						if(i == 0){											legendItemTemp.setAttribute("class","legendItemOff");
						} else {
							legendItemTemp.setAttribute("class","legendItemOn");
						}
					} else {
						legendItemTemp.setAttribute("class","legendItemOff");
					}
				}
				
				
				
			}
			
			
			function initImageSwap(){
			
				var mapLegend = [
				
					{title:"Show All",color:"#fff"},
					{title:"Agriculture",color:"#decf96"},
					{title:"Urban",color:"#9c9c9c"},
					{title:"Water",color:"#004da8"},
					{title:"Freshwater Wetland",color:"#a3e1cc"},
					{title:"Willow Thicket",color:"#9db88e"},
					{title:"Riparian Forest",color:"#898944"},
					{title:"Seasonal Wetland",color:"#e3ffab"},
					{title:"Dune Scrub",color:"#cba966"},
					{title:"Grassland",color:"#ffff73"},
					{title:"Oak Woodland",color:"#e7dac5"}
				];
				
				var legendTextDiv = document.getElementById("legendText");
					
				legendTextDiv.innerHTML = "";
					
				for (var i=0;i<mapLegend.length;i++){
						legendTextDiv.innerHTML += "<div style='padding:5px;' id=legendItem" + i  + " class='legendItemOff'><div style='width:30px;height:15px;float:left;margin-right:8px;background:" + mapLegend[i].color + "';><a href='javascript:changeImage(" + i +");'><img src='images/clearpixel.png' width='30' height='15' border='0' /></div><div>" + mapLegend[i].title + "</a></div></div>";
					
				}
				
			
			
			}
			
			
			
			
			
	
	function featuresToHistorical(){
		
		//alert('featuresToHistorical running with features length at ' + geoJsonLayer.features.length);
		
		/*for(var i=0; i< this.geoJsonLayer.features.length; i++){
			//alert('featuresToHistorical is looping through ' + i);
			geoJsonLayer.features[i].geometry.x = geoJsonLayer.features[i].attributes.lonHistMerc;
			geoJsonLayer.features[i].geometry.y = geoJsonLayer.features[i].attributes.latHistMerc;
		}*/
		
		
		
		this.geoJsonLayer.redraw();
		
		//beckwithTiles.display(true);
		aerial1937Tiles.setOpacity(1);
		//this.map.zoomTo(10);
	}
	
	function featuresToContemporary(){
		
		//alert('featuresToContemporary running with features length at ' + geoJsonLayer.features.length);
		/*
		for(var i=0; i< this.geoJsonLayer.features.length; i++){
			//alert('featuresToContemporary is looping through ' + i);
			geoJsonLayer.features[i].geometry.x = geoJsonLayer.features[i].attributes.lonContMerc;
			geoJsonLayer.features[i].geometry.y = geoJsonLayer.features[i].attributes.latContMerc;
		}*/
		
		this.geoJsonLayer.redraw();
		//this.map.zoomTo(10);
		aerial1937Tiles.setOpacity(0);
		ivesRoute.setOpacity(0);
		deltaHistoricalVector.setOpacity(0.4);
		map.removePopup(feature.popup);
		
		
		
		//beckwithTiles.display(false);
		
	}
	
	
	function selectFeature(featureNum){
	
	//	alert("selectFeature running with featureNum at " + featureNum);
	
		// temp // console.log("selectFeature running with featureNum at " + featureNum);
	
		for(var i=0; i< geoJsonLayer.features.length; i++){
			this.ctrlSelectFeatures.unselect(geoJsonLayer.features[i]);
			//alert(i);
		}
		// ives was featureNum-1	
		//this.ctrlSelectFeatures.select(geoJsonLayer.features[featureNum-1]);	
		// trying featureNum
		this.ctrlSelectFeatures.select(geoJsonLayer.features[featureNum]);

	}
	
	function unSelectAll(){
	// temp // console.log("unSelectAll running");
		for(var i=0; i< geoJsonLayer.features.length; i++){
			this.ctrlSelectFeatures.unselect(geoJsonLayer.features[i]);
			//alert(i);
		}
	
	
	};


	function highlightFeature(featureNum){
	
		for(var i=0; i< geoJsonLayer.features.length; i++){
			this.ctrlSelectFeatures.unhighlight(geoJsonLayer.features[i]);
			//alert(i);
		}
		this.ctrlSelectFeatures.highlight(geoJsonLayer.features[featureNum]);
	
	}
	
	function unHighlightAllFeatures(){
		for(var i=0; i< geoJsonLayer.features.length; i++){
			this.ctrlSelectFeatures.unhighlight(geoJsonLayer.features[i]);
			//alert(i);
		}
	
	}
	
	// END EXTERNAL CONTROL

function createGlobalNav(){

	// temp // console.log("createGlobalNav running");
	var globalNavDiv = document.getElementById("globalNav");
	//var gNavMenu = document.getElementById("frontMenu");
	
	gNavItemArray = new Array();
	
	for(var i=0; i< (this.geoJsonLayer.features.length); i++){
		// add a major step to nav based on json content
			// temp // console.log("createGlobalNav looping through " + i);
		if(geoJsonLayer.features[i].attributes.chapter == true){
			// temp // console.log("createGlobalNav says " + i + " is a chapter");
			chapterArray.push(i);
			
			// if home page link
			if(i == 0){
				// render as home page title
				globalNavDiv.innerHTML += "<div class='globalNavItem globalNavItemHome' style='display: inline; float:left;'><a href='javascript:changeItem(" + i + ");'>Home</a></div>";
				
			} else {
				// render title of section with link 
				globalNavDiv.innerHTML += "<div class='globalNavItem globalNavItemOff' style='display: inline; float:left;'><a href='javascript:changeItem(" + i + ");'>" + geoJsonLayer.features[i].attributes.title + "</a></div>";
			
			
			}
			
		} else {
			// temp // console.log("createGlobalNav says " + i + " is not a chapter");
		}
		//gNavItemArray.push(geoJsonLayer.features

	
	}
	
	// temp // console.log("createGlobalNav finished with chapterArray at " + chapterArray);
	
	// add a bookend for calculating place
	chapterArray.push(10000);
	
	
}
	
function createLayerNav(){
	
	//console.log("createLayerNav running");

	var layerNavDiv = document.getElementById("layerNav");

	layerNavDiv.innerHTML = "<p class='chapterHed'>Layer Navigation</p><p style='font-family:Bitter,serif;font-size:10px;color:#efefef;'>Click on a layer to show or hide it</p>";
	
	// loop through layers
	
	
	 for(var i = map.layers.length - 1; i > 0; i--){
		//console.log("createLayerNav looping through " + i);
		
		// if ok to add to menu
		if(map.layers[i].menu == true){
			//console.log("adding menu item " + map.layers[i].name);
			
			var layerNavClass = "layerNavItemOff";
			
			if(map.layers[i].getVisibility() == 1){
				layerNavClass= "layerNavItemOn";
			}
			
			layerNavDiv.innerHTML += "<div id='layer" + i + "' style='' class='layerNavItem " + layerNavClass  + "'><a href='javascript:toggleLayer("+ i + ")'>" + map.layers[i].name + "</div>";			
		}
		
		
	}
	
	
	layerNavDiv.setAttribute("style","visibility:hidden");
	
}




function updateLayerNav(){

	var layerNavDiv = document.getElementById("layerNav");
	
	layerNavDiv.innerHTML = "<p class='chapterHed' style='margin-bottom:5px;color:#ccc;'>Map Layers: Click to Show and Hide</p><!--<p style='font-family:Bitter,serif;font-size:10px;color:#efefef;'>Click on a layer to show or hide it</p>-->";
	
	// loop through layers
	
	 //for(var i=0; i< map.layers.length; i++){
	 for(var i = map.layers.length-1; i > 0; i--){
		//console.log("updateLayerNav looping through " + i);
		
		// if ok to add to menu
		if(map.layers[i].menu == true){
			//console.log("adding menu item " + map.layers[i].name);
			
			var layerNavClass = "layerNavItemOn";
			
			if(map.layers[i].getVisibility() == 0 || map.layers[i].getVisibility() == false){
				layerNavClass= "layerNavItemOff";
			}
			
			var legendLinkTemp = "";
					
			if(i == 2 || i == 5){
				legendLinkTemp = "  (<a href='javascript:showLegend(" + i + ")'><strong>Legend</strong></a>)";
			}

			
			layerNavDiv.innerHTML += "<div id='layer" + i + "' style='' class='layerNavItem " + layerNavClass  + "'><a href='javascript:toggleLayer("+ i + ")'><img src='images/thumbnails/" + map.layers[i].thumbnail + "' width='40' height='40' style='border:1px solid #ccc; float:left; margin-right:7px;' />" + map.layers[i].name + "</a><p style='font-family:Mako, sans-serif;font-size:10px;color:#ccc; margin-top:0px;margin-bottom:-3px;'>" + map.layers[i].description + legendLinkTemp + "</p></div><br />";			
		}
		
		
	}

}





function showLayerNav(){
	//console.log("showing layer nav");
	var layerNavDiv = document.getElementById("layerNav");
	layerNavDiv.setAttribute("style","visibility:visible;");
	updateLayerNav();

}
function hideLayerNav(){
	//console.log("hiding layer nav");
	var layerNavDiv = document.getElementById("layerNav");
	layerNavDiv.setAttribute("style","visibility:hidden;");

}
		
function showLegend(layerNum){

var legendDiv = document.getElementById("mapLegend");

legendDiv.setAttribute("style","max-width:180px;min-width:100px;min-height:100px;background:#fff;border:1px solid #666; visibility:visible;position:absolute;padding-left:12px;padding:7px;top:140px;left:" +geoJsonLayer.features[getCurrentItem()].attributes.lightboxWidth  + "px;'");

//console.log("showLegend says x should be " + geoJsonLayer.features[getCurrentItem()].attributes.lightboxWidth);

legendDiv.innerHTML = "<div class='legendClose' onClick='javascript:hideLegend();'></div><p class='chapterHed'>Legend</p><p style='font-family:Bitter,serif;font-weight:bold;font-size:14px;'>" + map.layers[layerNum].name + "</p>";

	if(map.layers[layerNum].legend != undefined){
		for(var i=0;i<map.layers[layerNum].legend.length;i++){
			legendDiv.innerHTML += "<div style='padding:5px;' id=legendItem" + i  + " class='legendItemOff'><div style='width:20px;height:15px;float:left;margin-right:8px;background:" + map.layers[layerNum].legend[i].color + "';><img src='images/clearpixel.png' width='30' height='15' border='0' /></div><div style='font-family:Mako, sans-serif;font-size:11px;'>" + map.layers[layerNum].legend[i].title + "</a></div></div>";
		}
	}
	
	legendDiv.innerHTML += "<p style='font-family:Mako, sans-serif;font-size:10px;'>" +  map.layers[layerNum].description +"</p>";


}

function hideLegend(){
		
	var legendDiv = document.getElementById("mapLegend");
	legendDiv.innerHTML="";
	legendDiv.setAttribute("style","visibility:hidden; width:0px; height:0px;");
		
}

function showCredits(){
	showLightbox(22);

}

function showSources(){
	showLightbox(23);

}




function createNav(){

	// temp // console.log("createNav running");

	 var map = document.getElementById("map");  
	
	 var navDiv = document.getElementById('photoNavButtons');
	 
	 navArray = new Array();
	 
	 var navClassTemp = "navOff";// so the first one gets on
	
	navDiv.innerHTML = "<div id='photoNavTitle' style='display:inline;position:relative;float:left;font-family:Arial, sans-serif;font-size:11px;color:#c6c6c6;height:20px;padding-top:8px;padding-left:5px;padding-right:5px;text-align:left;text-decoration:none;'>PAGES</div>";	
	
	
	// make it loop an extra time to account for intro button
	//(length+1)
	 for(var i=0; i< (this.geoJsonLayer.features.length); i++){
	 // temp // console.log("createNav creating button with i at " + i + " and id at navButton0" + (i));
		
		// not really using this any more
		/*
		var prefZoomTemp;
	
		prefZoomTemp = this.map.getZoom(); // temporary placeholder
		
	 	if(geoJsonLayer.features[i] != undefined){
	 		prefZoomTemp = geoJsonLayer.features[i].attributes.prefZoom;
	 	}
	 	*/
	 	// includes intro button valued at zero now
	 	
	 	if(geoJsonLayer.features[i].attributes.chapter == true){
	 	
	 		var navToggleTemp = "navOff";
	 		var navDividerTemp = "<div style='display:inline;float:left;width:2px;border:0px none;height:42px;background:#363636;margin-top:-7px;margin-left:3px;margin-right:3px;'><img src='images/clearpixel.png' width='1' height='20' /><!--HERE--></div>";
	 		
			if(i == 0){
				navDividerTemp = "";
				navToggleTemp = "navOn";
			}
	 		
	 		navDiv.innerHTML += navDividerTemp + "<div id='navButton0" + (i) + "' class=\"photoNavBtn " + navToggleTemp + "\" onClick=\"javascript:changeItem(" + (i) + ");\"><div style='display:inline;position:absolute;font-family:Mako, Arial, sans-serif;font-size:11px;color:#ccc;left:0px, top:0px;width:20px;height:20px;padding-top:2px;text-align:center;'>" + (i+1) + "</div>" + "</div>";
	 	
	 	} else {
			if(i == 0){
				// so you can make home button behave differently
				// later delta, shows lightbox on all nav clicks
						// later delta, shows lightbox on all nav clicks
				navDiv.innerHTML += "<div id='navButton0" + (i) + "' class=\"photoNavBtn navOn\" onClick=\"javascript:changeItem(" + (i) + ");\"><div style='display:inline;position:absolute;font-family:Mako, Arial, sans-serif;font-size:11px;color:#ccc;left:0px, top:0px;width:20px;height:20px;padding-top:2px;text-align:center;'>" + (i+1) + "</div>" + "</div>";
			
			} else {
				
					// later delta, shows lightbox on all nav clicks
				navDiv.innerHTML += "<div id='navButton0" + (i) + "' class=\"photoNavBtn " + navClassTemp + "\" onClick=\"javascript:changeItem(" + (i) + ");\"><div style='display:inline;position:absolute;font-family:Mako, Arial, sans-serif;font-size:11px;color:#ccc;left:0px, top:0px;width:20px;height:20px;padding-top:2px;text-align:center;'>" + (i+1) + "</div>" + "</div>"
				// THIs IS THE ONLY PLACE WHERE I RAISE I TO A HIGHER NUMBER FOR DISPLAY 
			
			}
	 	
	 	}
	 	
	 	
	 	
	 	navClassTemp = "navOff";// so the rest get turned off
	 
	 }
	
	 	updateNextAndBackButtons();

}

function updateNextAndBackButtons(){

	// temp // console.log("updateNextAndBackButtons");
	
		var myBackDiv = document.getElementById('backButtonLarge');
		var myNavDiv = document.getElementById('nextButtonSmall');
		var myNextDiv = document.getElementById('nextButtonLarge');
		
		
	// if we're past the first one, turn on the back button
	if(currentItem > 0){
		myBackDiv.innerHTML = "<div id='backButtonLarge' class='backButtonSmall'><a href='javascript:selectPreviousItem();'><img src=images/clearpixel.png width=30 height=41 border=0 alt=Previous Page></a></div>";
	} else if(currentItem == 0){
		myBackDiv.innerHTML = "<div id='backButtonLarge'></div>";
	
	}

	// if we are two away or more from length of array, turn on next buttons
	if(currentItem + 1 < itemArray.length){
	
		/*myNavDiv.innerHTML = "<div id='nextButtonSmall'><a href='javascript:selectNextItem()' style='display:inline;position:relative;font-family:Arial, sans-serif;font-size:12px;color:#ccc;width:20px;height:20px;padding-top:3px;padding-left:5px;text-align:center;text-decoration:none;'>NEXT &raquo;</a></p>";*/
	
		myNextDiv.innerHTML = "<div id='nextButtonLarge'  class='nextButtonSmall'><a href='javascript:selectNextItem();'><img src=images/clearpixel.png width=30 height=41 border=0 alt=Next Page></a></div>";
	} else {
	
		/*myNavDiv.innerHTML = "<div id='nextButtonSmall' style='display:inline;position:relative;font-family:Arial, sans-serif;font-size:12px;color:#363636;width:20px;height:20px;padding-top:3px;padding-left:5px;text-align:center;'>NEXT &raquo;</p>";*/
	
		myNextDiv.innerHTML = "<div id='nextButtonLarge'  class='nextButtonSmall'></div>";
	
	}

	

}

function backToDeltaMap(){
	changeItem(3);
}

function backToNorthDeltaMap(){
	changeItem(4);
}

function backToCentralDeltaMap(){
	changeItem(9);
}

function backToSouthDeltaMap(){
	changeItem(14);
}



function setZoomVisibility(idNum){
	// temp // console.log("setZoomVisibility running with idNum at " + idNum);
	
	
		// so map zooms according to needs
		// maybe trap for page vs. feature?
	
		var zoomVisibilityTemp;
	
		zoomVisibilityTemp = true; // temporary placeholder
			 	
	 	if(geoJsonLayer.features[idNum] != undefined){
	 		zoomVisibilityTemp = geoJsonLayer.features[idNum].attributes.showZoomControl;
	 		
	 		if(zoomVisibilityTemp == false){
	 		
				zoomDownControlPanel.moveTo(new OpenLayers.Pixel(1905,104));
				zoomUpControlPanel.moveTo(new OpenLayers.Pixel(1905,70));
	 		
	 		} else {
	 	
				zoomDownControlPanel.moveTo(new OpenLayers.Pixel(905,104));
				zoomUpControlPanel.moveTo(new OpenLayers.Pixel(905,70));	
	 		}
	 		
	 	}
	 	
	 	// temp // console.log("setZoomVisibility says zoomVisibilityTemp is " + zoomVisibilityTemp);
	 	
	 	return zoomVisibilityTemp;

}

function getPrefZoom(idNum){
	// temp // console.log("getPrefZoom running with idNum at " + idNum);
	
	
		// so map zooms according to needs
		// maybe trap for page vs. feature?
	
		var prefZoomTemp;
	
		prefZoomTemp = this.map.getZoom(); // temporary placeholder
			 	
	 	if(geoJsonLayer.features[idNum] != undefined){
	 		prefZoomTemp = geoJsonLayer.features[idNum].attributes.prefZoom;
	 	}
	 	
	 	// temp // console.log("getPrefZoom says prefZoomTemp is " + prefZoomTemp);
	 	
	 	return prefZoomTemp;

}

function changeItem(newItemNum){
	 console.log("changeItem running with newItemNum at " + newItemNum);
		
		// so map zooms according to needs
		// maybe trap for page vs. feature?
		/*var prefZoomTemp;
	
		prefZoomTemp = this.map.getZoom(); // temporary placeholder
			 	
	 	if(geoJsonLayer.features[newItemNum] != undefined){
	 		prefZoomTemp = geoJsonLayer.features[newItemNum].attributes.prefZoom;
	 	}*/
	 	
	 	var prefZoomCalc = getPrefZoom(newItemNum);
	 
		var zoomControlsCalc = setZoomVisibility(newItemNum);	 
			 
	 	if(geoJsonLayer.features[newItemNum].attributes.layers != undefined){
	 		soloLayer(newItemNum);
	 		// temp // console.log("changeItem is trying to soloLayer on " + geoJsonLayer.features[newItemNum].attributes.layers);
	 	}
			/**/		
		unSelectAll();
		
		hideLegend();
		
		setCurrentItem(newItemNum);
		moveTheMap(newItemNum, prefZoomCalc);
		updateNav(newItemNum);
		updateMapInfo(newItemNum);
		updateNextAndBackButtons();
		updateGlobalNav(newItemNum);
}


function selectPreviousItem(){
	// temp // console.log("selectPreviousItem firing with currentItem at " + currentItem);
	if(currentItem >= 1){
		// temp // console.log("selectPreviousItem says there's a previous item");
		
		
		if(itemArray[currentItem-1] == "feature"){
		
			// temp // console.log("selectNextItem says next item is feature");
			// highlight next point if it's a feature
			highlightFeature(currentItem - 1);
			changeItem(currentItem - 1);
		
		
		} else if(itemArray[currentItem-1] == "page"){
			// temp // console.log("selectNextItem says next item is page");
			
			// hide all popups and deselect
			unSelectAll();
			changeItem(currentItem - 1);
		
		
		} else {
			// hide all popups and deselect
			unSelectAll();
			changeItem(currentItem - 1);
			// temp // console.log("selectNextItem does't know what to say");
		}
		
		
		
	} else {
		// temp // console.log("selectPreviousItem says nothing left");
	}
	

}




function selectNextItem(){
	// temp // console.log("selectNextItem firing with currentItem at " + currentItem);
	if((currentItem + 1) <= itemArray.length){
		if(itemArray[currentItem+1] == "feature"){
		
			// temp // console.log("selectNextItem says next item is feature");
			// highlight next point if it's a feature
			highlightFeature(currentItem + 1);
			changeItem(currentItem + 1);
		
		
		} else if(itemArray[currentItem+1] == "page"){
			// temp // console.log("selectNextItem says next item is page");
			
			// hide all popups and deselect
			unSelectAll();
			changeItem(currentItem + 1);
		
		
		} else {
			// hide all popups and deselect
			unSelectAll();
			changeItem(currentItem + 1);
			// temp // console.log("selectNextItem does't know what to say");
		}
		
		/*// disable button if there won't be future nexts to be had
		if(currentItem+2 == itemArray.length){
			// temp // console.log("selectNextItem says time to disable button");
			document.getElementById("nextButtonSmall").innerHTML = "<div>NEXT &raquo;</div>";
			document.getElementById("nextButtonLarge").innerHTML ="<div id='nextButtonLarge' style='position:absolute; left: 900px; top:270px;z-index:2010;'><a href='javascript:selectNextItem();'>NEXT &raquo;</a></div>";;
			
		}*/
		
		
	} else {
		// temp // console.log("selectNextItem says no more items");
		//document.getElementById("nextButtonSmall").innerHTML = "<div>NEXT &raquo;</div>";
	}

}


function updateMapInfo(itemNum){
	//alert("updateMapInfo running at " + itemNum);
	
	var mapInfoDiv = document.getElementById("mapInfoBox");
	
	
	if(geoJsonLayer.features[itemNum].attributes.keyLayers != undefined && geoJsonLayer.features[itemNum].attributes.keyLayers.length > 0){	
	
		// find the map to describe
		for (var arrayCounter = 0; arrayCounter < geoJsonLayer.features[itemNum].attributes.keyLayers.length; arrayCounter++){
				//// temp // console.log("looping through layers with layer name at " + geoJsonLayer.features[itemNum].attributes.layers[arrayCounter].name);
				
				mapInfoDiv.setAttribute("style","visibility:hidden");
				mapInfoDiv.innerHTML = "";
				
				var keyLayerTemp = geoJsonLayer.features[itemNum].attributes.keyLayers[arrayCounter].name;
				
				// loop through all layers
				for(var showCounter=0; showCounter < map.layers.length; showCounter++){
					
					var leftTemp = Math.max((geoJsonLayer.features[itemNum].attributes.lightboxWidth + 18),600);
					
					var maxWidthTemp = Math.min((950 - geoJsonLayer.features[itemNum].attributes.lightboxWidth - 50),(950-40-leftTemp))
					
					var heightRatioTemp = 1;
					
					if(map.layers[showCounter].label != undefined){
						heightRatioTemp = ( map.layers[showCounter].label.length / 60);
					}
					
					
					if(map.layers[showCounter].name == keyLayerTemp){
					
						//mapInfoDiv.setAttribute("style","visibility:visible;position:absolute;background:#fff;left:" + Math.max((geoJsonLayer.features[itemNum].attributes.lightboxWidth + 18),500) + "px;max-width:" + (950 - geoJsonLayer.features[itemNum].attributes.lightboxWidth - 50)+ "px;");
						
						
						mapInfoDiv.setAttribute("style","visibility:visible;position:absolute; color:#efefef;left:" + leftTemp + "px;max-width:" + maxWidthTemp + "px; margin-top:-" + (50*heightRatioTemp) + "px;");
						//mapInfoDiv.setAttribute("style","background:#fff;left:'400px';width:'400px';position:absolute;");
						
						var legendLinkTemp = "";
						
						if(showCounter == 2 || showCounter == 5){
							legendLinkTemp = "  (<a href='javascript:showLegend(" + showCounter + ")'>show legend</a>)";
						}
			
						
						
						mapInfoDiv.innerHTML += map.layers[showCounter].label + legendLinkTemp;
						
						
						
					
						//// temp // console.log("soloLayer showing " + map.layers[showCounter].toString());
					}
				}
				
			}
	
	
	
	
	} else {
		mapInfoDiv.innerHTML = "no key maps";
		mapInfoDiv.setAttribute("style","visibility:hidden;");
	}
	
	
}


function updateNav(theId){

	//alert("updateNav running with theId at " + theId);
	
	// temp // console.log("updateNav running with theId at " + theId);
	
	var navDiv = document.getElementById("photoNavButtons");
	
	var navItem //= document.getElementById("navButton00");
	
	
	/*if(itemArray[theId] == "page"){
		document.getElementById("photoNav").setAttribute("style","visibility:hidden");
	} else {
		document.getElementById("photoNav").setAttribute("style","visibility:visible");
	}
	*/
	
	
	// exception for hacked intro button
	/*if(theId == 0){
		navItem.setAttribute("class","photoNavBtn navOn");
	} else {
		navItem.setAttribute("class","photoNavBtn navOff");
	}*/
	
	// alert("updateNav firing");
	
	// for ives, was i + 1;
	
	/*
	
	for(var i=0;i<this.geoJsonLayer.features.length;i++){
		navItem = document.getElementById("navButton0" + i);
		//alert("updatenav looping");
		if(i == (theId-1)){
			document.getElementById("navButton0" + (i + 1)).setAttribute("class","photoNavBtn navOn");//.addClass("navOn");
		} else {
			document.getElementById("navButton0" + (i + 1)).setAttribute("class","photoNavBtn navOff");//removeClass("navOn");
		}
	}
	*/
	
		for(var i=0;i<this.geoJsonLayer.features.length;i++){
			navItem = document.getElementById("navButton0" + i);
			//alert("updatenav looping");
			
			/*if(geoJsonLayer.features[i].attributes.chapter == true){
				if(i == theId){
					document.getElementById("navButton0" + (i)).setAttribute("class","photoNavBtn navOn");//.addClass("navOn");
				} else {
					document.getElementById("navButton0" + (i)).setAttribute("class","photoNavBtn navOff");//removeClass("navOn");
				}			
			} else {*/
				if(i == theId){
					document.getElementById("navButton0" + (i)).setAttribute("class","photoNavBtn navOn");//.addClass("navOn");
				} else {
					document.getElementById("navButton0" + (i)).setAttribute("class","photoNavBtn navOff");//removeClass("navOn");
				}
			
			//}
			
			

		}

}

/*function updateNav(theId){
	
	var navDiv = document.getElementById("photoNavButtons");

	// alert("updateNav firing");
	for(var i=0;i<this.geoJsonLayer.features.length;i++){
		var navItem = document.getElementById("navButton0" + i);
		//alert("updatenav looping");
		if(i == (theId-1)){
			document.getElementById("navButton0" + (i + 1)).setAttribute("class","navOn");
		} else {
			document.getElementById("navButton0" + (i + 1)).setAttribute("class","navOff");
		}
	}

}*/


function updateGlobalNav(theId){
	
	// temp // console.log("updateGlobalNav running with theId at " + theId);
	// loop through chapters and see where it fits in
	//highlight chapter the new item belongs to
	// unlink the chapter title
	// unhighlight all the other chapter titles
	// hide the whole nav if it is the first page
	
	//theId = 0;
	
	var memberOfChapter = -1;
	
	var globalNavDiv = document.getElementById("globalNav");
	
	// blank it out for redrawing
	globalNavDiv.innerHTML = "";
	
	//// temp // console.log("updateGlobalNav says theId times two is " + (theId * 2));
	
	
	// check to see where new item fits into chapters
	switch(true){
		case theId >= chapterArray[0] && theId < chapterArray[1]:
		memberOfChapter = 0;
		// temp // console.log("theId is member of chapter 0");
		break;
		
		case theId >= chapterArray[1] && theId < chapterArray[2]:
		memberOfChapter = 1;
		// temp // console.log("theId is member of chapter 1");
		break;

		case theId >= chapterArray[2] && theId < chapterArray[3]:
		memberOfChapter = 2;
		// temp // console.log("theId is member of chapter 2");
		break;

		case theId >= chapterArray[3] && theId < chapterArray[4]:
		memberOfChapter = 3;
		// temp // console.log("theId is member of chapter 3");
		break;

		case theId >= chapterArray[4] && theId < chapterArray[5]:
		memberOfChapter = 4;
		// temp // console.log("theId is member of chapter 4");
		break;
		
		case theId >= chapterArray[5] && theId < chapterArray[6]:
		memberOfChapter = 5;
		// temp // console.log("theId is member of chapter 5");
		break;
		
		case theId >= chapterArray[5] && theId < chapterArray[6]:
		memberOfChapter = 6;
		// temp // console.log("theId is member of chapter 6");
		break;
		
		default:
		memberOfChapter = 10;
		// temp // console.log("theId, " + theId + ", is member of chapter 10");
		break;
		
	}
	
	// highlight and unhighlight chapters
	for(var i=0;i<chapterArray.length;i++){
		// temp // console.log("updateGlobalNav looping through chapterArray " + i );
		
		// for chapter that we are in, draw title w/o link
		if(memberOfChapter == i){
			// if that chapter is the home page, just draw 'home'
			if(i == 0){
				globalNavDiv.innerHTML += "<div class='globalNavItem globalNavItemHome' style='display: inline; float:left;'>Home </div>";
			// if you're in the home page for that chapter, don't link
			} else if(chapterArray[i] == theId){
				globalNavDiv.innerHTML += "<div class='globalNavItem globalNavItemOn' style='display: inline; float:left;text-decoration:none;'>" + geoJsonLayer.features[chapterArray[i]].attributes.title +  "</div>";
			// otherwise, do link
			} else {
			
				globalNavDiv.innerHTML += "<div class='globalNavItem globalNavItemOn' style='display: inline; float:left;'><a href='javascript:changeItem(" + chapterArray[i] + ");'>" + geoJsonLayer.features[chapterArray[i]].attributes.title + "</div>";					
			}
			
		// if chapter is not first one
		// draw the title and the link to the chapter
		} else {
			// if it is also not the last bookend chapter
			if(chapterArray[i] != 10000){
				if(chapterArray[i] == 0){
					globalNavDiv.innerHTML += "<div class='globalNavItem globalNavItemHome' style='display: inline; float:left; text-decoration:none;'><a href='javascript:changeItem(" + chapterArray[i] + ");'>Envisioning <br />California&rsquo;s <br />Delta  As it Was</a></div>";
					
				} else {
					globalNavDiv.innerHTML += "<div class='globalNavItem globalNavItemOff' style='display: inline; float:left;text-decoration:none;'><a href='javascript:changeItem(" + chapterArray[i] + ");'>" + geoJsonLayer.features[chapterArray[i]].attributes.title + " </a></div>";
				}
			}
		
		}
	
	}
	/**/
	
	

}


function getWindowHeight() {
	if (self.innerHeight) return self.innerHeight;
	if (document.documentElement && document.documentElement.clientHeight)
		return document.documentElement.clientHeight;
	if (document.body) return document.body.clientHeight;
		return 0;
}

function getWindowWidth() {
	if (self.innerWidth) return self.innerWidth;
	if (document.documentElement && document.documentElement.clientWidth)
		return document.documentElement.clientWidth;
	if (document.body) return document.body.clientWidth;
		return 0;
}

function resize() {  
	/*var map = document.getElementById("map");  
	var header = document.getElementById("header");  
	var subheader = document.getElementById("subheader");  
	map.style.height = (getWindowHeight()-300) + "px";
	map.style.width = (getWindowWidth()-300) + "px";
   // header.style.width = (getWindowWidth()-300) + "px";
	subheader.style.width = (getWindowWidth()-300) + "px";
	if (map.updateSize) { map.updateSize(); };*/
} 

onresize = function(){ 
	resize();
};

function showLightbox(itemNum){
	
	// temp // console.log("showLightbox running with itemNum at " + itemNum);
	
	//alert("showLightbox running");
	var lightboxUI = document.getElementById("lightboxContainer");

	lightboxUI.setAttribute("style","visibility: visible");
	

/*
	var lightboxSizer = document.getElementById("lightboxSizer");
	lightboxSizer.setAttribute("style","width: " + geoJsonLayer.features[itemNum].attributes.lightboxWidth + "px; background: #ccc;");
*/
	$('#lightboxContainer').fadeIn(3000);
	
	$('#lightboxContent').fadeOut(1000);
	
	// gm add 120521
	$('#lightboxContainer').scrollTop(0);
	
	
	/*$('#lightboxContainer').animate({
            
scrollTop: "+=" + ($('#lightboxContainer').position().top)
        }, 'fast', function () {
            
            $("#" + id).effect("highlight", {}, 3000);
            
        });*/
	
	
	
	
	
      
      //animate({
		//"alpha": 1.0 + "%"
	//})


	//lightboxUI.innerHTML = '<div id="lightboxClose" onClick="javascript:hideLightbox();"></div>' + 	lightboxContent[itemNum];	

	lightboxUI.innerHTML = lightboxContent[itemNum];	
	
	// supposed to highlight point - but crashes on next button
	//this.ctrlSelectFeatures.select(geoJsonLayer.features[itemNum]);

	// past-present comparison exception

	if(getCurrentItem() == 2){initImageSwap();}

	// layer nav show exception
	if(itemNum == 21){
	// current item num was a problem because you don't leave explore to see sources, current item num stays at 21 even when lightbox num changes
	//if(getCurrentItem() == 21){
		showLayerNav();
	} else {
		hideLayerNav();
	}



}

function hideLightbox(){
	
	var lightboxUI = document.getElementById("lightboxContainer");

	lightboxUI.setAttribute("style","visibility: hidden");
	
	
}

function initLightbox(){

	// temp // console.log("initLightbox running");

	lightboxContent = new Array(
		
		/**/
		"<div class='lightbox' style='width:" + geoJsonLayer.features[0].attributes.lightboxWidth +  "px;height:610px;background-repeat:no-repeat; overflow:hidden;background-image:url(images/delta-background-fade.png);background-repeat:repeat-y;'><div class='lightboxContent'><!-- LIGHTBOX BODY--><div class='lightboxBody'><div class='lightbox2Col'><h1 class='mainTitle'>Envisioning <br />California&rsquo;s <br />Delta As it Was</h1><p style='font-size:15px; line-height:19px;'>The Sacramento-San Joaquin Delta is at the heart of California&rsquo;s water supply. This inland delta, where two major rivers converge and mingle with San Francisco Bay tides, has been re-engineered and re-plumbed over the last 160 years to meet the needs of a growing state.</p><p style='font-size:15px; line-height:19px;'>Little is known about the Delta as it once was. Now, as efforts get underway to save the Delta&rsquo;s failing ecosystem, researchers at the San Francisco Estuary Institute are reconstructing this complex landscape using thousands of historical sources.</p><p><a href='javascript:changeItem(1);' class='homeMenu'>Ecological Detectives at Work</a></p><p><a href='javascript:changeItem(3);' class='homeMenu'>Tour the Historical Delta</a></p><p><a href='javascript:changeItem(21);' class='homeMenu'>Explore the Maps</a></p></div></div><!-- END LIGHTBOX BODY--></div>",

		"<!--SFEI--><!--SFEI--><!-- CUT HERE --><div class='lightbox' style='width: 950px; height:610px; overflow:hidden; background:#efefef;'><div class='lightboxContent'><!--LIGHTBOX TITLE--><div class='lightboxTitleArea'><p class='lightboxKicker'>Background</p><h3 class='lightboxHeadline'>Using History to Map a Landscape</h3></div><!-- END LIGHTBOX TITLE--><!-- LIGHTBOX BODY--><div class='lightboxBody'><div class='lightbox3Col'><p class='firstGraf'>Today, California&rsquo;s Delta is virtually unrecognizable compared to what it once was. </p><p>Over 200 years, its landscape has been remade. In the booming decades after the Gold Rush, settlers drained wetlands and put up levees to create new farmland. Later, the Delta became the hub of a vast network of dams and pipelines that supply water to the state. Today, that water reaches more than 25 million residents and millions of acres of Central Valley farmland. </p><p>The legacy of change in the 738,000-acre Delta has come with an environmental cost: its ecosystem is in crisis. Now, California is considering major restoration efforts to reverse the decline of the Delta&rsquo;s endangered species. But little is known about the complex ecosystem that once allowed them to thrive.</p><p>Scientists at the San Francisco Estuary Institute have undertaken an unprecedented effort, funded by the California Department of Fish and Game, to reconstruct this landscape, using a discipline known as &ldquo;historical ecology.&rdquo; They brought together more than 3,000 historical sources from 40 different archives and institutions, including original navigational charts, government land surveys, drawings, photographs, and even journals. </p></div><div class='lightbox3Col'><p><img src='images/sfei-working-285px.png' width='285' height='199' /></p><p class='imageCredit' style='text-align:left;margin-bottom:2px;margin-top:-3px;'>Robin Grossinger and Alison Whipple of the San Francisco Estuary Institute-Aquatic Science Center examine maps in the north Delta. (Photo: Lauren Sommer)</p><p>These materials were created for many purposes, but they all contain clues about what the Delta once looked like.</p><p>By layering together this historical information in space and time, researchers have created a detailed map of the land types, waterways, and plant communities of 200 years ago. The map reveals an interconnected ecosystem of incredible complexity: rich, riverfront forests in the north Delta, lush wetlands and branching channels in the central Delta and a varied, seasonal floodplain in the south Delta.</p><p>&nbsp;</p></div><div class='lightbox3Col' style='float:right;'><p>This map doesn&rsquo;t provide a literal blueprint for remaking the Delta today. But understanding the physical and biological processes that once made the ecosystem flourish could dramatically improve habitat restoration efforts to come. Knowing the landscape as it was could also help reestablish an ecosystem that can adapt as the Delta continues to change.</p><p><em>Read more about the project and habitat restoration in the Delta in KQED&rsquo;s story:</em></p><p class='firstGraf'><a href='//science.kqed.org/quest/audio/californias-deadlocked-delta-can-we-bring-back-what-weve-lost/' target='_blank'>California's Deadlocked Delta: Can We Bring Back What We've Lost?</a></p><p>&nbsp;</p><p class='chapterHed'>NEXT: <a href='javascript:selectNextItem();'>Compare the Delta Across Eras &raquo;</a><br /></p></div></div><!-- END LIGHTBOX BODY--></div><!-- END LIGHTBOX CONTENT--></div><!-- END LIGHTBOX--><!-- STOP CUT HERE -->",
		
		
		"<!--SFEI MAP COMPARISON--><!-- CUT HERE --><div class='lightbox' style='width: 950px; height:660px; background:#fff; overflow:hidden;'><div class='lightboxContent'><br clear='all' /><!-- LIGHTBOX BODY--><div class='lightboxBody'><!--COLUMN 1--><div class='lightbox3Col' style='position:absolute;left:20px;'><div style='background:#333;font-size: 18px; color:#fff; padding:5px;margin-top:10px;float:right;'>Early 1800s</div><div style='position:absolute;left:0px;' id='base_1800'><img src='images/layers/delta_historical_120512_01_all_off2.png' width='285' height='600' /></div><div style='position:absolute;left:0px;' id='slides_1800'><img src='images/layers/delta_historical_120512_01_all.png' width='285' height='600' id='layers_1800' /></div><div style='position:absolute;left:0px;' id='legal_overlay'><img src='images/layers/delta_historical_120512_01_leg.png' width='285' height='600' /></div></div>	<!--COLUMN 2 --><div class='lightbox4Col' style='position:absolute; left: 350px;'><h3 style='margin-top:2px;'>Compare the Delta Across Eras</h3><p class='firstGraf'>Click on the habitat types below to see how the Delta's waterways and landscape have been changed.</p><div id='legendText'></div><!--end legend text div--><p><div class='pullquoteHistoricalSm' style='line-height:13px;'>Note:<br /> The outline on the map at left indicates the mutually mapped area. The outline on the map at right indicates the boundary of the SFEI-ASC study.</p></div></div><!--COLUMN 3--><div class='lightbox3Col' style='position:absolute; left: 620px;'><div style='background:#333;font-size: 18px; color:#fff; padding:5px;margin-top:10px;float:right;'>Early 2000s</div><div style='position:absolute;' id='base_2000'><img src='images/layers/delta_combined_120512_01_mod_all_off2.png' width='300' height='612' /></div><div style='position:absolute;' id='slides_2000'><img src='images/layers/delta_combined_120512_01_mod_all.png' width='300' height='612' id='layers_2000' /></div><div style='position:absolute;' id='outline_1800_div'><img src='images/layers/delta_combined_120512_01_mod_all_outline.png' width='300' height='612' id='outline_1800' /></div></div></div><!-- END LIGHTBOX BODY--></div><script type='script/javascript'>if(getCurrentItem() == 2){initImageSwap();}</script><!-- END LIGHTBOX CONTENT--></div><div style='position:absolute;width:100px;left:660px;color:#666;font-size:10px;font-family:Mako;margin-top:-125px;'>California Department of Fish and Game</div><!-- END LIGHTBOX--><!-- STOP CUT HERE -->",
		
		
		"<!--DELTA--><div class='lightbox' style='width:340px; height:610px; overflow:hidden; sbackground-image:url(images/black_40.png);display:block;top:20px;left:30px; color:#efefef;font-family: Mako, sans-serif;'><div class='lightboxContent'><!--LIGHTBOX TITLE--><div class='lightboxTitleArea'><!--div class='lightboxReturnToMapIcon' style='float:left;margin-right: 10px;'><img src='images/deltamap-thumb-34x61.png' width='34' height='61' alt='return to map' /></div--><p style='text-transform:uppercase; font-size:11px;letter-spacing:0.1px;font-family:Arial, sans-serif;margin-bottom:-20px;'>Overview</p><h3 class='lightboxHeadline' style='width:300px;'>The Sacramento-</br>San Joaquin Delta</h3></div><br clear='all' /><!-- END LIGHTBOX TITLE--><!-- LIGHTBOX BODY--><div class='lightboxBody'><div class='lightbox3Col' style='font-size:13px;'><p>As part of the San Francisco Estuary, the Delta was once a landscape where water and land were closely intertwined. Two of California&rsquo;s largest rivers, the Sacramento and San Joaquin, converge in the Delta. These rivers once overflowed with seasonal Sierra Nevada runoff, flooding across the Delta&rsquo;s expansive wetlands. These waters met the tides in the Delta and mingled with salty waters in the San Francisco Bay.</p><p>For decades, the Delta has been the site of some of California&rsquo;s most contentious water battles. As the state has increased its reliance on Delta water, a number of native species have declined. Almost all of the historical wetlands have been lost. Invasive species have moved in. And Delta islands, mostly used for agriculture, are at risk from weakening levees. Today, the Delta is a landscape in flux and some say, in crisis.</p><br clear='all' /></div><!-- END LIGHTBOX BODY--></div><!-- END LIGHTBOX CONTENT--></div><!-- END LIGHTBOX--><!-- STOP CUT HERE -->",
		
		
			"<!--NORTH DELTA--><div class='lightbox' style='width: 340px; height:610px; overflow:hidden; sbackground-image:url(images/black_40.png);display:block;top:20px;left:30px; color:#efefef;font-family: Mako, sans-serif;'><div class='lightboxContent'><!--LIGHTBOX TITLE--><div class='lightboxTitleArea'><!--div class='lightboxReturnToMapIcon' style='float:left;margin-right: 10px;'><img src='images/deltamap-thumb-34x61.png' width='34' height='61' alt='return to map' /></div--><p style='text-transform:uppercase; font-size:11px;letter-spacing:0.1px;font-family:Arial, sans-serif;margin-bottom:-20px;'>The North Delta</p><h3 class='lightboxHeadline' style='width:300px;'>Where Flood Basins Flank Rivers</h3><p class='lightboxBackLinkWhite'><a href='javascript:backToDeltaMap()'>&laquo; Back to Delta Map</a></p></div><br clear='all' /><!-- END LIGHTBOX TITLE--><!-- LIGHTBOX BODY--><div class='lightboxBody'><div class='lightbox3Col' style='font-size:13px;'><p>The powerful Sacramento River shaped the landscape of the north Delta. As winter rain and snow melt flowed out of the watershed, the river and its tributaries often overtopped their banks, spilling water into huge flood basins. These basins, mixed with wetlands, lakes, and ponds, provided habitat for birds and fish that evolved with this seasonal pattern. Along the river itself, lush forests were home to large mammals and other wildlife.</p><p>Today, large canals, diversions and levees contain these seasonal floods. The riverfront forests and wetlands are largely gone.</p><br clear='all' /></div><!-- END LIGHTBOX BODY--></div><!-- END LIGHTBOX CONTENT--></div><!-- END LIGHTBOX--><!-- STOP CUT HERE -->",
		
		
		
		
		
		
		"<!--FLOOD BASIN--><!-- CUT HERE --><div id='lightboxClose' onClick='javascript:hideLightbox();'></div><div class='lightbox' style='width: 490px; background-image:url(images/white_80.png); overflow:hidden;'><div class='lightboxContent'><!--LIGHTBOX TITLE--><div class='lightboxTitleArea'><div class='lightboxReturnToMapIcon' style='float:left;margin-right: 10px; margin-bottom:10px;'><a href='javascript:backToDeltaMap();'><img src='images/deltamap-thumb-34x61.png' alt='return to map' width='34' height='61' border='0' /></a></div><p class='lightboxKicker'>North Delta Features</p><h3 class='lightboxHeadline'>A River&rsquo;s Flood Basin</h3><p class='lightboxBackLink'><a href='javascript:backToDeltaMap()'>&laquo; Back to Map</a></p></div><!-- END LIGHTBOX TITLE--><!-- LIGHTBOX BODY--><div class='lightboxBody'><div class='lightbox2Col'><p><img src='images/CSLonline_NSacramento_flood_scenes-440px.jpg' alt='' width='440' height='344' /></p><p class='imageCredit'>Courtesy of the California State Library</p><p class='firstGraf'>Seasonal flooding was the dominant force in the north Delta, like this 1927 flood near Sacramento. Fed by winter rain and snow, the powerful Sacramento River frequently overflowed its banks.</p><p>The water spilled into natural flood basins, or low-lying areas occupied by wetlands, often several miles wide and tens of miles long. An 1873 map, below, conveys the vast extent of the historic wetlands in the north Delta basins.</p><div class='imageLeft'><p><img src='images/SJ_Sac_Tulare_1873_4916000_190px.jpg' alt='' width='190' height='332' /></p><p class='imageCredit'>David Rumsey Map Collection</p></div><p>West of the Sacramento River, the water spread across about 80,000 acres of wetlands, known as the Yolo Basin. In wet years, floods could extend even farther. These wetlands would stay inundated for weeks, sometimes months, as water slowly drained to the southward toward tide water.</p><p>The wetlands, primarily occupied by tule, created important habitat for many species specially adapted to this seasonal cycle. Slow-moving water rich in nutrients and organic matter provided food for young fish, including juvenile salmon making their way to the Pacific Ocean.</p><p>In 1850, writer William Wright got lost in the Delta on a duck hunt. As he bent down to drink the water, he described its productivity.</p><p class='pullquoteHistorical'>&quot;In order to see the strange creatures in the water no microscope was required; they were visible to the naked eye... In lying down to drink from the edge of a pool we had before us for study a whole universe of animalcules. Though we steered clear of such creatures as were above half an inch in length we paid no attention to the little fellows.&quot;</p><p>Floods also inundated the young city of Sacramento, built where the American and Sacramento Rivers meet. In 1862, during the largest flood on record, Governor Leland Stanford famously traveled through the streets of Sacramento in a rowboat in order to get to his inauguration.</p><p>Over the years, upstream dams and flood control projects have largely prevented the Sacramento River and its tributaries from entering the flood basins, except during extreme floods.</p><p><img src='images/YoloBasin_car_1981-001-065-440px.jpg' alt='' width='440' height='313' /></p><p class='imageCredit'>Courtesy of the Center for Sacramento History</p><p>Today, floodwater is diverted into the Yolo Bypass, along the western edge of the Yolo Basin's historical extent. Driving on Interstate 80 to Sacramento, one can see the expansiveness of a landscape once occupied by tule marshes, which is likely the view seen here in the early 1900s.</p></div></div><!-- END LIGHTBOX BODY--></div><!-- END LIGHTBOX CONTENT--></div><!-- END LIGHTBOX--><!-- STOP CUT HERE -->",
		
		
		
		"<!--SECRET LAKE--><!-- CUT HERE --><div id='lightboxClose' onClick='javascript:hideLightbox();'></div><div class='lightbox' style='width: 480px; overflow:auto; background-image:url(images/white_80.png);'><div class='lightboxContent'><!--LIGHTBOX TITLE--><div class='lightboxTitleArea'><div class='lightboxReturnToMapIcon' style='float:left;margin-right: 10px; margin-bottom:10px;'><a href='javascript:backToNorthDeltaMap();'><img src='images/deltamap-thumb-34x61.png' alt='return to map' width='34' height='61' border='0' /></a></div><p class='lightboxKicker'>North Delta Features</p><h3 class='lightboxHeadline'>Secret Lake</h3><p class='lightboxBackLink'><a href='javascript:backToNorthDeltaMap()'>&laquo; Back to Map</a></p></div><!-- END LIGHTBOX TITLE--><!-- LIGHTBOX BODY--><div class='lightboxBody'><div class='lightbox2Col'><p class='firstGraf'><div class='imageLeft'><p><img src='images/Wright-1989-041-0422-190px.jpg' width='190' height='281' /></p><p class='imageCredit'>Courtesy of the Center for Sacramento History</p></div>Around 1850, duck hunter William Wright and a companion got hopelessly lost in the north Delta. Carrying the ducks and geese he'd shot, similar to this early 1900s photo of a Delta hunter, Wright fought his way through the marshes before spending a long, cold night in amongst the tule.</p><p>He later wrote a story about his adventure, seen below in his handwriting.</p><p class='pullquoteHistorical'>&quot;The ground forming the basins of the lakes was full of beaver holes and when we broke through into one of these down we went over head and ears [?] in the water. I was completely submerged a dozen times while among the pond and lakes.</p><p><img src='images/Wright_IMG_6504_430px.jpg' alt='' width='430' height='74' /></p><p class='imageCredit'>Courtesy of the California Historical Society</p><p class='pullquoteHistorical'>We decided to halt at once and pass the night where we were, though an inch of water covered the oozy ground. It was the worst camp I ever made in my life... In order to make a bed we cut the wings off the geese and a lot of ducks' and spread them upon the tules we had piled up. Upon this improvised feather bed we stretched ourselves...</p><p class='pullquoteHistorical'>It is useless to dwell upon what we suffered that night. Our situation was so miserable that no words can do justice to it &mdash; it must be left the imagination of the reader who knows what the tule marshes are in such weather.&rdquo;</p><p><div class='imageLeft'><img src='images/Reece_1864_SecretL_190px.jpg' width='190' height='285' style='margin-bottom:20px;' /><p class='imageCredit'>California State Lands Commission</p></div>Wright's account also references &ldquo;Secret Lake,&rdquo; a lake that has since been drained.</p><p class='pullquoteHistorical'>&ldquo;About five miles from our camp at Randall Island was Secret Lake, which had the reputation of being the greatest of all the lake and marsh regions of the country for game. The lake was situated far out in an impenetrable tule swamp of immense extent which lay on the south side of the Sacramento river.&rdquo;</p><p>The location of this lake becomes clear in this 1864 map showing Swamp Land District #2. Secret Lake was one of many in the north Delta, found in the lowest elevations of the flood basins. As Wright&rsquo;s duck hunting story attests, the lakes and ponds not only provided valuable feeding grounds for migrating waterfowl, but were also frequented by other species, including fish and beaver.</p><p><div class='imageLeft'><img src='images/LiDAR_SecretL_190px.jpg' width='190' height='285' style='margin-bottom:15px;'/><p class='imageCredit'>CA DWR</p></div>Today, despite the draining of Secret Lake, its outline can still be seen in this image of land elevation, where the lowest-lying areas are in light green.</p><p>&nbsp;</p></div></div><!-- END LIGHTBOX BODY--></div><!-- END LIGHTBOX CONTENT--></div><!-- END LIGHTBOX--><!-- STOP CUT HERE -->",
		
		"<!--RIVERBANK FORESTS--><!-- CUT HERE --><div id='lightboxClose' onClick='javascript:hideLightbox();'></div><div class='lightbox' style='width: 640px;background-image:url(images/white_80.png); overflow:hidden;'><div class='lightboxContent'><!--LIGHTBOX TITLE--><div class='lightboxTitleArea'><div class='lightboxReturnToMapIcon' style='float:left;margin-right: 10px; margin-bottom:10px;'><a href='javascript:backToNorthDeltaMap();'><img src='images/deltamap-thumb-34x61.png' alt='return to map' width='34' height='61' border='0' /></a></div><p class='lightboxKicker'>North Delta Features</p><h3 class='lightboxHeadline'>Forests along the River</h3><p class='lightboxBackLink'><a href='javascript:backToNorthDeltaMap()'>&laquo; Back to Map</a></p></div><!-- END LIGHTBOX TITLE--><br clear='all' /><!-- LIGHTBOX BODY--><div class='lightboxBody'><div class='lightbox1Col590'><p><img src='images/4658009_MarksSacramento_1852_590px.jpg' width='590' height='217' /></p><p class='imageCredit'>David Rumsey Map Collection</p><p class='firstGraf'>Sycamores, oaks, willows, and other trees lined the banks of the Sacramento, creating bands of forest along the river. The natural levees of the river provided higher ground for the trees, as seen in this sketch, part of a series of navigational maps created by U.S. Navy officer Cadwalader Ringgold in 1850.</p><div class='imageLeft'><p><img src='images/forests-newhelvetia-285px.jpg' width='285' height='569' /></p><p class='imageCredit'>Courtesy of the Bancroft Library</p></div>Expanses of tule marshes lay behind these riverbank, or riparian, forests, represented by symbols in this 1843 map, left, made to document the land grant of Captain John Sutter.<p>These lush forests created habitat for large mammals, as traveler Heinrich Lienhard encountered on his 1846 trek on foot up the Sacramento River to Sutter's Fort.</p><p class='pullquoteHistorical'>&quot;Having gone only a few yards we reached a slough; here we were forced to wade through water up to our knees. A frightened elk suddenly bounded out of the water with great leaps and soon vanished in the brush...</p><p class='pullquoteHistorical'>Finally, a place was reached that was too deep to cross on foot. At such times we usually tried to find trees with branches broad enough to reach to the opposite side of the slough. ...By clinging to one large branch after another were able to approach so close to the opposite bank that one short jump landed us on dry ground...</p><p class='pullquoteHistorical'>The noises and sounds of nature were far more obvious to the Indian than to we two American green horns traveling through the forest for the first time, and he seemed frightened and excited by the loud whistling sounds; he stood on his tiptoes, looked in the direction the sounds had come from, then all around without stirring.</p><p class='pullquoteHistorical'>Observing his agitation I asked, &lsquo;Is it a wolf?&rsquo;<br />&lsquo;No, no,&rsquo; he said.<br />&lsquo;Is it an elk?&rsquo;<br />&lsquo;No, no,&rsquo; he replied again.<br />&lsquo;Is it a grizzly bear?&rsquo;<br />&lsquo;Yes,&rsquo; he whispered quickly... Why the gray rascal allowed us to escape unmolested is a mystery.&rdquo;</p><p>The forested areas along the river were some of the first to be settled. Farmers cleared the trees and planted orchards in the rich soils, built up by frequent floods. The 1906 photo, below at left, shows a new orchard on the natural levees of the Sacramento River. Next to it, the higher artificial levee has been constructed to prevent flooding.</p><div class='imageLeft'><p><img src='images/ggk02916_285px.jpg' width='285' height='202' /></p><p class='imageCredit'>USGS</p></div><p>Today, orchards are still found on the footprint of these historic forests. An aerial view reveals an orchard boundary roughly matching the extent of the lush trees that once stood.</p><div class='imageLeft'><p><img src='images/fig-5.10-285px.jpg' width='285' height='158' /></p><p class='imageCredit'>USDA</p></div></div><br clear='all' /></div><!-- END LIGHTBOX BODY--></div><!-- END LIGHTBOX CONTENT--></div><!-- END LIGHTBOX--><!-- STOP CUT HERE -->",
		
		
		
		"<!-- SURVEYS--><!-- CUT HERE --><div id='lightboxClose' onClick='javascript:hideLightbox();'></div><div class='lightbox' style='width: 500px; overflow:hidden; background-image:url(images/white_90.png);'><div class='lightboxContent'><!--LIGHTBOX TITLE--><div class='lightboxTitleArea'><div class='lightboxReturnToMapIcon' style='float:left;margin-right: 10px;'><a href='javascript:backToNorthDeltaMap();'><img src='images/deltamap-thumb-34x61.png' alt='return to map' width='34' height='61' border='0' /></a></div><p class='lightboxKicker'>North Delta Features</p><h3 class='lightboxHeadline'>Land Surveyors</h3><p class='lightboxBackLink'><a href='javascript:backToNorthDeltaMap()'>&laquo; Back to Map</a></p></div><!-- END LIGHTBOX TITLE--><!-- LIGHTBOX BODY--><div class='lightboxBody'><div class='lightbox2Col'><p><img src='images/2006-028-0115_440px.jpg' width='440' height='375' /></p><p class='imageCredit'>Courtesy of the Center for Sacramento History</p><p class='firstGraf'>Surveyors with the General Land Office had the mammoth task of dividing up federally-owned land in California in the early 1850s. In the Delta, they traveled on foot, marking out land parcels one mile by one mile. Traveling in a straight line where they could, they measured the distances with a chain 100 links long.</p><p>At each waypoint, the surveyors looked for trees to establish the survey lines. They'd burn the bark on these &quot;bearing trees,&quot; so future settlers could locate the plots. The survey notes they made, seen below, plotted along a path they took in 1859 across Sutter Slough, detailed the trees they used including species and trunk diameter. These land surveys provide first-hand, spatially accurate information about the Delta landscape of the time.</p><p><a href='images/SutterIs_GLO_1mi_v4_590px.gif' target='_blank'><img src='images/SutterIs_GLO_1mi_v4_440px.jpg' alt='Click to Enlarge' width='440' height='285' border='0' /></a></p><p class='imageCredit'>SFEI</p><p>The surveyor&rsquo;s 1859 path is seen below on a 1930s US Department of Agriculture soil survey map. It describes the soil types that would have supported the riparian forests that the bearing trees were part of. Those soils line the riverbanks, while peat and other wetland soils are found farther away. Combined with the land surveys, these maps help establish the extent of the historical riparian forest.</p><div class='imageLeft'><p><img src='images/suisun-soils-withoverlays-285x298.png' width='222' height='266' /></p><p class='imageCredit'>USDA, SFEI</p></div><p style='font-size:10px;'>Notes taken from General Land Office survey by William J. Lewis, Nov. 27, 1859:</p><p class='pullquoteHistoricalSm'>1. Sycamore [76cm] diameter on right bank of Sutter Slough</p><p class='pullquoteHistoricalSm'>&nbsp;</p><p class='pullquoteHistoricalSm'>2. Left bank of Sutter Slough, navigable strea, Slough [65m] wide.</p><p class='pullquoteHistoricalSm'>&nbsp;</p><p class='pullquoteHistoricalSm'>3. [Sycamore bearing trees: 6m and 18m distant, 61cm and 61cm diameter]</p><p class='pullquoteHistoricalSm'>&nbsp;</p><p class='pullquoteHistoricalSm'>4. Along margin of tule [Sycamore bearing trees: 67m, 73m, 3m distant; 46cm, 61cm, 101cm, and 76cm diameter]</p><br clear='all' /><p>&nbsp;</p></div></div></div><!-- END LIGHTBOX BODY--></div><!-- END LIGHTBOX CONTENT--></div><!-- END LIGHTBOX--><!-- STOP CUT HERE -->",
		
		
			"<!--CENTRAL DELTA--><div class='lightbox' style='width: 340px; height:610px; overflow:hidden; sbackground-image:url(images/black_40.png);display:block;top:20px;left:30px; color:#efefef;font-family: Mako, sans-serif;'><div class='lightboxContent'><!--LIGHTBOX TITLE--><div class='lightboxTitleArea'><!--div class='lightboxReturnToMapIcon' style='float:left;margin-right: 10px;'><img src='images/deltamap-thumb-34x61.png' width='34' height='61' alt='return to map' /></div--><p style='text-transform:uppercase; font-size:11px;letter-spacing:0.1px;font-family:Arial, sans-serif;margin-bottom:-20px;'>The Central Delta</p><h3 class='lightboxHeadline' style='width:300px;'>Where Tides Dominate</h3><p class='lightboxBackLinkWhite'><a href='javascript:backToDeltaMap()'>&laquo; Back to Delta Map</a></p></div><br clear='all' /><!-- END LIGHTBOX TITLE--><!-- LIGHTBOX BODY--><div class='lightboxBody'><div class='lightbox3Col' style='font-size:13px;'><p>The central Delta was once a maze of web-like waterways. More than 1,000 miles of winding channels wove themselves within broad tidal wetlands, filled with tule, willow and other species. These channels connected the landscape with tidal waters, creating rich habitat for fish and wildlife.</p><p>Today, virtually all the wetlands have been converted to agriculture. Their branching channels have been largely dammed and drained.</p><br clear='all' /></div><!-- END LIGHTBOX BODY--></div><!-- END LIGHTBOX CONTENT--></div><!-- END LIGHTBOX--><!-- STOP CUT HERE -->",
		
		
		
		
		"<!--WINDING SLOUGHS--><!-- CUT HERE --><div id='lightboxClose' onClick='javascript:hideLightbox();'></div><div class='lightbox' style='width: 500px; overflow:hidden; background-image:url(images/white_100.png)'><div class='lightboxContent'><!--LIGHTBOX TITLE--><div class='lightboxTitleArea'><div class='lightboxReturnToMapIcon' style='float:left;margin-right: 10px;'><a href='javascript:backToCentralDeltaMap();'><img src='images/deltamap-thumb-34x61.png' alt='return to map' width='34' height='61' border='0' /></a></div><p class='lightboxKicker'>Central Delta Features</p><h3 class='lightboxHeadline'>Winding Sloughs</h3><p class='lightboxBackLink'><a href='javascript:backToCentralDeltaMap()'>&laquo; Back to Map</a></p></div><!-- END LIGHTBOX TITLE--><!-- LIGHTBOX BODY--><div class='lightboxBody'><div class='lightbox2Col'><p><img src='images/031_Hutchings_1862_440px.jpg' width='440' height='316' /></p><p class='imageCredit'></p><p class='firstGraf'>Wide channels carried the enormous volumes of tidal water that rushed into the Delta twice a day. With so many winding and meandering turns, the channels formed a frustrating maze for early travelers, especially as steamboats became an important connection between San Francisco and the growing cities of Sacramento and Stockton.</p><p>The <em>Morning Call</em> newspaper described the channels in 1894:</p><p class='pullquoteHistorical'>&ldquo;The San Joaquin River ...was simply a long collection of curves, and a steamer had to travel about three miles in a round about manner to make one mile toward its destination. This was, of course, annoying and a great waste of time...&rdquo;</p><p>To shorten the boat trips, canals were dredged to create a straight route across the sinuous bends. Here, a dredger can be seen in the foreground making an unfinished cut across the marsh. These right angles and straight canals can be seen on maps today. Some of these canals created the boundaries of Delta islands known as &ldquo;tracts&rdquo; &mdash; including Frank&lsquo;s Tract and Drexler Tract.</p><p><img src='images/Headreach_cuts_BankofStockton_oblique_440px.jpg' alt='' width='440' height='356' /></p><p class='imageCredit'>Courtesy of Bank of Stockton Historical Photograph Collection</p><p>Cutting these canals had dramatic consequences. After the route was straightened on the San Joaquin River near Stockton, the <em>Morning Call</em> wrote of an unforeseen impact. The river fell rapidly when the tide went out and boats were getting stuck in the mud.</p><p class='pullquoteHistorical'><img src='images/MorningCall_1894_CausedbyCuts_0411_285px.jpg' width='245' height='137' align='left' style='margin-right: 10px;' />&ldquo;This was puzzling for awhile, and then it was found that in making their calculations for the cuts the engineers had overlooked the effect on the tide.</p><p class='pullquoteHistorical'>In the old days, when the river twisted like a snake, the rise and fall of the tide in the bay did not make a difference in the San Joaquin between Stockton and Twenty-one Mile Slough of more than two feet. The reason of this was that the many curves in the stream prevented the water running out as fast as the tide fell... By this natural phenomenon the river was navigable at all hours.</p><div class='imageLeft'><p><img src='images/MorningCall_1894_CausedbyCuts_0411_200px.png' width='200' height='574' style='margin-bottom:20px;'/></p><p class='imageCredit'>California Digital Newspaper Collection</p></div><p class='pullquoteHistorical'>&lsquo;But now things have changed,&rsquo; said Pilot Arthur Robinson yesterday, &lsquo;and the water runs through those cuts at low tide as it would out of a tin pan. The tide now falls over three feet at Stockton, and at Twenty-one Mile Slough it falls nearly five feet...</p><p class='pullquoteHistorical'>... All along the river the effect of the cuts can be seen, as land is uncovered at low tide that has never been before. In some places whole acres are mud flats that used to be covered with water at all times.</p><p class='pullquoteHistorical'>The result of this has caused steamboat pilots trouble all during the summer...In those cuts there is not more than four feet of water at low tide, which is not enough for large steamers.&rsquo;&rdquo;</p><p>The intricate meandering channels affected how tidal waters flowed into and through the Delta. Through newly straightened and connected waterways, the tides could move faster and farther into the Delta. Overall, these changes have homogenized environmental conditions within the tidal Delta, making the ecosystem less diverse.</p></div></div><!-- END LIGHTBOX BODY--></div><!-- END LIGHTBOX CONTENT--></div><!-- END LIGHTBOX--><!-- STOP CUT HERE -->",
		
		
		"<!--NETWORKS OF TIDAL CHANNELS--><!-- CUT HERE --><div id='lightboxClose' onClick='javascript:hideLightbox();'></div><div class='lightbox' style='width: 500px; background-image:url(images/white_90.png); overflow:auto;'><div class='lightboxContent'><!--LIGHTBOX TITLE--><div class='lightboxTitleArea'><div class='lightboxReturnToMapIcon' style='float:left;margin-right: 10px;'><a href='javascript:backToCentralDeltaMap();'><img src='images/deltamap-thumb-34x61.png' alt='return to map' width='34' height='61' border='0' /></a></div><p class='lightboxKicker'>Central Delta Features</p><h3 class='lightboxHeadline'>Networks of Tidal Channels</h3><p class='lightboxBackLink'><a href='javascript:backToCentralDeltaMap()'>&laquo; Back to Map</a></p></div><!-- END LIGHTBOX TITLE--><!-- LIGHTBOX BODY--><div class='lightboxBody'><div class='lightbox2Col'><p class='firstGraf'>The central Delta landscape was once filled with networks of small tidal channels that branched into the surrounding wetlands. These waterways were the capillaries of the wetlands, a complex landscape where water met land. The wetlands kept the waters rich in nutrients, while the protected channels provided habitat for fish and aquatic species.</p><p>Today, the over 1,000 miles of tidal channels in the historical wetlands are no longer found in the landscape. The wetlands are mostly gone as well.</p><p><img src='images/fig-5-channelcomparison-440pxV2.gif' width='440' height='282' /></p><p class='imageCredit'>SFEI</p><p>Travelers in the mid-1800s were fooled by some of these small channels. They would follow the maze-like waterways for hours, only to discover a dead end in the dense wetlands. As more wetlands were reclaimed, these small channels were dammed and drained, as in this photo, circa 1900.</p><p><img src='images/IMG_7754_Univ_of_Pacific_440pxv2.jpg' alt='' width='440' height='270' /></p><p class='imageCredit'>Holt-Atherton Special Collections, University of the Pacific Library</p><p>This 1924 map, below left, shows a tidal channel branching off from Shag Slough as the area was being reclaimed for agriculture. Even after the channel was dammed and filled in, the lasting signature could still be seen in a 1937 aerial photo, right.</p><p><img src='images/fig-5-26-comparison_440px.jpg' width='440' height='179' /></p><p class='imageCredit'>Solano County Surveyors (left), USDA</p></div></div><!-- END LIGHTBOX BODY--></div><!-- END LIGHTBOX CONTENT--></div><!-- END LIGHTBOX--><!-- STOP CUT HERE -->",
		
		
		"<!--TULE AND WILLOWS--><!-- CUT HERE --><div id='lightboxClose' onClick='javascript:hideLightbox();'></div><div class='lightbox' style='width: 500px; background-image:url(images/white_90.png); overflow-y:auto; overflow-x:hidden;'><div class='lightboxContent'><!--LIGHTBOX TITLE--><div class='lightboxTitleArea'><div class='lightboxReturnToMapIcon' style='float:left;margin-right: 10px;'><a href='javascript:backToCentralDeltaMap();'><img src='images/deltamap-thumb-34x61.png' alt='return to map' width='34' height='61' border='0' /></a></div><p class='lightboxKicker'>Central Delta Features</p><h3 class='lightboxHeadline'>Tules Mixed with Willow</h3><p class='lightboxBackLink'><a href='javascript:backToCentralDeltaMap()'>&laquo; Back to Map</a></p></div><!-- END LIGHTBOX TITLE--><!-- LIGHTBOX BODY--><div class='lightboxBody'><div class='lightbox2Col'><p class='firstGraf'>The Delta landscape was largely made up of tules, a dense, reed-like plant that can grow over 10 feet tall. While these plants were most common, other species successfully grew alongside.</p><p><img src='images/Yardley-Photo-LB67-712-41_clip_440px.jpg' width='440' height='329' /></p><p class='imageCredit'>Courtesy of The Haggin Museum, Stockton, CA</p><p>Here, an early 1900s photograph titled &ldquo;View of Island Land Before Reclamation&rdquo; shows tules and, intermixed with them, clumps of willows. This pattern of vegetation is also reflected by an article in the <em>Pacific Rural Press</em> newspaper in 1871.</p><p class='pullquoteHistorical'>&quot;The banks... are almost uniformly destitute of bushes and have no trees of any size, while the centers of the islands are dotted with bunches of willows, and the tules are thinner and shorter....&quot;</p><p>An 1850 survey map of the San Joaquin River shows what was seen from a boat through hand drawn symbols of tules and clumps of willow. The interior of the marshes is left empty. Early records of the Delta wetlands depended largely on how the author was traveling.</p><p><img src='images/Gibbes_1850_detail-of-willows_440pxV2.jpg' alt='' width='440' height='297' /></p><p class='imageCredit'>Courtesy of UC Davis Shields Library</p></div></div><!-- END LIGHTBOX BODY--></div><!-- END LIGHTBOX CONTENT--></div><!-- END LIGHTBOX--><!-- STOP CUT HERE -->",
		
		"<!--FRESHWATER--><!-- CUT HERE --><div id='lightboxClose' onClick='javascript:hideLightbox();'></div><div class='lightbox' style='width: 640px; background-image:url(images/white_90.png); overflow:auto;'><div class='lightboxContent'><!--LIGHTBOX TITLE--><div class='lightboxTitleArea'><div class='lightboxReturnToMapIcon' style='float:left;margin-right: 10px;'><a href='javascript:backToDeltaMap();'><img src='images/deltamap-thumb-34x61.png' alt='return to map' width='34' height='61' border='0' /></a></div><p class='lightboxKicker'>Central Delta Features</p><h3 class='lightboxHeadline'>Where Freshwater Meets Saltwater</h3><p class='lightboxBackLink'><a href='javascript:backToDeltaMap()'>&laquo; Back to Map</a></p></div><!-- END LIGHTBOX TITLE--><!-- LIGHTBOX BODY--><div class='lightboxBody'><div class='lightbox3Col'><p class='firstGraf'>As a part of the San Francisco Estuary, the Delta is intimately tied to the tidal forces of San Francisco Bay. Twice a day, water levels rise and fall throughout the estuary, pushing saltwater and freshwater back and forth. An 1850 navigational chart shows the mouth of the Delta.</p><p>The boundary between freshwater and saltwater fluctuates depending on the tide, season and annual runoff. During the winter, high river flows push the saltwater gradient farther back towards the bay. In the summer, when less freshwater flows into the Delta, the saltwater moves upstream.</p><p>Evidence suggests that historically, saltwater didn't go far into the Delta very often. In the map at right, this transitional salinity zone can be seen in pink. Early travelers also described it:</p><p class='pullquoteHistorical'>&quot;It was now very fresh, but we noted that it was changeable.&quot;<br /><span style='font-size:11px;'>&mdash;Juan Bautista de Anza and Fray Pedro Font on one of the first Spanish explorer expeditions, April 3, 1776 at the mouth of the San Joaquin River.</span></p><p class='pullquoteHistorical'>&quot;We found the water perfectly sweet.&quot;<br /><span style='font-size:11px;'>&mdash; Captain Belcher, October 26, 1837 at the entrance to the Sacramento River</span></p><p class='pullquoteHistorical'>&quot;It is such as is peculiar to both salt and fresh water marshes - Some tule and some salt grass...Sometimes fresh sometimes salt [water]. In summer season high tide would be salt&quot;<br /><span style='font-size:11px;'>&mdash; K. W. Taylor testifying in a land grant court case in 1865.</span></p><p>Over time, water at the mouth of the Delta became saltier for longer periods of time. This is thought to be primarily due to changes in timing and volume of the freshwater flows &mdash; a result of water withdrawals upriver and water exports from the Delta to supply agriculture and California's growing population.</p><p>The Delta's geometry has also changed dramatically. Main channels have been widened, deepened, and straightened, and small channels have been diked off, affecting how tidewater moves through the Delta. Today, the location of this zone of low salinity is thought to influence the success of several native Delta fish species.</p></div><div class='lightbox3Col'><p><img src='images/4658012_Suisun_Vallejobays_1850_clip_281px.jpg' width='281' height='281' /></p><p class='imageCredit'>David Rumsey Map Collection</p><p><img src='images/tidal_area_v3_399x600.jpg' width='281' height='422' /></p><p class='imageCredit'>San Francisco Estuary Institute</p></div></div><!-- END LIGHTBOX BODY--></div><!-- END LIGHTBOX CONTENT--></div><!-- END LIGHTBOX--><!-- STOP CUT HERE -->",


			"<!--SOUTH DELTA--><div class='lightbox' style='width: 340px; height:610px; overflow:hidden; sbackground-image:url(images/black_40.png);display:block;top:20px;left:30px; color:#efefef;font-family: Mako, sans-serif;'><div class='lightboxContent'><!--LIGHTBOX TITLE--><div class='lightboxTitleArea'><!--div class='lightboxReturnToMapIcon' style='float:left;margin-right: 10px;'><img src='images/deltamap-thumb-34x61.png' width='34' height='61' alt='return to map' /></div--><p style='text-transform:uppercase; font-size:11px;letter-spacing:0.1px;font-family:Arial, sans-serif;margin-bottom:-20px;'>South Delta</p><h3 class='lightboxHeadline' style='width:300px;'>Where Floodplains Meet the Tides</h3><p class='lightboxBackLinkWhite'><a href='javascript:backToDeltaMap()'>&laquo; Back to Delta Map</a></p></div><br clear='all' /><!-- END LIGHTBOX TITLE--><!-- LIGHTBOX BODY--><div class='lightboxBody'><div class='lightbox3Col' style='font-size:13px;'><p>The sinuous San Joaquin River and its many branches sculpted the south Delta landscape. Numerous side channels absorbed the river&rsquo;s seasonal floodwaters, connecting them to the surrounding floodplain and gradually merging with tidal wetlands to the north. Patches of different habitat were interspersed within the wetlands, including willow thickets, grasslands, and lakes and ponds.</p><p>Today, flows from the San Joaquin River have been altered by dams and water diversions. Connections no longer exist between the river and its floodplain.</p><br clear='all' /></div><!-- END LIGHTBOX BODY--></div><!-- END LIGHTBOX CONTENT--></div><!-- END LIGHTBOX--><!-- STOP CUT HERE -->",
		


		"<!--COMPLEX--><!-- CUT HERE --><div id='lightboxClose' onClick='javascript:hideLightbox();'></div><div class='lightbox' style='width: 520px; background-image:url(images/white_90.png); overflow:auto;'><div class='lightboxContent'><!--LIGHTBOX TITLE--><div class='lightboxTitleArea'><div class='lightboxReturnToMapIcon' style='float:left;margin-right: 10px;'><a href='javascript:backToSouthDeltaMap();'><img src='images/deltamap-thumb-34x61.png' alt='return to map' width='34' height='61' border='0' /></a></div><p class='lightboxKicker'>South Delta Features</p><h3 class='lightboxHeadline'>A Complex Floodplain</h3><p class='lightboxBackLink'><a href='javascript:backToSouthDeltaMap()'>&laquo; Back to Map</a></p></div><!-- END LIGHTBOX TITLE--><!-- LIGHTBOX BODY--><div class='lightboxBody'><div class='lightbox2Col'><p class='firstGraf'>The south Delta landscape was a complex place where the river met the tides. Floods from the San Joaquin River began in late spring and often lasted until mid-July, as snow melted in the Sierra Nevada. They inundated the San Joaquin River's floodplain, much like this 1938 flood scene, where only the tops of tall bushes and trees can be seen.</p><p class='firstGraf'><img src='images/DurhamFerry_Floods_BankofStockton_440px.jpg' width='440' height='274' /></p><p class='imageCredit'>Courtesy the Bank of Stockton Historical Photograph Collection</p><p>Jacques Moerenhout wrote of his struggle to cross the South Delta in July 1848. His account reveals a wet landscape:</p><p class='pullquoteHistorical'>&ldquo;There were more ponds, swamps and sloughs, very difficult and very dangerous to cross, but it had to be done for there was no other way.</p><p class='pullquoteHistorical'>The second was a slough more than fifty meters long... Several oxen had perished there and one of our horses came near being stuck in it. But it also we crossed without accident. The third was a little lake... The horses were forced into the water and swam across. After this lagoon we still had [to pass over] several more very difficult sloughs in which animals which had perished there were to be seen all about.&rdquo;</p><p>This wet summer landscape also supplied another challenge to Moerenhout: mosquitoes.</p><p class='pullquoteHistorical'>&ldquo;All the more disagreeable from the fact that this place is very unhealthful and that one is in a continual torture on account of the mosquitoes which attack you in swarms, and as all who were there assured us, allow you no repose day or night.</p><p class='pullquoteHistorical'>Once arrived on the other bank... here there were mosquitoes by the million, we did not know were to take refuge, and even the horses were so tormented that they were kicking and we were running the risk of losing them.&rdquo;</p><p>Dense bands of willows and oaks lined the riverbanks, some of which can be seen in this view of the San Joaquin Bridge in 1901. Behind them, a matrix of shrubs and wetlands was dotted with side-channels, ponds, and lakes. These floodplains provided valuable habitat for fish, especially for young Chinook salmon as they migrated out of the San Joaquin River on their way to the Pacific Ocean.</p><p><img src='images/Mathews_1901_SJBr_CASL_440px.jpg' width='440' height='293' /></p><p class='imageCredit'>Courtesy of the California State Library</p></div></div><!-- END LIGHTBOX BODY--></div><!-- END LIGHTBOX CONTENT--></div><!-- END LIGHTBOX--><!-- STOP CUT HERE -->",
		
		"<!--RAFTS--><!-- CUT HERE --><div id='lightboxClose' onClick='javascript:hideLightbox();'></div><div class='lightbox' style='width: 680px; background-image:url(images/white_90.png); overflow:auto;'><div class='lightboxContent'><!--LIGHTBOX TITLE--><div class='lightboxTitleArea'><div class='lightboxReturnToMapIcon' style='float:left;margin-right: 10px;'><a href='javascript:backToSouthDeltaMap();'><img src='images/deltamap-thumb-34x61.png' alt='return to map' width='34' height='61' border='0' /></a></div><p class='lightboxKicker'>South Delta Features</p><h3 class='lightboxHeadline'>Rafts of Habitat</h3><p class='lightboxBackLink'><a href='javascript:backToSouthDeltaMap()'>&laquo; Back to Map</a></p></div><!-- END LIGHTBOX TITLE--><!-- LIGHTBOX BODY--><div class='lightboxBody'><div class='lightbox3Col'><p><img src='images/A_raft_sj_gibbes_1850_merge_rotated_285px.jpg' width='285' height='285' /></p><p class='imageCredit'>UC Davis Shields Library</p><p><img src='images/B_raft_USGS19091918_285px.jpg' width='285' height='285' /></p><p class='imageCredit'>USGS</p><p><img src='images/C_raft_USDA2005_285px.jpg' width='285' height='299' /></p><p class='imageCredit'>USDA</p></div><div class='lightbox310px'><p class='firstGraf'>In some places along the river, travelers found their course obstructed by large masses of tangled, woody debris. Geologist Charles Drayton Gibbes labeled one in this 1850 map, left, as a &ldquo;raft&rdquo; of debris. He wrote:</p><p class='pullquoteHistorical'>&quot;I came to a raft of large timber, and after some hard work in cutting and sawing logs, we succeeded in dragging our boat through. At the foot of the raft the river divides, taking the left, which is the largest, although much smaller than the main channel, and filled with floating drift wood that made it difficult to proceed.&quot;</p><p>This is the same location, where, in the 1870s, a new channel was dug to divert the river around a mass of woody debris, as seen in this US Geological Survey map drawn in the 1910s. State Engineer E. E. Tucker described the channel in 1879:</p><p class='pullquoteHistorical'>&ldquo;There were a great many old logs and an immense amount of driftwood and rubbish in Old River, and we removed most of it.</p><p class='pullquoteHistorical'>Below Salmon Slough the river was very narrow and so badly choked up with driftwood that it was deemed advisable to build a dam on it at the head of Salmon Slough and turn the water through a new channel.</p><p class='pullquoteHistorical'>A canal, 1,600 feet long, was cut from the head of Salmon Slough, across a low piece of land to a part of the slough that was comparatively wide and deep.&rdquo;</p><p>These rafts of woody material would have slowed water flows to create valuable habitat for a number of fish species, including Sacramento perch, young migrating salmon and the now-extinct thicktail chub. Today, without the frequent flooding and surrounding riparian forest, these features no longer form.</p></div></div><!-- END LIGHTBOX BODY--></div><!-- END LIGHTBOX CONTENT--></div><!-- END LIGHTBOX--><!-- STOP CUT HERE -->",
		
		"<!--WALTHALL SLOUGH--><!-- CUT HERE --><div id='lightboxClose' onClick='javascript:hideLightbox();'></div><div class='lightbox' style='width: 660px;height:610px; background-image:url(images/white_80.png); overflow:auto;'><div class='lightboxContent'><!--LIGHTBOX TITLE--><div class='lightboxTitleArea'><div class='lightboxReturnToMapIcon' style='float:left;margin-right: 10px;'><a href='javascript:backToDeltaMap();'><img src='images/deltamap-thumb-34x61.png' alt='return to map' width='34' height='61' border='0' /></a></div><p class='lightboxKicker'>South Delta Features</p><h3 class='lightboxHeadline'>Branching River Channels</h3><p class='lightboxBackLink'><a href='javascript:backToDeltaMap()'>&laquo; Back to Map</a></p></div><!-- END LIGHTBOX TITLE--><br clear='all' /><!-- LIGHTBOX BODY--><div class='lightboxBody'><div class='lightbox380px' style:'width:390px;margin-right:10px;'><p><img src='images/walthall-slough-4up_380pxV2.gif' width='380' height='380' /></p><p class='imageCredit'>Peter J. Shields Library Map Collection, UC Davis (1887), Earth Sciences Map Library, UC Berkeley (1915), USDA (Present Day)</p></div><div class='lightbox4Col' style='margin-left:10px;'><p class='firstGraf'>A complex maze of channels branched off from the San Joaquin River, like those shown here at Walthall Slough. These waterways would have absorbed the powerful flood stages of the river, connecting it to the floodplains.</p><p>Here, a primary channel of Walthall Slough breaks off from the river and reconnects further downstream. Examining sources through time, including examples shown here, conveys the landscape-scale change, where the original complexity has been simplified to a few remnant channels today.</p></div></div><!-- END LIGHTBOX BODY--></div><!-- END LIGHTBOX CONTENT--></div><!-- END LIGHTBOX--><!-- STOP CUT HERE -->",
		
		"<!--NATIVE PEOPLES--><!-- CUT HERE --><div id='lightboxClose' onClick='javascript:hideLightbox();'></div><div class='lightbox' style='width: 950px; height:610px; background-image:url(images/white_90.png); overflow:auto;'><div class='lightboxContent'><!--LIGHTBOX TITLE--><div class='lightboxTitleArea'><div class='lightboxReturnToMapIcon' style='float:left;margin-right: 10px;'><a href='javascript:backToDeltaMap();'><img src='images/deltamap-thumb-34x61.png' alt='return to map' width='34' height='61' border='0' /></a></div><p class='lightboxKicker'>Around the Delta</p><h3 class='lightboxHeadline'>Native Peoples</h3><p class='lightboxBackLink'><a href='javascript:backToDeltaMap()'>&laquo; Back to Map</a></p></div><!-- END LIGHTBOX TITLE--><!-- LIGHTBOX BODY--><div class='lightboxBody'><div class='lightbox1Col590'><p><img src='images/507_Duran_1824_UCDavis_sharpen_600px.jpg' width='600' height='412' /></p><p class='imageCredit'>UC Davis Shields Library</p></div><div class='lightbox3Col'><p class='firstGraf'>For thousands of years, indigenous peoples lived in and around the Delta. Tribes harvested acorns, grasses, and willows and used the tall tules to construct rafts and other products. They hunted deer and elk and fished for salmon in the Delta. With the arrival of Spanish missionaries in the early 1800s, native groups declined rapidly as disease spread and they were relocated to the missions.</p><p>This map, one of the earliest of San Francisco Bay and the Delta, was drawn by Spanish missionary Father Narciso Dur&aacute;n in 1824. It shows more than a dozen tribal communities in the Delta (shown in the upper right of the map, as indicated by the letter &rdquo;I&ldquo;).</p><br clear='all' /></div></div><!-- END LIGHTBOX BODY--></div><!-- END LIGHTBOX CONTENT--></div><!-- END LIGHTBOX--><!-- STOP CUT HERE -->",

		"<!--RECLAMATION--><!-- CUT HERE --><div id='lightboxClose' onClick='javascript:hideLightbox();'></div><div class='lightbox' style='width: 520px; background-image:url(images/white_90.png); overflow:auto;'><div class='lightboxContent'><!--LIGHTBOX TITLE--><div class='lightboxTitleArea'><div class='lightboxReturnToMapIcon' style='float:left;margin-right: 10px;'><a href='javascript:backToDeltaMap();'> <img src='images/deltamap-thumb-34x61.png' alt='return to map' width='34' height='61' border='0' /> </a></div><p class='lightboxKicker'>Around the Delta</p><h3 class='lightboxHeadline'>Reclaiming Wetlands</h3><p class='lightboxBackLink'><a href='javascript:backToDeltaMap()'> &laquo; Back to Map</a></p></div><!-- END LIGHTBOX TITLE--><!-- LIGHTBOX BODY--><div class='lightboxBody'><div class='lightbox2Col'><p class='firstGraf'>After California became a state in 1850, it was granted millions of acres of wetlands through the Swamp and Overflowed Land Act. The Act was passed by the federal government to encourage the drainage of &quot;swamp and overflowed&quot; lands. Land in the Delta sold for $1 an acre, with a limit of 320 acres. The limit was increased to 640 acres in 1859.</p><p class='firstGraf'><img src='images/Tule_1916_440px.jpg' width='440' height='283' /></p><p class='imageCredit'>UC Davis Special Collections</p><p>In the 1860s, a new era of reclamation began in the Delta as local reclamation districts were formed. Levees in the central Delta were built, often using the surrounding peat soils, to cut the wetlands off from tidal waters. Along the rivers to the north and south, the levees held back floods that historically filled the basins. Dense stands of tules were flattened and burned to make way for farmland.</p><p>In the early decades, the grueling work was mostly done by hand by Chinese laborers, as seen in this drawing.</p><p><img src='images/Overland_Monthly_vol24_no14103230315_400_clip_440px.jpg' width='440' height='277' /></p><p class='imageCredit'>Courtesy of University of Michigan, Making of America</p><p>Later, steam-powered dredgers sped up the work, like this clam-shell dredge, shown building up the height of an artificial levee around 1910. By 1890, the majority of the Delta had been leveed and by 1930, it was virtually entirely reclaimed. The levees continued to break, requiring costly work to repair them and drain the land, something that still happens today.</p><p><img src='images/CSLonline_clam-shell_dredge_440px.jpg' width='440' height='292' /></p><p class='imageCredit'>Courtesy of the California State Library</p></div></div><!-- END LIGHTBOX BODY--></div><!-- END LIGHTBOX CONTENT--></div><!-- END LIGHTBOX--><!-- STOP CUT HERE -->",
		
		"<!--RIVER OF SALMON--><!-- CUT HERE --><div id='lightboxClose' onClick='javascript:hideLightbox();'></div><div class='lightbox' style='width: 520px; background-image:url(images/white_90.png); overflow:auto;'><div class='lightboxContent'><!--LIGHTBOX TITLE--><div class='lightboxTitleArea'><div class='lightboxReturnToMapIcon' style='float:left;margin-right: 10px;'><a href='javascript:backToDeltaMap();'><img src='images/deltamap-thumb-34x61.png' alt='return to map' width='34' height='61' border='0' /></a></div><p class='lightboxKicker'>Around the Delta</p><h3 class='lightboxHeadline'>A River of Salmon</h3><p class='lightboxBackLink'><a href='javascript:backToDeltaMap()'>&laquo; Back to Map</a></p></div><!-- END LIGHTBOX TITLE--><!-- LIGHTBOX BODY--><div class='lightboxBody'><div class='lightbox2Col'><p class='firstGraf'>The Delta once teemed with salmon. Each year, adult salmon came through the Delta on their way to spawning grounds upriver. </p><p class='firstGraf'><img src='images/252_Hutchings_1862_440px.jpg' width='440' height='348' /></p><p class='imageCredit'></p><p>Edwin Bryant described this on a journey through the Delta in 1846-7.</p><p class='pullquoteHistorical'>&quot;It abounds in fish, the most valuable of which is the salmon. These salmon are the largest and fattest I have ever seen. I have seen salmon taken from the Sacramento five feet in length.&quot;</p><p>Commercial salmon fishing in the Delta began in the 1850s, and by 1882, there were 20 canneries established, as depicted in the drawing below. A recorded 10.8 million pounds of salmon were caught in 1880, with the peak catch in 1909 at 12 million pounds.</p><p><img src='images/Pacific_Coast_first_salmon_cannery_440px.jpg' width='440' height='211' /></p><p class='imageCredit'>NOAA Central Library Historical Fisheries Collection</p><p>By the late 1800s, accounts of declining salmon populations began to emerge. The <em>Stockton Independent</em> reported in 1874 that salmon &quot;had become almost extinct from these streams [San Joaquin tributaries].&quot; Damming of rivers, loss of habitat, and decades of fishing all contributed to their decline over more than 100 years.</p><p>The last cannery on the Sacramento River went out of business in 1919. Today, winter-run Chinook salmon are endangered.</p><p class='pullquoteHistorical'>&nbsp;</p></div></div><!-- END LIGHTBOX BODY--></div><!-- END LIGHTBOX CONTENT--></div><!-- END LIGHTBOX--><!-- STOP CUT HERE -->",
		
		"<!--EXPLORE--><div id='lightboxClose' onClick='javascript:hideLightbox();'></div><div class='lightbox' style='width: 345px; height:610px; background-image:url(images/black_40.png);color:#fff; overflow:hidden;'><div class='lightboxContent'><!--LIGHTBOX TITLE--><div class='lightboxTitleArea'><h3 class='lightboxHeadline' style='margin-top:-9px;margin-bottom:-5px;'>Explore the Delta<br /> Through Time</h3></div><!-- END LIGHTBOX TITLE--><!-- LIGHTBOX BODY--><div class='lightboxBody'><div class='lightbox3Col'><p>You've seen how historical ecologists pieced together a portrait of the Delta as it was from thousands of historical sources. Here you can explore how the Delta has changed over time through their carefully constructed early 1800s habitats map and other imagery.</p><br clear='all' /></div><!-- END LIGHTBOX BODY--></div><!-- END LIGHTBOX CONTENT--></div><!-- END LIGHTBOX--><!-- STOP CUT HERE -->",
		
		
		
		"<!-- CREDITS --><!-- CUT HERE --><div id='lightboxClose' onClick='javascript:changeItem(getCurrentItem());'></div><div class='lightbox' style='width: 950px; height:610px; background-image:url(images/white_90.png); overflow:hidden;'><div class='lightboxContent'><!--LIGHTBOX TITLE--><div class='lightboxTitleArea'><h3 class='lightboxHeadline'>Credits and Acknowledgements</h3></div><!-- END LIGHTBOX TITLE--><!-- LIGHTBOX BODY--><div class='lightboxBody'><div class='lightbox4Col'><p class='lightboxTextOverview'>Questions or comments?<br />Email <a href='mailto:westcenter@stanford.edu'>westcenter@stanford.edu</a></p><p class='lightboxTextOverview' ><strong>For More Information</strong><br />Read more <a href='javascript:showLightbox(23);'>about the historical ecology research project on which this report is based</a>.	</p><p class='lightboxTextOverview'><br /></p><p class='lightboxReturnPrompt' style='text-align: right'><a href='javascript:changeItem(getCurrentItem());'>&laquo; Return to the Map</a></p></div>	<div style='float:left; margin-right:10px;'><img src='images/clearpixel.png' width='50' height='300' border='0' /></div>		<div class='lightbox2Col'><h2></h2><p class='chapterHed'>Written and designed by</p><p class='firstGraf'>Lauren Sommer, KQED<br />Alison Whipple, SFEI-ASC<br />Geoff McGhee, Bill Lane Center for the American West, Stanford University</p><p></p><p class='chapterHed'>KQED QUEST</p><p>Lauren Sommer<br />Andrea Kissack</p><p class='chapterHed'>The San Francisco Estuary Institute&dash;Aquatic Science Center</p><p>Robin Grossinger<br />Alison Whipple<br /></p><p class='chapterHed'>The Bill Lane Center for the American West, Stanford University</p><p>Jon Christensen<br />Geoff McGhee<br />Maria Santos</p><p>&nbsp;</p><p>&nbsp;</p></div><p class='lightboxReturnPrompt'><a href='javascript:changeItem(getCurrentItem());'></a></p></div></div></div>",/**/
		
		"<!--CITATIONS--><!-- CUT HERE --><div id='lightboxClose' onClick='javascript:changeItem(getCurrentItem());'></div><div class='lightbox' style='width: 950px; background-image:url(images/white_90.png); overflow:auto;'><div class='lightboxContent'><!--LIGHTBOX TITLE--><div class='lightboxTitleArea'><p class='lightboxKicker'>About this Project</p><h3 class='lightboxHeadline'>Sources for this Report</h3></div><!-- END LIGHTBOX TITLE--><!-- LIGHTBOX BODY--><div class='lightboxBody'><div class='lightbox4Col'><p class='chapterHed'>Questions or comments?</p><p class='lightboxTextOverview'>Email <a href='mailto:westcenter@stanford.edu'> westcenter@stanford.edu</a></p><p class='chapterHed'>For More Information</p><p class='lightboxTextOverview'>Report from KQED&rsquo;s California Watch: <a href='//science.kqed.org/quest/audio/californias-deadlocked-delta-can-we-bring-back-what-weve-lost/' target='_blank'> California&rsquo;s Deadlocked Delta: Can We Bring Back What We&rsquo;ve Lost?</a></p><p class='lightboxTextOverview'>View <a href='javascript:showCredits();'> credits &raquo;</a></p><p class='lightboxTextOverview'><br /></p><p class='lightboxReturnPrompt' style='text-align: right'><a href='javascript:changeItem(getCurrentItem());'> &laquo; Return to the Map</a></p></div><div style='float:left; margin-right:10px;'><img src='images/clearpixel.png' width='50' height='300' border='0' /></div><div class='lightbox2Col'><p class='firstGraf'>The draft map and accompanying report featured here are part of the Sacramento-San Joaquin Delta Historical Ecology Study conducted by the San Francisco Estuary Institute-Aquatic Science Center. The map and report are in currently in review and will be available for download in early July on the <a href='//www.sfei.org/DeltaHEStudy'> SFEI-ASC website</a>. This study was funded by and performed in collaboration with the <a href='//www.dfg.ca.gov/ERP/'> California Department of Fish and Game, Ecosystem Restoration Program. </a></p><p class='chapterHed'>Report</p><p>Whipple AW, Grossinger RM, Rankin D, Stanford B, Askevold RA, Salomon MN, Striplen CJ, Beller EE. In preparation. <em> Sacramento-San Joaquin Delta Historical Ecology Investigation: Exploring Patterns and Process</em>. Prepared for the California Department of Fish and Game, Ecosystem Restoration Program. A report of SFEI-ASC's Historical Ecology Program, San Francisco Estuary Institute-Aquatic Science Center, Richmond, CA.</p><p class='chapterHed'>Basemaps</p><p>Hickson H, Keeler-Wolf T. 2007. <em> Vegetation and land use classification and map of the Sacramento-San Joaquin River Delta. </em> California Department of Fish and Game.<br /><br />U.S. Geological Survey (USGS). 1909-1918. Topographic Quadrangles, California : 7.5-minute series 1:31,680.<br /><br />U.S. Department of Agriculture (USDA), Western Division Laboratory. 1937-9. [Aerial photos of Contra Costa, Sacramento, San Joaquin, Solano, and Yolo counties]. Scale: 1:20,000. Agricultural Adjustment Administration (AAA). <em> Courtesy of Peter J. Shields Library, UC Davis and Earth Sciences Library, UC Berkeley. </em><br /></p><br /><p class='chapterHed'>References</p><br /><b> Page 6 </b><br /><br />McCurry Foto Co. 1927. North Sacramento Flood Scenes. <em> Courtesy of California State Library. </em><br /><br />Secretary of War, U.S. Army. 1873. Map of the San Joaquin, Sacramento and Tulare Valleys. <em> Courtesy of David Rumsey Map Collection. </em><br /><br />Unknown. ca. 1900. Yolo Causeway, 81/01/65. <em> Courtesy of Center for Sacramento History. </em><br /><br />Wright W. ca. 1850a. <em> Lost in the tule marshes. Courtesy of California Historical Society. </em><br /><br /><b> Page 7 </b><br /><br />California Department of Water Resources (CDWR). 2008. California DWR LiDAR project.<br /><br />Reece TW. 1864. Map of the Swamp Lands in District No. 2. <em> Courtesy of the California State Lands Commission. </em><br /><br />Unknown. ca. 1925. Duck hunting in the Delta. Myers Collection, 1989/041/0422. <em> Courtesy of Center for Sacramento History. </em><br /><br />Wright W. ca. 1850a. <em> Lost in the tule marshes. Courtesy of California Historical Society. </em><br /><br />Wright W. ca. 1850b. <em> Hunting for market. Courtesy of California Historical Society. </em><br /><br /><b> Page 8 </b><br /><br />Culberg E, Dougal WH. Towers JT. 1852. <em> Mark for entering the second section of the Middle Fork of the Sacramento River, Cadwalader Ringgold. </em> Washington. <em> Courtesy of the David Rumsey Map Collection. </em><br /><br />Lewis WJ. U.S. Department of the Interior, Bureau of Land Management Rectangular Survey, California, 1859b. <em> Field notes of N.E.&amp;W. Boundary lines of Township 6 North Range 4 East Mount Diablo Meridian, California. 66-12. Courtesy of Bureau of Land Management. </em><br /><br />United States Geological Survey (USGS). 1905. W. R. McKean in tules ’05. Hubert F. Rogers Collection. 2006/028/115. <em> Courtesy of Center for Sacramento History. </em><br /><br /><b> Page 11 </b><br /><br />Hutchings JM. 1862. <em> Scenes of wonder and curiosity in California. </em> San Francisco, CA: Hutchings &amp; Rosenfield.<br /><br /><em> The Morning Call. </em> 1894. Caused by 'cuts'. September 19. <em> Courtesy of California Digital Newspaper Collection. </em><br /><br />Unknown. 1930. Dredging in Tinsley, Fern, Headreach and Tule Islands. <em> Courtesy of Bank of Stockton Historical Photographic Collection. </em><br /><br /><b> Page 12 </b><br /><br />Unknown. ca. 1900. Dyer Photograph Collection, MS 229. <em> Courtesy of Holt-Atherton Special Collections, University of Pacific Library. </em><br /><br />U.S. Department of Agriculture (USDA), Western Division Laboratory. 1937-9. [Aerial photos of Contra Costa, Sacramento, San Joaquin, Solano, and Yolo counties]. Scale: 1:20,000. Agricultural Adjustment Administration (AAA). <em> Courtesy of Peter J. Shields Library, UC Davis and Earth Sciences and Map Library, UC Berkeley. </em><br /><br />Wheeler AS. 1920. Map of the Liberty Reclamation District. <em> Courtesy of Solano County Surveyors Office. </em><br /><br /><b> Page 13 </b><br /><br />Gibbes CD. W.B. Cooke &amp; Co. 1850a. Map of San Joaquin River. San Francisco, CA. <em> Courtesy of Peter J. Shields Library Map Collection, UC Davis. </em><br /><br />Pacific Rural Press. 1871. Inspection of the tule lands. November 4. <em> Courtesy of California Digital Newspaper Collection. </em><br /><br />View of Island Land Before Reclamation. ca. 1900. Ralph Yardley Collection, LB67-712-41. <em> Courtesy of the Haggin Museum. </em><br /><br /><b> Page 14 </b><br /><br />Anza and Brown AK. 1998. <em> The Anza Expedition in eastern Contra Costa and eastern Alameda Counties, California. </em> Anza Trail Team, Western Region, National Park Service.<br /><br />Belcher E, Simpkinson FG, Pierce RA, et al. 1979. H.M.S. Sulphur on the Northwest and California coasts, 1837 and 1839 : the accounts of captain Edward Belcher and midshipman Francis Guillemard Simpkinson. Kingston, Ontario: Limestone press.<br /><br />Ringgold C. 1850. Chart of Suisun and Vallejo Bays. <em> Courtesy of the David Rumsey Map Collection. </em><br /><br />Taylor KW. 1865. <em> U.S. v. Jonathon Stevenson et al., Land Case No. 364 ND [Los Medanos], U.S. District Court, Northern District. p. 452. Courtesy of the Bancroft Library, UC Berkeley. </em><br /><br /><b> Page 16 </b><br /><br />Mathews. 1901. San Joaquin River and Bridge. <em> Courtesy of California State Library. </em><br /><br />Moerenhout JA. [1849]1935. <em> The inside story of the gold rush. </em> First Person Narratives. <em> San Francisco, CA: California Historical Society. Courtesy.of Library of Congress. </em><br /><br />Unknown. 1938. Flooding at Durham Ferry Road, aerial view. <em> Courtesy of Bank of Stockton Historical Photographic Collection. </em><br /><br /><b> Page 17 </b><br /><br />Gibbes CD. W.B. Cooke &amp; Co. 1850a. Map of San Joaquin River. San Francisco, CA. <em> Courtesy of Peter J. Shields Library Map Collection, UC Davis. </em><br /><br />Gibbes, CD. <em> Stockton Times. </em> 1850b. Navigation on the San Joaquin. June 8.<br /><br />Tucker EE. 1879d. Field notes, Book No. 92. California State Engineering Department. <em> Courtesy of California State Archives. </em><br /><br />U.S. Department of Agriculture (USDA). 2009. [Natural color aerial photos of Contra Costa, Sacramento, San Joaquin, Solano, Yolo counties]. Ground resolution: 1m. National Agriculture Imagery Program (NAIP). Washington, DC.<br /><br />U.S. Geological Survey (USGS). 1909-1918. Topographic Quadrangles, California: 7.5-minute series 1:31,680.<br /><br /><b> Page 18 </b><br /><br />Hall WH. California Department of Engineering. 1887. Topographical and irrigation map of the Great Central Valley of California. Sacramento, CA. <em> Courtesy of Peter J. Shields Library Map Collection, UC Davis. </em><br /><br />Unknown. 1915. San Joaquin, the gateway county of California. <em> Courtesy of Earth Sciences &amp; Map Library, UC Berkeley. </em><br /><br />U.S. Department of Agriculture (USDA). 2009. [Natural color aerial photos of Contra Costa, Sacramento, San Joaquin, Solano, Yolo counties]. Ground resolution: 1m. National Agriculture Imagery Program (NAIP). Washington, DC.<br /><br /><b> Page 19 </b><br /><br />Duran N. 1824. Plano topogr&aacute;fico de la mision de San Jos&eacute;. <em> Courtesy of The Bancroft Library, UC Berkeley. </em><br /><br /><b> Page 20 </b><br /><br />Peatfield JJ. 1894. Dredging on the Pacific Coast. Overland monthly and Out West magazine. 24(141):315-327. <em> Courtesy of Making of America Journal Articles. </em><br /><br />Unknown ca. 1910. McCurry Foto Co. <em> Courtesy of the California State Library. </em><br /><br />Unknown. 1916. Tule. D-118, Box 7, 8:2. <em> Courtesy of UC Davis Special Collections. </em><br /><br /><b> Page 21 </b><br /><br />Bryant E. 1848. <em> What I saw in California: being the journal or a tour; by the emigrant route and south pass of the Rocky Mountains, across the continent of North America, the Great Desert basin, and through California, in the years 1846, 1847. </em> 2nd edition. New York, NY: D. Appleton &amp; Company; Philadelphia, PA: George S. Appleton.<br /><br />Hutchings JM. 1862. <em> Scenes of wonder and curiosity in California.</em>San Francisco, CA: Hutchings &amp; Rosenfield.<br /><br /><br /></div></div><!-- END LIGHTBOX BODY--></div><!-- END LIGHTBOX CONTENT--></div><!-- END LIGHTBOX--><!-- STOP CUT HERE -->",
		
		
		
		"<div class='lightboxContainer'><div class='lightboxContainer'><div id='lightboxClose' onClick='javascript:hideLightbox();'></div><div class='lightbox' style='height:400px; padding-top: 150px;'><div class='lightboxContent'><div style='position:absolute;width:500px; height:300px; left: 200px;'><p>Note to the user:</p><p>You are using Microsoft Internet Explorer as your browser. This feature is best viewed with <a href='//www.google.com/chrome' target='_blank'><strong>Google Chrome</strong></a>, <a href='firefox.com' target='_blank'><strong>Mozilla Firefox</strong></a> or <a href='apple.com/safari' target='_blank'><strong>Apple Safari</strong></a>, which are all available as free downloads.</p></div></div></div></div>"
	);

	// SHOWS INTRO PANEL
	showLightbox(0);
		


}
