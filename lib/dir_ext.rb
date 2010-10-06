class Dir
  def self.walk(dir, opts={}, &block)
    Dir.walk_r(dir, nil, opts[:depth] || -1, &block)
  end
  
  private
  
  def self.walk_r(dir, base, depth, &block)
    if depth > 0
      depth -= 1
    elsif depth == 0
      return [ dir+"/LOADING" ] 
    end
    
    base ||= dir
    
    result = Dir[dir.to_s + "/*"].entries.collect { |child|
      if File.directory?(child)
        block_given? ? Dir.walk_r(child, base, depth, &block) : Dir.walk_r(child, base, depth)
      else
        if block_given?
          yield(child) ? child.gsub(base,"") : nil
        else
          child.gsub(base,"")
        end
      end
    }.compact
  end
end