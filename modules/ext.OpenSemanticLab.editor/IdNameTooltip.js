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
	    //var query = `/w/api.php?action=ask&query=[[:Category:${selectedText}]]OR[[~*${selectedText}*]]&format=json`;
	    
	    IdNameTooltip_updateTooltip(context)();
	    
	});
	});
});
});

var IdNameTooltip_updateTooltip = function(context) {
    return function() {
		const regex = /[0-9]{6}-[A-Za-z]+-[0-9]{4}-[a-z]{2}/gm;
		const str = $(context.element).text();
		let m;
		var query = `/w/api.php?action=ask&query=`;
        var count = 0;
		while ((m = regex.exec(str)) !== null) {
		    // This is necessary to avoid infinite loops with zero-width matches
		    if (m.index === regex.lastIndex) {
		        regex.lastIndex++;
		    }
		    
		    // The result can be accessed through the `m`-variable.
		    m.forEach((match, groupIndex) => {
		        if (context.debug) console.log(`Found match, group ${groupIndex}: ${match}`);
		        if (count > 0) query += "OR";
		        query += `[[HasId::${match}]]`;
		        count += 1;
		    });
		}
		query += `&format=json`;
		if (count > 0){
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
    	var text = "";
    	for (var key in data.query.results) {
    		if (count > 0) text += ", ";
	    	if (data.query.results[key].displaytitle !== undefined) {
	    		context.displaytitle = data.query.results[key].displaytitle;
	    		if (context.debug) console.log(context.displaytitle);
	    		text += context.displaytitle;
	    	}
	    	else text += "<NOT FOUND>";
	    	count += 1;
    	}
		if (count > 0) $(context.element).prop('title', text);  
		else $(context.element).prop('title', "<NOT FOUND>");  
		
    };
};
