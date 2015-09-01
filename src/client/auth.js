var request = require('axios')
var when = require('when')

// Authenticate as a registered attendee. Returns a promise.
exports.login = function(credentials) {
  this.logout()

  var url = this.apiRoot() + 'api/authenticate.json'

  return request.post(url, credentials).then(function(response) {
    localStorage.user_details = JSON.stringify(response.data)

    localStorage.credentials = JSON.stringify({
      attendee_token: response.data.access_token
    })
  })
}

// Logout. Returns a promise.
exports.logout = function() {
  return when.promise(function(resolve, reject) {
    localStorage.clear()
    resolve()
  })
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
