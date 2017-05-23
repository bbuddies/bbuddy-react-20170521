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

export function queryBudgets(queryDateRange, callback) {
  return (dispatch, getState) => {
    dispatch(fetchBudgets()).then(() => {
      const budgets = values(getState().entities.budgets);
      const {startDate, endDate} = queryDateRange;

      let sum = 0
      let startDateMoment = moment(startDate, 'YYYY-MM-DD')
      let endDateMoment = moment(endDate, 'YYYY-MM-DD')
      
      budgets.forEach(({ month, amount }, index) => {
        
        let budgetMonth = moment(month, 'YYYY-MM');        
        if (!(budgetMonth.year() >= startDateMoment.year() && budgetMonth.year() <= endDateMoment.year())) {
          return;
        }

        if (!(budgetMonth.month() >= startDateMoment.month() && budgetMonth.month() <= endDateMoment.month())) {
          return;
        }

        if (startDateMoment.isSame(budgetMonth, 'month') && endDateMoment.isSame(budgetMonth, 'month')) {
          sum += (endDateMoment.diff(startDateMoment, 'days') + 1) / budgetMonth.daysInMonth() * amount;
        } else if (startDateMoment.isSame(budgetMonth, 'month') && endDateMoment.diff(budgetMonth, 'months') > 0) {
          let dailyBudget = (amount / budgetMonth.daysInMonth());
          sum += dailyBudget * (startDateMoment.daysInMonth() - startDateMoment.date() + 1);
        } else if (endDateMoment.isSame(budgetMonth, 'month')) {
          let dailyBudget = (amount / budgetMonth.daysInMonth());
          sum += (endDateMoment.date() / endDateMoment.daysInMonth()) * amount;
        } else if (endDateMoment.diff(budgetMonth, 'months') > 0) {
          sum += amount;
        }
      })
      
      
      callback(parseInt(sum));
    })
  }
}