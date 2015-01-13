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
