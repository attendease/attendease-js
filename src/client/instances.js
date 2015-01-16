// Fetches and returns all sessions (mapped as instances) for the event.
exports.instances = function(sync) {
  var def = $.Deferred()
  var instances = []

  this.sessions(sync).then(function(sessions) {
    sessions.forEach(function(session) {
      (session.instances || []).forEach(function(instance) {
        instance.session = session
        instances.push(instance)
      })
    })

    def.resolve(instances)
  }, function() {
    def.reject()
  })

  return def.promise()
}
