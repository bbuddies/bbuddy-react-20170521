import React from 'react';
import {Card, CardTitle, CardText, CardActions, RaisedButton, Table, TableHeader, TableBody, TableRow, TableHeaderColumn, TableRowColumn, TextField} from 'material-ui'
import present from '../presenters/queryBudgetsPagePresenter'

@present
export default class QueryBudgetsPage extends React.Component {
  query(){
    const startDate = this.refs.startDate.getValue()
    const endDate = this.refs.endDate.getValue()

    this.props.query({startDate, endDate})
  }

  render() {
    const {budgets, goToAddBudget} = this.props

    const {message} = this.props

    return (
      <Card>
        <CardTitle title='Query Budgets '/>
        <CardText>
          <TextField fullWidth={true} id="startDate" ref="startDate" hintText="Start Date" floatingLabelText="Start Date" autoFocus />
          <TextField fullWidth={true} id="endDate" ref="endDate" hintText="End Date" floatingLabelText="End Date" />
        </CardText>
        {message && (<CardTitle title={message}/>)}
        <CardActions>
          <RaisedButton
            label='Query'
            primary={true}
            onTouchTap={() => this.query()}/>
        </CardActions>
      </Card>
    )
  }
}

