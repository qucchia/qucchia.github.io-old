function loadUrl() {
	let url = document.getElementById("project-url").value;
	let id;
	if (parseInt(url)) {
		id = url;
	} else {
		id = ""
		for (let i = 0; i < url.length; i++) {
			if (parseInt(url[i])) {
				id += url[i];
			}
		}
		console.log(id);
	}
	document.getElementById("loading").className = "visible";
	// TODO: load project file
	document.getElementById("loading").className = "hidden";
	document.getElementById("tools").className = "visible";
}

function loadFromFile() {
	document.getElementById("loading").className = "visible";
	// TODO: load file
	document.getElementById("loading").className = "hidden";
	document.getElementById("tools").className = "visible";
}

function addAction() {
	value = document.getElementById("action").value;
	if (value === "") {
		return;
	}
	let newAction = document.createElement("fieldset");

	let newLegend = document.createElement("legend");
	if (value === "merge") {
		newLegend.innerHTML = "Merge sprites together"
	} else if (value === "separate") {
		newLegend.innerHTML = "Separate sprite into several"
	}
	newAction.append(newLegend);

	document.getElementById("actions").appendChild(newAction);

	document.getElementById("action").value = "";
}