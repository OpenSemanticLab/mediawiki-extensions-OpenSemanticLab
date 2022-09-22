/*for create new subpage in toolbar*/
searchParams = new URLSearchParams(window.location.search);
if (searchParams.has('superpage')) $('#create_page_or_subpage_input').find('input[name=title]').val(searchParams.get('superpage') + "/");
$('#create_page_or_subpage_input').find('input[name=title]').focus();

//https://doc.wikimedia.org/mediawiki-core/master/js/#!/api/mw.hook
//mw.loader.using( 'mediawiki.action.view.postEdit' ).done( function() {
    mw.hook( 'postEdit' ).add( function() {
        //console.log('postEdit');
    });
    //});
    mw.hook( 've.activate' ).add( function() {
        //console.log('ve.activate');
    });
    mw.hook( 've.activationComplete' ).add( function() {
        //console.log('ve.activationComplete');
    });
    mw.hook( 've.deactivate' ).add( function() {
        //console.log('ve.deactivate');
    });
    mw.hook( 've.deactivationComplete' ).add( function() {
        //console.log('ve.deactivationComplete');
        //reload page
        location.reload(); 
        //window.location.search += '&action=purge';
    });
    
    $(".custom-ve-edit-button").html('<form action="/w/index.php?title=' + mw.config.get("wgPageName") + '&veaction=edit" method="post" target="_self"><span aria-disabled="false" class="oo-ui-widget oo-ui-widget-enabled oo-ui-flaggedElement-progressive oo-ui-inputWidget oo-ui-buttonElement oo-ui-buttonElement-framed oo-ui-iconElement oo-ui-labelElement oo-ui-buttonInputWidget"><button type="submit" tabindex="0" aria-disabled="false" value="" class="oo-ui-inputWidget-input oo-ui-buttonElement-button webfonts-changed"><span class="oo-ui-iconElement-icon oo-ui-icon-next oo-ui-image-progressive"></span><span class="oo-ui-labelElement-label">Inhalt bearbeiten</span><span class="oo-ui-indicatorElement-indicator oo-ui-image-progressive"></span></button></span></form>');
    $(".custom-ve-edit-button-section-1").html('<form action="/w/index.php?title=' + mw.config.get("wgPageName") + '&veaction=edit&section=1" method="post" target="_self"><span aria-disabled="false" class="oo-ui-widget oo-ui-widget-enabled oo-ui-flaggedElement-progressive oo-ui-inputWidget oo-ui-buttonElement oo-ui-buttonElement-framed oo-ui-iconElement oo-ui-labelElement oo-ui-buttonInputWidget"><button type="submit" tabindex="0" aria-disabled="false" value="" class="oo-ui-inputWidget-input oo-ui-buttonElement-button webfonts-changed"><span class="oo-ui-iconElement-icon oo-ui-icon-next oo-ui-image-progressive"></span><span class="oo-ui-labelElement-label">Inhalt bearbeiten</span><span class="oo-ui-indicatorElement-indicator oo-ui-image-progressive"></span></button></span></form>');
    
    //$("div.custom-show-visual-section-edit-link").find("a")
    $(".mw-editsection").each(function(){
        console.log(mw.config.get('wgPageName'));
        if (mw.config.get('wgPageName') === "Special:FormEdit" || mw.util.getParamValue('action') === "formedit") return; //no edit links in PageForms
        var allHidden = true;
        $(this).find("a").each(function(){
            //console.log(this);
            //console.log($(this).attr("href"));
            /*if ($(this).attr("href").includes("section=T-")) { //template edit link (always source edit link?)
                $(this).attr('style', function(i,s) { return (s || '') + 'display: none !important;' });
                //allHidden = false;
            }*/
            if ($(this).attr("href").includes("veaction=editsource") || ($(this).attr("href").includes("action=edit") && !$(this).attr("href").includes("veaction"))) { //source edit link
                $(this).attr('style', function(i,s) { return (s || '') + 'display: none !important;' });
                //allHidden = false;
            }
            if ($(this).attr("href").includes("veaction=edit&")) { //visual edit link
                if ($(this).attr("href").includes("section=T-")) $(this).attr('style', function(i,s) { return (s || '') + 'display: none !important;' }); 
                else {
                    $(this).attr('style', function(i,s) { return (s || '') + 'display: inline-block !important;' }); 
                    allHidden = false;
                }
            }
        });
        if (!allHidden) $(this).attr('style', function(i,s) { return (s || '') + 'display: inline-block !important;' }); 
    });
    $("#custom-ve-new-section-link").append(`<span class="mw-editsection" style="display: inline-block !important;"><span class="mw-editsection-bracket">[</span><a href="/wiki/${mw.config.get('wgPageName')}?veaction=edit&section=new" class="mw-editsection-visualeditor" title="Bearbeiten" style="display: inline-block !important;">Abschnitt hinzufügen</a><span class="mw-editsection-bracket">]</span></span>`);
    $("#custom-ve-add-first-section-link").each(function() {
        console.log('a.mw-editsection-visualeditor[href*="section="]: ' + $('a.mw-editsection-visualeditor[href*="section="]').length);
        if (!$('a.mw-editsection-visualeditor[href*="section=1"]').length){
            $(this).append(`<span class="mw-editsection" style="display: inline-block !important;"><span class="mw-editsection-bracket">[</span><a href="/wiki/${mw.config.get('wgPageName')}?veaction=edit&section=new" class="mw-editsection-visualeditor" title="Bearbeiten" style="display: inline-block !important;">Inhalt erstellen</a><span class="mw-editsection-bracket">]</span></span>`);
        }
    });
    
    /*mw.hook( 've.activationComplete' ).add( function() {
        //console.log('remove all div.custom-ve-uneditableContent');
        //$("div.custom-ve-uneditableContent").remove(); //works, but creates exeptions in VE-js
        console.log('remove class ve-ce-focusableNode from all subnodes of div.custom-ve-uneditableContent');
        $("div.custom-ve-uneditableContent").removeClass("ve-ce-focusableNode");
        $("div.custom-ve-uneditableContent").find("*").removeClass("ve-ce-focusableNode");
        
            $(this).css("-webkit-touch-callout", "none");
            $(this).css("-webkit-user-select", "none");
            $(this).css("-khtml-user-select", "none");
            $(this).css("-moz-user-select", "none");
            $(this).css("-ms-user-select", "none");
            $(this).css("user-select", "none");
        $("div.custom-ve-uneditableContent").find("*").each(function(){
            $(this).css("-webkit-touch-callout", "none");
            $(this).css("-webkit-user-select", "none");
            $(this).css("-khtml-user-select", "none");
            $(this).css("-moz-user-select", "none");
            $(this).css("-ms-user-select", "none");
            $(this).css("user-select", "none");
        });
    });*/
    
    /*watch SimpleBatchUploader file upload input*/
    $("div.fileupload-auto-reload").each(function(){
        var do_reload;
        var reload_timeout = 3000; //ms
        //input_element = $(this).find('input.fileupload ');
        ul_element = $(this).find('ul.fileupload-results');
        ul_element.on('DOMSubtreeModified', function(event) {
            //console.log("Upload list updated");
            //console.log(ul_element);
            if (ul_element.find(".ful-error").length > 0) {
                //console.log("Min 1 error");
                clearTimeout(do_reload);
            }
            else {
                //console.log("No error");
                clearTimeout(do_reload);
                do_reload = setTimeout(function(){ console.log("reload"); location.reload(); }, reload_timeout);
            }
        });
        //var container = $(this).find('div.fileupload-container');
        //$('input.fileupload', container)
        //.bind('fileuploaddrop', function (e, data) {console.log(data);})
        //.bind('fileuploadfail', function (e, data) {console.log(e);console.log(data);})
        //.bind('fileuploaddone', function (e, data) {
        //	console.log("done");
        //});
    });
    
    //Allow copy-paste on SimpleBatchUploader drag-and-drop field
    $(document).ready( function() {
        $(".fileupload-dropzone").first().each( function() {
            var debug = false;
            var enabled = true;
            
            mw.hook( 've.activate' ).add( function() {
                enabled = false;
                if (debug) console.log("Disable clipboard");
            });
    
            mw.hook( 've.deactivationComplete' ).add( function() {
                enabled = true;
                if (debug) console.log("Enable clipboard");
            });
            
            if (debug) console.log("Register paste event handler");
            var dropzone = this;
            document.onpaste = function(event){
                if (!enabled) return;
                if (debug) console.log("paste event");
                var items = (event.clipboardData || event.originalEvent.clipboardData).items;
                for (var i = 0 ; i < items.length ; i++) {
                    var item = items[i];
                    if (debug) console.log(item);
                    if (item.type.indexOf("image") != -1) {
                        var file = item.getAsFile();
                        var file_name_prefix = mw.config.get('wgPageName').replace(':','_').replace('/','_').replace(' ','_'); 
                        var file_name = "clipboard_" + Date.now();
                        var file_name_postfix = file.name.split('.')[file.name.split('.').length-1];
                        //ask for file rename and upload confirmation
                        OO.ui.prompt( 'Upload Clipboard as file', { textInput: { text: 'File name', value: file_name } } ).done( function ( result ) {
                            if ( result !== null ) {
                                if (debug) console.log( 'User typed "' + result + '" then clicked "OK".' );
                                file_name = file_name_prefix + '_' + result + '.' + file_name_postfix;
                                if (debug) console.log( 'Final file name: "' + file_name );
                                //we have to copy the file for renaming because file.name is read only
                                file = new File([file], file_name, {type: file.type, lastModified: file.lastModified });
                                if (debug) console.log(file);
                                
                                var fakeDropEvent = new DragEvent('drop');
                                Object.defineProperty(fakeDropEvent, 'dataTransfer', {
                                    value: {  dropEffect: 'all',
                                              effectAllowed: 'all',
                                              items: [],
                                              types: ['Files'],
                                              getData: function() {return file;},
                                              files: [file],
                                    }
                                });
                                
                                dropzone.dispatchEvent(fakeDropEvent);
                            } else {
                                if (debug) console.log( 'User clicked "Cancel" or closed the dialog.' );
                            }
                        } );
                    }
                }
            };
        });
    });

$(document).ready(function() {
    $.when(
        mw.loader.using('ext.mwjson.util'),
        mw.loader.using('ext.mwjson.api'),
        mw.loader.using('ext.mwjson.parser'),
        $.Deferred(function (deferred) {
            $(deferred.resolve);
        })
    ).done(function () {
        var debug = false;
        if (debug) console.log("File Upload Handler init");
        
        function updateFileInstanceTemplate(text, exists){
            const template = "OslTemplate:LIMS/File/Instance";
            const user = "User:" + mw.config.get('wgUserName');
            const page = mw.config.get('wgPageName');
            var params;
            if (exists) {
                var pages = mwjson.parser.getParamValue(text, template, "edit_page", "");
                pages = mwjson.parser.updateParamValue(pages, [page], 'append');
                var users = mwjson.parser.getParamValue(text, template, "editor", "");
                users = mwjson.parser.updateParamValue(users, [user], 'append');
                params = [
                    {name: "edit_page", value: pages},
                    {name: "editor", value: users},
                ];
            }
            else {
                params = [
                    {name: "creation_page", value: page},
                    {name: "creator", value: user},
                ];
            }
            return mwjson.parser.updatePageText(text, template, params);
        }

        function fileUploadHandler(editor, file){
            if (debug) console.log("File uploaded with " +  editor + ": " + file.name + ", exists: " + file.exists);
            const file_page = "File:" + file.name;
            mwjson.api.getPage(file_page).then( (page) => {
                var text = updateFileInstanceTemplate(page.content, file.exists);
                if (page.exists) {
                    if (debug) console.log("Page exists with content: " + page.content);
                    mwjson.api.editPage(file_page, text, `Edited with ${editor}`);
                }
                else mwjson.api.createPage(file_page, text, `Created with ${editor}`).then( () => {if (debug) console.log("Page created")});
            });		
        }
        
        mw.hook( 'svgeditor.file.uploaded' ).add( (file) => {fileUploadHandler("SvgEditor", file)});
        mw.hook( 'wellplateeditor.file.uploaded' ).add( (file) => {fileUploadHandler("WellplateEditor", file)});
        mw.hook( 'drawioeditor.file.uploaded' ).add( (file) => {fileUploadHandler("DrawIoEditor", file)});
        mw.hook( 'kekuleeditor.file.uploaded' ).add( (file) => {fileUploadHandler("KekuleEditor", file)});
        mw.hook( 'spreadsheeteditor.file.uploaded' ).add( (file) => {fileUploadHandler("LuckySheetEditor", file)});
        
    });
});

//fix false rendering of section headings in footer templates
$(document).ready(function() {
    $('#custom-ve-new-section-prepend-anchor').each(function() {
        const prev = $(this).prev('p');
        if (prev.length) {
            const text_elements = prev.text().split('=');
            var heading_label = text_elements[text_elements.length-1];
            if (heading_label === "\n") heading_label = text_elements[text_elements.length-2];
            console.log(heading_label);
            prev.text(prev.text().replace('=' + heading_label + "=",""));
            $('<h1><span class="mw-headline" id="' + heading_label + '">' + heading_label + '</span></h1>').appendTo(prev);
        }
    });
});