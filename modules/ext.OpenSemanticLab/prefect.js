$(document).ready(function () {

    $.when(
        mw.loader.using('ext.mwjson.util'),
        mw.loader.using('ext.mwjson.api'),
        mw.loader.using('ext.mwjson.editor'),
    ).done(function () {

    const badgeTemplate = Handlebars.compile(`
        <button id="prefect-state-badge_{{uuid}}" type="button" class="btn badge-pill btn-{{class}}">
            <span class="sr-only">Workflow status</span>
            {{text}} <span class="badge-pill badge-light">{{msg}}</span>
        </button>
        `);

    const states = {
        "Unknown": {
            "description": "Flow run does not exists or an error occured.",
            "color": "blue",
            "class": "primary"
        },
        "Scheduled": {
            "description": "The run will begin at a particular time in the future.",
            "color": "blue",
            "class": "primary"
        },
        "Late": {
            "description": "The run's scheduled start time has passed, but it has not transitioned to PENDING (5 seconds by default).",
            "color": "green",
            "class": "warning"
        },
        "AwaitingRetry": {
            "description": "The run did not complete successfully because of a code issue and had remaining retry attempts.",
            "color": "purple",
            "class": "info"
        },
        "Pending": {
            "description": "The run has been submitted to run, but is waiting on necessary preconditions to be satisfied.",
            "color": "red",
            "class": "warning"
        },
        "Running": {
            "description": "The run code is currently executing.",
            "color": "orange",
            "class": "warning"
        },
        "Retrying": {
            "description": "The run code is currently executing after previously not completing successfully.",
            "color": "yellow",
            "class": "warning"
        },
        "Paused": {
            "description": "The run code has stopped executing until it receives manual approval to proceed.",
            "color": "teal",
            "class": "secondary"
        },
        "Cancelling": {
            "description": "The infrastructure on which the code was running is being cleaned up.",
            "color": "gray",
            "class": "secondary"
        },
        "Cancelled": {
            "description": "The run did not complete because a user determined that it should not.",
            "color": "brown",
            "class": "secondary"
        },
        "Completed": {
            "description": "The run completed successfully.",
            "color": "lime",
            "class": "success"
        },
        "Failed": {
            "description": "The run did not complete because of a code issue and had no remaining retry attempts.",
            "color": "pink",
            "class": "danger"
        },
        "Crashed": {
            "description": "The run did not complete because of an infrastructure issue.",
            "color": "maroon",
            "class": "danger"
        }
    };

    async function fetchFlowDeployments(config) {
        let id = config.flow_id;
        let url = 'https://' + config.host + '/api/deployments/filter';
        let headers = new Headers();

        headers.append('Content-Type', 'application/json');
        const response = await fetch(url, {
            headers: headers,
            method: 'POST',
            body: JSON.stringify({
                "offset": 0,
                "flows": {
                    "id": {
                        "any_": [
                            id
                        ]
                    }
                },
                "limit": 1,
                "sort": "NAME_ASC"
            })
        });
        const json = await response.json();
        return json;
    }

    async function runFlow(config) {
        let id = config.flow_id;
        let url = 'https://' + config.host + '/api/deployments/' + config.deployment_id + '/create_flow_run';
        let headers = new Headers();

        headers.append('Content-Type', 'application/json');
        const response = await fetch(url, {
            headers: headers,
            method: 'POST',
            body: JSON.stringify({
                //"flow_id": config.flow_id,
                //"deployment_id": config.deployment_id,
                "parameters": config.parameters,
                "idempotency_key": config.uuid // use to get run later,
            })
        });
        const json = await response.json();
        return json;
    }

    async function fetchStatus_old(config) {

        let id = config.run_id;
        let url = 'https://' + config.host + '/api/flow_runs/' + id;

        let headers = new Headers();

        //headers.append('Content-Type', 'text/json');
        //headers.append('Authorization', 'Basic' + tob(username + ":" + password));
        //headers.set('Authorization', 'Basic ' + btoa(username + ":" + password));
        //headers.set("Access-Control-Allow-Origin", "*");
        const response = await fetch(url, {
            method: 'GET',
            headers: headers
        });
        const json = await response.json();
        return json.state;
    };

    async function fetchStatus(config) {

        let id = config.uuid;
        if (config.run_id) id = config.run_id;
        let url = 'https://' + config.host + '/api/flow_runs/filter';

        let headers = new Headers();

        headers.append('Content-Type', 'application/json');

        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                "sort": "ID_DESC",
                "offset": 0,
                "flow_runs": {
                    "operator": "or_",
                    "id": {
                        "any_": [
                            id
                        ]
                    },
                    "idempotency_key": {
                        "any_": [
                            id
                        ]
                    }
                },
                "limit": 1

            })
        });
        const json = await response.json();
        if (json[0]) return json[0].state;
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

        config.container.innerHTML = badgeTemplate({ uuid: config.uuid, text: state_name, msg: msg, class: stateInfo.class });

        const btn = document.getElementById("prefect-state-badge_" + config.uuid);
        btn.onclick = async () => {
            console.log("Click");
            if (!config.run_id) {
                let run = await runFlow(config);
                config.run_id = run.id;
                updateBadge(config);
            }
            else {
                window.open('https://' + config.host + '/flow-runs/flow-run/' + config.run_id, '_blank');
            }
        };
        //btn.className = "btn badge-pill btn-" + stateInfo.class;
        //btn.innerText = stateInfo.name;
    }

    for (const container of document.getElementsByClassName("PrefectStatusBadge")) {
        let config = {
            "host": "", //cloud?
            "refresh_interval_ms": 5000,
            container: container
        };
        const userConfig = JSON.parse(container.dataset.config);
        config = { ...config, ...userConfig };
        fetchStatus(config);
        setInterval(updateBadge, config.refresh_interval_ms, config);

    }
});

});