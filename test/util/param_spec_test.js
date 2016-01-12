import ParamSpec from "../../src/js/util/param_spec"

describe('ParamSpec', function () {
  context('with clamping', function () {
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

      it('maps a value above domain to the distribution max', function () {
        expect(this.subject.map(200)).to.eql(10)
      })

      it('maps a value below domain to the distribution min', function () {
        expect(this.subject.map(-20)).to.eql(0)
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

      it('unmaps a value above range to the source max', function () {
        expect(this.subject.unmap(20)).to.eql(127)
      })

      it('unmaps a value below range to the source min', function () {
        expect(this.subject.unmap(-20)).to.eql(0)
      })
    })
  })

  context('without clamping', function () {
    beforeEach(function () {
      this.subject = ParamSpec(0, 127, 0, 10, false)
    })

    describe('map', function () {
      it('maps a value above domain to an extrapolation', function () {
        expect(this.subject.map(190.5)).to.eql(15)
      })

      it('maps a value below domain to an exdrapolation', function () {
        expect(this.subject.map(-52.07)).to.eql(-4.1)
      })
    })

    describe('unmap', function () {
      it('unmaps a value above range to an extrapolation', function () {
        expect(this.subject.unmap(15)).to.eql(190.5)
      })

      it('unmaps a value below range to an extrapolation', function () {
        expect(this.subject.unmap(-4.1)).to.eql(-52.07)
      })
    })
  })
})
