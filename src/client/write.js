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

// Likes the item for the current user.
exports.like = function(id, type) {
  var data = this.credentials()
  data.like_type = type

  return $.ajax({
    type: "POST",
    url: this.apiRoot() + 'api/likes/' + id,
    data: data
  })
}

// Unlikes the item for the current user.
exports.unlike = function(id) {
  return $.ajax({
    type: "POST",
    url: this.apiRoot() + 'api/likes_remove/' + id,
    data: this.credentials()
  })
}

// Likes the item for the current user.
exports.rate = function(id, type, rating) {
  var data = this.credentials()

  data.like_id = id
  data.like_type = type
  data.rating = rating

  return $.ajax({
    type: "POST",
    url: this.apiRoot() + 'api/rate.json',
    data: data
  })
}
