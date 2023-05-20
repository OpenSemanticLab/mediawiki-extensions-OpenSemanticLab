/* 
DEV: MediaWiki:Sandbox.js 
REL: modules/ext.OpenSemanticLab/DynamicSidebar.js
*/

//dynamic sitebar content from user subpage
$(document).ready( function() {
	const user_name = mw.config.get('wgUserName');
	if (!user_name) return; //no user not logged in
	new mw.Api().get( {
		action: 'parse',
		page: 'User:' + user_name + '/Config/UI/Sidebar',
	} ).done( function(data) {
		$('#p-navigation').prepend( data.parse.text['*'] );
	});
});

//dynamic sitebar content from user subpage
//$(document).ready( function() {
	const user_lang = mw.config.get( 'wgUserLanguage' );
	//const user_lang = window.navigator.userLanguage;
	//const user_lang = window.uls-preferences.ime.language;
	Array.from(document.getElementsByClassName('i18n-text')).forEach(
		function(element, index, array) {
			console.log(element.dataset);
			if (element.getAttribute('lang') === user_lang) {
				if (element.dataset.id) {
					const target = document.getElementById(element.dataset.id);
					target.textContent=element.dataset.text;
					target.style.display='block';
					if (element.dataset.id === 'firstHeading') document.title = element.dataset.text
				}
			}
		}
	);
//});


