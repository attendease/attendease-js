# attendease-js

Official JavaScript/Node SDK for [Attendease](https://attendease.com/).

### Installation

Install with [bower](http://bower.io/) or [npm](https://www.npmjs.org/) (recommended).

```
$ npm install attendease
```

### Getting Started

If in Node or using a CommonJS style loader, simply require the module and initialize a client.

```javascript
attendease = require('attendease')('[your event subdomain]')
```

If in the browser, attendease-js occupies an `Attendease` global that you can use to initialize a client.

```javascript
attendease = Attendease('[your event subdomain]')
```

### Authentication

```javascript
// authenticate as an attendee
attendease.login({
  email: '[your email]',
  password: '[your password]'
})

// get user details
attendease.user()

// logout
attendease.logout()
```

### Read API

```javascript
// fetch event details
attendease.event()

// fetch presenters
attendease.presenters()

// fetch sessions
attendease.sessions()

// fetch sessions mapped out as instances
attendease.instances()

// fetch rooms
attendease.rooms()

// fetch venues
attendease.venues()

// fetch filters
attendease.filters()

// fetch schedule statuses
attendease.scheduleStatuses()

// get status for a particular instance
attendease.scheduleStatus(instanceId)
```

### Write API

```javascript
// like an item
attendease.like(presenterId, 'presenter')

// unlike an item
attendease.unlike(likeId)

// rate an item
attendease.rate(sessionId, 'session', 4)

// schedule an instance
attendease.schedule(instanceId)

// unschedule an instance
attendease.unschedule(instanceId)

// check-in to the event
attendease.checkin('event')

// check-in to a session instance
attendease.checkin('instance', instanceId)

// undo a check-in to the event
attendease.undoCheckin('event')

// undo a check-in to a session instance
attendease.undoCheckin('instance', instanceId)
```

### Building and testing

Make sure you install any development dependencies.

```
npm install
```

Build the library into `./dist`.

```
npm run build
```

Or to have webpack watch files for changes and do builds automatically.

```
npm run watch
```

And to run the test suite.

```
npm test
```
