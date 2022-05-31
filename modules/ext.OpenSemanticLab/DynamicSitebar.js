/* 
DEV: MediaWiki:Sandbox.js 
REL: modules/ext.OpenSemanticLab/DynamicSitebar.js
*/

//dynamic sitebar content from user subpage
$(document).ready( function() {
	const user_name = mw.config.get('wgUserName');
	new mw.Api().get( {
		action: 'parse',
		page: 'User:' + user_name + '/Config/UI/Sitebar',
	} ).done( function(data) {
		$('#p-navigation').prepend( data.parse.text['*'] );
	});
});
