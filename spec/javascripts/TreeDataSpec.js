// this is closer to how it's going to work with Dropbox
describe("adding nodes dynamically", function() {
  var tree, hiddenParent;

  beforeEach(function() {
		hiddenParent = newHiddenDiv();
		tree = renderNewTree(hiddenParent);
		
		// The clickable "/" node:
		root = tree.getRoot();
		TREEDATA.populateNode(root, sampleData[0]);
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
		TREEDATA.populateNode(root.children[1], sampleData[1]);
		expect(root.children[1].children[1].label).toEqual("How_to_feed_the_poor_during_th.pdf");
		expect(root.children[1].children[0].label).toEqual("30 lessons by Sheikh Fawzan/");
		expect(root.children[1].children[0].children[0].label).toEqual("LOADING");
	});

	it("should add the new nodes dynamically on level 3", function() {
		TREEDATA.populateNode(root.children[1], sampleData[1]);
		TREEDATA.populateNode(root.children[1].children[0], sampleData[2]);
		expect(root.children[1].children[0].children[0].label).toEqual("Eighteenth_lesson_in_fasting_S.pdf");
		expect(root.children[1].children[0].children[1].label).toEqual("nineteenth_lesson_in_fasting_S.pdf");
		expect(root.children[1].children[0].children[2].label).toEqual("Twentieth_lesson_in_fasting_Sh.pdf");
		expect(root.children[1].children[0].children[3].label).toEqual("Twenty_first_lesson_in_fasting.pdf");
	});

	afterEach(function() {
		document.getElementsByTagName("body")[0].removeChild(hiddenParent);
	});
})

describe("linking a TreeView widget to the data functions", function(){
	var tree, hiddenParent;

  beforeEach(function() {
		hiddenParent = newParentDiv();
		tree = renderNewTree(hiddenParent, {});

    tree.subscribe("labelClick", function(node) {
			var root = tree.getRoot();
			TREEDATA.populateNode(root, sampleData[0]);
			TREEDATA.populateNode(root.children[1], sampleData[1]);
			tree.render();
		});
	});
	
	it("should work", function(){
		
	});
});