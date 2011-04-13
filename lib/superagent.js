
/*!
 * just
 * Copyright(c) 2011 TJ Holowaychuk <tj@vision-media.ca>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var parse = require('url').parse
  , format = require('url').format
  , http = require('http')
  , Agent = http.Agent;

/**
 * Expose the constructor.
 */

exports = module.exports = SuperAgent; 

/**
 * Library version.
 */

exports.version = '0.0.1';

/**
 * HTTP methods supported.
 */

exports.methods = [
    'get'
  , 'post'
  , 'put'
  , 'delete'
  , 'connect'
  , 'options'
  , 'trace'
  , 'copy'
  , 'lock'
  , 'mkcol'
  , 'move'
  , 'propfind'
  , 'proppatch'
  , 'unlock'
  , 'report'
  , 'mkactivity'
  , 'checkout'
  , 'merge'
];

/**
 * Initialize a `SuperAgent` with the given `options`.
 *
 * @param {Object} options
 * @api public
 */

function SuperAgent(options) {
  Agent.call(this, options);
  this.path = options.path;
}

/**
 * Inherit from `Agent.prototype`.
 */

SuperAgent.prototype.__proto__ = Agent.prototype;

/**
 * Request `method` with `options` and optional callback `fn`.
 *
 * @param {String} method
 * @param {String|Object} url or options
 * @param {Function} fn
 * @return {ClientRequest}
 * @api public
 */

exports.request = function(method, options, fn){
  options = options || {};

  // from url.parse()
  if (options.hostname) options = format(options);

  // url
  if ('string' == typeof options) {
    var url = parse(options);
    options = {
        host: url.hostname
      , port: url.port
      , path: url.pathname + (url.search || '')
    };
  }

  // http method
  options.method = method;

  // agent
  var agent = new SuperAgent(options);
  return agent.appendMessage(options);
};

// HTTP methods

exports.methods.forEach(function(method){
  exports[method] = function(options, fn){
    return exports.request(method, options, fn);
  };
});