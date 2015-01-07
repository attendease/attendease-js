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

