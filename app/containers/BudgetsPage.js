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
        </CardText>
        <CardActions>
          <RaisedButton label='Add' primary={true} onTouchTap={() => {goToAddBudget()}}/>
        </CardActions>
      </Card>
    )
  }
}

