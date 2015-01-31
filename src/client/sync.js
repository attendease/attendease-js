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

var resourceMap = {
  session_ids:   'sessions',
  room_ids:      'rooms',
  presenter_ids: 'presenters',
  filter_ids:    'filters'
}

// Removes items from the current localStorage collections.
var removeData = function(data) {
  var index, resource, resourceName, ids, items, existing

  for (resource in data) {
    if (data.hasOwnProperty(resource)) {
      ids = data[resource]
      resourceName = resourceMap[resource]

      if (ids.length && (items = localStorage[resourceName])) {
        items = JSON.parse(items)
        index = {}

        items.forEach(function(item) {
          index[item.id] = item
        })

        ids.forEach(function(id) {
          if (existing = index[id]) {
            items.splice(items.indexOf(existing), 1)
          }
        })

        localStorage[resourceName] = JSON.stringify(items)
      }
    }
  }
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
  data.meta = true

  $.ajax({
    type: "GET",
    url: this.apiRoot() + 'api/' + resource + '.json',
    data: data,
    success: function(response) {
      merged = mergeData(resource, response)
      updateLastSync(resource, timestamp)
      def.resolve(merged)
    },
    error: def.reject
  })

  return def.promise()
}

// Syncs the deleted resources with Attendease event API and updates the
// collection in localStorage.
exports.syncDeletions = function() {
  var data = this.credentials()
  var timestamp = Math.floor(Date.now() / 1000)

  data.since = lastSync('deletions')

  return $.ajax({
    type: "GET",
    url: this.apiRoot() + 'api/deletions.json',
    data: data,
    success: function(response) {
      removeData(response)
      updateLastSync('deletions', timestamp)
    }
  })
}
