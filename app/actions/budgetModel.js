import moment from 'moment'
import * as Period from './periodModel'

function dailyBudget(budget) {
  return budget.amount / moment(budget.month, 'YYYY-MM').daysInMonth()
}
export function overlappingBudget({start, end}, budget) {
  let startOfBudget = moment(budget.month, 'YYYY-MM').startOf('month');
  let endOfBudget = moment(budget.month, 'YYYY-MM').endOf('month');
  let startOfOverlapping = start.isAfter(startOfBudget) ? start : startOfBudget;
  let endOfOverlapping = end.isBefore(endOfBudget) ? end : endOfBudget;
  return dailyBudget(budget) * Period.dayCount({start: startOfOverlapping, end: endOfOverlapping})
}
