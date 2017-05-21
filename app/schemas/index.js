import { schema } from 'normalizr'

export const Account = new schema.Entity('accounts')
export const AccountList = [Account]
export const Budget = new schema.Entity('budgets')
export const BudgetList = [Budget]
