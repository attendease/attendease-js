(function() {
  // Public Attendease interface.
  function Attendease(subdomain) {
    return new Client(subdomain)
  }

  // Constructs a new attendease client and kicks things off.
  function Client(subdomain) {
    this.subdomain = subdomain
  }

  // Authenticate as a registered attendee.
  Client.prototype.authenticate = function(credentials) { }

  // Export module for Node and the browser.
  if(typeof module !== 'undefined' && module.exports) {
    module.exports = Attendease
  } else if (typeof define === 'function' && define.amd) {
    define([], function() {
      return this.Attendease = Attendease
    })
  } else {
    this.Attendease = Attendease
  }
}).call(this)
