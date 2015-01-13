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
