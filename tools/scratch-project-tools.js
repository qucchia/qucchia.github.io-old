let fileName = "project.sb3";
let projectJson = {};
let projectSb3;

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

function makeEditsAndDownload() {
	// TODO: Make edits
	projectJson.meta.semver = "3.0.1";

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