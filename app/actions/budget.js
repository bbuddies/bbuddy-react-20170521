import { CALL_API } from '../middleware/api'
import * as BudgetConstants from '../constants/budget'
import {Budget, BudgetList} from '../schemas'
import {find, merge } from 'lodash'

export function createBudget(budget){
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

export function updateBudget(budget){
  return {
    [CALL_API]: {
      types: [BudgetConstants.UPDATE_BUDGET_REQUEST, BudgetConstants.UPDATE_BUDGET_SUCCESS, BudgetConstants.UPDATE_BUDGET_FAILURE],
      endpoint: `budgets/${budget.id}`,
      method: 'PUT',
      data: budget,
      schema: Budget
    }
  }
}

export function addBudget(budget, success){
  return (dispatch, getState) => {
    dispatch(fetchBudgets()).then(() => {
      let budgets = getState().entities.budgets
      let exist = find(budgets, {month: budget.month})
      dispatch(exist ? updateBudget(merge({}, exist, budget)) : createBudget(budget)).then(success)
    })
  }
}

export function fetchBudgets(){
  return {
    [CALL_API]: {
      types: [BudgetConstants.LOAD_BUDGETS_REQUEST, BudgetConstants.LOAD_BUDGETS_SUCCESS, BudgetConstants.LOAD_BUDGETS_FAILURE],
      endpoint: `budgets`,
      method: 'GET',
      schema: BudgetList
    }
  }
}

export function loadBudgets(callback){
  return (dispatch, getState) => {
    dispatch(fetchBudgets()).then(callback)
  }
}
