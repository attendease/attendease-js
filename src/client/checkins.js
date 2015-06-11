// Checks in the current user.
exports.checkin = function(type, extra) {
  var data = this.credentials()

  switch (type) {
    case 'event':
      data.type = 'Event'
      break
    case 'instance':
      data.type = 'Instance'
      data.instance_id = extra
      break
    case 'beacon':
      data.type = 'Beacon'
      data.beacon = extra
  }

  return $.ajax({
    type: "POST",
    url: this.apiRoot() + 'api/checkin',
    data: data
  })
}

// Undos a check-in for the current user.
exports.undoCheckin = function(type, extra) {
  var data = this.credentials()

  switch (type) {
    case 'event':
      data.type = 'Event'
      break
    case 'instance':
      data.type = 'Instance'
      data.instance_id = extra
      break
  }

  return $.ajax({
    type: "POST",
    url: this.apiRoot() + 'api/checkin_undo',
    data: data
  })
}
