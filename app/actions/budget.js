import { CALL_API } from '../middleware/api'
import * as BudgetConstants from '../constants/budget'
import {Budget, BudgetList} from '../schemas'

function createBudget(budget){
  return {
    [CALL_API]: {
      types: [BudgetConstants.ADD_BUDGET_REQUEST, BudgetConstants.ADD_BUDGET_SUCCESS, BudgetConstants.ADD_BUDGET_FAILURE],
      endpoint: `budgets`,
      method: 'POST',
      data: budget,
      schema: Budget
    }
  }
}

export function addBudget(budget, success){
  return (dispatch, getState) => {
    dispatch(createBudget(budget)).then(success)
  }
}

function fetchBudgets(){
  return {
    [CALL_API]: {
      types: [BudgetConstants.LOAD_BUDGETS_REQUEST, BudgetConstants.LOAD_BUDGETS_SUCCESS, BudgetConstants.LOAD_BUDGETS_FAILURE],
      endpoint: `budgets`,
      method: 'GET',
      schema: BudgetList
    }
  }
}

export function loadBudgets(){
  return (dispatch, getState) => {
    dispatch(fetchBudgets())
  }
}
