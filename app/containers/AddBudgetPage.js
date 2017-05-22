import React from 'react';
import {Card, CardTitle, CardText, CardActions, RaisedButton, TextField} from 'material-ui'
import present from '../presenters/addBudgetPagePresenter'

@present
export default class AddBudgetPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alertMessage: ''
    };
  }

  save(){
    const month = this.refs.month.getValue()
    const amount = this.refs.amount.getValue()

    this.props.save({month, amount})
  }
  render() {
    const {message} = this.props

    return (
      <Card>
        <CardTitle title='Add Budget'/>
        {message && (<CardTitle title={message}/>)}
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
