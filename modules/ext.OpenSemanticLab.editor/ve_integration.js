/*@nomin*/
//see also: https://www.mediawiki.org/wiki/VisualEditor/Gadgets/Add_a_tool

mw.loader.using('ext.visualEditor.desktopArticleTarget.init').done(function () {
	mw.libs.ve.addPlugin(function () {
		//return $.getScript('https://www.mediawiki.org/w/index.php?title=User:Me/myScript.js&action=raw&ctype=text/javascript');
		VeExtensions_init();
	});
});

function VeExtensions_init() {
	mw.loader.using(['ext.visualEditor.core', 'ext.visualEditor.mwtransclusion'])
		.done(function () {
			VeExtensions_create();
		});
}

//const VeExt_pageName = mw.config.get('wgPageName');
//const VeExt_id = (performance.now().toString(36) + Math.random().toString(36)).replace(/\./g, "").substring(0, 4);
VeExt_emptyDefaultFileName = false; // if true, file name is fetched from Template
var tool_groups = [];//[{name: 'labnote', label: 'LabNote'}];
var template_tools = [
	{
		group: 'textStyle', //built in: format, textStyle, cite, insert
		custom_group: false,
		title_msg: 'visualeditor-tool-annotation-toolname', //'Annotation',
		icon: 'error', //https://doc.wikimedia.org/oojs-ui/master/demos/?page=icons&theme=wikimediaui&direction=ltr&platform=desktop
		name: 'annoation',
		dialog: true,
		dialog_type: 'template',
		transclusion_type: 'mwTransclusionInline', //default: mwTransclusionBlock
		sequence: '{A}',
		template: { target: { href: 'Template:Decoration/Annotation', wt: 'Template:Decoration/Annotation' }, params: { 'text': { wt: '' }, 'info': { wt: '1' }, 'question': { wt: '0' }, 'warning': { wt: '0' }, 'error': { wt: '0' } } }
	},
	{
		group: 'textStyle', //built in: format, textStyle, cite, insert
		custom_group: false,
		title_msg: 'visualeditor-tool-coloredtext-toolname',
		icon: 'highlight',
		name: 'coloredtext',
		dialog: true,
		dialog_type: 'template',
		transclusion_type: 'mwTransclusionInline', //default: mwTransclusionBlock
		template: { target: { href: 'Template:Decoration/ColoredText', wt: 'Template:Decoration/ColoredText' }, params: { 'text': { wt: '' }, 'red': { wt: '1' }, 'blue': { wt: '0' }, 'green': { wt: '0' }, 'black': { wt: '0' } } }
	},
	{
		group: 'insert', //built in: insert
		custom_group: false,
		title: 'Sketch',
		icon: 'highlight', //https://doc.wikimedia.org/oojs-ui/master/demos/?page=icons&theme=wikimediaui&direction=ltr&platform=desktop
		name: 'svgedit_editor',
		dialog: true,
		dialog_type: 'template',
		generate_uuid: true,
		sequence: '{S}',
		shortcut: 'ctrl+alt+s',
		template: { target: { href: 'Template:Editor/SvgEdit', wt: 'Template:Editor/SvgEdit' }, params: { 'file_name': { wt: VeExt_emptyDefaultFileName ? "" : $('#firstHeading').text() + ` sketch-01` }, 'page_name': { wt: `${mw.config.get('wgPageName')}` } } }
	},
	{
		group: 'insert',
		custom_group: false,
		title: 'Diagram',
		icon: 'browser',
		name: 'drawio_editor',
		dialog: true,
		dialog_type: 'template',
		generate_uuid: true,
		sequence: '{D}',
		shortcut: 'ctrl+alt+d',
		template: { target: { href: 'Template:Editor/DrawIO', wt: 'Template:Editor/DrawIO' }, params: { 'file_name': { wt: VeExt_emptyDefaultFileName ? "" : $('#firstHeading').text() + ` diagram-01` }, 'page_name': { wt: `${mw.config.get('wgPageName')}` } } }
	},
	{
		group: 'insert',
		custom_group: false,
		title: 'Graph',
		icon: 'articleDisambiguation',
		name: 'graph_editor',
		dialog: true,
		dialog_type: 'template',
		generate_uuid: true,
		sequence: '{G}',
		shortcut: 'ctrl+alt+g',
		template: { target: { href: 'Template:Editor/Graph', wt: 'Template:Editor/Graph' }, params: { 'file_name': { wt: VeExt_emptyDefaultFileName ? "" : $('#firstHeading').text() + ` graph-01` }, 'page_name': { wt: `${mw.config.get('wgPageName')}` }, 'root': { wt: `${mw.config.get('wgPageName')}` } } }
	},
	{
		group: 'insert',
		custom_group: false,
		title_msg: 'spreadsheet-editor-spreadsheet',
		icon: 'table',
		name: 'spreadsheet_editor',
		dialog: true,
		dialog_type: 'template',
		generate_uuid: true,
		sequence: '{E}',
		shortcut: 'ctrl+alt+e',
		template: { target: { href: 'Template:Editor/Spreadsheet', wt: 'Template:Editor/Spreadsheet' }, params: { 'file_name': { wt: VeExt_emptyDefaultFileName ? "" : $('#firstHeading').text() + ` spreadsheet-01` }, 'page_name': { wt: `${mw.config.get('wgPageName')}` } } }
	},
	{
		group: 'insert',
		custom_group: false,
		title: 'ChemViewer',
		icon: 'labFlask',
		name: 'kekule_viewer',
		dialog: true,
		dialog_type: 'template',
		generate_uuid: true,
		sequence: '{V}',
		shortcut: 'ctrl+alt+v',
		template: { target: { href: 'Template:Viewer/Kekule', wt: 'Template:Viewer/Kekule' }, params: { 'cid': { wt: '2244' }, 'mode': { wt: '2D' } } }
	},
	{
		group: 'insert',
		custom_group: false,
		title: 'ChemEditor',
		icon: 'labFlask',
		name: 'kekule_editor',
		dialog: true,
		dialog_type: 'template',
		generate_uuid: true,
		sequence: '{C}',
		shortcut: 'ctrl+alt+c',
		template: { target: { href: 'Template:Editor/Kekule', wt: 'Template:Editor/Kekule' }, params: { 'file_name': { wt: VeExt_emptyDefaultFileName ? "" : $('#firstHeading').text() + ` chemdoc-01` }, 'page_name': { wt: `${mw.config.get('wgPageName')}` }, 'format': { wt: 'json' } } }
	},
	{
		group: 'insert',
		custom_group: false,
		title: 'Wellplate',
		icon: 'die',
		name: 'wellplate_viewer',
		dialog: true,
		dialog_type: 'template',
		generate_uuid: true,
		sequence: '{W}',
		shortcut: 'ctrl+alt+w',
		template: { target: { href: 'Template:Editor/Wellplate', wt: 'Template:Editor/Wellplate' }, params: { 'file_name': { wt: VeExt_emptyDefaultFileName ? "" : $('#firstHeading').text() + ` wellplate-01` }, 'page_name': { wt: `${mw.config.get('wgPageName')}` } } }
	},
	/*{
		group: 'insert',
		custom_group: false,
		title: 'ParamSet',
		icon: 'table',
		name: 'parameter_set',
		dialog: true,
		dialog_type: 'template',
		sequence: '{P}',
		shortcut: 'ctrl+alt+p',
		template: { target: { href: 'Template:Editor/ParamSet', wt: 'Template:Editor/ParamSet' }, params: { 'name': { wt: `ParamSet 1` }, 'id': { wt: `0001` } } }
	},*/
	/*{
			group: 'insert',
			custom_group: false,
			title: 'ID-Link',
			icon: 'link',
			name: 'id_link',
			dialog: true,
			dialog_type: 'custom_command',
			edit_dialog: false,
			sequence: '{L}',
			shortcut: 'ctrl+alt+l',
			template: { target: {href: '<gets replaced by dialog result', wt: 'subst:<gets replaced by dialog result'} },
			custom_command:  function( surface, args ) {
					args = args || this.args;

							//store current position
							var currentPos = surface.getModel().getFragment().getSelection().getCoveringRange().start;
							OO.ui.prompt( 'Select Building Block (CC)', { textInput: { placeholder: 'Pagename' } } ).done( function ( result ) {
									if ( result !== null ) {
											console.log( 'User typed "' + result + '" then clicked "OK".' );
											//restore position
											//surface.getModel().setLinearSelection(new ve.Range( 0, currentPos ) );
											//surface.getModel().getFragment().collapseToEnd().insertContent( args[0], args[1] ).select();
											var title = mw.Title.newFromText( result ), linkAnnotation = ve.dm.MWInternalLinkAnnotation.static.newFromTitle( title );
											//surface.getModel().getFragment().annotateContent( 'set', 'link/mwInternal', linkAnnotation.element );
					//surface.getModel().getFragment().collapseToEnd().insertContent( [linkAnnotation.element,{ type: '/link/mwInternal' }] );
					surface.getModel().getFragment().collapseToEnd().insertContent( [{ type: 'link/mwInternal', attributes: {title: 'Foo/Bar', origTitle: 'Foo/Bar', normalizedTitle: 'Foo/Bar', lookupTitle: 'Foo/Bar'} }] ).select();
									} else {
											//console.log( 'User clicked "Cancel" or closed the dialog.' );
									}
							} );

			},
},*/
	{
		group: 'insert',
		custom_group: false,
		title: 'Building Block',
		icon: 'puzzle',
		name: 'building_block',
		dialog: true,
		dialog_type: 'custom_dialog',
		edit_dialog: false,
		sequence: '{I}',
		shortcut: 'ctrl+alt+i',
		template: { target: { href: '<gets replaced by dialog result', wt: 'subst:<gets replaced by dialog result' } },
		custom_command: function (surface, args) {
			args = args || this.args;

			//store current position
			var currentPos = surface.getModel().getFragment().getSelection().getCoveringRange().start;
			OO.ui.prompt('Select Building Block (CC)', { textInput: { placeholder: 'Pagename' } }).done(function (result) {
				if (result !== null) {
					//console.log( 'User typed "' + result + '" then clicked "OK".' );
					template = args[0][0].attributes.mw.parts[0].template;
					template.target.href = result;
					template.target.wt = "subst:" + result;
					//restore position
					surface.getModel().setLinearSelection(new ve.Range(0, currentPos));
					surface.getModel().getFragment().collapseToEnd().insertContent(args[0], args[1]).select();
					surface.execute('window', 'open', 'transclusion');
				} else {
					//console.log( 'User clicked "Cancel" or closed the dialog.' );
				}
			});

		},
		custom_dialog2: function (template) {
			return OO.ui.prompt('Select Building Block (CD2)', { textInput: { placeholder: 'Pagename' } }).then(function (result) {
				if (result !== null) {
					template.target.href = result;
					template.target.wt = "subst:" + result;
					return template;
				}
				return null;
			});
		},
		custom_dialog: function (template) {
			var dialog_result = null;
			var textInput = new OO.ui.TextInputWidget({ placeholder: 'Pagename' });
			function ProcessDialog(config) { ProcessDialog.super.call(this, config); }
			OO.inheritClass(ProcessDialog, OO.ui.ProcessDialog);

			ProcessDialog.static.name = 'builing-block-dialog';
			ProcessDialog.static.title = 'Building block';
			ProcessDialog.static.actions = [{ action: 'save', label: 'Done', flags: 'primary' }, { label: 'Cancel', flags: 'safe' }];

			ProcessDialog.prototype.initialize = function () {
				ProcessDialog.super.prototype.initialize.apply(this, arguments);
				this.content = new OO.ui.PanelLayout({ padded: true, expanded: false });
				this.content.$element.append('<p>Here you can select a building block. After saving the page once, you can edit its content.</p><div style="height: 400px"><div id="autocomplete"><input class="autocomplete-input"></input><ul class="autocomplete-result-list"></ul></div></div>');
				//this.content.$element.append( textInput.$element );
				this.$body.append(this.content.$element);
				new Autocomplete('#autocomplete', {
					search: input => {
						const url = mw.config.get("wgScriptPath") + `/api.php?action=ask&query=[[Category:SubstitutionTemplate]]|?Display_title_of=HasDisplayName|?HasDescription&format=json`;
						//const url = mw.config.get("wgScriptPath") + `/api.php?action=ask&query=[[Display_title_of::like:*${input}*]][[!~*QUERY*]]|?Display_title_of=HasDisplayName|?HasDescription&format=json`;
						return new Promise(resolve => {
							if (input.length < 0) { return resolve([]); }
							fetch(url)
								.then(response => response.json())
								.then(data => {
									//convert result dict to list/array
									resultList = Object.values(data.query.results);
									resultList = resultList.filter(fulltext => {
										return fulltext.fulltext.toLowerCase().startsWith(input.toLowerCase());
									});
									//resultList = resultList.filter(result => {
									//	return fulltext.displaytitle.toLowerCase().startsWith(input.toLowerCase());
									//});
									resolve(resultList);
								});
						});
					},
					renderResult: (result, props) => `
					<li ${props}>
						<div class="wiki-title">
							${result.printouts['HasDisplayName'][0]} (${result.fulltext})
						</div>
						<div class="wiki-snippet">
							${result.printouts['HasDescription'][0]}
						</div>
					</li>`,
					getResultValue: result => result.printouts['HasDisplayName'][0],
					onSubmit: result => {
						//console.log(result); 
						dialog_result = result;
					}
				});
			};
			var deferred = $.Deferred();
			ProcessDialog.prototype.getActionProcess = function (action) {
				var dialog = this;
				if (action) {
					return new OO.ui.Process(function () {
						dialog.close({ action: action });
						dialog.$element.remove();  //otherwise not removed from DOM
						if (dialog_result !== null) {
							template.target.href = dialog_result.fulltext;
							template.target.wt = "subst:" + dialog_result.fulltext;
							deferred.resolve(template);
						}

					});
				}

				else { //Cancel
					return new OO.ui.Process(function () {
						dialog.close();
						dialog.$element.remove();  //otherwise not removed from DOM

					});
				}
				//return ProcessDialog.super.prototype.getActionProcess.call( this, action );
			};
			ProcessDialog.prototype.getBodyHeight = function () { return this.content.$element.outerHeight(true); };

			var windowManager = new OO.ui.WindowManager();
			$(document.body).append(windowManager.$element);
			var processDialog = new ProcessDialog({ size: 'medium' });
			windowManager.addWindows([processDialog]);
			windowManager.openWindow(processDialog);
			return deferred.promise();
		}

	}
];


mw.loader.using(['ext.visualEditor.mediawiki']).then(function () {
	function addGroup(target) {
		tool_groups.forEach(function (tool_group) {
			target.static.toolbarGroups.push({
				name: tool_group.name,
				label: tool_group.label,
				type: 'list',
				indicator: 'down',
				include: [{ group: tool_group.name }],
			});
		});
	}
	for (var n in ve.init.mw.targetFactory.registry) {
		addGroup(ve.init.mw.targetFactory.lookup(n));
	}
	ve.init.mw.targetFactory.on('register', function (name, target) {
		addGroup(target);
	});
});

function VeExtensions_create() {

	function get_uuid() {
		return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
			(c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
		);
	}

	template_tools.forEach(function (template_tool) {
		//Create and register command
		template_tool.command_name = template_tool.name + '_command';
		if (!('transclusion_type' in template_tool)) template_tool.transclusion_type = 'mwTransclusionBlock';
		var custom_template = [{ type: template_tool.transclusion_type, attributes: { mw: { parts: [{ template: template_tool.template }] } } }, { type: '/' + template_tool.transclusion_type }];

		//console.log(template_tool)
		if (template_tool.dialog) {
			//Insert template and open dialog
			function InsertAndOpenCommand(name, options) {
				InsertAndOpenCommand.parent.call(this, name, null, null, options);
			}
			OO.inheritClass(InsertAndOpenCommand, ve.ui.Command);
			InsertAndOpenCommand.prototype.execute = function (surface, args) {

				args = args || this.args;
				if (template_tool.generate_uuid && args[0][0].attributes.mw.parts[0].template.params) {
					args[0][0].attributes.mw.parts[0].template.params['uuid'] = { wt: get_uuid() };
				}
				if (template_tool.dialog_type === 'template') {
					surface.getModel().getFragment().collapseToEnd().insertContent(args[0], args[1]).select();
					surface.execute('window', 'open', 'transclusion');
				}
				else if (template_tool.dialog_type === 'custom_dialog') {
					//store current position
					var currentPos = surface.getModel().getFragment().getSelection().getCoveringRange().start;
					template_tool.custom_dialog(args[0][0].attributes.mw.parts[0].template).done(function (template) {
						if (template !== null) {
							//restore position
							surface.getModel().setLinearSelection(new ve.Range(0, currentPos));
							//insert template
							surface.getModel().getFragment().collapseToEnd().insertContent(args[0], args[1]).select();
							//open template edit dialog if requested
							if (template_tool.edit_dialog) surface.execute('window', 'open', 'transclusion');
						}
					});
				}
				else {
					//call custom command
					template_tool.custom_command(surface, args);
				}
				return true;
			};
			ve.ui.commandRegistry.register(
				new InsertAndOpenCommand(template_tool.command_name, {
					args: [custom_template, false],
					supportedSelections: ['linear']
				})
			);
		}
		else {
			//Insert template
			ve.ui.commandRegistry.register(
				new ve.ui.Command(template_tool.command_name, 'content', 'insert', {
					args: [custom_template, false, true],
					supportedSelections: ['linear']
				})
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
			CustomTool.parent.apply(this, arguments);
		}
		if (template_tool.dialog_type === 'custom_command') OO.inheritClass(CustomTool, ve.ui.Tool);
		else OO.inheritClass(CustomTool, ve.ui.MWTransclusionDialogTool);

		CustomTool.static.name = template_tool.name;
		CustomTool.static.group = template_tool.group;
		if (template_tool.custom_group) {
			CustomTool.static.autoAddToCatchall = false;
			CustomTool.static.autoAddToGroup = true;
		}
		if ('title_msg' in template_tool) CustomTool.static.title = OO.ui.deferMsg(template_tool.title_msg);
		else CustomTool.static.title = template_tool.title;
		CustomTool.static.icon = template_tool.icon;
		CustomTool.static.commandName = template_tool.command_name;
		ve.ui.toolFactory.register(CustomTool);

		//Register keyboard shortcut
		if ('shortcut' in template_tool) {
			ve.ui.triggerRegistry.register(template_tool.command_name, {
				mac: new ve.ui.Trigger(template_tool.shortcut.replace('ctrl', 'cmd')),
				pc: new ve.ui.Trigger(template_tool.shortcut)
			});
		}

		//Register input sequence
		if (('sequence' in template_tool) && (template_tool.sequence != null)) {
			ve.ui.sequenceRegistry.register(new ve.ui.Sequence(template_tool.name + '_sequence', template_tool.command_name, template_tool.sequence, template_tool.sequence.length));
		}
	});
}
