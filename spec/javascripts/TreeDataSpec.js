cssLib("treeview.css");
cssLib("calendar.css");
jsLib("yahoo-dom-event.js");
jsLib("animation-min.js");
jsLib("calendar-min.js");
jsLib("json-min.js");
jsLib("treeview-min.js");

// this is closer to how it's going to work with Dropbox
describe("populateDirectoryContents", function() {
  var tree;
	var sample_data;

	// build a sample file structure.
	// contents of Ramadan/ directory
	sample_data = 	[ "/purification/"
									, "/Ramadan/"
									];

	// contents of Ramadan/ directory
	sample_data2 = [ "/Ramadan/30 lessons by Sheikh Fawzan/"
								 , "/Ramadan/How_to_feed_the_poor_during_th.pdf"
								 ];

	// contents of Ramadan/30 lessons by Sheikh Fawzan/ directory
	sample_data3 =  [ "/Ramadan/30 lessons by Sheikh Fawzan/Eighteenth_lesson_in_fasting_S.pdf"
									,	"/Ramadan/30 lessons by Sheikh Fawzan/nineteenth_lesson_in_fasting_S.pdf"
									,	"/Ramadan/30 lessons by Sheikh Fawzan/Twentieth_lesson_in_fasting_Sh.pdf"
									,	"/Ramadan/30 lessons by Sheikh Fawzan/Twenty_first_lesson_in_fasting.pdf"
								  ];

  beforeEach(function() {
		// add a hidden parent for the TreeView display.
		var hiddenParent = document.createElement('div');
		hiddenParent.id = "hiddenParent";
		document.getElementsByTagName("body")[0].appendChild(hiddenParent);
		hiddenParent.style.display = "none";

		// the TreeView DOM node.
		var div = document.createElement('div');
		div.id = "treeDiv1";
		hiddenParent.appendChild(div);

		// The TreeView JS object.
		tree = new YAHOO.widget.TreeView("treeDiv1", {});
		tree.render();

		// The clickable "/" node:
		root = tree.getRoot();
		TREEDATA.populateNode(root, sample_data);
	});

	it("should setup the basic menu", function() {
		expect(root.children[0].label).toEqual("purification/");
		expect(root.children[1].label).toEqual("Ramadan/");
		expect(root.children[0].children[0].label).toEqual("LOADING");
		expect(root.children[1].children[0].label).toEqual("LOADING");
	});

  it("should put the attribute type:text on each node", function() {
    expect(root.children[0].data.type).toEqual("text");
  });

	it("should add the new nodes dynamically on level 2", function() {
		TREEDATA.populateNode(root.children[1], sample_data2);
		expect(root.children[1].children[1].label).toEqual("How_to_feed_the_poor_during_th.pdf");
		expect(root.children[1].children[0].label).toEqual("30 lessons by Sheikh Fawzan/");
		expect(root.children[1].children[0].children[0].label).toEqual("LOADING");
	});

	it("should add the new nodes dynamically on level 3", function() {
		TREEDATA.populateNode(root.children[1], sample_data2);
		TREEDATA.populateNode(root.children[1].children[0], sample_data3);
		expect(root.children[1].children[0].children[0].label).toEqual("Eighteenth_lesson_in_fasting_S.pdf");
		expect(root.children[1].children[0].children[1].label).toEqual("nineteenth_lesson_in_fasting_S.pdf");
		expect(root.children[1].children[0].children[2].label).toEqual("Twentieth_lesson_in_fasting_Sh.pdf");
		expect(root.children[1].children[0].children[3].label).toEqual("Twenty_first_lesson_in_fasting.pdf");
	});

	afterEach(function() {
		var hiddenParent = document.getElementById('hiddenParent');
		document.getElementsByTagName("body")[0].removeChild(hiddenParent);
	});
})