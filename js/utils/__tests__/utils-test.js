jest.dontMock('../utils')
jest.dontMock('lodash')


describe('like', function() {
	var duck = { a: 1, b: {c: "A"}} //
	var unkown = { a: 1, b: {c: "A"}} // is it like a duck
	var u = require('../utils')

	it('throws if the inputs are no objects', function() {
		expect(function(){ u.like([],[]) }).toThrow()
	})

	it('returns true if data is like the duck', function() {
		expect( u.like(unkown,duck) ).toBe(true)
	})

	it('returns false if data is not like the duck', function() {
		expect( u.like({ a: 1 },duck) ).toBe(false)
	})


})
describe('notLike', function() {
	var duck = { a: 1, b: {c: "A"}} //
	var unkown = { a: 1, b: {c: "A"}} // is it like a duck
	var u = require('../utils')

	it('returns true if data is not like the duck', function() {
		expect( u.notLike({ a: 1 },duck) ).toBe(true)
	})
 
})