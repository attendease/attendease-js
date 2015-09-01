var localCache = {}

function clearLocalCache() {
  localCache = {clear: clearLocalCache}
}

clearLocalCache()

if (typeof window === 'undefined') {
  // Node
  module.exports = localCache
} else {
  // Browser
  module.exports = window.localStorage
}
