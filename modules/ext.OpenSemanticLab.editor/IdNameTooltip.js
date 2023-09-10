/* shows Display_title_of of pages with ID pattern jjmmdd-nnnn-0000-tt as tooltip in Visual Editor source mode */

var IdNameTooltip_timeout;
$(document).ready(function() {
mw.hook( 've.activationComplete' ).add( function() {
	mw.loader.using( 'oojs-ui-core').done( function () {
	//$(".ve-ce-contentBranchNode").on('mouseup', function(e) {
	
	$("body").on('DOMSubtreeModified', ".ve-ce-contentBranchNode", function() {
		var context = {};
		context.debug = false;
		context.element = $(this);
		
    	//console.log($(this).text());
    	IdNameTooltip_updateTooltip(context)();
	});

	$(".ve-ce-contentBranchNode").each(function() {
		var context = {};
		context.debug = false;
		context.element = $(this);
		//var selection = document.getSelection();
		//console.log("Selection: " + selection);
		//if (!selection.toString().trim().length) return;
	    //var selectedText = selection.toString();
	    //var query = mw.config.get("wgScriptPath") + `/api.php?action=ask&query=[[:Category:${selectedText}]]OR[[~*${selectedText}*]]&format=json`;
	    
	    IdNameTooltip_updateTooltip(context)();
	    
	});
	});
});
});

var IdNameTooltip_updateTooltip = function(context) {
    return function() {
		const regex_short_id = /[0-9]{6}-[A-Za-z]+-[0-9]{4}-[a-z]{2}/gm;
		const regex_uuid = /([A-Z]*)(_|-| |){1}([a-f0-9]{8})(_|-| |){1}([a-f0-9]{4})(_|-| |){1}([a-f0-9]{4})(_|-| |){1}([a-f0-9]{4})(_|-| |){1}([a-f0-9]{12})/gm;
		var regex_expr = [
			{property: 'HasId', regex: regex_short_id, map: (match) => {return match;} },
			{property: 'HasUuid', regex: regex_uuid, map: (match) => {return match.replace(regex_uuid, `$3-$5-$7-$9-$11`);} }
		];
		context.results = "";
		const str = $(context.element).text();
		let m;
		var query = mw.config.get("wgScriptPath") + `/api.php?action=ask&query=`;
		var count = 0;
		regex_expr.forEach((item) => {
			const matches = str.matchAll(item.regex);
			for (const match of matches) {
				var match_str = match[0];//.toString();
				if (context.debug) console.log(`Found match ${match_str}`);
				if (count > 0) query += "OR";
				query += `[[${item.property}::${item.map(match_str)}]]`;
				count += 1;
			}

		});
		query += `&format=json`;

		const regex_object_id_ref = /\|[\s]*?[\S]*id[\s]*?=[\s]*([^|\s]*)[\s|\|]?/gm;
		const ref_matches = str.matchAll(regex_object_id_ref);
		const page_text = $(context.element).parent().text();
		//console.log(page_text);
		for (const ref_match of ref_matches) {
			var object_id = ref_match[1];
			if (context.debug) console.log(`Found match ${object_id}`);
			//resolve local ids directly in the page text
			var regex_object_id = new RegExp("LabProcess\\/Object\\|object[\\s]*?\\|[\\s]*?id[\\s]*?=[\\s]*?" + object_id + "[\\s\\S]*?\\|[\\s]*?name[\\s]*?=[\\s]*([\\s\\S]*?)[\\s]*?[\\||}]", 'gm');
			const id_matches = page_text.matchAll(regex_object_id);
			for (const id_match of id_matches) { 
				const obj_name = id_match[1];
				if (context.debug) console.log(`Found match name ${obj_name}`);
				if (context.results !== "") context.results += ", ";
				context.results += obj_name; 
			}
		}
		
		if (count > 0){ //query external ids
			$.ajax({
				url : query,
				dataType: "json",
				cache: true,
				success : IdNameTooltip_displayTooltipFromQueryResult(context)
			});
			//var tooltipLeft = e.pageX;//Math.max(rect.left - ($('.tooltip').width() - rect.width), 0);
			//var y_pos = e.pageY;
			$(this).prop('title', 'Resolve ID...');  
		}
                else $(context.element).prop('title', context.results); //display results directly

		  /*$(this).tooltip({
			trigger: 'manual',
			//placement: 'bottom',
		    left: tooltipLeft + 'px',
		    top: y_pos + 'px',
		    position: 'absolute'
			//content: "Resolve ID...",
		  });*/

	
	  clearTimeout(IdNameTooltip_timeout);
	  //document.execCommand('copy');
	
	  //var rect = selection.getRangeAt(0).getBoundingClientRect();
	
	  //$(this).tooltip("show");
	
	  
	  
	  //$('.tooltip').css({
	  //  left: tooltipLeft
	  //});
	
	  /*var selectable = this;
	  IdNameTooltip_timeout = setTimeout(function() {
	    $(selectable).tooltip("hide");
	  }, 10000);
	  */
    };
};

var IdNameTooltip_displayTooltipFromQueryResult = function(context) {
    return function(data) {
    	if (context.debug) console.log(data);
    	var count = 0;
    	for (var key in data.query.results) {
    		if (context.results !== "") context.results += ", ";
	    	if (data.query.results[key].displaytitle !== undefined) {
	    		context.displaytitle = data.query.results[key].displaytitle;
	    		if (context.debug) console.log(context.displaytitle);
	    		context.results += context.displaytitle;
	    	}
	    	else context.results += "<NOT FOUND>";
	    	count += 1;
    	}
		if (context.results !== "") $(context.element).prop('title', context.results);  
		else $(context.element).prop('title', "<NOT FOUND>");  
		
    };
};
