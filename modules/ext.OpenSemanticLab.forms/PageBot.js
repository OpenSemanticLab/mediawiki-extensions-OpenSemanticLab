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
            "open-semantic-lab-edit-page-slots",
            "open-semantic-lab-preview",
        ])
    ).done(function () {

        //Create Copy link in the page tools sidebar
        //ToDo: Only in namespace main, otherwise (uu)ids need to be changed
        /*mwjson.util.addBarLink({
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
        });*/

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
                        "template_autocomplete": {"query": () => "[[Category:ELN/Order/Actionable/Template]]|?Display_title_of=HasDisplayName|?HasDescription|limit=1000"},
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

        //Create Print link in the page tools sidebar
        mwjson.util.addBarLink({
            "label": mw.message('open-semantic-lab-print-page'),
            "href": `javascript:osl.ui.printPage();`
        });

        //Create Print link in the page tools sidebar
        /*mwjson.util.addBarLink({
            "label": mw.message('open-semantic-lab-edit-page-slots'),
            "href": `javascript:osl.ui.editSlots();`
        });*/
    });
});

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

    static editSlots() {

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

        $.when(
            //mw.loader.using('ext.mwjson.editor.ace'),
            mwjson.api.getPage(mw.config.get( 'wgPageName' )),
            mwjson.editor.init()
        ).done(function (page) {

            config.schema = page.schema;
            config.data = page.slots;

            config.onsubmit = (slots) => {
                
                page.slots = slots;
                console.log(page.slots);
                for (var slot_key of Object.keys(page.slots)) {
                    page.slots_changed[slot_key] = true;
                }
                mwjson.api.updatePage(page).done((page) => {
                    window.location.href = window.location.href; //reload page
                });
                
            }
            config.popupConfig = {size: "larger"}
            config.popupConfig.toggle_fullscreen = true;
            var editor = new mwjson.editor(config)
        });
    }
}
