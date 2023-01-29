class osl {
	constructor() {
	}
  	
	static version = "0.0.1";
	
	static getVersion() {
		return version;
	}
}

// Assigning namespace.
window.osl = osl;

//embedd jsonld
Array.from(document.getElementsByClassName('jsonld-header')).forEach(
	function(element, index, array) {
		var script = document.createElement('script');
                script.type = "application/ld+json";
                script.innerHTML = element.dataset.jsonld;
                document.getElementsByTagName('head')[0].appendChild(script);
	}
);