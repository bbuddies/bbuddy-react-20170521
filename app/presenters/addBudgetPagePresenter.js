import present from './presenter'
import {bindActionCreators} from 'redux'
import merge from 'lodash/merge'
import values from 'lodash/values'
import * as NavigationActions from '../actions/navigation'
import * as BudgetActions from '../actions/budget'

export class AddBudgetPagePresenter {
  constructor(props){
    this.props = props
  }
  loadData(){
  }
  getProps(){
    return {
      ...this.props,
      save: budget => this.save(budget)
    }
  }
  save(budget){
    var currentBudgets = values(this.props.loadBudgets());

    let budgetIsExisting = false;
    for (let i = 0; i < currentBudgets.length; i++) {
      if (currentBudgets[i].month == budget.month) {
        budgetIsExisting = true;
        break;
      }
    }
    //var 
    if (budgetIsExisting) {
      this.props.updateBudget(budget, () => {this.props.goBack()})           
    } else {
      this.props.addBudget(budget, () => {this.props.goBack()}) 
    }
    
  }

  static mapStateToProps(state) {
    return {
    }
  }

  static mapDispatchToProps(dispatch) {
    return bindActionCreators(merge({}, BudgetActions, NavigationActions), dispatch)
  }
}

export default present(AddBudgetPagePresenter)
