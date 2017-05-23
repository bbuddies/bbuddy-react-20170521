import { addBudget, fetchBudgets, createBudget, updateBudget, queryBudgets } from '../../app/actions/budget'

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

describe('Budget actions', () => {
  context('addBudget', () => {
    it('create budget when no budget for month', () => {
      let dispatch = sinon.stub().withArgs(fetchBudgets()).returns(Promise.resolve())
      let getState = sinon.stub().returns({ entities: { budgets: {} } })

      addBudget({ month: '2017-01', amount: 1000 }, () => { })(dispatch, getState)

      dispatch.should.be.calledWith(createBudget({ month: '2017-01', amount: 1000 }))
    })
    it('update budget when budget for month exists', () => {
      let dispatch = sinon.stub().withArgs(fetchBudgets()).returns(Promise.resolve())
      let getState = sinon.stub().returns({ entities: { budgets: { 1: { id: 1, month: '2017-01', amount: 1000 } } } })

      addBudget({ month: '2017-01', amount: 2000 }, () => { })(dispatch, getState)

      dispatch.should.be.calledWith(updateBudget({ id: 1, month: '2017-01', amount: 2000 }))
    })
  })
})

describe('Query actions', () => {
  context('queryBudgets', () => {
    it('query an completed single month', () => {
      let dispatch = sinon.stub().withArgs(fetchBudgets()).returns(Promise.resolve())
      let getState = sinon.stub().returns({
        entities: {
          budgets: {
            1: { id: 1, month: '2017-05', amount: 310 },
            2: { id: 2, month: '2017-06', amount: 300 },
            3: { id: 3, month: '2017-08', amount: 310 },
          }
        }
      })

      var callback = sinon.spy();
      queryBudgets({ startDate: '2017-05-01', endDate: '2017-05-31' }, callback)(dispatch, getState)

      callback.should.be.calledWith(310)
    })

    it('query between a solar month (31)', () => {
      let dispatch = sinon.stub().withArgs(fetchBudgets()).returns(Promise.resolve())
      let getState = sinon.stub().returns({
        entities: {
          budgets: {
            1: { id: 1, month: '2017-05', amount: 310 },
            2: { id: 2, month: '2017-06', amount: 300 },
            3: { id: 3, month: '2017-08', amount: 310 },
          }
        }
      })

      var callback = sinon.spy();
      queryBudgets({ startDate: '2017-05-01', endDate: '2017-05-30' }, callback)(dispatch, getState)

      callback.should.be.calledWith(300)
    })

    it('query between a solar month (31) but start with second month days', () => {
      let dispatch = sinon.stub().withArgs(fetchBudgets()).returns(Promise.resolve())
      let getState = sinon.stub().returns({
        entities: {
          budgets: {
            1: { id: 1, month: '2017-05', amount: 310 },
            2: { id: 2, month: '2017-06', amount: 300 },
            3: { id: 3, month: '2017-08', amount: 310 },
          }
        }
      })

      var callback = sinon.spy();
      queryBudgets({ startDate: '2017-05-02', endDate: '2017-05-30' }, callback)(dispatch, getState)

      callback.should.be.calledWith(290)
    })

    it('query between a lunar month (30)', () => {
      let dispatch = sinon.stub().withArgs(fetchBudgets()).returns(Promise.resolve())
      let getState = sinon.stub().returns({
        entities: {
          budgets: {
            1: { id: 1, month: '2017-05', amount: 310 },
            2: { id: 2, month: '2017-06', amount: 300 },
            3: { id: 3, month: '2017-08', amount: 310 },
          }
        }
      })

      var callback = sinon.spy();
      queryBudgets({ startDate: '2017-06-01', endDate: '2017-06-29' }, callback)(dispatch, getState)

      callback.should.be.calledWith(290)
    })

    it('query between two months', () => {
      let dispatch = sinon.stub().withArgs(fetchBudgets()).returns(Promise.resolve())
      let getState = sinon.stub().returns({
        entities: {
          budgets: {
            1: { id: 1, month: '2017-05', amount: 310 },
            2: { id: 2, month: '2017-06', amount: 300 },
            3: { id: 3, month: '2017-08', amount: 310 },
          }
        }
      })

      var callback = sinon.spy();
      queryBudgets({ startDate: '2017-05-10', endDate: '2017-06-10' }, callback)(dispatch, getState)

      callback.should.be.calledWith(320)
    })

    it('query between not existed months', () => {
      let dispatch = sinon.stub().withArgs(fetchBudgets()).returns(Promise.resolve())
      let getState = sinon.stub().returns({
        entities: {
          budgets: {
            1: { id: 1, month: '2017-05', amount: 310 },
            2: { id: 2, month: '2017-06', amount: 300 },
            3: { id: 3, month: '2017-08', amount: 310 },
          }
        }
      })

      var callback = sinon.spy();
      queryBudgets({ startDate: '2017-07-01', endDate: '2017-07-30' }, callback)(dispatch, getState)

      callback.should.be.calledWith(0)
    })

    it('query between three months', () => {
      let dispatch = sinon.stub().withArgs(fetchBudgets()).returns(Promise.resolve())
      let getState = sinon.stub().returns({
        entities: {
          budgets: {
            1: { id: 1, month: '2017-05', amount: 310 },
            2: { id: 2, month: '2017-06', amount: 300 },
            3: { id: 3, month: '2017-08', amount: 310 },
          }
        }
      })

      var callback = sinon.spy();
      queryBudgets({ startDate: '2017-05-11', endDate: '2017-08-20' }, callback)(dispatch, getState)

      callback.should.be.calledWith(710)
    })
    
  })
})
