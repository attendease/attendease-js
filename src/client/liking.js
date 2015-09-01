var request = require('axios')

// Likes the item for the current user.
exports.like = function(id, type) {
  var url = this.apiRoot() + 'api/likes/' + id
  var data = this.credentials()
  data.like_type = type

  return request.post(url, data)
}

// Unlikes the item for the current user.
exports.unlike = function(id) {
  var url = this.apiRoot() + 'api/likes_remove/' + id
  return request.post(url, this.credentials())
}
