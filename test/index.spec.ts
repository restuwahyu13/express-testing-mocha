import 'mocha'
import { request, use, expect } from 'chai'
import chaiHttp from 'chai-http'
import app from '../src'

// setup plugin for chai
use(chaiHttp)

describe('Setup Test', function () {
	describe('Get Http Request Test', function () {
		it('get response from profile is json', async function () {
			const res = await request(app).get('/profile/result').set('Content-Type', 'application/json')

			expect(res.status).is.deep.equal(200)
			expect(res.type).is.deep.equal('application/json')
			expect(res.body.name).is.deep.equal('john doe')
			expect(res.body.age).is.deep.equal(28)
		})
	})

	describe('Get Http Request Test With Params', function () {
		let fullname: string = ''

		beforeEach(() => {
			fullname = 'jamal cavalera'
		})

		it('get response from profile is match', async function () {
			fullname = 'jane doe'

			const res = await request(app).get(`/profile/${fullname}`).set('Content-Type', 'application/json')

			expect(res.status).is.deep.equal(200)
			expect(res.type).is.deep.equal('application/json')
			expect(res.body.success).is.true
		})

		it('get response from profile not match', async function () {
			fullname = 'john doe'

			const res = await request(app).get(`/profile/${fullname}`).set('Content-Type', 'application/json')

			expect(res.status).is.deep.equal(400)
			expect(res.type).is.deep.equal('application/json')
			expect(res.body.success).is.false
		})
	})

	describe('Post Http Request Test', function () {
		it('fetch data to server is successfull', async function () {
			const res = await request(app)
				.post('/profile/create')
				.send({ name: 'aldi khan', age: 25 })
				.set('Content-Type', 'application/json')

			expect(res.status).is.deep.equal(201)
			expect(res.type).is.deep.equal('application/json')
			expect(res.body.message).to.match(/successfully/)
		})

		it('fetch data to server is failed', async function () {
			const res = await request(app)
				.post('/profile/create')
				.send({ name: 'samsul rizal', age: 28 })
				.set('Content-Type', 'application/json')

			expect(res.status).is.deep.equal(403)
			expect(res.type).is.deep.equal('application/json')
			expect(res.body.message).to.match(/failed/)
		})
	})
})
