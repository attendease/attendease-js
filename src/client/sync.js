// Syncs the resource with Attendease event API. Returns a promise.
exports.sync = function(resource) {
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

// Fetches and returns the event details.
exports.event = function(sync) {
  return this.sync('event')
}

// Fetches and returns all sessions for the event.
exports.sessions = function(sync) {
  return this.sync('sessions')
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

// Fetches and returns all venues for the event.
exports.scheduleStatuses = function(sync) {
  return this.sync('schedule_status')
}

