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
