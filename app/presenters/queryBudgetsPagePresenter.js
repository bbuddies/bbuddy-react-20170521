import present from './presenter'
import {bindActionCreators} from 'redux'
import merge from 'lodash/merge'
import values from 'lodash/values'
import * as NavigationActions from '../actions/navigation'
import * as BudgetActions from '../actions/budget'

export class QueryBudgetsPagePresenter {
  constructor(props){
    this.props = props
  }

  loadData() {
  }

  getProps(){
    return {
      ...this.props,
      message: this.message,
      query: (startDate, endDate) => this.query(startDate, endDate)
    }
  }

  query(queryDateRange) {
    var that = this;
    this.props.queryBudgets(queryDateRange, (amount) => {
      that.message = amount
      that.update()
    })
  }

  static mapStateToProps(state) {
    return {
      budgets: values(state.entities.budgets)
    }
  }

  static mapDispatchToProps(dispatch) {
    return bindActionCreators(merge({}, BudgetActions, NavigationActions), dispatch)
  }
}

export default present(QueryBudgetsPagePresenter)
