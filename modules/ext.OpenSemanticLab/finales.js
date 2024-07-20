/*@nomin*/
$(document).ready(function () {

    $.when(
        mw.loader.using('ext.mwjson.editor'),
    ).done(function () {        
        
        const badgeTemplate = Handlebars.compile(`
        <button id="prefect-state-badge_{{uuid}}" type="button" class="btn badge-pill badge rounded-pill btn-{{class}}" style="margin:5px">
            <span class="sr-only">Workflow status</span>
            {{text}} <span class="badge-pill badge-light badge rounded-pill bg-light" style="color:black">{{msg}}</span>
        </button>
        `);

        const capabilitiesTemplate = Handlebars.compile(`
        {{#each .}}
        <button id="prefect-state-badge_{{quantity}}" type="button" class="btn badge-pill badge rounded-pill btn-{{#if available}}success{{else}}danger{{/if}}"  style="margin:5px">
            {{quantity}} {{methode}}
            {{#if available}}
            <span class="badge-pill badge-light badge rounded-pill bg-light" style="color:black">Online</span>
            {{else}}
            <span class="badge-pill badge-light badge rounded-pill bg-light" style="color:black">Offline</span>
            {{/if}}
        </button>
        {{/each}}
        `);

        const states = {
            "Unknown": {
                "description": "Flow run does not exists or an error occured.",
                "color": "blue",
                "class": "primary"
            },
            "pending": {
                "description": "The run will begin at a particular time in the future.",
                "color": "blue",
                "class": "primary"
            },
            "reserved": {
                "description": "The run code is currently executing",
                "color": "yellow",
                "class": "warning"
            },
            "retracted": {
                "description": "The run did not complete because an agent determined that it should not.",
                "color": "brown",
                "class": "secondary"
            },
            "resolved": {
                "description": "The run completed successfully.",
                "color": "lime",
                "class": "success"
            },
            "unsolicited": {
                "description": "",
                "color": "gray",
                "class": "secondary"
            },
        }

        async function apiCall(config, path, params) {

            let headersList = {
            "Accept": "application/json",
            "Content-Type": "application/x-www-form-urlencoded"
            }

            let bodyContent = "username=user&password=user";

            let response = await fetch("https://" + config.host + "/user_management/authenticate", { 
            method: "POST",
            body: bodyContent,
            headers: headersList
            });

            let token = await response.json();

            //console.log(token);
            headersList = {
            "Accept": "application/json",
            "Authorization": "Bearer " + token["access_token"]
            }

            defaultParams = { 
                method: 'GET',
                headers: headersList
            };
            params = params || {}
            defaultParams.headers = { ...defaultParams.headers, ...(params.headers ? params.headers : {}) };
            params = { ...defaultParams, ...params };
            if (params.body) {
                if (!(typeof params.body === 'string' || params.body instanceof String)) {
                    params.body = JSON.stringify(params.body);
                }
                if (params.method == 'GET') params.method = 'POST';
                params.headers["Content-Type"] = "application/json";
            }

            response = await fetch("https://" + config.host + path, params);

            const json = await response.json();
            return json;
        }

        async function fetchFlowDeployments(config) {
            let id = config.flow_id;

            if (config.run_id) id = config.run_id;
            let all = []
            try {
                all = await apiCall(
                    config,
                    "/capabilities/?currently_available=false"
                );
                const available = await apiCall(
                    config,
                    "/capabilities/?currently_available=true"
                );
                for (ei in all) {
                    all[ei].available = false;
                }
                for (i of available) {
                    for (ei in all) {
                        let e = all[ei];
                        if (i.quantity == e.quantity && i.method == e.method) {
                            all[ei].available = true;
                        }
                    }
                }
            } catch (error) {
                all = [
                    {
                        "quantity": "Server offline",
                        "method": "",
                        "available": false
                    }
                ]
            }
            console.log(all);
            return all;
        }

        async function runFlow(config) {
            let id = config.uuid;

            const json = await apiCall(
                config,
                "/requests/",
                {
                    "body": {
                        "uuid": id,
                        "tenant_uuid": "96d9a16ad55d492ba3107aaaded47276", // required but not used?
                        "quantity": config.quantity,
                        "methods": config.methods,
                        "parameters": config.parameters,
                    }
                }
            );
            return json;
        }

        async function fetchStatus(config) {

            let id = config.uuid;
            if (config.run_id) id = config.run_id;

            const json = await apiCall(
                config,
                "/requests/" + id
            );
            if (json) return { name: json.status};
            else return { name: "Unknown" };
        };

        async function updateBadge(config) {

            if (config.flow_id && !config.deployment_id) {
                let deployments = await fetchFlowDeployments(config);
                if (deployments[0]) {
                    config.deployment = deployments[0]; //pick the first one
                }
                config.deployment_id = config.deployment.id;
            }

            //let state = { name: "Unknown" };
            //if (config.run_id) {
                state = await fetchStatus(config);
            //}

            /*if (!config.test) {
                config.test = "TEST";
                console.log("STore test");
            }*/

            console.log(state.name);
            const state_name = state.name;
            const stateInfo = states[state_name];
            let msg = "Open Run";
            if (state_name === "Unknown") msg = "Run";

            config.container.innerHTML = badgeTemplate({ uuid: config.uuid, text: state_name, msg: msg, class: stateInfo.class })

            const btn = document.getElementById("prefect-state-badge_" + config.uuid);
            btn.onclick = async () => {
                console.log("Click");
                if (!config.run_id) {
                    let run = await runFlow(config);
                    //config.run_id = run.id;
                    updateBadge(config);
                }
                //else {
                //    window.open('https://' + config.host + '/flow-runs/flow-run/' + config.run_id, '_blank');
                //}
            };
            //btn.className = "btn badge-pill btn-" + stateInfo.class;
            //btn.innerText = stateInfo.name;
        }

        // ----------- from prefect --------------

        // get json-ld
        async function getJsonLd(params) {
            let title = params.wiki_page_title;
            let url = mw.config.get("wgScriptPath") + '/index.php?action=raw&slot=jsondata&title=' + title;
            let headers = new Headers();

            headers.append('Content-Type', 'application/json');
            const response = await fetch(url, {
                headers: headers,
                method: 'GET',
            });
            const json = await response.json();
            return json;
        }

        // inverse query on the graph
        async function reverseLookup(params) {
            let title = params.target_node.wiki_page_title;
            let property = params.edge.wiki_property_name;
            let url = mw.config.get("wgScriptPath") + '/api.php?action=ask&format=json&query=';
            //url += "[[" + encodeURIComponent(property) + "::" + encodeURIComponent(title) + "]]";
            if (params.category) url += encodeURIComponent("[[Category:" + params.category + "]]");
            url +=  encodeURIComponent("[[" +property + "::" + title + "]]");

            let headers = new Headers();

            headers.append('Content-Type', 'application/json');
            const response = await fetch(url, {
                headers: headers,
                method: 'GET',
            });
            const json = await response.json();
            
            params.source_nodes = [];
            if (json['query'] && json['query']['results']) {
                for (const node in json['query']['results']) {
                    params.source_nodes.push({
                        wiki_page_title: node
                    })
                }
            }
            return params;
        }

        async function fetchWorkflowMetadata(config) {
            return await getJsonLd({wiki_page_title: config.workflow_title})
        }

        async function fetchWorkflowRunMetadata(config) {
            const json = await getJsonLd({wiki_page_title: config.parent});
            if (json['workflow_runs']) {
                for (const run of json["workflow_runs"]) {
                    if (run['uuid'] === config.uuid) return run;
                }
            }
        }

        async function init(config) {
            if (config.parent) {
                let parent = await getJsonLd({wiki_page_title: config.parent});
                let run = await fetchWorkflowRunMetadata(config);
                if (run) {
                    if (!config.workflow_title && run['tool'] && run['tool'][0]) config.workflow_title = run['tool'][0];
                    if (run['label'] && run['label'][0] && run['label'][0]['text']) config.label = run['label'][0]['text'];
                }
            //}
            if (config.workflow_title) {
                let workflow = await fetchWorkflowMetadata(config);
                if (workflow.name) config.label = workflow.name;

                let services = await reverseLookup({
                    //category: "OSW72eae3c8f41f4a22a94dbc01974ed404", // PrefectFlow
                    category: "OSW0f64e59e8a204745be859377f8ecbe66", // FinalesFlow
                    target_node: {wiki_page_title: config.workflow_title},
                    edge: {wiki_property_name: "Hosts"}
                });
                
                if (services.source_nodes && services.source_nodes[0]) {
                    let service = await getJsonLd(services.source_nodes[0]);
                    if (!config.host && service.domain) config.host = service.domain;
                    if (!config.host) return;
                    if (!config.flow_id && service.flow_id) config.flow_id = service.flow_id;
                    else if (!config.flow_id && service.uuid) config.flow_id = service.uuid;
                    // finales
                    if (!config.parameters) {
                        config.parameters = {};
                        for (const param_key of service.parameters) {
                            config.parameters[param_key] = parent[param_key]
                        }
                    }
                    if (!config.quantity) config.quantity = service.quantity;
                    if (!config.methods) config.methods = [service.method];
                }
                else return;
            }
            }
            console.log(config);
            fetchStatus(config);
            updateBadge(config); // update once
            setInterval(updateBadge, config.refresh_interval_ms, config); // update periodically
        }

        for (const container of document.getElementsByClassName("PrefectStatusBadge")) {
            let config = {
                //"host": "api.finales.open-semantic-lab.org",
                "refresh_interval_ms": 5000,
                container: container
            };
            const userConfig = JSON.parse(container.dataset.config);
            config = { ...config, ...userConfig };
            //fetchStatus(config);
            //updateBadge(config);
            //setInterval(updateBadge, config.refresh_interval_ms, config)
            init(config);
        }

        async function updateCapabilities(config) {

            let data = await fetchFlowDeployments(config);

            config.container.innerHTML = capabilitiesTemplate(data)

        }

        for (const container of document.getElementsByClassName("FinalesCapabilities")) {
            let config = {
                //"host": "api.finales.open-semantic-lab.org",
                "refresh_interval_ms": 5000,
                container: container
            };
            const userConfig = JSON.parse(container.dataset.config);
            config = { ...config, ...userConfig };
            fetchFlowDeployments(config);
            updateCapabilities(config);
            setInterval(updateCapabilities, config.refresh_interval_ms, config)

        }
        
    });

});
