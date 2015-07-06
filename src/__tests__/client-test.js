import Client from '../client'

jasmine.Ajax.install()

describe('Client', () => {
  const client = new Client('hello')

  describe('#apiRoot()', () => {
    it('returns the API root using the event subdomain', () => {
      expect(client.apiRoot()).toBe('https://hello.attendease.com/')
    })
  })

  describe('#login()', () => {
    let request

    beforeEach(() => {
      client.login({
        email: 'hello@attendease.com',
        password: 'YbAd8TzopfRg'
      })

      request = jasmine.Ajax.requests.mostRecent()

      request.respondWith({
        status: '200',
        responseText: '{"email":"hello@attendease.com","access_token":"a"}'
      })
    })

    it('POSTs to api/authenticate with credentials', () => {
      expect(request.url).toBe('https://hello.attendease.com/api/authenticate.json')
      expect(request.method).toBe('POST')
      expect(request.data()).toEqual({
        email: ['hello@attendease.com'],
        password: ['YbAd8TzopfRg']
      })
    })

    it('Stores the user and credentials in localStorage', () => {
      expect(localStorage.user_details).toBe('{"email":"hello@attendease.com","access_token":"a"}')
      expect(localStorage.credentials).toBe('{"attendee_token":"a"}')
    })
  })

  describe('#logout()', () => {
    beforeEach(() => {
      client.login({
        email: 'hello@attendease.com',
        password: 'YbAd8TzopfRg'
      })

      const request = jasmine.Ajax.requests.mostRecent()

      request.respondWith({
        status: '200',
        responseText: '{"email":"hello@attendease.com","access_token":"a"}'
      })

      client.logout()
    })

    it('Clears localstorage so user / credentials are no longer stored', () => {
      expect(localStorage.user_details).toBe(undefined)
      expect(localStorage.credentials).toBe(undefined)
    })
  })
})
