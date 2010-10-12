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

cssLib("treeview.css");
cssLib("calendar.css");
jsLib("yahoo-dom-event.js");
jsLib("animation-min.js");
jsLib("calendar-min.js");
jsLib("json-min.js");
jsLib("treeview-min.js");

// build a sample file structure.
var sampleData = [
// contents of root directory
[ "/purification/"
, "/Ramadan/"
],

// contents of Ramadan/ directory
[ "/Ramadan/30 lessons by Sheikh Fawzan/"
, "/Ramadan/How_to_feed_the_poor_during_th.pdf"
],

// contents of Ramadan/30 lessons by Sheikh Fawzan/ directory
[ "/Ramadan/30 lessons by Sheikh Fawzan/Eighteenth_lesson_in_fasting_S.pdf"
,	"/Ramadan/30 lessons by Sheikh Fawzan/nineteenth_lesson_in_fasting_S.pdf"
,	"/Ramadan/30 lessons by Sheikh Fawzan/Twentieth_lesson_in_fasting_Sh.pdf"
,	"/Ramadan/30 lessons by Sheikh Fawzan/Twenty_first_lesson_in_fasting.pdf"
 ]
];

function newHiddenDiv() {
	// add a hidden parent for the TreeView display.
	var hiddenParent = document.createElement('div');
	hiddenParent.id = "hiddenParent";
	document.getElementsByTagName("body")[0].appendChild(hiddenParent);
	hiddenParent.style.display = "none";
	return hiddenParent;
}

function newParentDiv() {
	// add a hidden parent for the TreeView display.
	var hiddenParent = document.createElement('div');
	hiddenParent.id = "hiddenParent";
	document.getElementsByTagName("body")[0].appendChild(hiddenParent);
	return hiddenParent;
}

function renderNewTree(parent) {
	// the TreeView DOM node.
	var div = document.createElement('div');
	div.id = "treeDiv1";
	parent.appendChild(div);

	// The TreeView JS object.
	tree = new YAHOO.widget.TreeView("treeDiv1", {});
	tree.render();
	return tree;
}
