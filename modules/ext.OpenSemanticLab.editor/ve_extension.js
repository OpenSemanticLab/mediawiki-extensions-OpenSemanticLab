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
    
    $(".custom-ve-edit-button").html('<form action="' + mw.config.get("wgScriptPath") + ' /index.php?title=' + mw.config.get("wgPageName") + '&veaction=edit" method="post" target="_self"><span aria-disabled="false" class="oo-ui-widget oo-ui-widget-enabled oo-ui-flaggedElement-progressive oo-ui-inputWidget oo-ui-buttonElement oo-ui-buttonElement-framed oo-ui-iconElement oo-ui-labelElement oo-ui-buttonInputWidget"><button type="submit" tabindex="0" aria-disabled="false" value="" class="oo-ui-inputWidget-input oo-ui-buttonElement-button webfonts-changed"><span class="oo-ui-iconElement-icon oo-ui-icon-next oo-ui-image-progressive"></span><span class="oo-ui-labelElement-label">Inhalt bearbeiten</span><span class="oo-ui-indicatorElement-indicator oo-ui-image-progressive"></span></button></span></form>');
    $(".custom-ve-edit-button-section-1").html('<form action="' + mw.config.get("wgScriptPath") + '/index.php?title=' + mw.config.get("wgPageName") + '&veaction=edit&section=1" method="post" target="_self"><span aria-disabled="false" class="oo-ui-widget oo-ui-widget-enabled oo-ui-flaggedElement-progressive oo-ui-inputWidget oo-ui-buttonElement oo-ui-buttonElement-framed oo-ui-iconElement oo-ui-labelElement oo-ui-buttonInputWidget"><button type="submit" tabindex="0" aria-disabled="false" value="" class="oo-ui-inputWidget-input oo-ui-buttonElement-button webfonts-changed"><span class="oo-ui-iconElement-icon oo-ui-icon-next oo-ui-image-progressive"></span><span class="oo-ui-labelElement-label">Inhalt bearbeiten</span><span class="oo-ui-indicatorElement-indicator oo-ui-image-progressive"></span></button></span></form>');
    
    //$("div.custom-show-visual-section-edit-link").find("a")
    $(".mw-editsection").each(function(){
        if (mw.config.get("skin") == "citizen") return; // disable this feature in Skin:Citizen (edit-links always hidden)
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
                $(this).attr('style', function(i,s) { return (s || '') + 'display: none !important;'; });
                //allHidden = false;
            }
            if ($(this).attr("href").includes("veaction=edit&")) { //visual edit link
                if ($(this).attr("href").includes("section=T-")) $(this).attr('style', function(i,s) { return (s || '') + 'display: none !important;'; }); 
                else {
                    $(this).attr('style', function(i,s) { return (s || '') + 'display: inline-block !important;'; }); 
                    allHidden = false;
                }
            }
        });
        if (!allHidden) $(this).attr('style', function(i,s) { return (s || '') + 'display: inline-block !important;'; }); 
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
    
    //Allow copy-paste / drag-drop image upload via the OSL custom dialog
    //instead of VE's built-in media upload dialog, and never inside the
    //MwJson editor popup (so it can keep its own paste handling).
    $(document).ready( function() {
        $(".fileupload-dropzone").first().each( function() {
            var debug = false;
            var dropzone = this;

            function isMwjsonEditorOpen() {
                return !!document.querySelector('div.modal.show[id^="dataEditorModal_"]');
            }

            function isVeActive() {
                try {
                    return !!(typeof ve !== 'undefined' && ve.init && ve.init.target && ve.init.target.getSurface());
                } catch (e) {
                    return false;
                }
            }

            function filesFromPaste(event) {
                var items = (event.clipboardData || (event.originalEvent && event.originalEvent.clipboardData));
                items = items && items.items;
                if (!items) return [];
                var files = [];
                for (var i = 0; i < items.length; i++) {
                    // Only File items - skip 'string' (e.g. plain text/html paste).
                    if (items[i].kind === 'file') {
                        var f = items[i].getAsFile();
                        if (f) files.push(f);
                    }
                }
                return files;
            }

            function filesFromDrop(event) {
                var dt = event.dataTransfer;
                if (!dt || !dt.files || !dt.files.length) return [];
                return Array.prototype.slice.call(dt.files);
            }

            // Lock the page scroll while a callback runs. While locked, every scroll event is
            // immediately snapped back to the saved position. This kills the up/down flicker
            // caused by OO.ui.prompt blurring the VE surface, the dialog focusing its input,
            // and VE refocusing on close - each of those can trigger a browser scroll-into-view.
            function withScrollLock(run) {
                var x = window.scrollX, y = window.scrollY;
                var locking = true;
                var snap = function () {
                    if (!locking) return;
                    if (window.scrollX !== x || window.scrollY !== y) window.scrollTo(x, y);
                };
                window.addEventListener('scroll', snap, true);
                var unlock = function () {
                    locking = false;
                    window.removeEventListener('scroll', snap, true);
                    window.scrollTo(x, y);
                };
                return run(unlock);
            }

            function promptForName(file) {
                var nameParts = file.name.split('.');
                var ext = nameParts.length > 1 ? nameParts.pop() : '';
                var base = nameParts.join('.');
                // Clipboard images often come in as "image.png" with no meaningful name -> timestamp default.
                // Drag-dropped files have real filenames -> default to the original base name so the user
                // can confirm or rename.
                var defaultName = (!base || base === 'image') ? 'clipboard_' + Date.now() : base;
                var dfd = $.Deferred();
                withScrollLock(function (unlock) {
                    OO.ui.prompt('Upload file', { textInput: { text: 'File name', value: defaultName } }).done(function (result) {
                        // Defer the unlock by one frame so VE's onSurfaceChange / refocus side-effects
                        // that fire synchronously after dialog close are also caught by the snap.
                        requestAnimationFrame(function () { unlock(); });
                        if (result === null) return dfd.resolve(null);
                        var finalName = ext ? result + '.' + ext : result;
                        dfd.resolve(new File([file], finalName, { type: file.type, lastModified: file.lastModified }));
                    });
                });
                return dfd.promise();
            }

            function uploadFiles(files) {
                // Capture the VE fragment NOW (before any async UI). After the prompt resolves
                // and SBU finishes uploading, the surface's current selection has typically reset,
                // so inserting at "current cursor" would land at the document start.
                if (isVeActive()) {
                    try {
                        window.__oslPendingVeFragment = ve.init.target.getSurface().getModel().getFragment();
                    } catch (e) { window.__oslPendingVeFragment = null; }
                } else {
                    window.__oslPendingVeFragment = null;
                }

                // Observe SimpleBatchUpload's results <ul> for newly-added <li>.ful-error entries
                // (e.g. "ERROR: File extension ".msix" does not match the detected MIME type..."),
                // and surface them via mw.notify so the user actually sees the problem when the
                // SBU dropzone is offscreen (e.g. while editing in VE).
                var resultsUl = document.querySelector('ul.fileupload-results');
                if (resultsUl && !resultsUl.__oslErrorObserved) {
                    resultsUl.__oslErrorObserved = true;
                    new MutationObserver(function (mutations) {
                        mutations.forEach(function (m) {
                            m.addedNodes && m.addedNodes.forEach(function (n) {
                                if (!(n instanceof HTMLElement)) return;
                                var checkErr = function () {
                                    if (!n.classList || !n.classList.contains('ful-error')) return;
                                    if (n.__oslNotified) return;
                                    n.__oslNotified = true;
                                    var raw = (n.textContent || '').trim();
                                    var idx = raw.indexOf('ERROR:');
                                    var msg = idx >= 0 ? raw.substring(idx) : raw;
                                    mw.notify(msg, { type: 'error', autoHide: false });
                                };
                                checkErr();
                                new MutationObserver(checkErr).observe(n, { childList: true, characterData: true, subtree: true, attributes: true });
                            });
                        });
                    }).observe(resultsUl, { childList: true });
                }

                // Prompt for each file SEQUENTIALLY (so dialogs don't stack), collect the renamed files,
                // then dispatch ONE fake drop with all of them so SBU treats them as a single batch
                // and fires simplebatchupload.files.uploaded exactly once.
                var renamedFiles = [];
                var chain = $.Deferred().resolve().promise();
                files.forEach(function (f) {
                    chain = chain.then(function () {
                        return promptForName(f).then(function (renamed) {
                            if (renamed) renamedFiles.push(renamed);
                        });
                    });
                });
                chain.then(function () {
                    if (!renamedFiles.length) { window.__oslPendingVeFragment = null; return; }
                    var preDropScrollX = window.scrollX, preDropScrollY = window.scrollY;
                    var fakeDropEvent = new DragEvent('drop');
                    // Mark so our own capture-phase handler skips this re-dispatched event.
                    fakeDropEvent.__oslSynthetic = true;
                    Object.defineProperty(fakeDropEvent, 'dataTransfer', {
                        value: { dropEffect: 'all',
                                 effectAllowed: 'all',
                                 items: [],
                                 types: ['Files'],
                                 getData: function () { return renamedFiles[0]; },
                                 files: renamedFiles }
                    });
                    dropzone.dispatchEvent(fakeDropEvent);
                    // SBU briefly mutates its offscreen UI which can nudge the viewport; pin scroll again.
                    requestAnimationFrame(function () { window.scrollTo(preDropScrollX, preDropScrollY); });
                });
            }

            function handlePasteCapture(event) {
                if (isMwjsonEditorOpen()) return;
                var files = filesFromPaste(event);
                if (!files.length) return;
                if (debug) console.log("intercept paste, files=", files);
                event.stopPropagation();
                event.preventDefault();
                uploadFiles(files);
            }

            function handleDropCapture(event) {
                // Skip our own re-dispatched synthetic drop that lands on the SBU dropzone.
                if (event.__oslSynthetic) return;
                if (isMwjsonEditorOpen()) return;
                var files = filesFromDrop(event);
                if (!files.length) return;
                if (debug) console.log("intercept drop, files=", files);
                event.stopPropagation();
                event.preventDefault();
                uploadFiles(files);
            }

            function handleDragOverCapture(event) {
                if (event.__oslSynthetic) return;
                if (isMwjsonEditorOpen()) return;
                var types = event.dataTransfer && event.dataTransfer.types;
                if (types && Array.prototype.indexOf.call(types, 'Files') !== -1) {
                    // Required so the browser will fire the subsequent drop event on us
                    event.preventDefault();
                }
            }

            document.addEventListener('paste', handlePasteCapture, true);
            document.addEventListener('drop', handleDropCapture, true);
            document.addEventListener('dragover', handleDragOverCapture, true);
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

        function fileUploadHandler(editor, file){
            if (debug) console.log("File uploaded with " +  editor + ": " + file.name + " (" + file.label + "), exists: " + file.exists);
            mwjson.api.purgePage(mw.config.get('wgPageName')); // this will ensure correspoding templates are refreshed
            const file_page = "File:" + file.name;
            const legacy_mode = !file.name.startsWith("OSW");
            const uuid = legacy_mode ? mwjson.util.uuidv4() : mwjson.util.uuidv4(file.name.split(".")[0]); // e.g. OSW<uuid>.svg
            mwjson.api.getPage(file_page).then( (page) => {
                if (!page.slots['jsondata']) page.slots['jsondata'] = {};
                if (mwjson.util.isString(page.slots['jsondata'])) page.slots['jsondata'] = JSON.parse(page.slots['jsondata']);
                let jsondata = {
                    type: ["Category:OSW11a53cdfbdc24524bf8ac435cbf65d9d"], // WikiFile
                    uuid: uuid,
                    label: [{"text": file.label, "lang": "en"}],
                    editor: ["User:" + mw.config.get('wgUserName')],
                    editing_context: [mw.config.get('wgPageName')]
                };
                
                page.slots['jsondata'] = mwjson.util.mergeDeep(jsondata, page.slots['jsondata']);
                page.slots['jsondata']['editor'] = mwjson.util.uniqueArray(page.slots['jsondata']['editor']);
                if (!page.exists) page.slots['jsondata']['creator'] = ["User:" + mw.config.get('wgUserName')];
                if (!page.slots['jsondata']['creator']) page.slots['jsondata']['creator'] = [page.slots['jsondata']['editor'][0]]; //page may already exits - set first editor as default creator
                if (!page.exists) page.slots['jsondata']['creation_context'] = [mw.config.get('wgPageName')];
                if (!page.slots['jsondata']['creation_context']) page.slots['jsondata']['creation_context'] = [page.slots['jsondata']['editing_context'][0]]; //page may already exits - set creation page to first editing page
                page.slots_changed['jsondata'] = true;
                osl.util.postProcessPage(page).then((page) => {
                    if (page.exists) {
                        if (debug) console.log("Page exists with content: ", page);
                        mwjson.api.updatePage(page, `Edited with ${editor}`);
                    }
                    else {
                        mwjson.api.updatePage(page, `Created with ${editor}`).then( () => {if (debug) console.log("Page created");});
                    }
                });
            });		
        }
        
        mw.hook( 'jsoneditor.file.uploaded' ).add( (file) => {fileUploadHandler("JsonEditor", file);});
        mw.hook( 'svgeditor.file.uploaded' ).add( (file) => {fileUploadHandler("SvgEditor", file);});
        mw.hook( 'wellplateeditor.file.uploaded' ).add( (file) => {fileUploadHandler("WellplateEditor", file);});
        mw.hook( 'drawioeditor.file.uploaded' ).add( (file) => {fileUploadHandler("DrawIoEditor", file);});
        mw.hook( 'kekuleeditor.file.uploaded' ).add( (file) => {fileUploadHandler("KekuleEditor", file);});
        mw.hook( 'spreadsheeteditor.file.uploaded' ).add( (file) => {fileUploadHandler("LuckySheetEditor", file);});
        mw.hook( 'simplebatchupload.file.uploaded' ).add( (file) => {fileUploadHandler("SimpleBatchUpload", file);}); 
        function isVeActive() {
            try {
                return !!(typeof ve !== 'undefined' && ve.init && ve.init.target && ve.init.target.getSurface());
            } catch (e) {
                return false;
            }
        }

        // If the captured fragment is positioned on an existing Template:Viewer/Media node,
        // return info about it (so we can append into it instead of replacing). Visual mode only.
        function getExistingViewerMediaAt(surface, fragment) {
            try {
                var range = fragment.getSelection().getRange();
                if (!range) return null;
                var data = surface.getModel().getDocument().data.data;
                // The covering range start could point at the open tag of the transclusion node,
                // OR (when fully selected) at one offset inside; check both positions.
                var candidates = [range.start, range.start - 1].filter(function (p) { return p >= 0; });
                for (var i = 0; i < candidates.length; i++) {
                    var node = data[candidates[i]];
                    var tpl = node && node.attributes && node.attributes.mw && node.attributes.mw.parts
                        && node.attributes.mw.parts[0] && node.attributes.mw.parts[0].template;
                    if (!tpl || !tpl.target || !tpl.target.wt) continue;
                    var tplName = tpl.target.wt.replace(/^\s*Template:\s*/, '').replace(/^\s+|\s+$/g, '');
                    if (tplName === 'Viewer/Media') {
                        return { pos: candidates[i], type: node.type, template: tpl };
                    }
                }
            } catch (e) {}
            return null;
        }

        function insertViewerMediaIntoVE(files) {
            var surface = ve.init.target.getSurface();
            var isSourceMode = surface.getMode && surface.getMode() === 'source';
            var newTextdata = files.map(function (f) { return 'File:' + f.name + '{{!}}'; }).join('; ') + ';';

            // Use the fragment captured at paste/drop time (before the prompt/upload async work
            // reset the surface selection). Falls back to the current fragment if we don't have one.
            var fragment = window.__oslPendingVeFragment || surface.getModel().getFragment();
            window.__oslPendingVeFragment = null;

            // After OO.ui.prompt closes, VE loses focus and the surface often scrolls to top.
            // Re-focus the surface view first so the upcoming insertContent + select scrolls
            // the inserted block into view at the captured cursor position instead of page top.
            try { surface.getView().focus(); } catch (e) {}

            if (isSourceMode) {
                var wt = '{{Viewer/Media|image_size=300|mode=default|textdata=' + newTextdata + '}}';
                fragment.insertContent(wt).select();
                return;
            }

            // Visual mode: if the captured cursor was on an existing Viewer/Media node,
            // merge the new files into its textdata so we add to the existing gallery instead
            // of replacing it.
            var existing = getExistingViewerMediaAt(surface, fragment);
            if (existing) {
                var prev = (existing.template.params && existing.template.params.textdata && existing.template.params.textdata.wt) || '';
                prev = prev.replace(/\s+$/, '');
                if (prev && !/;\s*$/.test(prev)) prev += ';';
                var mergedTextdata = prev ? (prev + ' ' + newTextdata) : newTextdata;

                var mergedParams = {};
                if (existing.template.params) {
                    for (var k in existing.template.params) {
                        if (Object.prototype.hasOwnProperty.call(existing.template.params, k)) {
                            mergedParams[k] = existing.template.params[k];
                        }
                    }
                }
                mergedParams.textdata = { wt: mergedTextdata };

                var mergedNode = {
                    type: existing.type,
                    attributes: { mw: { parts: [{
                        template: {
                            target: existing.template.target,
                            params: mergedParams
                        }
                    }] } }
                };
                // Replace the existing node in place by explicitly selecting its 2-offset range.
                var nodeRange = new ve.Range(existing.pos, existing.pos + 2);
                surface.getModel().setLinearSelection(nodeRange);
                surface.getModel().getFragment().insertContent([mergedNode, { type: '/' + existing.type }], false).select();
                return;
            }

            // No existing gallery at cursor — insert a fresh Viewer/Media block.
            var node = {
                type: 'mwTransclusionBlock',
                attributes: { mw: { parts: [{
                    template: {
                        target: { wt: 'Viewer/Media', href: 'Template:Viewer/Media' },
                        params: {
                            image_size: { wt: '300' },
                            mode: { wt: 'default' },
                            textdata: { wt: newTextdata }
                        }
                    }
                }] } }
            };
            fragment.insertContent([node, { type: '/mwTransclusionBlock' }], false).select();
        }

        mw.hook( 'simplebatchupload.files.uploaded' ).add( (result) => {
            console.log(result.files);
            var veActive = isVeActive();
            if (veActive) {
                // Inside VE: insert a Viewer/Media gallery template at the cursor.
                insertViewerMediaIntoVE(result.files);
            }
            // Always update the page's jsondata.attachments so the uploaded files are
            // tracked. Skip the reload when VE is active so unsaved VE changes survive.
            mwjson.api.getPage(mw.config.get('wgPageName')).then( (page) => {
                if (!page.slots['jsondata']) page.slots['jsondata'] = {};
                if (mwjson.util.isString(page.slots['jsondata'])) page.slots['jsondata'] = JSON.parse(page.slots['jsondata']);
                if (!page.slots['jsondata']['attachments']) page.slots['jsondata']['attachments'] = [];
                for (const file of result.files) page.slots['jsondata']['attachments'].push("File:" + file.name);
                page.slots_changed['jsondata'] = true;
                if (!veActive) {
                    var status = $( '<li>' ).text( "Reloading..." ).data('filenode_text', "Reloading...");
                    $( 'ul.fileupload-results').append( status );
                }
                mwjson.api.updatePage(page, `Edited with SimpleBatchUpload`).then((page) => {
                    if (!veActive) window.location.reload();
                });
            });
        });
        
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