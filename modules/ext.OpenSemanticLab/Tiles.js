$(document).ready(async function() {
    if( $('.custom-link-tile-grid').length === 0) return; //only on pages with a custom-link-tile-grid-div

	await $.getScript("https://unpkg.com/textfit@2.4.0/textFit.js").done(function () {
		$(".custom-link-tile-grid").each(function () {
			var classes = this.className.split(/\s+/);
			var grid_width = "";
			var grid_height = "";
			var tile_width = "";
			var tile_height = "";
			
			for(var i=0;i < classes.length;i++){
				
				if(classes[i].includes("custom-link-tile-grid-size-x-")){
					grid_width = classes[i].replace("custom-link-tile-grid-size-x-", "");
					
				}
				if(classes[i].includes("custom-link-tile-grid-size-y-")){
					grid_height = classes[i].replace("custom-link-tile-grid-size-y-", "");
				}
				if(classes[i].includes("custom-link-tile-grid-tile-size-x-")){
					tile_width = classes[i].replace("custom-link-tile-grid-tile-size-x-", "");
				}
				if(classes[i].includes("custom-link-tile-grid-tile-size-y-")){
					tile_height = classes[i].replace("custom-link-tile-grid-tile-size-y-", "");
				}
			}
			
			var grid_width_unit = grid_width.replace(parseInt(grid_width),"");
			var grid_height_unit = grid_height.replace(parseInt(grid_height),"");
			var tile_width_unit = tile_width.replace(parseInt(tile_width),"");
			var tile_height_unit = tile_height.replace(parseInt(tile_height),"");
			
			$(this).css({
				width : grid_width,
				height: grid_height
			});
			//Get Data out of given <div>'s and set it to the tiles.
			$(this).find('.custom-link-tile').each( function(){
				var tile_classes = this.className.split(/\s+/);
				var title_font_size = "";
				var text_font_size = "";
				
				for(var i=0;i < tile_classes.length;i++){
					if(tile_classes[i].includes("title-font-size-")){
						title_font_size =  tile_classes[i].replace("title-font-size-","");
					}
					if(tile_classes[i].includes("text-font-size-")){
						text_font_size =  tile_classes[i].replace("text-font-size-","");
					}
				}
				
				$(this).css({
					backgroundSize:''+tile_width+' '+tile_height,
					width : tile_width,
					height: tile_height,
					lineHeight: tile_height,
					fontSize: ""+parseInt(tile_width)/5+""+tile_width_unit
				});
				$(this).prepend('<p style="visibility: hidden;">hide</p>');
				$(this).find('div').each( function(){
					if(this.className === "custom-link-tile-url"){
						$( this ).parent().wrap( "<a href='"+ $(this).text() +"'></a>" );
						$( this ).remove();
					}
					if(this.className === "custom-link-tile-title"){
						var tile_title = $(this).text();
						$(this).text("");
						$(this).append('<div class="tile-title"><p>'+tile_title+'</p></div>');
						
					}
					
					if(this.className === "custom-link-tile-text"){
						var tile_text = $( this ).text();
						var tile_for_text = $( this ).parent().find(".custom-link-tile-title");
						
					}
					
					if(this.className === "custom-link-tile-tooltip"){
						var tile_tooltip = $( this ).text();
						
						$(this).parent().parent().attr("title", tile_tooltip);
						$( this ).remove();
					}
					
					if(this.className === "custom-link-tile-image"){
						
						$( this ).parent().css({
							backgroundImage: "url('"+$(this).find('img').attr('src')+"')",
							backgroundRepeat: "no-repeat"
							
						});
						$( this ).remove();
					}
				});
					//The title div size is set depending on the specified tile size.
					//The textFit() function sets the font-size of the title.
					$( this ).find(".custom-link-tile-title").each( async function(){
						$( this ).css({overflow: "hidden"});
						if(parseInt(tile_height) === 150){
							$(this).find(".tile-title").css({
								height: parseInt(tile_height)/4+""+tile_height_unit,
								width: parseInt(tile_width)-20+""+tile_width_unit
							});
							$( this ).css({
								height: parseInt(tile_height)/4+""+tile_height_unit,
								top: "-"+parseInt(tile_height)/4+""+tile_height_unit,
								width: parseInt(tile_width)-20+""+tile_width_unit
							});
							if(title_font_size === ""){
								await textFit($(this).find(".tile-title"), {maxFontSize: 18});
							}else{
								$(this).find(".tile-title").css({"font-size": title_font_size});
							}
						}else if(parseInt(tile_height) === 250){
							$(this).find(".tile-title").css({
								height: parseInt(tile_height)/5+""+tile_height_unit,
								width: parseInt(tile_width)-20+""+tile_width_unit
							});
							$( this ).css({
								height: parseInt(tile_height)/5+""+tile_height_unit,
								top: "-"+parseInt(tile_height)/5+""+tile_height_unit,
								width: parseInt(tile_width)-20+""+tile_width_unit
							});
							if(title_font_size === ""){
								await textFit($(this).find(".tile-title"), {maxFontSize: 32});
							}else{
								$(this).find(".tile-title").css({"font-size": title_font_size});
							}
						}else if(parseInt(tile_height) === 400){
							$(this).find(".tile-title").css({
								height: parseInt(tile_height)/5.2+""+tile_height_unit,
								width: parseInt(tile_width)-20+""+tile_width_unit
							});
							$( this ).css({
								height: parseInt(tile_height)/5.2+""+tile_height_unit,
								top: "-"+parseInt(tile_height)/5.2+""+tile_height_unit,
								width: parseInt(tile_width)-20+""+tile_width_unit
							});
							if(title_font_size === ""){
								await textFit($(this).find(".tile-title"), {maxFontSize: 48});
							}else{
								$(this).find(".tile-title").css({"font-size": title_font_size});
							}
						}
						//Centers the title in the div.
						 $( this ).find(".tile-title").css({
							display: "flex",
							"justify-content": "center",
							"align-items": "center",
							
						});
						
						//On mouseenter the title div expands and the tile text is added/visible.
						//On mouseleave the title div size is set back.
					$( this ).mouseenter( async function() {
						
						$( this ).css({
						height: parseInt(tile_height)-20+""+tile_width_unit,
						top:"-"+tile_height,
						display: ""
						});
						if($( this ).find(".tile-text").length === 0){
							if(text_font_size === ""){
								$( this ).append('<div class="tile-text" style="text-align: left; overflow-wrap: break-word; width: 100%; font-size:12px; padding: 5px; overflow: hidden;"><span>'+$(this).parent().find(".custom-link-tile-text").text()+'</span></div>');
							}else{
								$( this ).append('<div class="tile-text" style="text-align: left; overflow-wrap: break-word; width: 100%; font-size:'+ text_font_size +'; padding: 5px; overflow: hidden;"><span>'+$(this).parent().find(".custom-link-tile-text").text()+'</span></div>');
							}
						}

					  })
					  .mouseleave( async function() {
					  	if(parseInt(tile_height) === 150){
							$( this ).css({
								height: parseInt(tile_height)/4+""+tile_height_unit,
								top: "-"+parseInt(tile_height)/4+""+tile_height_unit,
							});
							if(title_font_size === ""){
								await textFit($(this).find(".tile-title"), {maxFontSize: 18});
							}else{
								$(this).find(".tile-title").css({"font-size": title_font_size});
							}
						}else if(parseInt(tile_height) === 250){
							$( this ).css({
								height: parseInt(tile_height)/5+""+tile_height_unit,
								top: "-"+parseInt(tile_height)/5+""+tile_height_unit,
							});
							if(title_font_size === ""){
								await textFit($(this).find(".tile-title"), {maxFontSize: 32});
							}else{
								$(this).find(".tile-title").css({"font-size": title_font_size});
							}
						}else if(parseInt(tile_height) === 400){
							$( this ).css({
								height: parseInt(tile_height)/5.2+""+tile_height_unit,
								top: "-"+parseInt(tile_height)/5.2+""+tile_height_unit,
							});
							if(title_font_size === ""){
								await textFit($(this).find(".tile-title"), {maxFontSize: 48});
							}else{
								$(this).find(".tile-title").css({"font-size": title_font_size});
							}
						}
						
						$(this).parent().find('.tile-text').remove();
					  });

					});
					
				
				
			});
            $(this).show();
		});
	});
});