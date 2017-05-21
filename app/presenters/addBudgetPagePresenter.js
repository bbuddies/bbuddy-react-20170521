import present from './presenter'
import {bindActionCreators} from 'redux'
import merge from 'lodash/merge'
import * as NavigationActions from '../actions/navigation'

export class AddBudgetPagePresenter {
  constructor(props){
    this.props = props
  }
  loadData(){
  }
  getProps(){
    return this.props
  }

  static mapStateToProps(state) {
    return {
    }
  }

  static mapDispatchToProps(dispatch) {
    return bindActionCreators(merge({}, NavigationActions), dispatch)
  }
}

export default present(AddBudgetPagePresenter)
