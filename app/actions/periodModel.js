import moment from 'moment'

export function toMoment(date) {
  return moment(date, 'YYYY-MM-DD')
}
export function dayCount({start, end}) {
  return start.isAfter(end) ? 0 : end.diff(start, 'day') + 1
}
