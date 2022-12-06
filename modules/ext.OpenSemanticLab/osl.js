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