import { CALL_API } from '../middleware/api'
import * as BudgetConstants from '../constants/budget'
import {Budget, BudgetList} from '../schemas'
import {find, merge, values } from 'lodash'
import moment from 'moment'

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

      let startDate = paramObj.startDate;
      let endDate = paramObj.endDate;

      let sum = 0
      let index = 0
      const lengthOfBudgets = budgets.length
      budgets.forEach(({ month, amount }, index) => {
        var budgetMonth = moment(month, 'YYYY-MM');

        var startDateMoment = moment(startDate, 'YYYY-MM-DD')
        var endDateMoment = moment(endDate, 'YYYY-MM-DD')
        
        if (!budgetMonth.isBetween(startDateMoment, endDateMoment, 'days', '[]')) {
          return;
        }

        if (startDateMoment.diff(budgetMonth, 'months') == 0 && endDateMoment.diff(budgetMonth, 'months') == 0) {
          sum += (endDateMoment.diff(startDateMoment, 'days') + 1) / budgetMonth.daysInMonth() * amount;
        } else if (startDateMoment.diff(budgetMonth, 'months') == 0 && endDateMoment.diff(budgetMonth, 'months') > 0) {
          sum += amount;
        } else if (startDateMoment.diff(budgetMonth, 'months') < 0 && endDateMoment.diff(budgetMonth, 'months') == 0) {
          sum += (endDateMoment.date() / endDateMoment.daysInMonth()) * amount;
        } else if (startDateMoment.diff(budgetMonth, 'months') < 0 && endDateMoment.diff(budgetMonth, 'months') > 0) {
          sum += amount;
        }
      })
      
      callback(parseInt(sum));
    })
  }
}