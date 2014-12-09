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
attendease.authenticate({
  email: '[email]',
  password: '[password]'
})
```

### Read API

```javascript
// fetch event details
attendease.eventDetails()

// fetch user details
attendease.userDetails()

// fetch presenters
attendease.presenters()

// fetch sessions
attendease.sessions()

// fetch sponsors
attendease.sponsors()

// fetch website content items
attendease.webContent()

// fetch mobile content items
attendease.mobileContent()
```

### Write API

```javascript
// like an item
attendease.like({
  type: 'presenter',
  id: '[presenterId]'
})

// unlike an item
attendease.unlike('[itemId]')

// rate an item
attendease.rate({
  type: 'session',
  id: '[sessionId]',
  rating: 4
})

// schedule an instance
attendease.schedule('[instanceId]')

// unschedule an instance
attendease.unschedule('[instanceId]')
```
