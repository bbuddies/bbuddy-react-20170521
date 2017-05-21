import React from 'react';
import {Card, CardTitle, CardText, CardActions, RaisedButton, Table, TableHeader, TableBody, TableRow, TableHeaderColumn, TableRowColumn} from 'material-ui'
import present from '../presenters/budgetsPagePresenter'

@present
export default class BudgetsPage extends React.Component {
  render() {
    const {goToAddBudget} = this.props
    return (
      <Card>
        <CardTitle title='Budgets'/>
        <CardText>
          <Table height='500px' fixedHeader={true} >
            <TableHeader>
              <TableRow>
                <TableHeaderColumn tooltip="Month">Month</TableHeaderColumn>
                <TableHeaderColumn tooltip="Amount">Amount</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody showRowHover={true} stripedRows={true}>
                <TableRow key={0}>
                  <TableRowColumn>{'2017-05'}</TableRowColumn>
                  <TableRowColumn>{1000}</TableRowColumn>
                </TableRow>
            </TableBody>
          </Table>
        </CardText>
        <CardActions>
          <RaisedButton label='Add' primary={true} onTouchTap={() => {goToAddBudget()}}/>
        </CardActions>
      </Card>
    )
  }
}

