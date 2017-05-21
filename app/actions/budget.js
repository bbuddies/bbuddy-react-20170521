import { CALL_API } from '../middleware/api'
import * as BudgetConstants from '../constants/budget'
import {Budget} from '../schemas'

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
