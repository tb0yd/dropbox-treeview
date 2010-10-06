function externalLibrary(path) {
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = "/__spec__/include/" + path;
	document.getElementsByTagName("head")[0].appendChild(script);
}