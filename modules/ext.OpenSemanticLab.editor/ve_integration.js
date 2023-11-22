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
		group: 'textStyle', //built in: 'meta' (root level), 'format', 'textStyle', 'cite', 'insert'
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
	{
		group: 'meta',
		custom_group: false,
		title: 'ID-Link',
		icon: 'link',
		name: 'id_link',
		dialog: true,
		dialog_type: 'custom_dialog',
		edit_dialog: false,
		is_edit_dialog: true, //also edit existing template with this dialog
		overrides: ['link'], //replaces build-in command 'link'
		transclusion_type: 'mwTransclusionInline', //default: mwTransclusionBlock
		handle_types: ['mwTransclusionInline'], // not 'link/mwInternal'
		sequence: '{L}',
		shortcut: 'ctrl+alt+l',
		template: { target: { href: 'Template:Viewer/Link', wt: 'Template:Viewer/Link' } },
		custom_dialog: function (surface, template) {

			var config = mwjson.util.mergeDeep(osl.ui.getDefaultEditorConfig(), {
				JSONEditorConfig: {
					no_additional_properties: false,
					//keep_oneof_values: true,
					//keep_only_existing_values: true,
				},
				popupConfig: {
					edit_comment: false,
					msg: {
						"dialog-title": mw.message('open-semantic-lab-edit-page-data-dialog-title').plain(),
						"continue": mw.message('open-semantic-lab-edit-page-data-dialog-continue').plain(),
						"cancel": mw.message('open-semantic-lab-edit-page-data-dialog-cancel').plain(),
					}
				},
				target_namespace: "Item"
			});

			if (template.params) {
				console.log("Params: ", template.params);
				config.data = {};
				config.data.page = template.params.page?.wt;
				config.data.url = template.params.url?.wt;
				config.data.label = template.params.label?.wt;
			}

			// use selected text as label if available
			if (!config.data?.label) {
				var selectedText = surface.getModel().getFragment().getText();
				if (selectedText && selectedText !== "") {
					if (!config.data) config.data = {};
					config.data.label = selectedText;
				}
			}

			var deferred = $.Deferred();

			const promise = new Promise((resolve, reject) => {

				$.when(
					mwjson.editor.init()
				).done(function () {

					config.schema = {
						"title": "Link",
						"title*": {"de": "Link"},
						"description": "Link to an internal or external page",
						"description*": {"de": "Link zu einer internen or externen Seite"},
						"required": ["page",  "url", "label"],
						//"required": ["label"],
						//"defaultProperties": ["label"],
						"properties": {

							"label": {
								"title": "Label (optional)",
								"title*": {"de": "Beschriftung (optional)"},
								"description": "If not set, the no text (external) or the page name (internal) will be displayed.",
								"description*": {"de": "Falls nicht gesetzt wird kein Text (extern) oder der Seitenname (intern) angezeigt."},
								"type": "string",
								"format": "text"
							},
						/*},
						"oneOf": [
							{
								"title": "Internal", 
								"required": ["page"], 
								"properties": {*/
									"page": {
										"title": "Page (internal link)",
										"title*": {"de": "Seite (interner Link)"},
										"description": "Type in the field so select an existing page or create a new one using the button on the right.",
										"description*": {"de": "Durch Tippen in das Feld kann eine existierende Seite ausgewählt oder eine neue mit der Schaltfläche rechts erstellt werden."},
										"type": "string",
										"format": "autocomplete",
										"options": {
											"autocomplete": {
												"category": "Category:Entity"
											},
											"_dependencies": {
												"root.url": ""
											}
										}
									},
								/*}
							},
							{
								"title": "External", 
								"required": ["url"], 
								"properties": {*/
									"url": {
										"title": "URL (external link)",
										"title*": {"de": "URL (externer Link)"},
										"description": "Links to an external page. Skip the internal page field in this case.",
										"description*": {"de": "Link zu einer externen Seite. Das Feld für die interne Seite sollte in diesem Fall leer gelassen werden."},
										"type": "string",
										"format": "url",
										"options": {
											"_dependencies": {
												"root.target": ""
											}
										}
									},
								},
							//},
						//],

					}

					//const editor_promise = new Promise((editor_resolve, editor_reject) => {
						config.onsubmit = (jsondata) => {
							//mwjson.api.getPage(jsondata.page).then((page) => {

								template.target = { href: 'Template:Viewer/Link', wt: 'Template:Viewer/Link' };
								template.params = { 
										'page': { wt: jsondata.page }, 
										'url': { wt: jsondata.url }, 
										'label': { wt: jsondata.label } 
								};
								//editor_resolve();
								
								resolve();
								//resolve(template);
								deferred.resolve(template);
							//});
							//return editor_promise;
							return promise;
						}
					//});
					
					config.popupConfig.size = "medium";
					config.popupConfig.toggle_fullscreen = true;
					var editor = new mwjson.editor(config)
				});

			});
			//return promise;
			return deferred.promise();
		},
	},
	{
		group: 'meta',
		custom_group: false,
		title: 'ID-Media',
		icon: 'media',
		name: 'id_media',
		dialog: true,
		dialog_type: 'custom_dialog',
		edit_dialog: false,
		is_edit_dialog: true, //also edit existing template with this dialog
		overrides: ['media', 'gallery'], //replaces build-in command 'media'
		transclusion_type: 'mwTransclusionBlock', //default: mwTransclusionBlock
		handle_types: ['mwTransclusionBlock'], // not 'link/mwInternal'
		sequence: '{L}',
		shortcut: 'ctrl+alt+l',
		template: { target: { href: 'Template:Viewer/Media', wt: 'Template:Viewer/Media' } },
		custom_dialog: function (surface, template) {

			var config = mwjson.util.mergeDeep(osl.ui.getDefaultEditorConfig(), {
				JSONEditorConfig: {
					no_additional_properties: false,
					//keep_oneof_values: true,
					//keep_only_existing_values: true,
				},
				popupConfig: {
					edit_comment: false,
					msg: {
						"dialog-title": mw.message('open-semantic-lab-edit-page-data-dialog-title').plain(),
						"continue": mw.message('open-semantic-lab-edit-page-data-dialog-continue').plain(),
						"cancel": mw.message('open-semantic-lab-edit-page-data-dialog-cancel').plain(),
					}
				},
				target_namespace: "Item"
			});

			if (template.params) {
				//console.log("Params: ", template.params);
				config.data = {};
				config.data.image_size = template.params.image_size?.wt;
				config.data.mode = template.params.mode?.wt;
				if (template.params.textdata?.wt) {
					var lines = template.params.textdata.wt.split(";");
					config.data.elements = [];
					for (var line of lines) {
						line = line.replace(/^\s+|\s+$/g, ''); //trim whitespace
						if (line === "") continue;
						config.data.elements.push({
							file: line.split("{{!}}")[0].replace(/^\s+|\s+$/g, ''), //trim whitespace
							description: line.split("{{!}}")[1]
						})
					}
				}
			}

			var deferred = $.Deferred();

			const promise = new Promise((resolve, reject) => {

				$.when(
					mwjson.editor.init()
				).done(function () {

					config.schema = {
						"title": "Multimedia",
						"title*": {"de": "Multimedia"},
						"description": "Gallery of one or multiple images / videos",
						"description*": {"de": "Galerie mit einem oder mehreren Bilder / Videos"},
						"required": ["elements",  "image_size", "mode"],
						"properties": {
							"image_size": {
								"title": "Size in px",
								"title*": {"de": "Größe in px"},
								"description": "Size of the elements in pixels",
								"description*": {"de": "Größe der Elemente in Pixeln"},
								"type": "string",
								"format": "number",
								"default": "300"
							},
							"mode": {
								"title": "Display mode",
								"title*": {"de": "Anzeigemodus"},
								"description": "Defines  how the elements are displayed",
								"description*": {"de": "Definiert wie die Elemente angezeigt werden"},
								"type": "string",
								"enum": ["default", "slideshow"],
								"default": "default",
								"options": {
									"enum_titles": ["Default (show all elements side by side)", "Slideshow (Navigate through the elements one by one)"],
									"enum_titles*": {"de": ["Standard (alle Elemente nebeneinander anzeigen)", "Diashow (nacheinander durch die Elemente navigieren)"]}
								}
							},
							"elements": {
									"title": "Media elements",
									"title*": {"de": "Medienelemente"},
									"description": "Images and videos to insert",
									"description*": {"de": "Bilder und Videos die eingefügt werden sollen"},
									"type": "array",
									"format": "table",
									"items": {
										"type": "object",
										"title": "Element",
										"title*": {"de": "Element"},
										"required": ["file",  "description"],
										"properties": {
											"file": {
												"title": "File",
												"title*": {"de": "Datei"},
												"type": "string",
												"format": "autocomplete",
												"range": "Category:OSW11a53cdfbdc24524bf8ac435cbf65d9d",
												"options": {
													"autocomplete": {
														"$comment": "instance of WikiFile",
														"category": "Category:OSW11a53cdfbdc24524bf8ac435cbf65d9d"
													}
												},
												"links": [
													{
													  "href": "{{#if self}}/w/index.php?title=Special:Redirect/file/{{self}}&width=200&height=200{{/if}}",
													  "mediaType": "image",
													  "_mediaType": "{{#when {{#split '.' -1}}{{self}}{{/split}} 'eq' 'mp4'}}video{{else when {{#split '.' -1}}{{self}}{{/split}} 'eq' 'mov'}}video{{else}}image{{/when}}"
													}
												  ]
											},
											"description": {
												"title": "Description",
												"title*": {"de": "Beschreibung"},
												"description": "Gets displayed below the element",
												"description*": {"de": "Wird unter dem Element angezeigt"},
												"type": "string",
												"format": "textarea"
											}
										}
									}
								}
							}
					}

					//const editor_promise = new Promise((editor_resolve, editor_reject) => {
						config.onsubmit = (jsondata) => {
							mwjson.api.getPage(mw.config.get('wgPageName')).then((page) => {
								var page_jsondata = page.slots['jsondata']; // note: if undefinded we are on a "classic" page without jsondata slot 
								if (page_jsondata && mwjson.util.isString(page_jsondata)) page_jsondata = JSON.parse(page_jsondata);
								//template.target.href = dialog_result.fulltext;
								//template.target.wt = "subst:" + dialog_result.fulltext;
								console.log(template);
								template.target = { href: 'Template:Viewer/Media', wt: 'Template:Viewer/Media' };
								template.params = { 
										'image_size': { wt: jsondata.image_size },
										'mode': { wt: jsondata.mode },
								};
								if (jsondata.elements) {
									var textdata = "";
									if (page_jsondata && !page_jsondata.attachments) page_jsondata.attachments = [];

									for (const element of jsondata.elements) {
										var description = element.description ? element.description : "";
										textdata += "\n" + element.file + "{{!}}" + description + ";";

										if (page_jsondata && !page_jsondata.attachments.includes(element.file)) {
											page_jsondata.attachments.push(element.file);
											//console.log("Add attachement:", element.file);
											page.slots_changed['jsondata'] = true;
										}
									}
									template.params['textdata'] = {wt: textdata};
									
									if (page_jsondata) {
										page.slots['jsondata'] = page_jsondata;
										mwjson.api.updatePage(page, {comment: "Add attachment"}).done((page) => {
								
										});
									}
								}
								//editor_resolve();
								
								resolve();
								//resolve(template);
								deferred.resolve(template);
							});
							//return editor_promise;
							return promise;
						}
					//});
					
					config.popupConfig.size = "large";
					config.popupConfig.toggle_fullscreen = true;
					var editor = new mwjson.editor(config)
				});

			});
			//return promise;
			return deferred.promise();
		},
	},
	/*{
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
		custom_dialog2: function (surface, template) {
			return OO.ui.prompt('Select Building Block (CD2)', { textInput: { placeholder: 'Pagename' } }).then(function (result) {
				if (result !== null) {
					template.target.href = result;
					template.target.wt = "subst:" + result;
					return template;
				}
				return null;
			});
		},
		custom_dialog: function (surface, template) {
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

	}*/
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

					if (args[0] === "transclusion") {
						//console.log("Edit existing template");
						var existing_template = surface.getModel().documentModel.data.data[currentPos].attributes.mw.parts[0].template;
						//console.log(existing_template);
						template_tool.custom_dialog(surface, existing_template).done(function (template) {
							if (template !== null) {
								//console.log("edited", template);
								args[1].onTearDownCallback();
								var surfaceModel = surface.getModel();
								var selection = surfaceModel.getSelection();
								// If selection is an instance of ve.dm.LinearSelection (as opposed to NullSelection or TableSelection)
								// you can get a range (start and end offset) using:
								var range = selection.getRange();
								// Get the current position "from"
								//var selectedRange = new ve.Range(range.from);
								var fragment = surface.getModel().getFragment(); //surfaceModel.getLinearFragment( range );
								new_args = [{ type: template_tool.transclusion_type, attributes: { mw: { parts: [{ template: template }] } } }, { type: '/' + template_tool.transclusion_type }];
								fragment.insertContent(new_args, false).select();

								//restore position
								//surface.getModel().setLinearSelection(new ve.Range(0, currentPos));
								//insert template
								//surface.getModel().getFragment().collapseToEnd().insertContent(args[0], args[1]).select();
								//open template edit dialog if requested
								//if (template_tool.edit_dialog) surface.execute('window', 'open', 'transclusion');
							}
						});
					}
					else {
						//var fresh_template = JSON.parse(JSON.stringify(args[0][0].attributes.mw.parts[0].template)); //deepcopy
						var fresh_template = args[0][0].attributes.mw.parts[0].template;
						fresh_template.params = {}; //reset params
						template_tool.custom_dialog(surface, fresh_template).done(function (template) {
							if (template !== null) {

								//restore position
								//console.log("Restore position ", currentPos);
								//surface.getModel().setLinearSelection(new ve.Range(0, currentPos));

								//insert template (don't replace existing)
								//surface.getModel().getFragment().collapseToEnd().insertContent(args[0], args[1]).select();
								//insert template (replace existing)
								surface.getModel().getFragment().insertContent(args[0], args[1]).select();

								//open template edit dialog if requested
								if (template_tool.edit_dialog) surface.execute('window', 'open', 'transclusion');
							}
						});
					}
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

		//Create and register tool (skip for tools overriding build-ins)
		if (!template_tool.overrides) {
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
		}

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

	// monkey patch command registry
	// look if a command handles a specific template
	// if yes, call it directly to edit the already existing template
	ve.ui.commandRegistry.lookup = function(name) {

		var replacement_name = null;
		var replacement_tool = null;
		for(let template_tool of template_tools) {
			if (template_tool.overrides) {
				if (!Array.isArray(template_tool.overrides)) template_tool.overrides = [template_tool.overrides];
				if (template_tool.overrides.includes(name)) {
					replacement_name = template_tool.name + "_command";
					replacement_tool = template_tool;
					break;
				}
			}
		};

		//console.log(name);
		if (name === 'transclusion' && ve.init.target.getSurface() && ve.init.target.getSurface().getModel().getFragment().getSelection().getCoveringRange()) {
			var currentPos = ve.init.target.getSurface().getModel().getFragment().getSelection().getCoveringRange().start;
			var data = ve.init.target.getSurface().getModel().documentModel.data.data[currentPos];
			//console.log(data);
			var annotations = ve.init.target.getSurface().getModel().getFragment().getAnnotations(true);
			//	.filter( function ( annotation ) {
			//	return annotation.getType() === 'link/mwInternal';
			//} );
			if (annotations?.storeHashes) {
				for (let hash of annotations.storeHashes) {
					var annotation = annotations.store.hashStore[hash].element;
					//console.log(annotation);
					if (annotation.type !== 'mwTransclusionBlock') {
						replacement_name = null;
						replacement_tool = null;
					}
				}
			}

			var template = null;
			if (data.attributes)
				if (data.attributes.mw)
					if (data.attributes.mw.parts)
						if (data.attributes.mw.parts[0])
							if (data.attributes.mw.parts[0].template)
								template = data.attributes.mw.parts[0].template;
			//console.log(template);
			if (template)
				for(let template_tool of template_tools) {
					if (template_tool.is_edit_dialog) {
						var tool_template = template_tool.template.target.wt.replace("Template:", "").replace(/^\s+|\s+$/g, ''); //normalize, trim whitespace
						var wt_template = template.target.wt.replace("Template:", "").replace(/^\s+|\s+$/g, ''); //normalize, trim whitespace
						if (tool_template === wt_template) {
							name = template_tool.name + "_command";
							break;
						}
					}
				};
		}
		//console.log(name);
		//if (hasOwn.call(this.registry, name)) {
		if (replacement_name) name = replacement_name;
		if (this.registry.hasOwnProperty(name)) {
			return this.registry[name];
		}
	}
}
