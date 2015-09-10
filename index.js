var transform = require('coffee-react-transform');
var coffeescript = require('coffee-script');

function ReactCoffeeCompiler(config) {
  this.config = config != null ? config : {};
  this.sourceMap = !!this.config.sourceMaps || false;
}

ReactCoffeeCompiler.prototype.brunchPlugin = true;
ReactCoffeeCompiler.prototype.type = 'javascript';
ReactCoffeeCompiler.prototype.extension = 'cjsx';
ReactCoffeeCompiler.prototype.pattern = /\.cjsx/;

ReactCoffeeCompiler.prototype.compile = function(params, callback) {
  var data, err, error, loc, transformed;
  var options = {
    bare: true,
    sourceMap: this.sourceMap,
    sourceFiles: [params.path]
  };
  try {
    transformed = coffeescript.compile(transform(params.data), options);
  } catch (_error) {
    err = _error;
    loc = err.location;
    if (loc) {
      error = loc.first_line + ":" + loc.first_column + " " + (err.toString());
    } else {
      error = err.toString();
    }
    return callback(error);
  }
  if (this.sourceMap) {
    data = {
      data: transformed.js,
      map: transformed.v3SourceMap
    };
  } else {
    data = {
      data: transformed
    };
  }
  return callback(null, data);
};

module.exports = ReactCoffeeCompiler
