/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var Client = __webpack_require__(1)

	// Public Attendease interface.
	function Attendease(subdomain, options) {
	  return new Client(subdomain, options)
	}

	// Export module for Node and the browser.
	module.exports = Attendease

	if(typeof window !== 'undefined') {
	  window.Attendease = Attendease
	}


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var util = __webpack_require__(2)

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
	util.extend(Client.prototype, __webpack_require__(3))
	util.extend(Client.prototype, __webpack_require__(4))
	util.extend(Client.prototype, __webpack_require__(5))

	// Export
	module.exports = Client


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	// Mix properties into target object.
	exports.extend = function (to, from) {
	  for (var key in from) {
	    to[key] = from[key]
	  }

	  return to
	}


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	// Authenticate as a registered attendee. Returns a promise.
	exports.login = function(credentials) {
	  this.logout()

	  return $.ajax({
	    type: "POST",
	    url: this.apiRoot() + 'api/authenticate.json',
	    data: credentials,
	    success: function(response) {
	      localStorage.user_details = JSON.stringify(response)

	      localStorage.credentials = JSON.stringify({
	        attendee_token: response.access_token
	      })
	    }
	  })
	}

	// Logout. Returns a promise.
	exports.logout = function() {
	  var def = $.Deferred()
	  localStorage.clear()
	  def.resolve()
	  return def.promise()
	}

	// Returns the current user object.
	exports.user = function(sync) {
	  var data

	  if (sync) {
	    return this.sync('user_details')
	  } else {
	    data = localStorage.user_details
	    return data ? JSON.parse(data) : false
	  }
	}

	// Returns the credentials for the current user.
	exports.credentials = function() {
	  return JSON.parse(localStorage.credentials)
	}



/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	// Fetches and returns the event details.
	exports.event = function(sync) {
	  return this.sync('event')
	}

	// Fetches and returns all sessions for the event.
	exports.sessions = function(sync) {
	  return this.sync('sessions')
	}

	// Fetches and returns all sessions (mapped as instances) for the event.
	exports.instances = function(sync) {
	  var def = $.Deferred()
	  var instances = []
	  var i, ii, session, instance

	  this.sessions().then(function(sessions) {
	    for (i = 0; i < sessions.length; i++) {
	      session = sessions[i]

	      for (ii = 0; ii < (session.instances || []).length; ii++) {
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
	exports.presenters = function(sync) {
	  return this.sync('presenters')
	}

	// Fetches and returns all rooms for the event.
	exports.rooms = function(sync) {
	  return this.sync('rooms')
	}

	// Fetches and returns all venues for the event.
	exports.venues = function(sync) {
	  return this.sync('venues')
	}



/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	// Schedules the current user for the session instance.
	exports.schedule = function(instanceId) {
	  return $.ajax({
	    type: "POST",
	    url: this.apiRoot() + 'api/schedule/' + instanceId + '.json',
	    data: this.credentials()
	  })
	}

	// Unschedules the current user from the session instance.
	exports.unschedule = function(instanceId) {
	  return $.ajax({
	    type: "POST",
	    url: this.apiRoot() + 'api/unschedule/' + instanceId + '.json',
	    data: this.credentials()
	  })
	}

	// Likes the item for the current user.
	exports.like = function(id, type) {
	  var data = this.credentials()
	  data.like_type = type

	  return $.ajax({
	    type: "POST",
	    url: this.apiRoot() + 'api/likes/' + id,
	    data: data
	  })
	}

	// Unlikes the item for the current user.
	exports.unlike = function(id) {
	  return $.ajax({
	    type: "POST",
	    url: this.apiRoot() + 'api/likes_remove/' + id,
	    data: this.credentials()
	  })
	}

	// Likes the item for the current user.
	exports.rate = function(id, type, rating) {
	  var data = this.credentials()

	  data.like_id = id
	  data.like_type = type
	  data.rating = rating

	  return $.ajax({
	    type: "POST",
	    url: this.apiRoot() + 'api/rate.json',
	    data: data
	  })
	}


/***/ }
/******/ ])