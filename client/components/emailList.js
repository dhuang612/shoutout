import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {showEmails} from '../store'

export class EmailList extends Component {
  componentDidMount() {
    this.props.showAllEmails()
  }
  //&& emails !== undefined
  render() {
    const emails = this.props.emails.data
    console.log(emails)
    if (emails !== [] && emails !== undefined) {
      return (
        <div>
          {emails.length ? (
            emails.map(email => <div key={email.id}>{email.email}</div>)
          ) : (
            <div>
              No emails{' '}
              <div>
                <Link to="/home/addEmail">add new emails</Link>
              </div>
            </div>
          )}
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
