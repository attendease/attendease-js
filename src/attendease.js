var Client = require('./client')

// Public Attendease interface.
function Attendease(subdomain, options) {
  return new Client(subdomain, options)
}

// Export module for Node and the browser.
module.exports = Attendease

if(typeof window !== 'undefined') {
  window.Attendease = Attendease
}
