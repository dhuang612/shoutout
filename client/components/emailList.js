import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {showEmails} from '../store'

export class EmailList extends Component {
  componentDidMount() {
    this.props.showAllEmails()
  }

  render() {
    const emails = this.props.emails
    console.log(emails.data)
    if (emails.data !== [] && emails.data !== undefined) {
      return (
        <div>
          {emails.data.map(email => <div key={email.id}>{email.email}</div>)}
        </div>
      )
    } else {
      return <div>No emails</div>
    }
  }
}

const mapState = state => {
  return {
    emails: state.emails
  }
}

const mapDispatch = dispatch => {
  return {
    showAllEmails() {
      dispatch(showEmails())
    }
  }
}

export default connect(mapState, mapDispatch)(EmailList)
