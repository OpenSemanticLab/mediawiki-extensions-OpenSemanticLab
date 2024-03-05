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
    ).done(function () {

        $.when(
            mwjson.api.getUserInfo()
        ).done(function (userInfo) {

            //Create Copy link in the page tools sidebar
            let current_title = new mw.Title(mw.config.get("wgPageName"));
            let namespace = current_title.getNamespacePrefix().replace(":", "");
            //let title = current_title.getPrefixedDb() + " Copy";
            //if (current_title.getMain().startsWith("OSW")) title = namespace + ":" + mwjson.util.OswId();
            if (namespace === "") {  //Only in namespace main, otherwise (uu)ids need to be changed
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
            }

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

            $(".pagebot-button").each(function () {
                var defaultOptions = {
                    "action": "create-instance",
                    "params": {},
                    "class": "btn btn-primary",
                    "target": this
                };
                var userOptions = {};
                if (this.dataset.config) userOptions = JSON.parse(this.dataset.config);
                if (!userOptions.params) userOptions.params = {};
                if (!userOptions.params.categories) userOptions.params.categories = [mw.config.get("wgPageName")];
                var config = mwjson.util.mergeDeep(defaultOptions, userOptions);

                var configs = []
                if (config.action === "menu-dropdown") {
                    $(this).addClass("dropdown show");
                    config.id = "dropdown-" + mwjson.util.getShortUid();
                    const target = $(`<div class="dropdown-menu" aria-labelledby="${config.id}"></div>`);
                    $(this).append(target);
                    configs.push(config);
                    for (var entry of config.menu_entries) {
                        entry = mwjson.util.mergeDeep(defaultOptions, entry);
                        entry.class += " dropdown-item";
                        entry.target = target;
                        configs.push(entry);
                    }
                }
                else configs.push(config);

                for (const config of configs) {
                    var icon = "";
                    if (config.icon_class) icon = '<i class="' + config.icon_class + '"></i> ';
                    var label = "";
                    config.params = config.params || {};
                    var default_data = config.params.jsondata ? ", " + JSON.stringify(config.params.jsondata) : "null";
                    if (config.action === "create-instance") {
                        label = mw.message('open-semantic-lab-create-instance').text();
                        if (!config.label && config.label !== "") config.label = label;
                        $(config.target).append($(`<a class="${config.class}" role="button" href='javascript:osl.ui.createInstance(["${config.params.categories[0]}"]${default_data});'>${icon + config.label}</a>`));
                    }
                    else if (config.action === "create-subcategory") {
                        label = mw.message('open-semantic-lab-create-subcategory').text();
                        if (!config.label && config.label !== "") config.label = label;
                        $(config.target).append($(`<a class="${config.class}" role="button" href='javascript:osl.ui.createSubcategory(["${config.params.categories[0]}"]);'>${icon + config.label}</a>`));
                    }
                    else if (config.action === "query-instance") {
                        label = mw.message('open-semantic-lab-query-instance').text();
                        if (!config.label && config.label !== "") config.label = label;
                        $(config.target).append($(`<a class="${config.class}" role="button" href='javascript:osl.ui.queryInstance(["${config.params.categories[0]}"]);'>${icon + config.label}</a>`));
                    }
                    else if (config.action === "edit-data") {
                        label = mw.message('open-semantic-lab-edit-page-data').text();
                        if (!config.label && config.label !== "") config.label = label;
                        $(config.target).append($(`<a class="${config.class}" role="button" href='javascript:osl.ui.editData(${JSON.stringify(config.params)});'>${icon + config.label}</a>`));
                    }
                    else if (config.action === "copy") {
                        label = mw.message('open-semantic-lab-copy-page').text();
                        if (!config.label && config.label !== "") config.label = label;
                        $(config.target).append($(`<a class="${config.class}" role="button" href='javascript:osl.ui.editData({"mode": "copy"});'>${icon + config.label}</a>`));
                    }
                    else if (config.action === "export") {
                        label = mw.message('open-semantic-lab-print-page').text();
                        if (!config.label && config.label !== "") config.label = label;
                        $(config.target).append($(`<a class="${config.class}" role="button" href='javascript:osl.ui.printPage();'>${icon + config.label}</a>`));
                    }
                    else if (config.action === "edit") {
                        //label = mw.message('open-semantic-lab-edit-page-data').text();
                        if (!config.label && config.label !== "") config.label = label;
                        let url = mw.util.getUrl(mw.config.get("wgPageName"), {"veaction": "edit"});
                        $(config.target).append($(`<a class="${config.class}" role="button" href='${url}'>${icon + config.label}</a>`));
                    }
                    else if (config.action === "menu-dropdown") {
                        if (!config.label && config.label !== "") config.label = label;
                        $(config.target).append($(`<a class="${config.class} dropdown-toggle" role="button" href='#' id="${config.id}" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">${icon + config.label}</a>`));
                    }
                    else if (config.action === "dropdown-divider") {
                        $(config.target).append($(`<div class="dropdown-divider"></div>`));
                    }
                    if (!config.tooltip && config.label === "") config.tooltip = label;
                    if (config.tooltip && config.tooltip !== "") {
                        $(config.target).attr("data-toggle", "tooltip");
                        $(config.target).attr("title", config.tooltip);
                    }
                }
            });

            //Create tile that links to a popup editor
            $(".pagebot-tile").each(function () {
                var defaultOptions = {
                    "type": "button",
                    "action": "create-instance",
                    "lang": mw.config.get('wgUserLanguage'),
                    "icon": "🔒",
                    "title": mw.message('open-semantic-lab-not-accessible').text(),
                    "description": mw.message('open-semantic-lab-login-needed').parse()
                };
                var userOptions = {};

                if (this.dataset.config) userOptions = JSON.parse(this.dataset.config);
                else if (this.innerText !== "") userOptions = JSON.parse(this.innerText); //Legacy support
                var config = mwjson.util.mergeDeep(defaultOptions, userOptions);
                

                mwjson.api.getPage(config.categories[0]).then((page) => {
                    var schema = page.slots['jsonschema'];
                    if (mwjson.util.isString(schema)) schema = JSON.parse(schema);
                    config.title = schema["title"];
                    if (schema['title*'] && schema['title*'][config.lang]) config.title = schema['title*'][config.lang];
                    //else if (schema['label'] && schema['label']['en']) config.title = schema['label']['en'];
                    config.description = schema["description"];
                    if (schema['description*'] && schema['description*'][config.lang]) config.description = schema['description*'][config.lang];
                    //else if (schema['description'] && schema['description']['en']) config.description = schema['description']['en'];
                    //console.log(config.title, config.description);
                    var jsondata = page.slots['jsondata'];
                    if (mwjson.util.isString(jsondata)) jsondata = JSON.parse(jsondata);

                    if (jsondata.utf8_icon && mwjson.util.isString(jsondata.utf8_icon)) config.icon = jsondata.utf8_icon;
                    else if (jsondata.utf8_icon && mwjson.util.isArray(jsondata.utf8_icon)) config.icon = jsondata.utf8_icon[0];

                    if ($(this).find(".custom-link-tile2_image").text() === "") $(this).find(".custom-link-tile2_image").text(config.icon);
                    if ($(this).find(".custom-link-tile2_title").text() === "") $(this).find(".custom-link-tile2_title").append($('<a href="' + mw.util.getUrl(config.categories[0]) + '">' + config.title + '</a>'))
                    if ($(this).find(".custom-link-tile2_text").text() === "") $(this).find(".custom-link-tile2_text").text(config.description);

                    var url = mw.config.get('wgArticlePath').replace('$1', "Special:Login");

                    if (config.action === "create-instance") {
                        var label = mw.message('open-semantic-lab-create-instance-short').text();
                        if (userInfo.userCanEdit) url = `javascript:osl.ui.createInstance(["${config.categories[0]}"]);`
                        else label =  "🔒 " + label;
                        if ($(this).find(".custom-link-tile2_image").attr('data-icon-2') === "") $(this).find(".custom-link-tile2_image").attr('data-icon-2', "➕");
                        $(this).find(".custom-link-tile2_btn").append($(`<a href='${url}'>${label}</a>`))
                    }
                    if (config.action === "create-subcategory") {
                        var label = mw.message('open-semantic-lab-create-subcategory').text();
                        if (userInfo.userCanEdit) url = `javascript:osl.ui.createSubcategory(["${config.categories[0]}"]);`
                        else label =  "🔒 " + label;
                        if ($(this).find(".custom-link-tile2_image").attr('data-icon-2') === "") $(this).find(".custom-link-tile2_image").attr('data-icon-2', "➕");
                        $(this).find(".custom-link-tile2_btn").append($(`<a href='${url}'>${label}</a>`))
                    }
                    else if (config.action === "query-instance") {
                        var label = mw.message('open-semantic-lab-query-instance-short').text();
                        if (userInfo.userCanEdit) url = `javascript:osl.ui.queryInstance(["${config.categories[0]}"]);`
                        if ($(this).find(".custom-link-tile2_image").attr('data-icon-2') === "") $(this).find(".custom-link-tile2_image").attr('data-icon-2', "🔍");
                        $(this).find(".custom-link-tile2_btn").append($(`<a href='${url}'>${label}</a>`))
                    }

                    $(this).css('visibility', 'visible');
                    $(this).parent().removeClass('linear-background');
                })
                .catch(error => {
                    // typical: user has no read rights
                    console.log("ERROR:", error)

                    if ($(this).find(".custom-link-tile2_image").text() === "") $(this).find(".custom-link-tile2_image").text(config.icon);
                    if ($(this).find(".custom-link-tile2_title").text() === "") $(this).find(".custom-link-tile2_title").append(config.title);
                    if ($(this).find(".custom-link-tile2_text").text() === "") $(this).find(".custom-link-tile2_text").html(config.description);
                    
                    $(this).css('visibility', 'visible');
                    $(this).parent().removeClass('linear-background');
                });
            });

            $(".pagebot-preview").each(function () {
                var defaultOptions = {
                    container: this
                };
                var userOptions = {};

                if (this.dataset.config) userOptions = JSON.parse(this.dataset.config);
                var config = mwjson.util.mergeDeep(defaultOptions, userOptions);

                osl.ui.createPagePreview(config);
            });

            $(".pagebot-preview-editor").each(function () {
                var defaultOptions = {
                    schema_editor: {
                        include: ["jsonschema"],
                        hide: ["footer", "header", "jsondata"]
                    },
                    data_editor: { container: this },
                    preview: {}
                };
                var userOptions = {};

                if (this.dataset.config) userOptions = JSON.parse(this.dataset.config);
                var config = mwjson.util.mergeDeep(defaultOptions, userOptions);

                config.schema_editor.container = document.getElementById(config.schema_editor.container_id);
                config.preview.container = document.getElementById(config.preview.container_id);
                osl.ui.createPreviewEditor(config);
            });
        });
    });
});

osl.util = class {
    constructor() {
    }

    static getAbsoluteJsonSchemaUrl(title, pretty=true) {
        if (title.startsWith("JsonSchema:")) {
            return mwjson.util.getAbsolutePageUrl("Special:SlotResolver", pretty) + "/" + title.replace(":", "/") + ".slot_main.json";
        }
        return mwjson.util.getAbsolutePageUrl("Special:SlotResolver", pretty) + "/" + title.replace(":", "/") + ".slot_jsonschema.json";
	}

    static getRelativeJsonSchemaUrl(title, pretty=true) {
        if (title.startsWith("JsonSchema:")) {
            return mwjson.util.getRelativePageUrl(title, {"action": "raw"}, pretty)
        }
		return mwjson.util.getRelativePageUrl(title, {"action": "raw", "slot": "jsonschema"}, pretty)
	}

    static postProcessPage(page, categories = []) {
        //var namespace_prefix = new mw.Title(page.title).getNamespacePrefix();
        //if (namespace_prefix === "Item:" || namespace_prefix === "Category:" || namespace_prefix === "Property:") {
        //could not be solved by modified RevisionRecord.php.
        if (page.slots['header'] !== "{{#invoke:Entity|header}}") {
            page.slots['header'] = "{{#invoke:Entity|header}}"
            page.slots_changed['header'] = true;
        }
        if (page.slots['footer'] !== "{{#invoke:Entity|footer}}") {
            page.slots['footer'] = "{{#invoke:Entity|footer}}"
            page.slots_changed['footer'] = true;
        }
        //}

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
            var org_title = page.slots['jsonschema']['title'];
            var title = "";
            if ((!org_title || org_title === "") && page.slots['jsondata']) {
                title = page.slots['jsondata']['name'];
            }
            else title = org_title
            if (title != org_title) {
                page.slots['jsonschema']['title'] = name;
                page.slots_changed['jsonschema'] = true;
            }
            //if (!page.slots['jsonschema']['properties'] || !page.slots['jsonschema']['properties']['type']) {
            //    page.slots['jsonschema']['properties']['type'] = {'default': [page.title]};
            //}
            // remove type keyword in $ref (inserted by editing with jsonschema-jsonschema) causing errors in json-schema-ref-parser.js
            if (page.slots['jsonschema']['allOf']) {
                if (!Array.isArray(page.slots['jsonschema']['allOf'])) page.slots['jsonschema']['allOf'] = [page.slots['jsonschema']['allOf']];
                for (const schema of page.slots['jsonschema']['allOf']) {
                    if (mwjson.util.isObject(schema) && schema['$ref'] && schema['type']) delete schema['type'];
                }
            }
        }

        const promise = new Promise((resolve, reject) => {
            var promises = [];
            for (const category of categories) {
                const p = mwjson.api.getPage(category);
                promises.push(p);
            }
            Promise.allSettled(promises).then((results) => {
                for (const result of results) {
                    const category_page = result.value;
                    if (page.slots['jsondata'] && category_page.slots['schema_template']) {
                        var template_text = category_page.slots['schema_template'];
                        Handlebars.registerPartial("self", template_text);
                        var template = Handlebars.compile(template_text);
                        var json_schema_text = template(mwjson.util.mergeDeep(
                            { '_page_title': page.title },
                            page.slots['jsondata']
                        ));
                        //console.log("Set jsonschema: ", json_schema_text);
                        if (!page.slots['jsonschema']) page.slots['jsonschema'] = {};
                        page.slots['jsonschema'] = mwjson.util.mergeDeep(page.slots['jsonschema'], JSON.parse(json_schema_text));
                        //console.log(page.slots['jsonschema']);
                        page.slots_changed['jsonschema'] = true;
                    }
                }
                resolve(page);
            });
        });
        return promise;
    }

    // gets the metaclasses/categories from the "nearest" superclass/category
    static getMetaCategory(categories = []) {
        const promise = new Promise((resolve, reject) => {
            var promises = [];
            for (const category of categories) {
                const p = mwjson.api.getPage(category);
                promises.push(p);
            }
            Promise.allSettled(promises).then((results) => {
                var parents = [];
                var meta_categories = [];
                for (const result of results) {
                    const category_page = result.value;
                    if (category_page.slots['jsondata']) {
                        if (mwjson.util.isString(category_page.slots['jsondata']))
                            category_page.slots['jsondata'] = JSON.parse(category_page.slots['jsondata'])
                        if (category_page.slots['jsondata']['subclass_of'])
                            parents = parents.concat(category_page.slots['jsondata']['subclass_of'])
                        if (category_page.slots['jsondata']['metaclass'])
                            meta_categories = meta_categories.concat(category_page.slots['jsondata']['metaclass'])
                    }
                }
                if (!meta_categories.length && parents.length) {
                    osl.util.getMetaCategory(parents).then((_meta_categories) => resolve(_meta_categories));
                }
                else {
			if (!meta_categories.length) meta_categories = ["Category:Category"];
			resolve(meta_categories);
		}
            });
        });
        return promise;
    }
}

osl.ui = class {
    constructor() {
    }

    static printPage() {
        console.log("Print PDF");

        var config = {
            JSONEditorConfig: { disable_collapse: true },
            popupConfig: {
                msg: {
                    "dialog-title": mw.message('open-semantic-lab-print-settings').plain(),
                    "continue": mw.message('open-semantic-lab-print-page').plain(),
                    "cancel": mw.message('open-semantic-lab-create-page-dialog-cancel').plain(),
                },
                edit_comment: false
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

            config.onsubmit = (print_config, meta) => {
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
                const pageUrl = (mw.config.get('wgServer') + mw.config.get('wgArticlePath')).replace('$1', mw.config.get('wgPageName'));
                $('<div id="firstHeadingCopy"><h1 class="firstHeading"><a class="external text" href="' + pageUrl + '">' + $('#firstHeading').text() + '</a></h1></div>').insertBefore('#mw-content-text');
                var opt = {
                    margin: 2,
                    //filename: 'myfile.pdf',
                    image: { type: 'jpeg', quality: 0.95 },
                    html2canvas: { scale: 2 },
                    //jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' },
                    jsPDF: { format: 'a3', orientation: 'portrait' },
                    //pagebreak: { mode: ['css', 'legacy'], before: ['.pdf-page-break-before'], avoid: 'img' },
                    //pagebreak: { mode: ['avoid-all'], before: ['.pdf-page-break-before'], avoid: 'img' },
                    pagebreak: { mode: ['avoid-all'], avoid: 'img' },
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
                        pdfObject.save($('#firstHeading').text().replace(' ', '_') + ".pdf");
                    })
            }
            var editor = new mwjson.editor(config)
        });
    }

    static getDefaultEditorConfig(){
        return {
            onEditInline: (params) => osl.ui.editData({source_page: params.page_title, reload: false}),
            onCreateInline: (params) => {
                if (params.super_categories) return osl.ui.createSubcategory(params.super_categories, params.categories, "inline");
                else if (params.categories) return osl.ui.createOrQueryInstance(params.categories, "inline");
            },
            getSubjectId: (params) => {
                var title = mwjson.util.OswId(params.jsondata.uuid);
                var target = title;
                var target_namespace = params.editor.config.target_namespace;

                // can be replace by the following if missing uuid in Category:Category jsonschema is fixed
                /*var target_namespace = "Item"; 
                if (params.editor.jsonschema.subschemas_uuids.includes("89aafe6d-ae5a-4f29-97ff-df7736d4cab6")) { //uuid of Category:Category
                    target_namespace = "Category";
                }*/

                // Handle special Item types
                if (params.editor.jsonschema.subschemas_uuids.includes("19a1a69a-6843-442c-a9cf-b8e884db7047")) { //uuid of Category:Property
                    target_namespace = "Property";
                    //title = mwjson.util.toPascalCase(params.jsondata.label[0].text);
                    title = params.jsondata.name;
                }
                if (params.editor.jsonschema.subschemas_uuids.includes("11a53cdf-bdc2-4524-bf8a-c435cbf65d9d")) { //uuid of Category:WikiFile
                    target_namespace = "File";
                    // check if target title was already defined by file upload
                    if (params.editor.config.target && params.editor.config.target !== "") title = params.editor.config.target.replace(params.editor.config.target_namespace + ":", "");
                }
                target = target_namespace + ":" + title; //set final target   
                console.log(params.editor.jsonschema.subschemas_uuids, " => ", target);  
                return target;
            }
        }
    }

    static editData(params) {
        var params = mwjson.util.mergeDeep({
            dataslot: 'jsondata',
            source_page: mw.config.get('wgPageName'),
            autosave: true,
            reload: true,
            //categories //to override the schema
        }, params);
        var dataslot = params.dataslot;

        var config = mwjson.util.mergeDeep(osl.ui.getDefaultEditorConfig(), {
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
        });

        const page_namespace = new mw.Title(params.source_page).getNamespacePrefix().replace(":", "");

        var page_load_promise = undefined;
        if (params.source_page_obj) page_load_promise = new Promise((resolve, reject) => { resolve(params.source_page_obj); });
        else page_load_promise = mwjson.api.getPage(params.source_page);

        const promise = new Promise((resolve, reject) => {

            $.when(
                page_load_promise,
                mwjson.editor.init()
            ).done(function (page) {

                //build schema
                var jsondata = page.slots[dataslot] ? page.slots[dataslot] : {};
                if (mwjson.util.isString(jsondata)) jsondata = JSON.parse(jsondata);

                var categories = [];
                if (dataslot === 'jsondata') {

                    config.JSONEditorConfig.disable_properties = false;
                    config.JSONEditorConfig.show_opt_in = false;
                    config.JSONEditorConfig.display_required_only = true;
                    config.JSONEditorConfig.disable_array_reorder = true;
                    config.JSONEditorConfig.disable_array_delete_all_rows = true;
                    config.JSONEditorConfig.disable_array_delete_last_row = true;

                    if (params.categories) jsondata.type = params.categories; //override type / schema

                    if (jsondata.type) {
                        config.schema = { "allOf": [] }
                        if (Array.isArray(jsondata.type)) {
                            for (const category of jsondata.type) {
                                categories.push(category);
                                config.schema["allOf"].push({ "$ref": osl.util.getAbsoluteJsonSchemaUrl(category) })
                            }
                        }
                        else if (typeof jsondata.type === 'string' || jsondata.type instanceof String) {
                            categories.push(jsondata.type);
                            config.schema["allOf"].push({ "$ref": osl.util.getAbsoluteJsonSchemaUrl(jsondata.type) })
                        }
                        else {
                            console.log("Error: Page has no jsonschema");
                            return;
                        }
                    }
                    else if (page_namespace === "Category") {
                        categories.push("Category:Category");
                        config.schema = { "$ref": osl.util.getAbsoluteJsonSchemaUrl("Category:Category") };
                    }
                    else if (page_namespace === "") { //Main
                        categories.push("Category:OSW92cc6b1a2e6b4bb7bad470dfdcfdaf26"); //Article
                        config.schema = { "$ref": osl.util.getAbsoluteJsonSchemaUrl("Category:OSW92cc6b1a2e6b4bb7bad470dfdcfdaf26") };
                    }
                    else if (page_namespace === "File") {
                        categories.push("Category:OSWff333fd349af4f65a69100405a9e60c7"); //File
                        config.schema = { "$ref": osl.util.getAbsoluteJsonSchemaUrl("Category:OSWff333fd349af4f65a69100405a9e60c7") };
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
                    config.popupConfig.edit_comment_required = true // comment for documentation required
                }
                else {
                    console.log("Error: No jsonschema defined");
                    return;
                }

                if (params.mode === 'copy') {
                    jsondata['uuid'] = mwjson.util.uuidv4();
                    jsondata['name'] = undefined;
                    jsondata['based_on'] = [params.source_page];
                    var label = jsondata['label'] ? jsondata['label'][0]['text'] : "";
                    var lang = jsondata['label'] ? jsondata['label'][0]['lang'] : "en";
                    if (!label.includes("Copy")) label += " Copy 1"
                    else {
                        // From: https://stackoverflow.com/questions/21122338/how-to-increment-a-string-in-javascript
                        // Find the trailing number or it will match the empty string
                        var count = label.match(/\d*$/);
                        // Take the substring up until where the integer was matched
                        // Concatenate it to the matched count incremented by 1
                        label = label.substr(0, count.index) + (++count[0]);
                    }
                    jsondata['label'][0] = { "text": label, "lang": lang };
                    page.title = page_namespace === "" ? mwjson.util.OswId(jsondata['uuid']) : page_namespace + ":" + mwjson.util.OswId(jsondata['uuid']);
                }

                config.data = jsondata;

                config.onsubmit = (jsondata, meta) => {

                    page.slots[dataslot] = jsondata;
                    page.slots_changed[dataslot] = true;
                    if (params.mode === "copy") {
                        for (const slot of Object.keys(page.slots)) page.slots_changed[slot] = true;
                        page.exists = false;
                    }

                    osl.util.postProcessPage(page, categories).then((page) => {
                        //console.log(page);
                        if (params.autosave) {
                            mwjson.api.updatePage(page, meta).done((page) => {
                                resolve(page);
                                if (params.reload) window.location.href = mw.util.getUrl(page.title);
                            });
                        }
                        else resolve(page);
                    });

                    return promise;
                }
                config.popupConfig.size = "larger";
                config.popupConfig.toggle_fullscreen = true;
                var editor = new mwjson.editor(config)
            });
        });

        return promise;
    }

    static editSlots(_config) {

        var config = mwjson.util.mergeDeep(osl.ui.getDefaultEditorConfig(), {
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
                },
                edit_comment_required: true // comment for documentation required
            }
        });

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
                        if (config.schema.properties[slot_key]) config.schema.properties[slot_key]['options'] = { hidden: true };
                    }
                }
                if (config && _config.include) {
                    for (const slot_key of _config.include) {
                        config.schema.defaultProperties = [];
                        if (config.schema.properties[slot_key]) config.schema.defaultProperties.push(slot_key);
                    }
                }

                config.data = page.slots;

                config.onsubmit = (slots, meta) => {
                    console.log(meta)
                    page.slots = slots;
                    console.log(page.slots);
                    for (var slot_key of Object.keys(page.slots)) {
                        page.slots_changed[slot_key] = true;
                    }

                    osl.util.postProcessPage(page).then((page) => {

                        mwjson.api.updatePage(page, meta).done((page) => {
                            resolve();
                            window.location.href = window.location.href; //reload page
                        });
                    });

                    return promise;
                }
                config.popupConfig.size = "larger";
                config.popupConfig.toggle_fullscreen = true;
                var editor = new mwjson.editor(config)
            });
        });

        return promise;
    }

    static createSubcategory(super_categories = [mw.config.get('wgPageName')], meta_categories = ["Category:Category"], mode = 'default', default_data = {}) {

        var config = mwjson.util.mergeDeep(osl.ui.getDefaultEditorConfig(), {
            JSONEditorConfig: {
                no_additional_properties: false,
                disable_properties: false,
                show_opt_in: false,
                display_required_only: true,
                disable_array_reorder: true,
                disable_array_delete_all_rows: true,
                disable_array_delete_last_row: true,
            },
            popupConfig: {
                msg: {
                    "dialog-title": mw.message('open-semantic-lab-edit-page-data-dialog-title').plain(),
                    "continue": mw.message('open-semantic-lab-edit-page-data-dialog-continue').plain(),
                    "cancel": mw.message('open-semantic-lab-edit-page-data-dialog-cancel').plain(),
                }
            },
            target_namespace: "Category"
        });

        const promise = new Promise((resolve, reject) => {

            $.when(
                mwjson.api.getPage(mw.config.get('wgPageName')),
                osl.util.getMetaCategory(super_categories), //inherit metaclass/category from superclass/category
                mwjson.editor.init()
            ).done(function (category_page, _meta_categories) {
                if (mwjson.util.isString(category_page.slots['jsondata'])) category_page.slots['jsondata'] = JSON.parse(category_page.slots['jsondata']);
                if (category_page.slots['jsondata']['metaclass']) meta_categories = category_page.slots['jsondata']['metaclass']
                else meta_categories = _meta_categories;
                // we will store supercategories in the schema as default and not in config.data
                // otherwise defaultProperties in the schema are ignored
                config.schema = { "allOf": [], properties: {subclass_of:{ default: []}} };
                for (const meta_category of meta_categories) config.schema.allOf.push({ "$ref": osl.util.getAbsoluteJsonSchemaUrl(meta_category) });
                for (const super_category of super_categories) {
                    if (super_category.startsWith("Category:")) {
                        config.schema.properties.subclass_of.default.push(super_category);
                    }
                    else {
                        console.log("Error: Cannot create an subclass of " + super_category);
                        return;
                    }
                }

                config.data = default_data; // note: any default data will disable defaultProperties defined in the schema
                config.onsubmit = (jsondata, meta) => {
                    config.target = editor.config.target; // already set by getSubjectId callback
                    mwjson.api.getPage(config.target).then((page) => {
                        page.slots['jsondata'] = jsondata;
                        page.slots_changed['jsondata'] = true;

                        //console.log(editor.jsonschema.subschemas_uuids);
                        meta_categories = ["Category:Category"]
                        for (const subschema_uuid of editor.jsonschema.subschemas_uuids) {

                            if (subschema_uuid !== "89aafe6d-ae5a-4f29-97ff-df7736d4cab6" && subschema_uuid !== "ce353767-c628-45bd-9d88-d6eb3009aec0") {//Category:Category, Category:Entity
                                meta_categories.push("Category:" + mwjson.util.OswId(subschema_uuid));
                            }
                        }
                        //console.log(meta_categories);
                        osl.util.postProcessPage(page, meta_categories).then((page) => {

                            console.log(page);
                            mwjson.api.updatePage(page, meta).done((page) => {
                                resolve(page);
                                if (mode !== "inline") window.location.href = mw.util.getUrl(page.title); //nav to new page
                            });
                        });
                    });

                    return promise;

                }
                config.popupConfig.size = "larger";
                config.popupConfig.toggle_fullscreen = true;
                var editor = new mwjson.editor(config)
            });
        });

        return promise;
    }

    static createInstance(categories = [mw.config.get('wgPageName')], default_data) {
        return osl.ui.createOrQueryInstance(categories, 'default', default_data);
    }

    static queryInstance(categories = [mw.config.get('wgPageName')]) {
        return osl.ui.createOrQueryInstance(categories, 'query');
    }

    static createOrQueryInstance(categories = [mw.config.get('wgPageName')], mode = 'default', default_data) {

        var config = mwjson.util.mergeDeep(osl.ui.getDefaultEditorConfig(), {
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
        });

        if (mode === 'query') {
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
            config.JSONEditorConfig.display_required_only = true;
            config.JSONEditorConfig.disable_array_reorder = true;
            config.JSONEditorConfig.disable_array_delete_all_rows = true;
            config.JSONEditorConfig.disable_array_delete_last_row = true;
        }

        const promise = new Promise((resolve, reject) => {

            $.when(
                mwjson.editor.init()
            ).done(function () {

                config.schema = { "allOf": [] }

                //if (mode !== 'query') 
                //config.data = { "type": [] } // prevents json-editor from displaying defaultProperties not contained in config.data
                config.data = default_data;
                for (const category of categories) {
                    if (category.startsWith("Category:")) {
                        config.schema.allOf.push({ "$ref": osl.util.getAbsoluteJsonSchemaUrl(category) });
                        //if (mode !== 'query') 
                        //config.data.type.push(category); // allready covered by schema.type.default value
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
                    config.onsubmit = (jsondata, meta) => {
                        config.target = editor.config.target; // already set by getSubjectId callback
                        mwjson.api.getPage(config.target).then((page) => {
                            page.slots['jsondata'] = jsondata;
                            page.slots_changed['jsondata'] = true;

                            osl.util.postProcessPage(page, categories).then((page) => {

                                console.log(page);
                                mwjson.api.updatePage(page, meta).done((page) => {
                                    resolve(page);
                                    if (mode !== "inline") window.location.href = mw.util.getUrl(page.title); //nav to new page
                                });
                            });
                        });
                        return promise;
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

    static createPagePreview(params) {
        var defaultOptions = {
            display_mode: "embedded"
        };
        var config = mwjson.util.mergeDeep(defaultOptions, params);

        if (!config.jsonschema && config.page && config.page.slots["jsonschema"]) config.jsonschema = config.page.slots["jsonschema"];
        if (!config.jsondata && config.page && config.page.slots["jsondata"]) config.jsondata = config.page.slots["jsondata"];
        if (!config.header_template && config.page && config.page.slots["header_template"]) config.header_template = config.page.slots["header_template"];
        if (!config.footer_template && config.page && config.page.slots["footer_template"]) config.footer_template = config.page.slots["footer_template"];
        if (!config.wikitext && config.page && config.page.slots["main"]) config.wikitext = config.page.slots["main"];

        var wikitext = "{{#invoke: Entity|header";
        if (config.jsonschema) wikitext += "|jsonschema=" + JSON.stringify(config.jsonschema).replaceAll("{{", " { { ").replaceAll("}}", " } } ");
        if (config.jsondata) wikitext += "|jsondata=" + JSON.stringify(config.jsondata).replaceAll("{{", " { { ").replaceAll("}}", " } } ");
        if (config.header_template) wikitext += "|template=<nowiki>" + config.header_template + "</nowiki>";
        wikitext += " }}\n";
        if (config.wikitext) wikitext += config.wikitext;
        wikitext += "\n{{#invoke: Entity|footer";
        if (config.jsonschema) wikitext += "|jsonschema=" + JSON.stringify(config.jsonschema).replaceAll("{{", " { { ").replaceAll("}}", " } } ");
        if (config.jsondata) wikitext += "|jsondata=" + JSON.stringify(config.jsondata).replaceAll("{{", " { { ").replaceAll("}}", " } } ");
        if (config.footer_template) wikitext += "|template=<nowiki>" + config.footer_template + "</nowiki>";
        wikitext += " }}";
        console.log(wikitext);
        mwjson.api.parseWikiText({
            container: params.container,
            text: wikitext,
            display_mode: config.display_mode,
            copy_parent_frame_style: true
        });
    }

    static createPreviewEditor(params) {
        var schema_config = {
            JSONEditorConfig: {
                disable_collapse: true,
                disable_edit_json: false,
                disable_properties: false,
                no_additional_properties: false,
            }
        };
        var data_config = {
            JSONEditorConfig: {
                disable_properties: false,
                show_opt_in: false,
                display_required_only: true,
                disable_array_reorder: true,
                disable_array_delete_all_rows: true,
                disable_array_delete_last_row: true
            }
        }
        var preview_config = {

        }
        schema_config = mwjson.util.mergeDeep(schema_config, params.schema_editor);
        data_config = mwjson.util.mergeDeep(data_config, params.data_editor);
        preview_config = mwjson.util.mergeDeep(preview_config, params.preview);

        data_config.schema = mwjson.util.deepCopy(schema_config.data.jsonschema);

        console.log(schema_config, data_config, preview_config)

        const promise = new Promise((resolve, reject) => {

            $.when(
                //mw.loader.using('ext.mwjson.editor.ace'),
                mwjson.api.getPage("Category:DummyCategory"),
                mwjson.editor.init()
            ).done(function (virtual_page) {

                var schema_editor = undefined;
                var data_editor = undefined;
                preview_config.page = virtual_page;

                schema_config.schema = virtual_page.schema;
                if (mwjson.util.isString(schema_config.schema)) schema_config.schema = JSON.parse(schema_config.schema);
                if (schema_config && schema_config.hide) {
                    for (const slot_key of schema_config.hide) {
                        if (schema_config.schema.properties[slot_key]) schema_config.schema.properties[slot_key]['options'] = { hidden: true };
                    }
                }
                if (schema_config && schema_config.include) {
                    for (const slot_key of schema_config.include) {
                        schema_config.schema.defaultProperties = [];
                        if (schema_config.schema.properties[slot_key]) schema_config.schema.defaultProperties.push(slot_key);
                    }
                }

                if (schema_config.data) virtual_page.slots = schema_config.data;
                else schema_config.data = virtual_page.slots;
                virtual_page.schema.properties["jsonschema"] = { "type": "string", "format": "textarea", "options": { "wikieditor": "jsoneditors" } };
                if (data_config.data) virtual_page.slots['jsondata'] = data_config.data;

                schema_config.onsubmit = (slots, meta) => {
                    virtual_page.slots = slots;

                    //osl.util.postProcessPage(category_page).then((page) => {                        
                    //});

                    data_editor.setSchema({ schema: JSON.parse(virtual_page.slots['jsonschema']) });
                    data_editor.createUI();
                    //virtual_page.slots['jsondata'] = data_editor.getData(); //not loaded yet
                    //osl.ui.createPagePreview(preview_config);
                }

                data_config.onsubmit = (jsondata, meta) => {
                    //virtual_page.slots = schema_editor.getData();

                    virtual_page.slots['jsondata'] = jsondata;
                    if (mwjson.util.isString(virtual_page.slots['jsonschema'])) virtual_page.slots['jsonschema'] = JSON.parse(virtual_page.slots['jsonschema']);
                    osl.ui.createPagePreview(preview_config);
                }

                schema_editor = new mwjson.editor(schema_config);
                data_editor = new mwjson.editor(data_config);

                osl.ui.createPagePreview(preview_config);
            });
        });

        return promise;
    }
}
