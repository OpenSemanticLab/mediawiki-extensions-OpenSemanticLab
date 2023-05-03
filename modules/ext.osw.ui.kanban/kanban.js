/*@nomin*/

$(document).ready(function () {

    $.when(
        mw.loader.using('ext.mwjson.editor'),
        mw.loader.using('ext.OpenSemanticLab.forms'),
    ).done(function () {

        let config = {
            onCreate: (params) => {
                console.log("Create", params);
                let jsondata = { type: ["Category:OSWc5d4829ed2744a219ba027171c75fa1d"], uuid: mwjson.util.uuidv4()};
                if (params.tags) {
                    for (const tag of params.tags) {
                        if (tag.type === "string") jsondata[tag.key] = Object.keys(tag.values)[0];
                        else jsondata[tag.key] = Object.keys(tag.values);
                    }
                }
                mwjson.api.getPage("Item:" +  mwjson.util.OswId(jsondata.uuid))
                .then((page) => {
                    page.slots['jsondata'] = jsondata;
                    osl.ui.editData({
                        source_page_obj: page,
                        reload: false,
                        autosave: false
                    }).then(() => {
                        console.log("Edited", page);
                        params.board.insertTask({task: {jsondata: page.slots.jsondata}});
                    });
                });
            },
            onEdit: (params) => {
                console.log("Edit", params);
                mwjson.api.getPage("Item:" +  mwjson.util.OswId(params.task.jsondata.uuid))
                .then((page) => {
                    page.slots['jsondata'] = params.task.jsondata;
                    osl.ui.editData({
                        source_page_obj: page,
                        reload: false,
                        autosave: params.board.autosave
                    }).then(() => {
                        console.log("Edited", page);
                        params.task.remove()
                        //params.task.jsondata = page.slots.jsondata;
                        params.board.insertTask({task: {jsondata: page.slots.jsondata}});
                        //params.task.refresh();
                    });
                });
            },
            onChange: (params) => {
                console.log("Change", params);
                if (params.board.autosave) {
                    mwjson.api.getPage("Item:" +  mwjson.util.OswId(params.task.jsondata.uuid))
                    .then((page) => {
                        osl.util.postProcessPage(page).then((page) => {   
                            page.slots['jsondata'] = params.task.jsondata;
                            page.slots_changed['jsondata'] = true;
                            mwjson.api.updatePage(page, "Edited with Kanban-Board")                     
                        });
                    });
                }
            },
            onSave: (params) => {
                console.log("Save", params);
                for (const task of params.kanban.tasks) {
                    mwjson.api.getPage("Item:" +  mwjson.util.OswId(task.jsondata.uuid))
                    .then((page) => {
                        osl.util.postProcessPage(page).then((page) => {
                            page.slots['jsondata'] = task.jsondata;
                            page.slots_changed['jsondata'] = true;
                            mwjson.api.updatePage(page, "Edited with Kanban-Board")
                        });
                    });
                }
            }
        }

        window.kanban = new osl.kanban.Kanban(config);
        console.log("Kanban init");
        $(".Kanban").each(function () {
            var defaultOptions = {
                "type": "button",
                "action": "create-instance"
            };
            var userOptions = {};

            if (this.dataset.config) userOptions = JSON.parse(this.dataset.config);
            var config = mwjson.util.mergeDeep(defaultOptions, userOptions);
            const user_lang = mw.config.get( 'wgUserLanguage' );

            let board = kanban.addBoard({
                container: this,
                label: "Kanban",
                description: "Drag & Drop to edit",
                tags: [{
                    key: "prio",
                    type: "string",
                    label: "",
                    values: {
                        "Item:OSWcaf7db070ad6407babc5245e84d76840": { label: "Low", color: 'yellow' },
                        "Item:OSW8d781c35212548fa9b2fccad3765da65": { label: "Medium", color: 'orange' },
                        "Item:OSW8743c7d03c4e46c1bd42bb05e1a082d9": { label: "High", color: 'red' }
                    }

                }],
                lanes: [
                    {
                        label: "Prio-Backlog",
                        style: { class: "col-6" },
                        tags: [{
                            key: "status",
                            type: "string",
                            label: "",
                            values: {
                                "Item:OSWaa8d29404288446a9f3ec7afa4e2a512": { label: "Backlog", color: 'gray' }
                            }

                        }],
                        board: {
                            lanes: [
                                {
                                    label: "Low",
                                    tags: [{
                                        key: "prio",
                                        type: "string",
                                        label: "",
                                        values: {
                                            "Item:OSWcaf7db070ad6407babc5245e84d76840": { label: "Low", color: "yellow"}
                                        },
                                        auto_unset: false
                                    }],
                                    sort: {
                                        key: "expenditure_of_time"
                                    },
                                    tasks: [
                                        // { jsondata: { type: ["Category:OSWc5d4829ed2744a219ba027171c75fa1d"], uuid: mwjson.util.uuidv4(), label: [{ "text": "T1", "lang": "en" }], due_date: "2023-03-01", progress: "30", expenditure_of_time:"10"} }
                                    ]
                                },
                                {
                                    label: "Medium",
                                    tags: [{
                                        key: "prio",
                                        type: "string",
                                        label: "",
                                        values: {
                                            "Item:OSW8d781c35212548fa9b2fccad3765da65": { label: "Medium", color: "orange"}
                                        },
                                        auto_unset: false
                                    }],
                                    sort: {
                                        key: "expenditure_of_time"
                                    },
                                    tasks: [
                                        // { jsondata: { type: ["Category:OSWc5d4829ed2744a219ba027171c75fa1d"], uuid: mwjson.util.uuidv4(), label: [{ "text": "T2", "lang": "en" }], expenditure_of_time:"20" } }
                                    ]
                                },
                                {
                                    label: "High",
                                    tags: [{
                                        key: "prio",
                                        type: "string",
                                        label: "",
                                        values: {
                                            "Item:OSW8743c7d03c4e46c1bd42bb05e1a082d9": { label: "High", color: "red"}
                                        },
                                        auto_unset: false
                                    }],
                                    sort: {
                                        key: "expenditure_of_time"
                                    },
                                    tasks: [
                                        // { jsondata: { type: ["Category:OSWc5d4829ed2744a219ba027171c75fa1d"], uuid: mwjson.util.uuidv4(), label: [{ "text": "T2", "lang": "en" }], expenditure_of_time:"30" } }
                                    ]
                                }
                            ]
                        }
                    },
                    {
                        label: "In Work",
                        tags: [{
                            key: "status",
                            type: "string",
                            label: "",
                            values: {
                                "Item:OSWa2b4567ad4874ea1b9adfed19a3d06d1": { label: "In Work", color: 'blue' }
                            }

                        }],
                        tasks: [
                            // { jsondata: { type: ["Category:OSWc5d4829ed2744a219ba027171c75fa1d"], uuid: mwjson.util.uuidv4(), label: [{ "text": "T2", "lang": "en" }], status: ["in_work"], tags: ["test1"] } }
                        ]
                    },
                    {
                        label: "Done",
                        tags: [{
                            key: "status",
                            type: "string",
                            label: "",
                            values: {
                                "Item:OSWf474ec34b7df451ea8356134241aef8a": { label: "Done", color: 'green' }
                            }

                        }],
                        tasks: [
                            // { jsondata: { type: ["Category:OSWc5d4829ed2744a219ba027171c75fa1d"], uuid: mwjson.util.uuidv4(), label: [{ "text": "T3", "lang": "en" }], status: ["done"], tags: ["test1", "test2"] } }
                        ]
                    }
                ]
            });
            //board.insertTask({task:
            //    { jsondata: { type: ["Category:OSWc5d4829ed2744a219ba027171c75fa1d"], uuid: mwjson.util.uuidv4(), name: "Test", label: [{ "text": "My new test task", "lang": "en" }], status: "backlog", prio: "low", due_date: "2023-03-01", progress: "50"} }
            //});

            if (config.query && config.query.type === "smw") {
                var query = "/w/api.php?action=ask&format=json&query=" + config.query.value;
                fetch(query)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    for (const title of Object.keys(data.query.results)) {
                        mwjson.api.getPage(title).then((page) =>{
                            let jsondata = page.slots['jsondata'];
                            if (mwjson.util.isString(jsondata)) jsondata = JSON.parse(jsondata);
                            board.insertTask({task:
                                { jsondata: jsondata}
                            });
                        });
                    }
                });
            }
        });
    });
});

osl.kanban = class {
    constructor() {
    }

    static version = "0.0.1";

    static getVersion() {
        return version;
    }

    static getDropzoneHtml() {
        return '<div class="dropzone rounded" ondragover="osl.kanban.allowDrop(event)" ondragleave="osl.kanban.clearDrop(event)"> &nbsp; </div>';
    }

    static allowDrop = (ev) => {
        ev.preventDefault();
        if (osl.kanban.hasClass(ev.target, "dropzone")) {
            osl.kanban.addClass(ev.target, "droppable");
        }
    }

    static clearDrop = (ev) => {
        osl.kanban.removeClass(ev.target, "droppable");
    }

    // helpers
    static hasClass(target, className) {
        return new RegExp('(\\s|^)' + className + '(\\s|$)').test(target.className);
    }

    static addClass(ele, cls) {
        if (!osl.kanban.hasClass(ele, cls)) ele.className += " " + cls;
    }

    static removeClass(ele, cls) {
        if (osl.kanban.hasClass(ele, cls)) {
            var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
            ele.className = ele.className.replace(reg, ' ');
        }
    }

    static unwrap(node) {
        node.replaceWith(...node.childNodes);
    }

    static mergeObjectArray(a, b, key) {
        let a_dict = {};
        let b_dict = {};
        for (const ai of a) a_dict[ai[key]] = ai
        for (const bi of b) b_dict[bi[key]] = bi
        let dict = mwjson.util.mergeDeep(a_dict, b_dict)
        let arr = []
        for (const i of Object.keys(dict)) arr.push(dict[i]);
        return arr;
    }

    static hexToRgb(hex) {
        // from https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
        // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
        var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, function(m, r, g, b) {
          return r + r + g + g + b + b;
        });
      
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
        } : null;
      }

      static standardizeColor(str){
        //from https://stackoverflow.com/questions/1573053/javascript-function-to-convert-color-names-to-hex-codes
        var ctx = document.createElement("canvas").getContext("2d");
        ctx.fillStyle = str;
        return ctx.fillStyle;
    }

    static defineTextColor(backgroundColor) {
        //from https://stackoverflow.com/questions/3942878/how-to-decide-font-color-in-white-or-black-depending-on-background-color
        let rgb = osl.kanban.hexToRgb(osl.kanban.standardizeColor(backgroundColor));
        if ((rgb.r*0.299 + rgb.g*0.587 + rgb.b*0.114) > 186) return "#000000"; 
        else return ("#ffffff");
    }

}

osl.kanban.Kanban = class {
    constructor(params) {
        params = params || {};
        this.config = params;
        this.id = params.id ? params.id : mwjson.util.uuidv4();
        this.tasks = []
    }

    static version = "0.0.1";

    static getVersion() {
        return version;
    }

    addBoard(params) {
        params.container_id = this.id;
        $(params.container).attr("id", params.container_id);
        //params.kanban = this;
        params.parent = this;
        let board = new osl.kanban.Board(params);
        //$("#" + this.id).append($(board.getHtml()));
        return board;
    }

    addTask(params) {
        this.tasks.push(params.task);
    }

    removeTask(params) {
    }

    getTagConfig() {
        return [];
    }

    getTaskFromId(params) {
        for (const task of this.tasks)
            if (task.id === params.task_id) return task;
    }

    onNewTask(params) {
        if (this.config.onCreate) this.config.onCreate(params);
    }

    onEdit(params) {
        if (this.config.onEdit) this.config.onEdit(params);
    }

    onSave(params) {
        params.kanban = this;
        if (this.config.onSave) this.config.onSave(params);
    }

    onChange(params) {
        if (this.config.onChange) this.config.onChange(params);
    }
}

osl.kanban.Board = class {
    constructor(params) {
        this.id = params.id ? params.id : mwjson.util.uuidv4();
        //this.kanban = params.kanban;
        this.parent = params.parent;
        this.config = params;
        this.label = params.label || "";
        this.description = params.description || "";
        this.container_id = `board_${this.id}_container`;
        this.anchor_id = `board_${this.id}_anchor`;
        this.autosave_button_id = `board_${this.id}_autosave-button`;
        this.save_button_id = `board_${this.id}_save-button`;
        this.autosave = false;
        this.button_html = "";
        if (!(this.parent instanceof osl.kanban.Lane)) this.button_html = `
        <button id="${this.autosave_button_id}", type="button" class="btn btn-primary " data-toggle="button" aria-pressed="false" autocomplete="off">
            Auto-Save
        </button>
        <button id="${this.save_button_id}", type="button" class="btn btn-success">Save</button>`;
        this.html = `
        <div id="${this.container_id}" class="kanban-board container-fluid pt-3">
            <div class="float-right">
                ${this.button_html}
            </div>
            <h3 class="font-weight-light m-0">${this.label}</h3>
            <div class="small m-0">${this.description}</div>

            <div id="${this.anchor_id}" class="row flex-row flex-sm-nowrap py-3">
            </div>
        </div>
        `;
        if (params.container_id) $("#" + params.container_id).append($(this.getHtml()));
        $("#" + this.autosave_button_id).on('click', () => this.onToggleAutosave());
        $("#" + this.save_button_id).on('click', () => this.onSave());
        this.lanes = [];
        for (const lane of params.lanes) this.addLane(lane);
        this.updateDropzones();
    }

    getHtml() {
        return this.html;
    }

    addLane(params) {
        params.container_id = this.anchor_id;
        params.parent = this;
        let lane = new osl.kanban.Lane(params);
        this.lanes.push(lane);
        return lane;
    }

    addTask(params) {
        this.parent.addTask(params);
    }

    insertTask(params) {
        console.log("board insertTask")
        let res = {};
        res.inserted = false;
        for (const lane of this.lanes)
            if (lane.config.tags)
                for (const tag of lane.config.tags)
                    if (params.task.jsondata[tag.key])
                        for (const value of Object.keys(tag.values))
                            if (tag.type === "string")
                                if (params.task.jsondata[tag.key] === value) {
                                    res.task = lane.insertTask(params);
                                    res.inserted = true;
                                }
                            else if (params.task.jsondata[tag.key].includes(value)) {
                                res.task = lane.insertTask(params);
                                res.inserted = true;
                            }
        this.updateDropzones();
        return res;
    }

    removeTask(params) {
        this.parent.removeTask(params);
    }

    getTagConfig() {
        let parentTags = this.parent.getTagConfig();
        if (!this.config.tags) return parentTags;
        else return osl.kanban.mergeObjectArray(parentTags, this.config.tags, 'key');
    }

    getTaskFromId(params) {
        return this.parent.getTaskFromId(params);
    }

    handleDrop(params) {
        this.parent.handleDrop();
        this.updateDropzones();
    }

    updateDropzones() {
        for (const lane of this.lanes) lane.updateDropzones();
    }

    onToggleAutosave() {
        console.log("toggleAutosave");
        this.autosave = !this.autosave;
    }

    onSave(params = {}) {
        console.log("Save");
        params.board = this;
        this.parent.onSave(params);
    }

    onNewTask(params) {
        params.board = this;
        this.parent.onNewTask(params);
    }

    onEdit(params) {
        params.board = this;
        this.parent.onEdit(params);
        //if (this.autosave) this.parent.onSave(params);
    }

    onChange(params) {
        params.board = this;
        this.parent.onChange(params);
    }
}

osl.kanban.Lane = class {
    constructor(params) {
        this.id = params.id ? params.id : mwjson.util.uuidv4();
        this.board = params.parent;
        this.parent = params.parent;
        this.config = params;
        this.container_id = `lane_${this.id}_container`;
        this.label_id = `lane_${this.id}_label`;
        this.tag_container_id = `lane_${this.id}_tag-container`;
        this.anchor_id = `lane_${this.id}_anchor`;
        this.label = params.label || "";
        //let classes  = "col-sm-6 col-md-4 col-xl-3";
        let classes = "col p-1";
        if (params.style && params.style.class) classes += " " + params.style.class;
        this.html = `
        <div id="${this.container_id}" class="${classes}">
            <div class="card bg-light">
                <div class="card-body p-1">
                    <div id="${this.tag_container_id}">
                    </div>
                    <h6 id="${this.label_id}" class="card-title text-uppercase text-truncate py-2 m-0">${this.label}</h6>
                    <div id="${this.anchor_id}" class="items border border-light">
                    </div>
                </div>
            </div>
        </div>
        `;
        if (params.container_id) $("#" + params.container_id).append($(this.getHtml()));
        if (this.config.tags)
            for (const tag of this.config.tags)
                //for (const value of Object.values(tag.values))
                    //this.addBadge({label: tag.label + ":" + value.label, color: value.color});
                for (const value of Object.keys(tag.values))    
                    this.addBadge({tag: tag, value: value});
        this.tasks = [];
        if (params.tasks) for (const task of params.tasks) this.addTask(task).refresh();
        if (params.board) {
            params.board.container_id = this.anchor_id;
            params.board.parent = this;
            this.nested_board = new osl.kanban.Board(params.board);
        }
        this.refresh()
    }

    getHtml() {
        return this.html;
    }

    addBadge(params) {
        let label = params.tag.values[params.value].label;
        let color = params.tag.values[params.value].color || 'grey';
        let textColor = params.textColor || osl.kanban.defineTextColor(color);
        $("#" + this.tag_container_id).append(`<a href="#"  class="badge float-right" style="background-color:${color}; color:${textColor}">+${label}</a>`)
        .on('click', () => this.onNewTask()); //ToDo: add only single tag from this lane badge, but all tags from parent lanes
    }

    refresh() {
        $(`#${this.label_id}`).text(`${this.label} (${this.tasks.length})`);
    }

    onNewTask(params) {
        params = params || {};
        params.tags = params.tags || [];
        params.tags.push(...this.config.tags);
        this.parent.onNewTask(params);
    }

    addTask(params) {
        var task = undefined;
        if (params.task) {
            this.tasks.push(params.task);
            task = params.task;
        }
        else {
            params.container_id = this.anchor_id;
            params.parent = this;
            task = new osl.kanban.Task(params);
            this.tasks.push(task);
        }

        console.log("Lane add task");
        if (this.config.tags)
            for (const tag of this.config.tags)
                if (!(tag.auto_set === false)) task.addTag({ tag: tag });
        this.parent.addTask({ task: task });
        this.refresh();
        return task;
    }

    insertTask(params) {
        //console.log("insertTask")
        if (this.nested_board) {
            let res = this.nested_board.insertTask(params);
            if (!res.inserted) this.addTask(params.task).refresh();
        }
        else this.addTask(params.task).refresh();
    }

    removeTask(params) {
        this.tasks = this.tasks.filter(function(t) { return t.id != params.task.id; }); 
        if (this.config.tags)
            for (const tag of this.config.tags)
                if (!(tag.auto_unset === false) || params.unset_tag) params.task.removeTag({ tag: tag });
        $("#" + this.anchor_id + " > #" + params.task.container_id).remove();
        this.parent.removeTask(params);
        this.refresh();
    }

    getTaskFromId(params) {
        return this.parent.getTaskFromId(params);
    }

    getTagConfig() {
        let parentTags = this.parent.getTagConfig();
        if (!this.config.tags) return parentTags;
        else return osl.kanban.mergeObjectArray(parentTags, this.config.tags, 'key');
    }

    onDrop(event) {
        event.preventDefault();
        const data = event.dataTransfer.getData("text/plain");
        console.log(data);
        const element = document.querySelector(`#${data}`);
        console.log("drag & drop event:", event);

        let task_id = data.split("_")[1];
        let task = this.getTaskFromId({ task_id: task_id });

        /*if (!this.nested_board) {
            try {
                // remove the spacer content from dropzone
                event.target.removeChild(event.target.firstChild);
                // add the draggable content
                event.target.appendChild(element);
                // remove the dropzone parent
                osl.kanban.unwrap(event.target);
            } catch (error) {
                console.warn("can't move the item to the same place")
            }
            task.handleDrop({ lane: this }); //just move the task
        }
        else {*/ //remove completly and re-insert
        let source_lane = task.lane;
        if (source_lane.parent.parent === this) task.remove({unset_tag: true}); //direct child lane. ToDo: Any child lane
        else task.remove();
        this.insertTask({task: {jsondata: task.jsondata}});
        //}

        this.board.updateDropzones();

        this.onChange({task: task});
    }

    handleDrop(params) {
        this.parent.handleDrop(params);
    }

    updateDropzones() {
        /* refresh the drop target areas */

        // delete old dropzones
        $(`#${this.anchor_id} > .dropzone`).remove();

        if (this.config.sort) {
            console.log("Sort");
            $(`#${this.anchor_id} > .card.draggable`).sort((a, b) => {
                let task_id_a = a.id.split("_")[1];
                let task_a = this.getTaskFromId({ task_id: task_id_a });
                let task_id_b = b.id.split("_")[1];
                let task_b = this.getTaskFromId({ task_id: task_id_b });
                if (task_a.jsondata[this.config.sort.key] && !task_b.jsondata[this.config.sort.key]) return 1;
                if (!task_a.jsondata[this.config.sort.key] && task_b.jsondata[this.config.sort.key]) return -1;
                if (task_a.jsondata[this.config.sort.key] < task_b.jsondata[this.config.sort.key]) {
                  return -1;
                } else {
                  return 1;
                }
              }).appendTo(`#${this.anchor_id}`);
        }

        let dropzone = $(osl.kanban.getDropzoneHtml());
        dropzone.on('drop', (event) => this.onDrop(event.originalEvent));

        // insert new dropdzone after each item   
        dropzone.insertAfter(`#${this.anchor_id} > .card.draggable`);

        // insert new dropzone in any empty swimlanes
        //$(`#${this.anchor_id}:not(:has(.card.draggable))`).append(dropzone);
        if (!this.tasks.length || this.nested_board) {
            $(`#${this.anchor_id}`).prepend(dropzone);
        }
    }

    onChange(params) {
        this.parent.onChange(params);
    }

    onEdit(params) {
        this.parent.onEdit(params);
    }

}

osl.kanban.Task = class {
    constructor(params) {
        this.id = params.id ? params.id : mwjson.util.uuidv4();
        this.lane = params.parent;
        this.parent = params.parent;
        this.config = params;
        this.container_id = `task_${this.id}_container`;
        this.tag_container_id = `task_${this.id}_tag-container`;
        this.edit_button_id = `task_${this.id}_edit-button`;
        this.jsondata = params.jsondata;

        this.html_template = Handlebars.compile(`
        <div class="card draggable shadow-sm" id="{{container_id}}" draggable="true" _ondragstart="osl.kanban.drag(event)">
            <div class="card-body p-2">
                <div id="{{tag_container_id}}">
                <button id="{{edit_button_id}}" class="btn btn-light btn-sm float-right"><i class="fa fa-edit"></i></button>
                    {{{badgeHtml}}}
                </div>
                <div class="card-title">
                    
                    {{#if jsondata.image}}<img src="/wiki/File:{{jsondata.image}}" class="rounded-circle float-right">{{/if}}
                    <a href="" class="lead font-weight-light">{{jsondata.label.[0].text}}</a>
                </div>
                <p class="card-text">
                    {{#if jsondata.description}}{{jsondata.description.[0].text}}{{/if}}
                </p>
                <div class="container">
                <div class="row" style="align-items: center;">
                <div class="col col-5 p-0">
                {{#if jsondata.due_date}}<p class="m-0" style="font-size:10px">{{jsondata.due_date}}</p>{{/if}}
                </div>
                <div class="col col-1 p-0">
                {{#if jsondata.expenditure_of_time}}<p class="m-0" style="font-size:10px">{{jsondata.expenditure_of_time}}h </p>{{/if}}
                </div>
                <div class="col col-6 p-0">
                {{#if jsondata.progress}}<div class="progress" style="height: 10px;">
                    <div class="progress-bar" role="progressbar" style="width: {{jsondata.progress}}%;" aria-valuenow="{{jsondata.progress}}" aria-valuemin="0" aria-valuemax="100">{{jsondata.progress}}%</div>
                </div>{{/if}}
                </div>
                </div>
                </div>
            </div>
        </div>
        `);
        this.refresh();
        //if (params.container_id) 
        if (this.parent.nested_board) $("#" + params.container_id).prepend($(this.getHtml()));
        else $("#" + params.container_id).append($(this.getHtml()));
        //const that = this;
        //$("#" + params.container_id).on('dragstart', (event) => that.onDragStart(event.originalEvent, that.container_id));
        //$("#" + this.edit_button_id).on('click', (event) => that.onEdit());
        //document.getElementById(params.container_id).addEventListener('dragstart', (event) => this.onDragStart(event));
    }

    addTag(params) {
        //console.log("Add tag", params.tag);
        let tag = params.tag;
        let values = [];
        for (const key of Object.keys(tag.values)) values.push(key);
        if (tag.type === "string") this.jsondata[tag.key] = values[0];
        else {
            if (!this.jsondata[tag.key]) this.jsondata[tag.key] = [];
            this.jsondata[tag.key].push(...values);
            this.jsondata[tag.key] = mwjson.util.uniqueArray(this.jsondata[tag.key]);
        }
        //console.log(this);
    }

    remove(params) {
        params = params || {};
        params.task = this;
        this.parent.removeTask(params);
    }

    removeTag(params) {
        //console.log("Remove tag", params.tag);
        let tag = params.tag;
        let values = [];
        for (const key of Object.keys(tag.values)) values.push(key);
        if (tag.type === "string") this.jsondata[tag.key] = undefined;
        else if (this.jsondata[tag.key]) this.jsondata[tag.key] = mwjson.util.uniqueArray(this.jsondata[tag.key].filter(value => !values.includes(value)));
        //console.log(this);
    }

    refresh() {
        //const that = this;
        this.badgeHtml = "";
        //if (this.lane.board.config.tags) 
        for (const tag of this.getTagConfig())
            if (this.jsondata[tag.key])
                if (tag.type && tag.type === "string") {
                    let value = this.jsondata[tag.key];
                    this.badgeHtml += this.getBadgeHtml({ label: tag.label + ":" + tag.values[value].label, color: tag.values[value].color });
                }
                else
                    for (const value of this.jsondata[tag.key])
                        this.badgeHtml += this.getBadgeHtml({ label: tag.label + ":" + tag.values[value].label, color: tag.values[value].color });

        this.html = this.html_template(this);
        //console.log("Refresh");
        //console.log(this.html);
        $("#" + this.container_id).replaceWith($(this.html));
        $("#" + this.container_id).on('dragstart', (event) => this.onDragStart(event.originalEvent));
        $("#" + this.edit_button_id).on('click', (event) => this.onEdit());
    }

    getTagConfig() {
        return this.parent.getTagConfig()
    }

    getHtml() {
        return this.html;
    }

    addBadge(params) {
        params.color = params.color || 'grey';
        params.textColor = params.textColor || osl.kanban.defineTextColor(params.color);
        $("#" + this.tag_container_id).append(`<span class="badge badge-pill" style="background-color:${params.color}; color:${params.textColor}">${params.label}</span>`);
    }

    getBadgeHtml(params) {
        params.color = params.color || 'grey';
        params.textColor = params.textColor || osl.kanban.defineTextColor(params.color);
        return `<span class="badge badge-pill" style="background-color:${params.color}; color:${params.textColor}">${params.label}</span>`;
    }

    onDragStart(event) {
        //if (this.container_id !== event.target.id) console.warn(this.container_id, "!==", event.target.id);
        //event.dataTransfer.setData("text/plain", event.target.id);
        event.dataTransfer.setData("text/plain", this.container_id);
    }

    onEdit() {
        console.log("Edit", this);
        this.parent.onEdit({task: this});
    }

    handleDrop(params) {
        //console.log("Move: ", this.lane, params.lane)
        this.lane.removeTask({ task: this });
        params.lane.addTask({ task: this });
        this.lane = params.lane;
        this.parent = this.lane;
        this.refresh();
    }

}

