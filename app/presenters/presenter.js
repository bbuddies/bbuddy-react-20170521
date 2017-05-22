import React from 'react'
import { connect } from 'react-redux'

export default Presenter => ComposedComponent => connect(Presenter.mapStateToProps, Presenter.mapDispatchToProps)(class extends React.Component {
  presenter = new Presenter(this.props)
  componentWillMount() {
    this.presenter.update = () => this.forceUpdate()
    this.presenter.loadData()
  }
  componentWillReceiveProps(nextProps) {
    this.presenter.props = nextProps
  }
  render() {
    return(
      <ComposedComponent {...this.presenter.getProps()} />
    )
  }
})
