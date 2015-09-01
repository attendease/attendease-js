var request = require('axios')

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

  return request.post(this.apiRoot() + 'api/checkin', data)
}

// Undo a check-in for the current user.
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

  return request.post(this.apiRoot() + 'api/checkin_undo', data)
}
