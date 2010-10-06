// YuiFormatTree: turn a nested array of filenames into a format acceptable to YUI TreeView widget.
function YuiFormatTree(data) {
	// recursive function: takes an object (file or folder) and returns the files and path of the object
	var rFunc = function(obj, root){
		var node;
		var path;
		if (typeof obj == "string") {
			path = getDirname(obj);
			node = YuiFormatTreeNode(getBasename(obj), []);
		} else {		// if object is an array
			var files = [];
			for(var i = 0; i < obj.length; i=i+1) {
				next_level = rFunc(obj[i]);
				path = getDirname(next_level[1]);
				files[i] = next_level[0];
			}
			path = root ? root : getBasename(path);
			node = YuiFormatTreeNode(path, files);
		}
		return [node, path];
	};

	return rFunc(data, "/")[0];
}

function getDirname(path) {
	return path.replace(/[^\/]+$/,"");
}

function getBasename(path) {
	return path.match(/[^\/]+\/?$/)[0];
}

function YuiFormatTreeNode(path, children) {
	return { type: 'text', label: path, 'children': children };
}