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
var attendease = require('attendease')
var client = attendease('your-event-subdomain')
```

If in the browser, attendease-js occupies an `Attendease` global that you can use to initialize a client.

```javascript
var client = Attendease('your-event-subdomain')
```

### Overview

All methods on the client object return a promise. A `then` callback must be chained
onto the call in order to then do something with the result.

### Authentication

```javascript
// authenticate as an attendee
client.login({
  email: 'user@example.com',
  password: 'password'
}).then(function(response) {
  ...
})

// get user details
client.user().then(function(userDetails) {
  ...
})

// logout
client.logout().then(function() {
  ...
})
```

### Read API

```javascript
// fetch event details
client.event().then(function(eventDetails) {
  ...
})

// fetch presenters
client.presenters().then(function(presenters) {
  ...
})

// fetch sessions
client.sessions().then(function(sessions) {
  ...
})

// fetch sessions mapped out as instances
client.instances().then(function(instances) {
  ...
})

// fetch rooms
client.rooms().then(function(rooms) {
  ...
})

// fetch venues
client.venues().then(function(venues) {
  ...
})

// fetch filters
client.filters().then(function(filters) {
  ...
})

// fetch schedule statuses
client.scheduleStatuses().then(function(statuses) {
  ...
})

// get status for a particular instance
client.scheduleStatus(instanceId).then(function(status) {
  ...
})
```

### Write API

```javascript
// like an item
client.like(presenterId, 'presenter').then(function() {
  ...
})

// unlike an item
client.unlike(likeId).then(function() {
  ...
})

// rate an item
client.rate(sessionId, 'session', 4).then(function() {
  ...
})

// schedule an instance
client.schedule(instanceId).then(function() {
  ...
})

// unschedule an instance
client.unschedule(instanceId).then(function() {
  ...
})

// check-in to the event
client.checkin('event').then(function() {
  ...
})

// check-in to a session instance
client.checkin('instance', instanceId).then(function() {
  ...
})

// undo a check-in to the event
client.undoCheckin('event').then(function() {
  ...
})

// undo a check-in to a session instance
client.undoCheckin('instance', instanceId).then(function() {
  ...
})
```

### Caching

If you wish to perform caching on all resources, specify the `performCaching` option
when initializing a client.

```javascript
var client = attendease('your-event-subdomain', {
  performCaching: true
})
```

With caching enabled, all subsequent calls to any read API methods will resolve right
away with a cached version of the previous request for that resource. Example:

```javascript
// first call will perform a request and cache the data
client.presenters().then(function(presenters) {
  ...
})

// subsequent calls after will not make a request, will return cached result
client.presenters().then(function(presenters) {
  ...
})

// pass true to the call to make a request and update the cache (sync)
client.presenters(true).then(function(presenters) {
  ...
})
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
