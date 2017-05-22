import React from 'react';
import {Card, CardTitle, CardText, CardActions, RaisedButton, Table, TableHeader, TableBody, TableRow, TableHeaderColumn, TableRowColumn} from 'material-ui'
import present from '../presenters/budgetsPagePresenter'

@present
export default class BudgetsPage extends React.Component {
  render() {
    const {budgets, goToAddBudget, goToQueryBudget} = this.props
    return (
      <Card>
        <CardTitle title='Budgets'/>
        <CardActions>
          <RaisedButton label='Add' primary={true} onTouchTap={() => {goToAddBudget()}}/>
          <RaisedButton label='Query' primary={true} onTouchTap={() => {goToQueryBudget()}}/>
        </CardActions>
        <CardText>
          <Table height='500px' fixedHeader={true} >
            <TableHeader>
              <TableRow>
                <TableHeaderColumn tooltip="Month">Month</TableHeaderColumn>
                <TableHeaderColumn tooltip="Amount">Amount</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody showRowHover={true} stripedRows={true}>
              {budgets.map((budget, index) => (
                <TableRow key={index}>
                  <TableRowColumn>{budget.month}</TableRowColumn>
                  <TableRowColumn>{budget.amount}</TableRowColumn>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardText>
      </Card>
    )
  }
}

