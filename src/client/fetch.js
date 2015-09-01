var when = require('when')

// Fetches the resource from localStorage if there is existing data available in
// localStorage, otherwise a server sync will happen. If sync is true, the
// server sync will happen unconditionally.
exports.fetch = function(resource, sync) {
  var data

  if (!sync && (data = localStorage[resource])) {
    return when.promise(function(resolve) {
      resolve(JSON.parse(data))
    })
  } else {
    return this.sync(resource)
  }
}

// Fetches and returns the event details.
exports.event = function(sync) {
  return this.fetch('event', sync)
}

// Fetches and returns all sessions for the event.
exports.sessions = function(sync) {
  return this.fetch('sessions', sync)
}

// Fetches and returns all presenters for the event.
exports.presenters = function(sync) {
  return this.fetch('presenters', sync)
}

// Fetches and returns all rooms for the event.
exports.rooms = function(sync) {
  return this.fetch('rooms', sync)
}

// Fetches and returns all venues for the event.
exports.venues = function(sync) {
  return this.fetch('venues', sync)
}

// Fetches and returns all filters for the event.
exports.filters = function(sync) {
  return this.fetch('filters', sync)
}

// Fetches and returns the user's schedule statuses.
exports.scheduleStatuses = function(sync) {
  return this.fetch('schedule_status', sync)
}
