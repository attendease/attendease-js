// Mix properties into target object.
exports.extend = function (to, from) {
  for (var key in from) {
    to[key] = from[key]
  }

  return to
}
