import {AddBudgetPagePresenter} from '../../app/presenters/addBudgetPagePresenter'

describe('AddBudgetPagePresenter', () => {
  context('Save budget', () => {
    let addBudgetSpy, goBackSpy
    beforeEach(() => {
      let props = {addBudget: () => {}, goBack: () => {}}
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
})
