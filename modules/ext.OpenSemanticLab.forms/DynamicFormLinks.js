/* 
passes user abbreviation, name and short timestamp to pageforms
DEV: MediaWiki:DynamicFormLinks.js
REL: modules/ext.OpenSemanticLab.forms/DynamicFormLinks.js
*/

$(document).ready(function() {
	if( $('.dynamic-page-form-link').length === 0) return; //only on pages with a WellplateEditor-div
	var context = {};
	context.debug = true;
	date = new Date();
	context.date = date;
	context.timestamp_YYYYMMDDHHMMSS = date.getFullYear() + ("0" + (date.getMonth() + 1)).slice(-2) + ("0" + date.getDate()).slice(-2) + ("0" + date.getHours() ).slice(-2) + ("0" + date.getMinutes()).slice(-2) + ("0" + date.getSeconds()).slice(-2);
	context.timestamp_YYMMDD = ("" + date.getFullYear()).slice(-2) + ("0" + (date.getMonth() + 1)).slice(-2) + ("0" + date.getDate()).slice(-2);
	context.userName = mw.config.get("wgUserName");
	if (context.debug) console.log("Current timestamp_YYMMDD:" + context.timestamp_YYMMDD);	
	if (context.debug) console.log("Current User:" + context.userName);
	
	var ajax_array = [];
	
	query = `/w/api.php?action=ask&query=[[Category:LIMS/Person/User]][[HasUsername::${context.userName}]]|?HasAbbreviation&format=json`;
	var receiveUserAbbreviationQuery = $.ajax({
		url : query,
		dataType: "json",
		cache: false,
		success : DynamicFormLinks_receiveUserAbbreviationQuery(context)
	});
	ajax_array.push(receiveUserAbbreviationQuery);
	
	//if (url.contains)
	
	//if free_text[preload]=${page_content}: query page content
	$.when.apply($, ajax_array).done(function(){
		if (context.debug) console.log("all queries done");
	});

});

var DynamicFormLinks_receiveUserAbbreviationQuery = function(context) {
    return function(data) {
    	for (var key in data.query.results) {
	    	if (data.query.results[key].printouts['HasAbbreviation'][0] !== undefined) {
	    		context.HasAbbreviation = data.query.results[key].printouts['HasAbbreviation'][0];
	    		if (context.debug) console.log("HasAbbreviation:" + context.HasAbbreviation);
	    	}
    	}
		$('.dynamic-page-form-link').each(function(i) { 
			//for links
			$(this).find('a').each(function(i) { 
				var url = $(this).attr('href');
				if (context.debug) console.log("Replaced " + url);
				url = url.replace(encodeURIComponent('${short_timestamp}'), context.timestamp_YYMMDD);
				url = url.replace(encodeURIComponent('${user_abbreviation}'), context.HasAbbreviation);
				url = url.replace(encodeURIComponent('${user_name}'), 'User:' + context.userName);
				$(this).attr('href', url);
				
				if (context.debug) console.log(" with " + url);
				
			});
			//for buttons / forms
			$(this).find('input').each(function(i) { 
				var value = $(this).attr('value');
				if (value){
					if (context.debug) console.log("Replaced " + value);
					value = value.replace('${short_timestamp}', context.timestamp_YYMMDD);
					value = value.replace('${user_abbreviation}', context.HasAbbreviation);
					value = value.replace('${user_name}', context.userName);
					$(this).attr('value', value);
					if (context.debug) console.log(" with " + value);
				}
			});
		});
		$('.dynamic-page-form-link').css("display","block"); //make visible
    };
};
