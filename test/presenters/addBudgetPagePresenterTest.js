import {AddBudgetPagePresenter} from '../../app/presenters/addBudgetPagePresenter'

describe('AddBudgetPagePresenter', () => {
  context('Add budget', () => {
    let addBudgetSpy, goBackSpy
    beforeEach(() => {
      let props = {addBudget: () => {}, goBack: () => {}, loadBudgets: () => {}}
      addBudgetSpy = sinon.stub(props, 'addBudget').yields()
      goBackSpy = sinon.spy(props, 'goBack')
      let presenter = new AddBudgetPagePresenter(props)
      presenter.save({month: '2017-05', amount: 1000})
    })
    it('save by action', () => {
      addBudgetSpy.should.be.calledWith({month: '2017-05', amount: 1000}, sinon.match.any)
    })
    it('go back after saving success', () => {
      goBackSpy.should.be.called
    })
  })

  context('Valid input', () => {
    beforeEach(() => {
      AddBudgetPagePresenter.prototype.update = () => {};
    })

    it('valid amount > 0', () => {
      let props = {addBudget: () => {}, goBack: () => {}, loadBudgets: () => {}}
      let addBudgetSpy = sinon.stub(props, 'addBudget').yields()
      let goBackSpy = sinon.spy(props, 'goBack')
      let presenter = new AddBudgetPagePresenter(props)

      presenter.save({month:'2017-05', amount: -100})

      addBudgetSpy.should.not.be.called
      goBackSpy.should.not.be.called
    })

    it('show alert message', () => {
      let props = {addBudget: () => {}, goBack: () => {}, loadBudgets: () => {}}
      let addBudgetSpy = sinon.stub(props, 'addBudget').yields()
      let goBackSpy = sinon.spy(props, 'goBack')
      let presenter = new AddBudgetPagePresenter(props)

      presenter.save({month:'2017-05', amount: -100})

      presenter.getProps().message.should.be.equal('invalid amount value')
    })
  })
})
