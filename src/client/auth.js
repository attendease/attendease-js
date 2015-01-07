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
        email: credentials.email,
        password: credentials.password
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

