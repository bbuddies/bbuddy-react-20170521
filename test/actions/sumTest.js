import {fetchBudgets, sumBudgets} from '../../app/actions/budget'

class Promise {
  static resolve(value) {
    let promise = new Promise()
    promise.value = value
    return promise
  }

  then(callback) {
    callback(this.value)
    return new Promise()
  }
}

describe('Query actions', () => {
  let dispatch, getState, callback
  beforeEach(() => {
    dispatch = sinon.stub().withArgs(fetchBudgets()).returns(Promise.resolve())
    getState = sinon.stub()

    callback = sinon.spy();
  })
  function givenBudgets(budgets) {
    getState.returns({
      entities: {budgets}
    })
  }

  function expectSum(query, result) {
    sumBudgets(query, callback)(dispatch, getState)

    callback.should.be.calledWith(result)
  }

  it('no budget', () => {
    givenBudgets({})

    expectSum({startDate: '2017-05-01', endDate: '2017-05-01'}, 0)
  })
  it('get one month budget', () => {
    givenBudgets({
      1: {month: '2017-05', amount: 3100}
    })

    expectSum({startDate: '2017-05-01', endDate: '2017-05-31'}, 3100)
  })
  it('get one day budget in solar month', () => {
    givenBudgets({
      1: {month: '2017-05', amount: 3100}
    })

    expectSum({startDate: '2017-05-01', endDate: '2017-05-01'}, 100)
  })
  it('get one day budget in lunar month', () => {
    givenBudgets({
      1: {month: '2017-06', amount: 3000}
    })

    expectSum({startDate: '2017-06-01', endDate: '2017-06-01'}, 100)
  })
  it('get x day within one month budget', () => {
    givenBudgets({
      1: {month: '2017-05', amount: 3100}
    })

    expectSum({startDate: '2017-05-02', endDate: '2017-05-04'}, 300)
  })
  it('query period before budget', () => {
    givenBudgets({
      1: {month: '2017-05', amount: 3100}
    })

    expectSum({startDate: '2017-04-30', endDate: '2017-04-30'}, 0)
  })
  it('query period after budget', () => {
    givenBudgets({
      1: {month: '2017-05', amount: 3100}
    })

    expectSum({startDate: '2017-06-01', endDate: '2017-06-30'}, 0)
  })
  it('only query end in budget', () => {
    givenBudgets({
      1: {month: '2017-05', amount: 3100}
    })

    expectSum({startDate: '2017-04-30', endDate: '2017-05-01'}, 100)
  })
  it('only query start in budget', () => {
    givenBudgets({
      1: {month: '2017-05', amount: 3100}
    })

    expectSum({startDate: '2017-05-30', endDate: '2017-06-06'}, 200)
  })
  it('query cover 2 budgets', () => {
    givenBudgets({
      1: {month: '2017-05', amount: 3100},
      2: {month: '2017-06', amount: 3000}
    })

    expectSum({startDate: '2017-05-30', endDate: '2017-06-06'}, 800)
  })
})

