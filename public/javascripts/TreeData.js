var TREEDATA = {};

TREEDATA.getBasename = function(path) {
	return path.match(/[^\/]+\/?$/)[0];
};

TREEDATA.format = function(path, children) {
	return { type: 'text', label: path, 'children': children };
};

TREEDATA.populateNode = function(root, data) {
	root.tree.removeNode(root.children[0]);	// remove the "LOADING" node

	for(var i=0; i < data.length; i++) {
		var parent = new YAHOO.widget.TextNode( TREEDATA.format( TREEDATA.getBasename(data[i]), [] ), root, false );
		if (data[i].match(/\/$/)) {
			new YAHOO.widget.TextNode(TREEDATA.format("LOADING", []), parent, false);
		}
	}
};