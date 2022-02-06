//see also: https://www.mediawiki.org/wiki/VisualEditor/Gadgets/Add_a_tool

mw.loader.using( 'ext.visualEditor.desktopArticleTarget.init' ).done( function() {
	mw.libs.ve.addPlugin( function() {
		//return $.getScript('https://www.mediawiki.org/w/index.php?title=User:Me/myScript.js&action=raw&ctype=text/javascript');
		VeExtensions_init();
	} );
} );

function VeExtensions_init() {
mw.loader.using( [ 'ext.visualEditor.core', 'ext.visualEditor.mwtransclusion' ] )
	.done( function() {
		VeExtensions_create();
} );
}


var tool_groups = [{name: 'labnote', label: 'LabNote'}];
var template_tools = [
	{
		group: 'insert', //built in: insert
		custom_group: false, 
		title: 'Drawing',
		icon: 'edit', //https://doc.wikimedia.org/oojs-ui/master/demos/?page=icons&theme=wikimediaui&direction=ltr&platform=desktop
		name: 'drawio_editor',
		dialog: true,
		sequence: '{D}',
		shortcut: 'ctrl+alt+d',
		template: { target: {href: 'Template:ELN/Editor/DrawIO', wt: 'ELN/Editor/DrawIO'}, params: {'file_name': {wt: 'drawing_01'}}} 
	},
	{
		group: 'labnote',
		custom_group: true, 
		title: 'Wellplate',
		icon: 'table',
		name: 'wellplate_viewer', 
		dialog: true,
		sequence: '{W}',
		shortcut: 'ctrl+alt+w',
		template: { target: {href: 'Template:ELN/Viewer/Wellplate', wt: 'ELN/Viewer/Wellplate'}, params: {'file_name': {wt: 'wellplate_01'}}} 
	},
	{
		group: 'labnote',
		custom_group: true, 
		title: 'ChemViewer',
		icon: 'chem',
		name: 'kekule_viewer', 
		dialog: true,
		sequence: '{V}',
		shortcut: 'ctrl+alt+v',
		template: { target: {href: 'Template:ELN/Viewer/Kekule', wt: 'ELN/Viewer/Kekule'}} 
	},
	{
		group: 'labnote',
		custom_group: true, 
		title: 'ChemEditor',
		icon: 'chem',
		name: 'kekule_editor', 
		dialog: true,
		sequence: '{C}',
		shortcut: 'ctrl+alt+c',
		template: { target: {href: 'Template:ELN/Editor/Kekule', wt: 'ELN/Editor/Kekule'}} 
	}
];


mw.loader.using( [ 'ext.visualEditor.mediawiki' ] ).then( function() {
	function addGroup( target ) {
                tool_groups.forEach(function (tool_group) {
		target.static.toolbarGroups.push( {
			name: tool_group.name,
			label: tool_group.label,
			type: 'list',
			indicator: 'down',
			include: [ { group: tool_group.name } ],
		} );
		} );
	}
	for ( var n in ve.init.mw.targetFactory.registry ) {
		addGroup( ve.init.mw.targetFactory.lookup( n ) );
	}
	ve.init.mw.targetFactory.on( 'register', function ( name, target ) {
		addGroup( target );
	} );
} );

function VeExtensions_create() {
    template_tools.forEach(function (template_tool) {
        //Create and register command
        template_tool.command_name = template_tool.name + '_command';

	var custom_template = [ {type: 'mwTransclusionBlock', attributes: {mw: {parts: [ {template: template_tool.template} ]}}}, {type: '/mwTransclusionBlock'} ];

	if (template_tool.dialog) {
		//Insert template and open dialog
		function InsertAndOpenCommand( name, options ) {
			InsertAndOpenCommand.parent.call( this, name, null, null, options );
		}
		OO.inheritClass( InsertAndOpenCommand, ve.ui.Command );   
		InsertAndOpenCommand.prototype.execute = function( surface, args ) {
			args = args || this.args;
			surface.getModel().getFragment().collapseToEnd().insertContent( args[0], args[1] ).select();
			surface.execute( 'window', 'open', 'transclusion' );
			return true;
		};
		ve.ui.commandRegistry.register(
			new InsertAndOpenCommand( template_tool.command_name, {
				args: [ custom_template, false ],
				supportedSelections: [ 'linear' ]
			} )
		);
	}
	else {    
		//Insert template
		ve.ui.commandRegistry.register(
			new ve.ui.Command( template_tool.command_name, 'content', 'insert', {
				args: [ custom_template, false, true ],
				supportedSelections: [ 'linear' ]
			} )
		);
	}

	//Create and register wikitext command (only for source editor
	//if ( ve.ui.wikitextCommandRegistry ) {
	//	ve.ui.wikitextCommandRegistry.register(
	//		new ve.ui.Command( 'eln_viewer_wellplate', 'mwWikitext', 'wrapSelection', {
	//			args: [ '{{ELN/Viewer/Wellplate|', '}}', 'file_name' ],
	//			supportedSelections: [ 'linear' ]
	//		} )
	//	);
	//}

	//Create and register tool
	function CustomTool() {
		CustomTool.parent.apply( this, arguments );
	}
	OO.inheritClass( CustomTool, ve.ui.MWTransclusionDialogTool );

	CustomTool.static.name =  template_tool.name;
	CustomTool.static.group =  template_tool.group;
        if (template_tool.custom_group){
		CustomTool.static.autoAddToCatchall = false;
		CustomTool.static.autoAddToGroup = true;
	}
	CustomTool.static.title =  template_tool.title;
	CustomTool.static.icon =  template_tool.icon;
	CustomTool.static.commandName = template_tool.command_name;
	ve.ui.toolFactory.register( CustomTool );

	//Register keyboard shortcut
	ve.ui.triggerRegistry.register(template_tool.command_name, {
        	mac: new ve.ui.Trigger(template_tool.shortcut.replace('ctrl','cmd')),
        	pc: new ve.ui.Trigger(template_tool.shortcut)
        });
   
        //Register input sequence
        if (template_tool.sequence != null){
		ve.ui.sequenceRegistry.register(new ve.ui.Sequence(template_tool.name + '_sequence', template_tool.command_name, template_tool.sequence, template_tool.sequence.length));
        }
    });
}
