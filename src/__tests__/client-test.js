import Client from '../client'

jasmine.Ajax.install()

describe('Client', () => {
  const client = new Client('hello', {performCaching: true})

  describe('#apiRoot()', () => {
    it('returns the API root using the event subdomain', () => {
      expect(client.apiRoot()).toBe('https://hello.attendease.com/')
    })
  })

  describe('#login()', () => {
    beforeEach(done => {
      jasmine.Ajax.stubRequest('https://hello.attendease.com/api/authenticate.json').andReturn({
        status: 200,
        responseText: '{"email":"hello@attendease.com","access_token":"a"}'
      })

      client.login({
        email: 'hello@attendease.com',
        password: 'YbAd8TzopfRg'
      }).then(done, done)
    })

    it('POSTs to api/authenticate with credentials', () => {
      const request = jasmine.Ajax.requests.mostRecent()

      expect(request.url).toBe('https://hello.attendease.com/api/authenticate.json')
      expect(request.method).toBe('POST')
      expect(request.data()).toEqual({
        email: 'hello@attendease.com',
        password: 'YbAd8TzopfRg'
      })
    })

    it('Stores the user and credentials in localStorage', () => {
      expect(localStorage.user_details).toBe('{"email":"hello@attendease.com","access_token":"a"}')
      expect(localStorage.credentials).toBe('{"attendee_token":"a"}')
    })
  })

  describe('#logout()', () => {
    beforeEach(done => {
      jasmine.Ajax.stubRequest('https://hello.attendease.com/api/authenticate.json').andReturn({
        status: 200,
        responseText: '{"email":"hello@attendease.com","access_token":"a"}'
      })

      const logout = function() {
        client.logout()
        done()
      }

      client.login({
        email: 'hello@attendease.com',
        password: 'YbAd8TzopfRg'
      }).then(logout, logout)
    })

    it('Clears localstorage so user / credentials are no longer stored', () => {
      expect(localStorage.user_details).toBe(undefined)
      expect(localStorage.credentials).toBe(undefined)
    })
  })
})
