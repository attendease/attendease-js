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

// Mixin instance methods.
util.extend(Client.prototype, require('./client/auth'))
util.extend(Client.prototype, require('./client/sync'))
util.extend(Client.prototype, require('./client/fetch'))
util.extend(Client.prototype, require('./client/instances'))
util.extend(Client.prototype, require('./client/liking'))
util.extend(Client.prototype, require('./client/rating'))
util.extend(Client.prototype, require('./client/scheduling'))
util.extend(Client.prototype, require('./client/checkins'))

// Export
module.exports = Client
