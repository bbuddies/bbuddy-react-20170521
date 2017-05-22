import {addBudget, fetchBudgets, createBudget, updateBudget} from '../../app/actions/budget'

class Promise  {
  static resolve(value){
    let promise = new Promise()
    promise.value = value
    return promise
  }
  then(callback){
    callback(this.value)
    return new Promise()
  }
}

describe('Budget actions', () => {
  context('addBudget', () => {
    it('create budget when no budget for month', () => {
      let dispatch = sinon.stub().withArgs(fetchBudgets()).returns(Promise.resolve())
      let getState = sinon.stub().returns({entities: {budgets: {}}})

      addBudget({month: '2017-01', amount: 1000}, () => {})(dispatch, getState)

      dispatch.should.be.calledWith(createBudget({month: '2017-01', amount: 1000}))
    })
    it('update budget when budget for month exists', () => {
      let dispatch = sinon.stub().withArgs(fetchBudgets()).returns(Promise.resolve())
      let getState = sinon.stub().returns({entities: {budgets: {1: {id: 1, month: '2017-01', amount: 1000}}}})

      addBudget({month: '2017-01', amount: 2000}, () => {})(dispatch, getState)

      dispatch.should.be.calledWith(updateBudget({id:1, month: '2017-01', amount: 2000}))
    })
  })
})
