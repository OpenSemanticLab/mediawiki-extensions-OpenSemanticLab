/*@nomin*/
/* 
Helper class to copy, auto edit and print pages
*/

$(document).ready(function () {

    $.when(
        mw.loader.using('ext.mwjson.util'),
        mw.loader.using('ext.mwjson.api'),
        mw.loader.using('ext.mwjson.parser'),
        mw.loader.using('ext.mwjson.editor'),
        //$.getScript("//cdnjs.cloudflare.com/ajax/libs/jspdf/2.4.0/jspdf.umd.js"),
        //$.getScript("//cdnjs.cloudflare.com/ajax/libs/html2canvas/1.1.5/html2canvas.js"),
        //$.getScript("//cdnjs.cloudflare.com/ajax/libs/dompurify/2.0.12/purify.min.js"),
        //$.getScript("//cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.9.3/html2pdf.bundle.min.js"),
        //$.getScript("//cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"),
        new mw.Api().loadMessagesIfMissing([
            'open-semantic-lab-copy-page',
            'open-semantic-lab-print-page',
            'open-semantic-lab-print-settings',
            'open-semantic-lab-print-section-settings',
            "open-semantic-lab-create-page-dialog-continue",
            "open-semantic-lab-create-page-dialog-cancel",
            "open-semantic-lab-create-page-dialog-title-label",
            "open-semantic-lab-create-page-dialog-template-label",
            "open-semantic-lab-create-page-dialog-page-exists-warning",
            "open-semantic-lab-create-task",
            "open-semantic-lab-create-task-from-template",
            "open-semantic-lab-edit-page-schema",
            "open-semantic-lab-edit-page-data",
            "open-semantic-lab-edit-page-data-dialog-title",
            "open-semantic-lab-edit-page-data-dialog-continue", 
            "open-semantic-lab-edit-page-data-dialog-cancel", 
            "open-semantic-lab-edit-page-slots",
            "open-semantic-lab-edit-page-slots-dialog-title",
            "open-semantic-lab-edit-page-slots-dialog-continue", 
            "open-semantic-lab-edit-page-slots-dialog-cancel", 
            "open-semantic-lab-create-subcategory",
            "open-semantic-lab-create-instance",
            "open-semantic-lab-query-instance",
            "open-semantic-lab-query-dialog-title",
            "open-semantic-lab-query-dialog-continue", 
            "open-semantic-lab-query-dialog-cancel", 
            "open-semantic-lab-preview",
        ])
    ).done(function () {

        //Create Copy link in the page tools sidebar
        //ToDo: Only in namespace main, otherwise (uu)ids need to be changed
        mwjson.util.addBarLink({
            "label": mw.message('open-semantic-lab-copy-page'),
            "href": `javascript:mwjson.editor.createCopyPageDialog({
                "msg": {
                    "continue": "${mw.message('open-semantic-lab-create-page-dialog-continue')}", 
                    "cancel": "${mw.message('open-semantic-lab-create-page-dialog-cancel')}",
                    "title-label": "${mw.message('open-semantic-lab-create-page-dialog-title-label')}",
                    "template-label": "${mw.message('open-semantic-lab-create-page-dialog-template-label')}", 
                    "page-exists-warning": "${mw.message('open-semantic-lab-create-page-dialog-page-exists-warning')}",
                }
            })`
        });

        $(".PageBot-Action").each(function () {
            //see also: https://www.mediawiki.org/wiki/Manual:Interface/JavaScript
            var defaultOptions = {
                "type": "button",
                "label": mw.message('open-semantic-lab-create-task-from-template').text(),
            };
            var userOptions = {};

            if (this.dataset.config) userOptions = JSON.parse(this.dataset.config);
            else if (this.innerText !== "") userOptions = JSON.parse(this.innerText); //Legacy support
            var config = mwjson.util.mergeDeep(defaultOptions, userOptions);

            if (config.type === "button") {
                //var button = new OO.ui.ButtonWidget({
                //    label: config.label
                //});
                //var $element = button.$element;
                //button.setIcon( 'templateAdd' ); //does not work
                //note: msgs need to be resolved here because they are prefetched

                var $element = $('<span class="actionable_button add_action" style="background-color:indigo"><a>' + config.label + '</a></span>');
                $element.find('a').attr('href',
                    `javascript:mwjson.editor.createPageDialog({
                        "msg": { 
                            "dialog-title": "${mw.message('open-semantic-lab-create-task')}", 
                            "continue": "${mw.message('open-semantic-lab-create-page-dialog-continue')}", 
                            "cancel": "${mw.message('open-semantic-lab-create-page-dialog-cancel')}",
                            "title-label": "${mw.message('open-semantic-lab-create-page-dialog-title-label')}",
                            "template-label": "${mw.message('open-semantic-lab-create-page-dialog-template-label')}", 
                            "template-preview-label": "${mw.message('open-semantic-lab-preview')}",
                            "page-exists-warning": "${mw.message('open-semantic-lab-create-page-dialog-page-exists-warning')}",
                        },
                        "title": "Action:" + mwjson.util.OslId(),
                        "hide_title": true,
                        "hide_template": false,
                        "hide_template-preview": false,
                        "template_autocomplete": {"query": () => "[[Category:ELN/Order/Actionable/Template]]|?Display_title_of=HasDisplayName|?HasDescription"},
                        "modifications": [
                            {"template": "OslTemplate:ELN/Order/Actionable", "path": "RELATED_ARTICLE", "value": mw.config.get( 'wgPageName' )},
                            {"template": "OslTemplate:ELN/Order/Actionable", "path": "IS_TEMPLATE", "value": 'No'},
                            {"template": "OslTemplate:ELN/Order/Actionable", "path": "copy_of", "value": (config) => config.template}
                        ],
                        "redirect": (page) => new mw.Title( page.title ).getUrl({"action": "formedit", "returnto": mw.config.get( 'wgPageName' )})
                    })`
                )
                $(this).append($element);
            }
            /*mwjson.util.addBarLink({"label": mw.message('open-semantic-lab-copy-page'), 
                "href": `javascript:mwjson.editor.createPageDialog({
                    "template_autocomplete": {"query": () => "[[Category:ELN/Order/Actionable]]|?Display_title_of=HasDisplayName|?HasDescription"},
                    "modifications": [{"template": "OslTemplate:ELN/Order/Actionable", "path": "RELATED_ARTICLE", "value": mw.config.get( 'wgPageName' )}]
                })
            `});*/
        });

        //Create tile that links to a popup editor
        $(".pagebot-tile").each(function () {
            var defaultOptions = {
                "type": "button",
                "action": "create-instance"
            };
            var userOptions = {};

            if (this.dataset.config) userOptions = JSON.parse(this.dataset.config);
            else if (this.innerText !== "") userOptions = JSON.parse(this.innerText); //Legacy support
            var config = mwjson.util.mergeDeep(defaultOptions, userOptions);
            const user_lang = mw.config.get( 'wgUserLanguage' );

            mwjson.api.getPage(config.categories[0]).then((page) => {
                var schema = page.slots['jsonschema'];
                if (mwjson.util.isString(schema)) schema = JSON.parse(schema);
                var title = schema["title"];
                if (schema['title*'] && schema['title*'][user_lang]) title = schema['title*'][user_lang];
                //else if (schema['label'] && schema['label']['en']) title = schema['label']['en'];
                var description = schema["description"];
                if (schema['description*'] && schema['description*'][user_lang]) description = schema['description*'][user_lang];
                //else if (schema['description'] && schema['description']['en']) description = schema['description']['en'];
                console.log(title, description);
                $(this).find(".custom-link-tile2_title").text(title);
                $(this).find(".custom-link-tile2_text").text(description);
                if (config.action === "create-instance") {
                    $(this).find(".custom-link-tile2_btn").append($(`<a href='javascript:osl.ui.createInstance(["${config.categories[0]}"]);'>${mw.message('open-semantic-lab-create-instance').text()}</a>`))
                }
                else if (config.action === "query-instance") {
                    $(this).find(".custom-link-tile2_btn").append($(`<a href='javascript:osl.ui.queryInstance(["${config.categories[0]}"]);'>${mw.message('open-semantic-lab-query-instance').text()}</a>`))
                }

                $(this).css('visibility', 'visible');
                $(this).parent().removeClass('linear-background');
            });
        });

        //Create Print link in the page tools sidebar
        mwjson.util.addBarLink({
            "label": mw.message('open-semantic-lab-print-page'),
            "href": `javascript:osl.ui.printPage();`
        });

        //Create Slot edit link in the page tools sidebar
        mwjson.util.addBarLink({
            "label": mw.message('open-semantic-lab-edit-page-data'),
            "href": `javascript:osl.ui.editData('jsondata');`
        });

        //Create Slot edit link in the page tools sidebar
        mwjson.util.addBarLink({
            "label": mw.message('open-semantic-lab-edit-page-slots'),
            "href": `javascript:osl.ui.editSlots({"include": ["jsonschema", "jsondata"], "hide": ["footer", "header"]});`
        });

        if (mw.config.get( 'wgPageName' ).startsWith("Category:") && !["Category:Category", "Category:Entity"].includes(mw.config.get( 'wgPageName' ))) {
            mwjson.util.addBarLink({
                "label": mw.message('open-semantic-lab-edit-page-schema'),
                "href": `javascript:osl.ui.editData('jsonschema');`
            });
            mwjson.util.addBarLink({
                "label": mw.message('open-semantic-lab-create-subcategory'),
                "href": `javascript:osl.ui.createSubcategory();`
            });
            mwjson.util.addBarLink({
                "label": mw.message('open-semantic-lab-create-instance'),
                "href": `javascript:osl.ui.createInstance();`
            });
            mwjson.util.addBarLink({
                "label": mw.message('open-semantic-lab-query-instance'),
                "href": `javascript:osl.ui.queryInstance();`
            });
        }
    });
});

osl.util = class {
    constructor() {
    }

    static postProcessPage(page) {
        if (page.slots['jsondata']) {
            if (mwjson.util.isString(page.slots['jsondata']))
                page.slots['jsondata'] = JSON.parse(page.slots['jsondata'])
            var org_name = page.slots['jsondata']['name'];
            var name = "";
            if (!org_name || org_name === "") {
                if (page.slots['jsondata']['label'] && page.slots['jsondata']['label'][0]) {
                    name = page.slots['jsondata']['label'][0]['text'];
                }
                else if (page.slots['jsondata']['label']) {
                    name = page.slots['jsondata']['label']['text'];
                }
                name = mwjson.util.toPascalCase(name);
            }
            else name = org_name;
            
            if (name != org_name) {
                page.slots['jsondata']['name'] = name;
                page.slots_changed['jsondata'] = true;
            }
        }
        if (page.slots['jsonschema']) {
            if (mwjson.util.isString(page.slots['jsonschema']))
                page.slots['jsonschema'] = JSON.parse(page.slots['jsonschema'])
            var org_title =  page.slots['jsonschema']['title'];
            var title = "";
            if ((!org_title || org_title === "") && page.slots['jsondata']) {
                title = page.slots['jsondata']['name'];
            }
            else title = org_title
            if (title != org_title) {
                page.slots['jsonschema']['title'] = name;
                page.slots_changed['jsonschema'] = true;
            }
        }
        return page;
    }
}

osl.ui = class {
	constructor() {
    }

    static printPage() {
        console.log("Print PDF");

        var config = {
            JSONEditorConfig: {disable_collapse: true},
            popupConfig: {			
                msg: {
                    "dialog-title": mw.message('open-semantic-lab-print-settings').plain(),
                    "continue": mw.message('open-semantic-lab-print-page').plain(), 
                    "cancel": mw.message('open-semantic-lab-create-page-dialog-cancel').plain(), 
                }
            }
        };

        //generate list of all print section classes
        var classes = [];
        var msgs = ["open-semantic-lab-print-settings"];
        $('[class]').each(function () {
            $($(this).attr('class').split(' ')).each(function () {
                if (this.length > 0 && $.inArray(this.valueOf(), classes) === -1) {
                    var value = this.valueOf()
                    if (value.startsWith('print-section-')) {
                        classes.push(value);
                        msgs.push('open-semantic-lab-' + value);
                    }
                }
            });
        });

        $.when(
            mw.loader.using('ext.OpenSemanticLab.print'),
            new mw.Api().loadMessagesIfMissing(msgs),
            mwjson.editor.init()
        ).done(function () {

            config.schema = {
                "type": "object",
                "title": mw.message('open-semantic-lab-print-section-settings').plain(),
                "required": [],
                "properties": {
                }
            }

            classes.forEach(element => {
                console.log(element);
                var property_schema = {
                    "type": "boolean",
                    "format": "checkbox",
                    "default": true,
                    "title": mw.message('open-semantic-lab-' + element).plain()
                };
                config.schema.properties[element] = property_schema;
                config.schema.required.push(element);
            });

            config.onsubmit = (print_config) => {
                console.log(print_config);
                //return;
                var inputHtml = document.getElementById('bodyContent');
                /*var jsPDF = window.jspdf.jsPDF;
                var doc = new jsPDF({orientation:'portrait', unit:'px', format:'a4', hotfixes: ["px_scaling"]});
                
                //http://raw.githack.com/MrRio/jsPDF/master/docs/module-html.html
                doc.html(inputHtml, {
                    autoPaging: 'text',
                    //margin: [10, 10, 10, 10],
                    //see https://html2canvas.hertzen.com/configuration
                    html2canvas: {  
                        //async: true,
                        logging: true,
                        //backgroundColor: null,
                        //allowTaint: true,
                        //foreignObjectRendering: true, //creates svg images, not supported by pdfjs yet
                        //removeContainer: true
                    }, 
                    callback: function (doc) {
                        doc.save("file.pdf");
                    }
                });*/
                //$('h2 > span.mw-headline').addClass('pdf-page-break-before');
                $('.noprint').hide();
                //$('.printonly').show();
                $('.printonly').addClass('printonly-print').removeClass('printonly');
                $('#toc').hide();
                //$('.mw-editsection').hide(); //confict with ve_extensions
                for (var key of Object.keys(print_config)) {
                    if (!print_config[key]) { //hide unselected elements
                        $('.' + key).hide();
                        $('#' + key).hide();
                    }
                }
                const pageUrl = (mw.config.get( 'wgServer' ) + mw.config.get( 'wgArticlePath' )).replace('$1', mw.config.get( 'wgPageName' ));
                $('<div id="firstHeadingCopy"><h1 class="firstHeading"><a class="external text" href="' + pageUrl + '">'+ $('#firstHeading').text() + '</a></h1></div>').insertBefore('#mw-content-text');
                var opt = {
                    margin: 2,
                    //filename: 'myfile.pdf',
                    image: { type: 'jpeg', quality: 0.95 },
                    html2canvas: { scale: 2 },
                    //jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' },
                    jsPDF:        { format: 'a3', orientation: 'portrait' },
                    //pagebreak: { mode: ['css', 'legacy'], before: ['.pdf-page-break-before'], avoid: 'img' },
                    //pagebreak: { mode: ['avoid-all'], before: ['.pdf-page-break-before'], avoid: 'img' },
                    pagebreak: { mode: ['avoid-all'], avoid: 'img'},
                    //ignoreElements: (node) => { return node.className === 'noprint';}
                };
                //html2pdf(inputHtml,opt);
                html2pdf().from(inputHtml).set(opt).toPdf().get('pdf')//.save();
                    .then(function (pdfObject) {
                        $('#firstHeadingCopy').remove();
                        $('.noprint').show();
                        //$('.printonly').hide();
                        $('.printonly-print').addClass('printonly').removeClass('printonly-print');
                        $('#toc').show();
                        //$('.mw-editsection').show(); confict with ve_extensions
                        for (var key of Object.keys(print_config)) {
                            if (!print_config[key]) { //show unselected elements
                                $('.' + key).show();
                                $('#' + key).show();
                            }
                        }
                        //mw.config.get( 'wgTitle' ) + "_"
                        pdfObject.save($('#firstHeading').text().replace(' ','_') + ".pdf");
                    })
            }
            var editor = new mwjson.editor(config)
        });
    }

    static editData(dataslot = 'jsondata') {

        var config = {
            JSONEditorConfig: {
                no_additional_properties: false
            },
            popupConfig: {			
                msg: {
                    "dialog-title": mw.message('open-semantic-lab-edit-page-data-dialog-title').plain(),
                    "continue": mw.message('open-semantic-lab-edit-page-data-dialog-continue').plain(), 
                    "cancel": mw.message('open-semantic-lab-edit-page-data-dialog-cancel').plain(), 
                }
            }
        };

        const promise = new Promise((resolve, reject) => {

            $.when(
                mwjson.api.getPage(mw.config.get( 'wgPageName' )),
                mwjson.editor.init()
            ).done(function (page) {

                //build schema
                var jsondata = page.slots[dataslot];
                if (mwjson.util.isString(jsondata)) jsondata = JSON.parse(jsondata);

                if (dataslot === 'jsondata') {

                    config.JSONEditorConfig.disable_properties = false;
                    config.JSONEditorConfig.show_opt_in = false;
                    config.JSONEditorConfig.display_required_only = false;
                    config.JSONEditorConfig.disable_array_reorder = true;
			        config.JSONEditorConfig.disable_array_delete_all_rows = true;
			        config.JSONEditorConfig.disable_array_delete_last_row = true;

                    if (page.title.startsWith("Category:")) config.schema = {"$ref": "/wiki/Category:Category?action=raw&slot=jsonschema"};
                    else if (page.slots['jsonschema']) config.schema = page.slots['jsonschema'];
                    else if (jsondata.type) {
                        config.schema = {"allOf": []}
                        if (Array.isArray(jsondata.type)) {
                            for (const category of jsondata.type) {
                                config.schema["allOf"].push({"$ref": "/wiki/" + category + "?action=raw&slot=jsonschema"})
                            }
                        }
                        else if (typeof jsondata.type === 'string' || jsondata.type instanceof String) {
                            config.schema["allOf"].push({"$ref": "/wiki/" + jsondata.type + "?action=raw&slot=jsonschema"})
                        }
                        else {
                            console.log("Error: Page has no jsonschema");
                            return;
                        }
                    }
                    else {
                        console.log("Error: Page has no jsonschema");
                        return;
                    }
                }
                else if (dataslot === 'jsonschema') {
                    config.schema = mwjson.schema.jsonschema_jsonschema;
                    
                    config.JSONEditorConfig.disable_edit_json = false;
                    config.JSONEditorConfig.disable_properties = false;
                    config.JSONEditorConfig.show_errors = 'never';
                }
                else {
                    console.log("Error: No jsonschema defined");
                    return;
                }
                config.data = jsondata;

                config.onsubmit = (jsondata) => {
                    
                    page.slots[dataslot] = jsondata;
                    page.slots_changed[dataslot] = true;

                    osl.util.postProcessPage(page);

                    console.log(page);
                    mwjson.api.updatePage(page).done((page) => {
                        resolve()
                        window.location.href = window.location.href; //reload page
                    });
                    
                }
                config.popupConfig.size = "larger";
                config.popupConfig.toggle_fullscreen = true;
                var editor = new mwjson.editor(config)
            });
        });

        return promise;
    }

    static editSlots(_config) {

        var config = {
            JSONEditorConfig: {
                disable_collapse: true,
                disable_edit_json: false,
                disable_properties: false,
                no_additional_properties: false,
            },
            popupConfig: {
                msg: {
                    "dialog-title": mw.message('open-semantic-lab-edit-page-slots-dialog-title').plain(),
                    "continue": mw.message('open-semantic-lab-edit-page-slots-dialog-continue').plain(),
                    "cancel": mw.message('open-semantic-lab-edit-page-slots-dialog-cancel').plain(),
                }
            }
        };

        const promise = new Promise((resolve, reject) => {

            $.when(
                //mw.loader.using('ext.mwjson.editor.ace'),
                mwjson.api.getPage(mw.config.get('wgPageName')),
                mwjson.editor.init()
            ).done(function (page) {

                config.schema = page.schema;
                if (mwjson.util.isString(config.schema)) config.schema = JSON.parse(config.schema);
                if (config && _config.hide) {
                    for (const slot_key of _config.hide) {
                        if (config.schema.properties[slot_key]) config.schema.properties[slot_key]['options'] = {hidden: true};
                    }
                }
                if (config && _config.include) {
                    for (const slot_key of _config.include) {
                        config.schema.defaultProperties = [];
                        if (config.schema.properties[slot_key]) config.schema.defaultProperties.push(slot_key);
                    }
                }
                
                config.data = page.slots;

                config.onsubmit = (slots) => {
                    page.slots = slots;
                    console.log(page.slots);
                    for (var slot_key of Object.keys(page.slots)) {
                        page.slots_changed[slot_key] = true;
                    }

                    osl.util.postProcessPage(page);

                    mwjson.api.updatePage(page).done((page) => {
                        resolve();
                        window.location.href = window.location.href; //reload page
                    });
                }
                config.popupConfig.size = "larger";
                config.popupConfig.toggle_fullscreen = true;
                var editor = new mwjson.editor(config)
            });
        });

        return promise;
    }

    static createSubcategory(super_categories = [mw.config.get( 'wgPageName' )]) {

        var config = {
            JSONEditorConfig: {
                no_additional_properties: false
            },
            popupConfig: {			
                msg: {
                    "dialog-title": mw.message('open-semantic-lab-edit-page-data-dialog-title').plain(),
                    "continue": mw.message('open-semantic-lab-edit-page-data-dialog-continue').plain(), 
                    "cancel": mw.message('open-semantic-lab-edit-page-data-dialog-cancel').plain(), 
                }
            },
            target_namespace: "Category"
        };

        const promise = new Promise((resolve, reject) => {

            $.when(
                mwjson.editor.init()
            ).done(function () {

                config.schema = {"allOf": []}
                config.schema.allOf.push({"$ref": "/wiki/Category:Category?action=raw&slot=jsonschema"});
                config.data = {"subclass_of": []}
                for (const super_category of super_categories) {
                    if (super_category.startsWith("Category:")) {
                        config.data.subclass_of.push(super_category);
                    }
                    else {
                        console.log("Error: Cannot create an subclass of " + super_category);
                        return;
                    }
                }

                config.onsubmit = (jsondata) => {
                    
                    mwjson.api.getPage("Category:" + mwjson.util.OslId(jsondata.uuid)).then((page) => {
                        page.slots['jsondata'] = jsondata;
                        page.slots_changed['jsondata'] = true;

                        var jsonschema = {type: "object", "allOf": []}
                        
                        for (const super_category of jsondata.subclass_of) {
                            jsonschema.allOf.push({"$ref": "/wiki/" + super_category + "?action=raw&slot=jsonschema"});
                        }
                        page.slots['jsonschema'] = jsonschema;
                        page.slots_changed['jsonschema'] = true;

                        osl.util.postProcessPage(page);
                        jsonschema.title = page.slots['jsondata']['name'];

                        console.log(page);
                        mwjson.api.updatePage(page).done((page) => {
                            resolve();
                            window.location.href = "/wiki/" + page.title; //nav to new page
                        });
                    });
                    
                }
                config.popupConfig.size = "larger";
                config.popupConfig.toggle_fullscreen = true;
                var editor = new mwjson.editor(config)
            });
        });

        return promise;
    }

    static createInstance(categories = [mw.config.get( 'wgPageName' )]) {
        return osl.ui.createOrQueryInstance(categories, 'default');
    }

    static queryInstance(categories = [mw.config.get( 'wgPageName' )]) {
        return osl.ui.createOrQueryInstance(categories, 'query');
    }

    static createOrQueryInstance(categories = [mw.config.get( 'wgPageName' )], mode='default') {

        var config = {
            JSONEditorConfig: {
                no_additional_properties: false
            },
            popupConfig: {			
                msg: {
                    "dialog-title": mw.message('open-semantic-lab-edit-page-data-dialog-title').plain(),
                    "continue": mw.message('open-semantic-lab-edit-page-data-dialog-continue').plain(), 
                    "cancel": mw.message('open-semantic-lab-edit-page-data-dialog-cancel').plain(), 
                }
            },
            target_namespace: "Item"
        };

        if (mode==='query') {
            config.popupConfig.msg["dialog-title"] = mw.message("open-semantic-lab-query-dialog-title").plain();
            config.popupConfig.msg["continue"] = mw.message("open-semantic-lab-query-dialog-continue").plain();
            config.popupConfig.msg["cancel"] = mw.message("open-semantic-lab-query-dialog-cancel").plain();
        }
        else {
            config.popupConfig.msg["dialog-title"] = mw.message("open-semantic-lab-edit-page-data-dialog-title").plain();
            config.popupConfig.msg["continue"] = mw.message("open-semantic-lab-edit-page-data-dialog-continue").plain();
            config.popupConfig.msg["cancel"] = mw.message("open-semantic-lab-edit-page-data-dialog-cancel").plain();

            config.JSONEditorConfig.disable_properties = false;
            config.JSONEditorConfig.show_opt_in = false;
            config.JSONEditorConfig.display_required_only = false;
            config.JSONEditorConfig.disable_array_reorder = true;
            config.JSONEditorConfig.disable_array_delete_all_rows = true;
            config.JSONEditorConfig.disable_array_delete_last_row = true;
        }

        const promise = new Promise((resolve, reject) => {

            $.when(
                mwjson.editor.init()
            ).done(function () {

                config.schema = {"allOf": []}
                
                //if (mode !== 'query') 
                config.data = {"type": []}
                for (const category of categories) {
                    if (category.startsWith("Category:")) {
                        config.schema.allOf.push({"$ref": "/wiki/" + category + "?action=raw&slot=jsonschema"});
                        //if (mode !== 'query') 
                        config.data.type.push(category);
                    }
                    else {
                        console.log("Error: Cannot create an instance of " + category);
                        return;
                    }
                }

                if (mode === 'query') {
                    config.mode = mode;
                }
                else {
                    config.onsubmit = (jsondata) => {
                            var title = mwjson.util.OswId(jsondata.uuid);
                            if (categories.includes("Category:Property") || editor.jsonschema.subschemas_uuids.includes("19a1a69a-6843-442c-a9cf-b8e884db7047")) { //uuid of Category:Property
                                config.target_namespace = "Property";
                                //title = mwjson.util.toPascalCase(jsondata.label[0].text);
                                title = jsondata.name;
                            }
                            mwjson.api.getPage(config.target_namespace + ":" + title).then((page) => {
                                page.slots['jsondata'] = jsondata;
                                page.slots_changed['jsondata'] = true;

                                osl.util.postProcessPage(page);

                                console.log(page);
                                mwjson.api.updatePage(page).done((page) => {
                                    resolve();
                                    window.location.href = "/wiki/" + page.title; //nav to new page
                                });
                            });
                        
                    }
                }
                config.popupConfig.size = "larger";
                config.popupConfig.toggle_fullscreen = true;
                var editor = new mwjson.editor(config)
            });

        });
        if (mode === 'query') return;
        else return promise;
    }
}