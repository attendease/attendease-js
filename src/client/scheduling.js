var request = require('axios')
var when = require('when')

// Schedules the current user for the session instance.
exports.schedule = function(instanceId) {
  var url = this.apiRoot() + 'api/schedule/' + instanceId + '.json'
  return request.post(url, this.credentials())
}

// Unschedules the current user from the session instance.
exports.unschedule = function(instanceId) {
  var url = this.apiRoot() + 'api/unschedule/' + instanceId + '.json'
  return request.post(url, this.credentials())
}

// Returns the user's schedule status for the session instance.
exports.scheduleStatus = function(instanceId) {
  var self = this

  return when.promise(function(resolve, reject) {
    self.scheduleStatuses(true).then(function(statuses) {
      resolve(statuses[instanceId])
    })
  })
}
