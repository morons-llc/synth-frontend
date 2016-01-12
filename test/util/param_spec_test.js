import ParamSpec from "../../src/js/util/param_spec"

describe('ParamSpec', function () {
  beforeEach(function () {
    this.subject = ParamSpec(0, 127, 0, 10)
  })

  describe('map', function () {
    it('maps a value to the distribution', function () {
      expect(this.subject.map(63.5)).to.eql(5)
    })

    it('maps a value to the distribution', function () {
      expect(this.subject.map(0)).to.eql(0)
    })

    it('maps a value to the distribution', function () {
      expect(this.subject.map(127)).to.eql(10)
    })
  })

  describe('unmap', function () {
    it('unmaps a value from the distribution', function () {
      expect(this.subject.unmap(5)).to.eql(63.5)
    })

    it('unmaps a value from the distribution', function () {
      expect(this.subject.unmap(0)).to.eql(0)
    })

    it('unmaps a value from the distribution', function () {
      expect(this.subject.unmap(10)).to.eql(127)
    })
  })
})
