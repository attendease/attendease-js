// Appends new items and updates existing items on the current localStorage
// collection for the given resource and dataset.
var mergeData = function(resource, data) {
  var current = localStorage[resource]
  var merged = current ? JSON.parse(current) : null
  var index = {}, existing

  if (Array.isArray(merged)) {
    merged.forEach(function(item) {
      index[item.id] = item
    })

    data.forEach(function(item) {
      if (existing = index[item.id]) {
        merged.splice(merged.indexOf(existing), 1, item)
      } else {
        merged.push(item)
      }
    })
  } else {
    merged = data
  }

  localStorage[resource] = JSON.stringify(merged)
  return merged
}

// Returns the last sync timestamp for the given resource.
var lastSync = function(resource) {
  return localStorage['last_sync_' + resource]
}

// Updates the last sync timestamp for the given resource and timestamp.
var updateLastSync = function(resource, timestamp) {
  localStorage['last_sync_' + resource] = timestamp
}

// Syncs the resource with Attendease event API and stores in localStorage.
exports.sync = function(resource) {
  var def = $.Deferred()
  var data = this.credentials()
  var timestamp = Math.floor(Date.now() / 1000)
  var merged

  data.since = lastSync(resource)

  $.ajax({
    type: "GET",
    url: this.apiRoot() + 'api/' + resource + '.json',
    data: data,
    success: function(response) {
      merged = mergeData(resource, response)
      updateLastSync(resource, timestamp)
      def.resolve(merged)
    },
    error: function() {
      def.reject()
    }
  })

  return def.promise()
}
