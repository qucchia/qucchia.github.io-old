let actions = [];
let fileName = "project.sb3";
let projectJson = {};
let projectSb3;
let actionId = 0;

function loadFile() {
	document.getElementById("loading").className = "visible";

	let reader = new FileReader();
	reader.onload = function() {
			JSZip.loadAsync(reader.result).then(sb3 => {
				projectSb3 = sb3;
				sb3.file("project.json").async("string").then(project => {
					projectJson = JSON.parse(project);
					console.log(projectJson);
				})
			});
	}

	const target = document.getElementById("file");
	fileName = target.files[0].name;
	reader.readAsArrayBuffer(target.files[0]);

	document.getElementById("loading").className = "hidden";
	document.getElementById("tools").className = "visible";
}


function loadUrl() {
	let url = document.getElementById("project-url").value;
	let projectId;
	if (parseInt(url)) {
		projectId = url;
	} else {
		projectId = ""
		for (let i = 0; i < url.length; i++) {
			if (parseInt(url[i])) {
				projectId += url[i];
			}
		}
		console.log(projectId);
	}
	document.getElementById("loading").className = "visible";
	// TODO: load project file
	document.getElementById("loading").className = "hidden";
	document.getElementById("tools").className = "visible";
}

function addAction() {
	value = document.getElementById("action").value;
	if (value === "") {
		return;
	}
	actions.push({"type": value, "id": actionId});

	let template = document.getElementById(value + "-template");
	newAction = template.cloneNode(true);
	newAction.id = "action-" + actionId;


	newAction.querySelector("#remove-action").setAttribute("onclick", "removeAction(" + actionId + ");");
	newAction.querySelector("#remove-action").id = "remove-action-" + actionId;

	if (value === "merge") {
		newAction.querySelector("#sprite1").id = "sprite1-" + actionId;
		newAction.querySelector("#sprite2").id = "sprite2-" + actionId;
		newAction.querySelector("#new-sprite").id = "new-sprite-" + actionId;
		newAction.querySelector("#shift").id = "shift-" + actionId;
	}

	document.getElementById("actions").appendChild(newAction);

	document.getElementById("action").value = "";

	actionId++;
}

function removeAction(id) {
	actions.splice(id, 1);
	document.getElementById("action-" + id).remove();
}

function makeEditsAndDownload() {
	for (let i = 0; i < actions.length; i++) {
		let id = actions[i].id;

		if (actions[i].type === "merge") {
			merge(id);
		}
	}

	projectSb3.file("project.json", JSON.stringify(projectJson));

	projectSb3.generateAsync({type:"base64"}).then(data => {
		let link = document.createElement("a");
    link.style.display = "none";
    link.download = fileName;
    link.href = "data:application/zip;base64," + data;
    document.body.appendChild(link);
    link.click();
	});

}

function merge(id) {
	let sprite1Name = document.getElementById("sprite1-" + id).value;
	let sprite2Name = document.getElementById("sprite2-" + id).value;
	let newSpriteName = document.getElementById("new-sprite-" + id).value;
	let shift = parseInt(document.getElementById("shift-" + id).value);
	console.log(id, sprite1Name, sprite2Name, newSpriteName, shift);

	let j = 0;
	while (projectJson.targets[j].name !== sprite1Name && j < projectJson.targets.length) {
		j++;
	}
	if (j === projectJson.targets.length) {
		alert("Error: Sprite" + sprite1Name + "does not exist.")
	}
	let sprite1 = projectJson.targets[j];

	j = 0;
	while (projectJson.targets[j].name !== sprite2Name && j < projectJson.targets.length) {
		j++;
	}
	if (j === projectJson.targets.length) {
		alert("Error: Sprite" + sprite2Name + "does not exist.")
	}
	let sprite2 = projectJson.targets[j];
	let sprite2Index = j;

	sprite1.name = newSpriteName;
	sprite1.variables = {...sprite1.variables, ...sprite2.variables};
	sprite1.lists = {...sprite1.lists, ...sprite2.lists};
	sprite1.costumes = sprite1.costumes.concat(sprite2.costumes);
	sprite1.sounds = sprite1.sounds.concat(sprite2.sounds);
	
	for (block in sprite2.blocks) {
		if (sprite2.blocks[block].x) {
			sprite2.blocks[block].x += shift;
		}
	}
	for (comment in sprite2.comments) {
		if (sprite2.comments[comment].x) {
			sprite2.comments[comment].x += shift;
		}
	}

	sprite1.blocks = {...sprite1.blocks, ...sprite2.blocks};
	sprite1.comments = {...sprite1.comments, ...sprite2.comments};

	projectJson.targets.splice(j, 1);
}