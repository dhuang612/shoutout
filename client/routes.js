import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Login, Signup, UserHome} from './components'
import {AddEmail} from './components/email-form'
import {AddShoutout} from './components/shoutout-form'
import {SignupInvite} from './components/inviteSignup-form'
import EmailList from './components/emailList'
import ShoutoutList from './components/shoutoutList'
import SingleEmail from './components/singleEmail'
import SingleShout from './components/singleShoutout'
import {me} from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props
    const {inviteId, flag} = this.props
    console.log(inviteId)
    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route path="/signup/invite" component={SignupInvite} />

        {isLoggedIn || inviteId === undefined ? (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route exact path="/home" component={UserHome} />
            <Route path="/home/addEmail" component={AddEmail} />
            <Route exact path="/home/showEmails" component={EmailList} />
            <Route path="/home/showEmails/:id" component={SingleEmail} />
            <Route path="/home/addShoutout" component={AddShoutout} />
            <Route exact path="/home/showShoutouts" component={ShoutoutList} />
            <Route path="/home/showShoutouts/:id" component={SingleShout} />
          </Switch>
        ) : (
          <Switch>
            <Route exact path="/home" component={UserHome} />
            <Route path="/home/addShoutout" component={AddShoutout} />
            <Route exact path="/home/showShoutouts" component={ShoutoutList} />
            <Route path="/home/showShoutouts/:id" component={SingleShout} />
          </Switch>
        )}

        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    userInfo: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
