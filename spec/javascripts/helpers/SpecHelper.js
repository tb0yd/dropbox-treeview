function jsLib(path) {
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = "/__spec__/include/" + path;
	document.getElementsByTagName("head")[0].appendChild(script);
}

function cssLib(path) {
	var link = document.createElement('link');
	link.type = 'text/css';
	link.rel = 'stylesheet';
	link.media = 'screen';
	link.href = "/__spec__/include/" + path;
	document.getElementsByTagName("head")[0].appendChild(link);
}