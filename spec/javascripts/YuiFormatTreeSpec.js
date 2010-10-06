describe("YuiFormatTree", function() {
  var tree;
	var sample_data;

	sample_data = [ ["/purification/An_Amazing_Story.pdf"]
									,	[
											[ "/Ramadan/30 lessons by Sheikh Fawzan/Eighteenth_lesson_in_fasting_S.pdf"
											,	"/Ramadan/30 lessons by Sheikh Fawzan/nineteenth_lesson_in_fasting_S.pdf"
											,	"/Ramadan/30 lessons by Sheikh Fawzan/Twentieth_lesson_in_fasting_Sh.pdf"
											,	"/Ramadan/30 lessons by Sheikh Fawzan/Twenty_first_lesson_in_fasting.pdf"
											]
										, "/Ramadan/How_to_feed_the_poor_during_th.pdf"
								] ];

  beforeEach(function() {
    tree = new YuiFormatTree(sample_data);
  });

  it("should put the attribute type:text on each node", function() {
    expect(tree.children[0].type).toEqual("text");
  });

	it("should have all the original nodes in their places", function() {
		expect(tree.children[0].children[0].label).toEqual("An_Amazing_Story.pdf");
		expect(tree.children[1].children[0].children[0].label).toEqual("Eighteenth_lesson_in_fasting_S.pdf");
		expect(tree.children[1].children[0].children[1].label).toEqual("nineteenth_lesson_in_fasting_S.pdf");
		expect(tree.children[1].children[0].children[2].label).toEqual("Twentieth_lesson_in_fasting_Sh.pdf");
		expect(tree.children[1].children[0].children[3].label).toEqual("Twenty_first_lesson_in_fasting.pdf");
		expect(tree.children[1].children[1].label).toEqual("How_to_feed_the_poor_during_th.pdf");
	});

	it("should assign the directory names to the parent nodes", function() {
		expect(tree.children[0].label).toEqual("purification/");
		expect(tree.children[1].label).toEqual("Ramadan/");
		expect(tree.children[1].children[0].label).toEqual("30 lessons by Sheikh Fawzan/")
	});
});

externalLibrary("treeview.css");
externalLibrary("calendar.css");
externalLibrary("yahoo-dom-event.js");
externalLibrary("animation-min.js");
externalLibrary("calendar-min.js");
externalLibrary("json-min.js");
externalLibrary("treeview-min.js");

// this is closer to how it's going to work with Dropbox
describe("populateDirectoryContents", function() {
  var tree;
	var sample_data;

	sample_data = 	[ 
										[
											"/purification/LOADING"
										]
									, [
											"/Ramadan/LOADING"
										]
									];

	// contents of Ramadan/ directory
	sample_data2 = [ [ "/Ramadan/30 lessons by Sheikh Fawzan/LOADING" ]
								 , "/Ramadan/How_to_feed_the_poor_during_th.pdf"
								 ];

  beforeEach(function() {
		// add a hidden parent for the TreeView display.
		var hiddenParent = document.createElement('div');
		document.getElementsByTagName("body")[0].appendChild(hiddenParent);
		hiddenParent.style.display = "none";
		
		// the TreeView DOM node.
		var div = document.createElement('div');
		div.id = "treeDiv1";
		hiddenParent.appendChild(div);
		
		// The TreeView JS object.
		tree = new YAHOO.widget.TreeView("treeDiv1", YuiFormatTree(sample_data));
		tree.render();
		
		// The clickable "/" node:
		root = tree.getRoot().children[0];
	});

	it("should setup the basic menu", function() {
		expect(root.children[0].label).toEqual("purification/");
		expect(root.children[1].label).toEqual("Ramadan/");
		expect(root.children[0].children[0].label).toEqual("LOADING");
		expect(root.children[1].children[0].label).toEqual("LOADING");
	});
	
	it("should add the new nodes dynamically", function() {
		populateDirectoryContents(root.children[1], sample_data2);
		expect(root.children[1].children[1].label).toEqual("How_to_feed_the_poor_during_th.pdf");
		expect(root.children[1].children[0].label).toEqual("30 lessons by Sheikh Fawzan/");
		expect(root.children[1].children[0].children[0].label).toEqual("LOADING");
	});
})