var request = require('axios')
var when = require('when')
var cache = require('../cache')

// Appends new items and updates existing items on the current cached
// collection for the given resource and dataset.
var mergeData = function(resource, data) {
  var current = cache[resource]
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

  cache[resource] = JSON.stringify(merged)
  return merged
}

var resourceMap = {
  session_ids:   'sessions',
  room_ids:      'rooms',
  presenter_ids: 'presenters',
  filter_ids:    'filters'
}

// Removes items from the current cached collections.
var removeData = function(data) {
  var index, resource, resourceName, ids, items, existing

  for (resource in data) {
    if (data.hasOwnProperty(resource)) {
      ids = data[resource]
      resourceName = resourceMap[resource]

      if (ids.length && (items = cache[resourceName])) {
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

        cache[resourceName] = JSON.stringify(items)
      }
    }
  }
}

// Returns the last sync timestamp for the given resource.
var lastSync = function(resource) {
  return cache['last_sync_' + resource]
}

// Updates the last sync timestamp for the given resource and timestamp.
var updateLastSync = function(resource, timestamp) {
  cache['last_sync_' + resource] = timestamp
}

// Syncs the resource with Attendease event API and stores in the cache.
exports.sync = function(resource) {
  var self = this

  return when.promise(function(resolve, reject) {
    var url = self.apiRoot() + 'api/' + resource + '.json'
    var data = self.credentials()
    var timestamp = Math.floor(Date.now() / 1000)
    var merged

    data.meta = true

    if (this.performCaching) {
      data.since = lastSync(resource)

      request.get(url, {params: data}).then(function(response) {
        merged = mergeData(resource, response.data)
        updateLastSync(resource, timestamp)
        resolve(merged)
      }, reject)
    } else {
      request.get(url, {params: data}).then(function(response) {
        resolve(response.data)
      }, reject)
    }
  })
}

// Syncs the deleted resources with Attendease event API and updates the
// collection in the cache.
exports.syncDeletions = function() {
  if (this.performCaching) {
    var url = this.apiRoot() + 'api/deletions.json'
    var data = this.credentials()
    var timestamp = Math.floor(Date.now() / 1000)

    data.since = lastSync('deletions')

    return request.get(url, {params: data}).then(function(response) {
      removeData(response.data)
      updateLastSync('deletions', timestamp)
    })
  }
}
