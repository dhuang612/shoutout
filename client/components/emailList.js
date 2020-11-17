import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {showEmails} from '../store'

export class EmailList extends Component {
  componentDidMount() {
    this.props.showAllEmails()
  }
  render() {
    const emails = this.props.emails.data
    if (emails !== [] && emails !== undefined) {
      return (
        <div>
          {emails.length ? (
            emails.map(({id, email}) => <div key={id}>{email}</div>)
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
      return <div>Loading...</div>
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
