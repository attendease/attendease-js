(function() {
  // Public Attendease interface.
  function Attendease(subdomain, options) {
    return new Client(subdomain, options)
  }

  // Constructs a new attendease client and kicks things off.
  function Client(subdomain, options) {
    this.subdomain = subdomain
    this.endpoint = options && options.apiRoot
  }

  // Returns the Attendease event API endpoint.
  Client.prototype.apiRoot = function() {
    return this.endpoint || ('https://' + this.subdomain + '.attendease.com/')
  }

  // Authenticate as a registered attendee. Returns a promise.
  Client.prototype.login = function(credentials) {
    this.logout()

    return $.ajax({
      type: "POST",
      url: this.apiRoot() + 'api/verify_credentials.json',
      async: true,
      data: {
        email: credentials.email,
        password: credentials.password
      },
      dataType: 'jsonp',
      timeout: 45000,
      success: function(response) {
        localStorage.user = JSON.stringify(response)

        localStorage.credentials = JSON.stringify({
          email: credentials.email,
          password: credentials.password
        })
      }
    })
  }

  // Logout. Returns a promise.
  Client.prototype.logout = function() {
    (def = $.Defered()).resolve()
    localStorage.clear()
    return def.promise()
  }

  // Returns the current user object.
  Client.prototype.user = function() {
    return (data = localStorage.user) ? JSON.parse(data) : false
  }

  // Returns the credentials for the current user.
  Client.prototype.credentials = function() {
    return JSON.parse(localStorage.credentials)
  }

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
