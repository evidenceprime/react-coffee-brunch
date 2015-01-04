describe('Plugin', function() {
  var plugin, plugin2;

  beforeEach(function() {
    plugin = new Plugin({});
    plugin2 = new Plugin({sourceMaps: true})
  });

  it('should be an object', function() {
    expect(plugin).to.be.ok;
  });

  it('should has #compile method', function() {
    expect(plugin.compile).to.be.an.instanceof(Function);
  });

  it('should compile and produce valid result', function(done) {
    var content = 'a = 6';
    var expected = 'var a;\n\na = 6;\n';

    plugin.compile({data: content, path: 'file.cjsx'}, function(error, result) {
      var data = (result || {}).data;
      expect(error).not.to.be.ok;
      expect(data).to.equal(expected);
      done();
    });
  });

  it('should compile and produce valid result from CJSX content', function(done) {
    var content = 'div = <div></div>';
    var expected = 'var div;\n\ndiv = React.createElement(\"div\", null);\n';

    plugin.compile({data: content, path: 'file.cjsx'}, function(error, result) {
      var data = (result || {}).data;
      expect(error).not.to.be.ok;
      expect(data).to.equal(expected);
      done();
    });
  });


  it('should not respect arguments to not generate source maps', function(done) {
    var content = 'div = <div></div>';
    var expected = 'var div;\n\ndiv = React.createElement(\"div\", null);\n';

    plugin.compile({data: content, path: 'file.cjsx'}, function(error, result) {
      var data = (result || {});
      expect(error).not.to.be.ok;
      expect(data.map).to.not.exist;
      expect(data.data).to.equal(expected);
      done();
    });
  });

  it('should not respect arguments to generate source maps', function(done) {
    var content = 'div = <div></div>';
    var expected = 'var div;\n\ndiv = React.createElement(\"div\", null);\n';

    plugin2.compile({data: content, path: 'file.cjsx'}, function(error, result) {
      var data = (result || {});
      expect(error).not.to.be.ok;
      expect(data.map).to.exist;
      expect(data.data).to.equal(expected);
      done();
    });
  });


});
