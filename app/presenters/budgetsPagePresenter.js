import present from './presenter'
import {bindActionCreators} from 'redux'
import merge from 'lodash/merge'
import values from 'lodash/values'
import * as NavigationActions from '../actions/navigation'
import * as BudgetActions from '../actions/budget'

export class BudgetsPagePresenter {
  constructor(props){
    this.props = props
  }
  loadData(){
    this.props.loadBudgets()
  }
  getProps(){
    return this.props
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

export default present(BudgetsPagePresenter)
