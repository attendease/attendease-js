var when = require('when')

// Fetches and returns all sessions (mapped as instances) for the event.
exports.instances = function(sync) {
  var self = this

  return when.promise(function(resolve, reject) {
    var instances = []

    self.sessions(sync).then(function(sessions) {
      sessions.forEach(function(session) {
        (session.instances || []).forEach(function(instance) {
          instance.session = session
          instances.push(instance)
        })
      })

      resolve(instances)
    }, reject)
  })
}
