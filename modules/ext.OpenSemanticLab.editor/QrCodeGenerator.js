/* 
Creates QR-codes dynamically
DEV: MediaWiki:QrCodeGenerator.js
REL: modules/ext.OpenSemanticLab.LIMS/QrCodeGenerator.js
*/

$(document).ready(function () {
	if ($('.QrCodeGenerator').length === 0) return; //only on pages with a cam-scanner-div
	$.when(
		$.getScript("//larsjung.de/kjua/latest/kjua-0.9.0.min.js"),
		$.getScript("//cdnjs.cloudflare.com/ajax/libs/jspdf/2.4.0/jspdf.umd.js"),
		$.getScript("//cdnjs.cloudflare.com/ajax/libs/html2canvas/1.1.5/html2canvas.js"),
		mw.loader.using( 'oojs-ui-core'),
		$.Deferred(function (deferred) {
			$(deferred.resolve);
		})
	).done(function () {
		$(".QrCodeGenerator").each( function() {
			var $element = $(this);
			var $grid = $('<div></div>')
			$grid.css("display", "grid");
			$grid.css("grid-gap", "0px");
			
			$element.append($grid);
			
			var defaul_config = {"image": true, "image_src": "/w/logo.png", "label": false, "print": false, "print_name": ""};
			var config = {...defaul_config, ...$element.data('config')};
			if (config.print_name === "") config.print_name = config.heading + " " + config.caption + ".pdf";
			config.print_name = config.print_name.trim();
			
			var print_button = new OO.ui.ButtonWidget( {
				label: 'Print'
			} );
			if (config.print) $element.append(print_button.$element);
			
			//if (config['image'] == true) {
				var imgBuffer = new Image();
				imgBuffer.onload = function() { //image needs to be loaded first!
					//see https://larsjung.de/kjua/
					var mode = 'plain';
					var mSize = 30; //size of image or label
					if (config['image']) {
						mode = 'image';
					}
					else if (config['label']) {
						mode = 'label';
						mSize = 10;
					}
					if (!Array.isArray(config['text'])) config['text'] = [config['text']]; //normalize to array
					if (config['heading']) if (!Array.isArray(config['heading'])) config['heading'] = [config['heading']]; //normalize to array
					if (config['caption']) if (!Array.isArray(config['caption'])) config['caption'] = [config['caption']]; //normalize to array
					if (config['text'].length > 1) {
						$grid.css("grid-template-columns", "auto auto auto auto"); //multiple QR codes
						$grid.css("width", "800px");
					}

					for (var i = 0; i < config['text'].length; i++) {
						var $div = $('<div></div>');
						$div.css("text-align", "center");
						
						if (config['heading']) {
							var $heading = $('<big></big>');
							if (i < config['heading'].length) $heading.text(config['heading'][i]);
							else $heading.text(config['heading'][config['heading'].length - 1]);
							$div.append($heading);
							$div.append($('<br>'));
						}
						
						var el = kjua({
							text: config['text'][i], 
							ecLevel: 'Q', //otherwise images will not work?
							label: config['label'], 
							mode: mode, 
							image: imgBuffer, 
							//size: 500,
							mSize: mSize,
							//mPosX: 50, 
							//mposY: 50,
							fontcolor: "#ff9818",
						});
						$div.append(el);
						
						if (config['caption']) {
							var $caption = $('<p></p>');
							if (i < config['caption'].length) $caption.text(config['caption'][i]);  
							else $caption.text(config['caption'][config['caption'].length - 1]); 
							$div.append($caption);
						}
						
						$grid.append($div);
					}
					
				};
				imgBuffer.src = config['image_src'];
			//}
			/*else {
				var el;
				if (config['label']) {
					el = kjua({
						text: config['text'],  
						label: config['label'], 
						mode: 'label', 
					});
				}
				else el = kjua({text: config['text']});
				$element.append(el);
				$element.append(print_button.$element);
			}*/

			print_button.on( 'click', function () {
				var jsPDF = window.jspdf.jsPDF;
				var doc = new jsPDF({orientation:'portrait', unit:'px', format:'a4', hotfixes: ["px_scaling"]});
				var inputHtml = $element[0];//document.getElementById();
				doc.html(inputHtml, {
					autoPaging: 'text',
					//margin: [10, 10, 10, 10],
					//see https://html2canvas.hertzen.com/configuration
					html2canvas: {  
						//async: true,
						logging: true,
						//backgroundColor: null,
						//allowTaint: true,
						//foreignObjectRendering: true, //creates svg images, not supported by pdfjs yet
						//removeContainer: true,
						ignoreElements: (element) => {return element.classList.contains('oo-ui-widget');} //hide button
					}, 
					callback: function (doc) {
						doc.save(config.print_name);
					}
				});
			});
		});
	});
});
