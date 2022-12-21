/*@nomin*/
/* 
modifies behavior of pageforms
DEV: MediaWiki:PageFormsExtensions.js
REL: modules/ext.OpenSemanticLab.forms/PageFormsExtensions.js
hint: ResourceLoader minifier does not support ES6 yet, therefore skip minification  with "nomin" (see https://phabricator.wikimedia.org/T255556)
*/

/* creates a VE-like section edit link to a form */
$("div.custom-section-edit-form-link").each(function(){
	$element = $(this);
	var form_name = $element.data('form-name');
	var link_label = $element.data('link-label');
	var link_label_msg = $element.data('link-label-msg');
	var link_tooltip_msg = $element.data('link-tooltip-msg');
	var purge = $element.data('purge');
	if (!link_label) link_label = "Edit";
	if (link_label_msg) link_label = mw.msg(link_label_msg);
	var link_tooltip = link_label;
	if (link_tooltip_msg) link_tooltip = mw.msg(link_tooltip_msg);
	var additional_params = "";
	if (purge) additional_params = `&amp;reload=1&amp;returnto=${mw.config.get('wgPageName')}#_purge`; //force reload and second page reload to update query results
	//console.log(`form_name: ${form_name}, link_label_msg=${link_label_msg}, link_label=${link_label}`);
	$element.find('span.mw-headline').after(`
	<span class="mw-editsection" style="display: inline-block !important;">
	  <span class="mw-editsection-bracket">[</span>
	    <a href="/w/index.php?title=Special:FormEdit&amp;form=${form_name}&amp;target=${mw.config.get('wgPageName')}${additional_params}" 
	    target="_self" class="mw-editsection-visualeditor" title="${link_tooltip}" style="display: inline-block !important;">${link_label}</a>
	  <span class="mw-editsection-bracket">]</span>
	</span>`
	);
});

/*for read only SemanticFormsSelect field*/
$('.sfselect-restricted').find('input,select').attr('style', ' background: #eee;pointer-events: none;touch-action: none;').each(function() {
	$(this).attr('tabindex','-1');
	$(this).attr('data-original-value', $(this).val());
	$(this).on('change', function(i) {
	$(i.target).val($(this).attr('data-original-value'));
	});
});

//Overwrite css class of tiny input elements
$('div.tiny-input').each(function() {
	var span = $(this).children('span.select-sfs').eq(0);
	var select = $(span).children('select').eq(0);
	//console.log("Select found: " + $(select).attr('id'));
	//$( span ).removeClass( "select-sfs select-sfs-single" )
	$( span )[0].style.setProperty("min-width", "100px", "important");
	$( span )[0].style.setProperty("margin-bottom", "0px", "important"); 
	$( select )[0].style.setProperty("min-width", "100px", "important");
	$( select )[0].style.setProperty("width", "100px", "important");
	$( select )[0].style.setProperty("height", "35px", "important");
});


//renders a file link form a specific url param, e. g. template[param]=File:Test.jpeg
$(document).ready(function() {
	if( $('.PageFormsExtensions_field_preview_link').length === 0) return;
	//mw.loader.using( 'mw.api').done( function () {
		$('.PageFormsExtensions_field_preview_link').each(function(i) {
			context = {};
			context.debug = false;
			context.element = $(this);
			var param_name = $(this).find('input').attr('name');
			if (param_name.includes('[num]')) return; //exclude html template
			var file_name = $(this).find('input').attr('value');
			if (file_name === undefined) return;
			if (context.debug) console.log("PageFormsExtensions_field_preview_link: " + param_name + "->" + file_name);
			var api = new mw.Api();
			api.get( {
			    action: 'parse',
			    text: '[[Media:' + file_name + ']]',
			    contentmodel: 'wikitext'
			} ).done( PageFormsExtensions_field_preview_link(context) );
		});
	//});
});

var PageFormsExtensions_field_preview_link = function(context) {
    return function(data) {
    	if (context.debug) console.log(data);
    	var result = data.parse.text["*"];
		if (context.debug) console.log( result );
		$result = $($('<textarea />').html(result).text()); //decode html, see https://stackoverflow.com/questions/5796718/html-entity-decode
		if (context.debug) console.log( result );
		context.element.append(result);
		context.element.find('a').attr('target','_blank'); //make urls open on new tab
    };
};

var PageFormsExtensions_sync_fields = {};
//PageFormsExtensions_sync-field PageFormsExtensions_sync-field-nested
$(document).ready(function() {
	if ($('.PageFormsExtensions_sync-field').length) {
		
		
		//Hook for new template instances
		mw.hook('pf.addTemplateInstance').add(function($newInstance) {
			link_src($newInstance);
		});

		$('.PageFormsExtensions_sync-field').each(function() {
			$newInstance = $(this).parent();
			link_src($newInstance);
		});
		
		link_src($(this));
		check_active();
		
		function check_active() {
			//disable source input if all targets syncs are inactive
			
			for (const [key, value] of Object.entries(PageFormsExtensions_sync_fields)) {
				var all_inactive = true;
				PageFormsExtensions_sync_fields[key].forEach(function(target){
					const name = $(target['active']).attr('name');
					if ($(`[name='${name}']`).length && target['active'].is(':checked')) all_inactive = false;
				});
				//console.log(key + ": all_inactive = " + all_inactive);
				//$(`[name='${key}']`).parent().disabled = all_inactive;
				//if (all_inactive) $(`[name='${key}']`).closest('tr').css( "display", "none" );
				//else $(`[name='${key}']`).closest('tr').css( "display", "table-row" );
				if (all_inactive) $(`[name='${key}']`).closest('tr').addClass('generic-hide');
				else $(`[name='${key}']`).closest('tr').removeClass('generic-hide');
			}
		}
		
		function link_src($newInstance) {
			$newInstance.find('.PageFormsExtensions_sync-field').each(function() {
				if ($(this).parents('.multipleTemplateStarter').length) return; //hidden template structure, not an actual instance
				var span = $(this).children('span.select-sfs').eq(0);
				var select = $(span).children('select').eq(0);
				$checkbox = $(this).find("[type='checkbox']");
				$checkbox.on("change", check_active);
				
				$(select)[0].style.setProperty("min-width", "350px", "important"); //make it small for the active checkbox
				const target_id = $(select).attr('id');
				//console.log("PageFormsExtensions_sync-field Select found: " + target_id);
				var sync_src = "";
				$.each($(this).attr('class').split(/\s+/), function(index, item) {
				    if (item.startsWith('PageFormsExtensions_sync-field-src')) {
				        sync_src = item.replace('PageFormsExtensions_sync-field-src_', '');
				    }
				});
				//console.log("PageFormsExtensions_sync-field src " + sync_src);
				sync_src_element = $(`[name='${sync_src}']`);
				if (PageFormsExtensions_sync_fields[sync_src] === undefined) PageFormsExtensions_sync_fields[sync_src] = [];

				PageFormsExtensions_sync_fields[sync_src].push({'id': target_id, 'active': $checkbox});
				//console.log(sync_src_element);
				check_active();
				
				$(sync_src_element).on("change", function() {
					var src_name = $(this).attr('name');
					var src_value = $(this).val();
					if (!src_value.includes(':')) src_value = "Category:" + src_value;
					console.log("PageFormsExtensions_sync-field src " + src_name + " value=" + src_value);
					PageFormsExtensions_sync_fields[sync_src].forEach(function(target) {
						//console.log("update target: " );
						//console.log(target);
						var target_active = target['active'].is(':checked');
						//console.log("target_active:" + target['active']);
						if (target_active){
							$target_element = $(`#${target['id']}`);
							console.log("Set value: " + src_value);
							$target_element.val(src_value);
							//console.log($target_element);
							//$(target['id']).val("Stanze");
							//$(`#${target['id']} option[value='${src_value}']`).attr('selected', 'selected');
							$target_element.trigger("change");
							//$target_element.parents('#pfForm').trigger("change");
						}
					});
				});
			});
		}
	}
});

$(document).ready(function() {
	if ($('.PageFormsExtensions_copy-fields').length) {
		
		
		//Hook for new template instances
		mw.hook('pf.addTemplateInstance').add(function($newInstance) {
			copy_from_previous($newInstance);
		});

		function copy_from_previous($newInstance) {
			$prev = $newInstance.prevAll('.multipleTemplateInstance').first();
			//console.log($newInstance);
			var values = {};
			if ($prev.length) {
				$prev.find("[id^='input']").each(function() { //filter all childs with id=input*
					$input = $(this);
					var id = "";//$input.attr('origname');
					var name = $input.attr('name')
					if (name) id = name.split('[')[2].split(']')[0]; //select 'id' from 'template[index][id]' or 'template[index][id][]'
					var value = $input.val();
					if (id !== "") values[id] = value;
					//console.log(id, value);
				});
			}
			$newInstance.find("[id^='input']").each(function() { //filter all childs with id=input*
				$input = $(this);

				$incremented_field_div = $input.parents(".incrementField").first();
				var incremented_field = $incremented_field_div.length == 1;
				if (incremented_field) {
					var pattern = $incremented_field_div.data('pattern');
					pattern = pattern.replace("${unique_number}","*");
					var number_pattern = $incremented_field_div.data('number-pattern');
					if (!number_pattern) number_pattern = "0000"; 
					var increment = $incremented_field_div.data('increment');
					if (!increment) increment = 1; 
					var start_value = $incremented_field_div.data('start-value');
					if (start_value) $input.val(start_value);
					else $input.val(get_incremented_id(pattern, [], number_pattern, increment)); //default: create new initial value
				}

				var id = "";//$input.attr('origname');
				var name = $input.attr('name')
				if (name) id = name.split('[')[2].split(']')[0]; //select 'id' from 'template[index][id]' or 'template[index][id][]'
				if (id !== "" && values[id]) {
					var value = values[id]
					$incremented_field_div = $input.parents(".incrementField").first();
					if (incremented_field) {
						value = get_incremented_id(pattern, [value], number_pattern, increment); //create incremented value
					}
					//console.log("set " + id + " = " + value);
					$input.val(value).change();
				}

			});
		}

		//Todo: move to mwjson.util
		function get_incremented_id(pattern, existing_values = [], number_pattern="0000", increment = 1) {
			var number_start = increment;
			var unique_number_string = "" + number_start;
			if (existing_values.length == 0) existing_values.push(pattern.replace("*", number_pattern));
			var highestExistingValue = existing_values.sort().pop();
			var regex = new RegExp(pattern.replace("*","([0-9]*)"), "g");
			unique_number_string = regex.exec(highestExistingValue)[1];
			unique_number_string = "" + (parseInt(unique_number_string) + increment);
			//create leading zeros string with overflow, e. g. 0001, 0002, ..., 9999, 10000, 10001, ...
			unique_number_string = (number_pattern.substring(0,number_pattern.length-unique_number_string.length) + unique_number_string);
			var value = pattern.replace("*", unique_number_string);
			return value;
		}


	}
});

//PageForms extension does purge the target page in PF_AutoeditAPI.php:564, but that seems not no be enough for some cases => execute second purge via Api
//mw.hook( 'wikipage.content' ).add( function() {
$(document).ready(function() { //earlier?
	//console.log('wikipage.content');
	var url = window.location.href;
	//console.log(url);
	if (url.includes('#_purge')) {
		if (url.indexOf('?') > 0 &&  (url.indexOf('?') <  url.indexOf('#')) ) return; //# in url param
		//console.log('Purge request');
		url = url.replaceAll('#_purge','');
		//console.log(url);
		//window.location.href = url; //get request redirects to purge form
		var postArgs = {
	        action: 'purge',
	        titles: mw.config.get('wgPageName'),
	        forcelinkupdate: 'true'
    	};
    	new mw.Api().post(postArgs).then(function () {
	        console.log('Purge successful, reload');
	        window.location.href = url;
    	}, function () {
	        mw.notify(mw.msg('smw-purge-failed'), {
	          type: 'error'
	        });
    	});
	}
});

//set auto-increment value for unique fields
$(document).ready(function() {
	if( $('.uniquePatternedField').length === 0) return;
	//mw.loader.using( 'mw.api').done( function () {
		$('.uniquePatternedField').each(function(i) {
			//$('[name=wpSave]').prop("disabled",true);
			
			var context = {};
			context.debug = false;
			context.date = new Date();
			context.element = $(this);
			context.pattern = $(this).data('pattern');
			context.increment = $(this).data('increment');
			if (!context.increment) context.increment = "1";
			context.increment = parseInt(context.increment);
			context.field = $(this).find(".uniqueField");
			context.fieldVal = context.field.val();
			if (context.fieldVal && context.fieldVal !== "") return; //don't overwrite existing value
			context.fieldOrigVal = context.field.prop("defaultValue");
			
			var propertyFieldName = context.field.prop("id") + "_unique_property";
			var $propertyField = $("[name=" + propertyFieldName + "]");
			context.property = $propertyField.val();
			if (context.debug) console.log(context);
			
			context.year = context.date.getFullYear();
			context.timestamp_YYMMDD = ("" + context.date.getFullYear()).slice(-2) + ("0" + (context.date.getMonth() + 1)).slice(-2) + ("0" + context.date.getDate()).slice(-2);
			context.userName = mw.config.get("wgUserName");
			var prequeries = [];
	
			var query = `/w/api.php?action=ask&query=[[User:${context.userName}]]|?HasAbbreviation&format=json`;
			var receiveUserAbbreviationQuery = $.ajax({url : query, dataType: "json", cache: false,
				success : function(data){
    				for (var key in data.query.results) {
	    				if (data.query.results[key].printouts['HasAbbreviation'][0] !== undefined) {
	    					context.HasAbbreviation = data.query.results[key].printouts['HasAbbreviation'][0];
	    					if (context.debug) console.log("HasAbbreviation:" + context.HasAbbreviation);
	    					

	    				}
    				}
				}
			});
			
			prequeries.push(receiveUserAbbreviationQuery);
			
			$.when.apply($, prequeries).done(function(){
				if (context.debug) console.log("all pre-queries done");
				var properties = {};
				var property_list = context.pattern.split("${");
				for (let index = 0; index < property_list.length; index++) {
					const element = property_list[index];
					if (index > 0) properties[(element.split("}")[0])] = "";
				}
				properties["year"] = context.year;
				properties["short_timestamp"] = context.timestamp_YYMMDD;
				properties["user_abbreviation"] = context.HasAbbreviation;
				properties["unique_number"] = "*";

				searchParams = new URLSearchParams(window.location.search);
				for (let p of searchParams) {
					if (properties[p[0]] !== undefined) properties[p[0]] = p[1];
				}
				if (context.debug) console.log(properties);
				
				context.value = context.pattern;
				for (let property in properties) {
					context.value = context.value.replace("${" + property + "}", properties[property]);
				}

				
				var postqueries = [];
				//retriev the existing property value with the highest value for the unique number
				query = `/w/api.php?action=ask&query=[[${context.property}::~${context.value}]]|?${context.property}|sort=${context.property}|order=desc|limit=1&format=json`;
				var receiveHighestExistingValuesQuery = $.ajax({url : query, dataType: "json", cache: false,
					success : function(data){
						var number_pattern = "0000";
						var number_start = context.increment;
						context.unique_number_string = "" + number_start;
						for (var key in data.query.results) {

							if (data.query.results[key].printouts[context.property][0] !== undefined) {
								context.highestExistingValue = data.query.results[key].printouts[context.property][0];
							    if (context.debug) console.log("highestExistingValue:" + context.highestExistingValue);
							    var regex = new RegExp(context.value.replace("*","([0-9]*)"), "g");
							    context.unique_number_string = regex.exec(context.highestExistingValue)[1];
							    context.unique_number_string = "" + (parseInt(context.unique_number_string) + context.increment);
							}
						}
						context.unique_number_string = (number_pattern + context.unique_number_string).substr(-number_pattern.length);
						context.value = context.value.replace("*", context.unique_number_string);
						$(context.field).val(context.value);
					}
				});
				postqueries.push(receiveHighestExistingValuesQuery);
				
				$.when.apply($, postqueries).done(function(){
					if (context.debug) console.log("all post-queries done");
					//$('[name=wpSave]').prop("disabled",false);
				})
			
			})
		});
	//});
});
