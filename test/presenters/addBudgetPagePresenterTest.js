import {AddBudgetPagePresenter} from '../../app/presenters/addBudgetPagePresenter'

describe('AddBudgetPagePresenter', () => {
  context('Add budget', () => {
    let addBudgetSpy, goBackSpy
    beforeEach(() => {
      let props = {addBudget: () => {}, updateBudget: () => {}, goBack: () => {}, loadBudgets: () => {}}
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
  
  context('Update budget', () => {
    it('save by action', () => {
      // arrange
      let props = {addBudget: () => {}, updateBudget: () => {}, goBack: () => {}, loadBudgets: () => {}}
      let addBudgetSpy = sinon.stub(props, 'addBudget').yields()
      let loadBudgets = sinon.spy(props, 'loadBudgets')
      let goBackSpy = sinon.spy(props, 'goBack')
      
      // act
      let presenter = new AddBudgetPagePresenter(props)
      presenter.save({month: '2017-05', amount: 300})

      // assert
      loadBudgets.should.be.called
      addBudgetSpy.should.be.calledWith({month: '2017-05', amount: 300}, sinon.match.any)
    })

    it('invoke update budget', () => {
      // arrange
      let props = {addBudget: () => {}, updateBudget: () => {}, goBack: () => {}, loadBudgets: () => {}}
      let updateBudget = sinon.stub(props, 'updateBudget').yields();
      let loadBudgets = sinon.stub(props, 'loadBudgets');
      
      loadBudgets.returns({1: {month: '2017-05', amount: 1000}})
      
      // act
      let presenter = new AddBudgetPagePresenter(props)
      presenter.save({month: '2017-05', amount: 300})

      // assert
      updateBudget.should.be.called
    })
  })  
})
