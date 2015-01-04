transform = require('coffee-react-transform')
coffeescript = require('coffee-script')

module.exports = class ReactCoffeeCompiler
  brunchPlugin: yes
  type: 'javascript'
  extension: 'cjsx'
  pattern: /\.cjsx/

  constructor: (@config = {}) ->
    @sourceMap = !!@config.sourceMaps || false

  compile: (params, callback) ->
    options = {bare: true, @sourceMap, sourceFiles: [params.path]}
    try
      transformed = coffeescript.compile(transform(params.data), options)
    catch err
      if err.location
        error = loc.first_line + ":" + loc.first_column + " " + (err.toString())
      else
        error = err.toString()
      return callback error

    if @sourceMap
      data =
        data: transformed.js
        map: transformed.v3SourceMap
    else
      data = {data: transformed}

    callback null, data
