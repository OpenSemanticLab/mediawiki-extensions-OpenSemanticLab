/*@nomin*/
/* 
Helper class to copy and auto edit pages
*/

$(document).ready(function () {

    $.when(
        mw.loader.using('ext.mwjson.util'),
        mw.loader.using('ext.mwjson.api'),
        mw.loader.using('ext.mwjson.parser'),
        mw.loader.using('ext.mwjson.editor'),
        new mw.Api().loadMessagesIfMissing([
            'open-semantic-lab-copy-page',
            "open-semantic-lab-create-page-dialog-continue",
            "open-semantic-lab-create-page-dialog-cancel",
            "open-semantic-lab-create-page-dialog-title-label",
            "open-semantic-lab-create-page-dialog-template-label",
            "open-semantic-lab-create-page-dialog-page-exists-warning",
            "open-semantic-lab-create-task",
            "open-semantic-lab-create-task-from-template",
            "open-semantic-lab-preview",
        ])
    ).done(function () {

        //Create Copy link in the page tools sidebar
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
                var button = new OO.ui.ButtonWidget({
                    label: config.label
                });
                //button.setIcon( 'templateAdd' ); //does not work
                //note: msgs need to be resolved here because they are prefetched
                button.$element.find('a').attr('href', 
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
                        "template_autocomplete": {"query": () => "[[Category:ELN/Order/Actionable]]|?Display_title_of=HasDisplayName|?HasDescription"},
                        "modifications": [{"template": "OslTemplate:ELN/Order/Actionable", "path": "RELATED_ARTICLE", "value": mw.config.get( 'wgPageName' )}],
                        "redirect": (page) => new mw.Title( page.title ).getUrl({"action": "formedit", "returnto": mw.config.get( 'wgPageName' )})
                    })`
                )
                $(this).append(button.$element);
            }
            /*mwjson.util.addBarLink({"label": mw.message('open-semantic-lab-copy-page'), 
                "href": `javascript:mwjson.editor.createPageDialog({
                    "template_autocomplete": {"query": () => "[[Category:ELN/Order/Actionable]]|?Display_title_of=HasDisplayName|?HasDescription"},
                    "modifications": [{"template": "OslTemplate:ELN/Order/Actionable", "path": "RELATED_ARTICLE", "value": mw.config.get( 'wgPageName' )}]
                })
            `});*/
        });
    });
});