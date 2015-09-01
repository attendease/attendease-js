var request = require('axios')
var when = require('when')
var cache = require('../cache')

// Authenticate as a registered attendee. Returns a promise.
exports.login = function(credentials) {
  this.logout()

  var url = this.apiRoot() + 'api/authenticate.json'

  return request.post(url, credentials).then(function(response) {
    cache.user_details = JSON.stringify(response.data)

    cache.credentials = JSON.stringify({
      attendee_token: response.data.access_token
    })
  })
}

// Logout. Returns a promise.
exports.logout = function() {
  return when.promise(function(resolve, reject) {
    cache.clear()
    resolve()
  })
}

// Returns the current user object.
exports.user = function(sync) {
  var data

  if (sync) {
    return this.sync('user_details')
  } else {
    data = cache.user_details
    return data ? JSON.parse(data) : false
  }
}

// Returns the credentials for the current user.
exports.credentials = function() {
  return JSON.parse(cache.credentials)
}
