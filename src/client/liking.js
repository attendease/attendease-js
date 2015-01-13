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
