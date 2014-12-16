transform = require('coffee-react-transform')
coffeescript = require('coffee-script')

module.exports = class ReactCoffeeCompiler
  brunchPlugin: yes
  type: 'javascript'
  extension: 'cjsx'
  pattern: /\.cjsx/

  constructor: (@config) ->

  compile: (params, callback) ->
    source = params.data
    options = {bare: true}
    try
      transformed = coffeescript.compile(transform(source), options)
    catch err
      console.log "ERROR: ", err
      return callback err.toString()

    callback null, data: transformed
