export const leaflet_custom_controls = `
<div class='col  WeMAST_leaflet_controls'>
	<div class="q-pr-sm q-pl-sm myRange" style="margin-top:15px;height:30px;background-color:white;">
		<div style="font-size:15px;margin-top:4px;background-color:#efefef;">
			<label> Opacity </label>
			<input type="range" min="1" max="100" value="100" id="myRange" class="slider" style="width: 150px;"> </div>
	</div>
	<div class="q-ma-xs wemast_swap" > <span class="material-icons" style="background-color:white; height:30px;" id="wemast_swap" >
	swap_horiz
	</span>
	 <span class="tooltiptext">Swap Layers</span>
	 </div>
	<div class=" q-ma-xs wemast_download"> <img style="background-color:white; height:30px;margin-top:-20px;" id="wemast_download" src="mapIcons/file_download-24px.svg">
	<span class="tooltiptext">Download tiff</span>
	 </div>
	<div class=" q-ma-xs wemast_download_map"> <img style="background-color:white; height:30px;margin-top:-20px;" id="wemast_download_map" src="uiIcons/insert_photo-24px.svg">
	<span class="tooltiptext">Download Map</span>
	</div>
	<div class=" q-ma-xs wemast_measure"> <img style="background-color:white; height:30px;margin-top:-20px;" id="wemast_measure" src="mapIcons/straighten-24px.svg"> 
	<span class="tooltiptext">Measure Distance</span>
	</div>
	<div id="base_layer_wrapper" class="row">
	<div id="show_base_layers" class="  " style="display:none;background-color:white; margin-top:14px; "> </div>
	<div class="q-ma-xs"> <img style="background-color:white; height:30px;margin-top:-20px;" id="wemast_base_layers" src="mapIcons/layers-24px.svg"> </div>
	</div>
	<div class=" q-ma-xs wemast_draw"> <img style="background-color:white; height:30px;margin-top:-20px;" id="wemast_draw" src="mapIcons/square.svg"> 
	<span class="tooltiptext">Draw Polygon</span>
	</div>
	<div class=" q-ma-xs row">
		<div class=""> <img class="zoom_ctrl_wrapper" style="background-color:white; height:30px;margin-top:-20px;margin-right:100px;" id="wemast_zoom_ctrl_in" src="mapIcons/add-24px.svg"> </div>
		
		<div class=""> <img class="zoom_ctrl_wrapper" style="background-color:white; height:30px;margin-top:-20px;" id="wemast_zoom_ctrl_out" src="mapIcons/remove-24px.svg"> </div>
	</div>

	<div class=" q-ma-xs wemast_help"> 
	<a
	href="https://github.com/sethgis/WeMAST_LTG2-Documentation/wiki" target="_blank"
	style="text-decoration:none; color:black; cursor:pointer"
  >
	<img style="background-color:white; height:30px;margin-top:-20px;" id="wemast_help" src="uiIcons/article-1.svg"> 
</a>
	<span class="tooltiptext">Help</span>
	</div>
</div>`;

/*
function names for invoking click event
wemast_zoom_ctrl_in
wemast_zoom_ctrl_out
wemast_draw
wemast_base_layers
wemast_download
*/