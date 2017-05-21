import {BudgetsPagePresenter} from '../../app/presenters/budgetsPagePresenter'

describe('BudgetsPagePresenter', () => {
  it('load budgets', () => {
    let props = {loadBudgets: () => {}}
    let loadBudgetsSpy = sinon.spy(props, 'loadBudgets')
    let presenter = new BudgetsPagePresenter(props)

    presenter.loadData()

    loadBudgetsSpy.should.be.called
  })
  it('map budgets from store', () => {
    let state = {entities: {budgets: {1: {month: '2017-01', amount: 1000}}}}
    let props = BudgetsPagePresenter.mapStateToProps(state)
    props.should.have.property('budgets').that.is.eql([{month: '2017-01', amount: 1000}])
  })
})
