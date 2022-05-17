/* 
modifies behavior of pageforms
DEV: MediaWiki:PageFormsExtensions.js
REL: modules/ext.OpenSemanticLab.forms/PageFormsExtensions.js
*/

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

//PageForms extension does purge the target page in PF_AutoeditAPI.php:564, but that seems not no be enough for some cases => execute second purge via Api
//mw.hook( 'wikipage.content' ).add( function() {
$(document).ready(function() { //earlier?
	console.log('wikipage.content');
	var url = window.location.href;
	console.log(url);
	if (url.includes('#_purge')) {
		if (url.indexOf('?') > 0 &&  (url.indexOf('?') <  url.indexOf('#')) ) return; //# in url param
		console.log('Purge request');
		url = url.replaceAll('#_purge','');
		console.log(url);
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
