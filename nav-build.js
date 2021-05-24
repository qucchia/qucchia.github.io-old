let header = document.createElement("header");
document.body.appendChild(header);
let nav = document.createElement("nav");
nav.id = "topnav";
header.appendChild(nav);
let a = document.createElement("a");
a.className = "first";
a.href = "/";
nav.append(a);
let img = document.createElement("img");
img.src = "/images/qucchia silhouette transparent.png";
a.append(img);
let p = document.createElement("p");
p.innerHTML = "qucchia";
a.append(p);

/* Add extra links when URL has parent pages

	<p>·</p>
	<a href="/blog">
		<p>blog</p>
	</a>
*/
