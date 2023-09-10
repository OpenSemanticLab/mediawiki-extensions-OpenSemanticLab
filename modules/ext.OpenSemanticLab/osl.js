class osl {
	constructor() {
	}
  	
	static version = "0.0.1";
	
	static getVersion() {
		return version;
	}

	
    /*static embeddJsonLD() {
        return;
        mwjson.api.getPage(mw.config.get( 'wgPageName' )).then((page) => {
            //var jsonschema = page.slots('jsonschema')
            var jsondata = page.slots['jsondata']
            var jsondata2 =     {
                "@context": "https://schema.org/",
                "@type": "Recipe",
                "name": "Party Coffee Cake",
                "author": {
                  "@type": "Person",
                  "name": "Mary Stone"
                },
                "datePublished": "2018-03-10",
                "description": "This coffee cake is awesome and perfect for parties.",
                "prepTime": "PT20M"
              };          
            if (jsondata) {
                var context = [];
                jsondata = JSON.parse(jsondata);
                jsondata = jsondata2;
                if (jsondata['type']) for (const type of jsondata['type']) context.push("./" + type + "?action=raw&slot=jsonschema");
                if (jsondata['subclass_of']) context.push("./Category:Category?action=raw&slot=jsonschema");
                var jsonld = jsondata;
                //jsonld['@context'] = context;
                var script = document.createElement('script');
                script.type = "application/ld+json";
                script.innerHTML = JSON.stringify(jsonld);
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        })
    }*/
}

// Assigning namespace.
window.osl = osl;

//embedd jsonld
Array.from(document.getElementsByClassName('jsonld-header')).forEach(
	function(element, index, array) {
		var script = document.createElement('script');
				jsonld = JSON.parse(element.dataset.jsonld);
				for (var key of Object.keys(jsonld)) {
					if (key === "image") jsonld[key] = jsonld[key].replaceAll("File:", "Special:Redirect/file/")
				}
                script.type = "application/ld+json";
                script.innerHTML = JSON.stringify(jsonld, null, 4);
                document.getElementsByTagName('head')[0].appendChild(script);
	}
);