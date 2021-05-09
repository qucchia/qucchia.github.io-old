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