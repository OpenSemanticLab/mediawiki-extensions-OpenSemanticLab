/* 
dynamic table layout for pageforms
DEV: MediaWiki:DynPageFormsTables.js
REL: modules/ext.OpenSemanticLab.forms/DynPageFormsTables.js
*/

$(document).ready(function() {
	if ($('.dyntable').length === 0) return;
	mw.loader.using( 'oojs-ui-core').done( function () {
		//Hook for dynamic tables.
		mw.hook('pf.addTemplateInstance').add(function($newInstance) {
			dyntable();
		});

		dyntable();

		function dyntable() {
			$('.dyntable-hide-show-button').remove();

			//Get table inside marked div and class parameters.
			var el = $(".dyntable > table");
			var div_class = $(".dyntable").attr("class");
			var column_number = div_class.match(/(\d+)/);
			var nested = div_class.includes("nested");
			var hidden = div_class.includes("hidden");

			//Function that gets all table elements for the given column number.
			var find_TDs_at_COL = function(table, col) {
				var ret = [];
				$(table).children('tbody').children('tr').each(function() {
					var col2 = 0;
					$(this).children('td,th').each(function() {
						var oldCol2 = col2;
						if (($(this).children('table').length > 0) && (nested === true)) {
							var nested_tables = find_TDs_at_COL($(this).children('table'), column_number[0]);
							for (var i = 0; i < nested_tables.length; i++) {
								ret.push(nested_tables[i]);
							}
							col2++;
						} else {
							col2++;
						}
						if (oldCol2 <= col && col2 > col) {
							ret.push(this);
						}
					});
				});
				return $(ret);
			};

			var marked_column = find_TDs_at_COL(el[0], column_number[0]);

			//Gets all tables inside marked div, even if they are hidden inside other divs.
			if (nested === true) {
				jQuery('.dyntable > table').filter(function() {
					$(this).find('table').each(function() {
						var output_table = find_TDs_at_COL(this, column_number[0]);
						for (var i = 0; i < output_table.length; i++) {
							if ($(output_table[i]).attr("class") != "instanceMain") {
								marked_column.push(output_table[i]);
							}
						}
					});
				});
			}
			
			//Hide-show button
			var hide_show_button = document.createElement("button");
			hide_show_button.type="button"; //default is 'submit' which reloads the page when clicked
			hide_show_button.addEventListener("click", hide_show);
			hide_show_button.style.width = "auto";
			hide_show_button.style.height = "auto";
			hide_show_button.style.float = "left";
			hide_show_button.classList.add("dyntable-hide-show-button");

			//If column 0 is set to hidden the button is shown at the first column header, else its shown at the 0 column header.
			if (column_number[0] === "0") {
				$(marked_column[0]).parent().children()[1].append(hide_show_button);
			} else {
				$(marked_column[0]).parent().children()[0].append(hide_show_button);
			}
			
			//If hidden param is set, set all found elements to hidden.
			if (hidden === true || $(marked_column[0]).hasClass('dyntable-hideable-element-hidden') ) {
				$(marked_column).addClass('dyntable-hideable-element-hidden'); //display: none;
				hide_show_button.innerHTML = '<i class="fa fa-eye"></i> Sollwerte zeigen';
			} else {
				hide_show_button.innerHTML = '<i class="fa fa-eye-slash"></i> Sollwerte verbergen';
			}
			
			//Hide-show button function.
			function hide_show() {
				if ($(marked_column[0]).hasClass('dyntable-hideable-element-hidden')) {
					$(marked_column).removeClass('dyntable-hideable-element-hidden');
					hide_show_button.innerHTML = '<i class="fa fa-eye-slash"></i> Sollwerte verbergen';
				} else {
					$(marked_column).addClass('dyntable-hideable-element-hidden'); //display: none;
					hide_show_button.innerHTML = '<i class="fa fa-eye"></i> Sollwerte zeigen';
				}
			}
		}
	
		sections();
		function sections() {
			$('.dyntable').children('table').children('tbody').children('tr').each(function() {
				$row = $(this);
				if ($row.hasClass('dyntable-section')){
					$row.addClass('dyntable-section-expanded');
					//Hide-show button
					var show_button = new OO.ui.ButtonWidget( {
						label: 'Öffnen',
						icon: 'expand',
						classes: [ 'dyntable-section-button', 'dyntable-section-show-button' ],
						value: true
					} );
					show_button.on( 'click', () => section_toggle_hide_show(this));
					$row.children('th, td').first().append(show_button.$element);

					var hide_button = new OO.ui.ButtonWidget( {
						label: 'Schließen',
						icon: 'collapse',
						classes: [ 'dyntable-section-button', 'dyntable-section-hide-button' ],
						value: true
					} );
					hide_button.on( 'click', () => section_toggle_hide_show(this));
					$row.children('th, td').first().append(hide_button.$element);
					
					if ($row.hasClass('dyntable-section-autocollapse')){
						var auto_collapse = true;
						$next = $row.next("tr:not(.dyntable-section)");
						while($next.length){
							$next.find('.multipleTemplateInstance').each(function() {
								$template_instance = $(this);
								var hide_instance = false;
								$template_instance.find('.hide-instance-when-filled').closest('input').each(function() {
									if ($(this).val() !== "") hide_instance = true;
								});
								if (hide_instance) $template_instance.hide();
								else auto_collapse = false; 
							});
							$next = $next.next("tr:not(.dyntable-section)");
						}
						if (auto_collapse) section_toggle_hide_show($row);
					}
				}
			});

		}
		function section_toggle_hide_show(source){
			//var source = this;//event.target || event.srcElement;
			$section_row = $(source).closest("tr");
			var collapse = true;
			if ($section_row.hasClass('dyntable-section-collapsed')) { //is collapsed -> expand
				collapse = false;
				$section_row.removeClass('dyntable-section-collapsed');
				$section_row.addClass('dyntable-section-expanded');
			}
			else { // is expanded -> collapse
				$section_row.addClass('dyntable-section-collapsed');
				$section_row.removeClass('dyntable-section-expanded');
			}
			//iterate over following rows until the next section or the end of table is reached
			$next = $section_row.next("tr:not(.dyntable-section)");
			while($next.length){
				if (collapse) {
					$next.addClass('dyntable-hideable-element-hidden'); //display: none;
				} else {
					$next.removeClass('dyntable-hideable-element-hidden');
				}
				$next = $next.next("tr:not(.dyntable-section)");
			}	
		}
		

	});
});

$(document).ready(function() {
	if ($('.dyntable-hideable-rows').length === 0) return;
	mw.loader.load("//repolab.github.io/jquery.tabelizer/tabelizer.min.css", "text/css");
	$.when(
		$.getScript("//repolab.github.io/jquery.tabelizer/jquery.tabelizer.js"),
		$.Deferred(function (deferred) {
			$(deferred.resolve);
		})
	).done(function () {
		var table1 = $('.dyntable-hideable-rows').find('table').tabelize({
				//onRowClick : function(){
				//	alert('test');
				//},
				//fullRowClickable : true,
				onReady : function(){
					console.log('ready');
				},
				onBeforeRowClick :  function(){
					console.log('onBeforeRowClick');
				},
				onAfterRowClick :  function(){
					console.log('onAfterRowClick');
				},
		});
	});
});
