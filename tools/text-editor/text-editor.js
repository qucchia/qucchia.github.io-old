const fileSelector = document.getElementById('file-selector');
fileSelector.addEventListener('change', event => {
	const file = event.target.files[0];
	const reader = new FileReader();
	reader.addEventListener('load', (event) => {
    let contents = event.target.result;
		let lines = contents.split("\n");
		document.getElementById("textarea").value = contents;
  });
	reader.readAsText(file);
});

function replace() {
	let replaceText = document.getElementById("replace-text").value;
	let replaceFor = document.getElementById("replace-for").value;
	let text = document.getElementById("textarea").value;

	for (let i = replaceText.length; i < text.length; i++) {
		if (text.substring(i - replaceText.length, i) == replaceText) {
			text = text.substring(0, i -replaceText.length) + replaceFor + text.substring(i);
			i += replaceText.length - replaceFor.length;
		}
	}

	document.getElementById("textarea").value = text;
}

function download() {
	let link = document.createElement("a");
	link.style.display = "none";
	link.download = "text.txt";
	console.log(document.getElementById("textarea").innerHTML);
	link.href = "data:text," + document.getElementById("textarea").value;
	document.body.appendChild(link);
	link.click();
}