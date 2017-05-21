import React from 'react';
import {Card, CardTitle, CardText, CardActions, RaisedButton, TextField} from 'material-ui'
import present from '../presenters/addBudgetPagePresenter'

@present
export default class AddBudgetPage extends React.Component {
  save(){
    this.props.goBack()
  }
  render() {
    return (
      <Card>
        <CardTitle title='Add Budget'/>
        <CardText>
          <TextField fullWidth={true} id="month" ref="month" hintText="Month" floatingLabelText="Name" autoFocus />
          <TextField fullWidth={true} id="amount" ref="amount" hintText="Amount" floatingLabelText="Balance" />
        </CardText>
        <CardActions>
          <RaisedButton
            label='Save'
            primary={true}
            onTouchTap={() => this.save()}/>
        </CardActions>
      </Card>
    )
  }
}
