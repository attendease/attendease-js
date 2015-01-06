(function() {
  'use strict';

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

  // Syncs the resource with Attendease event API. Returns a promise.
  Client.prototype.sync = function(resource) {
    var def = $.Deferred()

    $.ajax({
      type: "GET",
      url: this.apiRoot() + 'api/' + resource + '.json',
      data: this.credentials(),
      dataType: 'jsonp',
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


  // Authenticate as a registered attendee. Returns a promise.
  Client.prototype.login = function(credentials) {
    this.logout()

    return $.ajax({
      type: "POST",
      url: this.apiRoot() + 'api/authenticate.json',
      async: true,
      data: credentials,
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
    var def = $.Deferred()
    localStorage.clear()
    def.resolve()
    return def.promise()
  }

  // Returns the current user object.
  Client.prototype.user = function() {
    var data = localStorage.user
    return data ? JSON.parse(data) : false
  }

  // Returns the credentials for the current user.
  Client.prototype.credentials = function() {
    return JSON.parse(localStorage.credentials)
  }

  // Fetches and returns the event details.
  Client.prototype.event = function(sync) {
    return this.sync('event')
  }

  // Fetches and returns all sessions for the event.
  Client.prototype.sessions = function(sync) {
    return this.sync('sessions')
  }

  // Fetches and returns all sessions (mapped as instances) for the event.
  Client.prototype.instances = function(sync) {
    var def = $.Deferred()
    var instances = []
    var i, ii, session, instance

    this.sessions().then(function(sessions) {
      for(i = 0; i < sessions.length; i++) {
        session = sessions[i]

        for(ii = 0; ii < (session.instances || []).length; ii++) {
          instance = session.instances[ii]
          instance.session = session
          instances.push(instance)
        }
      }

      def.resolve(instances)
    }, function() {
      def.reject()
    })

    return def.promise()
  }

  // Fetches and returns all presenters for the event.
  Client.prototype.presenters = function(sync) {
    return this.sync('presenters')
  }

  // Fetches and returns all rooms for the event.
  Client.prototype.rooms = function(sync) {
    return this.sync('rooms')
  }

  // Fetches and returns all venues for the event.
  Client.prototype.venues = function(sync) {
    return this.sync('venues')
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
