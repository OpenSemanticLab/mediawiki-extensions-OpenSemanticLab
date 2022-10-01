$(document).ready(function() {
	if( $('.graphviz').length === 0 && $('.graphviz-print').length === 0) return; //only on pages with a graphviz-div

    $.when(
		$.getScript("//d3js.org/d3.v5.min.js"),
		$.getScript("//unpkg.com/@hpcc-js/wasm@0.3.11/dist/index.min.js"),
		$.getScript("//unpkg.com/d3-graphviz@3.2.0/build/d3-graphviz.js"),
        $.getScript('//unpkg.com/canvg@3.0.7/lib/umd.js')
    ).done(function() {

                /*The print functions display the PNG file when printing and reset the PNG file to the SVG file after printing.*/
                window.onbeforeprint = (event) => {
                    var allGraphViz = $(".graphviz");
                    var allGraphVizPrint = $(".graphviz-print > div.printonly");
                    var allGraphVizNoPrint = $(".graphviz-print > div.noprint");

                    for (var i = 0; i < allGraphViz.length; i++) {
                        allGraphViz[i].style.display = "none";
                    }
                    
                    for (var i = 0; i < allGraphVizNoPrint.length; i++) {
                        allGraphVizNoPrint[i].style.display = "none";
                    }

                    for (var i = 0; i < allGraphVizPrint.length; i++) {
                        allGraphVizPrint[i].style.display = "block";
                    }
                };

                window.onafterprint = function(event) {
                    var allGraphViz = $(".graphviz");
                    var allGraphVizPrint = $(".graphviz-print > div.printonly");
                    var allGraphVizNoPrint = $(".graphviz-print > div.noprint");
                
                    for (var i = 0; i < allGraphViz.length; i++) {
                        allGraphViz[i].style.display = "block";
                    }
                    
                    for (var i = 0; i < allGraphVizNoPrint.length; i++) {
                        allGraphVizNoPrint[i].style.display = "block";
                    }

                    for (var i = 0; i < allGraphVizPrint.length; i++) {
                        allGraphVizPrint[i].style.display = "none";
                    }
                };

                /*The svgToPng () function converts an SVG into a PNG and attaches the PNG to the .printonly class <div> and the svg to the .noprint class <div>.*/
                var wait = 0;
				
                function svgToPng() {
                    wait++;
                    if (wait < $(".graphviz-print").length) {
                        return;
                    }
                    $(".graphviz-print > svg").each(function(index) {
                    	var canvas = document.createElement("canvas");
                    	canvas.width = this.width;
    					var ctx = canvas.getContext('2d');
    					var svgData = new XMLSerializer().serializeToString(this);
    					
    					v = canvg.Canvg.fromString(ctx, svgData);

    					// Start SVG rendering with animations and mouse handling.
    					v.start();
						
                        var imgPng = canvas.toDataURL( "image/png", 1.0 );
                        var img = new Image();
                        img.setAttribute("src", imgPng );
                        
                        img.style.width = "100%";
                        //img.style.height = "600px";
						var noprint = document.createElement("div");
						noprint.classList.add("noprint");
						var printonly = document.createElement("div");
						printonly.classList.add("printonly");
						$(this).parent().append(noprint);
                        $(this).parent().append(printonly);
						noprint.append(this);
						printonly.append(img);
                        $(".noprint").css('display', 'block');
                        $(".printonly").css('display', 'none');
                    });
                }

                /*Draws the given graph as SVG in the .graphviz or .graphviz-print <div>.*/
                function startDrawingSVG() {
                    if ($('.graphviz').length > 0 ) {

                        $(".graphviz").each(function(index) {
                            var innerHtml = $(this).text();
                            $(this).text("");
                            if (innerHtml.match(/digraph./)) {
                                d3.select(this).graphviz().width('100%').fit(true).zoom(false)
                                    .renderDot('' + innerHtml + '');

                            }
                            $(".graphviz > p").css('display', 'none');
                            $('.graphviz').css('display', 'block');
							$(".graphviz > pre").css('display', 'none');
                        });
                    }
                    if($('.graphviz-print').length > 0){
                    	$(".graphviz-print").each(function(index) {
                            var innerHtml = $(this).text();
                            $(this).text("");
                            if (innerHtml.match(/digraph./)) {
                                d3.select(this).graphviz().width('100%').fit(true).zoom(false)
                                    .renderDot('' + innerHtml + '', svgToPng);

                            }
                            $(".graphviz-print > p").css('display', 'none');
                            $('.graphviz-print').css('display', 'block');
							$(".graphviz-print > pre").css('display', 'none');
                        });
                    }
                }

                startDrawingSVG();

                /*The SVG zoom only works when the shift key is pressed.*/
                $(document).keydown(function(e) {
                    if (e.keyCode == 16) {
                        $(".graphviz").each(function(index) {
                            d3.select(this).graphviz().width('100%').fit(true).zoom(true)
                        });
                        $(".noprint").each(function(index) {
                            d3.select(this).graphviz().width('100%').fit(true).zoom(true)
                        });
                    }
                });

                /**/
                $(document).keyup(function(e) {
                    if (e.keyCode == 16) {
                        $(".graphviz").each(function(index) {
                            d3.select(this).graphviz().width('100%').fit(true).zoom(false)
                        });
                        $(".noprint").each(function(index) {
                            d3.select(this).graphviz().width('100%').fit(true).zoom(false)
                        });
                    }
                });
            });

});
