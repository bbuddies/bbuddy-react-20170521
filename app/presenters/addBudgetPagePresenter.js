import present from "./presenter";
import {bindActionCreators} from "redux";
import merge from "lodash/merge";
import * as NavigationActions from "../actions/navigation";
import * as BudgetActions from "../actions/budget";

export class AddBudgetPagePresenter {
  constructor(props){
    this.props = props
  }
  loadData(){
  }
  getProps(){
    return {
      ...this.props,
      message: this.message,
      save: budget => this.save(budget)
    }
  }
  save(budget){
    if (parseInt(budget.amount) > 0)
      this.props.addBudget(budget, () => {this.props.goBack()})
    else {
      this.message = 'invalid amount value'
      this.update()
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
