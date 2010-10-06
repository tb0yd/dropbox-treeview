require File.join(File.dirname(__FILE__), 'spec_helper')

describe Dir do
  TEST_TREE_PATH = File.join(File.dirname(__FILE__), "tree")

  describe "#walk" do
    it "should generate a tree representation of the directory" do
      Dir.walk(TEST_TREE_PATH).size.should == 3
    end

    it "should represent empty directories as an empty array" do
      Dir.walk(TEST_TREE_PATH)[2][3].should == []
    end

    it "should take a block for only returning certain paths" do
      Dir.walk(TEST_TREE_PATH) {|file| File.extname(file) == ".rb"}.size.should == 2
    end

    it "should not have the full path but only the relative path" do
      Dir.walk(TEST_TREE_PATH).select{|e| e.include?(TEST_TREE_PATH)}.should be_empty
    end
    
    describe "with depth of 1 " do
      it "should return directories as arrays that say LOADING" do
        result = Dir.walk(TEST_TREE_PATH, :depth => 1)
        result.size.should == 3
        result[2].should == [TEST_TREE_PATH+"/subtree/LOADING"]
      end
    end
    
    describe "with depth of 2 " do
      it "should return directories as arrays that say LOADING" do
        result = Dir.walk(TEST_TREE_PATH, :depth => 2)
        result.size.should == 3
        result[2][3].should == [TEST_TREE_PATH+"/subtree/empty/LOADING"]
        result[2][4].should == [TEST_TREE_PATH+"/subtree/subsub/LOADING"]
      end
    end
  end
end
