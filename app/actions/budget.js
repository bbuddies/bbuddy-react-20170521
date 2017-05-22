import { CALL_API } from '../middleware/api'
import * as BudgetConstants from '../constants/budget'
import {Budget, BudgetList} from '../schemas'
import {find, merge, values } from 'lodash'

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

export function queryBudgets(paramObj, paramObj2, callback) {
  return (dispatch, getState) => {
    dispatch(fetchBudgets()).then(() => {
      let budgets = values(getState().entities.budgets);

// console.log('============')
//     console.log('paramObj', paramObj)
//     console.log('paramObj2', paramObj2)

    let startDate = paramObj.startDate;
    let endDate = paramObj.endDate;

    // console.log('startDate', startDate)
    // console.log('endDate', endDate)
    
      let sum = 0
      const lengthOfBudgets = budgets.length
      budgets.forEach(({ month, amount }, index) => {
        console.log("month", month);
        console.log("amount", amount);
        if (new Date(month) - new Date(startDate) >= 0 && new Date(month) - new Date(endDate) <= 0) {
          console.log("flag 1");
          if (index === 0) 
            sum += (new Date(startDate).getDate() / 30) * amount
          else if (index === lengthOfBudgets - 1) 
            sum += (new Date(endDate).getDate() / 30) * amount
          else 
            sum += amount
          }
      })
      
      //var amount = 3000;
      console.log('sum', sum);
      callback(sum);
    })
  }
}