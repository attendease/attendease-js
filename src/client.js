var util = require('./util')

// Constructs a new attendease client and kicks things off.
function Client(subdomain, options) {
  this.subdomain = subdomain
  this.endpoint = options && options.apiRoot
}

// Returns the Attendease event API endpoint.
Client.prototype.apiRoot = function() {
  return this.endpoint || ('https://' + this.subdomain + '.attendease.com/')
}

// Syncs the resource with Attendease event API. Returns a promise.
Client.prototype.sync = function(resource) {
  var def = $.Deferred()

  $.ajax({
    type: "GET",
    url: this.apiRoot() + 'api/' + resource + '.json',
    data: this.credentials(),
    success: function(response) {
      localStorage[resource] = JSON.stringify(response)
      def.resolve(response)
    },
    error: function() {
      def.reject()
    }
  })

  return def.promise()
}

// Mixin instance methods.
util.extend(Client.prototype, require('./client/auth'))
util.extend(Client.prototype, require('./client/read'))
util.extend(Client.prototype, require('./client/write'))

// Export
module.exports = Client
