function getBasename(path) {
	return path.match(/[^\/]+\/?$/)[0];
}

function YuiFormatTreeNode(path, children) {
	return { type: 'text', label: path, 'children': children };
}

function populateDirectoryContents(root, data) {
	var tmp;
	root.tree.removeNode(root.children[0]);	// remove the "LOADING" node
	for(var i=0; i < data.length; i++) {
		tmp = new YAHOO.widget.TextNode(YuiFormatTreeNode(getBasename(data[i]), []), root, false);
		if (data[i].match(/\/$/)) {
			tmp = new YAHOO.widget.TextNode(YuiFormatTreeNode("LOADING", []), tmp, false);
		}
	}
}