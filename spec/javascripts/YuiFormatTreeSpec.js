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