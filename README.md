# attendease-js

Official JavaScript/Node SDK for [Attendease](https://attendease.com/).

### Installation

Install with [npm](https://www.npmjs.org/), [component(1)](http://component.io) or [bower](http://bower.io/) (recommended).

```
$ bower install attendease
```

### Getting Started

If in Node or using a CommonJS style loader, simply require the module and initialize a client.

```javascript
attendease = require('attendease')('event-subdomain')
```

If in the browser, attendease-js occupies an `Attendease` global that you can use to initialize a client.

```javascript
attendease = Attendease('event-subdomain')
```

### Authentication

```javascript
// authenticate as an attendee
attendease.login({
  email: '[email]',
  password: '[password]'
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
attendease.scheduleStatus('[instanceId]')
```

### Write API

```javascript
// like an item
attendease.like('[presenterId]', 'presenter')

// unlike an item
attendease.unlike('[likeId]')

// rate an item
attendease.rate('[sessionId]', 'session', 4)

// schedule an instance
attendease.schedule('[instanceId]')

// unschedule an instance
attendease.unschedule('[instanceId]')
```

### Building

Make sure you install any development dependencies.

```
npm install
```

Build the library into dist (using webpack).

```
npm run build
```

Or to have webpack watch files for changes and do builds automatically.

```
npm run watch
```
